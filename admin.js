// פאנל ניהול תוכן - רחלי כהן (סטוריז + פיד + קרוסלת "אני כלה")
(function () {
  let topics = [];
  let feedPosts = [];
  let brideSlides = [];
  const objectUrls = [];

  function trackUrl(url) { objectUrls.push(url); return url; }

  async function slideSrc(slide) {
    if (slide.mediaId) {
      const blob = await window.RacheliStore.getMedia(slide.mediaId);
      if (blob) return trackUrl(URL.createObjectURL(blob));
      return '';
    }
    return slide.src || '';
  }

  async function loadTopics() {
    const stored = await window.RacheliStore.getTopics();
    if (stored && Array.isArray(stored) && stored.length) {
      topics = stored;
    } else {
      topics = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_TOPICS));
    }
  }

  async function persist() {
    const status = document.getElementById('admin-save-status');
    try {
      await window.RacheliStore.setTopics(topics);
      if (status) {
        status.textContent = 'נשמר ✓';
        setTimeout(() => { status.textContent = 'כל השינויים נשמרים אוטומטית'; }, 1600);
      }
    } catch (e) {
      if (status) status.textContent = 'שגיאה בשמירה - נסי שוב';
    }
  }

  function debounce(fn, ms) {
    let t;
    return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
  }
  const persistDebounced = debounce(persist, 500);

  async function renderAll() {
    const wrap = document.getElementById('admin-topics');
    wrap.innerHTML = '';
    for (const topic of topics) {
      wrap.appendChild(await renderTopicCard(topic));
    }
  }

  async function renderTopicCard(topic) {
    const card = document.createElement('div');
    card.className = 'admin-topic-card';
    card.dataset.topicId = topic.id;

    const head = document.createElement('div');
    head.className = 'admin-topic-head';
    head.innerHTML = `
      <div class="admin-topic-avatar"><img src="assets/home_topic_${topic.id}.jpg" alt=""></div>
      <input class="admin-topic-label" value="${escapeAttr(topic.label)}" aria-label="שם הטופיק">
      <span class="admin-topic-count">${topic.slides.length} סטטוסים</span>
    `;
    const labelInput = head.querySelector('.admin-topic-label');
    labelInput.addEventListener('input', () => {
      topic.label = labelInput.value;
      persistDebounced();
    });
    card.appendChild(head);

    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'admin-slides';
    for (let i = 0; i < topic.slides.length; i++) {
      slidesWrap.appendChild(await renderSlideRow(topic, i));
    }
    card.appendChild(slidesWrap);

    const addBtn = document.createElement('label');
    addBtn.className = 'admin-add-slide admin-file-label';
    addBtn.innerHTML = `+ הוספת סטטוס <input type="file" accept="image/*,video/*">`;
    addBtn.querySelector('input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      await addSlide(topic, file);
      await rerenderTopic(topic);
    });
    card.appendChild(addBtn);

    return card;
  }

  async function rerenderTopic(topic) {
    const wrap = document.getElementById('admin-topics');
    const oldCard = wrap.querySelector(`[data-topic-id="${cssEscape(topic.id)}"]`);
    const newCard = await renderTopicCard(topic);
    if (oldCard) oldCard.replaceWith(newCard); else wrap.appendChild(newCard);
  }

  function loadRealViewCount(id, el) {
    if (!el) return;
    window.RacheliStore.getViews([id]).then((counts) => {
      el.textContent = counts[id] != null ? counts[id] : 10;
    });
  }

  function cssEscape(s) { return s.replace(/"/g, '\\"'); }
  function escapeAttr(s) { return String(s || '').replace(/"/g, '&quot;'); }
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  async function renderSlideRow(topic, idx) {
    const slide = topic.slides[idx];
    const row = document.createElement('div');
    row.className = 'admin-slide';

    const media = document.createElement('div');
    media.className = 'admin-slide-media';
    const src = await slideSrc(slide);
    if (slide.type === 'video') {
      media.innerHTML = `<video src="${src}" muted playsinline></video><span class="admin-video-badge">וידאו</span>`;
    } else {
      media.innerHTML = `<img src="${src}" alt="">`;
    }
    row.appendChild(media);

    const body = document.createElement('div');
    body.className = 'admin-slide-body';

    const caption = document.createElement('textarea');
    caption.className = 'admin-slide-caption';
    caption.placeholder = 'כיתוב לסטטוס...';
    caption.value = slide.caption || '';
    caption.addEventListener('input', () => {
      slide.caption = caption.value;
      persistDebounced();
    });
    body.appendChild(caption);

    const actions = document.createElement('div');
    actions.className = 'admin-slide-actions';

    const replaceLabel = document.createElement('label');
    replaceLabel.className = 'admin-file-label';
    replaceLabel.innerHTML = `החלפת מדיה <input type="file" accept="image/*,video/*">`;
    replaceLabel.querySelector('input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      await setSlideMedia(topic, slide, file);
      await rerenderTopic(topic);
    });
    actions.appendChild(replaceLabel);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'admin-slide-delete';
    delBtn.textContent = 'מחיקת סטטוס';
    delBtn.disabled = topic.slides.length <= 1;
    delBtn.title = delBtn.disabled ? 'חייב להישאר סטטוס אחד לפחות' : '';
    delBtn.addEventListener('click', async () => {
      if (topic.slides.length <= 1) return;
      if (!confirm('למחוק את הסטטוס הזה?')) return;
      if (slide.mediaId) { try { await window.RacheliStore.deleteMedia(slide.mediaId); } catch (e) {} }
      topic.slides.splice(idx, 1);
      await persist();
      await rerenderTopic(topic);
    });
    actions.appendChild(delBtn);

    body.appendChild(actions);
    row.appendChild(body);
    return row;
  }

  async function addSlide(topic, file) {
    const warnBig = file.size > 50 * 1024 * 1024;
    if (warnBig && !confirm('הקובץ גדול (מעל 50MB) - זה עלול להאט את הדפדפן. להמשיך בכל זאת?')) return;
    const id = topic.id + '-' + Date.now();
    await window.RacheliStore.putMedia(id, file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    topic.slides.push({ type, mediaId: id, caption: '' });
    await persist();
  }

  async function setSlideMedia(topic, slide, file) {
    const warnBig = file.size > 50 * 1024 * 1024;
    if (warnBig && !confirm('הקובץ גדול (מעל 50MB) - זה עלול להאט את הדפדפן. להמשיך בכל זאת?')) return;
    if (slide.mediaId) { try { await window.RacheliStore.deleteMedia(slide.mediaId); } catch (e) {} }
    const id = topic.id + '-' + Date.now();
    await window.RacheliStore.putMedia(id, file);
    slide.type = file.type.startsWith('video') ? 'video' : 'image';
    slide.mediaId = id;
    delete slide.src;
    await persist();
  }

  /* ==========================================================================
     ניהול "שטוח" (לא מקונן תחת טופיק) - משותף לפיד ולקרוסלת "אני כלה"
     ========================================================================== */
  async function itemSrc(item) {
    if (item.mediaId) {
      const blob = await window.RacheliStore.getMedia(item.mediaId);
      if (blob) return trackUrl(URL.createObjectURL(blob));
      return '';
    }
    return item.src || '';
  }

  async function loadFlat(key, defaults) {
    const stored = await window.RacheliStore.getContent(key);
    if (stored && Array.isArray(stored) && stored.length) return stored;
    return JSON.parse(JSON.stringify(defaults));
  }

  function persistFlat(key, list) {
    const status = document.getElementById('admin-save-status');
    return window.RacheliStore.setContent(key, list).then(() => {
      if (status) {
        status.textContent = 'נשמר ✓';
        setTimeout(() => { status.textContent = 'כל השינויים נשמרים אוטומטית'; }, 1600);
      }
    }).catch(() => {
      if (status) status.textContent = 'שגיאה בשמירה - נסי שוב';
    });
  }
  const persistFeedDebounced = debounce(() => persistFlat('feed', feedPosts), 500);
  const persistBrideDebounced = debounce(() => persistFlat('bride_journey', brideSlides), 500);

  /* kind: { key, list, persist, persistDebounced, containerId, isBride } */
  function flatKind(name) {
    return name === 'feed'
      ? { key: 'feed', list: feedPosts, persist: () => persistFlat('feed', feedPosts), persistDebounced: persistFeedDebounced, containerId: 'admin-feed', isBride: false }
      : { key: 'bride_journey', list: brideSlides, persist: () => persistFlat('bride_journey', brideSlides), persistDebounced: persistBrideDebounced, containerId: 'admin-bride', isBride: true };
  }

  async function renderFlatAll(name) {
    const k = flatKind(name);
    const wrap = document.getElementById(k.containerId);
    wrap.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'admin-flat-list';
    for (let i = 0; i < k.list.length; i++) {
      list.appendChild(await renderFlatItem(name, i));
    }
    wrap.appendChild(list);

    const addBtn = document.createElement('label');
    addBtn.className = 'admin-add-slide admin-file-label';
    addBtn.innerHTML = `+ ${k.isBride ? 'הוספת כרטיס' : 'הוספת פוסט'} <input type="file" accept="image/*,video/*">`;
    addBtn.querySelector('input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const warnBig = file.size > 50 * 1024 * 1024;
      if (warnBig && !confirm('הקובץ גדול (מעל 50MB) - זה עלול להאט את הדפדפן. להמשיך בכל זאת?')) return;
      const id = k.key + '-' + Date.now();
      await window.RacheliStore.putMedia(id, file);
      const type = file.type.startsWith('video') ? 'video' : 'image';
      const newItem = k.isBride
        ? { id, type, mediaId: id, caption: '' }
        : { id, type, mediaId: id, caption: '', views: 0, ctaLabel: 'קביעת פגישה' };
      k.list.push(newItem);
      await k.persist();
      await renderFlatAll(name);
    });
    wrap.appendChild(addBtn);
  }

  async function renderFlatItem(name, idx) {
    const k = flatKind(name);
    const item = k.list[idx];
    const row = document.createElement('div');
    row.className = 'admin-flat-item';

    const reorder = document.createElement('div');
    reorder.className = 'admin-flat-reorder';
    const upBtn = document.createElement('button');
    upBtn.type = 'button'; upBtn.textContent = '▲'; upBtn.title = 'הזזה למעלה'; upBtn.disabled = idx === 0;
    upBtn.addEventListener('click', async () => {
      [k.list[idx - 1], k.list[idx]] = [k.list[idx], k.list[idx - 1]];
      await k.persist();
      await renderFlatAll(name);
    });
    const downBtn = document.createElement('button');
    downBtn.type = 'button'; downBtn.textContent = '▼'; downBtn.title = 'הזזה למטה'; downBtn.disabled = idx === k.list.length - 1;
    downBtn.addEventListener('click', async () => {
      [k.list[idx + 1], k.list[idx]] = [k.list[idx], k.list[idx + 1]];
      await k.persist();
      await renderFlatAll(name);
    });
    reorder.appendChild(upBtn);
    reorder.appendChild(downBtn);
    row.appendChild(reorder);

    const media = document.createElement('div');
    media.className = 'admin-slide-media';
    const src = await itemSrc(item);
    media.innerHTML = item.type === 'video'
      ? `<video src="${src}" muted playsinline></video><span class="admin-video-badge">וידאו</span>`
      : `<img src="${src}" alt="">`;
    row.appendChild(media);

    const fields = document.createElement('div');
    fields.className = 'admin-flat-fields';

    const caption = document.createElement('textarea');
    caption.className = 'admin-slide-caption';
    caption.placeholder = 'כיתוב...';
    caption.value = item.caption || '';
    caption.addEventListener('input', () => { item.caption = caption.value; k.persistDebounced(); });
    fields.appendChild(caption);

    if (!k.isBride) {
      const row1 = document.createElement('div');
      row1.className = 'admin-flat-row';
      row1.innerHTML = `<span class="admin-check-label">צפיות אמיתיות: <b class="admin-views-count" data-view-id="${escapeAttr(item.id)}">…</b></span>
        <label class="admin-check-label">טקסט כפתור: <input type="text" class="admin-num-input" style="width:140px" value="${escapeAttr(item.ctaLabel || 'קביעת פגישה')}"></label>`;
      const ctaInput = row1.querySelector('input[type="text"]');
      ctaInput.addEventListener('input', () => { item.ctaLabel = ctaInput.value; k.persistDebounced(); });
      fields.appendChild(row1);
      loadRealViewCount(item.id, row1.querySelector('.admin-views-count'));
    } else {
      const row1 = document.createElement('div');
      row1.className = 'admin-flat-row';
      row1.innerHTML = `
        <label class="admin-check-label"><input type="checkbox" class="admin-check-stats" ${item.showStats ? 'checked' : ''}> הצגת שורת סטטיסטיקה (צפיות + לייק + קביעת פגישה)</label>
        <label class="admin-check-label"><input type="checkbox" class="admin-check-active" ${item.active ? 'checked' : ''}> כרטיס הפתיחה (הראשי)</label>`;
      const statsCheck = row1.querySelector('.admin-check-stats');
      const activeCheck = row1.querySelector('.admin-check-active');
      statsCheck.addEventListener('change', async () => {
        item.showStats = statsCheck.checked;
        if (item.showStats && !item.likeId) item.likeId = item.id;
        await k.persist();
        await renderFlatAll(name);
      });
      activeCheck.addEventListener('change', async () => {
        if (activeCheck.checked) k.list.forEach((s) => { s.active = false; });
        item.active = activeCheck.checked;
        await k.persist();
        await renderFlatAll(name);
      });
      fields.appendChild(row1);
      if (item.showStats) {
        const row2 = document.createElement('div');
        row2.className = 'admin-flat-row';
        row2.innerHTML = `<span class="admin-check-label">צפיות אמיתיות: <b class="admin-views-count" data-view-id="${escapeAttr(item.id)}">…</b></span>`;
        fields.appendChild(row2);
        loadRealViewCount(item.id, row2.querySelector('.admin-views-count'));
      }
    }

    const actions = document.createElement('div');
    actions.className = 'admin-slide-actions';
    const replaceLabel = document.createElement('label');
    replaceLabel.className = 'admin-file-label';
    replaceLabel.innerHTML = `החלפת מדיה <input type="file" accept="image/*,video/*">`;
    replaceLabel.querySelector('input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const warnBig = file.size > 50 * 1024 * 1024;
      if (warnBig && !confirm('הקובץ גדול (מעל 50MB) - זה עלול להאט את הדפדפן. להמשיך בכל זאת?')) return;
      if (item.mediaId) { try { await window.RacheliStore.deleteMedia(item.mediaId); } catch (e2) {} }
      const id = k.key + '-' + Date.now();
      await window.RacheliStore.putMedia(id, file);
      item.type = file.type.startsWith('video') ? 'video' : 'image';
      item.mediaId = id;
      delete item.src;
      await k.persist();
      await renderFlatAll(name);
    });
    actions.appendChild(replaceLabel);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'admin-slide-delete';
    delBtn.textContent = k.isBride ? 'מחיקת כרטיס' : 'מחיקת פוסט';
    delBtn.disabled = k.list.length <= 1;
    delBtn.title = delBtn.disabled ? 'חייב להישאר פריט אחד לפחות' : '';
    delBtn.addEventListener('click', async () => {
      if (k.list.length <= 1) return;
      if (!confirm(k.isBride ? 'למחוק את הכרטיס הזה?' : 'למחוק את הפוסט הזה?')) return;
      if (item.mediaId) { try { await window.RacheliStore.deleteMedia(item.mediaId); } catch (e2) {} }
      k.list.splice(idx, 1);
      await k.persist();
      await renderFlatAll(name);
    });
    actions.appendChild(delBtn);
    fields.appendChild(actions);

    row.appendChild(fields);
    return row;
  }

  /* ==========================================================================
     ניהול לוז פגישות: שעות פעילות, תאריכים חסומים, רשימת פגישות
     ========================================================================== */
  const DAY_NAMES_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  let hoursConfig = null;

  async function loadHours() {
    const stored = await window.RacheliStore.getHours();
    hoursConfig = stored || JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_HOURS));
    if (!hoursConfig.days) hoursConfig.days = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_HOURS.days));
    if (!Array.isArray(hoursConfig.blockedDates)) hoursConfig.blockedDates = [];
    if (!hoursConfig.slotMinutes) hoursConfig.slotMinutes = 30;
  }

  function persistHours() {
    const status = document.getElementById('admin-save-status');
    return window.RacheliStore.setHours(hoursConfig).then(() => {
      if (status) {
        status.textContent = 'נשמר ✓';
        setTimeout(() => { status.textContent = 'כל השינויים נשמרים אוטומטית'; }, 1600);
      }
    }).catch(() => {
      if (status) status.textContent = 'שגיאה בשמירה - נסי שוב';
    });
  }
  const persistHoursDebounced = debounce(persistHours, 600);

  function renderHours() {
    const wrap = document.getElementById('admin-hours');
    wrap.innerHTML = '';

    const slotRow = document.createElement('div');
    slotRow.className = 'admin-slot-minutes-row';
    slotRow.innerHTML = `<label class="admin-check-label">אורך כל תור (בדקות): <input type="number" class="admin-num-input" min="10" step="5" value="${Number(hoursConfig.slotMinutes) || 30}"></label>`;
    const slotInput = slotRow.querySelector('input');
    slotInput.addEventListener('input', () => {
      hoursConfig.slotMinutes = Number(slotInput.value) || 30;
      persistHoursDebounced();
    });
    wrap.appendChild(slotRow);

    for (let d = 0; d <= 6; d++) {
      const dayConfig = hoursConfig.days[d] || { open: false, from: '', to: '' };
      const row = document.createElement('div');
      row.className = 'admin-hours-row';
      row.innerHTML = `
        <span class="admin-hours-day">יום ${DAY_NAMES_HE[d]}</span>
        <label class="admin-check-label"><input type="checkbox" class="admin-hours-open" ${dayConfig.open ? 'checked' : ''}> פתוח</label>
        <div class="admin-hours-times">
          <input type="time" class="admin-time-input admin-hours-from" value="${dayConfig.from || '10:00'}" ${dayConfig.open ? '' : 'disabled'}>
          <span class="admin-hours-closed">עד</span>
          <input type="time" class="admin-time-input admin-hours-to" value="${dayConfig.to || '19:00'}" ${dayConfig.open ? '' : 'disabled'}>
        </div>
      `;
      const openCheck = row.querySelector('.admin-hours-open');
      const fromInput = row.querySelector('.admin-hours-from');
      const toInput = row.querySelector('.admin-hours-to');
      openCheck.addEventListener('change', () => {
        dayConfig.open = openCheck.checked;
        hoursConfig.days[d] = dayConfig;
        fromInput.disabled = !dayConfig.open;
        toInput.disabled = !dayConfig.open;
        persistHours();
      });
      fromInput.addEventListener('input', () => { dayConfig.from = fromInput.value; hoursConfig.days[d] = dayConfig; persistHoursDebounced(); });
      toInput.addEventListener('input', () => { dayConfig.to = toInput.value; hoursConfig.days[d] = dayConfig; persistHoursDebounced(); });
      wrap.appendChild(row);
    }
  }

  function renderBlockedDates() {
    const wrap = document.getElementById('admin-blocked-dates');
    wrap.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'admin-blocked-list';
    hoursConfig.blockedDates.slice().sort().forEach((dateStr) => {
      const chip = document.createElement('span');
      chip.className = 'admin-blocked-chip';
      chip.innerHTML = `${formatAdminDate(dateStr)} <button type="button" title="הסרה">&times;</button>`;
      chip.querySelector('button').addEventListener('click', async () => {
        hoursConfig.blockedDates = hoursConfig.blockedDates.filter((d) => d !== dateStr);
        await persistHours();
        renderBlockedDates();
      });
      list.appendChild(chip);
    });
    if (!hoursConfig.blockedDates.length) {
      const empty = document.createElement('span');
      empty.className = 'admin-hours-closed';
      empty.textContent = 'אין תאריכים חסומים כרגע';
      list.appendChild(empty);
    }
    wrap.appendChild(list);

    const addRow = document.createElement('div');
    addRow.className = 'admin-blocked-add';
    addRow.innerHTML = `<input type="date" class="admin-time-input" id="admin-blocked-date-input">
      <button type="button" class="admin-file-label" id="admin-blocked-add-btn">+ חסימת תאריך</button>`;
    addRow.querySelector('#admin-blocked-add-btn').addEventListener('click', async () => {
      const input = document.getElementById('admin-blocked-date-input');
      const val = input.value;
      if (!val) return;
      if (!hoursConfig.blockedDates.includes(val)) {
        hoursConfig.blockedDates.push(val);
        await persistHours();
        renderBlockedDates();
      }
      input.value = '';
    });
    wrap.appendChild(addRow);
  }

  function formatAdminDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  async function renderAppointments() {
    const wrap = document.getElementById('admin-appointments');
    wrap.innerHTML = '<p class="admin-loading">טוען פגישות…</p>';
    const list = await window.RacheliStore.listAppointments();
    wrap.innerHTML = '';

    if (!list.length) {
      const empty = document.createElement('p');
      empty.className = 'admin-appt-empty';
      empty.textContent = 'אין עדיין פגישות שנקבעו דרך האתר';
      wrap.appendChild(empty);
      return;
    }

    const container = document.createElement('div');
    container.className = 'admin-appt-list';
    list.forEach((apt) => {
      const item = document.createElement('div');
      item.className = 'admin-appt-item';
      const contextLine = apt.context ? `<br><span class="admin-appt-context">נושא: ${escapeHtml(apt.context)}</span>` : '';
      item.innerHTML = `
        <div class="admin-appt-when">${formatAdminDate(apt.date)} | ${apt.time}</div>
        <div class="admin-appt-details">${escapeHtml(apt.name)} · ${escapeHtml(apt.phone)}${apt.email ? ' · ' + escapeHtml(apt.email) : ''}${contextLine}</div>
        <button type="button" class="admin-slide-delete admin-appt-cancel">ביטול פגישה</button>
      `;
      item.querySelector('.admin-appt-cancel').addEventListener('click', async () => {
        if (!confirm(`לבטל את הפגישה של ${apt.name} בתאריך ${formatAdminDate(apt.date)} בשעה ${apt.time}?`)) return;
        try {
          await window.RacheliStore.cancelAppointment(apt.id);
          await renderAppointments();
        } catch (e) {
          alert('שגיאה בביטול הפגישה - נסי שוב');
        }
      });
      container.appendChild(item);
    });
    wrap.appendChild(container);
  }

  /* ---------------- נתוני צפיות (אנליטיקס) ---------------- */
  const ANALYTICS_LABELS = {
    home: 'עמוד הבית', index: 'עמוד הבית',
    about: 'אודות',
    feed: 'פיד',
    bride: 'אני כלה',
    'new-wig': 'פאה חדשה',
    'renew-wig': 'חידוש פאה',
    contact: 'יצירת קשר',
    articles: 'מאמרים (רשימה)',
    article: 'מאמר (עמוד בודד)',
    videos: 'סרטונים',
    accessibility: 'נגישות',
    terms: 'תקנון',
  };

  function formatDuration(totalSeconds) {
    const s = Math.round(totalSeconds || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h} שעות ${m} דק'`;
    if (m > 0) return `${m} דק' ${sec} שנ'`;
    return `${sec} שניות`;
  }

  async function renderAnalytics() {
    const wrap = document.getElementById('admin-analytics');
    wrap.innerHTML = '<p class="admin-loading">טוען נתוני צפיות…</p>';
    const rows = await window.RacheliStore.getAnalytics();
    wrap.innerHTML = '';

    if (!rows.length) {
      const empty = document.createElement('p');
      empty.className = 'admin-appt-empty';
      empty.textContent = 'עדיין אין נתוני צפיות - הן נאספות אוטומטית מביקורים באתר, ויופיעו כאן בקרוב';
      wrap.appendChild(empty);
      return;
    }

    rows.sort((a, b) => b.views - a.views);
    const totalViews = rows.reduce((sum, r) => sum + (r.views || 0), 0);
    const totalSeconds = rows.reduce((sum, r) => sum + (r.totalSeconds || 0), 0);

    const summary = document.createElement('div');
    summary.className = 'admin-analytics-summary';
    summary.innerHTML = `
      <div class="admin-analytics-stat"><b>${totalViews.toLocaleString('he-IL')}</b><span>סה"כ צפיות עמוד בכל האתר</span></div>
      <div class="admin-analytics-stat"><b>${formatDuration(totalSeconds)}</b><span>סה"כ זמן גלישה שנאסף</span></div>
    `;
    wrap.appendChild(summary);

    const table = document.createElement('table');
    table.className = 'admin-analytics-table';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>עמוד / תוכן</th><th>צפיות</th><th>זמן שהייה כולל</th><th>זמן שהייה ממוצע לצפייה</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach((r) => {
      const avg = r.views ? r.totalSeconds / r.views : 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(ANALYTICS_LABELS[r.page] || r.page)}</td>
        <td>${(r.views || 0).toLocaleString('he-IL')}</td>
        <td>${formatDuration(r.totalSeconds)}</td>
        <td>${formatDuration(avg)}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
  }

  function initTabs() {
    const tabs = Array.from(document.querySelectorAll('.admin-tab'));
    const resetBtn = document.getElementById('admin-reset');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.adminTab;
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        document.querySelectorAll('.admin-panel').forEach((panel) => {
          panel.hidden = panel.dataset.adminPanel !== target;
        });
        if (resetBtn) resetBtn.hidden = (target === 'appointments' || target === 'analytics');
        if (target === 'appointments') renderAppointments();
        if (target === 'analytics') renderAnalytics();
      });
    });
  }

  async function init() {
    await loadTopics();
    await renderAll();
    feedPosts = await loadFlat('feed', window.RacheliStore.DEFAULT_FEED_POSTS);
    await renderFlatAll('feed');
    brideSlides = await loadFlat('bride_journey', window.RacheliStore.DEFAULT_BRIDE_JOURNEY);
    await renderFlatAll('bride');
    await loadHours();
    renderHours();
    renderBlockedDates();
    initTabs();

    const analyticsRefreshBtn = document.getElementById('admin-analytics-refresh');
    if (analyticsRefreshBtn) analyticsRefreshBtn.addEventListener('click', renderAnalytics);

    document.getElementById('admin-hours-reset').addEventListener('click', async () => {
      if (!confirm('לשחזר את שעות הפעילות לברירת המחדל? התאריכים החסומים לא יימחקו.')) return;
      const prevBlocked = Array.isArray(hoursConfig.blockedDates) ? hoursConfig.blockedDates : [];
      hoursConfig = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_HOURS));
      hoursConfig.blockedDates = prevBlocked; /* התאריכים החסומים מנוהלים בנפרד ולא מתאפסים כאן */
      await persistHours();
      renderHours();
    });

    document.getElementById('admin-reset').addEventListener('click', async () => {
      const activeTab = document.querySelector('.admin-tab.active');
      const target = activeTab ? activeTab.dataset.adminTab : 'stories';
      if (target === 'appointments' || target === 'analytics') return;
      const labels = { stories: 'הסטוריז', feed: 'הפיד', bride: 'קרוסלת "אני כלה"' };
      if (!confirm(`לאפס את ${labels[target]} לברירת המחדל? פעולה זו תמחק את כל העריכות שהועלו בדפדפן הזה בחלק הזה בלבד.`)) return;
      if (target === 'feed') {
        feedPosts = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_FEED_POSTS));
        await persistFlat('feed', feedPosts);
      } else if (target === 'bride') {
        brideSlides = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_BRIDE_JOURNEY));
        await persistFlat('bride_journey', brideSlides);
      } else {
        topics = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_TOPICS));
        await persist();
      }
      location.reload();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
