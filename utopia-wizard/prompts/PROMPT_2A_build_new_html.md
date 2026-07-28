# Prompt 2A HTML: Build A New God-Tier Static Landing Page

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
Allowed libraries/CDNs:
Forbidden libraries/CDNs:
Repo rules:
Local server/build commands:
```

## Copy-Ready Prompt

```text
You are implementing the approved static HTML architecture plan. Build a complete, functional, extraordinary landing page with semantic HTML, disciplined CSS, and minimal JavaScript. The result must feel intentionally art-directed, not like a generated template.

Inputs:
[PASTE FILLED INPUTS HERE]

Implementation mandate:
- This is implementation, not another high-level proposal.
- Follow the approved Prompt 1 plan unless repo evidence proves a change is necessary.
- If you must diverge, state the reason and choose the smallest compatible alternative.
- Preserve any supplied copy exactly unless the inputs explicitly allow copy edits.
- Do not introduce React, Next.js, or another framework unless explicitly approved.
- Do not stop at a partial mockup. Deliver a working static page in the repo.

Preflight:
1. Inspect the existing file structure and determine whether this is plain static, bundler-backed, or a one-file prototype.
2. Identify existing CSS and JS organization.
3. Identify whether external CDNs/libraries are allowed.
4. Identify how the page should be opened or served locally.
5. Check for dirty/unrelated files and do not revert or overwrite user work.

Recommended structure:
- index.html
- assets/css/tokens.css
- assets/css/base.css
- assets/css/sections.css
- assets/js/main.js
- assets/js/scene-motion.js
- assets/img/

Use the existing repo structure if it is already clear. Do not create needless folders for a tiny one-page static site.

Semantic architecture rules:
- Essential content must be readable without JavaScript.
- Use landmarks: header, main, section, footer where appropriate.
- Use a logical heading hierarchy.
- Use buttons for actions and links for navigation.
- Do not bury meaningful text inside canvas, images, or animation-only markup.
- Keep JavaScript as progressive enhancement.
- If JS fails, the page should still communicate the offer and content.

CSS architecture rules:
- Create or extend centralized tokens before section styling.
- Token groups must include color, typography, spacing, layout width, radius, motion, overlays, focus, and z-index.
- Use custom properties in :root or assets/css/tokens.css.
- Keep base/reset styles separate from section composition if the repo size justifies it.
- Use stable constraints: max widths, grid tracks, aspect ratios, and fixed control dimensions where needed.
- No scattered hard-coded hex values.
- No viewport-width font scaling.
- Maintain readable line lengths.
- Avoid one-hue palettes and overused purple-blue gradients, beige monotones, dark slate SaaS defaults, brown espresso themes, and generic neon cyberpunk unless explicitly required.

JavaScript rules:
- Add JavaScript only where interaction or motion needs it.
- Split motion code into a small module if it becomes non-trivial.
- Use GSAP only if approved by repo rules or already present.
- Clean up event listeners, observers, timers, and animation instances.
- Use IntersectionObserver or scroll listeners carefully.
- Avoid scroll hijacking that traps or confuses users.
- Respect prefers-reduced-motion.

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
- Ensure mobile layout is intentionally simplified.
- Do not put UI cards inside UI cards.
- Do not use decorative blobs, generic shapes, or stock icons as filler.

Motion and interaction:
- Motion must serve scene logic.
- Use transform and opacity whenever possible.
- Avoid animating layout-triggering properties.
- Use sticky/pinned moments only where they add meaning and degrade cleanly.
- Do not repeat the same transition technique between every section.
- Add reduced-motion behavior for all major animations.
- Keep hover, focus, tap, and keyboard states coherent.
- If using text animation, keep text readable before, during, and after animation.

Asset sourcing:
- Use provided assets first when they are good enough.
- If external assets are allowed, use Unsplash/Pexels or approved providers.
- Verify each candidate URL with:
  curl -o /dev/null -s -w "%{http_code}\n" [URL]
- Keep only 200 responses.
- Download assets locally when practical.
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
1. Create/update tokens and base CSS.
2. Write semantic HTML structure.
3. Build section CSS from the approved scene map.
4. Add progressive JS motion/interaction only where needed.
5. Add assets with verification records if assets are sourced.
6. Add responsive and reduced-motion rules.
7. Run or open the page locally.
8. Inspect browser console and desktop/mobile viewports if browser tools are available.

Self-review before final:
- Does the first viewport instantly communicate what this is?
- Does any section look like a generic AI landing page?
- Are the chosen extraordinary directives visible and justified?
- Is every line of text readable?
- Is the HTML semantic without JavaScript?
- Are CSS tokens centralized?
- Does mobile still feel designed?

Final report:
- State which extraordinary directives you implemented and why.
- Summarize the scene structure.
- List created/edited files.
- Explain semantic HTML, CSS organization, JS organization, reduced motion, and tokens.
- List asset URLs, curl status checks, and local filenames if assets were sourced.
- Report local open/server/build checks and results.
- Mention anything not verified.
```

