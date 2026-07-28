# Prompt 2B: Insane Refactor Router

Use this router only when the framework-specific refactor prompt is not yet chosen.

## Decision Rule

```text
React, Vite React, CRA, custom React SPA:
Use PROMPT_2B_refactor_react.md

Next.js app router, pages router, or hybrid:
Use PROMPT_2B_refactor_nextjs.md

Static HTML/CSS/JS, no build system, or single-file prototype:
Use PROMPT_2B_refactor_html.md

Unknown:
The coder must inspect lockfiles, package scripts, config files, and source structure, then choose the correct stack-specific prompt.
```

## What Prompt 2B Must Do

Prompt 2B is a controlled transformation. It must:

- Start with a direct diagnosis of why the existing UI looks generic, boring, or AI-made.
- Lock copy before visual changes.
- Respect the approved scope.
- Preserve architecture and improve code clarity.
- For entire-site work, perfect 2 or 3 extraordinary directives.
- For single-section work, perfect exactly 1 extraordinary directive.
- Avoid broad rewrites unless the approved plan explicitly requires them.
- Remove template-like patterns without breaking content hierarchy.
- Protect readability, contrast, focus, reduced motion, and mobile behavior.
- Run the local app and available build/lint/test checks.
- Report created/edited files, verification results, and unverified risks.

## Do Not Use This As The Final Refactor Prompt

This file is a routing guard. Once the framework is known, send one of the stack-specific prompts.

