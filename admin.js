// פאנל ניהול תוכן הסטוריז - רחלי כהן
(function () {
  let topics = [];
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

  async function init() {
    await loadTopics();
    await renderAll();

    document.getElementById('admin-reset').addEventListener('click', async () => {
      if (!confirm('לאפס את כל התוכן לברירת המחדל? פעולה זו תמחק את כל העריכות והסטטוסים שהועלו בדפדפן הזה.')) return;
      topics = JSON.parse(JSON.stringify(window.RacheliStore.DEFAULT_TOPICS));
      await persist();
      location.reload();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
