# Build

Self-sufficient. Everything needed to ship is either in this file or in the four values the operator fills in at the top. An agent that cannot read the `core/` files can still build correctly from this prompt alone.

## Fill these four lines

```text
Industry:
Palette (paste the CSS block from core/PALETTES.md):
Framework: react | nextjs | html   (detect it, do not ask)
Existing copy to preserve verbatim: none | <paste it>
```

Everything else is decided by the prompt.

---

## Copy-ready prompt

```text
Build a complete, working web interface. Not a mockup, not a plan, not a
description of what you would do. A page that runs.

INPUTS
Industry: [INDUSTRY]
Palette: [PASTE CSS BLOCK]
Framework: [FRAMEWORK]
Preserve verbatim: [COPY OR "none"]

=============================================================================
1. THE ABSOLUTE RULE: NO GRADIENTS
=============================================================================

Zero occurrences of: linear-gradient, radial-gradient, conic-gradient, their
repeating- variants, bg-gradient-to-* Tailwind classes, <linearGradient> or
<radialGradient> in SVG, createLinearGradient in canvas.

There is no exception. Not "subtle", not hard-stop, not gradient text.

Also banned as part of the same look:
  - box-shadow used as a colored glow, e.g. 0 0 60px rgba(120,80,255,.5)
  - filter: blur() on a colored shape to fake a glow
  - backdrop-filter blur panels, except on a fixed nav over scrolling content
  - any element named blob, glow, orb, aurora, mesh, or shine

Everything a gradient was doing, done properly instead:

  soft depth on a background   -> flat color + grain (section 5)
  a premium glow               -> full-bleed tonal inversion (the flip scene)
  fading an edge               -> a hard clip-path cut
  shading a photo for text     -> a solid scrim or a duotone SVG filter
  a colorful hero              -> one accent-filled block against flat bg
  depth on a button            -> 1px border + a 2px hover lift
  filling empty space          -> a hairline rule or an oversized numeral

=============================================================================
2. TOKENS — paste these before writing any component
=============================================================================

:root {
  /* --- COLOR: paste the 11 values from the palette input. No other color
         literal may appear anywhere else in the project. --- */

  /* --- TYPE --- */
  --font-display: [industry pairing, display face];
  --font-body:    [industry pairing, body face];

  --text-xs: 0.75rem;  --text-sm: 0.875rem;
  --text-base: 1rem;   --text-lg: 1.125rem;

  --display-1: clamp(2.75rem, 8vw,   7rem);
  --display-2: clamp(2rem,    5.5vw, 4.5rem);
  --display-3: clamp(1.5rem,  3.5vw, 2.75rem);
  --display-4: clamp(1.25rem, 2vw,   1.75rem);

  --lh-display: 0.95;  --lh-heading: 1.15;  --lh-body: 1.6;
  --ls-display: -0.03em; --ls-heading: -0.015em; --ls-caps: 0.08em;

  /* --- SPACE --- */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;
  --space-10: 10rem;

  /* --- LAYOUT --- */
  --container: 1440px;
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --measure: 68ch;
  --section-y: clamp(4rem, 10vh, 9rem);
  --radius: 0px;

  /* --- MOTION --- */
  --ease-out:  cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snap: cubic-bezier(0.16, 1, 0.30, 1);
  --ease-both: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-exit: cubic-bezier(0.55, 0, 1, 0.45);

  --dur-1: 120ms;  --dur-2: 240ms;  --dur-3: 420ms;
  --dur-4: 700ms;  --dur-5: 1100ms;

  --stagger: 60ms;  --lift: 24px;  --lift-sm: 14px;
}

Every number in the project comes from these scales. A stray "padding: 37px"
or "#3a7bd5" is a defect. Only transform, opacity, clip-path, and filter are
animated — never width, height, top, left, margin, padding, or font-size.

FONT PAIRINGS (Google Fonts, display + body):
  saas Instrument Sans + Inter          fintech Archivo + Inter
  health Newsreader + Public Sans       ecommerce Bodoni Moda + DM Sans
  food Fraunces + Work Sans             realestate Archivo + IBM Plex Sans
  fitness Anton + Barlow                education Literata + Figtree
  legal Libre Baskerville + Source Serif 4
  creative Syne + Chivo                 travel Cormorant Garamond + Manrope
  beauty Instrument Serif + Plus Jakarta Sans
  auto Oswald + Archivo                 gaming Space Grotesk + Space Mono
  crypto Space Grotesk + IBM Plex Mono  industrial Archivo Black + Barlow
  nonprofit Young Serif + Public Sans   music Bebas Neue + Sora

Load at most 4 weights total, always with display=swap. Add latin-ext to the
subset for Turkish, Polish, Czech, Hungarian, or Romanian content, or ğ ş ı ż ř
will fall back to a different font mid-word.

=============================================================================
3. COMPOSITION — pick one opening, then 5 to 8 sections
=============================================================================

OPENING (choose exactly one, never a centered headline with two buttons):
  O1 Type statement    the headline is the whole screen, no image
  O2 Asymmetric split  media + text at 5fr/7fr — never 1fr/1fr
  O3 Corner anchored   content pinned to opposite corners, empty middle
  O4 Index             the first screen is a numbered table of contents
  O5 Specimen          one object, large, alone, on flat color

SECTIONS (assemble in roughly this order):
  1  the opening                        load-in animation only
  2  S1 ledger rows                     reveal only
  3  S3 specimen grid or S7 essay       your structural effect
  4  S6 marquee band                    loop
  5  S4 statement as the flip scene     the --dur-5 peak, once per page
  6  S5 table or S2 columns             NO ANIMATION AT ALL
  7  S8 closing, accent-filled          one reveal

S1 ledger rows: full-width rows split 3fr/9fr, separated by 1px hairlines,
label on the left. This replaces the three-card feature grid and removes more
template-smell than any other single change.

S3 specimen grid: a collection with no cards — no boxes, no shadows, no rounded
corners. Uneven spans: nth-child(3n+1) span 7, (3n+2) span 5, (3n+3) span 12.

S5 table: a real <table>. Pricing, specs, schedule. Almost never seen on a
generated page, and it reads as honest.

S8 closing: a full-bleed block painted --accent with --accent-ink text. Not a
boxed CTA. This is a different device from the flip scene; they never sit
next to each other.

Section 6 having zero animation is a requirement. Without a flat stretch, the
peak in section 5 has nothing to be louder than. Continuous animation is the
most common reason an ambitious build still reads as amateur.

ASYMMETRY: use a 12-column grid, but 4+4+4 produces the same page as no grid at
all. Use 7/5, 8/4, 3/9. At least three sections must be off-center.

=============================================================================
4. THE FLIP SCENE — this is what replaces the gradient hero
=============================================================================

One full-bleed section inverts the entire page tonality as it enters. Once per
page, at the emotional peak.

.flip {
  background-color: var(--bg); color: var(--ink);
  padding-block: var(--space-10);
  transition: background-color var(--dur-5) var(--ease-both),
              color var(--dur-5) var(--ease-both);
}
.flip.is-flipped { background-color: var(--flip-bg); color: var(--flip-ink); }
.flip.is-flipped .flip__kicker { color: var(--accent-alt); }

const io = new IntersectionObserver(
  (entries) => { for (const e of entries) e.target.classList.toggle('is-flipped', e.isIntersecting); },
  { threshold: 0.35 }
);
document.querySelectorAll('[data-flip]').forEach((el) => io.observe(el));

Inside a flipped scene use --accent-alt, not --accent. The plain accent was
tuned for the page background and loses contrast against the inversion.

=============================================================================
5. GRAIN — apply to every build, does not count as an effect
=============================================================================

Flat color plus grain reads as printed matter. Flat color alone reads as a
default page. Pure SVG noise, no image request, no gradient.

body::after {
  content: ''; position: fixed; inset: 0; z-index: 9999;
  pointer-events: none; opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}

0.04 on light palettes, 0.03 on dark. Never animate it.

=============================================================================
6. SCROLL REVEAL — one implementation, reused everywhere
=============================================================================

[data-reveal] {
  opacity: 0; transform: translateY(var(--lift));
  transition: opacity var(--dur-4) var(--ease-out),
              transform var(--dur-4) var(--ease-out);
}
[data-reveal].is-in { opacity: 1; transform: none; }
@media (max-width: 768px) { [data-reveal] { transform: translateY(var(--lift-sm)); } }

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.style.transitionDelay = `${Number(entry.target.dataset.revealIndex ?? 0) * 60}ms`;
    entry.target.classList.add('is-in');
    io.unobserve(entry.target);          // reveal once, never on scroll back
  }
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

Never put data-reveal on the first-viewport heading — above-the-fold content is
painted at load. Stagger at most 6 siblings.

=============================================================================
7. PICK EXACTLY THREE SIGNATURE EFFECTS
=============================================================================

One structural, one typographic, one tactile. Not eight. Full code for each is
in core/EFFECTS.md; the shortlist:

STRUCTURAL  E01 flip scene · E02 horizontal scroll track (max 1 pinned section
            per page) · E03 clip-path wipe · E04 sticky media with swapping
            captions · E05 newspaper columns

TYPOGRAPHIC E06 line mask reveal (split the lines in the HTML by hand, no
            text-splitting library) · E07 character stagger (short phrases
            only, keep an aria-label) · E08 marquee (aria-hidden, pauses on
            hover) · E09 odometer counter (real numbers only, tabular-nums,
            final value in the HTML) · E10 oversized numeral

TACTILE     E12 hairline grid · E13 custom cursor (mix-blend-mode: difference,
            hidden on touch) · E14 duotone imagery via SVG feColorMatrix ·
            E15 magnetic button (0.25 strength, 12px hard cap) · E16 border
            draw-on via stroke-dashoffset · E17 circular hover reveal

E06 line mask, the highest-value text effect:

  .mask-line { display: block; overflow: hidden; }
  .mask-line > span {
    display: block; transform: translateY(110%);
    transition: transform var(--dur-4) var(--ease-out);
  }
  .is-in .mask-line > span { transform: none; }
  .is-in .mask-line:nth-child(2) > span { transition-delay: 80ms; }
  .is-in .mask-line:nth-child(3) > span { transition-delay: 160ms; }

=============================================================================
8. REDUCED MOTION — required, every build
=============================================================================

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  .mask-line > span { transform: none !important; }
}

And in JS, before starting any looping or scroll-driven effect:
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

Reduced motion means content still works. Anything only visible after an
animation must be visible immediately without one.

=============================================================================
9. FRAMEWORK
=============================================================================

STATIC HTML
  index.html + assets/css/{tokens,base,sections}.css + assets/js/main.js
  All content readable with JavaScript disabled. JS is enhancement only.
  Wrap main.js in an IIFE with 'use strict'.

REACT
  Sections in src/components/sections/[Name]/index.jsx, matching existing
  naming. Tokens in one global stylesheet, imported once.
  Effects live in hooks: useReveal, useFlipScene, useMagnetic.
  Every observer disconnected in the useEffect cleanup.
  If GSAP is already in the project: register plugins in one shared module,
  use gsap.context() in useLayoutEffect, return ctx.revert().
  Do not add an animation library that is not already there.

NEXT.JS
  Respect the router already in use (app/ or pages/).
  Server components by default. 'use client' only on leaves that need the
  browser — the reveal hook, the cursor, the flip observer.
  Never touch window or document during render.
  Guard against hydration mismatch: no Date.now(), no Math.random(), no
  viewport reads in the initial render.
  SEO-critical copy stays server-rendered.
  Fonts via next/font/google with a variable, not a <link>.
  Metadata in the router-correct location.

=============================================================================
10. CONTENT
=============================================================================

  - Preserve supplied copy verbatim. Not "improved", not reworded.
  - Write in the user's language. Turkish input means Turkish output.
  - No lorem ipsum in a delivered build.
  - No invented statistics, testimonials, client logos, awards, or press.
  - Missing a fact? Write a visible [TODO: …] rather than making it up.
  - Every <img> has alt (alt="" if decorative) and explicit width and height.
  - <html lang>, <title>, and <meta name="description"> are all present.
  - Real hrefs. No href="#" on anything presented as a destination.
  - No emoji as bullets, icons, or a substitute for design.

=============================================================================
11. ACCESSIBILITY FLOOR
=============================================================================

  - Every text/background pair meets the ratio in core/PALETTES.md.
  - :focus-visible is styled everywhere. outline: none without a replacement
    is a defect.
  - Touch targets 44x44px minimum — set min-height on the link box, not by
    increasing font size.
  - One <h1>. No skipped heading levels.
  - Buttons for actions, links for navigation.
  - Nothing essential behind hover only.
  - Body text never below 16px on mobile.
  - Every form input has an associated <label>.
  - A skip link to the main content.

=============================================================================
12. BEFORE YOU REPORT
=============================================================================

Run:
  node tools/audit.mjs <project-dir>

Then check by hand:
  1. JavaScript disabled — is all content still there?
  2. 390px wide — no horizontal scroll, no overlap, no clipped text?
  3. 1440px wide — is the composition actually realized?
  4. Tab from the top — focus visible at every stop, never trapped?
  5. OS reduced motion on, reload — nothing missing, nothing looping?
  6. Console — clean?
  7. Cover the color with your hand. Is any section still recognizable as a
     template? Count the symmetric sections; more than half is a fail.

Then report:
  - the palette, fonts, opening archetype, and the 3 effects you chose, with
    one sentence each on why
  - the section list
  - files created or edited
  - audit output, and anything it flagged that you deliberately kept
  - what you did not verify

Do not claim a check you did not run. If the build fails an item above, say so
and fix it rather than reporting success.
```
