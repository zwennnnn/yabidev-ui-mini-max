# Signature Effects

Working code, not descriptions. Every effect here produces drama with **zero gradients** — no `linear-gradient`, `radial-gradient`, or `conic-gradient` anywhere.

## Pick exactly 3

A page uses three of these. Not one, not eight.

- **One structural** (E01–E05): changes how a whole section behaves.
- **One typographic** (E06–E10): makes the words themselves the event.
- **One tactile** (E12–E17): rewards the pointer.

E11 (grain) does not count toward the three. It is a baseline surface treatment, not an effect — apply it to every build.

Three perfected effects beat eight half-built ones every time. The most common failure of an ambitious build is scattering tricks instead of committing to a few.

## Why no gradients

A gradient is the cheapest possible way to make a flat rectangle look like it has depth, which is exactly why it is the fastest tell of a generated page. Everything a gradient was doing — depth, focus, drama, warmth — is done here by:

| Instead of a gradient | Use |
| --- | --- |
| Soft depth on a background | Flat color blocking + grain (E11) |
| A "premium" glow | Tonal inversion of a full section (E01) |
| Fading an edge | A hard `clip-path` cut (E03) |
| Shading a photo for text | Duotone treatment (E14) or a solid scrim |
| A colorful hero | One accent-filled block against flat `--bg` |
| Depth on a button | 1px `--line` border + a 2px hover lift |
| Visual interest in empty space | A hairline grid (E12) or an oversized numeral |

---

# Structural effects

## E01 — Flip scene

The signature move of this system. A full-bleed section inverts the entire page tonality as it enters. This is what replaces the gradient hero.

Use once per page, at the emotional peak. Never twice.

```html
<section class="flip" data-flip>
  <div class="flip__inner">
    <p class="flip__kicker">Since 2016</p>
    <h2 class="flip__title">Four hundred rooms.<br>One key.</h2>
    <a class="flip__cta" href="#book">Check availability</a>
  </div>
</section>
```

```css
.flip {
  /* Starts as the page, becomes the inversion. */
  background-color: var(--bg);
  color: var(--ink);
  padding: clamp(6rem, 14vh, 10rem) 0;
  transition:
    background-color var(--dur-5) var(--ease-both),
    color var(--dur-5) var(--ease-both);
}

.flip.is-flipped {
  background-color: var(--flip-bg);
  color: var(--flip-ink);
}

/* Inside a flipped scene the plain accent loses contrast — swap it. */
.flip.is-flipped .flip__kicker { color: var(--accent-alt); }

.flip__cta {
  border: 1px solid currentColor;
  color: inherit;
  padding: 0.9rem 1.75rem;
  text-decoration: none;
  display: inline-block;
  transition:
    background-color var(--dur-2) var(--ease-snap),
    color var(--dur-2) var(--ease-snap);
}

.flip.is-flipped .flip__cta:hover {
  background-color: var(--accent-alt);
  color: var(--accent-alt-ink);
}
```

```js
const flipObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) e.target.classList.toggle('is-flipped', e.isIntersecting);
  },
  { threshold: 0.35 }
);
document.querySelectorAll('[data-flip]').forEach((el) => flipObserver.observe(el));
```

Reduced motion: the section still inverts, the transition is just instant. The `@media (prefers-reduced-motion)` block in `core/MOTION.md` handles this automatically — do not disable the class toggle, or the section loses its design.

Mobile: unchanged. This effect costs nothing and works at every size.

## E02 — Horizontal scroll track

A section that scrolls sideways while the page scrolls down. Good for a sequence: process steps, a collection, a timeline.

```html
<section class="track" data-track>
  <div class="track__sticky">
    <div class="track__rail" data-rail>
      <article class="track__panel">01 — Survey</article>
      <article class="track__panel">02 — Drawings</article>
      <article class="track__panel">03 — Permits</article>
      <article class="track__panel">04 — Build</article>
    </div>
  </div>
</section>
```

```css
.track { height: 400vh; }                 /* scroll distance = panels x 100vh */
.track__sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.track__rail {
  display: flex;
  height: 100%;
  will-change: transform;
}
.track__panel {
  flex: 0 0 100vw;
  display: grid;
  place-content: center;
  border-right: 1px solid var(--line);
}

/* Mobile: no pinning. Native horizontal swipe instead. */
@media (max-width: 768px) {
  .track { height: auto; }
  .track__sticky { position: static; height: auto; overflow: visible; }
  .track__rail {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .track__panel { flex: 0 0 85vw; scroll-snap-align: center; height: 70vh; }
}
```

