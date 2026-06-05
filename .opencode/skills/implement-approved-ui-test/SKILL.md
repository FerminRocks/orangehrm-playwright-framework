---
name: implement-approved-ui-test
description: |
  Implement one approved Playwright UI test vertical slice from an approved discovery
  document and an approved implementation plan. This skill automates a controlled set
  of file operations and validations but must not stage or commit changes.
---

# Implement Approved UI Test Skill

## Purpose

Implement one approved UI test (a vertical slice) using Playwright + TypeScript based on
an explicitly referenced discovery document and implementation plan.

## When To Use

- Only after a UI flow discovery document and implementation plan are approved and merged to `main`.
- Only when the requested implementation scope is explicitly defined in the task.

## When Not To Use

- For exploratory navigation or undocumented test scenarios.
- For broad framework refactors or cross-cutting changes not in the plan.
- For committing, pushing, or PR operations.

## Required Reading

- `AGENTS.md`
- `docs/testing/test-strategy.md`
- the referenced `docs/discovery/<flow>.md`
- the referenced `docs/testing/<plan>.md`
- relevant source and configuration files (playwright.config.ts, package.json)
 - `docs/testing/playwright-locator-guidelines.md` — Must be read and followed before implementing locators

## Procedure

1. Confirm the authorized implementation scope and list allowed file operations before making changes.
2. Read the approved discovery and implementation plan documentation.
3. Inspect existing repository structure and relevant configuration.
4. Confirm the verified locators and assertions to be implemented.
5. Confirm environment/configuration/dependency changes authorized by the plan.
6. Implement only the approved files and changes.
7. Run the validations explicitly required by the task (lint, type-check, test run as allowed).
8. Report in detail:
   - files created
   - files modified
   - files deleted
   - commands executed
   - test results
   - any deviations or unresolved risks
9. Stop before staging or committing; require an independent `code-reviewer` audit before any commit.

## Guardrails

- Only implement what is in the approved plan.
- Do not add tests outside the approved flow.
- Do not add screenshots, traces, generated artifacts, or reports to the repository unless explicitly authorized.
- Do not store credentials in specs or source files.
- Do not change dependencies or configuration beyond explicit authorization.
- Do not create Page Objects under `tests/`; reusable Page Objects belong under `src/pages/`.
- Do not stage, commit, push, merge, or create PRs.
- If the plan conflicts with the repository or the live validated discovery, stop and report the conflict instead of improvising.
 - If an approved discovery document recommends a locator that violates the Playwright locator guidelines (for example, by using unsupported Playwright APIs), stop and report the conflict. Do not implement unsupported locator patterns.
