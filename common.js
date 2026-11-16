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
    grid: '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6"/><rect x="13" y="13" width="7.5" height="7.5" rx="1.6"/>',
    soundOn: '<path d="M4 9.5v5h4l5 4v-13l-5 4H4Z"/><path d="M16.5 9.2a4.5 4.5 0 0 1 0 5.6M19 7a8 8 0 0 1 0 10"/>',
    soundOff: '<path d="M4 9.5v5h4l5 4v-13l-5 4H4Z"/><path d="m15.5 10 4 4M19.5 10l-4 4"/>',
  };

  /* סדר תפריט הניווט הראשי — לפי המבנה המעודכן.
     הערה: שמות מפתחות האייקון (icon) הם היסטוריים ולא תמיד תואמים את הצורה/העמוד בפועל —
     ה-PNG בפועל שכל אחד מציג מוגדר ב-NAV_ICON_IMG למטה. מיפוי קבצים בפועל נכון לעכשיו:
     home→בית, chat→בועת שיחה (אודות), sparkle→שיער עם נצנוץ (פאה חדשה), rings→טבעות (כלה),
     people→דיוקן עם חץ (חידוש פאה), heart→כפתור פליי (פיד), search→זכוכית מגדלת (חיפוש),
     info→לב אמיתי (תוכן שאהבתי), calendar→לוח שנה (קביעת פגישה) */
  const NAV = [
    { icon: 'home', route: 'home', label: 'דף בית' },
    { icon: 'chat', route: 'about', label: 'אודות' },
    { icon: 'sparkle', route: 'new-wig', label: 'פאה חדשה' },
    { icon: 'rings', route: 'bride', label: 'כלה' },
    { icon: 'people', route: 'renew-wig', label: 'חידוש פאה' },
    { icon: 'heart', route: 'feed', label: 'פיד' },
    { icon: 'grid', route: 'articles', label: 'עולם תוכן' },
    { icon: 'search', route: null, label: 'חיפוש', modal: 'search' },
    { icon: 'info', route: 'videos', label: 'תוכן שאהבתי' },
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
    search: 'assets/icons/nav-search.png',
    info: 'assets/icons/nav-about.png',
    calendar: 'assets/icons/nav-contact.png',
    /* 'grid' (עולם תוכן) has no exact Figma export — falls back to the matching line-icon from ICONS */
  };
  function navIcon(name) {
    const img = NAV_ICON_IMG[name];
    if (!img) return svg(name);
    return `<span class="nav-icon-img" style="-webkit-mask-image:url('${img}');mask-image:url('${img}')"></span>`;
  }

  function rcHref(route) {
    return window.RC_SPA ? '#' + route : route + '.html';
  }

  /* קישור לדף מאמר יחיד - קיים כרגע רק באתר הסטטי (article.html?id=...); בגרסת ה-SPA
     (הארטיפקט) עדיין אין דף מאמר נפרד, כך שממשיכים להפנות לדף רשימת המאמרים */
  function articleHref(id) {
    return window.RC_SPA ? rcHref('articles') : 'article.html?id=' + encodeURIComponent(id);
  }

  function mountRail() {
    const el = document.getElementById('icon-rail');
    if (!el) return;
    const current = document.body.dataset.page || '';
    /* nav-label נוסף לכל קישור - מוסתר ב-CSS בדסקטופ וברצועת האייקונים הישנה, ונחשף רק
       כשהתפריט נפתח כמגירה צדדית במובייל (ר' מדיה קוארי מובייל ב-styles.css) */
    el.innerHTML = NAV.map(
      (n) => `<a href="${n.route ? rcHref(n.route) : '#'}" data-tooltip="${n.label}" aria-label="${n.label}" ${n.modal ? `data-open-modal="${n.modal}"` : ''} class="${!n.modal && n.route === current ? 'active' : ''}">${navIcon(n.icon)}<span class="nav-label">${n.label}</span></a>`
    ).join('');
  }

  /* ---------------- תפריט המבורגר למובייל - פותח את רצועת הניווט כמגירה צדדית ---------------- */
  function mountMobileNav() {
    const sideCol = document.querySelector('.side-col');
    const rail = document.getElementById('icon-rail');
    if (!sideCol || !rail || document.querySelector('.nav-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'פתיחת תפריט ניווט');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    sideCol.insertBefore(toggle, rail);

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט');
    }

    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    backdrop.addEventListener('click', () => setOpen(false));
    rail.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setOpen(false);
    });
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

  /* ---------------- כפתור "קבעי פגישה" צף - מופיע בכל עמודי האתר ---------------- */
  function mountSideCta() {
    if (document.getElementById('site-side-cta')) return;
    if (document.body.dataset.page === 'admin') return;
    const content = document.querySelector('.content');
    if (!content) return;
    const holder = document.createElement('div');
    holder.innerHTML = `
      <div class="side-cta" id="site-side-cta">
        <a href="#" data-open-modal="appointment" aria-label="קביעת פגישה">
          <span class="side-cta-ring" aria-hidden="true"></span>
          <span class="side-cta-icon">${svg('calendar')}</span>
        </a>
      </div>`;
    const el = holder.firstElementChild;
    const footer = document.getElementById('site-footer');
    if (footer && footer.parentElement === content) content.insertBefore(el, footer);
    else content.appendChild(el);
  }

  /* ---------------- modals ---------------- */
  /* מיפוי הקשר (journey) לפי עמוד, כדי שפופאפ קביעת הפגישה "יזהה על מה מדובר" */
  const JOURNEY_CONTEXT_LABELS = {
    bride: 'אני כלה',
    'new-wig': 'מחפשת פאה חדשה',
    'renew-wig': 'חולמת לחדש את הפאה שלי',
  };

  function modalsHTML() {
    return `
    <div class="modal-overlay" id="modal-journey">
      <div class="modal-card">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="modal-photo"><img src="assets/popup_blob1.png" alt=""></div>
        <h3>לאיזה מסע תרצי להצטרף?</h3>
        <p class="sub">בחרי את התהליך שהכי מתאים לך עכשיו</p>
        <div class="journey-options">
          <a class="btn-primary" data-journey="new-wig" href="${rcHref('new-wig')}">מחפשת פאה חדשה</a>
          <a class="btn-primary" data-journey="bride" href="${rcHref('bride')}">אני כלה</a>
          <a class="btn-primary" data-journey="renew-wig" href="${rcHref('renew-wig')}">חולמת לחדש את הפאה שלי</a>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-appointment">
      <div class="modal-card">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="modal-photo"><img src="assets/popup_blob1.png" alt=""></div>
        <h3>בואי נתכנן<br>את הפאה הבאה שלך</h3>
        <p class="sub apt-context-sub" id="apt-context-sub" hidden></p>
        <form id="appointment-form">
          <div class="field-row">
            <div class="field"><input type="tel" dir="rtl" id="apt-phone" placeholder="טלפון:" required></div>
            <div class="field"><input type="text" dir="rtl" id="apt-name" placeholder="שם:" required></div>
          </div>
          <div class="field-row">
            <div class="field"><input type="date" dir="rtl" id="apt-date" required></div>
            <div class="field"><select id="apt-time" required disabled><option value="">בחרי תאריך תחילה</option></select></div>
          </div>
          <p class="field-hint" id="apt-slots-hint" hidden></p>
          <div class="field-row">
            <div class="field"><input type="email" dir="rtl" id="apt-email" placeholder="מייל:"></div>
          </div>
          <label class="consent-row">
            <input type="checkbox" required>
            מאשרת תקנון האתר ושמירת פרטי יצירת הקשר
          </label>
          <button type="submit" class="btn-primary" id="apt-submit-btn">קביעת פגישה</button>
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
    <div class="modal-overlay" id="modal-search">
      <div class="modal-card modal-card--search">
        <button class="modal-close" data-close-modal>&times;</button>
        <h3>מה תרצי לחפש?</h3>
        <div class="search-field">
          ${svg('search')}
          <input type="text" id="site-search-input" placeholder="חיפוש מאמרים, טיפים, השראה..." autocomplete="off">
        </div>
        <div class="search-quicklinks" id="search-quicklinks"></div>
        <div class="search-results" id="search-results"></div>
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
        openModal(opener.dataset.openModal, { contextLabel: opener.dataset.contextLabel });
      }
      if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal-overlay')) {
        closeAllModals();
      }
      if (e.target.closest('.search-quicklink, .search-result')) {
        closeAllModals();
      }
    });

    const searchInput = document.getElementById('site-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => renderSearchResults(searchInput.value.trim()));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
      });
    }

    initAppointmentScheduling();
  }

  /* ---------------- טופס קביעת הפגישה הציבורי: תאריך + רשימת שעות פנויות אמיתית מהשרת ---------------- */
  let rcHoursConfigCache = null; /* נטען פעם אחת ונשמר בזיכרון למשך כל טעינת העמוד */
  async function getHoursConfigCached() {
    if (rcHoursConfigCache) return rcHoursConfigCache;
    const stored = window.RacheliStore ? await window.RacheliStore.getHours() : null;
    rcHoursConfigCache = stored || DEFAULT_HOURS;
    return rcHoursConfigCache;
  }

  function initAppointmentScheduling() {
    const dateInput = document.getElementById('apt-date');
    const timeSelect = document.getElementById('apt-time');
    const hint = document.getElementById('apt-slots-hint');
    const form = document.getElementById('appointment-form');
    if (!dateInput || !timeSelect || !form) return;

    const today = new Date();
    dateInput.min = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;

    async function loadSlotsForDate(dateVal) {
      timeSelect.innerHTML = '';
      if (!dateVal) {
        timeSelect.disabled = true;
        timeSelect.innerHTML = '<option value="">בחרי תאריך תחילה</option>';
        hint.hidden = true;
        return;
      }
      timeSelect.disabled = true;
      timeSelect.innerHTML = '<option value="">טוענת שעות פנויות...</option>';
      hint.hidden = true;

      const hours = await getHoursConfigCached();
      const d = new Date(dateVal + 'T00:00:00');
      const dayConfig = hours.days ? hours.days[d.getDay()] : null;
      const isBlocked = Array.isArray(hours.blockedDates) && hours.blockedDates.includes(dateVal);

      if (isBlocked || !dayConfig || !dayConfig.open) {
        timeSelect.innerHTML = '<option value="">אין קבלה בתאריך זה</option>';
        hint.hidden = false;
        hint.textContent = 'רחלי לא מקבלת תורים בתאריך הזה - נא לבחור תאריך אחר.';
        return;
      }

      const allSlots = computeDaySlots(dayConfig, hours.slotMinutes);
      const taken = window.RacheliStore ? await window.RacheliStore.getTakenSlots(dateVal) : [];
      const isToday = dateVal === dateInput.min;
      const nowMinutes = today.getHours() * 60 + today.getMinutes();
      const available = allSlots.filter((t) => !taken.includes(t) && !(isToday && timeToMinutes(t) <= nowMinutes));

      if (!available.length) {
        timeSelect.innerHTML = '<option value="">אין שעות פנויות בתאריך זה</option>';
        hint.hidden = false;
        hint.textContent = 'כל השעות בתאריך זה תפוסות - נא לבחור תאריך אחר.';
        return;
      }

      timeSelect.disabled = false;
      timeSelect.innerHTML = '<option value="">בחרי שעה</option>' + available.map((t) => `<option value="${t}">${t}</option>`).join('');
    }

    dateInput.addEventListener('change', () => loadSlotsForDate(dateInput.value));
    window._rcLoadSlotsForDate = loadSlotsForDate;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('apt-name').value.trim();
      const phone = document.getElementById('apt-phone').value.trim();
      const email = document.getElementById('apt-email').value.trim();
      const dateVal = dateInput.value;
      const timeVal = timeSelect.value;
      const location = 'הסטודיו של רחלי כהן';
      const context = window._rcAptContext || '';

      if (!dateVal || !timeVal) {
        showToast('נא לבחור תאריך ושעה פנויה');
        return;
      }

      const submitBtn = document.getElementById('apt-submit-btn');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'קובעת...';

      try {
        await window.RacheliStore.bookAppointment({ date: dateVal, time: timeVal, name, phone, email, context });

        document.getElementById('thanks-name').textContent = name ? name : 'איזה';
        const dateLabel = formatHebDate(dateVal);
        const timeLabel = timeVal;
        const contextLine = context ? `<br>נושא הפגישה: ${context}` : '';
        document.getElementById('thanks-meta').innerHTML =
          `הפגישה שלך עם רחלי<br>יום ותאריך: ${dateLabel} | שעה: ${timeLabel} | מיקום: ${location}${contextLine}`;

        const calUrl = buildGoogleCalendarUrl({ name, phone, email, dateVal, timeVal, location, context });
        document.getElementById('thanks-calendar').href = calUrl;

        const summaryText = buildAppointmentSummary({ name, phone, email, dateLabel, timeLabel, location, context });
        const copyBtn = document.getElementById('thanks-copy');
        copyBtn.onclick = function () { copyText(summaryText); };

        closeAllModals();
        openModal('thanks');
        form.reset();
        loadSlotsForDate('');
      } catch (err) {
        if (err && err.code === 'slot-taken') {
          showToast('מצטערים, השעה הזו נתפסה הרגע - נא לבחור שעה אחרת');
          loadSlotsForDate(dateVal);
        } else {
          showToast('משהו השתבש, נסי שוב בעוד רגע');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function formatHebDate(dateVal) {
    if (!dateVal) return 'לתיאום';
    const d = new Date(dateVal + 'T00:00:00');
    if (isNaN(d.getTime())) return dateVal;
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return `יום ${days[d.getDay()]}, ${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  function buildGoogleCalendarUrl({ name, phone, email, dateVal, timeVal, location, context }) {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent('פגישה אצל רחלי כהן - יצרנית פאות' + (name ? ' | ' + name : ''));
    const details = encodeURIComponent(
      `פגישה שנקבעה דרך האתר.${context ? '\nנושא: ' + context : ''}\nשם: ${name || '—'}\nטלפון: ${phone || '—'}\nמייל: ${email || '—'}`
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

  function buildAppointmentSummary({ name, phone, email, dateLabel, timeLabel, location, context }) {
    const lines = ['פגישה אצל רחלי כהן | יצרנית פאות'];
    if (context) lines.push(`נושא: ${context}`);
    lines.push(
      `שם: ${name || '—'}`,
      `טלפון: ${phone || '—'}`,
      `מייל: ${email || '—'}`,
      `תאריך: ${dateLabel}`,
      `שעה: ${timeLabel}`,
      `מיקום: ${location}`
    );
    return lines.join('\n');
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

  function openModal(id, opts) {
    opts = opts || {};
    const el = document.getElementById('modal-' + id);
    if (el) el.classList.add('open');
    if (id === 'search') {
      renderSearchQuicklinks();
      renderSearchResults('');
      const input = document.getElementById('site-search-input');
      if (input) { input.value = ''; setTimeout(() => input.focus(), 50); }
    }
    if (id === 'appointment') {
      const label = opts.contextLabel || JOURNEY_CONTEXT_LABELS[document.body.dataset.page] || '';
      window._rcAptContext = label;
      const sub = document.getElementById('apt-context-sub');
      if (sub) {
        if (label) { sub.hidden = false; sub.textContent = 'התאמה אישית למסע: ' + label; }
        else { sub.hidden = true; sub.textContent = ''; }
      }
    }
    if (id === 'journey') {
      const label = opts.contextLabel || JOURNEY_CONTEXT_LABELS[document.body.dataset.page] || '';
      const matchKey = Object.keys(JOURNEY_CONTEXT_LABELS).find((k) => JOURNEY_CONTEXT_LABELS[k] === label);
      document.querySelectorAll('#modal-journey [data-journey]').forEach((a) => {
        a.classList.toggle('is-suggested', !!matchKey && a.dataset.journey === matchKey);
      });
    }
  }
  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
  }

  /* ---------------- site-wide quick search (modal) ---------------- */
  function renderSearchQuicklinks() {
    const holder = document.getElementById('search-quicklinks');
    if (!holder) return;
    const links = NAV.filter((n) => n.route);
    holder.innerHTML = links.map((n) => `
      <a class="search-quicklink" href="${rcHref(n.route)}">
        <span class="search-quicklink-ic">${navIcon(n.icon)}</span>
        <span>${n.label}</span>
      </a>`).join('');
  }

  function renderSearchResults(query) {
    const holder = document.getElementById('search-results');
    const quick = document.getElementById('search-quicklinks');
    if (!holder) return;
    const q = (query || '').trim();
    if (!q) {
      holder.innerHTML = '';
      holder.hidden = true;
      if (quick) quick.hidden = false;
      return;
    }
    if (quick) quick.hidden = true;
    holder.hidden = false;
    const list = typeof ARTICLES !== 'undefined' ? ARTICLES : [];
    const norm = q.toLowerCase();
    const matches = list.filter((a) =>
      a.title.toLowerCase().includes(norm) ||
      a.excerpt.toLowerCase().includes(norm) ||
      a.tag.toLowerCase().includes(norm)
    );
    if (!matches.length) {
      holder.innerHTML = `<p class="search-empty">לא נמצאו תוצאות עבור "${q}".</p>`;
      return;
    }
    holder.innerHTML = matches.map((a) => `
      <a class="search-result" href="${articleHref(a.id)}" data-open-article="${a.id}">
        <img src="${a.img}" alt="">
        <span class="search-result-body">
          <strong>${a.title}</strong>
          <small>${a.tag} · ${a.excerpt}</small>
        </span>
      </a>`).join('');
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

      gsap.timeline()
        .set(chars, { opacity: 0, y: 10 })
        .to(chars, { opacity: 1, y: 0, duration: 0.025, stagger: 0.032, ease: 'none' });
    });
  }

  /* ---------------- קולג א-סימטרי של כל הדוגמניות בדף הבית (gsap) ---------------- */
  /* 25 תמונות הדוגמניות שהועלו - מקור יחיד לאמת לכל שימושי הקולג */
  const MODEL_IMAGES = Array.from({ length: 25 }, (_, i) => `assets/model_${String(i + 1).padStart(2, '0')}.jpg`);
  /* דפוס גדלים חוזר שיוצר תחושה לא-סימטרית: רוב האריחים קטנים (1x1), חלק מוארכים, ומעטים גדולים - בלי שום סדר צפוי.
     מעט פחות שילובי 2x2 (sz-w2 sz-h2) מאשר קודם - קאדר כזה חותך פרצופים בצורה קיצונית מדי */
  const COLLAGE_SPAN_PATTERN = [
    '', '', 'sz-w2', '', 'sz-h2', '', '', '', '', 'sz-w2',
    'sz-h2', '', '', '', '', '', 'sz-h2', '', 'sz-w2', '',
    '', 'sz-w2 sz-h2', '', 'sz-h2', '', '', 'sz-w2', '', '', '',
  ];
  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  /* בונה רצף תמונות ארוך מספיק למילוי מלא של הרשת בכל גודל מסך, כשאותה תמונה לא חוזרת בטווח קרוב
     (לא רק הצמוד הישיר) - כדי שלא יהיה רושם של "אותה תמונה שוב ושוב לידה" גם ברשת צפופה */
  function buildCollageSequence(count) {
    const seq = [];
    const noRepeatWindow = Math.min(8, MODEL_IMAGES.length - 1);
    let pool = shuffled(MODEL_IMAGES);
    let idx = 0;
    let guard = 0;
    while (seq.length < count) {
      if (idx >= pool.length) { pool = shuffled(MODEL_IMAGES); idx = 0; }
      const next = pool[idx++];
      const recent = seq.slice(-noRepeatWindow);
      if (recent.includes(next)) {
        guard++;
        if (guard < MODEL_IMAGES.length * 2) continue; /* מונע חזרה בטווח הקרוב */
      }
      guard = 0;
      seq.push(next);
    }
    return seq;
  }
  /* מחשב כמה אריחים צריך כדי שהרשת תתמלא לגמרי בפועל, לפי הגובה/רוחב האמיתיים של הקולג במסך הזה -
     כך שלעולם לא יישאר "חור" ריק בתחתית הדף הבית, גם במסכים גבוהים/רחבים מאוד. אריחים גדולים יותר
     (ר' styles.css) אומרים פחות אריחים נדרשים בסה"כ - וזה גם מצמצם תחושת חזרתיות של 25 התמונות */
  function computeTileTarget(collage) {
    const rect = collage.getBoundingClientRect();
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 860px)').matches;
    const cols = isMobile ? 6 : 12;
    const rowUnit = isMobile ? 58 : 60; /* מעט קטן מהמינימום האמיתי ב-CSS, בכוונה - כדי להעריך ביתר שאת */
    const estRows = Math.ceil((rect.height || window.innerHeight * 1.2) / rowUnit) + 3;
    const totalCells = cols * estRows;
    /* דורשים אריח אחד לכל תא ברשת (הערכת-יתר מכוונת: חלק מהאריחים תופסים 2-4 תאים בפועל, כך
       שתמיד ייצא עודף תמונות על פני השטח הדרוש, ולא חוסר שישאיר "חור" ריק) */
    return Math.max(28, Math.min(totalCells, 150));
  }
  /* בונה אריח קולאז' בודד: רקע מטושטש (collage-tile-bg, cover - ממלא לגמרי, בלי חור ריק) + התמונה
     האמיתית מעליו ב-object-fit:contain (img) - כך שהתמונה השלמה תמיד נראית, בלי לחתוך ראשים/פרצופים */
  function buildCollageTile(src, spanClass, loading) {
    const tile = document.createElement('div');
    tile.className = 'collage-tile' + (spanClass ? ' ' + spanClass : '');
    const bg = document.createElement('div');
    bg.className = 'collage-tile-bg';
    bg.style.backgroundImage = `url(${src})`;
    tile.appendChild(bg);
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = loading;
    img.decoding = 'async';
    tile.appendChild(img);
    return tile;
  }
  function initHeroCollage() {
    const collage = document.getElementById('hero-collage') || document.querySelector('.hero-collage');
    if (!collage || collage.dataset.rcCollageInit === '1') return;
    collage.dataset.rcCollageInit = '1';
    const TILE_COUNT = computeTileTarget(collage);
    const sequence = buildCollageSequence(TILE_COUNT);
    const frag = document.createDocumentFragment();
    sequence.forEach((src, i) => {
      const spanClass = COLLAGE_SPAN_PATTERN[i % COLLAGE_SPAN_PATTERN.length];
      frag.appendChild(buildCollageTile(src, spanClass, i < 10 ? 'eager' : 'lazy'));
    });
    collage.appendChild(frag);
    collage.dataset.rcTileCount = String(sequence.length);

    /* אם המסך גדל משמעותית אחרי הטעינה (שינוי גודל חלון, סיבוב טאבלט) - מוסיפים עוד אריחים כדי שלא יישאר חור ריק */
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const need = computeTileTarget(collage);
        const have = parseInt(collage.dataset.rcTileCount, 10) || 0;
        if (need <= have * 1.1) return;
        const extra = buildCollageSequence(need - have);
        const extraFrag = document.createDocumentFragment();
        extra.forEach((src, i) => {
          const spanClass = COLLAGE_SPAN_PATTERN[(have + i) % COLLAGE_SPAN_PATTERN.length];
          const tile = buildCollageTile(src, spanClass, 'lazy');
          extraFrag.appendChild(tile);
          if (window.gsap && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
            gsap.to(tile.querySelector('img'), {
              scale: 1.12, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
              delay: Math.random() * 1.5,
            });
          }
        });
        collage.appendChild(extraFrag);
        collage.dataset.rcTileCount = String(need);
      }, 400);
    });

    if (!window.gsap) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const tiles = collage.querySelectorAll('.collage-tile');
    /* כניסה עדינה בטעינה - כל אריח נכנס בקנה מידה עם דיליי אקראי קטן */
    gsap.fromTo(tiles, { opacity: 0, scale: 1.12 }, {
      opacity: 1, scale: 1,
      duration: 1.1,
      ease: 'power2.out',
      stagger: { each: 0.012, from: 'random' },
    });
    /* "נשימה" עדינה ומתמשכת - כל תמונה גדלה ומתכווצת בקנה מידה משלה, עם דיליי אקראי כדי שלא יזוזו יחד */
    gsap.to(collage.querySelectorAll('.collage-tile img'), {
      scale: 1.12,
      duration: 4.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.15, from: 'random' },
    });
    /* תנועה עדינה שבה כל אריח "צף" לאט כלפי מעלה וחוזר - משך ודיליי אקראיים לכל אריח כדי שהקיר ירגיש חי ולא מסונכרן */
    tiles.forEach((tile) => {
      gsap.to(tile, {
        y: -(6 + Math.random() * 10),
        duration: 3 + Math.random() * 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2,
      });
    });
  }

  window.RacheliModals = { open: openModal, close: closeAllModals };
  window.RacheliCommon = {
    mountRail, mountLogo, mountFooter, mountModals, mountMobileNav,
    showToast, copyText, rcHref,
    applyRingSegments: function () { applyRingSegments(); },
    renderLikedVideosGrid: function () { renderLikedVideosGrid(); },
    isArticleSaved: isArticleSaved,
    toggleArticleSaved: toggleArticleSaved,
    initArticlesPage: initArticlesPage,
    initArticlePage: initArticlePage,
    initHeadingEffects: initHeadingEffects,
    initMiscLikeButtons: initMiscLikeButtons,
    initRevealAnimations: initRevealAnimations,
    mountSideCta: mountSideCta,
    initHeroCollage: initHeroCollage,
    renderFeedList: function () { renderFeedList(); },
    renderBrideJourney: function () { renderBrideJourney(); },
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
  /* ---------------- תוכן הפיד (דף "פיד") - ניתן לניהול דרך האדמין, בדיוק כמו הסטוריז ---------------- */
  const DEFAULT_FEED_POSTS = [
    { id: 'feed-1', type: 'image', src: 'assets/feed_card1.jpg', caption: 'טיפוח יומיומי לפאה', views: 220, ctaLabel: 'קביעת פגישה' },
    { id: 'feed-2', type: 'image', src: 'assets/feed_card2.jpg', caption: 'מבנה ודילול נכון', views: 184, ctaLabel: 'קביעת פגישה' },
    { id: 'feed-3', type: 'image', src: 'assets/feed_card3.jpg', caption: 'שילוב גוונים טבעי', views: 312, ctaLabel: 'קביעת פגישה' },
    { id: 'feed-4', type: 'image', src: 'assets/feed_card4.jpg', caption: 'תנועה טבעית בפאה', views: 275, ctaLabel: 'קביעת פגישה' },
  ];
  let FEED_POSTS = DEFAULT_FEED_POSTS;

  /* ---------------- קרוסלת "אני כלה" (סרטוני/תמונות כלה) - ניתנת לניהול דרך האדמין ---------------- */
  const DEFAULT_BRIDE_JOURNEY = [
    { id: 'bride-j-1', type: 'image', src: 'assets/journey_side.jpg', caption: 'נושא?' },
    { id: 'bride-j-2', type: 'image', src: 'assets/journey_side.jpg', caption: 'מה אני רואה כשאני מסתכלת על פאה?' },
    { id: 'bride-j-3', type: 'image', src: 'assets/journey_center.jpg', showStats: true, likeId: 'bride-story-1', views: 220, active: true },
    { id: 'bride-j-4', type: 'image', src: 'assets/journey_side.jpg', caption: 'לא כל פאה יפה היא הפאה המדויקת עבורך' },
    { id: 'bride-j-5', type: 'image', src: 'assets/journey_side.jpg', caption: 'אותה השראה. שתי פאות שונות.' },
  ];
  let BRIDE_JOURNEY = DEFAULT_BRIDE_JOURNEY;

  /* ---------------- לוז פגישות: שעות פעילות ברירת מחדל (בשימוש גם באדמין וגם בטופס קביעת הפגישה) ----------------
     days: 0=ראשון ... 6=שבת (תואם ל-Date.prototype.getDay()) */
  const DAY_NAMES_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const DEFAULT_HOURS = {
    slotMinutes: 30,
    days: {
      0: { open: true, from: '10:00', to: '19:00' },
      1: { open: true, from: '10:00', to: '19:00' },
      2: { open: true, from: '10:00', to: '19:00' },
      3: { open: true, from: '10:00', to: '19:00' },
      4: { open: true, from: '10:00', to: '14:00' },
      5: { open: false, from: '', to: '' },
      6: { open: false, from: '', to: '' },
    },
    blockedDates: [],
  };
  function timeToMinutes(t) {
    const [h, m] = String(t || '0:0').split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  function minutesToTime(mins) {
    return pad2(Math.floor(mins / 60)) + ':' + pad2(mins % 60);
  }
  function computeDaySlots(dayConfig, slotMinutes) {
    if (!dayConfig || !dayConfig.open || !dayConfig.from || !dayConfig.to) return [];
    const start = timeToMinutes(dayConfig.from);
    const end = timeToMinutes(dayConfig.to);
    const step = slotMinutes > 0 ? slotMinutes : 30;
    const slots = [];
    for (let t = start; t + step <= end; t += step) slots.push(minutesToTime(t));
    return slots;
  }

  const STORY_DURATION = 5000;
  const VIDEO_FALLBACK_DURATION = 8000;
  let TOPICS = DEFAULT_TOPICS;
  let igTopicIndex = 0;
  let igSlideIndex = 0;
  let igTimer = null;
  let igPaused = false;
  let igCurrentDuration = STORY_DURATION;
  let igMediaEl = null;
  let igMuted = false; /* כברירת מחדל מנסים להשמיע קול - פתיחת הסטורי היא כבר קליק ישיר של המשתמשת */

  /* ---------------- shared content store (Cloudflare Worker + KV) used by the admin CMS ----------------
     האתר הסטטי משתמש ב-Worker ייעודי (racheli-cohen-wigs-api) שמאחסן את התוכן וקבצי המדיה ב-Workers KV -
     כך שתוכן שמועלה דרך האדמין גלוי לכל מבקרת באתר (לא רק בדפדפן שהעלתה ממנו, כפי שהיה עם IndexedDB). */
  const RC_API_BASE = 'https://racheli-cohen-wigs-api.efilevi09.workers.dev';
  const RC_ADMIN_TOKEN = '454e6250a4d24c3960d044d213a005e12a3f1a8691a97178';
  const RCStore = (function () {
    async function apiGetCollection(key) {
      try {
        const res = await fetch(RC_API_BASE + '/api/collection/' + key, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || null;
      } catch (e) { return null; }
    }
    async function apiSetCollection(key, data) {
      const res = await fetch(RC_API_BASE + '/api/collection/' + key, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': RC_ADMIN_TOKEN },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('rc-save-failed');
    }
    async function getTopics() { return apiGetCollection('topics'); }
    async function setTopics(data) { return apiSetCollection('topics', data); }
    async function putMedia(id, blob) {
      const contentType = (blob && blob.type) || 'application/octet-stream';
      const res = await fetch(RC_API_BASE + '/api/media/' + encodeURIComponent(id), {
        method: 'PUT',
        headers: { 'X-Admin-Token': RC_ADMIN_TOKEN, 'X-Content-Type': contentType },
        body: blob,
      });
      if (!res.ok) throw new Error('rc-upload-failed');
      return res.json();
    }
    async function getMedia(id) {
      try {
        const res = await fetch(RC_API_BASE + '/api/media/' + encodeURIComponent(id));
        if (!res.ok) return null;
        return await res.blob();
      } catch (e) { return null; }
    }
    async function deleteMedia(id) {
      try {
        await fetch(RC_API_BASE + '/api/media/' + encodeURIComponent(id), {
          method: 'DELETE',
          headers: { 'X-Admin-Token': RC_ADMIN_TOKEN },
        });
      } catch (e) {}
    }
    /* פונקציות גנריות לאחסון כל סוג תוכן (לא רק סטוריז) באותו ה-Worker, לפי מפתח -
       בשימוש עבור הפיד ("feed") וקרוסלת "אני כלה" ("bride_journey") */
    async function getContent(key) { return apiGetCollection(key); }
    async function setContent(key, data) { return apiSetCollection(key, data); }

    /* ---------------- לוז פגישות: שעות פעילות + קביעה/ביטול תורים ---------------- */
    async function getHours() {
      try {
        const res = await fetch(RC_API_BASE + '/api/hours', { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || null;
      } catch (e) { return null; }
    }
    async function setHours(hours) {
      const res = await fetch(RC_API_BASE + '/api/hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': RC_ADMIN_TOKEN },
        body: JSON.stringify(hours),
      });
      if (!res.ok) throw new Error('rc-hours-save-failed');
    }
    async function getTakenSlots(date) {
      try {
        const res = await fetch(RC_API_BASE + '/api/appointments/taken?date=' + encodeURIComponent(date), { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return data.taken || [];
      } catch (e) { return []; }
    }
    async function bookAppointment(payload) {
      const res = await fetch(RC_API_BASE + '/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      let data = null;
      try { data = await res.json(); } catch (e) {}
      if (res.status === 409) {
        const err = new Error('rc-slot-taken');
        err.code = 'slot-taken';
        throw err;
      }
      if (!res.ok) throw new Error('rc-book-failed');
      return data && data.appointment;
    }
    async function listAppointments() {
      try {
        const res = await fetch(RC_API_BASE + '/api/appointments', {
          cache: 'no-store',
          headers: { 'X-Admin-Token': RC_ADMIN_TOKEN },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
      } catch (e) { return []; }
    }
    async function cancelAppointment(id) {
      const res = await fetch(RC_API_BASE + '/api/appointments/' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: { 'X-Admin-Token': RC_ADMIN_TOKEN },
      });
      if (!res.ok) throw new Error('rc-cancel-failed');
    }

    /* ---------------- מעקב צפיות אמיתי (views) - כל פריט מתחיל מ-10 ---------------- */
    async function getViews(ids) {
      if (!ids || !ids.length) return {};
      try {
        const res = await fetch(RC_API_BASE + '/api/views?ids=' + encodeURIComponent(ids.join(',')), { cache: 'no-store' });
        if (!res.ok) return {};
        const data = await res.json();
        return data.counts || {};
      } catch (e) { return {}; }
    }
    async function incrementView(id) {
      try {
        const res = await fetch(RC_API_BASE + '/api/views/' + encodeURIComponent(id), { method: 'POST' });
        if (!res.ok) return null;
        const data = await res.json();
        return data.count;
      } catch (e) { return null; }
    }

    return {
      getTopics, setTopics, putMedia, getMedia, deleteMedia, getContent, setContent,
      getHours, setHours, getTakenSlots, bookAppointment, listAppointments, cancelAppointment,
      getViews, incrementView,
      DEFAULT_TOPICS, DEFAULT_FEED_POSTS, DEFAULT_BRIDE_JOURNEY, DEFAULT_HOURS,
    };
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

    /* ---- גרסה גנרית של אותם פעולות, לכל אוסף (collection) - בשימוש עבור "feed" ו-"bride_journey" ---- */
    async function fetchCollection(name) {
      if (!dbCap) return null;
      try {
        const snap = await dbCap.collection(name).get();
        if (!snap || !snap.docs || !snap.docs.length) return null;
        return fromDocs(snap.docs);
      } catch (e) { return null; }
    }
    function subscribeCollection(name, cb) {
      if (!dbCap) return function () {};
      try {
        return dbCap.collection(name).onSnapshot(
          function (snap) { cb(fromDocs(snap.docs)); },
          function () { /* transient/terminal errors: keep last known data */ }
        );
      } catch (e) { return function () {}; }
    }
    async function seedCollectionIfEmpty(name, defaults) {
      if (!dbCap) return;
      const existing = await fetchCollection(name);
      if (existing && existing.length) return;
      for (let i = 0; i < defaults.length; i++) {
        const item = Object.assign({}, defaults[i]);
        const id = item.id;
        delete item.id;
        item.order = i;
        try { await dbCap.doc(name + '/' + id).set(item); } catch (e) { /* best-effort seed */ }
      }
    }
    async function saveDoc(name, id, data) {
      if (!dbCap) throw new Error('no-db');
      await dbCap.doc(name + '/' + id).set(data);
    }
    async function updateDoc(name, id, patch) {
      if (!dbCap) throw new Error('no-db');
      await dbCap.doc(name + '/' + id).update(patch);
    }
    async function deleteDoc(name, id) {
      if (!dbCap) throw new Error('no-db');
      await dbCap.doc(name + '/' + id).delete();
    }

    return {
      init, getDb, getAssets, getUser, fetchTopics, subscribeTopics, seedIfEmpty, saveLabel, saveSlides, uploadFile,
      fetchCollection, subscribeCollection, seedCollectionIfEmpty, saveDoc, updateDoc, deleteDoc,
    };
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

  /* הופך רשימה "שטוחה" של פריטים (לא מקוננת כמו topic.slides) שמכילה mediaId מקומי ל-object URL בר-תצוגה -
     משמש גם לפיד וגם לקרוסלת "אני כלה" כשהן נטענות מהאחסון המקומי (IndexedDB) של האתר הסטטי */
  async function hydrateMediaList(list) {
    const clone = JSON.parse(JSON.stringify(list));
    for (const item of clone) {
      if (item.mediaId) {
        const blob = await RCStore.getMedia(item.mediaId);
        if (blob) item.src = URL.createObjectURL(blob);
      }
    }
    return clone;
  }

  let feedUnsub = null;
  async function loadFeed() {
    if (window.RC_SPA) {
      try {
        await RCCloud.init();
        const db = RCCloud.getDb();
        if (db) {
          await RCCloud.seedCollectionIfEmpty('feed', DEFAULT_FEED_POSTS);
          const cloudFeed = await RCCloud.fetchCollection('feed');
          FEED_POSTS = (cloudFeed && cloudFeed.length) ? cloudFeed : DEFAULT_FEED_POSTS;
          if (feedUnsub) feedUnsub();
          feedUnsub = RCCloud.subscribeCollection('feed', function (list) {
            if (list && list.length) { FEED_POSTS = list; renderFeedList(); }
          });
          return;
        }
      } catch (e) {}
      FEED_POSTS = DEFAULT_FEED_POSTS;
      return;
    }
    try {
      const stored = await RCStore.getContent('feed');
      if (stored && Array.isArray(stored) && stored.length) {
        FEED_POSTS = await hydrateMediaList(stored);
        return;
      }
    } catch (e) {}
    FEED_POSTS = DEFAULT_FEED_POSTS;
  }

  let brideUnsub = null;
  async function loadBrideJourney() {
    if (window.RC_SPA) {
      try {
        await RCCloud.init();
        const db = RCCloud.getDb();
        if (db) {
          await RCCloud.seedCollectionIfEmpty('bride_journey', DEFAULT_BRIDE_JOURNEY);
          const cloudList = await RCCloud.fetchCollection('bride_journey');
          BRIDE_JOURNEY = (cloudList && cloudList.length) ? cloudList : DEFAULT_BRIDE_JOURNEY;
          if (brideUnsub) brideUnsub();
          brideUnsub = RCCloud.subscribeCollection('bride_journey', function (list) {
            if (list && list.length) { BRIDE_JOURNEY = list; renderBrideJourney(); }
          });
          return;
        }
      } catch (e) {}
      BRIDE_JOURNEY = DEFAULT_BRIDE_JOURNEY;
      return;
    }
    try {
      const stored = await RCStore.getContent('bride_journey');
      if (stored && Array.isArray(stored) && stored.length) {
        BRIDE_JOURNEY = await hydrateMediaList(stored);
        return;
      }
    } catch (e) {}
    BRIDE_JOURNEY = DEFAULT_BRIDE_JOURNEY;
  }

  function mediaItemSrc(item) {
    if (!item) return '';
    if (item.src) return item.src;
    if (item.assetId) return '/_blob/' + item.assetId;
    return '';
  }

  const EYE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';

  /* ---------------- מעקב צפיות אמיתי: שולף ספירות אמיתיות מהשרת לכל האלמנטים עם [data-view-id]
     שמוצגים כרגע בעמוד, ואז מתחיל לרשום צפיה אמיתית אחת לכל פריט ברגע שהוא נכנס לתצוגה בגלילה
     (פעם אחת בלבד לכל פריט בטעינת עמוד אחת - גם אם המבקרת גוללת הלוך ושוב) ---------------- */
  const rcViewedIds = new Set();
  let rcViewObserver = null;
  function rcViewDisplayFor(el) { return el.querySelector('[data-view-count]') || el; }
  async function refreshViewCounts(root) {
    const scope = root || document;
    const els = Array.from(scope.querySelectorAll('[data-view-id]'));
    if (!els.length) return;
    const ids = Array.from(new Set(els.map((el) => el.dataset.viewId)));
    const counts = window.RacheliStore ? await window.RacheliStore.getViews(ids) : {};
    els.forEach((el) => {
      const c = counts[el.dataset.viewId];
      if (typeof c === 'number') rcViewDisplayFor(el).textContent = c;
    });
    initViewObserver(scope);
  }
  function initViewObserver(scope) {
    if (!rcViewObserver) {
      rcViewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const id = el.dataset.viewId;
          if (!id || rcViewedIds.has(id)) { rcViewObserver.unobserve(el); return; }
          rcViewedIds.add(id);
          rcViewObserver.unobserve(el);
          if (window.RacheliStore) {
            window.RacheliStore.incrementView(id).then((count) => {
              if (typeof count === 'number') rcViewDisplayFor(el).textContent = count;
            });
          }
        });
      }, { threshold: 0.6 });
    }
    (scope || document).querySelectorAll('[data-view-id]').forEach((el) => {
      if (!rcViewedIds.has(el.dataset.viewId)) rcViewObserver.observe(el);
    });
  }
  /* רישום צפיה אמיתית חד-פעמית בפריט שאינו נבחן ע"י IntersectionObserver (כגון סטורי שנפתח במסך מלא) */
  function registerSingleView(id, displayEl) {
    if (!id) return;
    const key = 'single:' + id;
    if (rcViewedIds.has(key)) return;
    rcViewedIds.add(key);
    if (window.RacheliStore) {
      window.RacheliStore.incrementView(id).then((count) => {
        if (typeof count === 'number' && displayEl) displayEl.textContent = count;
      });
    }
  }
  const HEART_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/></svg>';
  const CALENDAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 10h16"/></svg>';

  /* בונה את רשימת כרטיסי הפיד (דף "פיד") מתוך FEED_POSTS - מריץ מחדש בכל טעינת תוכן (מקומית/ענן) */
  function renderFeedList() {
    const wrap = document.getElementById('feed-list');
    if (!wrap) return;
    wrap.innerHTML = '';
    FEED_POSTS.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'feed-card';
      const media = post.type === 'video'
        ? `<video src="${escapeAttrC(mediaItemSrc(post))}" muted playsinline loop autoplay></video><span class="feed-video-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>וידאו</span>`
        : `<img src="${escapeAttrC(mediaItemSrc(post))}" alt="${escapeAttrC(post.caption || '')}">`;
      article.dataset.viewId = post.id;
      article.innerHTML = `
        ${media}
        <div class="feed-stats">
          <span class="feed-stat feed-views">${EYE_SVG}<b data-view-count>${post.views || 10}</b></span>
          <button type="button" class="feed-stat feed-like" data-like-id="${escapeAttrC(post.id)}" aria-pressed="false" aria-label="אהבתי">${HEART_SVG}<span>אהבתי</span></button>
          <button type="button" class="feed-stat feed-cta" data-open-modal="appointment" data-context-label="${escapeAttrC(post.caption || '')}">${CALENDAR_SVG}<span>${escapeAttrC(post.ctaLabel || 'קביעת פגישה')}</span></button>
        </div>
        ${post.caption ? `<div class="feed-caption">${escapeAttrC(post.caption)}</div>` : ''}
      `;
      wrap.appendChild(article);
    });
    if (window.RacheliCommon && window.RacheliCommon.initMiscLikeButtons) window.RacheliCommon.initMiscLikeButtons();
    initFeedVideoAutoSound();
    refreshViewCounts(wrap);
  }

  /* ---------------- וידאו בפיד: הקול נדלק אוטומטית כשסרטון מגיע לתצוגה בגלילה ---------------- */
  /* כל וידאו בפיד מתחיל מושתק (autoplay מושתק מותר תמיד בדפדפנים), ומרגע שהוא נכנס לתצוגה (רוב הכרטיס
     נראה על המסך) מנסים להדליק לו קול. דפדפנים חוסמים לפעמים השמעה עם קול בלי "מחווה" ישירה של
     המשתמשת בעמוד הנוכחי - אם זה קורה, חוזרים להשתקה ומחכים ללחיצה/געיעה ראשונה כדי לנסות שוב על
     הסרטון שבתצוגה כרגע. בכל רגע נתון רק וידאו אחד (זה שבתצוגה) מושמע; כל השאר מושהים ומושתקים. */
  let feedVideoObserver = null;
  let feedAudioGestureBound = false;

  function initFeedVideoAutoSound() {
    const videos = Array.from(document.querySelectorAll('#feed-list .feed-card video'));
    if (feedVideoObserver) { feedVideoObserver.disconnect(); feedVideoObserver = null; }
    if (!videos.length) return;

    function tryUnmutedPlay(video) {
      video.muted = false;
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          video.muted = true;
          video.play().catch(function () {});
          bindFirstGestureUnlock();
        });
      }
    }

    function bindFirstGestureUnlock() {
      if (feedAudioGestureBound) return;
      feedAudioGestureBound = true;
      const unlock = function () {
        feedAudioGestureBound = false;
        const current = videos.find(function (v) { return v.dataset.rcInView === '1'; });
        if (current) tryUnmutedPlay(current);
      };
      document.addEventListener('click', unlock, { once: true });
      document.addEventListener('touchstart', unlock, { once: true, passive: true });
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(function (v) { v.muted = true; v.play().catch(function () {}); });
      return;
    }

    feedVideoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          video.dataset.rcInView = '1';
          tryUnmutedPlay(video);
        } else {
          delete video.dataset.rcInView;
          video.pause();
          video.muted = true;
        }
      });
    }, { threshold: [0, 0.6, 1] });

    videos.forEach(function (v) { feedVideoObserver.observe(v); });
  }

  /* בונה את כרטיסי קרוסלת "אני כלה" מתוך BRIDE_JOURNEY - מריץ מחדש בכל טעינת תוכן, ואז מפעיל/מרענן
     מחדש את לוגיקת הקרוסלה (journey.js) כדי שתזהה את הכרטיסים החדשים */
  function renderBrideJourney() {
    const wrap = document.getElementById('story-cards-bride');
    if (!wrap) return;
    wrap.innerHTML = '';
    let activeSet = false;
    BRIDE_JOURNEY.forEach((slide) => {
      const card = document.createElement('div');
      card.className = 'story-card' + (slide.active ? ' active' : '');
      if (slide.active) activeSet = true;
      const media = slide.type === 'video'
        ? `<video src="${escapeAttrC(mediaItemSrc(slide))}" muted playsinline loop autoplay></video>`
        : `<img src="${escapeAttrC(mediaItemSrc(slide))}" alt="">`;
      if (slide.showStats) {
        card.dataset.viewId = slide.id;
        card.innerHTML = `
          ${media}
          <div class="story-stats">
            <span class="story-stat">${EYE_SVG} <b data-view-count>${slide.views || 10}</b></span>
            <button type="button" class="story-stat story-like" data-like-id="${escapeAttrC(slide.likeId || slide.id)}" aria-pressed="false" aria-label="אהבתי">${HEART_SVG} <span>אהבתי</span></button>
            <button type="button" class="story-stat" data-open-modal="appointment">${CALENDAR_SVG} <span>קביעת פגישה</span></button>
          </div>
        `;
      } else {
        card.innerHTML = `${media}${slide.caption ? `<p class="story-caption">${escapeAttrC(slide.caption)}</p>` : ''}`;
      }
      wrap.appendChild(card);
    });
    if (!activeSet && wrap.firstElementChild) wrap.firstElementChild.classList.add('active');
    if (window.RacheliCommon && window.RacheliCommon.initMiscLikeButtons) window.RacheliCommon.initMiscLikeButtons();
    if (window.RCJourney && window.RCJourney.init) window.RCJourney.init();
    refreshViewCounts(wrap);
  }

  function escapeAttrC(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

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

  /* מספר אריחי ה"פריק" היעד בכל צד - תמיד שואפים להציג בדיוק כך הרבה (ר' igUpdateSidePeek), שמקטין
     דינמית את רוחב האריחים כדי שכולם ייכנסו גם במסך רגיל; רק אם ממש אין מקום גם בגודל המינימלי,
     מוצגים פחות */
  const SIDE_PEEK_MAX = 5;
  function sidePeekTilesHTML(prefix) {
    const order = prefix === 'prev'
      ? Array.from({ length: SIDE_PEEK_MAX }, (_, i) => SIDE_PEEK_MAX - i)
      : Array.from({ length: SIDE_PEEK_MAX }, (_, i) => i + 1);
    return order.map((i) => `<div class="igstory-side" id="igstory-peek-${prefix}${i === 1 ? '' : '-' + i}"></div>`).join('');
  }
  function storyViewerHTML() {
    return `
    <div class="igstory-overlay" id="igstory-overlay" role="dialog" aria-modal="true" aria-label="צפייה בסטורי">
      <div class="igstory-stage">
        <div class="igstory-main">
          <div class="igstory-side-group" id="igstory-side-prev">
            ${sidePeekTilesHTML('prev')}
          </div>
          <div class="igstory-card-wrap">
            <div class="igstory-topics-strip" id="igstory-topics-strip"></div>
            <div class="igstory-card" id="igstory-card">
              <div class="igstory-media" id="igstory-media"></div>
              <div class="igstory-progress" id="igstory-progress"></div>
              <div class="igstory-head">
                <button class="igstory-close" id="igstory-close" aria-label="סגירה">${svg('close')}</button>
                <div class="igstory-logo">
                  <div class="logo-mark">RC</div>
                  <span>RACHELI COHEN</span>
                  <span class="igstory-topic-tag" id="igstory-topic-tag"></span>
                </div>
              </div>
              <button class="igstory-arrow igstory-arrow-prev" id="igstory-arrow-prev" aria-label="הסיפור הקודם">${svg('chevronR')}</button>
              <button class="igstory-arrow igstory-arrow-next" id="igstory-arrow-next" aria-label="הסיפור הבא">${svg('chevronL')}</button>
              <div class="igstory-tapzone igstory-tap-prev" data-tap="prev"></div>
              <div class="igstory-tapzone igstory-tap-next" data-tap="next"></div>
              <h3 class="igstory-caption" id="igstory-caption"></h3>
              <div class="igstory-stats">
                <button class="igstory-stat igstory-mute" id="igstory-mute" aria-label="השתקה/ביטול השתקה" hidden><svg viewBox="0 0 24 24">${ICONS.soundOn}</svg></button>
                <span class="igstory-stat"><svg viewBox="0 0 24 24">${ICONS.eye}</svg><b id="igstory-views">10</b></span>
                <button class="igstory-stat igstory-like" id="igstory-like"><svg viewBox="0 0 24 24">${ICONS.heart}</svg><span>אהבתי</span></button>
                <button class="igstory-stat" id="igstory-share"><svg viewBox="0 0 24 24">${ICONS.share}</svg><span>שיתוף</span></button>
                <button class="igstory-stat igstory-cta" id="igstory-cta"><svg viewBox="0 0 24 24">${ICONS.calendar}</svg><span>קביעת פגישה</span></button>
              </div>
            </div>
          </div>
          <div class="igstory-side-group" id="igstory-side-next">
            ${sidePeekTilesHTML('next')}
          </div>
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

  /* ---------------- כפתורי "אהבתי" כלליים (פיד + כרטיסי מסע) ---------------- */
  /* קטלוג פריטים ניתנים ל"אהבתי" שאינם חלק מהסטוריז (כרטיסי פיד, כרטיסי מסע) -
     כדי שגם הם יופיעו בעמוד "תוכן שאהבתי" */
  const MISC_LIKE_ITEMS = {
    'feed-1': { img: 'assets/feed_card1.jpg', caption: 'טיפוח יומיומי לפאה', route: 'feed' },
    'feed-2': { img: 'assets/feed_card2.jpg', caption: 'מבנה ודילול נכון', route: 'feed' },
    'feed-3': { img: 'assets/feed_card3.jpg', caption: 'שילוב גוונים טבעי', route: 'feed' },
    'feed-4': { img: 'assets/feed_card4.jpg', caption: 'תנועה טבעית בפאה', route: 'feed' },
    'bride-story-1': { img: 'assets/journey_center.jpg', caption: 'אני כלה', route: 'bride' },
    'new-wig-story-1': { img: 'assets/journey_center.jpg', caption: 'מחפשת פאה חדשה', route: 'new-wig' },
    'renew-wig-story-1': { img: 'assets/journey_center.jpg', caption: 'חולמת לחדש את הפאה שלי', route: 'renew-wig' },
  };
  function miscLikedSet() {
    try { return new Set(JSON.parse(localStorage.getItem('rc-liked-misc') || '[]')); }
    catch (e) { return new Set(); }
  }
  function saveMiscLiked(set) {
    try { localStorage.setItem('rc-liked-misc', JSON.stringify([...set])); } catch (e) {}
  }
  function initMiscLikeButtons() {
    document.querySelectorAll('[data-like-id]').forEach((btn) => {
      if (btn.dataset.rcLikeBound === '1') return;
      btn.dataset.rcLikeBound = '1';
      const id = btn.dataset.likeId;
      const label = btn.querySelector('span');
      const setState = (liked) => {
        btn.classList.toggle('liked', liked);
        btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
        if (label) label.textContent = liked ? 'אהבתי!' : 'אהבתי';
        const icon = btn.querySelector('svg');
        if (icon) icon.setAttribute('fill', liked ? 'currentColor' : 'none');
      };
      setState(miscLikedSet().has(id));
      btn.addEventListener('click', () => {
        const nowLiked = !miscLikedSet().has(id);
        if (nowLiked) {
          rcEnsureGoogleSignedIn(() => {
            const set = miscLikedSet();
            set.add(id);
            saveMiscLiked(set);
            setState(true);
            showToast('נשמר ל"אהבתי"!');
            renderLikedVideosGrid();
          });
        } else {
          const set = miscLikedSet();
          set.delete(id);
          saveMiscLiked(set);
          setState(false);
          renderLikedVideosGrid();
        }
      });
    });
  }

  /* ---------------- אנימציות reveal בגלילה (GSAP + IntersectionObserver) ---------------- */
  function initRevealAnimations() {
    if (!window.gsap) return;
    const els = Array.from(document.querySelectorAll('[data-reveal]')).filter((el) => el.dataset.rcRevealed !== '1');
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y: 30 });
    const show = (el) => {
      if (el.dataset.rcRevealed === '1') return;
      el.dataset.rcRevealed = '1';
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
    };
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { show(entry.target); io.unobserve(entry.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
  }

  const ARTICLES = [
    { id: 'mistakes-first-wig', tag: 'טיפים', img: 'assets/articles_card_00.jpg', title: '3 טעויות נפוצות בבחירת הפאה הראשונה', excerpt: 'דברים קטנים שעושים הבדל גדול בתוצאה', likes: 128, body: [
      'הרגע שבו בוחרות פאה בפעם הראשונה הוא רגע גדול - ולא פלא שהוא גם מלא בהתלבטויות. רוב הטעויות שאני רואה שוב ושוב לא קשורות לטעם רע או לבחירה "לא נכונה", אלא לכמה הרגלים שקל מאוד לתקן ברגע שמכירים אותם.',
      '<h2>1. לבחור לפי תמונה, לא לפי מבנה הפנים</h2>',
      'פאה שנראית מדהים על מישהי אחרת לא בהכרח תעבוד בשבילך. לפני הצבע והסגנון, השאלה הראשונה היא איזה מבנה פאה מתאים לצורת הפנים, לקו השיער הטבעי ולאופן שבו את רגילה לסדר שיער. זו הסיבה שאני תמיד מתחילה פגישה בהקשבה ובמדידה, לא בקטלוג.',
      '<h2>2. להתפשר על איכות הלייס כדי לחסוך</h2>',
      'לייס קדמי טוב הוא ההבדל בין פאה שנראית "פאה" לבין פאה שנראית כמו קו השיער שלך. זה לא המקום לקצץ - גם אם זה אומר לחכות עוד קצת ולבחור נכון מההתחלה.',
      '<h2>3. לא לדבר על שגרת היום-יום</h2>',
      'הפאה שתלווה אותך כל יום צריכה להתאים לשגרה שלך - ספורט, עבודה, מזג אוויר, שינה. ככל שתספרי לי יותר על איך נראה היום שלך, כך אדע להתאים לך בדיוק את מה שתוכלי לחיות בו בנוחות, לא רק להתרשם ממנו ביום הרכישה.',
      'הכי חשוב לזכור: אין "טעות" שאי אפשר לתקן. גם אם כבר בחרת פאה ומשהו לא מרגיש מדויק, תמיד אפשר לשבת ולכוון מחדש.',
    ] },
    { id: 'first-meeting-guide', tag: 'כלות', img: 'assets/articles_card_01.jpg', title: 'המדריך המלא לפגישה הראשונה', excerpt: 'כך להגיע מוכנה, בטוחה ורגועה', likes: 19, body: [
      'הפגישה הראשונה שלנו היא לא מבחן - היא שיחה. המטרה שלי היא להכיר אותך, את הסגנון שלך ואת מה שחשוב לך, כדי שביחד נגיע לפאה שתרגישי בה הכי נכון.',
      '<h2>מה כדאי להביא איתך</h2>',
      'אם יש לך תמונות השראה - גם כאלה שמראות מה את *לא* אוהבת - הביאי אותן. תמונה של עצמך עם שיער טבעי (גם ישנה) עוזרת לי להבין את קו השיער ואת הגוון שהכי התאים לך.',
      '<h2>מה קורה בפגישה עצמה</h2>',
      'מתחילות בשיחה קצרה על הסגנון והצרכים, עוברות למדידת מבנה הראש, ובוחרות יחד גוון, אורך ותנועה. אין לחץ להחליט הכל באותו רגע - זו פגישת היכרות, לא רק פגישת מכירה.',
      '<h2>לכלות בפרט</h2>',
      'אם את מתחתנת, הכי טוב להגיע לפגישה הראשונה לפחות כמה חודשים לפני החתונה, כדי שיהיה מספיק זמן להתאמה מדויקת ולכל תהליך ההכנה - בלי לחץ של זמן בשבוע שלפני.',
      'ובסוף - תמיד אפשר לשאול הכל. אין שאלה "קטנה מדי" כשמדובר בדבר שתלווה אותך כל יום.',
    ] },
    { id: 'perfect-match', tag: 'לפני ואחרי', img: 'assets/articles_card_02.jpg', title: 'התאמה מושלמת עושה את כל ההבדל', excerpt: 'סיפור של שיער, ביטחון ותחושת שלמות', likes: 142, body: [
      'יש רגע שבו לקוחה מסתכלת במראה אחרי ההתאמה הסופית ומשהו משתנה - לא רק במראה, אלא בעמידה, בחיוך, באופן שבו היא מדברת. זו התחושה שאני עובדת בשבילה בכל פגישה.',
      'ההבדל בין פאה "יפה" לפאה "מושלמת בשבילך" הוא כמעט תמיד בפרטים הקטנים: הדילול הנכון, זווית החיתוך סביב הפנים, האופן שבו הקו הקדמי נופל. אלה הדברים שלא רואים בתמונה, אבל מרגישים בכל רגע.',
      'לכן תהליך ההתאמה אצלי הוא לא פגישה אחת - הוא תהליך. בודקות, מתקנות, שואלות איך מרגישים בתנועה, בשינה, ברוח - ורק כשהכל בדיוק נכון, אנחנו קוראות לזה גמר.',
      'כי פאה מותאמת באמת היא לא כזו שרואים - היא כזו ששוכחים שיש, ופשוט מרגישים בה את עצמך.',
    ] },
    { id: 'timeless-styles', tag: 'השראה', img: 'assets/articles_card_10.jpg', title: 'סגנונות אהובים שלא יוצאים מהאופנה', excerpt: 'גלי השראה לגראות יומיומית ומיוחדת', likes: 67, body: [
      'טרנדים מגיעים והולכים, אבל יש סגנונות מסוימים שחוזרים שוב ושוב - כי הם פשוט עובדים, על כל סוגי הפנים ובכל גיל.',
      '<h2>גלים רכים וטבעיים</h2>',
      'תנועה עדינה שלא נראית "מעוצבת מדי" היא תמיד בחירה בטוחה - מתאימה גם ליומיום וגם לאירוע, וזו הסיבה שהיא הכי מבוקשת אצלי שוב ושוב.',
      '<h2>אורך בינוני עם שכבות</h2>',
      'אורך שמגיע קצת מתחת לכתפיים עם שכבות עדינות נותן תחושת נפח בלי להכביד - ומאפשר הרבה גמישות בסידור.',
      '<h2>גוונים טבעיים עם עומק</h2>',
      'גם כשבוחרים גוון "בסיסי", הוספת שכבת גוון שנייה עדינה יוצרת עומק שגורם לשיער להיראות חי ואמיתי, לא שטוח.',
      'הסוד האמיתי מאחורי "סגנון נצחי" הוא לא העדר שינוי - הוא התאמה אישית שלא מתיישנת כי היא נבנתה בשבילך ולא בשביל הטרנד הרגעי.',
    ] },
    { id: 'gentle-look-story', tag: 'סיפורים', img: 'assets/articles_card_11.jpg', title: 'היא רצתה מראה עדין וקיבלה את עצמה מחדש', excerpt: 'סיפור כלה שמרגש אותנו בכל פעם מחדש', likes: 94, body: [
      'היא הגיעה אליי כמה חודשים לפני החתונה, עם תמונה אחת בטלפון ומשפט אחד: "אני רוצה להרגיש כמו עצמי, רק יותר".',
      'ישבנו, דיברנו על איך נראתה השגרה שלה, על השיער שהיא זוכרת מילדותה, על מה שתמיד רצתה לנסות ולא העזה. מתוך השיחה הזאת נולד הכיוון - לא פאה "של כלה", אלא פאה שהיא היא, רק בגרסה החגיגית ביותר שלה.',
      'בפגישת ההתאמה האחרונה, כמה ימים לפני החתונה, היא עמדה מול המראה ושתקה רגע ארוך. ואז אמרה: "זה בדיוק אני. רק יותר אני".',
      'זו בשבילי ההגדרה האמיתית של פאה מוצלחת - לא כזו שמסתירה, אלא כזו שמשחררת.',
    ] },
    { id: 'keep-wig-fresh', tag: 'טיפים', img: 'assets/articles_card_12.jpg', title: 'איך לשמור על הפאה שלך נראית חדשה לאורך זמן', excerpt: '7 טיפים פשוטים לשגרת טיפול נכונה', likes: 83, body: [
      'טיפוח נכון הוא ההבדל בין פאה ששומרת על המראה שלה שנים, לבין אחת שמתעייפת תוך כמה חודשים. הנה שגרה פשוטה שבאמת עושה את ההבדל:',
      '<h2>1. מברשת מתאימה</h2>',
      'מברשת רחבת שיניים, עדינה, מתחילה מהקצוות ועולה כלפי מעלה - אף פעם לא מהשורש כלפי מטה.',
      '<h2>2. שטיפה במים פושרים</h2>',
      'מים חמים מדי מקצרים את חיי הסיבים. תמיד פושרים, ועם שמפו ומרכך שמיועדים לפאות.',
      '<h2>3. ייבוש באוויר</h2>',
      'הניחי לפאה להתייבש באוויר על סטנד, הרחק ממקור חום ישיר.',
      '<h2>4. אחסון נכון</h2>',
      'על סטנד, במקום מאוורר, הרחק משמש ישירה - זה שומר על התנועה והצורה הטבעית.',
      '<h2>5. ביקור תחזוקה</h2>',
      'ביקור תקופתי אצלי לדילול וחידוד הקווים שומר על המראה הטבעי הרבה יותר זמן.',
      '<h2>6. פחות מגע ביד</h2>',
      'ככל שפחות נוגעים ומסדרים ביד לאורך היום, הסיבים נשמרים טוב יותר.',
      '<h2>7. סבלנות בהסתרכות</h2>',
      'קשרים קטנים כדאי לפתוח בעדינות מהקצה, לא למשוך מהשורש - זה מונע נשירה מיותרת של סיבים.',
      'שגרה פשוטה כזו, חמש דקות ביום, שומרת על הפאה נראית בדיוק כמו ביום שקנית אותה.',
    ] },
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
          <a class="article-media" href="${articleHref(a.id)}" data-open-article="${a.id}">
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

  /* ---------------- דף מאמר יחיד (article.html?id=...) ---------------- */
  function renderArticleBody(paragraphs) {
    return (paragraphs || []).map((p) => (p.indexOf('<h2>') === 0 ? p : `<p>${p}</p>`)).join('\n');
  }

  function initArticlePage() {
    const holder = document.getElementById('article-content');
    if (!holder) return;
    const id = new URLSearchParams(location.search).get('id');
    const article = ARTICLES.find((a) => a.id === id);

    if (!article) {
      holder.innerHTML = `
        <div class="article-notfound">
          <h1>המאמר לא נמצא</h1>
          <p>יכול להיות שהקישור שגוי, או שהמאמר כבר לא קיים.</p>
          <a class="btn-primary" href="${rcHref('articles')}">חזרה לעולם התוכן</a>
        </div>`;
      document.title = 'מאמר לא נמצא | רחלי כהן';
      return;
    }

    document.title = article.title + ' | רחלי כהן';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

    const saved = isArticleSaved(article.id);
    holder.innerHTML = `
      <article class="article-single">
        <a class="article-back" href="${rcHref('articles')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          עולם תוכן
        </a>
        <span class="article-tag article-tag--static">${article.tag}</span>
        <h1 class="article-single-title">${article.title}</h1>
        <p class="article-single-excerpt">${article.excerpt}</p>
        <div class="article-single-meta">
          <span class="article-likes">${svg('heart')}${article.likes}</span>
          <span class="icons">
            <button type="button" class="article-save${saved ? ' saved' : ''}" data-save="${article.id}" aria-label="שמירת מאמר" aria-pressed="${saved}"><svg viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">${ICONS.bookmark}</svg></button>
            <button type="button" class="article-share" data-share="${article.id}" aria-label="שיתוף מאמר">${svg('share')}</button>
          </span>
        </div>
        <div class="article-single-media"><img src="${article.img}" alt="${article.title}"></div>
        <div class="article-single-body">${renderArticleBody(article.body)}</div>
      </article>
      <section class="article-related">
        <h2>עוד בנושא ${article.tag}</h2>
        <div class="articles-grid" id="article-related-grid"></div>
      </section>`;

    const saveBtn = holder.querySelector('[data-save]');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const nowSaved = toggleArticleSaved(article.id);
        saveBtn.classList.toggle('saved', nowSaved);
        saveBtn.setAttribute('aria-pressed', nowSaved);
        saveBtn.querySelector('svg').setAttribute('fill', nowSaved ? 'currentColor' : 'none');
        showToast(nowSaved ? 'נשמר למועדפים' : 'הוסר מהמועדפים');
      });
    }
    const shareBtn = holder.querySelector('[data-share]');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const url = location.href;
        const shareData = { title: 'רחלי כהן | ' + article.title, text: article.excerpt, url };
        try {
          if (navigator.share) { await navigator.share(shareData); return; }
          throw new Error('no-share');
        } catch (e) {
          try { await navigator.clipboard.writeText(url); showToast('הקישור הועתק!'); }
          catch (e2) { showToast(url); }
        }
      });
    }

    const relatedGrid = document.getElementById('article-related-grid');
    if (relatedGrid) {
      const related = ARTICLES.filter((a) => a.tag === article.tag && a.id !== article.id).slice(0, 3);
      if (!related.length) {
        relatedGrid.closest('.article-related').hidden = true;
      } else {
        relatedGrid.innerHTML = related.map((a) => `
          <article class="article-card" data-id="${a.id}">
            <a class="article-media" href="${articleHref(a.id)}">
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
            </div>
          </article>`).join('');
      }
    }
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
        if (liked.has(slideKey(topic, sIdx))) {
          items.push({ kind: 'story', topic, sIdx, slide });
        }
      });
    });
    const miscLiked = miscLikedSet();
    Object.keys(MISC_LIKE_ITEMS).forEach((id) => {
      if (miscLiked.has(id)) {
        items.push({ kind: 'misc', id, item: MISC_LIKE_ITEMS[id] });
      }
    });
    if (!items.length) {
      grid.innerHTML = '<p class="videos-empty">עדיין לא סימנת תוכן שאהבת. לחצי על "אהבתי" בכל מקום באתר כדי לשמור אותו כאן.</p>';
      return;
    }
    grid.innerHTML = items.map((it) => {
      if (it.kind === 'misc') {
        return `
      <div class="video-card" data-misc-id="${it.id}" role="button" tabindex="0" aria-label="${it.item.caption}">
        <img src="${it.item.img}" alt="${it.item.caption}" loading="lazy">
        <span class="liked-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/></svg></span>
      </div>`;
      }
      return `
      <div class="video-card" data-topic="${it.topic.id}" data-slide="${it.sIdx}" role="button" tabindex="0" aria-label="צפייה בתוכן">
        ${it.slide.type === 'video'
          ? `<video src="${slideDisplaySrc(it.slide)}" muted playsinline preload="metadata"></video>`
          : `<img src="${slideDisplaySrc(it.slide)}" alt="${it.slide.caption || ''}" loading="lazy">`}
        <span class="liked-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/></svg></span>
        ${it.slide.type === 'video' ? `<span class="play-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="rgba(0,0,0,.25)"/><path d="M10 8.5 16 12l-6 3.5v-7Z"/></svg></span>` : ''}
      </div>`;
    }).join('');
    grid.querySelectorAll('.video-card[data-topic]').forEach((card) => {
      const open = () => openStoryViewer(card.dataset.topic, parseInt(card.dataset.slide, 10));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    grid.querySelectorAll('.video-card[data-misc-id]').forEach((card) => {
      const item = MISC_LIKE_ITEMS[card.dataset.miscId];
      const open = () => { if (item) location.href = rcHref(item.route); };
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

  /* מציג את כפתור הקול רק כשהשקופית הנוכחית היא וידאו, ומעדכן את האייקון לפי מצב ההשתקה */
  function igUpdateMuteBtn() {
    const btn = document.getElementById('igstory-mute');
    if (!btn) return;
    const isVideo = igMediaEl && igMediaEl.tagName === 'VIDEO';
    btn.hidden = !isVideo;
    btn.innerHTML = `<svg viewBox="0 0 24 24">${igMuted ? ICONS.soundOff : ICONS.soundOn}</svg>`;
  }

  function igRenderMedia(slide) {
    const mount = document.getElementById('igstory-media');
    if (!mount) return;
    mount.innerHTML = '';
    igMediaEl = null;
    if (slide.type === 'video') {
      const video = document.createElement('video');
      video.src = slideDisplaySrc(slide);
      video.muted = igMuted;
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
      /* דפדפנים חוסמים השמעה אוטומטית עם קול בלי "מחווה" ישירה של המשתמשת - אם ההשמעה עם קול
         נחסמת, חוזרים אוטומטית להשתקה כדי שלפחות הווידאו עצמו ינגן, ומעדכנים את כפתור הקול בהתאם */
      video.play().catch(() => {
        if (!video.muted) {
          video.muted = true;
          igMuted = true;
          igUpdateMuteBtn();
          video.play().catch(() => {});
        }
      });
      igUpdateMuteBtn();
    } else {
      const img = document.createElement('img');
      img.src = slideDisplaySrc(slide);
      img.alt = currentTopic().label;
      mount.appendChild(img);
      igCurrentDuration = STORY_DURATION;
      igUpdateMuteBtn();
    }
  }

  /* כמה אריחי "פריק" (סטוריז נוספים בצדדים) מוצגים בכל צד, ובאיזה רוחב - תמיד שואפים להציג
     בדיוק SIDE_PEEK_MAX אריחים, ולשם כך מקטינים את הרוחב של כל אריח (בין MIN ל-MAX, בגובה
     שנגזר אוטומטית לפי אותו יחס רוחב/גובה כמו הכרטיס האמצעי, דרך aspect-ratio ב-CSS) כדי שכולם
     באמת ייכנסו בלי חפיפה. רק אם אין מספיק מקום גם ברוחב המינימלי מוצג פחות מ-SIDE_PEEK_MAX */
  const SIDE_TILE_MIN = 56;
  const SIDE_TILE_MAX = 160;
  function igUpdateSidePeek() {
    const card = document.getElementById('igstory-card');
    const main = document.querySelector('.igstory-main');
    if (!card || !main) return;
    const cardRect = card.getBoundingClientRect();
    if (!cardRect.width) return;
    const gap = 6;
    const mainWidth = main.getBoundingClientRect().width;
    const sidePerGroup = Math.max(0, (mainWidth - cardRect.width) / 2 - gap);
    const idealTileWidth = (sidePerGroup - (SIDE_PEEK_MAX - 1) * gap) / SIDE_PEEK_MAX;
    const tileWidth = Math.max(SIDE_TILE_MIN, Math.min(SIDE_TILE_MAX, idealTileWidth));
    const count = Math.max(0, Math.min(SIDE_PEEK_MAX, Math.floor((sidePerGroup + gap) / (tileWidth + gap))));
    for (let i = 1; i <= SIDE_PEEK_MAX; i++) {
      const elPrev = document.getElementById(i === 1 ? 'igstory-peek-prev' : `igstory-peek-prev-${i}`);
      const elNext = document.getElementById(i === 1 ? 'igstory-peek-next' : `igstory-peek-next-${i}`);
      const show = i <= count;
      if (elPrev) { elPrev.style.display = show ? '' : 'none'; if (show) elPrev.style.width = tileWidth + 'px'; }
      if (elNext) { elNext.style.display = show ? '' : 'none'; if (show) elNext.style.width = tileWidth + 'px'; }
    }
  }
  let igSidePeekResizeTimer = null;
  window.addEventListener('resize', () => {
    if (!document.getElementById('igstory-overlay') || !document.getElementById('igstory-overlay').classList.contains('open')) return;
    clearTimeout(igSidePeekResizeTimer);
    igSidePeekResizeTimer = setTimeout(igUpdateSidePeek, 150);
  });

  function igRender() {
    const topic = currentTopic();
    const slide = currentSlide();
    const caption = document.getElementById('igstory-caption');
    const views = document.getElementById('igstory-views');
    const likeBtn = document.getElementById('igstory-like');
    const topicTag = document.getElementById('igstory-topic-tag');
    if (!caption) return;

    igRenderMedia(slide);
    caption.textContent = slide.caption || '';
    const viewId = 'story-' + slideKey(topic, igSlideIndex);
    views.textContent = '…';
    views.dataset.viewId = viewId;
    if (window.RacheliStore) {
      const alreadyViewed = rcViewedIds.has('single:' + viewId);
      const promise = alreadyViewed ? window.RacheliStore.getViews([viewId]).then((c) => c[viewId]) : null;
      if (promise) {
        promise.then((count) => { if (views.dataset.viewId === viewId) views.textContent = count != null ? count : 10; });
      } else {
        registerSingleView(viewId, views);
      }
    }
    if (topicTag) topicTag.textContent = topic.label;

    const liked = likedSet().has(slideKey(topic, igSlideIndex));
    likeBtn.classList.toggle('liked', liked);
    likeBtn.querySelector('span').textContent = liked ? 'אהבתי!' : 'אהבתי';

    /* פס הצדדים מציג עד SIDE_PEEK_MAX סטוריז קרובים בכל כיוון, כולם באותו גודל בדיוק כמו הכרטיס
       האמצעי ובמרחק שווה (ר' igUpdateSidePeek) - כמה מהם בפועל נראים תלוי כמה נכנסים ברוחב המסך
       בלי חפיפה. אם יש פחות נושאים מ-SIDE_PEEK_MAX, הנושאים פשוט חוזרים על עצמם (תוכן דקורטיבי) */
    const n = TOPICS.length;
    for (let i = 1; i <= SIDE_PEEK_MAX; i++) {
      const elPrev = document.getElementById(i === 1 ? 'igstory-peek-prev' : `igstory-peek-prev-${i}`);
      const elNext = document.getElementById(i === 1 ? 'igstory-peek-next' : `igstory-peek-next-${i}`);
      const pTopic = TOPICS[(igTopicIndex - i + n * 10) % n];
      const nTopic = TOPICS[(igTopicIndex + i) % n];
      if (elPrev) elPrev.style.backgroundImage = `url('${slideDisplaySrc(pTopic.slides[0])}')`;
      if (elNext) elNext.style.backgroundImage = `url('${slideDisplaySrc(nTopic.slides[0])}')`;
    }
    igUpdateSidePeek();

    igRenderProgress();
    igRenderTopicsStrip();
    igStartSegment();
  }

  /* רצועת כל נושאי הסטורי (לא רק הקודם/הבא), עם אפשרות לדלג ישירות לכל נושא */
  function igRenderTopicsStrip() {
    const strip = document.getElementById('igstory-topics-strip');
    if (!strip) return;
    if (strip.dataset.rcBuilt !== String(TOPICS.length)) {
      strip.innerHTML = TOPICS.map((t, i) => `
        <button type="button" class="igstory-topic-chip" data-topic-idx="${i}" aria-label="${t.label}">
          <span class="igstory-topic-avatar"><img src="${slideDisplaySrc(t.slides[0])}" alt=""></span>
          <span class="igstory-topic-chip-label">${t.label}</span>
        </button>`).join('');
      strip.dataset.rcBuilt = String(TOPICS.length);
      strip.querySelectorAll('[data-topic-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          igGoToTopic(parseInt(btn.dataset.topicIdx, 10), 0);
          igScheduleNext();
        });
      });
    }
    /* הרצועה עכשיו מרכזת ועוטפת לשורה נוספת (flex-wrap) כך שכל הנושאים תמיד גלויים - אין יותר
       גלילה שמסתירה חלק מהם, ולכן אין צורך לגלול אל הנושא הפעיל */
    strip.querySelectorAll('.igstory-topic-chip').forEach((btn, i) => {
      btn.classList.toggle('active', i === igTopicIndex);
    });
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
    for (let i = 1; i <= SIDE_PEEK_MAX; i++) {
      const elPrev = document.getElementById(i === 1 ? 'igstory-peek-prev' : `igstory-peek-prev-${i}`);
      const elNext = document.getElementById(i === 1 ? 'igstory-peek-next' : `igstory-peek-next-${i}`);
      if (elPrev) elPrev.addEventListener('click', () => { igGoToTopic(igTopicIndex - i, 0); igScheduleNext(); });
      if (elNext) elNext.addEventListener('click', () => { igGoToTopic(igTopicIndex + i, 0); igScheduleNext(); });
    }

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
      const label = currentTopic().label;
      closeStoryViewer();
      openModal('appointment', { contextLabel: 'סטורי ' + label });
    });

    document.getElementById('igstory-mute').addEventListener('click', (e) => {
      e.stopPropagation();
      igMuted = !igMuted;
      if (igMediaEl && igMediaEl.tagName === 'VIDEO') {
        igMediaEl.muted = igMuted;
        if (!igMuted) igMediaEl.play().catch(() => {});
      }
      igUpdateMuteBtn();
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
    mountMobileNav();
    mountFooter();
    mountModals();
    mountSideCta();
    /* רינדור ראשוני סינכרוני עם ברירות המחדל - כדי שהפיד/קרוסלת "אני כלה" יופיעו מיד, בלי הבהוב ריק,
       עד שהתוכן האמיתי (מקומי/ענן) ייטען ויחליף אותן אם שונה */
    renderFeedList();
    renderBrideJourney();
    await loadTopics();
    mountStoryViewer();
    applyRingSegments();
    renderLikedVideosGrid();
    await Promise.all([loadFeed(), loadBrideJourney()]);
    renderFeedList();
    renderBrideJourney();
    initHeadingEffects();
    initMiscLikeButtons();
    initRevealAnimations();
    initHeroCollage();
  });
})();