```js
const track = document.querySelector('[data-track]');
const rail = document.querySelector('[data-rail]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 768px)').matches;

if (track && rail && !reduced && !mobile) {
  let ticking = false;

  const update = () => {
    const rect = track.getBoundingClientRect();
    const distance = track.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
    const travel = rail.scrollWidth - window.innerWidth;
    rail.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}
```

This is the one pinned section allowed per page. Do not combine it with another sticky effect.

## E03 — Clip-path wipe

An element is uncovered by a moving edge instead of fading in. Harder, more deliberate, and completely gradient-free.

```css
[data-wipe] {
  clip-path: inset(0 100% 0 0);          /* fully hidden from the right */
  transition: clip-path var(--dur-4) var(--ease-out);
}
[data-wipe].is-in { clip-path: inset(0 0 0 0); }

[data-wipe='up']    { clip-path: inset(100% 0 0 0); }
[data-wipe='up'].is-in { clip-path: inset(0 0 0 0); }
```

Reuse the `IntersectionObserver` from `core/MOTION.md` — add `[data-wipe]` to the same query, do not write a second observer.

Under reduced motion, add:

```css
@media (prefers-reduced-motion: reduce) {
  [data-wipe] { clip-path: none !important; }
}
```

## E04 — Sticky media, swapping captions

The image holds still while the text beside it advances. Reads as editorial rather than as a slideshow.

```html
<section class="swap">
  <div class="swap__media">
    <img data-swap-img src="/img/a.jpg" alt="" width="1200" height="1500">
  </div>
  <div class="swap__text">
    <div class="swap__step" data-step data-src="/img/a.jpg"><h3>Foundation</h3><p>…</p></div>
    <div class="swap__step" data-step data-src="/img/b.jpg"><h3>Frame</h3><p>…</p></div>
    <div class="swap__step" data-step data-src="/img/c.jpg"><h3>Finish</h3><p>…</p></div>
  </div>
</section>
```

```css
.swap { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
.swap__media { position: sticky; top: 12vh; height: 76vh; }
.swap__media img { width: 100%; height: 100%; object-fit: cover; }
.swap__step { min-height: 70vh; display: grid; align-content: center; }
.swap__step { opacity: 0.35; transition: opacity var(--dur-3) var(--ease-out); }
.swap__step.is-active { opacity: 1; }

@media (max-width: 768px) {
  .swap { grid-template-columns: 1fr; }
  .swap__media { position: static; height: 60vh; }
  .swap__step { min-height: 0; opacity: 1; margin-block: 2.5rem; }
}
```

```js
const img = document.querySelector('[data-swap-img]');
const steps = document.querySelectorAll('[data-step]');

if (img && steps.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        steps.forEach((s) => s.classList.toggle('is-active', s === e.target));
        const next = e.target.dataset.src;
        if (next && !img.src.endsWith(next)) img.src = next;
      }
    },
    { threshold: 0.6 }
  );
  steps.forEach((s) => io.observe(s));
}
```

Preload the swap images or the first change will flash. Add `<link rel="preload" as="image" href="…">` for each.

## E05 — Column-count break

Instead of a three-card grid, let one section run as newspaper columns with a rule between them. Instantly non-templated, costs three lines.

```css
.columns {
  column-count: 3;
  column-gap: 3rem;
  column-rule: 1px solid var(--line);
}
.columns > * { break-inside: avoid; }

@media (max-width: 1024px) { .columns { column-count: 2; } }
@media (max-width: 640px)  { .columns { column-count: 1; column-rule: none; } }
```

---

# Typographic effects

## E06 — Line mask reveal

Text rises out of a hidden edge, one line at a time. The single highest-value text effect: cheap, robust, and it reads as intentional typesetting rather than a fade.

```html
<h2 class="mask-lines" data-mask>
  <span class="mask-lines__line"><span>Rooms that remember</span></span>
  <span class="mask-lines__line"><span>who stayed in them</span></span>
</h2>
```

```css
.mask-lines__line {
  display: block;
  overflow: hidden;              /* the mask */
}
.mask-lines__line > span {
  display: block;
  transform: translateY(110%);
  transition: transform var(--dur-4) var(--ease-out);
}
.mask-lines.is-in .mask-lines__line:nth-child(1) > span { transition-delay: 0ms; }
.mask-lines.is-in .mask-lines__line:nth-child(2) > span { transition-delay: 80ms; }
.mask-lines.is-in .mask-lines__line:nth-child(3) > span { transition-delay: 160ms; }
.mask-lines.is-in .mask-lines__line > span { transform: none; }

@media (prefers-reduced-motion: reduce) {
  .mask-lines__line > span { transform: none !important; }
}
```

