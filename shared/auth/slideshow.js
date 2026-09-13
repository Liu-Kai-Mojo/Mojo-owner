const IMAGES = Array.from({ length: 12 }, (_, index) => `${index + 1}.png`);
const root = document.querySelector('[data-auth-slideshow]');

if (root) {
  const base = root.dataset.posterBase || '/shared/auth/';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Image 1 is already present as an inline background, so the first visual
  // appears before this module finishes loading. The remaining frames are
  // warmed in the background without blocking first paint.
  root.style.backgroundImage = `url("${base}${IMAGES[0]}")`;
  root.style.backgroundPosition = 'center center';
  root.style.backgroundSize = 'cover';

  const slides = IMAGES.map((name, index) => {
    const slide = document.createElement('div');
    slide.className = `auth-slide${index === 0 ? ' is-active' : ''}`;
    slide.setAttribute('aria-hidden', 'true');
    slide.style.backgroundImage = `url("${base}${name}")`;
    root.appendChild(slide);
    return slide;
  });

  const preload = (name, priority = 'low') => {
    const image = new Image();
    if ('fetchPriority' in image) image.fetchPriority = priority;
    image.decoding = 'async';
    image.src = `${base}${name}`;
  };

  preload(IMAGES[0], 'high');
  preload(IMAGES[1], 'high');
  const warmRest = () => IMAGES.slice(2).forEach(name => preload(name, 'low'));
  if ('requestIdleCallback' in window) requestIdleCallback(warmRest, { timeout: 1200 });
  else setTimeout(warmRest, 250);

  if (!reduceMotion && slides.length > 1) {
    let active = 0;
    window.setInterval(() => {
      const next = (active + 1) % slides.length;
      slides[next].classList.add('is-active');
      slides[active].classList.remove('is-active');
      active = next;
    }, 4200);
  }
}
