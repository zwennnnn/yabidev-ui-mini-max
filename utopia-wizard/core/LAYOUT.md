# Layout

The default page shape — centered hero, three feature cards, testimonial strip, closing CTA — is the reason generated pages are recognizable on sight. This file replaces it with named archetypes and a fixed spatial system.

## The spatial tokens

```css
:root {
  /* Spacing. Ten steps, nothing between them. */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 10rem;

  /* Layout */
  --container: 1440px;
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --measure: 68ch;                          /* max width of a body paragraph */
  --section-y: clamp(4rem, 10vh, 9rem);     /* vertical rhythm between scenes */

  /* Radius. This system is squared off by default. */
  --radius: 0px;
  --radius-pill: 999px;                     /* tags and small chips only */

  /* Layers */
  --z-base: 0;
  --z-sticky: 10;
  --z-nav: 100;
  --z-cursor: 9998;
  --z-grain: 9999;
}
```

Rules:

- Every margin, padding, and gap comes from the ten spacing steps. A `padding: 37px` anywhere is a defect.
- Section padding is `--section-y` vertically and `--gutter` horizontally. Consistent, everywhere.
- `--radius: 0px` is the default because sharp corners read as art-directed and rounded corners read as a component library. Change it to `4px` or `8px` only if the industry genuinely calls for softness (healthcare, education, beauty) — and then it applies to everything, no mixing.

```css
.container {
  width: min(100% - (var(--gutter) * 2), var(--container));
  margin-inline: auto;
}

.section { padding-block: var(--section-y); }

/* Full-bleed escape from a constrained parent */
.bleed {
  width: 100vw;
  margin-inline: calc(50% - 50vw);
}
```

## The 12-column grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(6, 1fr); }
}
@media (max-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
```

**Asymmetry is the whole point.** A 12-column grid used as `4 + 4 + 4` produces the same page as no grid at all. Use uneven spans:

| Good | Bad |
| --- | --- |
| `7 / 5` | `6 / 6` |
| `8 / 4` | `4 / 4 / 4` |
| `5 / 7` with the media on the right | three identical cards |
| `3 / 9` for a label-and-content pair | centered everything |
| span 9 with `margin-left: span 3` (indented block) | full-width blocks stacked |

At least half the sections on a page should be off-center. A page where every section is symmetrical will look generated no matter how good the colors are.

---

# Opening archetypes

The first viewport. Pick one. Never the centered headline-and-two-buttons.

## O1 — Type statement

The headline is the entire opening. No image, no illustration, no product shot.

```html
<header class="open-type">
  <p class="open-type__meta">Structural engineering · Est. 2004 · Lisbon</p>
  <h1 class="open-type__title">
    <span class="mask-lines__line"><span>We calculate</span></span>
    <span class="mask-lines__line"><span>what holds</span></span>
  </h1>
  <a class="open-type__action" href="#work">See the work →</a>
</header>
```

```css
.open-type {
  min-height: 88svh;
  display: grid;
  align-content: space-between;
  padding-block: var(--space-8) var(--space-7);
}
.open-type__title {
  font-size: clamp(3rem, 11vw, 11rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  max-width: 14ch;
}
.open-type__meta { color: var(--ink-2); }
```

Works for: agencies, legal, architecture, consulting, manufacturing, music. Anywhere the promise is the product.

## O2 — Asymmetric split

Media on one side, but never 50/50.

```css
.open-split {
  display: grid;
  grid-template-columns: 5fr 7fr;    /* or 7fr 5fr — never 1fr 1fr */
  gap: var(--gutter);
  min-height: 88svh;
  align-items: end;                  /* bottom-aligned reads more deliberate than centered */
}
.open-split__media { aspect-ratio: 3 / 4; overflow: hidden; }
.open-split__media img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 800px) {
  .open-split { grid-template-columns: 1fr; align-items: start; }
  .open-split__media { aspect-ratio: 4 / 3; order: -1; }
}
```

Works for: hospitality, real estate, fashion, beauty, food, travel.

## O3 — Corner anchored

Content pinned to opposite corners of a full-bleed image or flat color field. The empty middle is the design.

```css
.open-corner {
  position: relative;
  min-height: 92svh;
  display: grid;
  grid-template-areas:
    'tl . tr'
    '.  . . '
    'bl . br';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr auto;
  padding: var(--space-7) var(--gutter);
}
.open-corner__title  { grid-area: bl; max-width: 18ch; }
.open-corner__meta   { grid-area: tr; text-align: right; }
.open-corner__action { grid-area: br; }

@media (max-width: 800px) {
  .open-corner {
    grid-template-areas: 'tr' 'title' 'action';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-6);
  }
  .open-corner__title { grid-area: title; align-self: end; }
  .open-corner__meta  { grid-area: tr; text-align: left; }
  .open-corner__action{ grid-area: action; }
}
```

Works for: photography, hotels, automotive, events, fashion.

## O4 — Index opening

The first screen is a table of contents. Confident, editorial, and it tells the visitor exactly what the page contains.

```html
<header class="open-index">
  <h1>Meridian Clinic</h1>
  <ol class="open-index__list">
    <li><a href="#care"><span>01</span> What we treat</a></li>
    <li><a href="#team"><span>02</span> Who treats you</a></li>
    <li><a href="#visit"><span>03</span> Your first visit</a></li>
    <li><a href="#book"><span>04</span> Book</a></li>
  </ol>
