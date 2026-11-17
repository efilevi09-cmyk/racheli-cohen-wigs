// פאנל ניהול תוכן - רחלי כהן (סטוריז + פיד + קרוסלות "אני כלה"/"פאה חדשה"/"חידוש פאה" + מאמרים)
(function () {
  let topics = [];
  let feedPosts = [];
  let brideSlides = [];
  let newWigSlides = [];
  let renewWigSlides = [];
  let articles = [];
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
  const persistNewWigDebounced = debounce(() => persistFlat('new_wig_journey', newWigSlides), 500);
  const persistRenewWigDebounced = debounce(() => persistFlat('renew_wig_journey', renewWigSlides), 500);

  /* kind: { key, list, persist, persistDebounced, containerId, isBride }
     isBride=true מסמן "קרוסלת סטורי" (מדיה+כיתוב, עם אפשרות showStats/active) - משותף לשלוש הקרוסלות */
  function flatKind(name) {
    const kinds = {
      feed: { key: 'feed', list: feedPosts, persist: () => persistFlat('feed', feedPosts), persistDebounced: persistFeedDebounced, containerId: 'admin-feed', isBride: false },
      bride: { key: 'bride_journey', list: brideSlides, persist: () => persistFlat('bride_journey', brideSlides), persistDebounced: persistBrideDebounced, containerId: 'admin-bride', isBride: true },
      'new-wig': { key: 'new_wig_journey', list: newWigSlides, persist: () => persistFlat('new_wig_journey', newWigSlides), persistDebounced: persistNewWigDebounced, containerId: 'admin-new-wig', isBride: true },
      'renew-wig': { key: 'renew_wig_journey', list: renewWigSlides, persist: () => persistFlat('renew_wig_journey', renewWigSlides), persistDebounced: persistRenewWigDebounced, containerId: 'admin-renew-wig', isBride: true },
    };
    return kinds[name] || kinds.bride;
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
     ניהול מאמרים (דף "מאמרים" + עמוד מאמר בודד) - כל מאמר: תמונה, קטגוריה, כותרת,
     תקציר, גוף (פסקאות מופרדות בשורה ריקה; שורה שמתחילה ב-"## " הופכת לכותרת משנה)
     ========================================================================== */
  async function persistArticles() { return persistFlat('articles', articles); }
  const persistArticlesDebounced = debounce(persistArticles, 500);

  async function articleImgSrc(item) {
    if (item.mediaId) {
      const blob = await window.RacheliStore.getMedia(item.mediaId);
      if (blob) return trackUrl(URL.createObjectURL(blob));
    }
    return item.img || '';
  }

  /* הופך מערך פסקאות (כפי שהוא נשמר ומוצג באתר - ר' renderArticleBody ב-common.js) לטקסט חופשי
     לעריכה בתיבת טקסט אחת, ולהפך - כדי לשמור על פורמט האחסון הקיים בלי לשנות את קוד התצוגה */
  function articleBodyToText(body) {
    return (Array.isArray(body) ? body : []).map((p) => {
      const m = /^<h2>([\s\S]*)<\/h2>$/.exec(p);
      return m ? '## ' + m[1] : p;
    }).join('\n\n');
  }
  function textToArticleBody(text) {
    return String(text || '').split(/\n\s*\n+/).map((b) => b.trim()).filter(Boolean).map((b) => (
      b.indexOf('## ') === 0 ? `<h2>${escapeHtml(b.slice(3).trim())}</h2>` : b
    ));
  }

  async function renderArticlesAdmin() {
    const wrap = document.getElementById('admin-articles');
    if (!wrap) return;
    wrap.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'admin-flat-list';
    for (let i = 0; i < articles.length; i++) list.appendChild(await renderArticleItem(i));
    wrap.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'admin-add-slide';
    addBtn.textContent = '+ הוספת מאמר';
    addBtn.addEventListener('click', async () => {
      articles.push({ id: 'article-' + Date.now(), tag: 'טיפים', img: '', title: 'כותרת חדשה', excerpt: '', likes: 0, body: [''] });
      await persistArticles();
      await renderArticlesAdmin();
    });
    wrap.appendChild(addBtn);
  }

  async function renderArticleItem(idx) {
    const item = articles[idx];
    const row = document.createElement('div');
    row.className = 'admin-flat-item';

    const reorder = document.createElement('div');
    reorder.className = 'admin-flat-reorder';
    const upBtn = document.createElement('button');
    upBtn.type = 'button'; upBtn.textContent = '▲'; upBtn.title = 'הזזה למעלה'; upBtn.disabled = idx === 0;
    upBtn.addEventListener('click', async () => {
      [articles[idx - 1], articles[idx]] = [articles[idx], articles[idx - 1]];
      await persistArticles();
      await renderArticlesAdmin();
    });
    const downBtn = document.createElement('button');
    downBtn.type = 'button'; downBtn.textContent = '▼'; downBtn.title = 'הזזה למטה'; downBtn.disabled = idx === articles.length - 1;
    downBtn.addEventListener('click', async () => {
      [articles[idx + 1], articles[idx]] = [articles[idx], articles[idx + 1]];
      await persistArticles();
      await renderArticlesAdmin();
    });
    reorder.appendChild(upBtn);
    reorder.appendChild(downBtn);
    row.appendChild(reorder);

    const media = document.createElement('div');
    media.className = 'admin-slide-media';
    const src = await articleImgSrc(item);
    media.innerHTML = src
      ? `<img src="${src}" alt="">`
      : `<div class="admin-article-noimg">אין תמונה</div>`;
    row.appendChild(media);

    const fields = document.createElement('div');
    fields.className = 'admin-flat-fields';

    const row1 = document.createElement('div');
    row1.className = 'admin-flat-row';
    row1.innerHTML = `
      <input type="text" class="admin-text-input admin-article-title-input" placeholder="כותרת המאמר" value="${escapeAttr(item.title)}">
      <input type="text" class="admin-text-input admin-article-tag-input" placeholder="קטגוריה (למשל: טיפים)" value="${escapeAttr(item.tag)}">
    `;
    const titleInput = row1.querySelector('.admin-article-title-input');
    const tagInput = row1.querySelector('.admin-article-tag-input');
    titleInput.addEventListener('input', () => { item.title = titleInput.value; persistArticlesDebounced(); });
    tagInput.addEventListener('input', () => { item.tag = tagInput.value; persistArticlesDebounced(); });
    fields.appendChild(row1);

    const excerpt = document.createElement('textarea');
    excerpt.className = 'admin-slide-caption';
    excerpt.placeholder = 'תקציר קצר שמופיע בכרטיס...';
    excerpt.value = item.excerpt || '';
    excerpt.addEventListener('input', () => { item.excerpt = excerpt.value; persistArticlesDebounced(); });
    fields.appendChild(excerpt);

    const body = document.createElement('textarea');
    body.className = 'admin-slide-caption admin-article-body-input';
    body.placeholder = 'גוף המאמר - כל פסקה בשורה נפרדת עם שורה ריקה ביניהן. כדי להוסיף כותרת משנה בתוך המאמר, התחילי שורה ב-"## " (לדוגמה: ## איך לבחור פאה)';
    body.value = articleBodyToText(item.body);
    body.addEventListener('input', () => { item.body = textToArticleBody(body.value); persistArticlesDebounced(); });
    fields.appendChild(body);

    const row2 = document.createElement('div');
    row2.className = 'admin-flat-row';
    row2.innerHTML = `<label class="admin-check-label">לייקים (מספר לתצוגה): <input type="number" class="admin-num-input" min="0" value="${Number(item.likes) || 0}"></label>`;
    const likesInput = row2.querySelector('input');
    likesInput.addEventListener('input', () => { item.likes = Number(likesInput.value) || 0; persistArticlesDebounced(); });
    fields.appendChild(row2);

    const actions = document.createElement('div');
    actions.className = 'admin-slide-actions';
    const replaceLabel = document.createElement('label');
    replaceLabel.className = 'admin-file-label';
    replaceLabel.innerHTML = `${(item.mediaId || item.img) ? 'החלפת תמונה' : 'העלאת תמונה'} <input type="file" accept="image/*">`;
    replaceLabel.querySelector('input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const warnBig = file.size > 50 * 1024 * 1024;
      if (warnBig && !confirm('הקובץ גדול (מעל 50MB) - זה עלול להאט את הדפדפן. להמשיך בכל זאת?')) return;
      if (item.mediaId) { try { await window.RacheliStore.deleteMedia(item.mediaId); } catch (e2) {} }
      const id = 'article-' + Date.now();
      await window.RacheliStore.putMedia(id, file);
      item.mediaId = id;
      delete item.img;
      await persistArticles();
      await renderArticlesAdmin();
    });
    actions.appendChild(replaceLabel);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'admin-slide-delete';
    delBtn.textContent = 'מחיקת מאמר';
    delBtn.disabled = articles.length <= 1;
    delBtn.title = delBtn.disabled ? 'חייב להישאר מאמר אחד לפחות' : '';
    delBtn.addEventListener('click', async () => {
      if (articles.length <= 1) return;
      if (!confirm('למחוק את המאמר הזה?')) return;
      if (item.mediaId) { try { await window.RacheliStore.deleteMedia(item.mediaId); } catch (e2) {} }
      articles.splice(idx, 1);
      await persistArticles();
      await renderArticlesAdmin();
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
    if (!hoursConfig.blockedSlots || typeof hoursConfig.blockedSlots !== 'object') hoursConfig.blockedSlots = {};
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
        renderBlockedHours();
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
        renderBlockedHours();
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

  /* ==========================================================================
     חסימת שעות נקודתיות בתאריך ספציפי - בלי לחסום את כל היום (למשל: פגישה פרטית
     באמצע יום רגיל). הבחירה מוצגת כרשימת כפתורי שעה לכל התאריך שנבחר, בהתאם לשעות
     הפעילות של יום השבוע הזה; לחיצה על שעה הופכת אותה לחסומה/פנויה ונשמרת מיד.
     ========================================================================== */
  function renderBlockedHours() {
    const wrap = document.getElementById('admin-blocked-hours');
    if (!wrap) return;
    wrap.innerHTML = '';

    const pickerRow = document.createElement('div');
    pickerRow.className = 'admin-blocked-add';
    pickerRow.innerHTML = `<input type="date" class="admin-time-input" id="admin-blocked-hours-date-input">
      <span class="admin-hours-closed">בחרי תאריך כדי לראות ולסמן את השעות של אותו יום</span>`;
    wrap.appendChild(pickerRow);

    const slotsWrap = document.createElement('div');
    slotsWrap.className = 'admin-blocked-hours-slots';
    wrap.appendChild(slotsWrap);

    function renderSlotsForDate(dateVal) {
      slotsWrap.innerHTML = '';
      if (!dateVal) return;

      const d = new Date(dateVal + 'T00:00:00');
      const dayConfig = hoursConfig.days[d.getDay()];
      if (hoursConfig.blockedDates.includes(dateVal)) {
        slotsWrap.innerHTML = '<p class="admin-hours-closed">התאריך הזה חסום לגמרי (ראו "תאריכים חסומים" למעלה) - אין צורך לחסום שעות בנפרד.</p>';
        return;
      }
      if (!dayConfig || !dayConfig.open) {
        slotsWrap.innerHTML = '<p class="admin-hours-closed">ממילא אין קבלה ביום הזה לפי שעות הפעילות הרגילות.</p>';
        return;
      }

      const allSlots = window.RacheliStore.computeDaySlots(dayConfig, hoursConfig.slotMinutes);
      if (!allSlots.length) {
        slotsWrap.innerHTML = '<p class="admin-hours-closed">אין שעות מוגדרות ליום הזה.</p>';
        return;
      }

      const blockedForDate = hoursConfig.blockedSlots[dateVal] || [];
      const grid = document.createElement('div');
      grid.className = 'admin-hour-chip-grid';
      allSlots.forEach((t) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isBlocked = blockedForDate.includes(t);
        btn.className = 'admin-hour-chip' + (isBlocked ? ' is-blocked' : '');
        btn.textContent = t;
        btn.title = isBlocked ? 'חסומה - לחצי כדי לפתוח' : 'פנויה - לחצי כדי לחסום';
        btn.addEventListener('click', async () => {
          const current = hoursConfig.blockedSlots[dateVal] || [];
          if (current.includes(t)) {
            hoursConfig.blockedSlots[dateVal] = current.filter((x) => x !== t);
            if (!hoursConfig.blockedSlots[dateVal].length) delete hoursConfig.blockedSlots[dateVal];
          } else {
            hoursConfig.blockedSlots[dateVal] = current.concat([t]).sort();
          }
          await persistHours();
          renderSlotsForDate(dateVal);
          renderBlockedHoursSummary();
        });
        grid.appendChild(btn);
      });
      slotsWrap.appendChild(grid);
    }

    const dateInput = pickerRow.querySelector('#admin-blocked-hours-date-input');
    dateInput.addEventListener('change', () => renderSlotsForDate(dateInput.value));

    const summaryWrap = document.createElement('div');
    summaryWrap.className = 'admin-blocked-hours-summary';
    wrap.appendChild(summaryWrap);

    function renderBlockedHoursSummary() {
      summaryWrap.innerHTML = '';
      const dates = Object.keys(hoursConfig.blockedSlots).sort();
      if (!dates.length) {
        const empty = document.createElement('span');
        empty.className = 'admin-hours-closed';
        empty.textContent = 'אין כרגע שעות חסומות בתאריך ספציפי כלשהו.';
        summaryWrap.appendChild(empty);
        return;
      }
      const title = document.createElement('p');
      title.className = 'admin-hours-closed';
      title.style.marginBottom = '8px';
      title.textContent = 'שעות חסומות נקודתית:';
      summaryWrap.appendChild(title);
      dates.forEach((dateStr) => {
        const row = document.createElement('div');
        row.className = 'admin-blocked-hours-summary-row';
        const label = document.createElement('span');
        label.className = 'admin-blocked-hours-summary-date';
        label.textContent = formatAdminDate(dateStr) + ':';
        row.appendChild(label);
        (hoursConfig.blockedSlots[dateStr] || []).forEach((t) => {
          const chip = document.createElement('span');
          chip.className = 'admin-blocked-chip';
          chip.innerHTML = `${t} <button type="button" title="פתיחת השעה">&times;</button>`;
          chip.querySelector('button').addEventListener('click', async () => {
            hoursConfig.blockedSlots[dateStr] = (hoursConfig.blockedSlots[dateStr] || []).filter((x) => x !== t);
            if (!hoursConfig.blockedSlots[dateStr].length) delete hoursConfig.blockedSlots[dateStr];
            await persistHours();
            renderBlockedHoursSummary();
            if (dateInput.value === dateStr) renderSlotsForDate(dateStr);
          });
          row.appendChild(chip);
        });
        summaryWrap.appendChild(row);
      });
    }

    renderBlockedHoursSummary();
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
    newWigSlides = await loadFlat('new_wig_journey', window.RacheliStore.DEFAULT_NEW_WIG_JOURNEY);
    await renderFlatAll('new-wig');
    renewWigSlides = await loadFlat('renew_wig_journey', window.RacheliStore.DEFAULT_RENEW_WIG_JOURNEY);
    await renderFlatAll('renew-wig');
    articles = await loadFlat('articles', window.RacheliStore.DEFAULT_ARTICLES);
    await renderArticlesAdmin();
    await loadHours();
    renderHours();
    renderBlockedDates();
    renderBlockedHours();
    initTabs();

    const analyticsRefreshBtn = document.getElementById('admin-analytics-refresh');
    if (analyticsRefreshBtn) analyticsRefreshBtn.addEventListener('click', renderAnalytics);

    document.getElementById('admin-hours-reset').addEventListener('click', async () => {
      if (!confirm('לשחזר את שעות הפעילות לברירת המחדל? התאריכים והשעות החסומות לא יימחקו.')) return;
      const prevBlocked = Array.isArray(hoursConfig.blockedDates) ? hoursConfig.blockedDates : [];
      const prevBlockedSlots = hoursConfig.blockedSlots && typeof hoursConfig.blockedSlots === 'object' ? hoursConfig.blockedSlots : {};
      hoursConfig = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_HOURS));
      hoursConfig.blockedDates = prevBlocked; /* התאריכים החסומים מנוהלים בנפרד ולא מתאפסים כאן */
      hoursConfig.blockedSlots = prevBlockedSlots; /* וכך גם השעות החסומות הנקודתיות */
      await persistHours();
      renderHours();
      renderBlockedHours();
    });

    document.getElementById('admin-reset').addEventListener('click', async () => {
      const activeTab = document.querySelector('.admin-tab.active');
      const target = activeTab ? activeTab.dataset.adminTab : 'stories';
      if (target === 'appointments' || target === 'analytics') return;
      const labels = {
        stories: 'הסטוריז', feed: 'הפיד', bride: 'קרוסלת "אני כלה"',
        'new-wig': 'קרוסלת "פאה חדשה"', 'renew-wig': 'קרוסלת "חידוש פאה"', articles: 'המאמרים',
      };
      if (!confirm(`לאפס את ${labels[target]} לברירת המחדל? פעולה זו תמחק את כל העריכות שהועלו בדפדפן הזה בחלק הזה בלבד.`)) return;
      if (target === 'feed') {
        feedPosts = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_FEED_POSTS));
        await persistFlat('feed', feedPosts);
      } else if (target === 'bride') {
        brideSlides = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_BRIDE_JOURNEY));
        await persistFlat('bride_journey', brideSlides);
      } else if (target === 'new-wig') {
        newWigSlides = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_NEW_WIG_JOURNEY));
        await persistFlat('new_wig_journey', newWigSlides);
      } else if (target === 'renew-wig') {
        renewWigSlides = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_RENEW_WIG_JOURNEY));
        await persistFlat('renew_wig_journey', renewWigSlides);
      } else if (target === 'articles') {
        articles = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_ARTICLES));
        await persistFlat('articles', articles);
      } else {
        topics = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_TOPICS));
        await persist();
      }
      location.reload();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
