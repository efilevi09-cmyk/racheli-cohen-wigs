/*
 * racheli-cohen-wigs-api - Cloudflare Worker
 * Backend משותף (בחינם, בלי R2) לאתר הסטטי racheli-cohen-wigs-site.pages.dev:
 * שומר אוספי תוכן (סטוריז/פיד/אני כלה) וקבצי מדיה (תמונות/סרטונים, כ-base64) ב-Workers KV,
 * כך שתוכן שמועלה דרך האדמין גלוי לכל מבקרת באתר - לא רק בדפדפן שהעלתה ממנו.
 * כולל גם לוז פגישות: שעות פעילות (hours) ורשימת פגישות שנקבעו (appointments).
 *
 * Binding נדרש: RACHELI_KV (KV namespace)
 * Secret נדרש: ADMIN_TOKEN (טוקן הרשאת כתיבה - נשלח מהאדמין בכותרת X-Admin-Token)
 */

const ALLOWED_ORIGINS = [
  'https://racheli-cohen-wigs-site.pages.dev',
];

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // מאפשר גם כל פריסות התצוגה המקדימה של אותו פרויקט ב-Cloudflare Pages
  // (לדוגמה: https://abc123.racheli-cohen-wigs-site.pages.dev)
  try {
    const host = new URL(origin).host;
    return /^[a-z0-9-]+\.racheli-cohen-wigs-site\.pages\.dev$/.test(host);
  } catch (e) {
    return false;
  }
}

function corsHeaders(origin) {
  const allow = isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token, X-File-Name, X-Content-Type',
    'Vary': 'Origin',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, corsHeaders(origin)),
  });
}

/* טוקן הרשאת כתיבה - הגנה בסיסית מפני כתיבה אקראית מהרשת (לא הגנת-על: זהו אתר סטטי בלי שרת
   משלו, כך שהטוקן חייב להיות מוטמע גם בקוד הלקוח (admin.js) כדי שהאדמין יוכל לשלוח אותו).
   מספיק כדי למנוע ונדליזם/בוטים אוטומטיים, לא כדי להגן מפני מישהו שבודק את קוד המקור של האתר. */
const ADMIN_TOKEN = '454e6250a4d24c3960d044d213a005e12a3f1a8691a97178';

function requireAuth(request) {
  const token = request.headers.get('X-Admin-Token');
  return !!token && token === ADMIN_TOKEN;
}

/* ---------- קידוד/פענוח base64 בטוח לקבצים בינאריים גדולים (בלי לגלוש בעומק הקריאה) ---------- */
function bufferToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
function base64ToBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function uuid() {
  return crypto.randomUUID();
}

const VALID_COLLECTIONS = ['topics', 'feed', 'bride_journey'];

