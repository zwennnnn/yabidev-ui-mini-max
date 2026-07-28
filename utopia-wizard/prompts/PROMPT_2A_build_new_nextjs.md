# Prompt 2A Next.js: Build A New God-Tier Landing Page

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
Next.js router if known: app router / pages router / hybrid / unknown
Run/build/lint/test commands:
```

## Copy-Ready Prompt

```text
You are implementing the approved Next.js architecture plan. Build a complete, functional, extraordinary landing page that feels art-directed, fast, accessible, SEO-aware, and framework-native.

Inputs:
[PASTE FILLED INPUTS HERE]

Implementation mandate:
- This is implementation, not another high-level proposal.
- Follow the approved Prompt 1 plan unless repo evidence proves a change is necessary.
- If you must diverge, state the reason and choose the smallest compatible alternative.
- Preserve any supplied copy exactly unless the inputs explicitly allow copy edits.
- Do not stop at a partial mockup. Deliver a working page in the repo.

Preflight:
1. Inspect Next.js version, package scripts, dependencies, source root, and router type.
2. Determine app router, pages router, or hybrid by repo evidence.
3. Identify existing styling: Tailwind, globals.css, CSS modules, Sass, CSS-in-JS, or component library.
4. Identify existing font/image strategy.
5. Identify existing client components and motion libraries.
6. Check for dirty/unrelated files and do not revert or overwrite user work.

Next.js architecture rules:
- Respect the existing router and directory structure.
- App router: prefer server components for page structure and static content.
- Pages router: follow existing pages/components conventions.
- Use "use client" only for interactive leaf components that need browser APIs, refs, GSAP, event listeners, or live state.
- Do not mark the entire page as client-side unless the repo architecture already requires it.
- Do not access window/document/localStorage/matchMedia during server render.
- Avoid hydration mismatch from dates, random values, viewport reads, animation initial state, or conditional client-only markup.
- Keep SEO-critical copy server-rendered when possible.
- Metadata belongs in app metadata exports, head.tsx where applicable, or next/head for pages router.
- Use next/font or the existing font system when possible.
- Use next/image for local or configured remote images when appropriate.
- Configure remotePatterns only if remote images are necessary and approved.
- Dynamic import browser-heavy animation modules only if it improves hydration safety or bundle cost.

Component and motion rules:
- Sections live under components/sections/[SectionName]/ or the existing equivalent.
- Server section shells may pass copy/content into client motion leaves.
- Client motion components should be small and isolated.
- GSAP registration belongs in a shared client-safe module.
- GSAP contexts must use useLayoutEffect or an isomorphic layout-effect helper and cleanup with ctx.revert().
- Use refs scoped to components.
- Do not create global context unless state is genuinely cross-cutting.
- Do not hide essential content inside animation-only client components.

Design-token rules:
- Create or extend centralized tokens before section styling.
- Token groups must include color, typography, spacing, layout width, radius, motion, overlays, focus, and z-index.
- Use globals.css, Tailwind config, CSS variables, or the repo's existing design system.
- No scattered hard-coded hex values.
- No viewport-width font scaling.
- Maintain readable line lengths.
- Avoid one-hue palettes and overused purple-blue gradients, beige monotones, dark slate SaaS defaults, brown espresso themes, and generic neon cyberpunk unless explicitly required.

Creative standard:
- Awwwards/FWA-level portfolio piece is the target. "Looks nice" is not enough.
- Build the page as a sequence of scenes with distinct purpose, rhythm, and visual identity.
- Use only the approved extraordinary directives. Perfect a few ideas instead of scattering tricks everywhere.
- Each chosen directive must have a reason tied to the product, audience, or message.
- The first viewport must clearly signal the product, brand, place, person, or object.
- Avoid the predictable centered hero, features grid, testimonial strip, CTA block formula unless the brief explicitly asks for it.

Scene construction:
For each section:
- Preserve or create the required content hierarchy.
- Give the section a role: opening signal, proof, contrast, pause, reveal, conversion, or closing scene.
- Define how the viewer's eye moves through the composition.
- Use stable constraints: max widths, grid tracks, aspect ratios, and fixed control dimensions where needed.
- Ensure mobile layout is intentionally simplified.
- Do not put UI cards inside UI cards.
- Do not use decorative blobs, generic shapes, or stock icons as filler.

Motion and interaction:
- Motion must serve scene logic.
- Use transform and opacity whenever possible.
- Avoid animating layout-triggering properties.
- Use pinning/scrub only where it adds meaning and does not fight native scroll.
- Do not repeat the same transition technique between every section.
- Add reduced-motion behavior for all major animations.
- Keep hover, focus, tap, and keyboard states coherent.
- If using a custom cursor, disable or adapt it on touch devices and preserve focus cues.
- If using text animation, keep text readable before, during, and after animation.

Asset sourcing:
- Use provided assets first when they are good enough.
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
- Desktop: fully realize the composition and motion idea.
- Tablet: preserve hierarchy and avoid awkward mid-width collisions.
- Mobile: simplify layout and motion while keeping identity.
- Confirm no overlapping text, clipped buttons, unreadable type, accidental horizontal scrolling, or collapsed media.
- Use stable dimensions for buttons, controls, media frames, counters, and fixed-format elements.

Implementation phases:
1. Create/update tokens and global base styles.
2. Implement the page route in app/page.*, src/app/page.*, pages/index.*, or the existing route.
3. Create server-rendered section shells where possible.
4. Create small client motion leaves for browser-only behavior.
5. Add assets with verification records if assets are sourced.
6. Add metadata and image/font configuration if needed.
7. Add responsive and reduced-motion rules.
8. Run formatting if the repo has a formatter.
9. Run dev/build/lint/test commands.
10. Inspect browser console and desktop/mobile viewports if browser tools are available.

Self-review before final:
- Does the first viewport instantly communicate what this is?
- Does any section look like a generic AI landing page?
- Are the chosen extraordinary directives visible and justified?
- Is every line of text readable?
- Are server/client boundaries clean?
- Are hydration risks controlled?
- Are tokens centralized?
- Does mobile still feel designed?

Final report:
- State which extraordinary directives you implemented and why.
- Summarize the scene structure.
- List created/edited files.
- Explain Next.js architecture: router, server/client boundaries, metadata, image/font handling, motion cleanup, state ownership, and tokens.
- List asset URLs, curl status checks, and local filenames if assets were sourced.
- Report run/build/lint/test commands and results.
- Mention anything not verified.
```

