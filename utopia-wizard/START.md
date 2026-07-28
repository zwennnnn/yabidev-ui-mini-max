# Start here

The user says one thing: **their industry.** Everything else is decided by this system.

Paste this file into the coding agent, then answer its one question.

---

## The prompt

```text
You are building a web interface using the Utopia system. Read this whole message before acting.

THE ONLY QUESTION YOU MAY ASK
Ask the user one question and nothing else:

  "What industry is this for?"

Accept any answer — "restaurant", "law firm", "we sell running shoes", a company
name, a one-line description. Map it to the closest industry id in
core/PALETTES.md. Do not ask about colors, fonts, animation, layout, tone,
sections, competitors, or references. Those are all decided below.

If the user already named their industry in their first message, do not ask
anything. Go straight to step 2.

STEP 1 — READ THE SYSTEM
Read these five files before writing any code. They are not suggestions; they
contain the exact values this build uses.

  core/PALETTES.md   the 11 color tokens, per industry, with verified contrast
  core/TYPE.md       type scale, industry font pairing, loading
  core/LAYOUT.md     spacing scale, grid, opening and section archetypes
  core/MOTION.md     easing curves, durations, scroll reveal, reduced motion
  core/EFFECTS.md    the effect library, with working code

If you cannot read files, use prompts/BUILD.md instead — it carries the
critical values inline.

STEP 2 — DETECT, DO NOT ASK
Work these out yourself from the repository. Report what you found in one short
paragraph. Only ask the user if the evidence genuinely contradicts itself.

  Framework      package.json dependencies, next.config.*, vite.config.*,
                 app/ or pages/ directory, or plain .html files
  New or refactor  Does a page already exist at the target route?
  Package manager  the lockfile present
  Commands       the scripts block in package.json
  Existing copy  If a page exists, its text is preserved verbatim
  Brand assets   any logo, font, or color already in the repo wins over the
                 palette below — say so if you find one

STEP 3 — OFFER THREE PALETTES
Find the user's industry in core/PALETTES.md. Present its three palettes exactly
like this, then stop and wait:

  For [industry] I'd suggest one of these:

  1. [Name] — [mood]
     bg [hex] · ink [hex] · accent [hex]
  2. [Name] — [mood]
     bg [hex] · ink [hex] · accent [hex]
  3. [Name] — [mood]
     bg [hex] · ink [hex] · accent [hex]

  Which one? Or say "you pick" and I'll take the first.

This is the last time you ask the user anything.

STEP 4 — DECIDE EVERYTHING ELSE YOURSELF
Do not present these as options. Choose, state your choices in two or three
sentences, and build.

  Fonts            the pairing for this industry in core/TYPE.md
  Opening          one archetype from core/LAYOUT.md (O1–O5)
  Sections         5 to 8, following the assembly table in core/LAYOUT.md
  Effects          exactly 3 from core/EFFECTS.md — one structural (E01–E05),
                   one typographic (E06–E10), one tactile (E12–E17).
                   E11 grain is applied to every build and does not count.
  Motion           the tokens in core/MOTION.md, unchanged
  Copy             written by you, specific to this business, in the user's
                   language. No lorem ipsum, no invented statistics, no fake
                   testimonials. Where you need a fact you do not have, write
                   [TODO: …] visibly in the page.

STEP 5 — BUILD
Follow prompts/BUILD.md. Deliver a complete, working page — not a mockup, not
a plan, not a description of what you would do.

STEP 6 — VERIFY BEFORE REPORTING
Run these and fix what they find:

  node tools/audit.mjs <project-dir>

Then the manual pass:
  - Load the page with JavaScript disabled. All content still present?
  - Resize to 390px. No horizontal scroll, no overlap, no clipped text?
  - Tab from the top. Focus visible at every stop?
  - Enable OS reduced motion, reload. Nothing missing, nothing looping?
  - Open the console. Clean?

Report what you built, what you chose and why, and anything the audit flagged
that you deliberately kept.

THE RULES THAT DO NOT BEND
  - No gradients. None. Not linear, radial, or conic; not in CSS, SVG, canvas,
    or Tailwind classes. core/EFFECTS.md opens with the replacement for every
    job a gradient was doing.
  - Only the 11 palette tokens. No other color values in the file.
  - Only the four easing curves and five durations from core/MOTION.md.
  - Only transform, opacity, clip-path, and filter are animated.
  - Exactly 3 signature effects. Not 8.
  - No centered-hero / three-cards / testimonial-strip / boxed-CTA layout.
  - Every text/background pair meets the ratio recorded in core/PALETTES.md.
  - prefers-reduced-motion is implemented, always.
  - The full ban list is core/BANNED.md.
```

---

## What the user experiences

```
User:  I need a site for my restaurant.

Agent: For restaurant / food & beverage I'd suggest one of these:

       1. Fire Kitchen — dark, appetite, heat, craft
          bg #131010 · ink #F7EFE6 · accent #FF6B2C
       2. Market Fresh — light, seasonal, honest, ingredient-led
          bg #FCFBF4 · ink #14180F · accent #2C6B28
       3. Wine Room — dark, fine-dining, intimate, expensive
          bg #1A0F13 · ink #F3E7DE · accent #E1B15A

       Which one? Or say "you pick" and I'll take the first.

User:  3

Agent: Wine Room it is. Static HTML project, no existing pages, so building
       fresh. Fraunces + Work Sans for the type. Opening as a corner-anchored
       full-bleed scene, seven sections, and three effects: a sticky media
       essay for the tasting menu, line-mask reveals on the headings, and a
       magnetic reservation button. Building now.

       [ships a complete, audited page]
```

Two messages from the user. That is the whole interaction.

## Why the old flow was replaced

The previous version asked for around forty inputs — `Motion tone:`,
`Selected extraordinary directives:`, `Scene map:`, `Failure criteria:`. Users
do not know those answers, so they left them blank, and the model fell back to
its defaults. Its defaults are a centered hero, three cards, and a purple
gradient.

The fix was not a better-worded question. It was removing the questions and
replacing every abstract instruction — "be extraordinary", "avoid generic",
"award-level" — with a measured value: a hex code with a verified contrast
ratio, a `cubic-bezier` with four decimals, a duration in milliseconds, a
`clip-path` that actually runs.

A model cannot act on "make it award-winning". It can act on
`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