The lines are split in the HTML, by hand. Do **not** pull in a text-splitting library for this — the markup stays readable, screen readers get real text, and there is no layout shift while a script measures.

## E07 — Character stagger

For one short phrase only. Never for a paragraph.

```js
const el = document.querySelector('[data-chars]');
if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);          // keep it readable to assistive tech
  el.textContent = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.textContent = ch === ' ' ? ' ' : ch;
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-block';
    span.style.animation = `rise var(--dur-3) var(--ease-out) ${i * 28}ms both`;
    el.appendChild(span);
  });
}
```

The `aria-label` matters: splitting text into per-character spans destroys it for screen readers unless the original string is restored as a label.

Cap the phrase at ~24 characters. At 28ms each, longer strings take over 700ms to finish and the reader is left waiting.

## E08 — Marquee

An infinite horizontal band. Works as a section divider, a client list, or a statement repeated until it becomes a texture.

```html
<div class="marquee" aria-hidden="true">
  <div class="marquee__row">
    <span>Structural engineering</span><span>·</span>
    <span>Site surveys</span><span>·</span>
    <span>Permitting</span><span>·</span>
    <!-- duplicate the whole set once so the loop is seamless -->
    <span>Structural engineering</span><span>·</span>
    <span>Site surveys</span><span>·</span>
    <span>Permitting</span><span>·</span>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--line);
  padding-block: 1rem;
}
.marquee__row {
  display: flex;
  gap: 2rem;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee:hover .marquee__row { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }  /* -50% because content is duplicated once */
}

@media (prefers-reduced-motion: reduce) {
  .marquee__row { animation: none; }
  .marquee { overflow-x: auto; }
}
```

`aria-hidden="true"` because a repeated decorative band is noise in a screen reader. If the content is meaningful, it belongs in a real list elsewhere on the page too.

## E09 — Odometer counter

Numbers that roll up when they enter view. Use for real figures only — a fake statistic is worse than no statistic.

```js
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1100;
  const start = performance.now();
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);

  const frame = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * easeOut(t)).toLocaleString();
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const counters = document.querySelectorAll('[data-count]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduced) {
  counters.forEach((el) => (el.textContent = Number(el.dataset.count).toLocaleString()));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        animateCount(e.target);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => io.observe(el));
}
```

```css
/* Digits must not reflow while counting. */
[data-count] { font-variant-numeric: tabular-nums; }
```

Put the final value in the HTML as the element's text so it is correct before JavaScript runs and if JavaScript never runs.

## E10 — Oversized numeral / index

Not an animation — a composition device. Large index numbers set in the accent, bleeding past their container, replace the decorative icons that make a page look generated.

```css
.item { position: relative; padding-left: 5rem; }
.item__index {
  position: absolute;
  left: -0.5rem;
  top: -0.6em;
  font-size: clamp(4rem, 9vw, 8rem);
  line-height: 1;
  color: var(--accent);
  opacity: 0.9;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}
```

---

# Tactile effects

## E11 — Grain

The single most effective anti-generic surface treatment. Flat color plus grain reads as printed matter; flat color alone reads as a default page. Pure SVG noise, no image request, no gradient.

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Opacity between `0.03` and `0.06`. Above that it looks dirty; below it does nothing. On a light palette use `0.04`, on a dark palette `0.03`.

Do not animate the grain. A shifting noise layer costs a full-screen repaint every frame.

## E12 — Hairline grid

Structural lines that make a layout look drafted instead of stacked. SVG pattern, so no gradient is involved.

```css
.grid-field {
  position: relative;
}
.grid-field::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 0H80M0 0V80' stroke='%23888' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 80px 80px;
}
```

Better still, use real borders on real elements — a `1px solid var(--line)` between grid cells gives the same drafted feel and survives every browser.

## E13 — Custom cursor

A small accent disc that inverts whatever is under it. `mix-blend-mode: difference` does the work; there is no gradient and no per-element logic.

```css
.cursor {
  position: fixed;
  top: 0; left: 0;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
  transform: translate3d(-50%, -50%, 0);
  transition: width var(--dur-2) var(--ease-snap), height var(--dur-2) var(--ease-snap);
}
.cursor.is-hovering { width: 56px; height: 56px; }

@media (hover: none), (prefers-reduced-motion: reduce) {
  .cursor { display: none; }
}
```

```js
const cursor = document.querySelector('.cursor');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursor && fine) {
  let x = 0, y = 0, cx = 0, cy = 0;

  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });

  const loop = () => {
    cx += (x - cx) * 0.18;                 // trailing feel; 1.0 would be rigid
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate3d(${cx - 9}px, ${cy - 9}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
  });
}
```

