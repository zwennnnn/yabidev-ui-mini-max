# 04 Summary Approval

Use this file to create the approval checkpoint before generating the actual build/refactor prompt.

## Summary Template

Fill this:

```text
Project name:
Project type: new/refactor
Framework: React/Next.js/static HTML/unknown
Scope:
Repo rules:
Content preservation:
Audience:
Primary action:
Theme and palette:
Typography:
Motion tone:
Selected extraordinary directives:
Asset rules:
Allowed files:
Forbidden files:
Success criteria:
Failure criteria:
```

## Prompt Selection

Choose:

```text
Prompt 1:
prompts/PROMPT_1_skill_setup.md

Prompt 2:
prompts/PROMPT_2A_build_new_react.md
prompts/PROMPT_2A_build_new_nextjs.md
prompts/PROMPT_2A_build_new_html.md
prompts/PROMPT_2B_refactor_react.md
prompts/PROMPT_2B_refactor_nextjs.md
prompts/PROMPT_2B_refactor_html.md

Prompt 3:
prompts/PROMPT_3_review.md
```

## Approval Question

Ask the owner:

```text
Do you approve this direction before the coder starts implementation?
```

If the answer is yes, send Prompt 1.

If the answer is no, revise the wizard answers before implementation.

## Approval Rules

- Prompt 1 can inspect, research, plan, and ask for approval.
- Prompt 2 can implement only after the Prompt 1 plan is approved.
- Prompt 3 can review and repair after implementation.
- If the owner changes scope, return to `01-project-type.md` or the relevant branch file.

