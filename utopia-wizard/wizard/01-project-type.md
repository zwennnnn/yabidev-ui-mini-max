# 01 Project Type

Answer this first. The wizard branches from here.

## Main Choice

Choose one:

```text
A. New project
The coder will create a new landing page or web experience from scratch.

B. Refactor existing project
The coder will improve an existing React, Next.js, or static HTML site.
```

## Framework Choice

Choose one:

```text
1. React
Use for Vite, CRA, custom React apps, or component-driven SPAs.

2. Next.js
Use for app router or pages router projects where server/client boundaries, metadata, image optimization, and routing matter.

3. Static HTML
Use for plain HTML/CSS/JS, single-file demos, static prototypes, or no-build sites.

4. Unknown
The coder must inspect the repo and choose the correct prompt variant.
```

## Required Repo Rules

Fill this before the coder edits files:

```text
Package manager:
Run command:
Build command:
Lint/test command:
Allowed dependencies:
Forbidden files/folders:
Existing style system:
Copy preservation required: yes/no
Deployment target:
```

## Quality Target

Choose the intended bar:

```text
1. God-tier experimental
Unusual composition, scene logic, strong art direction, motion identity, and rigorous engineering.

2. Premium commercial
Less strange, still distinctive, polished, high-converting, credible.

3. Fast but elevated
Smaller scope, still avoids AI-looking generic output.
```

Default to `God-tier experimental` unless the project has business, performance, or accessibility constraints that make a quieter direction more appropriate.

## Output From This Step

Record:

```text
Project type:
Framework:
Repo rules:
Quality target:
Next wizard file:
```

If project type is `A`, continue to `02a-new-project-brief.md`.

If project type is `B`, continue to `02b-refactor-brief.md`.

