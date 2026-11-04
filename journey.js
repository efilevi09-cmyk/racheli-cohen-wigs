// קרוסלת "סטורי" למסעות (פאה חדשה / כלה / חידוש פאה)
(function () {
  function initStoryCarousel(root) {
    const track = root.querySelector('.story-track');
    const cards = Array.from(root.querySelectorAll('.story-card'));
    const prevBtn = root.querySelector('.story-nav.prev');
    const nextBtn = root.querySelector('.story-nav.next');
    const progressBar = root.querySelector('.story-progress-bar');
    const headline = root.querySelector('.story-headline');
    let index = cards.findIndex((c) => c.classList.contains('active'));
    if (index < 0) index = 0;

    function render() {
      cards.forEach((c, i) => {
        c.classList.toggle('active', i === index);
      });
      if (headline && cards[index].dataset.headline) {
        headline.textContent = cards[index].dataset.headline;
      }
      if (progressBar) {
        progressBar.style.width = ((index + 1) / cards.length) * 100 + '%';
      }
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    prevBtn && prevBtn.addEventListener('click', () => {
      index = (index - 1 + cards.length) % cards.length;
      render();
    });
    nextBtn && nextBtn.addEventListener('click', () => {
      index = (index + 1) % cards.length;
      render();
    });
    cards.forEach((c, i) => c.addEventListener('click', () => { index = i; render(); }));

    render();
  }

  function initAll() {
    document.querySelectorAll('[data-story-carousel]').forEach(initStoryCarousel);
  }

  window.RCJourney = { init: initAll };

  document.addEventListener('DOMContentLoaded', initAll);
})();
