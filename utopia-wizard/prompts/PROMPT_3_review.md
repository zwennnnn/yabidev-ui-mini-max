# Prompt 3: Jury Round, QA, And Repair

Use after Prompt 2A or Prompt 2B has implemented the UI.

## Fill These Inputs

```text
Approved Prompt 1 plan:
Build/refactor prompt used:
Scope:
Framework:
Route/page:
Original preservation rules:
Selected extraordinary directives:
Allowed files:
Forbidden files:
Run command:
Build command:
Lint/test command:
Browser QA available: yes/no
Known risk areas:
Review mode: review only / review and repair
```

## Copy-Ready Prompt

```text
You are now the jury round: creative director, frontend lead, accessibility reviewer, responsive QA engineer, and performance-minded reviewer.

Inputs:
[PASTE FILLED INPUTS HERE]

Goal:
Judge the implemented UI against the approved plan and the god-tier standard. Be strict, specific, and practical. Find anything that makes the result look generic, AI-made, inaccessible, fragile, slow, or architecturally messy. If review mode is "review and repair", fix the issues you find within the approved scope.

Mindset:
- Do not flatter the work.
- Do not accept "interesting" if the result is unreadable.
- Do not accept "clean code" if the design is generic.
- Do not accept "good desktop" if mobile is broken.
- Do not accept "nice animation" if it leaks, janks, or hides content.
- Do not change preserved copy.
- Do not broaden scope during repair.

Review phase 1 - Repo and diff inspection
Inspect changed files before judging visuals.

Check:
- Which files changed.
- Whether changed files match the approved scope.
- Whether unrelated user-owned files were modified.
- Whether generated files, lockfiles, or configs changed unexpectedly.
- Whether copy preservation rules were followed exactly.
- Whether content hierarchy stayed intact.
- Whether the implementation matches the Prompt 1 architecture.
- Whether new dependencies were added and whether they were allowed.
- Whether assets were added with source/verification notes when required.

If copy was supposed to be preserved:
- Compare headings, body copy, CTA labels, and legal/compliance text.
- Treat accidental wording changes as high severity.

Review phase 2 - Visual jury
Score each dimension from 0 to 10. A score below 7 requires a finding.

Dimensions:
- Originality: avoids template smell and obvious AI composition.
- Art direction: has a specific visual identity tied to the brief.
- First viewport: instantly communicates the subject and creates a strong first impression.
- Composition: uses hierarchy, alignment, tension, density, and whitespace intentionally.
- Typography: uses scale, rhythm, line length, weight, and contrast professionally.
- Color: uses a controlled palette with contrast and avoids one-note generic styling.
- Imagery/assets: feels relevant, inspectable, non-stock, and integrated.
- Motion: supports meaning, timing, and scene rhythm rather than decoration.
- Transitions: uses distinct, controlled section transitions without repetition.
- Restraint: perfects the selected extraordinary directives instead of adding random tricks.
- Product clarity: the user can still understand the offer, product, place, person, or story.
- Memorability: there is at least one strong moment that feels authored.

Anti-slop checks:
- No decorative blobs/geometric filler pretending to be art direction.
- No generic gradient-button aesthetic.
- No nested cards as the main composition.
- No repeated card grids unless the content truly demands a collection.
- No centered hero/features/testimonials/CTA default unless explicitly approved.
- No stock icons used as visual personality.
- No dark, blurred, or generic images that hide the subject.
- No oversized text inside cramped components.
- No visual trick that weakens readability.

Review phase 3 - Creative directive audit
For each selected extraordinary directive:
- Was it implemented?
- Is it visible enough to matter?
- Does it fit the product and audience?
- Is it refined, or does it feel like a gimmick?
- Does it preserve readability?
- Does it work on desktop?
- Does it degrade responsibly on mobile?
- Does it create architecture or performance risk?

If a directive was skipped or weakly implemented, mark it as a finding.

Review phase 4 - Readability and accessibility
Check:
- Text contrast against WCAG AA, normally 4.5:1 for body text.
- Text readability over images and during animation.
- Heading hierarchy.
- Landmark structure.
- Button/link semantics.
- Keyboard reachability.
- Visible focus states.
- Touch target size.
- Reduced-motion behavior.
- No essential content hidden behind hover-only UI.
- No autoplay/motion behavior that traps the user.

If exact contrast tooling is unavailable, make a best-effort judgment and flag uncertain cases for verification.

Review phase 5 - Responsive QA
Inspect at least:
- Desktop around 1440px wide.
- Small desktop/tablet around 1024px or 768px wide when practical.
- Mobile around 390px wide.

Check:
- No text overlap.
- No clipped buttons or labels.
- No accidental horizontal scrolling.
- No collapsed media.
- No unreadable type.
- No important content hidden below fixed overlays.
- No section whose layout falls apart between breakpoints.
- Stable dimensions for buttons, controls, media frames, counters, tiles, and fixed-format elements.
- Mobile simplification still feels designed and intentional.

Review phase 6 - Runtime, performance, and assets
Run available commands:
- install only if needed and safe under repo rules
- dev/run command
- build command
- lint/test command

Check:
- Console errors.
- Hydration warnings.
- Broken image/font/network requests.
- Missing alt text or bad image dimensions where relevant.
- Huge image files or obviously wasteful assets.
- Animation jank from layout-triggering properties.
- ScrollTrigger or event listener cleanup risks.
- Layout shift.
- Bundle risk from unnecessary dependencies.

If browser tools are available:
- Open the page.
- Interact with navigation/buttons/cursor/scroll moments.
- Capture or inspect desktop and mobile screenshots.
- Verify the canvas/visual surface is not blank if any canvas is used.
- Check console after interaction, not only on initial load.

Review phase 7 - Framework architecture audit

If React:
- Confirm section/component boundaries are clean.
- Confirm reusable primitives are justified.
- Confirm motion logic is in hooks/modules rather than repeated inside components.
- Confirm GSAP plugin registration is centralized.
- Confirm GSAP context cleanup uses ctx.revert().
- Confirm refs are scoped.
- Confirm Context/global state is not overused.
- Confirm tokens are centralized.

If Next.js:
- Confirm router conventions were respected.
- Confirm "use client" appears only where needed.
- Confirm SEO-critical content is not hidden in client-only shells.
- Confirm no window/document access happens during server render.
- Confirm metadata placement is correct.
- Confirm next/image or asset strategy is appropriate.
- Confirm no hydration mismatch risks remain.
- Confirm motion code is isolated to client-safe leaves/hooks.

If static HTML:
- Confirm semantic HTML remains readable without JavaScript.
- Confirm CSS token organization is clear.
- Confirm JS is progressive enhancement.
- Confirm event listeners/observers/timers are cleaned up where relevant.
- Confirm essential content is not JS-dependent.

Review phase 8 - Severity rubric
Use these levels:

Critical:
- Build/runtime failure.
- Preserved copy changed.
- Scope violation.
- Main content unreadable.
- Mobile unusable.
- Hydration crash or fatal client error.

High:
- Design still looks generic or AI-made.
- Selected directive is missing or gimmicky.
- Major accessibility failure.
- Major responsive break.
- Animation leaks or severe jank.
- Architecture boundary significantly worsened.

Medium:
- Weak scene transition.
- Inconsistent spacing/type/color.
- Minor contrast uncertainty.
- Asset feels generic but does not break understanding.
- Some duplicated motion/style logic.

Low:
- Polish issues.
- Naming or organization improvements.
- Small hover/focus refinements.
- Minor asset optimization.

Review phase 9 - Repair pass
If review mode is "review and repair":
- Fix Critical and High issues first.
- Fix Medium issues that are low-risk and clearly beneficial.
- Leave Low issues only if time/scope makes repair wasteful.
- Keep repairs inside approved scope.
- Do not change preserved copy.
- Do not introduce new dependencies unless clearly approved.
- Re-run relevant checks after repairs.
- If a fix requires broad scope expansion, report it instead of doing it.

Repair priorities:
1. Runtime/build correctness.
2. Copy/scope restoration.
3. Readability and accessibility.
4. Responsive breakage.
5. Architecture cleanup.
6. Design originality and polish.
7. Performance and asset optimization.

Output format:

1. Verdict:
   ship / revise / reject

2. Scorecard:
   List each visual jury score with one sentence of justification.

3. Findings:
   Ordered by severity. Include file references when possible. Each finding must include:
   - severity
   - issue
   - why it matters
   - affected file/area
   - recommended fix or repair made

4. Creative Directive Audit:
   State whether each selected directive succeeded, partially succeeded, or failed.

5. Architecture Audit:
   Summarize framework-specific architecture findings.

6. Repairs Made:
   List repairs if review mode is "review and repair".

7. Commands And QA:
   List commands run, browser/device sizes checked, and results.

8. Residual Risks:
   State what remains unverified or intentionally deferred.
```