</header>
```

```css
.open-index__list { list-style: none; padding: 0; border-top: 1px solid var(--line); }
.open-index__list li { border-bottom: 1px solid var(--line); }
.open-index__list a {
  display: grid;
  grid-template-columns: 4rem 1fr;
  align-items: baseline;
  padding-block: var(--space-5);
  font-size: clamp(1.5rem, 4vw, 3rem);
  text-decoration: none;
  color: inherit;
  transition: padding-left var(--dur-2) var(--ease-snap), color var(--dur-2) var(--ease-snap);
}
.open-index__list a:hover { padding-left: var(--space-4); color: var(--accent); }
.open-index__list span { color: var(--ink-2); font-size: 0.9rem; }
```

Works for: clinics, universities, law firms, publishers, nonprofits, portfolios.

## O5 — Specimen

A single object — the product, the dish, the car, the building — shown large and alone against flat color, with minimal text at the edge.

```css
.open-spec {
  min-height: 92svh;
  display: grid;
  place-items: center;
  background-color: var(--surface);
  position: relative;
}
.open-spec img { max-height: 70svh; width: auto; }
.open-spec__label {
  position: absolute;
  bottom: var(--space-7);
  left: var(--gutter);
  max-width: 24ch;
}
```

Works for: e-commerce, automotive, food, industrial, beauty.

---

# Section archetypes

Assemble the body of the page from these. A page needs 5–8 sections total — fewer feels thin, more loses the thread.

## S1 — Ledger rows

Replaces the three-card feature grid. Full-width rows separated by hairlines, with a wide label column.

```css
.ledger { border-top: 1px solid var(--line); }
.ledger__row {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: var(--gutter);
  padding-block: var(--space-7);
  border-bottom: 1px solid var(--line);
}
.ledger__label { color: var(--ink-2); }
.ledger__body p { max-width: var(--measure); }

@media (max-width: 800px) {
  .ledger__row { grid-template-columns: 1fr; gap: var(--space-3); }
}
```

This single pattern removes more template-smell than any other change. Cards signal "component library"; ruled rows signal "someone set this."

## S2 — Editorial columns

See E05. Newspaper columns with a rule between them, for a dense block of text that would otherwise be a wall.

## S3 — Specimen grid

A collection without cards. No borders around items, no shadows, no rounded corners — just aligned media with captions underneath.

```css
.specimens {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter) var(--gutter);
}
/* Deliberately uneven: some items take 5 columns, some 7, some 4. */
.specimens > *:nth-child(3n+1) { grid-column: span 7; }
.specimens > *:nth-child(3n+2) { grid-column: span 5; }
.specimens > *:nth-child(3n+3) { grid-column: span 12; }

