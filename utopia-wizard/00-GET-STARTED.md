# Get Started

Use this file when someone asks: "How do I run this wizard?"

## 1. Collect The Inputs

Open the wizard files in order and answer them in plain text. Keep the answers short when the project is simple, but do not skip the hard parts: repo rules, framework, content preservation, visual direction, and what "extraordinary" means for this specific product.

Required order:

1. `wizard/01-project-type.md`
2. `wizard/02a-new-project-brief.md` if starting fresh
3. `wizard/02b-refactor-brief.md` if improving an existing site
4. `wizard/03-color-scheme.md`
5. `wizard/04-summary-approval.md`

## 2. Ask For Repo Rules Before Work

Before sending build prompts to a coder, ask the owner:

```text
What are the repo rules?
- Package manager: npm, pnpm, yarn, bun, or plain static files?
- Framework/version: React, Next.js app router, Next.js pages router, Vite, static HTML?
- Can dependencies be added? If yes, which ones are allowed?
- Which files or folders must not be touched?
- Is there existing copy that must be preserved exactly?
- What command runs the app, lints it, tests it, and builds it?
- Are there brand colors, fonts, assets, or legal requirements?
```

If the owner does not know, instruct the coder to infer the rules from lockfiles, package scripts, config files, and existing patterns.

## 3. Generate Prompt 1

Fill `prompts/PROMPT_1_skill_setup.md` with the wizard answers. Send it first.

Prompt 1 must end with an approval gate. The coder should research, inspect, plan, and ask for approval. The coder must not build the page yet.

## 4. Generate Prompt 2

Choose exactly one second-stage prompt:

- New React project: `prompts/PROMPT_2A_build_new_react.md`
- New Next.js project: `prompts/PROMPT_2A_build_new_nextjs.md`
- New static HTML project: `prompts/PROMPT_2A_build_new_html.md`
- Existing React refactor: `prompts/PROMPT_2B_refactor_react.md`
- Existing Next.js refactor: `prompts/PROMPT_2B_refactor_nextjs.md`
- Existing static HTML refactor: `prompts/PROMPT_2B_refactor_html.md`

Use `PROMPT_2A_build_new.md` or `PROMPT_2B_insa_refactor.md` only as routers when the framework is not yet known.

## 5. Generate Prompt 3

After the build/refactor, send `prompts/PROMPT_3_review.md`. The review prompt is intentionally strict. It should find issues, repair them, and report what changed.

## 6. Save Filled Prompts

Write filled prompts into `generated/` using this naming pattern:

```text
generated/YYYY-MM-DD_project-name_01_skill-setup.md
generated/YYYY-MM-DD_project-name_02_build-or-refactor.md
generated/YYYY-MM-DD_project-name_03_review.md
```

## 7. Approval Gates

Do not skip approval between Prompt 1 and Prompt 2. That gate prevents the coder from building a flashy but messy UI before the architecture, constraints, and creative thesis are clear.

