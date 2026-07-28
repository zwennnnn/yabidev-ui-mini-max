# Prompt System Analysis

This file explains how the original prompt ideas were refactored into a stronger UI creation system.

## Core Diagnosis

The original prompts had the right ambition: make AI stop producing generic landing pages and force it toward high-end, experimental, award-level UI. The weakness was operational depth. A coder could read the old prompts and still fail by:

- starting implementation too early
- ignoring repo structure
- changing preserved copy
- choosing too many visual tricks
- using motion as decoration
- scattering hard-coded colors
- building desktop-only compositions
- missing Next.js server/client boundaries
- treating static HTML like a framework app
- skipping final QA

The upgraded system fixes this by separating the work into three strict phases.

## Prompt 1: Research, Audit, And Architecture

Purpose:
Prompt 1 prevents premature implementation. It forces the coder to understand the repo, available skills, scope, visual problem, architecture, and risk before touching files.

Major upgrades:
- Adds a Repo Truth section based on evidence, not guesses.
- Adds a Scope Contract for allowed files, forbidden files, copy preservation, dependency policy, and adjacent transitions.
- Requires installed skill discovery and instruction reading.
- Adds anti-template diagnosis before choosing visual effects.
- Requires a creative thesis.
- Makes extraordinary directive selection conditional by scope.
- Adds a full scene map.
- Adds design-token planning before styling.
- Adds framework-specific plans for React, Next.js, and static HTML.
- Adds motion, asset, accessibility, responsive, performance, and risk planning.
- Ends with a required approval gate.

Why it matters:
Most bad AI UI starts because the coder builds before it understands the product, repo, and constraints. Prompt 1 now blocks that failure.

## Prompt 2A: Build New

Purpose:
Prompt 2A turns the approved plan into a real page. It is split by framework because each stack has different failure modes.

React upgrades:
- Strict section folder/component ownership.
- Dedicated hook/module rules for motion.
- Central GSAP registration and cleanup rules.
- Ref discipline and Context restraint.
- Token-first CSS rules.
- Full implementation phases and self-review.

Next.js upgrades:
- Router detection.
- Server component default.
- Leaf-only "use client" rule.
- Hydration mismatch prevention.
- Metadata placement.
- next/font and next/image guidance.
- Client-safe motion components.
- SEO-critical content protection.

Static HTML upgrades:
- Semantic HTML baseline.
- Progressive enhancement.
- No-framework discipline.
- CSS token architecture.
- Lightweight JS rules.
- No-JS readability requirement.

Shared creative upgrades:
- Scene-based construction.
- First-viewport subject clarity.
- Strict anti-template rules.
- Asset verification.
- Reduced-motion behavior.
- Desktop/tablet/mobile requirements.

## Prompt 2B: Refactor Existing

Purpose:
Prompt 2B improves an existing UI without destroying copy, scope, or architecture.

Major upgrades:
- Requires initial diagnosis before edits.
- Adds Copy Lock rules.
- Adds Scope Discipline rules.
- Makes single-section refactors surgical.
- Requires architecture fidelity by framework.
- Adds refactor tactics: keep what works, remove AI-looking decoration, use composition before effects.
- Makes the chosen extraordinary directives conditional by scope.
- Adds explicit self-review for accidental copy changes and scope expansion.

Why it matters:
Refactors are easy to ruin because a coder can rebuild everything. The upgraded prompts demand a controlled transformation instead.

## Prompt 3: Jury Round

Purpose:
Prompt 3 is the hard review pass after implementation. It catches the gap between "done" and "actually good."

Major upgrades:
- Adds diff inspection before visual judgment.
- Adds exact copy preservation checks.
- Adds a visual scorecard.
- Adds anti-slop checks.
- Adds creative directive audit.
- Adds accessibility, responsive, runtime, performance, and asset checks.
- Adds framework-specific architecture audits.
- Adds severity rubric.
- Adds repair protocol.
- Adds command/browser QA reporting.

Why it matters:
AI can produce a page that looks impressive in one screenshot but fails mobile, accessibility, runtime, or maintainability. Prompt 3 forces the result through a real jury.

## System Principle

The system is intentionally strict:

- Prompt 1 decides.
- Prompt 2 executes.
- Prompt 3 judges and repairs.

That separation prevents shallow, flashy, fragile UI work.

## What "God-Tier" Means Here

It does not mean maximum effects. It means:

- unmistakable identity
- readable content
- strong first viewport
- precise composition
- controlled motion
- clean architecture
- responsive behavior
- accessible interaction
- verified assets
- no template smell
- no generic AI visual filler

The upgraded prompts are longer because they encode the decisions that separate a serious interface from a decorative mockup.

