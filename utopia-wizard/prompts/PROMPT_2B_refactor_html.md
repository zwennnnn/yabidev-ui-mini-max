# Prompt 2B HTML: Refactor Existing Static UI Into A God-Tier Experience

Use after Prompt 1 is approved.

## Fill These Inputs

```text
Approved Prompt 1 plan:
Scope: entire site / single page / single section / component family
Section name if single-section:
Known file paths:
Current diagnosis:
Content preservation rules:
Can copy be edited: yes/no
Can content order change: yes/no
Can shared CSS/JS be edited: yes/no
Can adjacent transitions change: yes/no
Theme/palette:
Typography direction:
Selected extraordinary directives:
Asset rules:
Allowed files:
Forbidden files:
Allowed libraries/CDNs:
Forbidden libraries/CDNs:
Repo rules:
Local server/build commands:
```

## Copy-Ready Prompt

```text
You are refactoring an existing static HTML/CSS/JS landing page that currently looks boring, generic, or AI-made. Transform it into an extraordinary, art-directed experience while keeping the page semantic, maintainable, and readable without JavaScript.

Inputs:
[PASTE FILLED INPUTS HERE]

Implementation mandate:
- This is implementation, not another high-level proposal.
- Follow the approved Prompt 1 plan unless repo evidence proves a change is necessary.
- If you must diverge, state the reason and choose the smallest compatible alternative.
- Make the UI significantly less generic and the code cleaner than before.
- Do not introduce React, Next.js, or another framework unless explicitly approved.
- Do not use the refactor as an excuse for an unbounded rewrite.

Initial diagnosis:
Before editing, state:
- Scope: entire site, page, section, or component family.
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
- If single-section mode is selected, edit only the section markup and approved local CSS/JS.
- You may inspect surrounding files to understand structure, but do not edit them unless approved.
- Shared CSS/JS may be edited only if listed as allowed or the change is impossible without them.
- Do not touch unrelated pages, generated files, lockfiles, or config unless the approved plan requires it.
- Do not revert user changes.

Static architecture fidelity:
- Essential content must be readable without JavaScript.
- Preserve or improve semantic HTML.
- Use landmarks: header, main, section, footer where appropriate.
- Use a logical heading hierarchy.
- Use buttons for actions and links for navigation.
- Do not bury meaningful text inside canvas, images, or animation-only markup.
- Keep JavaScript as progressive enhancement.
- If structure is messy, improve it with focused files such as assets/css/tokens.css, assets/css/base.css, assets/css/sections.css, assets/js/main.js, and assets/js/scene-motion.js.
- Do not create needless folders for a tiny one-page site.

CSS and token rules:
- Identify the existing style system before adding styles.
- Extend centralized tokens instead of scattering one-off values.
- Token groups should cover color, typography, spacing, layout width, radius, motion, overlays, focus, and z-index.
- Use custom properties in :root or an existing token file.
- No scattered hard-coded hex values.
- No viewport-width font scaling.
- Maintain readable line lengths.
- Avoid one-hue palettes and overused purple-blue gradients, beige monotones, dark slate SaaS defaults, brown espresso themes, and generic neon cyberpunk unless explicitly required.
- Remove or neutralize template-like visual cliches if they exist: decorative blobs, generic gradient buttons, icon rows, repetitive cards, centered blocks without composition.

JavaScript rules:
- Add JavaScript only where interaction or motion needs it.
- Split motion code into a small module if it becomes non-trivial.
- Use GSAP only if approved by repo rules or already present.
- Clean up event listeners, observers, timers, and animation instances.
- Use IntersectionObserver or scroll listeners carefully.
- Avoid scroll hijacking that traps or confuses users.
- Respect prefers-reduced-motion.

Creative requirements:
- Entire site/page: select 2 or 3 extraordinary directives and perfect them.
- Single section: select exactly 1 extraordinary directive and perfect it.
- Explain why each directive belongs in this exact project.
- Build scene logic. The refactored area should have identity, rhythm, and a clear visual role.
- If adjacent transitions are in scope, use a transition technique distinct from the rest of the page.
- Use only 2D CSS/JS/GSAP effects unless explicitly approved otherwise.
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
- Use sticky/pinned moments only where they add meaning and degrade cleanly.
- Do not repeat the same transition technique between every section.
- Add reduced-motion behavior for all major animations.
- Keep hover, focus, tap, and keyboard states coherent.
- If using text animation, keep text readable before, during, and after animation.

Asset handling:
- Keep existing assets if they are brand-specific and good enough.
- Replace assets only if allowed.
- If external assets are allowed, use Unsplash/Pexels or approved providers.
- Verify each candidate URL with:
  curl -o /dev/null -s -w "%{http_code}\n" [URL]
- Keep only 200 responses.
- Download local copies when practical.
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
1. Inspect approved files and nearby structure.
2. Record the copy lock mentally before changing visuals.
3. Identify existing tokens/styles and extend them.
4. Refactor markup only where needed.
5. Implement visual composition and responsive CSS.
6. Add progressive JS motion/interaction only where needed.
7. Source/replace assets only if allowed.
8. Open or serve the page locally.
9. Inspect console, desktop, and mobile viewports if browser tools are available.

Self-review before final:
- Did any preserved copy change accidentally?
- Did scope expand?
- Does the refactored area still answer the same user questions?
- Does the UI now have a specific identity?
- Is the chosen directive visible and refined?
- Is every line readable?
- Is the page still meaningful without JavaScript?
- Are CSS/JS boundaries cleaner or at least no worse?
- Does mobile still feel designed?

Final report:
- State scope and chosen directive(s).
- Explain the original diagnosis and how the refactor solves it.
- List created/edited files.
- Confirm copy preservation.
- Explain semantic HTML, CSS organization, JS organization, reduced motion, and tokens.
- List asset URLs, curl status checks, and local filenames if assets were sourced.
- Report local open/server/build checks and results.
- Mention anything not verified.
```

