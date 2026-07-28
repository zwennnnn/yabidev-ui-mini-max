# Prompt 1: Skill Research, Repo Audit, And Architecture Planning

Use this first. This prompt prepares the project. It must not implement the UI.

## Fill These Inputs

```text
Project name:
Project type: new project / refactor
Framework claimed by owner: React / Next.js / static HTML / unknown
Scope: entire site / single page / single section / component family
Route or page:
Section name if refactor:
Known file paths:
Repo rules:
Package manager:
Run command:
Build command:
Lint/test command:
Allowed dependencies:
Forbidden dependencies:
Forbidden files/folders:
Copy preservation rules:
Brand/assets provided:
External asset sourcing allowed: yes/no
Generated assets allowed: yes/no
Theme/palette:
Typography direction:
Motion tone:
Selected extraordinary directives:
Accessibility requirements:
Performance constraints:
Success criteria:
Failure criteria:
```

## Copy-Ready Prompt

```text
You are acting as a senior UI systems architect, creative director, motion director, accessibility reviewer, and frontend engineer.

Objective:
Prepare this project for an extraordinary, award-level web interface. The final implementation must not look generic, template-based, or AI-made. Even if the current repo is weak, messy, or visually poor, treat the target as a polished, intentional, god-tier project with disciplined engineering.

Inputs:
[PASTE THE FILLED INPUTS HERE]

Hard stop:
Do not build, refactor, or edit implementation files in this step. This step is only:
- repo inspection
- skill discovery and instruction reading
- constraint extraction
- creative diagnosis
- architecture planning
- scene planning
- token and asset planning
- QA planning
- approval request

If information is missing:
- Infer from repo evidence when safe: lockfiles, package scripts, config files, folder names, imports, and existing style conventions.
- Ask only questions that are truly blocking.
- Do not use missing information as an excuse to produce a shallow plan.

Step 1 - Repo audit
Inspect the repository before making design or architecture claims.

Find and report:
- Framework and version evidence.
- Router type if Next.js: app router, pages router, or hybrid.
- Package manager evidence: lockfiles and scripts.
- Run/build/lint/test scripts that actually exist.
- Styling system: CSS modules, global CSS, Tailwind, Sass, styled-components, CSS-in-JS, component library, design tokens, or ad hoc CSS.
- Existing component structure and ownership boundaries.
- Existing motion stack: GSAP, Framer Motion, CSS transitions, Lenis, locomotive-scroll, custom JS, or none.
- Existing asset strategy: public folder, src assets, remote images, next/image, CDN, inline SVG, icon packages.
- Existing accessibility patterns: landmarks, headings, focus styles, reduced motion, aria usage.
- Files that look unrelated, user-owned, generated, or risky to modify.
- Technical debt that directly affects the planned UI work.

Output this as "Repo Truth", not guesses. If owner inputs conflict with repo evidence, state the conflict and prefer repo evidence unless the owner explicitly overrides it.

Step 2 - Scope contract
Create a strict contract for what the implementation phase may touch.

Define:
- In scope.
- Out of scope.
- Files likely to be edited.
- Files that may be read but not edited.
- Files that must not be touched.
- Copy preservation rules.
- Whether adjacent section transitions can change.
- Whether shared tokens, hooks, layouts, or asset folders can change.
- Whether dependencies can be added.

If this is a single-section refactor:
- The implementation may inspect parent/import files only to understand boundaries.
- The implementation must not edit unrelated sections.
- Shared files may be edited only if the owner approved them or the change is impossible without them.

Step 3 - Skill discovery and instruction reading
Use the local skill discovery workflow if available. Prefer installed skills for:
- frontend design
- UI review
- accessibility
- motion/GSAP/scroll animation
- browser QA
- image generation or asset generation
- framework-specific frontend work

Rules:
- Do not invent installed skills.
- Do not merely name a skill. Read its SKILL.md, README, or instruction file before relying on it.
- If a skill references a relevant instruction file, read only the relevant referenced file.
- If no suitable skill exists, say so and proceed with direct expertise.

For every selected skill, report:
- Skill name.
- Category.
- Why it applies.
- Instructions read.
- Concrete effect on the architecture or implementation plan.
- Any instruction that conflicts with the user request or repo constraints.

Step 4 - Competitive and anti-template diagnosis
Before planning visuals, diagnose the design problem.

Answer:
- What familiar template pattern must be avoided here?
- What would make this project look AI-made?
- What would make it look expensive, deliberate, and human-directed?
- What is overused in this industry or page type?
- Which parts need calm and clarity?
- Which parts can carry experimental energy?
- What should be the first-viewport signal of the product, brand, person, place, or object?
- What must the user understand within five seconds?

Do not choose unusual effects until this diagnosis is complete.

Step 5 - Creative thesis
Write a concise creative thesis that can guide every section.

Include:
- Core idea in one sentence.
- Visual language: composition, image treatment, typography, density, rhythm.
- Motion language: timing, easing, scroll feel, transition behavior, interaction mood.
- Soundless cinematic logic: how scenes build tension, pause, and release without sacrificing clarity.
- What the design refuses to do.

The thesis must be specific enough that two different designers would not produce the same generic layout from it.

Step 6 - Extraordinary directive selection
Select only the directives approved by the owner, or propose a smaller refined set if the owner chose too many.

Directive menu:
1. Break expected layout.
2. Break hero expectations.
3. Fake-out ending.
4. Brand cursor.
5. Deliberate silence.
6. Breaking the frame.
7. Unusual scroll feel.

Selection rules:
- New full page: choose 2 or 3.
- Entire-site refactor: choose 2 or 3.
- Single-section refactor: choose exactly 1.
- Do not choose a directive only because it sounds cool.
- Reject any directive that would harm readability, performance, or scope discipline.

For each selected directive, provide:
- Why this project needs it.
- Where it appears.
- What it does visually.
- What it does emotionally.
- How it stays readable.
- How it stays maintainable.
- What failure mode to avoid.

Step 7 - Information architecture and scene map
Plan the page as a sequence of scenes, not a stack of generic blocks.

For each section/scene, define:
- Section name.
- Purpose.
- Required copy or content.
- User question answered.
- Visual role.
- Composition idea.
- Motion role.
- Interaction role if any.
- Desktop layout behavior.
- Mobile layout behavior.
- Accessibility concern.
- Transition into next scene.

Avoid:
- "Hero, features, testimonials, CTA" as an unexamined default.
- Repeated centered blocks.
- Cards as the main layout system.
- Numbered process sections unless the content itself requires a sequence.
- Decorative filler that does not help understanding.

Step 8 - Visual system plan
Define a token-driven system before implementation.

Required token groups:
- Color: background, surface, text, muted text, accent, border, overlay, focus, danger/success if needed.
- Typography: font families, display scale, body scale, line-height, weight, max line lengths.
- Spacing: base unit, section padding, grid gaps, inline rhythm, mobile reductions.
- Layout: content width, grid columns, breakpoints, container constraints, z-index/layer model.
- Radius: global defaults and exceptions.
- Motion: durations, easings, scroll scrub values, stagger rules, reduced-motion equivalents.
- Media: aspect ratios, image treatment, overlays, loading behavior.

Rules:
- No scattered hard-coded hex values.
- No viewport-width font scaling.
- No negative letter spacing unless already part of a brand system and still readable.
- Do not create a one-hue palette.
- Avoid overused purple-blue gradients, beige/cream monotone pages, dark slate SaaS palettes, generic neon cyberpunk, and brown espresso themes unless the brief specifically demands one.
- Define contrast strategy for text over images before selecting images.

Step 9 - Framework-specific architecture plan
Create the implementation architecture for the detected framework.

If React:
- Use the repo's existing source root and naming style.
- Sections should live under /src/components/sections/[SectionName]/index.jsx or the closest existing equivalent.
- Each section owns presentational styles if the repo uses CSS files.
- Shared UI primitives live under /src/components/ui/ only if reused meaningfully.
- Content/data may live in /src/data/ only if it reduces duplication or keeps components clean.
- Motion logic lives in /src/hooks/ or a local motion module with clear ownership.
- GSAP plugin registration lives in one shared file such as /src/lib/gsap.js.
- GSAP contexts use useLayoutEffect and return ctx.revert().
- Use refs deliberately. Do not query the whole document when scoped refs work.
- Use Context only for genuinely cross-cutting state such as global cursor mode or scroll progress.
- Avoid prop drilling by creating better boundaries, not by creating unnecessary global state.

If Next.js:
- Respect app router, pages router, or hybrid evidence.
- Keep server components server-side by default.
- Use "use client" only for browser-only leaf components.
- Do not access window/document during server render.
- Avoid hydration mismatches from random values, dates, viewport reads, and animation initial state.
- Keep SEO-critical copy server-rendered when possible.
- Put metadata in the correct router-specific location.
- Use next/image for local or configured remote images when appropriate.
- Use next/font or existing font setup rather than ad hoc font imports when possible.
- Motion code lives in client hooks/components with cleanup.
- Dynamic import browser-heavy animation modules only if it improves bundle or hydration safety.

If static HTML:
- Keep the content semantic and readable without JavaScript.
- Prefer index.html plus assets/css/, assets/js/, and assets/img/ unless the repo already has a clear structure.
- Use CSS custom properties in a token file or :root block.
- Use JS modules for interaction only when needed.
- Use GSAP only if approved by repo rules.
- Provide a no-JS acceptable baseline.
- Avoid framework-shaped abstractions.

Step 10 - Motion and interaction plan
Define motion before writing code.

Include:
- Page-level rhythm: where motion is dense, where it is quiet.
- ScrollTrigger or scroll behavior: pinning, scrub, start/end logic, cleanup.
- Transition type per scene boundary.
- Cursor behavior if selected.
- Hover/focus/tap states.
- Reduced-motion equivalent for each major effect.
- Mobile simplification for each major effect.
- Performance risk: transforms/opacity preferred, layout-triggering animation avoided.

Rules:
- Motion must support meaning.
- Motion must never make text unreadable.
- Do not repeat the same transition at every boundary.
- Do not add scroll hijacking that traps or confuses users.
- Do not animate layout properties when transform/opacity can do the job.

Step 11 - Asset plan
Define asset rules before sourcing.

If external sourcing is allowed:
- Use approved providers such as Unsplash or Pexels.
- Verify candidate URLs with curl and keep only 200 responses.
- Download local copies if the repo expects local assets or if remote loading is fragile.
- Record source URL, local filename, license/source provider, intended usage, and reason for selection.

Reject:
- Dark, blurred, generic, stock-like visuals.
- Images that cannot support readable text.
- Images unrelated to the product or audience.
- Assets that dominate the page without communicating anything.

If generated assets are allowed:
- Specify exact subject, style, composition, aspect ratio, and usage.
- Avoid fake product screenshots unless clearly presented as conceptual.
- Ensure generated assets do not create legal, brand, or realism problems.

Step 12 - Accessibility, responsiveness, and performance plan
Define the QA bar the implementation must meet.

Accessibility:
- WCAG AA contrast, normally 4.5:1 for body text.
- Visible focus states.
- Semantic headings and landmarks.
- Keyboard access for interactive controls.
- Reduced motion support.
- No essential content hidden behind hover-only interactions.

Responsive:
- Desktop composition fully realized.
- Tablet handled if relevant.
- Mobile simplified but still designed.
- No overlapping text.
- No clipped buttons.
- Stable dimensions for fixed-format elements.
- Touch targets large enough.

Performance:
- Avoid heavy animation libraries unless needed and approved.
- Keep image sizes reasonable.
- Prefer transform/opacity animations.
- Watch for layout shift.
- Watch for hydration issues in Next.js.
- Run available build/lint/test commands.

Step 13 - Implementation risk register
List the top risks before implementation:
- Risk.
- Why it matters.
- How implementation will avoid it.
- How review will verify it.

Include at least:
- copy preservation
- scope creep
- readability over imagery/motion
- responsive overlap
- animation cleanup
- dependency/bundle risk
- asset reliability

Step 14 - Output only the plan
Return exactly these sections:

1. Repo Truth.
2. Scope Contract.
3. Skills Read And Applied.
4. Anti-Template Diagnosis.
5. Creative Thesis.
6. Extraordinary Directive Decisions.
7. Scene Map.
8. Visual Token Plan.
9. Framework Architecture Plan.
10. Motion And Interaction Plan.
11. Asset Plan.
12. Accessibility, Responsive, And Performance QA Plan.
13. Implementation Risk Register.
14. Expected File Changes.
15. Blocking Questions, if any.
16. Approval Question: "Do you approve this plan before I implement?"

Do not create or edit implementation files until the plan is approved.
```

