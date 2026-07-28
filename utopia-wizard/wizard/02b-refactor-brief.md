# 02B Refactor Brief

Use this branch when the project already exists and needs to stop looking generic, boring, or AI-made.

## Scope

Choose one:

```text
A. Entire site
The coder may redesign the full page/site while preserving repo rules and required content.

B. Single section only
The coder may redesign only the named section.
```

Fill:

```text
Route/page:
Section name if single-section:
Known component/file path:
Can adjacent section transitions be changed: yes/no
Can shared hooks/styles/tokens be edited: yes/no
Can dependencies be added: yes/no
```

## Content Preservation

For refactors, preservation is strict by default.

```text
Must preserve all headings exactly: yes/no
Must preserve all body copy exactly: yes/no
Must preserve CTA labels exactly: yes/no
Must preserve content order exactly: yes/no
Can images be replaced: yes/no
Can layout be radically changed: yes/no
```

If the answer is unclear, the coder must preserve every word and the information hierarchy.

## Current Diagnosis

Be honest. The coder needs the problem, not politeness.

```text
What looks AI-made:
What looks generic:
What feels boring:
What is technically messy:
What must remain because it already works:
Which competitor/template does it accidentally resemble:
```

## Extraordinary Direction

If refactoring the whole site, pick 2 or 3. If refactoring one section, pick exactly 1 and perfect it.

```text
1. Break expected layout
2. Break visual expectations
3. Fake-out ending
4. Special cursor behavior
5. Deliberate silence
6. Breaking the frame
7. Unusual scroll feel
```

For each selected direction:

```text
Directive:
Why this exact project/section needs it:
What should change visually:
What must not change:
How readability will remain protected:
```

## Architecture Boundaries

```text
Existing component structure:
Where styles live:
Where motion code lives:
Where data/content lives:
State management rules:
Files the coder may edit:
Files the coder must not edit:
```

If single-section mode is selected, the coder may inspect parent files only to understand imports and boundaries. Edits must stay inside the approved scope unless the owner approves a broader change.

## Output From This Step

Record:

```text
Refactor scope:
Preservation rules:
Current diagnosis:
Creative directive(s):
Allowed files:
Architecture rules:
```

Continue to `03-color-scheme.md`.

