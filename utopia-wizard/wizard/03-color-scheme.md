# 03 Color Scheme

Use this common step for both new projects and refactors.

## Theme

Choose one:

```text
1. Light
2. Dark
3. Mixed scenes
4. Let the coder choose based on the brief
```

## Palette Direction

Do not ask only for a favorite color. Ask what the color must do.

```text
Primary background mood:
Text color mood:
Accent color:
Accent purpose:
Danger colors to avoid:
Colors already owned by brand:
```

## Typography

```text
Existing font:
Can the coder use web fonts:
Preferred type mood:
Forbidden type mood:
Should typography be the main visual device: yes/no
```

## Motion Tone

```text
Motion should feel:
Motion should never feel:
Reduced-motion behavior:
Maximum acceptable animation intensity:
```

## Token Rules

The coder must define reusable design tokens. Inline one-off colors are not acceptable except for temporary debugging that is removed before final delivery.

Preferred token locations:

```text
React: CSS custom properties in src/styles/tokens.css or the existing global stylesheet.
Next.js: app/globals.css, src/app/globals.css, or the existing Tailwind config.
Static HTML: assets/css/tokens.css or a root :root block in the main stylesheet.
```

Required token groups:

```text
Color:
Typography:
Spacing:
Radius:
Motion duration/easing:
Z-index/layers:
```

## Anti-Generic Palette Rules

Avoid one-note palettes dominated by only one hue family. Be especially careful with:

```text
Purple-blue gradients
Cream/beige/sand pages
Dark blue/slate SaaS palettes
Brown/orange espresso palettes
Generic neon cyberpunk palettes
```

The palette must support WCAG AA contrast and visual inspection on desktop and mobile.

## Output From This Step

Record:

```text
Theme:
Palette direction:
Typography direction:
Motion tone:
Token location:
Contrast requirement:
```

Continue to `04-summary-approval.md`.

