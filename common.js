// רחלי כהן | יצרנית פאות — רכיבים משותפים (תפריט עגולים, לוגו, פוטר)
(function () {
  const ICONS = {
    home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/>',
    chat: '<path d="M4 5h16v11H9l-4 4V5Z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>',
    rings: '<circle cx="9" cy="14" r="5"/><circle cx="16" cy="9" r="5"/>',
    people: '<circle cx="8" cy="9" r="3.2"/><circle cx="16" cy="9" r="3.2"/><path d="M3 19c0-3 2.5-5 5-5s5 2 5 5M11 19c0-3 2.5-5 5-5s5 2 5 5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5 16 12l-6 3.5v-7Z"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M12 20s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8 3.5v4M16 3.5v4"/><path d="M12 14v3M10.5 15.5h3"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    chevronL: '<path d="m15 18-6-6 6-6"/>',
    chevronR: '<path d="m9 18 6-6-6-6"/>',
    share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none"/>',
    bookmark: '<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/>',
    photo: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" stroke="none"/><path d="m4.5 16.5 4.5-4.5a1.8 1.8 0 0 1 2.5 0l1.6 1.6M14 13.8l1.1-1.1a1.8 1.8 0 0 1 2.5 0l1.9 1.9"/>',
  };

  const NAV = [
    { icon: 'home', route: 'home', label: 'בית' },
    { icon: 'chat', route: 'feed', label: 'פיד' },
    { icon: 'sparkle', route: 'new-wig', label: 'פאה חדשה' },
    { icon: 'rings', route: 'bride', label: 'כלה' },
    { icon: 'people', route: 'renew-wig', label: 'חידוש פאה' },
    { icon: 'heart', route: 'videos', label: 'סרטונים שאהבתי' },
    { icon: 'plus', route: null, label: 'תהליך חדש', modal: 'journey' },
    { icon: 'search', route: 'articles', label: 'חיפוש / מאמרים' },
    { icon: 'info', route: 'about', label: 'אודות' },
    { icon: 'calendar', route: 'contact', label: 'קביעת פגישה' },
  ];

  function svg(name) {
    return `<svg viewBox="0 0 24 24">${ICONS[name]}</svg>`;
  }

  /* 1:1 exact icon exports from Figma for the side icon rail (per the real design, not hand-drawn) */
  const NAV_ICON_IMG = {
    home: 'assets/icons/nav-home.png',
    chat: 'assets/icons/nav-feed.png',
    sparkle: 'assets/icons/nav-newwig.png',
    rings: 'assets/icons/nav-bride.png',
    people: 'assets/icons/nav-renewwig.png',
    heart: 'assets/icons/nav-videos.png',
    plus: 'assets/icons/nav-plus.png',
    search: 'assets/icons/nav-search.png',
    info: 'assets/icons/nav-about.png',
    calendar: 'assets/icons/nav-contact.png',
  };
  function navIcon(name) {
    const img = NAV_ICON_IMG[name];
    if (!img) return svg(name);
    return `<span class="nav-icon-img" style="-webkit-mask-image:url('${img}');mask-image:url('${img}')"></span>`;
  }

  function rcHref(route) {
    return window.RC_SPA ? '#' + route : route + '.html';
  }

  function mountRail() {
    const el = document.getElementById('icon-rail');
    if (!el) return;
    const current = document.body.dataset.page || '';
    el.innerHTML = NAV.map(
      (n) => `<a href="${n.route ? rcHref(n.route) : '#'}" data-tooltip="${n.label}" aria-label="${n.label}" ${n.modal ? `data-open-modal="${n.modal}"` : ''} class="${!n.modal && n.route === current ? 'active' : ''}">${navIcon(n.icon)}</a>`
    ).join('');
  }

  function mountLogo() {
    const el = document.getElementById('site-logo');
    if (!el) return;
    el.innerHTML = `
      <a href="${rcHref('home')}" class="logo-inner">
        <div class="logo-mark">RC</div>
        <div class="logo-text">
          <span class="en1">RACHELI COHEN</span>
          <span class="logo-tagline">הכי מבינה בשבילך</span>
        </div>
      </a>`;
  }

  function mountFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
      <div class="links">
        <a href="${rcHref('terms')}">תקנון אתר</a>
        <a href="${rcHref('accessibility')}">נגישות</a>
        <a href="${rcHref('admin')}">ניהול תוכן</a>
      </div>
      <span>עוצב ופותח ע"י אפרת אסולין</span>`;
  }

  /* ---------------- modals ---------------- */
  function modalsHTML() {
    return `
    <div class="modal-overlay" id="modal-journey">
      <div class="modal-card">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="modal-photo"><img src="assets/popup_blob1.png" alt=""></div>
        <h3>לאיזה מסע תרצי להצטרף?</h3>
        <p class="sub">בחרי את התהליך שהכי מתאים לך עכשיו</p>
        <div class="journey-options">
          <a class="btn-primary" href="${rcHref('new-wig')}">מחפשת פאה חדשה</a>
          <a class="btn-primary" href="${rcHref('bride')}">אני כלה</a>
          <a class="btn-primary" href="${rcHref('renew-wig')}">חולמת לחדש את הפאה שלי</a>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-appointment">
      <div class="modal-card">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="modal-photo"><img src="assets/popup_blob1.png" alt=""></div>
        <h3>בואי נתכנן<br>את הפאה הבאה שלך</h3>
        <form id="appointment-form">
          <div class="field-row">
            <div class="field"><input type="tel" id="apt-phone" placeholder="טלפון:" required></div>
            <div class="field"><input type="text" id="apt-name" placeholder="שם:" required></div>
          </div>
          <div class="field-row">
            <div class="field"><input type="text" id="apt-date" placeholder="תאריך פנוי:" onfocus="(this.type='date')" required></div>
            <div class="field"><input type="text" id="apt-time" placeholder="שעה מועדפת:" onfocus="(this.type='time')"></div>
          </div>
          <div class="field-row">
            <div class="field"><input type="email" id="apt-email" placeholder="מייל:"></div>
          </div>
          <label class="consent-row">
            <input type="checkbox" required>
            מאשרת תקנון האתר ושמירת פרטי יצירת הקשר
          </label>
          <button type="submit" class="btn-primary">קביעת פגישה</button>
        </form>
      </div>
    </div>

    <div class="modal-overlay" id="modal-thanks">
      <div class="modal-card tone-peach">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="modal-photo"><img src="assets/popup_blob2.png" alt=""></div>
        <h3><span id="thanks-name">איזה</span> כיף, קבענו!</h3>
        <p class="thanks-meta" id="thanks-meta">הפגישה שלך עם רחלי<br>יום ותאריך: — | שעה: — | מיקום: —</p>
        <a class="btn-secondary" id="thanks-calendar" href="#" target="_blank" rel="noopener">📅 הוסיפי ליומן</a>
        <button class="btn-secondary" type="button" id="thanks-copy">העתקת כל התוכן</button>
        <p class="thanks-body">
          עכשיו מתחיל החלק הכיפי לגלות מה את אוהבת, מה תמיד רצית לנסות,<br>
          ואיך כל זה יכול להפוך לפאה הבאה שלך.
          <strong>אני מחכה לפגוש אותך ולחשוב יחד על כל האפשרויות.</strong>
        </p>
      </div>
    </div>
    <div class="rc-toast" id="rc-toast"></div>`;
  }

  function mountModals() {
    if (document.getElementById('modal-journey')) return;
    const holder = document.createElement('div');
    holder.innerHTML = modalsHTML();
    document.body.appendChild(holder);

    document.body.addEventListener('click', function (e) {
      const opener = e.target.closest('[data-open-modal]');
      if (opener) {
        e.preventDefault();
        openModal(opener.dataset.openModal);
      }
      if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal-overlay')) {
        closeAllModals();
      }
    });

    const form = document.getElementById('appointment-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('apt-name').value.trim();
        const phone = document.getElementById('apt-phone').value.trim();
        const email = document.getElementById('apt-email').value.trim();
        const dateVal = document.getElementById('apt-date').value;
        const timeVal = document.getElementById('apt-time').value;
        const location = 'הסטודיו של רחלי כהן';

        document.getElementById('thanks-name').textContent = name ? name : 'איזה';

        const dateLabel = formatHebDate(dateVal);
        const timeLabel = timeVal || 'לתיאום טלפוני';
        document.getElementById('thanks-meta').innerHTML =
          `הפגישה שלך עם רחלי<br>יום ותאריך: ${dateLabel} | שעה: ${timeLabel} | מיקום: ${location}`;

        const calUrl = buildGoogleCalendarUrl({ name, phone, email, dateVal, timeVal, location });
        document.getElementById('thanks-calendar').href = calUrl;

        const summaryText = buildAppointmentSummary({ name, phone, email, dateLabel, timeLabel, location });
        const copyBtn = document.getElementById('thanks-copy');
        copyBtn.onclick = function () { copyText(summaryText); };

        closeAllModals();
        openModal('thanks');
      });
    }
  }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function formatHebDate(dateVal) {
    if (!dateVal) return 'לתיאום';
    const d = new Date(dateVal + 'T00:00:00');
    if (isNaN(d.getTime())) return dateVal;
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return `יום ${days[d.getDay()]}, ${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  function buildGoogleCalendarUrl({ name, phone, email, dateVal, timeVal, location }) {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent('פגישה אצל רחלי כהן - יצרנית פאות' + (name ? ' | ' + name : ''));
    const details = encodeURIComponent(
      `פגישה שנקבעה דרך האתר.\nשם: ${name || '—'}\nטלפון: ${phone || '—'}\nמייל: ${email || '—'}`
    );
    const loc = encodeURIComponent(location);
    let dates = '';
    if (dateVal) {
      const d = dateVal.replace(/-/g, '');
      if (timeVal) {
        const [h, m] = timeVal.split(':');
        const start = `${d}T${pad2(h)}${pad2(m)}00`;
        const endDate = new Date(dateVal + 'T' + timeVal + ':00');
        endDate.setHours(endDate.getHours() + 1);
        const end = `${endDate.getFullYear()}${pad2(endDate.getMonth() + 1)}${pad2(endDate.getDate())}T${pad2(endDate.getHours())}${pad2(endDate.getMinutes())}00`;
        dates = `&dates=${start}/${end}`;
      } else {
        const endDate = new Date(dateVal + 'T00:00:00');
        endDate.setDate(endDate.getDate() + 1);
        const end = `${endDate.getFullYear()}${pad2(endDate.getMonth() + 1)}${pad2(endDate.getDate())}`;
        dates = `&dates=${d}/${end}`;
      }
    }
    return `${base}&text=${text}${dates}&details=${details}&location=${loc}`;
  }

  function buildAppointmentSummary({ name, phone, email, dateLabel, timeLabel, location }) {
    return [
      'פגישה אצל רחלי כהן | יצרנית פאות',
      `שם: ${name || '—'}`,
      `טלפון: ${phone || '—'}`,
      `מייל: ${email || '—'}`,
      `תאריך: ${dateLabel}`,
      `שעה: ${timeLabel}`,
      `מיקום: ${location}`,
    ].join('\n');
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('התוכן הועתק!');
    } catch (e) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('התוכן הועתק!');
      } catch (e2) {
        showToast('לא ניתן להעתיק אוטומטית - יש להעתיק ידנית');
      }
    }
  }

  function showToast(msg) {
    const t = document.getElementById('rc-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  function openModal(id) {
    const el = document.getElementById('modal-' + id);
    if (el) el.classList.add('open');
  }
  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
  }
  /* ---------------- GSAP animated-typing headings + decorative accent ---------------- */
  function initHeadingEffects() {
    if (!window.gsap) return;
    document.querySelectorAll('h1').forEach((h1) => {
      if (h1.dataset.rcAnimated === '1') return;
      h1.dataset.rcAnimated = '1';

      const plainText = (h1.innerText || h1.textContent || '').replace(/\s+/g, ' ').trim();
      h1.setAttribute('aria-label', plainText);

      const wrapTextNodes = (node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split('').forEach((ch) => {
              const span = document.createElement('span');
              span.className = 'rc-char';
              span.textContent = ch === ' ' ? ' ' : ch;
              frag.appendChild(span);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeName !== 'BR') {
            wrapTextNodes(child);
          }
        });
      };
      wrapTextNodes(h1);
      h1.setAttribute('aria-hidden', 'false');
      const chars = h1.querySelectorAll('.rc-char');

      const accent = document.createElement('div');
      accent.className = 'rc-heading-accent';
      accent.innerHTML = `
        <svg viewBox="0 0 140 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="rc-accent-grad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="var(--rose-1)"/>
              <stop offset="1" stop-color="var(--rose-2)"/>
            </linearGradient>
          </defs>
          <path class="rc-accent-path" d="M3 12c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 30 0" stroke="url(#rc-accent-grad)" stroke-width="3" stroke-linecap="round"/>
        </svg>`;
      h1.insertAdjacentElement('afterend', accent);
      const path = accent.querySelector('.rc-accent-path');
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);

      gsap.timeline()
        .set(chars, { opacity: 0, y: 10 })
        .set(accent, { opacity: 0 })
        .to(chars, { opacity: 1, y: 0, duration: 0.025, stagger: 0.032, ease: 'none' })
        .to(accent, { opacity: 1, duration: 0.25 }, '-=0.1')
        .to(path, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, '<');
    });
  }

  window.RacheliModals = { open: openModal, close: closeAllModals };
  window.RacheliCommon = {
    mountRail, mountLogo, mountFooter, mountModals,
    showToast, copyText, rcHref,
    applyRingSegments: function () { applyRingSegments(); },
    renderLikedVideosGrid: function () { renderLikedVideosGrid(); },
    isArticleSaved: isArticleSaved,
    toggleArticleSaved: toggleArticleSaved,
    initArticlesPage: initArticlesPage,
    initHeadingEffects: initHeadingEffects,
  };
  window.addEventListener('DOMContentLoaded', function () {
    window.RacheliCommon.slideDisplaySrc = slideDisplaySrc;
  });

  /* ---------------- Instagram-style story viewer ---------------- */
  const DEFAULT_TOPICS = [
    { id: 'tipuach', label: 'טיפוח', slides: [
      { type: 'image', src: 'assets/journey_center.jpg', caption: '3 טיפים לטיפוח יומיומי שישמרו על הפאה כמו ביום שקנית' },
      { type: 'image', src: 'assets/feed_card1.jpg', caption: 'שגרת טיפוח קצרה שמאריכה את חיי הפאה שלך משמעותית' },
    ] },
    { id: 'mivne', label: 'מבנה', slides: [
      { type: 'image', src: 'assets/feed_card1.jpg', caption: 'מה זה בכלל "מבנה פאה" ולמה זה הדבר הכי חשוב בבחירה' },
      { type: 'image', src: 'assets/home_hero.jpg', caption: 'הקשר שבין מבנה נכון לבין תחושת נוחות לאורך כל היום' },
    ] },
    { id: 'tzeva', label: 'צבע', slides: [
      { type: 'image', src: 'assets/home_hero.jpg', caption: 'איך למצוא את גוון השיער שהכי מדויק בשבילך' },
      { type: 'image', src: 'assets/feed_card2.jpg', caption: 'שילוב גוונים שנראה כאילו זה תמיד צמח לך ככה' },
    ] },
    { id: 'leaz', label: 'לייס', slides: [
      { type: 'image', src: 'assets/feed_card2.jpg', caption: 'לייס קדמי: למה הוא עושה את כל ההבדל בטבעיות' },
      { type: 'image', src: 'assets/journey_side.jpg', caption: 'איך לשמור על הלייס נקי ושקוף לאורך זמן' },
    ] },
    { id: 'topim', label: 'טופים', slides: [
      { type: 'image', src: 'assets/journey_side.jpg', caption: 'טופר או פאה שלמה? איך לדעת מה מתאים לך' },
      { type: 'image', src: 'assets/feed_card3.jpg', caption: 'הפתרון המושלם לנפח בלי להחליף את כל הפאה' },
    ] },
    { id: 'tnua', label: 'תנועה', slides: [
      { type: 'image', src: 'assets/feed_card3.jpg', caption: 'איך פאה עם תנועה טבעית משנה את כל המראה' },
      { type: 'image', src: 'assets/feed_card4.jpg', caption: 'הסוד לתנועה שנראית בדיוק כמו שיער אמיתי' },
    ] },
    { id: 'misgeret', label: 'מסגרת', slides: [
      { type: 'image', src: 'assets/home_hero.jpg', caption: 'המסגרת שמתאימה לצורת הפנים שלך' },
      { type: 'image', src: 'assets/journey_center.jpg', caption: 'איך מסגרת נכונה מחמיאה לתווי הפנים' },
    ] },
    { id: 'orech', label: 'אורך', slides: [
      { type: 'image', src: 'assets/feed_card4.jpg', caption: 'איזה אורך הכי הולם אותך? בואי נבדוק' },
      { type: 'image', src: 'assets/feed_card1.jpg', caption: 'איך לדעת אם קיצור או הארכה ישנו לך את כל הלוק' },
    ] },
    { id: 'tivaiyot', label: 'טבעיות', slides: [
      { type: 'image', src: 'assets/journey_center.jpg', caption: 'הסוד לטבעיות מושלמת שאף אחד לא שם לב' },
      { type: 'image', src: 'assets/home_hero.jpg', caption: 'הפרטים הקטנים שהופכים פאה לבלתי מזוהה' },
    ] },
  ];
  const STORY_DURATION = 5000;
  const VIDEO_FALLBACK_DURATION = 8000;
  let TOPICS = DEFAULT_TOPICS;
  let igTopicIndex = 0;
  let igSlideIndex = 0;
  let igTimer = null;
  let igPaused = false;
  let igCurrentDuration = STORY_DURATION;
  let igMediaEl = null;

  /* ---------------- shared content store (IndexedDB) used by the admin CMS ---------------- */
  const RCStore = (function () {
    const DB_NAME = 'racheli-cms';
    const DB_VERSION = 1;
    function openDB() {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) { reject(new Error('no-idb')); return; }
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('media')) db.createObjectStore('media');
          if (!db.objectStoreNames.contains('content')) db.createObjectStore('content');
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    async function getTopics() {
      try {
        const db = await openDB();
        return await new Promise((resolve) => {
          const tx = db.transaction('content', 'readonly');
          const req = tx.objectStore('content').get('topics');
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
      } catch (e) { return null; }
    }
    async function setTopics(data) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('content', 'readwrite');
        tx.objectStore('content').put(data, 'topics');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
    async function putMedia(id, blob) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('media', 'readwrite');
        tx.objectStore('media').put(blob, id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
    async function getMedia(id) {
      try {
        const db = await openDB();
        return await new Promise((resolve) => {
          const tx = db.transaction('media', 'readonly');
          const req = tx.objectStore('media').get(id);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
      } catch (e) { return null; }
    }
    async function deleteMedia(id) {
      try {
        const db = await openDB();
        return await new Promise((resolve) => {
          const tx = db.transaction('media', 'readwrite');
          tx.objectStore('media').delete(id);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        });
      } catch (e) {}
    }
    return { getTopics, setTopics, putMedia, getMedia, deleteMedia, DEFAULT_TOPICS };
  })();
  window.RacheliStore = RCStore;

  /* ---------------- Claude db/assets-backed cloud store (SPA artifact only) ---------------- */
  const RCCloud = (function () {
    let dbCap = null;
    let assetsCap = null;
    let userCap = null;
    let inited = false;

    async function init() {
      if (inited) return dbCap;
      inited = true;
      if (!window.RC_SPA || !window.claude || typeof window.claude.use !== 'function') return null;
      try { dbCap = await window.claude.use('db'); } catch (e) { dbCap = null; }
      try { assetsCap = await window.claude.use('assets'); } catch (e) { assetsCap = null; }
      try { userCap = await window.claude.use('user'); } catch (e) { userCap = null; }
      return dbCap;
    }
    function getDb() { return dbCap; }
    function getAssets() { return assetsCap; }
    function getUser() { return userCap; }

    function fromDocs(docs) {
      const list = docs
        .filter((d) => d.exists)
        .map((d) => Object.assign({ id: d.id }, d.data()));
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return list;
    }

    async function fetchTopics() {
      if (!dbCap) return null;
      try {
        const snap = await dbCap.collection('topics').get();
        if (!snap || !snap.docs || !snap.docs.length) return null;
        return fromDocs(snap.docs);
      } catch (e) { return null; }
    }

    function subscribeTopics(cb) {
      if (!dbCap) return function () {};
      try {
        return dbCap.collection('topics').onSnapshot(
          function (snap) { cb(fromDocs(snap.docs)); },
          function () { /* transient/terminal errors: keep last known data */ }
        );
      } catch (e) { return function () {}; }
    }

    async function seedIfEmpty(defaults) {
      if (!dbCap) return;
      const existing = await fetchTopics();
      if (existing && existing.length) return;
      for (let i = 0; i < defaults.length; i++) {
        const t = defaults[i];
        try {
          await dbCap.doc('topics/' + t.id).set({ label: t.label, order: i, slides: t.slides });
        } catch (e) { /* best-effort seed */ }
      }
    }

    async function saveLabel(topicId, label) {
      if (!dbCap) throw new Error('no-db');
      await dbCap.doc('topics/' + topicId).update({ label });
    }
    async function saveSlides(topicId, slides) {
      if (!dbCap) throw new Error('no-db');
      await dbCap.doc('topics/' + topicId).update({ slides });
    }
    async function uploadFile(file, options) {
      if (!assetsCap) throw new Error('no-assets');
      return await assetsCap.upload(file, options);
    }

    return { init, getDb, getAssets, getUser, fetchTopics, subscribeTopics, seedIfEmpty, saveLabel, saveSlides, uploadFile };
  })();
  window.RacheliCloud = RCCloud;

  function slideDisplaySrc(slide) {
    if (!slide) return '';
    if (slide.src) return slide.src;
    if (slide.assetId) return '/_blob/' + slide.assetId;
    return '';
  }

  async function hydrateMediaUrls(topics) {
    const clone = JSON.parse(JSON.stringify(topics));
    for (const topic of clone) {
      for (const slide of topic.slides) {
        if (slide.mediaId) {
          const blob = await RCStore.getMedia(slide.mediaId);
          if (blob) slide.src = URL.createObjectURL(blob);
        }
      }
    }
    return clone;
  }

  let cloudUnsub = null;

  async function loadTopics() {
    if (window.RC_SPA) {
      try {
        await RCCloud.init();
        const db = RCCloud.getDb();
        if (db) {
          await RCCloud.seedIfEmpty(DEFAULT_TOPICS);
          const cloudTopics = await RCCloud.fetchTopics();
          TOPICS = (cloudTopics && cloudTopics.length) ? cloudTopics : DEFAULT_TOPICS;
          if (cloudUnsub) cloudUnsub();
          cloudUnsub = RCCloud.subscribeTopics(function (list) {
            if (list && list.length) {
              TOPICS = list;
              igRefreshIfOpen();
              applyRingSegments();
              renderLikedVideosGrid();
            }
          });
          return;
        }
      } catch (e) {}
      TOPICS = DEFAULT_TOPICS;
      return;
    }
    try {
      const stored = await RCStore.getTopics();
      if (stored && Array.isArray(stored) && stored.length) {
        TOPICS = await hydrateMediaUrls(stored);
        return;
      }
    } catch (e) {}
    TOPICS = DEFAULT_TOPICS;
  }

  function applyRingSegments() {
    document.querySelectorAll('.topic[data-topic]').forEach(function (el) {
      const topicId = el.getAttribute('data-topic');
      const topic = TOPICS.find(function (t) { return t.id === topicId; });
      const ring = el.querySelector('.topic-ring');
      if (!ring) return;
      const count = (topic && topic.slides && topic.slides.length) ? topic.slides.length : 1;
      ring.style.setProperty('--seg-count', count);
      ring.classList.toggle('has-segments', count > 1);
    });
  }

  function igRefreshIfOpen() {
    const el = document.getElementById('igstory-overlay');
    if (el && el.classList.contains('open')) {
      if (igTopicIndex >= TOPICS.length) igTopicIndex = 0;
      igRender();
    }
  }

  function storyViewerHTML() {
    return `
    <div class="igstory-overlay" id="igstory-overlay" role="dialog" aria-modal="true" aria-label="צפייה בסטורי">
      <div class="igstory-stage">
        <div class="igstory-head">
          <div class="igstory-logo"><div class="logo-mark">RC</div><span>RACHELI COHEN</span></div>
          <button class="igstory-close" id="igstory-close" aria-label="סגירה">${svg('close')}</button>
        </div>
        <div class="igstory-progress" id="igstory-progress"></div>
        <div class="igstory-main">
          <div class="igstory-side" id="igstory-peek-prev"></div>
          <div class="igstory-card" id="igstory-card">
            <div class="igstory-media" id="igstory-media"></div>
            <button class="igstory-arrow igstory-arrow-prev" id="igstory-arrow-prev" aria-label="הסיפור הקודם">${svg('chevronR')}</button>
            <button class="igstory-arrow igstory-arrow-next" id="igstory-arrow-next" aria-label="הסיפור הבא">${svg('chevronL')}</button>
            <div class="igstory-tapzone igstory-tap-prev" data-tap="prev"></div>
            <div class="igstory-tapzone igstory-tap-next" data-tap="next"></div>
            <h3 class="igstory-caption" id="igstory-caption"></h3>
            <div class="igstory-stats">
              <span class="igstory-stat"><svg viewBox="0 0 24 24">${ICONS.eye}</svg><b id="igstory-views">220</b></span>
              <button class="igstory-stat igstory-like" id="igstory-like"><svg viewBox="0 0 24 24">${ICONS.heart}</svg><span>אהבתי</span></button>
              <button class="igstory-stat" id="igstory-share"><svg viewBox="0 0 24 24">${ICONS.share}</svg><span>שיתוף</span></button>
              <button class="igstory-stat igstory-cta" id="igstory-cta"><svg viewBox="0 0 24 24">${ICONS.calendar}</svg><span>קביעת פגישה</span></button>
            </div>
          </div>
          <div class="igstory-side" id="igstory-peek-next"></div>
        </div>
      </div>
    </div>`;
  }

  function likedSet() {
    try { return new Set(JSON.parse(localStorage.getItem('rc-liked-stories') || '[]')); }
    catch (e) { return new Set(); }
  }
  function saveLiked(set) {
    try { localStorage.setItem('rc-liked-stories', JSON.stringify([...set])); } catch (e) {}
    renderLikedVideosGrid();
  }
  function slideKey(topic, idx) { return topic.id + ':' + idx; }

  /* ---------------- saved / bookmarked articles ---------------- */
  function savedArticlesSet() {
    try { return new Set(JSON.parse(localStorage.getItem('rc-saved-articles') || '[]')); }
    catch (e) { return new Set(); }
  }
  function saveSavedArticles(set) {
    try { localStorage.setItem('rc-saved-articles', JSON.stringify([...set])); } catch (e) {}
  }
  function isArticleSaved(id) { return savedArticlesSet().has(id); }
  function toggleArticleSaved(id) {
    const set = savedArticlesSet();
    const nowSaved = !set.has(id);
    if (nowSaved) set.add(id); else set.delete(id);
    saveSavedArticles(set);
    return nowSaved;
  }

  const ARTICLES = [
    { id: 'mistakes-first-wig', tag: 'טיפים', img: 'assets/articles_card_00.jpg', title: '3 טעויות נפוצות בבחירת הפאה הראשונה', excerpt: 'דברים קטנים שעושים הבדל גדול בתוצאה', likes: 128 },
    { id: 'first-meeting-guide', tag: 'כלות', img: 'assets/articles_card_01.jpg', title: 'המדריך המלא לפגישה הראשונה', excerpt: 'כך להגיע מוכנה, בטוחה ורגועה', likes: 19 },
    { id: 'perfect-match', tag: 'לפני ואחרי', img: 'assets/articles_card_02.jpg', title: 'התאמה מושלמת עושה את כל ההבדל', excerpt: 'סיפור של שיער, ביטחון ותחושת שלמות', likes: 142 },
    { id: 'timeless-styles', tag: 'השראה', img: 'assets/articles_card_10.jpg', title: 'סגנונות אהובים שלא יוצאים מהאופנה', excerpt: 'גלי השראה לגראות יומיומית ומיוחדת', likes: 67 },
    { id: 'gentle-look-story', tag: 'סיפורים', img: 'assets/articles_card_11.jpg', title: 'היא רצתה מראה עדין וקיבלה את עצמה מחדש', excerpt: 'סיפור כלה שמרגש אותנו בכל פעם מחדש', likes: 94 },
    { id: 'keep-wig-fresh', tag: 'טיפים', img: 'assets/articles_card_12.jpg', title: 'איך לשמור על הפאה שלך נראית חדשה לאורך זמן', excerpt: '7 טיפים פשוטים לשגרת טיפול נכונה', likes: 83 },
  ];

  function renderArticlesGrid(filter) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    const list = !filter || filter === 'all' || filter === 'my-feed' ? ARTICLES : ARTICLES.filter((a) => a.tag === filter);
    if (!list.length) {
      grid.innerHTML = '<p class="articles-empty">לא נמצאו תכנים בקטגוריה הזו כרגע.</p>';
      return;
    }
    grid.innerHTML = list.map((a) => {
      const saved = isArticleSaved(a.id);
      return `
        <article class="article-card" data-id="${a.id}">
          <a class="article-media" href="#" data-open-article="${a.id}">
            <img src="${a.img}" alt="${a.title}" loading="lazy">
            <span class="article-type-badge">${svg('photo')}</span>
            <span class="article-tag">${a.tag}</span>
          </a>
          <div class="article-body">
            <h3 class="article-title">${a.title}</h3>
            <p class="article-excerpt">${a.excerpt}</p>
          </div>
          <div class="meta">
            <span class="article-likes">${svg('heart')}${a.likes}</span>
            <span class="icons">
              <button type="button" class="article-save${saved ? ' saved' : ''}" data-save="${a.id}" aria-label="שמירת מאמר" aria-pressed="${saved}"><svg viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">${ICONS.bookmark}</svg></button>
              <button type="button" class="article-share" data-share="${a.id}" aria-label="שיתוף מאמר">${svg('share')}</button>
            </span>
          </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('[data-save]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-save');
        const nowSaved = toggleArticleSaved(id);
        btn.classList.toggle('saved', nowSaved);
        btn.setAttribute('aria-pressed', nowSaved);
        btn.querySelector('svg').setAttribute('fill', nowSaved ? 'currentColor' : 'none');
        showToast(nowSaved ? 'נשמר למועדפים' : 'הוסר מהמועדפים');
      });
    });
    grid.querySelectorAll('[data-share]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-share');
        const article = ARTICLES.find((a) => a.id === id);
        const url = location.href.split('#')[0] + '#article-' + id;
        const shareData = { title: 'רחלי כהן | ' + article.title, text: article.excerpt, url };
        try {
          if (navigator.share) { await navigator.share(shareData); return; }
          throw new Error('no-share');
        } catch (e) {
          try { await navigator.clipboard.writeText(url); showToast('הקישור הועתק!'); }
          catch (e2) { showToast(url); }
        }
      });
    });
    grid.querySelectorAll('[data-open-article]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  }

  function initArticlesPage() {
    const tabs = document.querySelectorAll('.tabs-row button[data-filter]');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderArticlesGrid(btn.getAttribute('data-filter'));
      });
    });
    renderArticlesGrid('my-feed');
  }

  /* ---------------- התחברות עם גוגל - נדרש כדי לסמן "אהבתי" על סטטוס ----------------
     יש להחליף את הערך הבא במזהה לקוח (Client ID) אמיתי שנוצר ב-Google Cloud Console
     (OAuth consent screen > Credentials > Create Credentials > OAuth client ID > Web application),
     ולהוסיף את כתובת האתר החי (למשל https://racheli-cohen-wigs-site.pages.dev) ב-Authorized JavaScript origins. */
  const RC_GOOGLE_CLIENT_ID = '630651385703-vemvbsc51ti50t6srpufqkjbtm2p1502.apps.googleusercontent.com';
  let rcGoogleScriptLoading = false;

  function rcGoogleUser() {
    try { return JSON.parse(localStorage.getItem('rc-google-user') || 'null'); }
    catch (e) { return null; }
  }
  function rcSaveGoogleUser(profile) {
    try { localStorage.setItem('rc-google-user', JSON.stringify(profile)); } catch (e) {}
  }
  function rcDecodeGoogleJwt(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(json);
    } catch (e) { return null; }
  }
  function rcLoadGoogleScript(cb) {
    if (window.google && window.google.accounts && window.google.accounts.id) { cb(); return; }
    if (rcGoogleScriptLoading) {
      const wait = setInterval(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) { clearInterval(wait); cb(); }
      }, 150);
      return;
    }
    rcGoogleScriptLoading = true;
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = cb;
    document.head.appendChild(s);
  }
  function rcCloseGoogleModal() {
    const m = document.getElementById('rc-google-modal');
    if (m) m.remove();
  }
  function rcShowGoogleSignInModal(onSuccess) {
    rcCloseGoogleModal();
    const wrap = document.createElement('div');
    wrap.id = 'rc-google-modal';
    wrap.className = 'rc-google-modal';
    wrap.innerHTML = `
      <div class="rc-google-card">
        <button class="rc-google-close" aria-label="סגירה">${svg('close')}</button>
        <div class="rc-google-icon">${svg('heart')}</div>
        <h3>רק רגע לפני שמסמנים "אהבתי"</h3>
        <p>כדי לשמור את הסרטונים שאהבת ולראות אותם בעמוד "סרטונים שאהבתי", יש להתחבר עם חשבון גוגל.</p>
        <div id="rc-google-btn" class="rc-google-btn-mount"></div>
      </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('.rc-google-close').addEventListener('click', rcCloseGoogleModal);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) rcCloseGoogleModal(); });

    if (!RC_GOOGLE_CLIENT_ID) {
      const mount = document.getElementById('rc-google-btn');
      if (mount) mount.innerHTML = '<p class="rc-google-note">ההתחברות עם גוגל עדיין לא הוגדרה באתר - בקרוב.</p>';
      return;
    }
    rcLoadGoogleScript(() => {
      try {
        window.google.accounts.id.initialize({
          client_id: RC_GOOGLE_CLIENT_ID,
          callback: (resp) => {
            const payload = rcDecodeGoogleJwt(resp.credential);
            if (payload) {
              rcSaveGoogleUser({ sub: payload.sub, name: payload.name, email: payload.email, picture: payload.picture });
            }
            rcCloseGoogleModal();
            onSuccess();
          },
        });
        window.google.accounts.id.renderButton(document.getElementById('rc-google-btn'), {
          theme: 'outline', size: 'large', shape: 'pill', text: 'continue_with', locale: 'he',
        });
      } catch (e) {}
    });
  }
  function rcEnsureGoogleSignedIn(onReady) {
    if (rcGoogleUser() || !RC_GOOGLE_CLIENT_ID) { onReady(); return; }
    rcShowGoogleSignInModal(onReady);
  }

  function renderLikedVideosGrid() {
    const grid = document.getElementById('videos-grid');
    if (!grid) return;
    const liked = likedSet();
    const items = [];
    TOPICS.forEach((topic) => {
      topic.slides.forEach((slide, sIdx) => {
        if (slide.type === 'video' && liked.has(slideKey(topic, sIdx))) {
          items.push({ topic, sIdx, slide });
        }
      });
    });
    if (!items.length) {
      grid.innerHTML = '<p class="videos-empty">עדיין לא סימנת סרטונים שאהבת. פתחי סטורי ולחצי על "אהבתי" כדי לשמור אותו כאן.</p>';
      return;
    }
    grid.innerHTML = items.map((it) => `
      <div class="video-card" data-topic="${it.topic.id}" data-slide="${it.sIdx}" role="button" tabindex="0" aria-label="צפייה בסרטון">
        <video src="${slideDisplaySrc(it.slide)}" muted playsinline preload="metadata"></video>
        <span class="liked-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/></svg></span>
        <span class="play-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="rgba(0,0,0,.25)"/><path d="M10 8.5 16 12l-6 3.5v-7Z"/></svg></span>
      </div>`).join('');
    grid.querySelectorAll('.video-card').forEach((card) => {
      const open = () => openStoryViewer(card.dataset.topic, parseInt(card.dataset.slide, 10));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function currentTopic() { return TOPICS[igTopicIndex]; }
  function currentSlide() { return currentTopic().slides[igSlideIndex]; }

  function igRenderProgress() {
    const wrap = document.getElementById('igstory-progress');
    if (!wrap) return;
    const slides = currentTopic().slides;
    wrap.innerHTML = slides.map((s, i) => `
      <div class="igstory-seg">
        <span class="igstory-seg-fill ${i < igSlideIndex ? 'done' : ''}" data-seg="${i}"></span>
      </div>`).join('');
  }

  function igStartSegment() {
    document.querySelectorAll('.igstory-seg-fill').forEach((el, i) => {
      el.classList.remove('playing', 'done');
      if (i < igSlideIndex) el.classList.add('done');
      if (i === igSlideIndex) {
        el.style.animationDuration = igCurrentDuration + 'ms';
        void el.offsetWidth;
        el.classList.add('playing');
      }
    });
  }

  function igRenderMedia(slide) {
    const mount = document.getElementById('igstory-media');
    if (!mount) return;
    mount.innerHTML = '';
    igMediaEl = null;
    if (slide.type === 'video') {
      const video = document.createElement('video');
      video.src = slideDisplaySrc(slide);
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = 'igstory-video';
      mount.appendChild(video);
      igMediaEl = video;
      igCurrentDuration = VIDEO_FALLBACK_DURATION;
      video.addEventListener('loadedmetadata', () => {
        if (isFinite(video.duration) && video.duration > 0) {
          igCurrentDuration = video.duration * 1000;
          igStartSegment();
        }
      });
      video.addEventListener('ended', () => { igNext(); igScheduleNext(); });
      video.play().catch(() => {});
    } else {
      const img = document.createElement('img');
      img.src = slideDisplaySrc(slide);
      img.alt = currentTopic().label;
      mount.appendChild(img);
      igCurrentDuration = STORY_DURATION;
    }
  }

  function igRender() {
    const topic = currentTopic();
    const slide = currentSlide();
    const caption = document.getElementById('igstory-caption');
    const views = document.getElementById('igstory-views');
    const likeBtn = document.getElementById('igstory-like');
    if (!caption) return;

    igRenderMedia(slide);
    caption.textContent = slide.caption || '';
    views.textContent = 200 + (igTopicIndex * 7) + (igSlideIndex * 3) + 13;

    const liked = likedSet().has(slideKey(topic, igSlideIndex));
    likeBtn.classList.toggle('liked', liked);
    likeBtn.querySelector('span').textContent = liked ? 'אהבתי!' : 'אהבתי';

    const prevTopic = TOPICS[(igTopicIndex - 1 + TOPICS.length) % TOPICS.length];
    const nextTopic = TOPICS[(igTopicIndex + 1) % TOPICS.length];
    const peekPrev = document.getElementById('igstory-peek-prev');
    const peekNext = document.getElementById('igstory-peek-next');
    if (peekPrev) peekPrev.style.backgroundImage = `url('${slideDisplaySrc(prevTopic.slides[0])}')`;
    if (peekNext) peekNext.style.backgroundImage = `url('${slideDisplaySrc(nextTopic.slides[0])}')`;

    igRenderProgress();
    igStartSegment();
  }

  function igGoToTopic(topicIdx, slideIdx) {
    igTopicIndex = (topicIdx + TOPICS.length) % TOPICS.length;
    const slides = currentTopic().slides;
    igSlideIndex = ((slideIdx % slides.length) + slides.length) % slides.length;
    igRender();
  }

  function igNext() {
    const slides = currentTopic().slides;
    if (igSlideIndex < slides.length - 1) {
      igSlideIndex += 1;
      igRender();
    } else {
      igGoToTopic(igTopicIndex + 1, 0);
    }
  }
  function igPrev() {
    if (igSlideIndex > 0) {
      igSlideIndex -= 1;
      igRender();
    } else {
      const prevTopicIdx = (igTopicIndex - 1 + TOPICS.length) % TOPICS.length;
      igGoToTopic(prevTopicIdx, TOPICS[prevTopicIdx].slides.length - 1);
    }
  }

  function igClearTimer() {
    if (igTimer) { clearTimeout(igTimer); igTimer = null; }
  }
  function igScheduleNext() {
    igClearTimer();
    if (igPaused) return;
    if (currentSlide().type === 'video') return; // advanced by the video's own 'ended' event
    igTimer = setTimeout(() => { igNext(); igScheduleNext(); }, igCurrentDuration);
  }

  function igPause() {
    igPaused = true;
    igClearTimer();
    const fill = document.querySelector('.igstory-seg-fill.playing');
    if (fill) fill.style.animationPlayState = 'paused';
    if (igMediaEl) igMediaEl.pause();
  }
  function igResume() {
    igPaused = false;
    const fill = document.querySelector('.igstory-seg-fill.playing');
    if (fill) fill.style.animationPlayState = 'running';
    if (igMediaEl) igMediaEl.play().catch(() => {});
    igScheduleNext();
  }

  function openStoryViewer(topicId, slideIndex) {
    const el = document.getElementById('igstory-overlay');
    if (!el) return;
    const startIndex = Math.max(0, TOPICS.findIndex((t) => t.id === topicId));
    igTopicIndex = startIndex;
    igSlideIndex = (typeof slideIndex === 'number' && slideIndex >= 0 && slideIndex < currentTopic().slides.length) ? slideIndex : 0;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    igRender();
    igPaused = false;
    igScheduleNext();
  }
  function closeStoryViewer() {
    const el = document.getElementById('igstory-overlay');
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
    igClearTimer();
    if (igMediaEl) { igMediaEl.pause(); igMediaEl = null; }
  }

  function mountStoryViewer() {
    if (document.getElementById('igstory-overlay')) return;
    const holder = document.createElement('div');
    holder.innerHTML = storyViewerHTML();
    document.body.appendChild(holder);

    document.getElementById('igstory-close').addEventListener('click', closeStoryViewer);
    document.getElementById('igstory-arrow-next').addEventListener('click', (e) => { e.stopPropagation(); igNext(); igScheduleNext(); });
    document.getElementById('igstory-arrow-prev').addEventListener('click', (e) => { e.stopPropagation(); igPrev(); igScheduleNext(); });
    document.getElementById('igstory-peek-next').addEventListener('click', () => { igGoToTopic(igTopicIndex + 1, 0); igScheduleNext(); });
    document.getElementById('igstory-peek-prev').addEventListener('click', () => { igGoToTopic(igTopicIndex - 1, 0); igScheduleNext(); });

    document.querySelectorAll('.igstory-tapzone').forEach((z) => {
      z.addEventListener('click', () => {
        if (z.dataset.tap === 'next') igNext(); else igPrev();
        igScheduleNext();
      });
    });

    const card = document.getElementById('igstory-card');
    card.addEventListener('pointerdown', igPause);
    card.addEventListener('pointerup', igResume);
    card.addEventListener('pointerleave', igResume);

    document.getElementById('igstory-like').addEventListener('click', () => {
      const topic = currentTopic();
      const key = slideKey(topic, igSlideIndex);
      const alreadyLiked = likedSet().has(key);
      if (alreadyLiked) {
        const set = likedSet();
        set.delete(key);
        saveLiked(set);
        igRender();
        return;
      }
      rcEnsureGoogleSignedIn(() => {
        const set = likedSet();
        set.add(key);
        saveLiked(set);
        igRender();
      });
    });

    document.getElementById('igstory-share').addEventListener('click', async () => {
      const topic = currentTopic();
      const slide = currentSlide();
      const url = location.href.split('#')[0] + '#story-' + topic.id;
      const shareData = { title: 'רחלי כהן | ' + topic.label, text: slide.caption || topic.label, url };
      try {
        if (navigator.share) { await navigator.share(shareData); return; }
        throw new Error('no-share');
      } catch (e) {
        try {
          await navigator.clipboard.writeText(url);
          showToast('הקישור הועתק!');
        } catch (e2) {
          showToast(url);
        }
      }
    });

    document.getElementById('igstory-cta').addEventListener('click', () => {
      closeStoryViewer();
      openModal('appointment');
    });

    document.getElementById('igstory-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'igstory-overlay') closeStoryViewer();
    });

    document.addEventListener('keydown', (e) => {
      const el = document.getElementById('igstory-overlay');
      if (!el || !el.classList.contains('open')) return;
      if (e.key === 'Escape') closeStoryViewer();
      if (e.key === 'ArrowRight') { igPrev(); igScheduleNext(); }
      if (e.key === 'ArrowLeft') { igNext(); igScheduleNext(); }
    });

    document.body.addEventListener('click', (e) => {
      const topic = e.target.closest('[data-topic]');
      if (topic) {
        e.preventDefault();
        openStoryViewer(topic.dataset.topic);
      }
    });
    document.body.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-topic]')) {
        e.preventDefault();
        openStoryViewer(e.target.dataset.topic);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', async function () {
    mountRail();
    mountLogo();
    mountFooter();
    mountModals();
    await loadTopics();
    mountStoryViewer();
    applyRingSegments();
    renderLikedVideosGrid();
    initHeadingEffects();
  });
})();
