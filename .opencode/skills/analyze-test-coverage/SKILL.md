---
name: analyze-test-coverage
description: |
  Reusable skill to analyze current testing coverage for a product area or flow and recommend a prioritized next testing increment.
---

## Purpose

This skill inspects documentation, test plans, discovery notes and existing automated tests to produce a focused coverage analysis and prioritized recommendations for the next testing increment.

## When To Use

- After discovery documentation exists for the target area.
- After one or more test plans or automated tests exist for the target area.
- Before deciding the next automation increment or expanding coverage.

## When Not To Use

- For live UI exploration.
- For implementing tests or creating Page Objects.
- For broad refactoring or mass test generation.

## Required Reading

- AGENTS.md
- docs/testing/test-strategy.md
- docs/testing/playwright-locator-guidelines.md
- relevant docs/product/*
- relevant docs/discovery/*
- relevant docs/testing/*automation-plan.md
- existing tests related to the target area
- existing src/pages related to the target area, when applicable

## Procedure

1. Confirm the target product area or flow with the requester.
2. Inventory current documentation and automated coverage.
3. Identify confirmed coverage.
4. Identify missing positive scenarios.
5. Identify missing negative scenarios.
6. Identify boundary, validation, role/permission, data and state-transition scenarios.
7. Identify API/UI/E2E overlap opportunities.
8. Identify public-demo-environment risks and avoid unsafe recommendations.
9. Prioritize scenarios by risk, business value, defect detection value, automation feasibility and maintenance cost.
10. Classify scenarios as smoke, functional UI, regression, API, E2E, exploratory or manual-only.
11. Recommend the next testing increment.
12. Write or update a coverage analysis document only when explicitly authorized.

## Output

The skill must produce:

- Current coverage summary
- Coverage gaps
- Prioritized recommendations
- Automation candidates
- Manual/exploratory candidates
- Risks and assumptions
- Recommended next increment

Do not produce a huge flat test-case list without prioritization.

## Prohibitions

- Do not implement tests, Page Objects, or modify source code, tests, dependencies or configuration.
- Do not stage, commit, push or create PRs.
