# Typography

Type carries more of the "expensive" feeling than color does. A page set in one weight of the browser default will look generated regardless of how good the palette is.

## The type tokens

```css
:root {
  --font-display: 'Archivo', system-ui, sans-serif;   /* replaced per industry, see below */
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  /* Fixed sizes */
  --text-xs:   0.75rem;    /* 12px — legal, captions. Never smaller. */
  --text-sm:   0.875rem;   /* 14px — labels, metadata */
  --text-base: 1rem;       /* 16px — body minimum */
  --text-lg:   1.125rem;   /* 18px — lead paragraphs */

  /* Fluid display sizes. clamp() is required: a bare vw unit has no floor or
     ceiling and produces unreadable text at extreme viewports. */
  --display-1: clamp(2.75rem, 8vw,   7rem);
  --display-2: clamp(2rem,    5.5vw, 4.5rem);
  --display-3: clamp(1.5rem,  3.5vw, 2.75rem);
  --display-4: clamp(1.25rem, 2vw,   1.75rem);

  /* Line height */
  --lh-display: 0.95;
  --lh-heading: 1.15;
  --lh-body:    1.6;
  --lh-tight:   1.35;

  /* Letter spacing */
  --ls-display: -0.03em;
  --ls-heading: -0.015em;
  --ls-body:     0;
  --ls-caps:     0.08em;
}
```

Applied:

```css
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
  color: var(--ink);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: var(--lh-heading);
  letter-spacing: var(--ls-heading);
  text-wrap: balance;                 /* stops one-word orphan lines in headings */
}

h1 { font-size: var(--display-1); line-height: var(--lh-display); letter-spacing: var(--ls-display); }
h2 { font-size: var(--display-2); line-height: var(--lh-display); letter-spacing: var(--ls-display); }
h3 { font-size: var(--display-3); }

p  { max-width: var(--measure); text-wrap: pretty; }

.label {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: var(--ls-caps);
  color: var(--ink-2);
}
```

## Rules

- **Two families maximum.** A display face and a body face. A mono is a third only when the industry genuinely uses code or data. Three unrelated families is the fastest way to look amateur.
- **Negative tracking on large text only.** `-0.03em` at 7rem reads as tight and modern; the same value at 16px is unreadable. Body text is always `0`.
- **Line length 60–75 characters.** `--measure: 68ch` enforces it. Full-width paragraphs are exhausting to read and are one of the clearest signs no one set the type.
- **Line height moves opposite to size.** Big text gets `0.95`; small text gets `1.6`. Uniform line-height across all sizes is a default-settings tell.
- **No text below 12px.** Ever, including legal copy.
- **No pure `vw` font sizes.** Always `clamp()`.
- **Weight contrast, not size contrast alone.** A 400 body against a 600–800 display does more work than making the heading bigger.
- **`text-wrap: balance` on headings, `pretty` on paragraphs.** Two lines of CSS that visibly improve every heading on the page.

## Industry pairings

All from Google Fonts unless marked. Display first, body second.

| Industry | Display | Body | Why |
| --- | --- | --- | --- |
| SaaS / B2B | Instrument Sans | Inter | Neutral, dense, reads as a tool not a brochure |
| Fintech | Archivo | Inter | Squared, institutional, numerals hold in tables |
| Healthcare | Newsreader | Public Sans | Serif warmth against a plain, legible body |
| E-commerce / fashion | Bodoni Moda | DM Sans | High-contrast serif is the language of retail editorial |
| Restaurant / food | Fraunces | Work Sans | Fraunces' softness at large sizes reads as appetite |
| Real estate / architecture | Archivo | IBM Plex Sans | Drafted, technical, unromantic |
| Fitness / sports | Anton | Barlow | Condensed weight for shouted numbers and verbs |
| Education | Literata | Figtree | A reading face for a reading product |
| Legal / consulting | Libre Baskerville | Source Serif 4 | Established without being decorative |
| Creative agency | Syne | Chivo | Syne is odd enough to signal a studio |
| Travel / hospitality | Cormorant Garamond | Manrope | Elegant display, quiet body |
| Beauty / cosmetics | Instrument Serif | Plus Jakarta Sans | Fine-stroke serif, generous body |
| Automotive | Oswald | Archivo | Condensed and mechanical |
| Gaming / media | Space Grotesk | Space Mono | Grotesk with a mono for stats and timers |
| Crypto / web3 | Space Grotesk | IBM Plex Mono | Mono as body reads as protocol-grade |
| Industrial | Archivo Black | Barlow | Heavy, plain, safety-sign clarity |
| Nonprofit | Young Serif | Public Sans | Human, sturdy, non-corporate |
| Music / events | Bebas Neue | Sora | Poster typography, straight from a lineup |

Two families that are not on Google Fonts but are free and worth the manual setup: **Satoshi** and **General Sans** (Fontshare). Either works as a body face for SaaS, fintech, or agency work.

## Loading

Static HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

Next.js:

```js
import { Archivo, Inter } from 'next/font/google';

const display = Archivo({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-display' });
const body    = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });

// <html className={`${display.variable} ${body.variable}`}>
```

Rules:

- Load **at most 4 weights total** across both families. Each weight is a separate download.
- `display=swap` always. Without it the page renders blank text while fonts load.
- Add `latin-ext` to `subsets` for Turkish, Polish, Czech, Hungarian, or Romanian content. Without it, characters like `ğ`, `ş`, `ı`, `ż`, `ř` fall back to a different font mid-word.
- Never load a font only used for one word.

## Numerals

Any interface showing numbers that change — counters, prices, timers, tables:

```css
[data-count], .table td, .price, time {
  font-variant-numeric: tabular-nums;
}
```

Without this, digits have different widths and the layout jitters as values update.

## Checks

- Body text is 16px or larger everywhere, including mobile.
- No paragraph exceeds 75 characters per line.
- Exactly two font families are loaded (three if a mono is genuinely used).
- Four or fewer font weights total.
- Headings use `text-wrap: balance`.
- Large display text has negative tracking; body text has none.
- Every text/background pair meets the ratios recorded in `core/PALETTES.md`.
