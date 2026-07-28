# Prompt 2A React: Build A New God-Tier Landing Page

Use after Prompt 1 is approved.

## Fill These Inputs

```text
Approved Prompt 1 plan:
Project name:
Landing page subject:
Audience:
Required copy:
Copy may be edited: yes/no
Primary conversion/action:
Theme/palette:
Typography direction:
Selected extraordinary directives:
Scene map:
Asset rules:
Allowed dependencies:
Forbidden dependencies:
Repo rules:
Run/build/lint/test commands:
```

## Copy-Ready Prompt

```text
You are implementing the approved React architecture plan. Build a complete, functional, extraordinary landing page that feels art-directed by a top digital studio and engineered by a disciplined frontend team.

Inputs:
[PASTE FILLED INPUTS HERE]

Implementation mandate:
- This is implementation, not another high-level proposal.
- Follow the approved Prompt 1 plan unless repo evidence proves a change is necessary.
- If you must diverge, state the reason and choose the smallest compatible alternative.
- Preserve any supplied copy exactly unless the inputs explicitly allow copy edits.
- Do not stop at a partial mockup. Deliver a working page in the repo.

Preflight:
1. Inspect package scripts, dependencies, source root, styling approach, and existing conventions.
2. Confirm whether the repo uses JavaScript or TypeScript, CSS files, CSS modules, Tailwind, Sass, or another styling system.
3. Confirm whether GSAP or other motion tools are already installed.
4. Confirm how the app is run locally.
5. Check for dirty/unrelated files and do not revert or overwrite user work.

Architecture rules:
- Use the existing source root and naming style.
- Create sections under /src/components/sections/[SectionName]/index.jsx or the closest existing equivalent.
- Keep each section responsible for its own markup and presentational composition.
- Shared primitives go under /src/components/ui/ only if they are genuinely reused.
- Shared content/data goes under /src/data/ only if it keeps components cleaner.
- Motion logic belongs in /src/hooks/ or a clearly named local motion module.
- Components should not contain repeated GSAP setup.
- GSAP plugin registration belongs in one shared /src/lib/gsap.js file or the existing equivalent.
- GSAP contexts must use useLayoutEffect and cleanup with ctx.revert().
- Use refs scoped to sections; avoid document-wide selectors when component refs work.
- Use Context only for genuinely cross-cutting behavior such as global cursor mode, scroll progress, or theme.
- Do not leak local section state into unrelated components for animation convenience.
- After implementation, the code should be easier to read than a one-file AI demo.

Design-token rules:
- Create or extend centralized tokens before writing section-specific styles.
- Token groups must include color, typography, spacing, layout width, radius, motion, overlays, focus, and z-index.
- No scattered hard-coded hex values.
- No one-off magic spacing values unless they are local, explained by composition, and not repeated.
- Do not scale font-size with viewport width.
- Maintain readable line lengths.
- Avoid one-hue palettes and overused purple-blue gradients, beige monotones, dark slate SaaS defaults, brown espresso themes, and generic neon cyberpunk unless explicitly required.

Creative standard:
- Awwwards/FWA-level portfolio piece is the target. "Looks nice" is not enough.
- Build the page as a sequence of scenes with distinct purpose, rhythm, and visual identity.
- Use only the approved extraordinary directives. Perfect a few ideas instead of scattering tricks everywhere.
- Each chosen directive must have a reason tied to the product, audience, or message.
- The first viewport must clearly signal the product, brand, place, person, or object. Do not hide the subject behind abstract decoration.
- The final page must avoid the predictable centered hero, features grid, testimonial strip, CTA block formula unless the brief explicitly asks for a conventional commercial page.

Scene construction:
For each section:
- Preserve or create the required content hierarchy.
- Give the section a visual role: opening signal, proof, contrast, pause, reveal, conversion, or closing scene.
- Define how the viewer's eye moves through the composition.
- Use stable layout constraints: max widths, grid tracks, aspect ratios, and fixed control dimensions where needed.
- Ensure mobile layout is simplified intentionally, not just stacked by accident.
- Do not put UI cards inside UI cards.
- Do not use decorative blobs, generic shapes, or stock icons as filler.

Motion and interaction:
- Motion must serve scene logic.
- Use transform and opacity whenever possible.
- Avoid animating layout-triggering properties.
- Use pinning/scrub only where it adds meaning.
- Do not trap the user in scroll effects.
- Do not repeat the same transition technique between every section.
- Add reduced-motion behavior for all major animations.
- Keep hover, focus, tap, and keyboard states coherent.
- If using a custom cursor, provide normal behavior on touch devices and do not hide focus cues.
- If using text animation, keep text readable before, during, and after animation.

Asset sourcing:
- Use provided assets first when they are good enough.
- If external assets are allowed, use Unsplash/Pexels or approved providers.
- Verify each candidate URL with:
  curl -o /dev/null -s -w "%{http_code}\n" [URL]
- Keep only 200 responses.
- Download assets locally when the repo expects local assets or when remote loading is fragile.
- Record source URL, local filename, usage, and reason for selection.
- Reject stock-like, dark/blurred, generic, or unrelated visuals.

Accessibility:
- Meet WCAG AA contrast, normally 4.5:1 for body text.
- Keep text readable over imagery with a flat, reliable overlay or separate text surface when needed.
- Preserve semantic headings and landmarks.
- Ensure interactive elements are keyboard reachable.
- Keep focus states visible.
- Respect prefers-reduced-motion.
- Do not make essential information hover-only.

Responsive requirements:
- Desktop: fully realize the composition and motion idea.
- Tablet: preserve hierarchy and avoid awkward mid-width collisions.
- Mobile: simplify layout and motion while keeping identity.
- Confirm no overlapping text, clipped buttons, unreadable type, accidental horizontal scrolling, or collapsed media.
- Use stable dimensions for buttons, controls, media frames, counters, and fixed-format elements.

Implementation phases:
1. Create/update tokens and global base styles.
2. Create shared utilities/primitives only when needed.
3. Build section components from the approved scene map.
4. Add motion hooks and GSAP setup with cleanup.
5. Add assets with verification records if assets are sourced.
6. Wire sections into the page/app entry.
7. Add responsive and reduced-motion rules.
8. Run formatting if the repo has a formatter.
9. Run the app and available build/lint/test commands.
10. Inspect the result in desktop and mobile viewports if browser tools are available.

Self-review before final:
- Does the first viewport instantly communicate what this is?
- Does any section look like a generic AI landing page?
- Are the chosen extraordinary directives visible and justified?
- Is every line of text readable?
- Are component boundaries clean?
- Are GSAP contexts cleaned up?
- Are tokens centralized?
- Does mobile still feel designed?

Final report:
- State which extraordinary directives you implemented and why.
- Summarize the scene structure.
- List created/edited files.
- Explain React architecture: section boundaries, hooks, GSAP registration, cleanup, state ownership, and tokens.
- List asset URLs, curl status checks, and local filenames if assets were sourced.
- Report run/build/lint/test commands and results.
- Mention anything not verified.
```