/* ---------- בדיקות תקינות בסיסיות ללוז הפגישות ---------- */
function isValidDateStr(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s); }
function isValidTimeStr(s) { return typeof s === 'string' && /^\d{2}:\d{2}$/.test(s); }

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const path = url.pathname;

    /* ---- GET/PUT /api/collection/:name ---- */
    let m = path.match(/^\/api\/collection\/([a-z_]+)\/?$/);
    if (m) {
      const name = m[1];
      if (!VALID_COLLECTIONS.includes(name)) return json({ error: 'unknown collection' }, 404, origin);
      const key = 'collection:' + name;

      if (request.method === 'GET') {
        const stored = await env.RACHELI_KV.get(key, 'json');
        return json({ data: stored || [] }, 200, origin);
      }

      if (request.method === 'PUT') {
        if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
        let body;
        try { body = await request.json(); } catch (e) { return json({ error: 'invalid json' }, 400, origin); }
        if (!Array.isArray(body)) return json({ error: 'expected an array' }, 400, origin);
        await env.RACHELI_KV.put(key, JSON.stringify(body));
        return json({ ok: true }, 200, origin);
      }

      return json({ error: 'method not allowed' }, 405, origin);
    }

    /* ---- GET/PUT /api/hours  (הגדרת שעות הפעילות השבועיות + תאריכים חסומים - נקודת אמת אחת
       שגם האדמין קוראת/כותבת וגם טופס קביעת הפגישה הציבורי קורא כדי לחשב שעות פנויות) ---- */
    if (path === '/api/hours') {
      if (request.method === 'GET') {
        const stored = await env.RACHELI_KV.get('config:hours', 'json');
        return json({ data: stored || null }, 200, origin);
      }
      if (request.method === 'PUT') {
        if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
        let body;
        try { body = await request.json(); } catch (e) { return json({ error: 'invalid json' }, 400, origin); }
        if (!body || typeof body !== 'object') return json({ error: 'expected an object' }, 400, origin);
        await env.RACHELI_KV.put('config:hours', JSON.stringify(body));
        return json({ ok: true }, 200, origin);
      }
      return json({ error: 'method not allowed' }, 405, origin);
    }

    /* ---- GET /api/appointments/taken?date=YYYY-MM-DD  (ציבורי - אילו שעות כבר תפוסות בתאריך
       נתון, בלי לחשוף שום פרט מזהה של הלקוחות שקבעו אותן) ---- */
    if (path === '/api/appointments/taken' && request.method === 'GET') {
      const date = url.searchParams.get('date');
      if (!isValidDateStr(date)) return json({ error: 'invalid date' }, 400, origin);
      const list = (await env.RACHELI_KV.get('list:appointments', 'json')) || [];
      const taken = list.filter((a) => a.date === date).map((a) => a.time);
      return json({ taken }, 200, origin);
    }

    /* ---- GET /api/appointments  (אדמין בלבד - רשימה מלאה לניהול) ---- */
    if (path === '/api/appointments' && request.method === 'GET') {
      if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
      const list = (await env.RACHELI_KV.get('list:appointments', 'json')) || [];
      list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      return json({ data: list }, 200, origin);
    }

    /* ---- POST /api/appointments  (ציבורי - קביעת פגישה חדשה מטופס האתר, עם בדיקת כפילות
       מול הרשימה הקיימת לאותו תאריך+שעה בדיוק - קריאה-ואז-כתיבה; אין נעילות אמיתיות ב-KV,
       אז בעומס תיאורטי-גבוה-מאוד של שתי קביעות בו-זמנית לאותה שעה קיים סיכוי קטן לשני
       רישומים זהים, אבל זה מספיק טוב בהיקף של סטודיו פאות בודד) ---- */
    if (path === '/api/appointments' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: 'invalid json' }, 400, origin); }
      const { date, time, name, phone, email, context } = body || {};
      if (!isValidDateStr(date)) return json({ error: 'invalid date' }, 400, origin);
      if (!isValidTimeStr(time)) return json({ error: 'invalid time' }, 400, origin);
      if (!name || !phone) return json({ error: 'missing name or phone' }, 400, origin);

      const list = (await env.RACHELI_KV.get('list:appointments', 'json')) || [];
      if (list.some((a) => a.date === date && a.time === time)) {
        return json({ error: 'slot taken' }, 409, origin);
      }

      const record = {
        id: 'apt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        date, time,
        name: String(name).slice(0, 100),
        phone: String(phone).slice(0, 40),
        email: email ? String(email).slice(0, 120) : '',
        context: context ? String(context).slice(0, 200) : '',
        createdAt: new Date().toISOString(),
      };
      list.push(record);
      await env.RACHELI_KV.put('list:appointments', JSON.stringify(list));
      return json({ ok: true, appointment: record }, 200, origin);
    }

    /* ---- DELETE /api/appointments/:id  (אדמין בלבד - ביטול פגישה) ---- */
    m = path.match(/^\/api\/appointments\/([A-Za-z0-9_-]+)$/);
    if (m && request.method === 'DELETE') {
      if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
      const list = (await env.RACHELI_KV.get('list:appointments', 'json')) || [];
      const next = list.filter((a) => a.id !== m[1]);
      await env.RACHELI_KV.put('list:appointments', JSON.stringify(next));
      return json({ ok: true }, 200, origin);
    }

    /* ---- POST /api/media  (העלאת קובץ חדש) ---- */
    if (path === '/api/media' && request.method === 'POST') {
      if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
      const contentType = request.headers.get('X-Content-Type') || request.headers.get('Content-Type') || 'application/octet-stream';
      const buf = await request.arrayBuffer();
      if (buf.byteLength > 20 * 1024 * 1024) return json({ error: 'file too large (max 20MB)' }, 413, origin);
      const id = uuid();
      const b64 = bufferToBase64(buf);
      await env.RACHELI_KV.put('media:' + id, JSON.stringify({ contentType, data: b64 }));
      return json({ id, url: url.origin + '/api/media/' + id }, 200, origin);
    }

    /* ---- GET/PUT /api/media/:id  (הגשת קובץ קיים / שמירת קובץ תחת מזהה שנקבע מראש בצד הלקוח) ----
       ה-id יכול להיות מזהה שנוצר בשרת (uuid, דרך POST /api/media למעלה) או מזהה שנוצר מראש
       בקוד הלקוח (admin.js), למשל "tipuach-1700000000123" - כדי לתמוך בשני המקרים המזהה כאן
       מקבל אותיות/ספרות/מקף/קו-תחתון, לא רק תבנית uuid. */
    m = path.match(/^\/api\/media\/([A-Za-z0-9_-]+)$/);
    if (m && request.method === 'GET') {
      const rec = await env.RACHELI_KV.get('media:' + m[1], 'json');
      if (!rec) return new Response('Not found', { status: 404, headers: corsHeaders(origin) });
      const bytes = base64ToBuffer(rec.data);
      return new Response(bytes, {
        status: 200,
        headers: Object.assign(
          { 'Content-Type': rec.contentType, 'Cache-Control': 'public, max-age=31536000, immutable' },
          corsHeaders(origin)
        ),
      });
    }
    if (m && request.method === 'PUT') {
      if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
      const contentType = request.headers.get('X-Content-Type') || request.headers.get('Content-Type') || 'application/octet-stream';
      const buf = await request.arrayBuffer();
      if (buf.byteLength > 20 * 1024 * 1024) return json({ error: 'file too large (max 20MB)' }, 413, origin);
      const b64 = bufferToBase64(buf);
      await env.RACHELI_KV.put('media:' + m[1], JSON.stringify({ contentType, data: b64 }));
      return json({ id: m[1], url: url.origin + '/api/media/' + m[1] }, 200, origin);
    }
    if (m && request.method === 'DELETE') {
      if (!requireAuth(request)) return json({ error: 'unauthorized' }, 401, origin);
      await env.RACHELI_KV.delete('media:' + m[1]);
      return json({ ok: true }, 200, origin);
    }

    return json({ error: 'not found' }, 404, origin);
  },
};
