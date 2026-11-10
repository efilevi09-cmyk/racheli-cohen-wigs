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
      row1.innerHTML = `<label class="admin-check-label">צפיות: <input type="number" class="admin-num-input" min="0" value="${Number(item.views) || 0}"></label>
        <label class="admin-check-label">טקסט כפתור: <input type="text" class="admin-num-input" style="width:140px" value="${escapeAttr(item.ctaLabel || 'קביעת פגישה')}"></label>`;
      const viewsInput = row1.querySelector('input[type="number"]');
      viewsInput.addEventListener('input', () => { item.views = Number(viewsInput.value) || 0; k.persistDebounced(); });
      const ctaInput = row1.querySelector('input[type="text"]');
      ctaInput.addEventListener('input', () => { item.ctaLabel = ctaInput.value; k.persistDebounced(); });
      fields.appendChild(row1);
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
        row2.innerHTML = `<label class="admin-check-label">צפיות: <input type="number" class="admin-num-input" min="0" value="${Number(item.views) || 0}"></label>`;
        const viewsInput = row2.querySelector('input[type="number"]');
        viewsInput.addEventListener('input', () => { item.views = Number(viewsInput.value) || 0; k.persistDebounced(); });
        fields.appendChild(row2);
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

  function initTabs() {
    const tabs = Array.from(document.querySelectorAll('.admin-tab'));
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
    initTabs();

    document.getElementById('admin-reset').addEventListener('click', async () => {
      const activeTab = document.querySelector('.admin-tab.active');
      const target = activeTab ? activeTab.dataset.adminTab : 'stories';
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
