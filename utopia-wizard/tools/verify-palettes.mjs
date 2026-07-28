#!/usr/bin/env node
// Verifies every palette in core/palettes.json against WCAG 2.1 contrast math,
// then regenerates core/PALETTES.md with the measured ratios.
//
//   node tools/verify-palettes.mjs          check + regenerate PALETTES.md
//   node tools/verify-palettes.mjs --check  check only, non-zero exit on failure
//
// Contrast formula: WCAG 2.1 relative luminance, (L1 + 0.05) / (L2 + 0.05).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

const srgb = (hex) => {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Bad hex: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

const luminance = (hex) => {
  const [r, g, b] = srgb(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const round = (n) => Math.round(n * 100) / 100;

const toHsl = (hex) => {
  const [r, g, b] = srgb(hex);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2, d = max - min;
  if (!d) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
};

// [fg, bg, minimum, label, wcag reference]
const RULES = [
  ["ink", "bg", 7.0, "body + heading text on page", "1.4.3 AAA"],
  ["ink", "surface", 7.0, "text on raised panels", "1.4.3 AAA"],
  ["ink2", "bg", 4.5, "secondary text on page", "1.4.3 AA"],
  ["ink2", "surface", 4.5, "secondary text on panels", "1.4.3 AA"],
  ["accentInk", "accent", 4.5, "label inside a filled button", "1.4.3 AA"],
  ["accent", "bg", 3.0, "accent as a UI boundary on page", "1.4.11 AA"],
  ["accent", "surface", 3.0, "accent as a UI boundary on panels", "1.4.11 AA"],
  ["accentAlt", "flipBg", 4.5, "accent text inside the flip scene", "1.4.3 AA"],
  ["accentAltInk", "accentAlt", 4.5, "label inside a filled button in the flip scene", "1.4.3 AA"],
  ["flipInk", "flipBg", 7.0, "text in the inverted flip scene", "1.4.3 AAA"],
  ["line", "bg", 1.35, "hairline border visibility on page", "practical"],
];

const failures = [];
const warnings = [];
const data = JSON.parse(readFileSync(join(root, "core/palettes.json"), "utf8"));

for (const industry of data.industries) {
  for (const p of industry.palettes) {
    const at = `${industry.id}/${p.id}`;
    p._ratios = {};

    for (const [fg, bg, min, label, ref] of RULES) {
      const ratio = contrast(p[fg], p[bg]);
      p._ratios[`${fg}/${bg}`] = round(ratio);
      if (ratio < min) {
        failures.push(
          `${at}: ${fg}(${p[fg]}) on ${bg}(${p[bg]}) = ${round(ratio)}:1, ` +
            `needs >= ${min}:1 — ${label} [${ref}]`
        );
      }
    }

    // surface must read as a distinct plane, but never as a second theme.
    const sep = contrast(p.surface, p.bg);
    p._ratios["surface/bg"] = round(sep);
    if (sep < 1.04) {
      failures.push(
        `${at}: surface(${p.surface}) is invisible against bg(${p.bg}) = ${round(sep)}:1, needs >= 1.04:1`
      );
    } else if (sep > 2.2) {
      warnings.push(
        `${at}: surface(${p.surface}) vs bg(${p.bg}) = ${round(sep)}:1 — reads as a second theme, keep it under 2.2:1`
      );
    }

    // The flip scene must actually invert. If it lands near the page bg the drama beat dies.
    const flipDelta = contrast(p.flipBg, p.bg);
    p._ratios["flipBg/bg"] = round(flipDelta);
    if (flipDelta < 2.5) {
      failures.push(
        `${at}: flipBg(${p.flipBg}) barely differs from bg(${p.bg}) = ${round(flipDelta)}:1, needs >= 2.5:1 to work as an inverted scene`
      );
    }

    // The flip scene is a tonal inversion, never an accent-filled section. A
    // saturated accent as a full-bleed background caps text contrast well below
    // AAA; accent-filled areas are handled by accent/accentInk instead.
    if (p.flipBg.toLowerCase() === p.accent.toLowerCase()) {
      failures.push(
        `${at}: flipBg equals accent(${p.accent}). The flip scene must invert bg/ink, not fill with accent.`
      );
    }

    // accentAlt has to stay recognizably the same color as accent, otherwise the
    // page reads as having two brand colors.
    const [ah] = toHsl(p.accent);
    const [bh] = toHsl(p.accentAlt);
    const hueGap = Math.min(Math.abs(ah - bh), 1 - Math.abs(ah - bh)) * 360;
    p._ratios["accentAlt hue drift"] = `${Math.round(hueGap)}deg`;
    if (hueGap > 12) {
      failures.push(
        `${at}: accentAlt(${p.accentAlt}) drifts ${Math.round(hueGap)}deg from accent(${p.accent}), max 12deg`
      );
    }
  }
}

const total = data.industries.reduce((n, i) => n + i.palettes.length, 0);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (failures.length) {
  console.error(`\n${failures.length} contrast failure(s) across ${total} palettes:\n`);
  for (const f of failures) console.error(`  x ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`\nOK: ${total} palettes across ${data.industries.length} industries pass every contrast rule.`);
if (checkOnly) process.exit(0);

// ---------------------------------------------------------------- markdown

const cssBlock = (p) => `:root {
  --bg: ${p.bg};
  --surface: ${p.surface};
  --line: ${p.line};
  --ink: ${p.ink};
  --ink-2: ${p.ink2};
  --accent: ${p.accent};
  --accent-ink: ${p.accentInk};
  --accent-alt: ${p.accentAlt};
  --accent-alt-ink: ${p.accentAltInk};
  --flip-bg: ${p.flipBg};
  --flip-ink: ${p.flipInk};
}`;

const ratioRows = (p) =>
  Object.entries(p._ratios)
    .map(([pair, v]) => (typeof v === "string" ? `${pair} ${v}` : `${pair} ${v}:1`))
    .join(" · ");

let md = `# Palettes

Generated by \`tools/verify-palettes.mjs\` from \`core/palettes.json\`. Do not hand-edit this file; edit the JSON and re-run:

\`\`\`bash
node tools/verify-palettes.mjs
\`\`\`

${total} palettes across ${data.industries.length} industries. Every ratio below is computed with the WCAG 2.1 relative-luminance formula, not estimated.

## How to use this file

1. The user names their industry. Nothing else is asked.
2. Find the industry block below.
3. Offer its three palettes by name and mood. The user picks one, or says "you choose" and you take the first.
4. Paste that palette's CSS block into the project's token file. These ${Object.keys(data.tokens).length} values are the entire color system.

## The ${Object.keys(data.tokens).length} tokens

| Token | Role |
| --- | --- |
${Object.entries(data.tokens)
  .map(([k, v]) => `| \`--${k.replace(/([A-Z])/g, "-$1").toLowerCase()}\` | ${v} |`)
  .join("\n")}

## Rules that bind every palette

- **No gradients.** Not on backgrounds, buttons, text, borders, overlays, or blobs. \`linear-gradient\`, \`radial-gradient\`, and \`conic-gradient\` are banned outright. Depth comes from flat color blocking, the flip scene, hairlines, and grain. See \`core/EFFECTS.md\`.
- **${Object.keys(data.tokens).length} tokens, no more.** If a color is not in the list, it does not go in the file. No one-off hex values.
- **One accent.** The accent is loud precisely because it is rare. Target under 10% of painted surface area. \`--accent-alt\` is not a second brand color; it is the same hue re-lit for the flip scene, and the verifier holds it within 12 degrees of hue drift.
- **The flip scene is the drama.** Every page uses \`--flip-bg\`/\`--flip-ink\` for one or two full-bleed sections. That tonal inversion is what a gradient would have been faking. Inside a flip scene, swap \`--accent\` for \`--accent-alt\` — the plain accent was tuned for the page background and will not hold contrast there.
- **Accent-filled blocks are a separate device.** A section can be painted \`--accent\` with \`--accent-ink\` text. That is not the flip scene, and the two should not appear back to back.
- **Semantic colors are derived, not invented.** If success/warning/danger states are needed: success \`#1F8A4C\`, warning \`#B45309\`, danger \`#C1272D\` on light surfaces; success \`#4ADE80\`, warning \`#FBBF24\`, danger \`#F87171\` on dark surfaces. Verify against the actual background before shipping.

---
`;

for (const industry of data.industries) {
  md += `\n## ${industry.label}\n\nIndustry id: \`${industry.id}\`\n`;
  for (const p of industry.palettes) {
    md += `
### ${p.name}

\`${p.id}\` — ${p.mood}

\`\`\`css
${cssBlock(p)}
\`\`\`

Measured contrast: ${ratioRows(p)}
`;
  }
  md += `\n---\n`;
}

md += `
## If the industry is not listed

Pick the listed industry closest in audience and tone, then shift the accent hue while keeping every measured relationship intact. Add the new palette to \`core/palettes.json\` and re-run the verifier before using it. Never ship a palette that has not been through the script.
`;

writeFileSync(join(root, "core/PALETTES.md"), md);
console.log(`Wrote core/PALETTES.md (${md.split("\n").length} lines).`);
