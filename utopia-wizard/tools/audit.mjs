#!/usr/bin/env node
// Audits a built project against the mechanical half of core/BANNED.md.
//
//   node tools/audit.mjs <project-dir>
//   node tools/audit.mjs <project-dir> --json
//
// Exit code 1 if any error-level finding exists. Warnings do not fail the run.
// This checks what a script can check. The visual pass at the end of
// core/BANNED.md still has to be done by a human or a browser.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";

const target = process.argv[2];
const asJson = process.argv.includes("--json");

if (!target) {
  console.error("usage: node tools/audit.mjs <project-dir> [--json]");
  process.exit(2);
}

const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt", "out",
  "coverage", ".cache", "vendor", ".svelte-kit",
]);
const EXTS = new Set([
  ".html", ".htm", ".css", ".scss", ".sass", ".less",
  ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".vue", ".svelte", ".astro",
]);

const walk = (dir, out = []) => {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name) && !name.startsWith(".")) walk(full, out);
    } else if (EXTS.has(extname(name).toLowerCase())) {
      if (!/\.(test|spec)\./.test(name) && !/\.min\./.test(name)) out.push(full);
    }
  }
  return out;
};

// [id, severity, regex, message, appliesTo(ext) | null]
const RULES = [
  ["gradient", "error",
    /\b(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/i,
    "CSS gradient. Banned outright — see the replacement table in core/EFFECTS.md."],

  ["gradient-tailwind", "error",
    /\bbg-gradient-to-[trbl]{1,2}\b|\bbg-\[linear-gradient/i,
    "Tailwind gradient utility. Banned outright."],

  ["gradient-svg", "error",
    /<(?:linear|radial)Gradient\b/i,
    "SVG gradient element. Banned outright."],

  ["gradient-canvas", "error",
    /create(?:Linear|Radial|Conic)Gradient\s*\(/,
    "Canvas gradient. Banned outright."],

  ["glow-shadow", "error",
    /box-shadow\s*:[^;{}]*\b0\s+0\s+\d{2,}px[^;{}]*(?:rgba?\(|#[0-9a-f]{3,8})/i,
    "Colored glow shadow. Shadows are neutral and tight: 0 1px 2px rgba(0,0,0,.08) at most."],

  ["blob-naming", "warn",
    /\b(?:class|className|id)\s*=\s*["'`][^"'`]*\b(?:blob|glow|orb|aurora|mesh-bg|shine)\b/i,
    "Decorative element named blob/glow/orb/aurora/shine. Banned as filler."],

  ["glassmorphism", "warn",
    /backdrop-filter\s*:\s*[^;{}]*blur/i,
    "backdrop-filter blur. Allowed only on a fixed nav over scrolling content — confirm that is what this is."],

  ["lorem", "error",
    /lorem\s+ipsum|dolor\s+sit\s+amet|your\s+text\s+here|placeholder\s+text/i,
    "Placeholder copy in a delivered build."],

  ["transition-all", "error",
    /transition\s*:\s*all\b/i,
    "transition: all animates properties you did not intend, including layout ones. Name them."],

  ["outline-none", "error",
    /outline\s*:\s*(?:none|0)\b/i,
    "outline: none. Requires a :focus-visible replacement in the same file — verify one exists."],

  ["animate-layout", "error",
    /transition\s*:\s*[^;{}]*\b(?:width|height|top|left|right|bottom|margin|padding|font-size)\b\s+\d/i,
    "Transitioning a layout property. Use transform, opacity, clip-path, or filter."],

  ["console-log", "warn",
    /\bconsole\.log\s*\(/,
    "console.log left in shipped code."],

  ["important", "warn",
    /!important/,
    "!important. Allowed only inside a prefers-reduced-motion block."],

  ["bare-ease", "warn",
    /transition[^;{}]*\b(?:ease-in-out|ease-in|ease-out|ease)\s*(?:[;,}]|$)/,
    "Default browser easing. Use the four curves in core/MOTION.md."],

  ["justify", "warn",
    /text-align\s*:\s*justify/i,
    "Justified text produces rivers of whitespace on the web."],

  ["overflow-patch", "warn",
    /(?:^|[^-\w])(?:body|html)\s*(?:,\s*(?:body|html)\s*)?\{[^}]*overflow-x\s*:\s*hidden/is,
    "overflow-x: hidden on body/html hides a horizontal scroll instead of fixing it."],

  ["vw-font", "error",
    /font-size\s*:\s*[\d.]+vw\s*[;}]/i,
    "Bare vw font size with no floor or ceiling. Wrap it in clamp()."],
];

const HTML_RULES = [
  ["img-alt", "error",
    /<img\b(?![^>]*\balt\s*=)[^>]*>/i,
    "<img> without an alt attribute. Decorative images need alt=\"\"."],

  ["placeholder-href", "warn",
    /<a\b[^>]*href\s*=\s*["']#["'][^>]*>/i,
    "href=\"#\" placeholder link."],
];

const findings = [];
const files = walk(target);

if (!files.length) {
  console.error(`No source files found under ${target}`);
  process.exit(2);
}

// Prefer a repo-relative path, but fall back to the absolute one when the
// target sits outside cwd and the relative form is a chain of "..".
const displayPath = (file) => {
  const rel = relative(process.cwd(), file).replace(/\\/g, "/");
  return rel.startsWith("..") ? file.replace(/\\/g, "/") : rel;
};

const record = (file, lineNo, id, severity, message, snippet) => {
  findings.push({
    file: displayPath(file),
    line: lineNo,
    id,
    severity,
    message,
    snippet: snippet.trim().slice(0, 110),
  });
};

let hasReducedMotion = false;
let hasHtmlLang = false;
let sawHtml = false;
const hexes = new Map(); // hex -> count, to spot values outside the token set
const fontFamilies = new Set();

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lines = text.split(/\r?\n/);
  const ext = extname(file).toLowerCase();
  const isHtml = ext === ".html" || ext === ".htm";
  if (isHtml) sawHtml = true;

  if (/@media[^{]*prefers-reduced-motion/i.test(text)) hasReducedMotion = true;
  if (/<html\b[^>]*\blang\s*=/i.test(text)) hasHtmlLang = true;

  // Multi-line rules run against the whole file.
  for (const [id, severity, re, message] of RULES) {
    if (!re.flags.includes("s")) continue;
    const m = text.match(re);
    if (m) {
      const upto = text.slice(0, m.index).split(/\r?\n/).length;
      record(file, upto, id, severity, message, m[0]);
    }
  }

  // Track /* … */ blocks so a rule name mentioned in a comment is not a finding.
  const commentLines = new Set();
  let inBlockComment = false;
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (inBlockComment) {
      commentLines.add(i);
      if (line.includes("*/")) inBlockComment = false;
      return;
    }
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) {
      commentLines.add(i);
      return;
    }
    const open = line.lastIndexOf("/*");
    if (open !== -1 && !line.includes("*/", open)) {
      inBlockComment = true;
      if (trimmed.startsWith("/*")) commentLines.add(i);
    } else if (trimmed.startsWith("/*") && line.includes("*/")) {
      commentLines.add(i);
    }
  });

  lines.forEach((line, i) => {
    if (commentLines.has(i)) return;
    const lineNo = i + 1;
    const inReducedBlock = /prefers-reduced-motion/i.test(
      lines.slice(Math.max(0, i - 12), i + 1).join("\n")
    );

    for (const [id, severity, re, message] of RULES) {
      if (re.flags.includes("s")) continue;
      if (id === "important" && inReducedBlock) continue;
      const m = line.match(re);
      if (m) record(file, lineNo, id, severity, message, m[0]);
    }

    if (isHtml) {
      for (const [id, severity, re, message] of HTML_RULES) {
        const m = line.match(re);
        if (m) record(file, lineNo, id, severity, message, m[0]);
      }
    }

    // Collect hex literals that are not inside a :root token declaration.
    if (!/--[\w-]+\s*:/.test(line)) {
      for (const hex of line.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
        const v = hex[0].toUpperCase();
        hexes.set(v, (hexes.get(v) ?? 0) + 1);
      }
    }

    for (const ff of line.matchAll(/font-family\s*:\s*([^;{}]+)/gi)) {
      const first = ff[1].split(",")[0].trim().replace(/['"]/g, "");
      if (first && !first.startsWith("var(") && !/^(inherit|initial|unset)$/i.test(first)) {
        fontFamilies.add(first);
      }
    }
  });
}

// Whole-project checks.
if (!hasReducedMotion) {
  findings.push({
    file: target.replace(/\\/g, "/"),
    line: 0,
    id: "no-reduced-motion",
    severity: "error",
    message: "No prefers-reduced-motion block anywhere in the project. Required by core/MOTION.md.",
    snippet: "",
  });
}

if (sawHtml && !hasHtmlLang) {
  findings.push({
    file: target.replace(/\\/g, "/"),
    line: 0,
    id: "no-html-lang",
    severity: "error",
    message: "No <html lang> attribute found.",
    snippet: "",
  });
}

if (hexes.size > 4) {
  findings.push({
    file: target.replace(/\\/g, "/"),
    line: 0,
    id: "loose-hex",
    severity: "warn",
    message:
      `${hexes.size} distinct hex values used outside token declarations ` +
      `(${[...hexes.keys()].slice(0, 8).join(", ")}${hexes.size > 8 ? ", …" : ""}). ` +
      "Colors should come from the palette tokens.",
    snippet: "",
  });
}

if (fontFamilies.size > 3) {
  findings.push({
    file: target.replace(/\\/g, "/"),
    line: 0,
    id: "too-many-fonts",
    severity: "warn",
    message: `${fontFamilies.size} font families declared (${[...fontFamilies].join(", ")}). Maximum is 2, or 3 with a mono.`,
    snippet: "",
  });
}

// ------------------------------------------------------------------ output

const errors = findings.filter((f) => f.severity === "error");
const warns = findings.filter((f) => f.severity === "warn");

if (asJson) {
  console.log(JSON.stringify({ errors, warnings: warns, scanned: files.length }, null, 2));
  process.exit(errors.length ? 1 : 0);
}

const show = (list, label) => {
  if (!list.length) return;
  console.log(`\n${label} (${list.length})\n`);
  for (const f of list) {
    const where = f.line ? `${f.file}:${f.line}` : f.file;
    console.log(`  ${where}`);
    console.log(`    [${f.id}] ${f.message}`);
    if (f.snippet) console.log(`    > ${f.snippet}`);
    console.log("");
  }
};

console.log(`Audited ${files.length} file(s) under ${target}`);
show(errors, "ERRORS");
show(warns, "WARNINGS");

if (!findings.length) {
  console.log("\nClean. Now do the visual pass at the end of core/BANNED.md — a script cannot judge composition.\n");
} else {
  console.log(
    `\n${errors.length} error(s), ${warns.length} warning(s). ` +
      `Errors must be fixed before delivery.\n`
  );
}

process.exit(errors.length ? 1 : 0);
