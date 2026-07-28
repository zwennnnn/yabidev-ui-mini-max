# Motion

Exact values. Do not invent easings or durations — every number here is fixed, and a build that uses different ones is wrong.

## The motion tokens

Paste this next to the palette tokens. It is the whole timing system.

```css
:root {
  /* Easing. Four curves, each with one job. */
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);   /* entrances, reveals, anything arriving */
  --ease-snap:  cubic-bezier(0.16, 1, 0.30, 1);   /* short, decisive UI state changes */
  --ease-both:  cubic-bezier(0.65, 0, 0.35, 1);   /* A-to-B swaps that must feel symmetrical */
  --ease-exit:  cubic-bezier(0.55, 0, 1, 0.45);   /* things leaving the screen */

  /* Duration. Five steps. Nothing in between. */
  --dur-1: 120ms;   /* hover, focus ring, tap feedback */
  --dur-2: 240ms;   /* control state: open, close, toggle, tab change */
  --dur-3: 420ms;   /* a single element revealing */
  --dur-4: 700ms;   /* a whole section revealing */
  --dur-5: 1100ms;  /* full-bleed scene change, the once-or-twice-a-page moment */

  /* Rhythm */
  --stagger: 60ms;        /* delay between siblings in a sequence */
  --stagger-tight: 28ms;  /* per-character or per-word text animation */

  /* Distance. Reveals move a short, consistent distance. */
  --lift: 24px;      /* desktop reveal travel */
  --lift-sm: 14px;   /* mobile reveal travel */
}
```

### Why these values

- `--ease-out` starts fast and settles slowly. That asymmetry is what separates expensive-feeling motion from the default `ease` curve, which is the single most recognizable sign of an unstyled page.
- Under 120ms reads as an instant jump with no feedback. Over 240ms on a hover reads as lag. Interactive feedback lives in `--dur-1` and `--dur-2` and nowhere else.
- `--dur-5` is deliberately long. It is reserved for one or two moments per page. If more than two things on a page take a full second, the page feels slow rather than cinematic.

## What may be animated

Only these four properties:

```
transform
opacity
clip-path
filter
```

Everything else causes layout or paint work on every frame. These are banned in animations and transitions:

```
width, height, top, left, right, bottom, margin, padding,
font-size, border-width, box-shadow (on scroll-driven animation)
```

If a layout change is genuinely needed, animate a `transform: scale()` on a wrapper, or animate `clip-path` to reveal the final size.

`box-shadow` may be transitioned on hover (`--dur-1`) because it fires once. It must never be tied to scroll.

## Scroll reveal

One implementation for the entire page. Do not write a second one.

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(var(--lift));
  transition:
    opacity var(--dur-4) var(--ease-out),
    transform var(--dur-4) var(--ease-out);
}

[data-reveal].is-in {
  opacity: 1;
  transform: none;
}

@media (max-width: 768px) {
  [data-reveal] { transform: translateY(var(--lift-sm)); }
}
```

```js
const revealables = document.querySelectorAll('[data-reveal]');

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      // Siblings inside one group cascade; standalone elements do not wait.
      const index = Number(el.dataset.revealIndex ?? 0);
      el.style.transitionDelay = `${index * 60}ms`;
      el.classList.add('is-in');
      io.unobserve(el); // reveal once, never re-run on scroll back
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
);

revealables.forEach((el) => io.observe(el));
```

Rules:

- Reveal once. Elements that fade back out when scrolling up feel broken, not designed.
- `rootMargin: '0px 0px -10% 0px'` fires the reveal slightly before the element is centered, so it is finished by the time it is being read.
- Never stagger more than 6 items in one group. Beyond that the last item arrives late enough to feel stuck.
- Never put `data-reveal` on the first-viewport heading. Above-the-fold content must be painted at load; animating it in delays the one thing the visitor came for. Use the load-in below instead.

## First viewport load-in

The opening screen animates on load, not on scroll, and it resolves in under 1.2s total.

```css
@keyframes rise {
  from { opacity: 0; transform: translateY(var(--lift)); }
  to   { opacity: 1; transform: none; }
}

.hero-line {
  animation: rise var(--dur-4) var(--ease-out) both;
}
.hero-line:nth-child(1) { animation-delay: 0ms; }
.hero-line:nth-child(2) { animation-delay: 60ms; }
.hero-line:nth-child(3) { animation-delay: 120ms; }
```

Never delay the first line. The visitor should read something the instant the page paints.

## Interactive states

Every interactive element needs all four. A build missing focus-visible is incomplete.

```css
.btn {
  transition:
    background-color var(--dur-1) var(--ease-snap),
    color var(--dur-1) var(--ease-snap),
    transform var(--dur-1) var(--ease-snap);
}

.btn:hover  { transform: translateY(-2px); }
.btn:active { transform: translateY(0); transition-duration: 60ms; }

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

- Hover lift is 2px. Not 4, not 8. Larger lifts read as a toy.
- `:active` is faster than `:hover` — pressing should feel immediate.
- Focus rings use `--accent` and are never removed. `outline: none` without a replacement is a defect.
- On touch devices hover states must not be the only way to reach information. Wrap decorative hover effects in `@media (hover: hover)`.

## Reduced motion

Required. Every build ships this block.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

And in JavaScript, before starting any scroll-driven or looping animation:

```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) return; // skip the effect entirely, leave the static layout
```

Reduced motion means the content still works — it does not mean content disappears. Anything that is only visible after an animation must be visible immediately under reduced motion.

## Page-level rhythm

A page is not evenly animated. Motion density has a shape:

| Zone | Motion level | What happens |
| --- | --- | --- |
| First viewport | Medium | Load-in only. Fast, resolves immediately. |
| Second section | Low | Almost still. Lets the visitor read. |
| Middle | High | One signature effect from `core/EFFECTS.md`. |
| Flip scene | Peak | The `--dur-5` moment. Full-bleed tonal inversion. |
| After the flip | Silent | No animation at all for one full section. |
| Closing | Medium | A single decisive reveal on the final action. |

The silent section after the peak is not laziness. Without a flat stretch, the peak has nothing to be louder than. A page that animates continuously reads as noisy, and noise is the most common reason an ambitious build still looks amateur.

## Hard limits

- Maximum **3** distinct signature effects per page. Pick from `core/EFFECTS.md` and perfect them.
- Maximum **1** scroll-pinned section per page.
- **No** scroll hijacking. Never override the native scroll speed or take over the wheel event. Smooth-scroll libraries (Lenis, Locomotive) are only allowed if the user explicitly asks.
- **No** autoplaying video or audio with sound.
- **No** animation that delays reading. If text is unreadable at any point in an animation, the animation is wrong.
- **No** infinite loop animation above the fold except a marquee, which must pause on hover and under reduced motion.
- Total JS for motion should stay under ~8KB on a static build. If it grows past that, the page is doing too much.

## Cleanup

Every observer, listener, and animation frame must be torn down.

```js
// Vanilla
const controller = new AbortController();
window.addEventListener('scroll', onScroll, { signal: controller.signal, passive: true });
// later: controller.abort();

// React
useEffect(() => {
  const io = new IntersectionObserver(handler, options);
  elements.forEach((el) => io.observe(el));
  return () => io.disconnect();
}, []);

// GSAP, only if already in the project
useLayoutEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, rootRef);
  return () => ctx.revert();
}, []);
```

Scroll listeners are always `{ passive: true }` unless the handler calls `preventDefault()`, and any per-frame work is throttled through `requestAnimationFrame`, never run directly in the scroll handler.
