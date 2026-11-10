// קרוסלת "סטורי" למסעות (פאה חדשה / כלה / חידוש פאה)
// בטוח להרצה חוזרת (idempotent) על אותו root - כדי לתמוך בדפים שבהם הכרטיסים נבנים דינמית מתוכן
// שמגיע מהאדמין (ר' renderBrideJourney ב-common.js) ועלולים להתחלף אחרי שהקרוסלה כבר אותחלה פעם אחת
(function () {
  function initStoryCarousel(root) {
    const track = root.querySelector('.story-track');
    const prevBtn = root.querySelector('.story-nav.prev');
    const nextBtn = root.querySelector('.story-nav.next');
    const progressBar = root.querySelector('.story-progress-bar');
    const headline = root.querySelector('.story-headline');

    function getCards() { return Array.from(root.querySelectorAll('.story-card')); }
    function currentIndex(cards) {
      const i = cards.findIndex((c) => c.classList.contains('active'));
      return i < 0 ? 0 : i;
    }

    function render() {
      const cards = getCards();
      if (!cards.length) return;
      const index = currentIndex(cards);
      cards.forEach((c, i) => c.classList.toggle('active', i === index));
      if (headline && cards[index].dataset.headline) {
        headline.textContent = cards[index].dataset.headline;
      }
      if (progressBar) {
        progressBar.style.width = ((index + 1) / cards.length) * 100 + '%';
      }
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    function goTo(i) {
      const cards = getCards();
      if (!cards.length) return;
      const next = (i + cards.length) % cards.length;
      cards.forEach((c, idx) => c.classList.toggle('active', idx === next));
      render();
    }

    /* הכפתורים/הלחיצה-על-כרטיס נקשרים פעם אחת בלבד לכל root (מסומן ב-dataset) - גם אם הכרטיסים
       עצמם מוחלפים דינמית אח"כ (למשל אחרי טעינת תוכן מהאדמין), אין צורך לקשור שוב ואין כפילות */
    if (!root.dataset.rcJourneyBound) {
      root.dataset.rcJourneyBound = '1';
      prevBtn && prevBtn.addEventListener('click', () => {
        const cards = getCards();
        goTo(currentIndex(cards) - 1);
      });
      nextBtn && nextBtn.addEventListener('click', () => {
        const cards = getCards();
        goTo(currentIndex(cards) + 1);
      });
      track && track.addEventListener('click', (e) => {
        const card = e.target.closest('.story-card');
        if (!card || !track.contains(card)) return;
        const cards = getCards();
        const i = cards.indexOf(card);
        if (i >= 0) goTo(i);
      });
    }

    render();
  }

  function initAll() {
    document.querySelectorAll('[data-story-carousel]').forEach(initStoryCarousel);
  }

  window.RCJourney = { init: initAll };

  document.addEventListener('DOMContentLoaded', initAll);
})();
