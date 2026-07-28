# Prompt 2B Next.js: Refactor Existing UI Into A God-Tier Experience

Use after Prompt 1 is approved.

## Fill These Inputs

```text
Approved Prompt 1 plan:
Scope: entire site / single page / single section / component family
Section name if single-section:
Route/page:
Known file paths:
Current diagnosis:
Content preservation rules:
Can copy be edited: yes/no
Can content order change: yes/no
Can shared tokens/styles/hooks be edited: yes/no
Can adjacent transitions change: yes/no
Theme/palette:
Typography direction:
Selected extraordinary directives:
Asset rules:
Allowed files:
Forbidden files:
Allowed dependencies:
Forbidden dependencies:
Repo rules:
Next.js router if known: app router / pages router / hybrid / unknown
Run/build/lint/test commands:
```

## Copy-Ready Prompt

```text
You are refactoring an existing Next.js landing page that currently looks boring, generic, or AI-made. Transform it into an extraordinary, art-directed experience while preserving the approved scope, exact content rules, and Next.js architecture.

Inputs:
[PASTE FILLED INPUTS HERE]

Implementation mandate:
- This is implementation, not another high-level proposal.
- Follow the approved Prompt 1 plan unless repo evidence proves a change is necessary.
- If you must diverge, state the reason and choose the smallest compatible alternative.
- Make the UI significantly less generic and the code cleaner than before.
- Do not use the refactor as an excuse for an unbounded rewrite.

Initial diagnosis:
Before editing, state:
- Scope: entire site, page, section, or component family.
- Router evidence: app router, pages router, or hybrid.
- Files you expect to touch.
- What makes the current UI look AI-made or generic.
- Which chosen extraordinary directive(s) directly solve that diagnosis.
- What must remain unchanged.

Copy lock:
- Preserve existing text, headings, CTA labels, and copy exactly unless the inputs explicitly allow edits.
- Preserve content hierarchy and information flow unless the inputs explicitly allow reordering.
- If copy changes are allowed, keep them minimal and report every changed phrase.
- If single-section scope is selected, do not change copy outside that section.

Scope discipline:
- If single-section mode is selected, edit only the section file and approved local styles/hooks.
- You may inspect parent/import files to understand boundaries, but do not edit them unless approved.
- Shared files may be edited only if they are listed as allowed or the change is impossible without them.
- Do not touch unrelated components, generated files, lockfiles, or config unless the approved plan requires it.
- Do not revert user changes.

Next.js architecture fidelity:
- Respect app router, pages router, or hybrid evidence.
- App router: keep server components server-side by default.
- Pages router: follow existing pages/components conventions.
- Use "use client" only for interactive leaf components that need browser APIs, refs, GSAP, event listeners, or live state.
- Do not mark the entire page as client-side unless the existing architecture requires it.
- Do not access window/document/localStorage/matchMedia during server render.
- Avoid hydration mismatch from dates, random values, viewport reads, animation initial state, or conditional client-only markup.
- Keep SEO-critical copy server-rendered when possible.
- Metadata belongs in app metadata exports, head.tsx where applicable, or next/head for pages router.
- Use next/font or the existing font system when possible.
- Use next/image for local or configured remote images when appropriate.
- Configure remotePatterns only if remote images are necessary and approved.
- Dynamic import browser-heavy animation modules only if it improves hydration safety or bundle cost.

Component and motion boundaries:
- Keep section responsibilities intact.
- Server section shells may pass copy/content into client motion leaves.
- Client motion components should be small and isolated.
- GSAP registration belongs in a shared client-safe module.
- GSAP contexts must use useLayoutEffect or an isomorphic layout-effect helper and cleanup with ctx.revert().
- Use refs scoped to components.
- Do not create global context unless state is genuinely cross-cutting.
- Do not hide essential content inside animation-only client components.

Design-token and style rules:
- Identify the existing token/style system before adding styles.
- Extend centralized tokens instead of scattering one-off values.
- Token groups should cover color, typography, spacing, layout width, radius, motion, overlays, focus, and z-index.
- No scattered hard-coded hex values.
- No viewport-width font scaling.
- Maintain readable line lengths.
- Avoid one-hue palettes and overused purple-blue gradients, beige monotones, dark slate SaaS defaults, brown espresso themes, and generic neon cyberpunk unless explicitly required.
- Remove or neutralize template-like visual cliches if they exist: decorative blobs, generic gradient buttons, icon rows, repetitive cards, centered blocks without composition.

Creative requirements:
- Entire site/page: select 2 or 3 extraordinary directives and perfect them.
- Single section: select exactly 1 extraordinary directive and perfect it.
- Explain why each directive belongs in this exact project.
- Build scene logic. The refactored area should have identity, rhythm, and a clear visual role.
- If adjacent transitions are in scope, use a transition technique distinct from the rest of the page.
- Use only 2D CSS/GSAP effects unless explicitly approved otherwise.
- Do not add effects that hide or weaken the preserved content.

Refactor tactics:
- Keep what works.
- Remove or simplify what only exists as AI-looking decoration.
- Replace generic symmetry with intentional asymmetry only where readability survives.
- Use scale, rhythm, cropping, whitespace, editorial alignment, and layering before adding complex effects.
- Prefer one strong memorable moment over many weak animated details.
- When preserving copy, let composition carry the transformation.

Motion and interaction:
- Motion must serve scene logic.
- Use transform and opacity whenever possible.
- Avoid animating layout-triggering properties.
- Use pinning/scrub only where it adds meaning.
- Do not trap the user in scroll effects.
- Do not repeat the same transition technique between every section.
- Add reduced-motion behavior for all major animations.
- Keep hover, focus, tap, and keyboard states coherent.
- If using a custom cursor, disable or adapt it on touch devices and preserve focus cues.
- If using text animation, keep text readable before, during, and after animation.

Asset handling:
- Keep existing assets if they are brand-specific and good enough.
- Replace assets only if allowed.
- If external assets are allowed, use Unsplash/Pexels or approved providers.
- Verify each candidate URL with:
  curl -o /dev/null -s -w "%{http_code}\n" [URL]
- Keep only 200 responses.
- Prefer local downloads for reliability unless Next.js remote optimization is clearly configured.
- Record source URL, local filename, usage, and reason for selection.
- Reject stock-like, dark/blurred, generic, or unrelated visuals.

Accessibility:
- Meet WCAG AA contrast, normally 4.5:1 for body text.
- Keep text readable over imagery with reliable overlays or separate surfaces.
- Preserve semantic headings and landmarks.
- Ensure interactive elements are keyboard reachable.
- Keep focus states visible.
- Respect prefers-reduced-motion.
- Do not make essential information hover-only.

Responsive requirements:
- Desktop: fully realize the chosen creative directive(s).
- Tablet: preserve hierarchy and avoid awkward mid-width collisions.
- Mobile: simplify layout and motion while keeping identity.
- Confirm no overlapping text, clipped buttons, unreadable type, accidental horizontal scrolling, or collapsed media.
- Use stable dimensions for buttons, controls, media frames, counters, and fixed-format elements.

Implementation phases:
1. Inspect approved files and nearby architecture.
2. Record the copy lock mentally before changing visuals.
3. Identify existing server/client boundaries.
4. Identify existing tokens/styles and extend them.
5. Refactor markup only where needed.
6. Implement visual composition and responsive CSS.
7. Add client motion leaves/hooks with cleanup.
8. Source/replace assets only if allowed.
9. Run formatting if the repo has a formatter.
10. Run the app and available build/lint/test commands.
11. Inspect console, hydration warnings, desktop, and mobile viewports if browser tools are available.

Self-review before final:
- Did any preserved copy change accidentally?
- Did scope expand?
- Does the refactored area still answer the same user questions?
- Does the UI now have a specific identity?
- Is the chosen directive visible and refined?
- Is every line readable?
- Are server/client boundaries cleaner or at least no worse?
- Are hydration risks controlled?
- Does mobile still feel designed?

Final report:
- State scope and chosen directive(s).
- Explain the original diagnosis and how the refactor solves it.
- List created/edited files.
- Confirm copy preservation.
- Explain Next.js architecture: router, server/client boundaries, metadata, image/font handling, motion cleanup, state ownership, and tokens.
- List asset URLs, curl status checks, and local filenames if assets were sourced.
- Report run/build/lint/test commands and results.
- Mention anything not verified.
```

