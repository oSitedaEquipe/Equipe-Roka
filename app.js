'use strict';

(() => {
  const opening = document.getElementById('opening');
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');
  const head = document.getElementById('head');
  const title = document.getElementById('title');
  const start = document.getElementById('start');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let hasEntered = false;
  let headEntrance;

  intro.muted = false;
  intro.volume = 1;
  head.muted = true;
  const headPlayback = window.createCaioHeadLoop(head);

  function enableOpeningAudio(event) {
    if (hasEntered || event.target.closest?.('#skip-opening')) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    intro.muted = false;
    intro.play().then(() => {
      start.hidden = true;
      removeAudioListeners();
    }).catch(() => { start.hidden = false; });
  }

  function removeAudioListeners() {
    document.removeEventListener('click', enableOpeningAudio);
    document.removeEventListener('keydown', enableOpeningAudio);
  }


  function enterSite() {
    if (hasEntered) return;
    hasEntered = true;
    removeAudioListeners();
    intro.pause();
    opening.hidden = true;
    site.hidden = false;
    document.getElementById('skip-opening').textContent = 'Ir para a equipe';
    headPlayback.play().catch(() => {
      // The poster preserves the composition if playback is unavailable.
      head.controls = true;
    });

    if (reducedMotion.matches) return;

    const destination = head.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const fit = Math.min(viewportWidth / 1280, viewportHeight / 720);
    const origin = {
      left: (viewportWidth - 1280 * fit) / 2 + (1280 / 3) * fit,
      top: (viewportHeight - 720 * fit) / 2 + 48 * fit,
      width: (1280 / 3) * fit,
      height: 600 * fit,
    };

    headEntrance = head.animate([
      { transform: `translate(${origin.left - destination.left}px, ${origin.top - destination.top}px) scale(${origin.width / destination.width}, ${origin.height / destination.height})` },
      { transform: 'translate(0, 0) scale(1, 1)' },
    ], { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

    title.animate([{ opacity: 0 }, { opacity: 1 }], {
      delay: 300, duration: 600, fill: 'both', easing: 'ease-out',
    });
  }


  start.addEventListener('click', () => {
    intro.muted = false;
    intro.play().then(() => { start.hidden = true; }).catch(() => {
      intro.controls = true;
    });
  });

  intro.addEventListener('playing', () => { start.hidden = true; });
  intro.addEventListener('ended', enterSite, { once: true });
  intro.addEventListener('error', enterSite, { once: true });
  intro.querySelector('source').addEventListener('error', enterSite, { once: true });
  window.addEventListener('resize', () => {
    if (headEntrance?.playState === 'running') headEntrance.finish();
  });

  intro.play().catch(() => {
    if (hasEntered) return;
    intro.muted = true;
    document.addEventListener('click', enableOpeningAudio);
    document.addEventListener('keydown', enableOpeningAudio);
    intro.play().catch(() => { if (!hasEntered) start.hidden = false; });
  });
})();