.specimen figcaption {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  padding-top: var(--space-3);
  margin-top: var(--space-3);
  color: var(--ink-2);
}

@media (max-width: 800px) {
  /* Match the nth-child specificity rather than reaching for !important. */
  .specimens > *:nth-child(3n+1),
  .specimens > *:nth-child(3n+2),
  .specimens > *:nth-child(3n+3) { grid-column: span 12; }
}
```

## S4 — Full-bleed statement

One sentence, enormous, alone. Usually the flip scene (E01).

```css
.statement {
  padding-block: var(--space-10);
  text-align: left;                 /* not centered — centered giant text is a template tell */
}
.statement p {
  font-size: clamp(2rem, 6vw, 5rem);
  line-height: 1.05;
  max-width: 20ch;
  letter-spacing: -0.02em;
}
```

## S5 — Data table

A real `<table>`, styled. Pricing, specifications, comparisons, schedules. Honest, scannable, and almost never seen on a generated page.

```css
.table { width: 100%; border-collapse: collapse; }
.table th, .table td {
  text-align: left;
  padding: var(--space-4) var(--space-3);
  border-bottom: 1px solid var(--line);
  font-variant-numeric: tabular-nums;
}
.table th { color: var(--ink-2); font-weight: 500; font-size: 0.875rem; }
.table tbody tr { transition: background-color var(--dur-1) var(--ease-snap); }
.table tbody tr:hover { background-color: var(--surface); }

@media (max-width: 700px) {
  .table-wrap { overflow-x: auto; }              /* never squash a table */
  .table { min-width: 34rem; }
}
```

## S6 — Marquee band

See E08. A texture band between two heavy sections, giving the eye a rest without leaving empty space.

## S7 — Sticky media essay

See E04. For anything with a sequence: a process, a story, a build.

## S8 — Closing action

Not a boxed CTA. A full-bleed block in `--accent` with `--accent-ink` text, or the last row of a ledger.

```css
.closing {
  background-color: var(--accent);
  color: var(--accent-ink);
  padding-block: var(--space-10);
}
.closing a {
  color: inherit;
  border-bottom: 2px solid currentColor;
  text-decoration: none;
  font-size: clamp(1.5rem, 5vw, 4rem);
}
```

Note this is the accent-filled block, not the flip scene. They should not sit next to each other.

---

# Assembling the page

A working order:

| Position | Archetype | Motion | Purpose |
| --- | --- | --- | --- |
| 1 | One opening (O1–O5) | Load-in | State what this is in under 5 seconds |
| 2 | S1 ledger rows | Reveal only | Answer the first real question |
| 3 | S3 specimen grid or S7 essay | Signature effect | Show the evidence |
| 4 | S6 marquee | Loop | Breathe |
| 5 | S4 statement as flip scene (E01) | `--dur-5` peak | The moment |
| 6 | S5 table or S2 columns | **None** | The deliberate silence after the peak |
| 7 | S8 closing | Single reveal | Ask |

Section 6 having no animation at all is a requirement, not an oversight. See the rhythm table in `core/MOTION.md`.

## Responsive rules

Three breakpoints, no more:

```css
@media (max-width: 1024px) { }   /* tablet: reduce columns, keep the composition */
@media (max-width: 800px)  { }   /* small tablet: single column, effects simplify */
@media (max-width: 480px)  { }   /* phone: tighten spacing only */
```

- Mobile is not the desktop layout stacked. Asymmetric splits become single column, pinned sections become native scroll, hover effects switch off entirely.
- Minimum touch target: 44 × 44px.
- Body text never below 16px on mobile — iOS zooms the page on focus for anything smaller in a form field.
- Test at exactly 390px and 1440px. Those two catch nearly everything.
- `overflow-x: hidden` on `body` is a patch, not a fix. If the page scrolls sideways, find the element that is too wide.

## Checks

- No section is a centered column of text with a button under it, more than once.
- At least three sections are asymmetric.
- No nested cards — a bordered box inside another bordered box, ever.
- No decorative blob, floating circle, or abstract shape used as filler.
- No icon set standing in for visual identity.
- Every number in the CSS comes from the token scales.
