# AGENTS.md — Repository Instructions for Codex

These instructions apply to all work in this repository.

## Required reading

Before making any frontend, UI, UX, styling, layout, component, chart, dashboard, landing-page, or responsive-design change:

1. Read `DESIGN.md`.
2. Inspect the existing relevant page and components.
3. Inspect the existing styling/design tokens.
4. Follow `DESIGN.md` as a repository-level design constraint.

Do not begin UI implementation before doing this review.

## Design authority

`DESIGN.md` is the default design authority for this repository.

When implementing UI:
- do not invent a new visual language for each page,
- reuse existing patterns when they comply with `DESIGN.md`,
- refactor existing patterns when they conflict with `DESIGN.md`,
- prefer product-specific UX over generic SaaS aesthetics.

If a user instruction explicitly conflicts with `DESIGN.md`, follow the user's explicit instruction for that task.

## Before coding

For UI tasks, first determine:
- the user's primary task on the screen,
- the most important information,
- secondary information,
- primary actions,
- whether existing components already solve the problem.

Do not start by deciding what cards, gradients, icons, or animations to add.

Start from information structure.

## During implementation

Keep changes focused.
Preserve existing functionality unless the task requires changing it.

Do not:
- add dependencies solely for decorative effects,
- add animation libraries for trivial transitions,
- replace working components merely to make code look newer,
- create new design tokens when an existing token is appropriate,
- create duplicate components with minor cosmetic differences.

Use semantic HTML and preserve accessibility.

## Existing UI

Do not assume existing UI is correct simply because it already exists.

When modifying an existing screen:
- identify generic AI/SaaS patterns,
- remove unnecessary visual containers,
- reduce decoration that does not communicate information,
- preserve useful product-specific behavior.

Avoid large unsolicited redesigns outside the requested scope.

## Completion checklist

Before reporting a UI task as complete:

1. Re-read the relevant parts of `DESIGN.md`.
2. Check desktop and mobile behavior where applicable.
3. Check for unnecessary cards, gradients, shadows, pills, and icons.
4. Check hierarchy, spacing, typography, and alignment.
5. Check that repeated components are actually reusable.
6. Verify that functionality was not accidentally removed.
7. Remove decorative elements that do not improve comprehension or interaction.

A UI task is not complete until this review has been performed.
