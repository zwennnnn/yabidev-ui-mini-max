# Utopia Wizard

Utopia Wizard turns a vague UI request into a disciplined prompt sequence for building or refactoring an experimental, award-level web interface. Its default standard is simple: even if the starting repo is weak, generic, or obviously AI-made, the final result should feel intentionally art-directed, technically clean, readable, responsive, and hard to dismiss.

This is not a landing page prompt dump. It is a guided system for asking the right questions, choosing the right framework prompt, and forcing the coder through architecture, build, and jury review passes.

## The Three Prompt System

1. `PROMPT_1_skill_setup.md`
   Research the needed skills, inspect the repo, select the design/motion/architecture rules, and produce an implementation plan. No UI is built in this step.

2. `PROMPT_2A_build_new_*` or `PROMPT_2B_refactor_*`
   Build from scratch or refactor an existing project. React, Next.js, and static HTML have separate variants because their architecture and failure modes are different.

3. `PROMPT_3_review.md`
   Run the jury round: design critique, accessibility, responsiveness, performance, architecture fidelity, and repair pass.

## Folder Map

- `00-GET-STARTED.md` explains the complete manual workflow.
- `wizard/` contains the questions to ask before generating prompts.
- `prompts/` contains copy-ready master prompts.
- `generated/` is where filled prompts can be written by a future script or by hand.

## Core Standard

Every output created through this wizard must obey these rules:

- Do not ship generic hero, feature-grid, testimonial, CTA templates unless the user explicitly asks for a conventional business page.
- Preserve user-provided copy exactly when refactoring.
- Keep component boundaries cleaner after the change than before it.
- Treat readability as non-negotiable: WCAG AA contrast, stable text layout, no motion that hides meaning.
- Use a real visual system: tokens, spacing logic, typography logic, asset strategy, and responsive behavior.
- Prefer a few perfected unusual ideas over many half-built effects.
- Verify with real local checks when possible: build, lint, screenshot, mobile viewport, broken assets, console errors.

## How To Use

Start with [00-GET-STARTED.md](./00-GET-STARTED.md). Answer each wizard file in order, then fill the selected prompt templates.

The most common path is:

1. `wizard/01-project-type.md`
2. `wizard/02a-new-project-brief.md` or `wizard/02b-refactor-brief.md`
3. `wizard/03-color-scheme.md`
4. `wizard/04-summary-approval.md`
5. `prompts/PROMPT_1_skill_setup.md`
6. One `PROMPT_2A_*` or `PROMPT_2B_*` framework prompt
7. `prompts/PROMPT_3_review.md`

