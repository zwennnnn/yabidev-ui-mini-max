# Prompt 2A: Build New Project Router

Use this router only when the framework-specific new-project prompt is not yet chosen.

## Decision Rule

```text
React, Vite React, CRA, custom React SPA:
Use PROMPT_2A_build_new_react.md

Next.js app router, pages router, or hybrid:
Use PROMPT_2A_build_new_nextjs.md

Static HTML/CSS/JS, no build system, or single-file prototype:
Use PROMPT_2A_build_new_html.md

Unknown:
The coder must inspect lockfiles, package scripts, config files, and source structure, then choose the correct stack-specific prompt.
```

## What Prompt 2A Must Do

Prompt 2A is implementation, not more planning. It must:

- Reconfirm the approved Prompt 1 plan.
- Refuse to drift from the approved scope without repo evidence.
- Build the actual first screen and full page experience.
- Use framework-native architecture.
- Preserve supplied copy exactly.
- Create or extend design tokens before section styling.
- Build a scene-based page, not a generic section stack.
- Implement only the chosen extraordinary directives.
- Use real, verified visual assets when useful.
- Protect readability, contrast, focus, reduced motion, and mobile behavior.
- Run the local app and available build/lint/test checks.
- Report created/edited files, verification results, and unverified risks.

## Do Not Use This As The Final Build Prompt

This file is a routing guard. Once the framework is known, send one of the stack-specific prompts.

