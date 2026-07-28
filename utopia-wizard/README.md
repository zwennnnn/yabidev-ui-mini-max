# Utopia

A build system for web interfaces that asks the user exactly one question — **what industry is this for?** — and decides everything else itself.

Colors, fonts, layout, motion, effects, and copy are all determined by the system. The user picks a palette from three suggestions. That is the entire interaction.

The output is designed to be striking without a single gradient.

## Why this exists

Most AI-built pages look the same: a centered headline with two buttons, three feature cards, a testimonial strip, a boxed call-to-action, and a purple-to-blue gradient somewhere. That happens for a mechanical reason — a model given abstract instructions ("make it award-winning", "avoid generic", "be intentional") has nothing to act on, so it falls back to its defaults.

So this system contains no abstract instructions. Every rule is a measured value:

- A hex code with its contrast ratio computed, not estimated.
- `cubic-bezier(0.22, 1, 0.36, 1)`, not "smooth easing".
- `700ms`, not "a moderate duration".
- A `clip-path` reveal that runs, not "an interesting transition".

A weak model cannot act on taste. It can paste a value.

## Using it

Paste [START.md](START.md) into your coding agent. It will ask for your industry, offer three palettes, and build.

```
User:  I need a site for my restaurant.

Agent: For restaurant / food & beverage I'd suggest one of these:
       1. Fire Kitchen — dark, appetite, heat, craft
       2. Market Fresh — light, seasonal, honest, ingredient-led
       3. Wine Room — dark, fine-dining, intimate, expensive
       Which one? Or say "you pick" and I'll take the first.

User:  3

Agent: [ships a complete, audited page]
```

## What is in here

| Path | What it is |
| --- | --- |
| [START.md](START.md) | The entry point. One question, then the system decides. |
| [core/PALETTES.md](core/PALETTES.md) | 54 palettes across 18 industries. Every contrast ratio machine-verified. |
| [core/TYPE.md](core/TYPE.md) | Type scale, industry font pairings, loading rules. |
| [core/LAYOUT.md](core/LAYOUT.md) | Spacing scale, grid, 5 opening archetypes, 8 section archetypes. |
| [core/MOTION.md](core/MOTION.md) | 4 easing curves, 5 durations, scroll reveal, reduced motion. |
| [core/EFFECTS.md](core/EFFECTS.md) | 17 signature effects with working code. Zero gradients. |
| [core/BANNED.md](core/BANNED.md) | Hard bans, every one of them detectable. |
| [prompts/BUILD.md](prompts/BUILD.md) | Self-sufficient build prompt. Works without reading `core/`. |
| [prompts/REVIEW.md](prompts/REVIEW.md) | Strict review pass with a console probe that measures real contrast. |
| [tools/audit.mjs](tools/audit.mjs) | Automated ban checker. |
| [tools/verify-palettes.mjs](tools/verify-palettes.mjs) | WCAG verifier + generator for `PALETTES.md`. |
| [examples/reference-build](examples/reference-build) | A complete page built by the system, passing every check. |

## No gradients

`linear-gradient`, `radial-gradient`, and `conic-gradient` are banned outright — in CSS, SVG, canvas, and Tailwind classes alike. A gradient is the cheapest way to make a flat rectangle look like it has depth, which is exactly why it is the fastest tell of a generated page.

Everything it was doing is replaced by something better:

| Instead of a gradient | This system uses |
| --- | --- |
| Soft depth on a background | Flat color blocking + SVG grain |
| A "premium" glow | Full-bleed tonal inversion of a whole section |
| Fading an edge | A hard `clip-path` cut |
| Shading a photo for text | Duotone treatment via `feColorMatrix` |
| A colorful hero | One accent-filled block against flat background |
| Depth on a button | A 1px border and a 2px hover lift |

The tonal inversion — the *flip scene* — is the signature move. Every palette carries a verified `--flip-bg` / `--flip-ink` pair and an `--accent-alt` that survives the inversion.

## Verification

Nothing here is asserted without being checked.

```bash
node tools/verify-palettes.mjs
```

Recomputes every contrast pair in all 54 palettes with the WCAG 2.1 relative-luminance formula and regenerates `core/PALETTES.md`. It fails loudly rather than shipping a bad ratio — the first run rejected 48 pairs, and the system gained the `--accent-alt` token as a direct result.

```bash
node tools/audit.mjs path/to/project
```

Scans a built project for gradients, placeholder copy, `transition: all`, `outline: none` without a focus replacement, layout-property animation, missing reduced-motion, missing `alt`, loose hex values, and too many font families. Errors block delivery; warnings need a justification.

The reference build passes both, plus a live browser probe: 88 text nodes measured against their real painted backgrounds, zero contrast failures, zero gradients, no horizontal scroll at 390px or 1440px.

## Adding an industry

Edit `core/palettes.json`, then:

```bash
node tools/verify-palettes.mjs
```

If the new palette fails a ratio, fix the color — do not lower the threshold. `PALETTES.md` is generated; never hand-edit it.