Never hide the real cursor with `cursor: none` unless the custom one is confirmed to be rendering. A page with no visible pointer is broken, not stylish.

## E14 — Duotone imagery

Forces every photo into the palette, so stock photography stops looking like stock photography. This is what a gradient overlay was pretending to do, done properly.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="duotone" color-interpolation-filters="sRGB">
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                         0.33 0.33 0.33 0 0
                                         0.33 0.33 0.33 0 0
                                         0    0    0    1 0"/>
    <feComponentTransfer>
      <!-- tableValues: "<shadow channel> <highlight channel>" as 0–1 floats.
           Replace with the actual --bg and --accent channel values. -->
      <feFuncR type="table" tableValues="0.04 0.78"/>
      <feFuncG type="table" tableValues="0.05 0.95"/>
      <feFuncB type="table" tableValues="0.06 0.31"/>
    </feComponentTransfer>
  </filter>
</svg>
```

```css
.duotone { filter: url(#duotone); }
.duotone:hover { filter: none; transition: filter var(--dur-3) var(--ease-out); }
```

To fill in `tableValues`: take the palette's `--bg` hex as the shadow color and `--accent` as the highlight, convert each channel to 0–1 (`0xC6 / 255 = 0.78`), and enter shadow first, highlight second.

Revealing the true photo on hover gives the image a reason to be interactive.

## E15 — Magnetic button

The button leans toward the pointer. Small, precise, and it makes a page feel responsive to touch in a way animations alone do not.

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduced && fine) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 0.25;          // 0.25 is a lean. 1.0 is a toy.
    const max = 12;                 // px, hard cap

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      const cx = Math.max(-max, Math.min(max, dx));
      const cy = Math.max(-max, Math.min(max, dy));
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}
```

```css
[data-magnetic] { transition: transform var(--dur-2) var(--ease-out); }
[data-magnetic]:active { transition-duration: 60ms; }
```

The 12px cap matters. Uncapped magnetic buttons slide off their own hit area and become impossible to click.

## E16 — Border draw-on

An outline that draws itself when the section enters. Replaces the decorative shapes that pad out generated pages.

```html
<svg class="frame" viewBox="0 0 400 240" fill="none" aria-hidden="true">
  <rect class="frame__path" x="1" y="1" width="398" height="238" stroke="currentColor" stroke-width="1"/>
</svg>
```

```css
.frame__path {
  stroke-dasharray: 1272;     /* 2 * (398 + 238) */
  stroke-dashoffset: 1272;
  transition: stroke-dashoffset var(--dur-5) var(--ease-out);
}
.frame.is-in .frame__path { stroke-dashoffset: 0; }

@media (prefers-reduced-motion: reduce) {
  .frame__path { stroke-dashoffset: 0; }
}
```

`stroke-dasharray` must equal the path's perimeter or the line will stop short. For a rectangle it is `2 * (width + height)`; for any other shape, read it with `path.getTotalLength()`.

## E17 — Circular hover reveal

A second image or state is uncovered in a circle that follows the pointer. Pure `clip-path`, no gradient mask.

```css
.reveal { position: relative; isolation: isolate; }
.reveal__over {
  position: absolute;
  inset: 0;
  clip-path: circle(0px at 50% 50%);
  transition: clip-path var(--dur-3) var(--ease-out);
}
.reveal:hover .reveal__over { clip-path: circle(140px at var(--mx, 50%) var(--my, 50%)); }

@media (hover: none) {
  .reveal__over { clip-path: none; position: static; }  /* both states stack on touch */
}
```

```js
document.querySelectorAll('.reveal').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
```

Whatever is inside `.reveal__over` must not be essential information — it is hover-only, and hover does not exist on touch or for keyboard users.

---

## Performance floor

After adding effects, the build must still hold:

- No scroll handler doing layout work outside `requestAnimationFrame`.
- No animation of `width`, `height`, `top`, `left`, or `margin`.
- `will-change` on at most 2 elements at a time, and removed when the animation ends. Leaving it on permanently costs memory on every frame.
- Images have explicit `width` and `height` attributes so nothing shifts as they load.
- Total motion JavaScript under ~8KB on a static build.
- The page is readable and complete with JavaScript disabled.

## Verification

Before calling an effect done:

1. Load the page with JS blocked — the content is all there.
2. Toggle OS-level reduced motion — nothing is hidden, nothing loops.
3. Tab through the page — focus is visible at every stop, and never trapped.
4. Open at 390px wide — the effect either adapts or switches off cleanly.
5. Scroll to the bottom and back up — nothing re-triggers, nothing accumulates.
6. Check the console — no errors, no warnings.
