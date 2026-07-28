# Banned

Every item here is detectable — by a grep, a number, or a yes/no look at the screen. Nothing on this list is a matter of taste, which is the point: "don't make it look generic" is unenforceable, and this is what replaces it.

Run `node tools/audit.mjs <project-dir>` after a build. It checks the mechanical half of this list automatically.

---

## 1. Gradients — absolute

```
linear-gradient
radial-gradient
conic-gradient
repeating-linear-gradient
repeating-radial-gradient
repeating-conic-gradient
```

Zero occurrences. Not in CSS, not in inline styles, not in Tailwind classes (`bg-gradient-to-*`, `from-*`, `via-*`, `to-*`), not in SVG (`<linearGradient>`, `<radialGradient>`), not in canvas (`createLinearGradient`, `createRadialGradient`).

There is no exception for "subtle" gradients, hard-stop gradients used as stripes, or gradient text. The replacement table is at the top of `core/EFFECTS.md`.

Also banned as part of the same aesthetic:

- `backdrop-filter: blur()` used as a glassmorphism panel. (Allowed only on a fixed navigation bar over scrolling content.)
- `filter: blur()` on a colored shape to fake a glow.
- `box-shadow` with a colored, spread-out blur used as a glow — for example `0 0 60px rgba(120,80,255,.5)`. Shadows are neutral, tight, and rare: `0 1px 2px rgba(0,0,0,.08)` at most.
- Any element named `blob`, `glow`, `orb`, `aurora`, `mesh`, or `shine`.

## 2. Layout

Banned:

- A centered column of text with a button beneath it, used more than once on a page.
- Three equal cards in a row as the main content pattern. (A grid of *products* or *projects* is a collection, which is fine — see S3 in `core/LAYOUT.md`. Three boxes describing abstract "features" is not.)
- A card inside a card. A bordered or shadowed box nested inside another bordered or shadowed box, at any depth.
- `border-radius` above `16px` on a container. Pills are for chips and tags only.
- Decorative shapes with no meaning: floating circles, abstract blobs, scattered dots, wave dividers, diagonal section separators.
- An icon set standing in for visual identity — a row of generic line icons above three headings.
- `overflow-x: hidden` on `body` or `html` to hide a horizontal scroll instead of fixing the element causing it.
- Symmetry everywhere. At least three sections on the page must be asymmetric.
- More than 8 sections, or fewer than 5.

## 3. Color

- More than the tokens in `core/PALETTES.md`. Any hex value in the CSS that is not a token is a defect.
- More than one accent hue.
- Pure `#000000` as text or `#FFFFFF` as a page background. The palettes use near-black and near-white deliberately; pure values feel harsh on screen.
- Text on an image without a solid scrim or duotone treatment underneath (E14).
- Any text/background pair below its ratio in `core/PALETTES.md`.
- Color as the only carrier of meaning — an error state that is red and nothing else needs an icon or text too.

## 4. Typography

- More than 2 font families (3 if a mono is genuinely used for data or code).
- More than 4 font weights loaded.
- Text below 12px anywhere; body text below 16px on mobile.
- Bare `vw` font sizes without `clamp()`.
- Negative letter-spacing on body text.
- Paragraphs wider than 75 characters.
- Justified text (`text-align: justify`) — it produces rivers of whitespace on the web.
- ALL CAPS for anything longer than a short label.
- A heading hierarchy that skips levels, or more than one `<h1>` on a page.

## 5. Motion

- Easings other than the four in `core/MOTION.md`. In particular: bare `ease`, `ease-in-out`, or `transition: all`.
- Durations other than the five steps.
- `transition: all` — it animates properties you did not intend, including layout ones.
- Animating `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, or `font-size`.
- More than 3 signature effects, or more than 1 pinned section.
- Scroll hijacking: overriding wheel speed, taking over the scroll event, or a smooth-scroll library the user did not ask for.
- Reveal animations that re-trigger when scrolling back up.
- Any looping animation above the fold except a marquee that pauses on hover.
- Autoplaying video with sound; any autoplaying audio.
- A missing `prefers-reduced-motion` block.
- Content that only exists after an animation completes.

## 6. Content

- `Lorem ipsum` in a delivered build.
- Invented statistics. "10,000+ happy customers" with no source is a lie the visitor can smell.
- Fabricated testimonials, fake names, fake company logos, invented awards, or fake press mentions.
- Placeholder links: `href="#"` on anything presented as a real destination.
- Emoji used as bullet points, section icons, or a substitute for design.
- Copy the user supplied, altered. If the brief includes text, it ships verbatim.
- Any claim about the business that was not in the brief. If information is missing, use a visible `[TODO: …]` marker rather than inventing it.

## 7. Accessibility

- `outline: none` without a `:focus-visible` replacement.
- Images without `alt`. (Decorative images need `alt=""`, which is different from missing.)
- `<div>` or `<span>` with a click handler and no button semantics, `role`, or `tabindex`.
- Touch targets below 44×44px.
- Essential information reachable only on hover.
- Missing `<html lang>`.
- Missing `<title>` or `<meta name="description">`.
- Text over an image with no scrim, at any breakpoint.
- Form inputs without an associated `<label>`.

## 8. Code

- Hard-coded values that belong to a token scale — a stray `padding: 37px` or `#3a7bd5`.
- Inline `style=` attributes, except for values a script must compute at runtime.
- `!important`, except inside the `prefers-reduced-motion` block.
- Unremoved event listeners, observers, intervals, or animation frames.
- `console.log` left in shipped code.
- Scroll handlers doing layout reads outside `requestAnimationFrame`.
- Images without explicit `width` and `height` attributes.
- A dependency added that the brief did not allow.
- Any file the brief marked as untouchable, modified.

---

## The grep pass

Run these against the built project. Every one should return nothing.

```bash
rg -i "linear-gradient|radial-gradient|conic-gradient|bg-gradient-to" --glob '!node_modules'
```

```bash
rg -i "lorem ipsum|placeholder text|your text here" --glob '!node_modules'
```

```bash
rg "transition: ?all|outline: ?none" --glob '!node_modules'
```

```bash
rg "console\.log" --glob '!node_modules' --glob '!*.test.*'
```

```bash
rg -i "blob|glassmorph|backdrop-filter|drop-shadow\(0 0" --glob '!node_modules'
```

Then the visual pass, which no script can do:

1. Screenshot at 1440px and at 390px.
2. Cover the color and look only at the layout. Is any section still recognizable as a template?
3. Count the symmetric sections. More than half is a fail.
4. Read the first viewport out loud. Does it say what this is, or does it say something that could be on any page in any industry?
5. Tab through from the top. Every stop visible?
6. Turn on OS reduced motion and reload. Is anything now missing?
