/* Progressive enhancement only. Every word on this page is readable with this
   file removed. Three effects: E01 flip scene, E06 line mask, E15 magnetic.
   E11 grain is CSS-only.                                                    */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* -------------------------------------------------- scroll reveal + E06 */

  const revealables = document.querySelectorAll('[data-reveal]');

  if (revealables.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const index = Number(el.dataset.revealIndex ?? 0);
          el.style.transitionDelay = `${index * 60}ms`;
          el.classList.add('is-in');
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------- E01 flip scene */

  const flips = document.querySelectorAll('[data-flip]');

  if (flips.length) {
    const flipObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle('is-flipped', e.isIntersecting);
      },
      { threshold: 0.35 }
    );
    flips.forEach((el) => flipObserver.observe(el));
  }

  /* -------------------------------------------------- E13 cursor */

  const cursor = document.querySelector('.cursor');

  if (cursor && fine && !reduced) {
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;

    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx - 9}px, ${cy - 9}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
    });
  } else if (cursor) {
    cursor.remove();
  }

  /* -------------------------------------------------- E15 magnetic */

  if (fine && !reduced) {
    const strength = 0.25;
    const max = 12;

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform =
          `translate3d(${Math.max(-max, Math.min(max, dx))}px, ${Math.max(-max, Math.min(max, dy))}px, 0)`;
      });

      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
})();
