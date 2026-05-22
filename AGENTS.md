# AI Agents Governance

## Purpose
This repository contains a professional QA Automation framework for the OrangeHRM Demo Web Application, built with Playwright and TypeScript. The framework is designed as a portfolio showcase demonstrating enterprise-grade test automation practices suitable for Senior QA Automation Engineer roles.

## Role of AI Agents
AI agents (powered by OpenCode) assist in:
- **Product Discovery**: Exploring the OrangeHRM application structure and features using Playwright MCP
- **Documentation**: Drafting test strategies and test case documentation
- **Test Structure**: Proposing page objects, API clients, and test fixtures
- **Analysis**: Identifying test scenarios and edge cases
- **Maintenance**: Refactoring and updating tests to support evolving product features

AI agents do NOT:
- Modify or commit code without explicit approval
- Create tests without documented test flows and expected validations
- Bypass established conventions or security practices

## Binding Rules

### Documentation First
- Before writing any test code, a test flow and expected validations MUST be documented
- Documentation must be reviewed and approved before implementation
- Test strategy and acceptance criteria drive test design, not the reverse

### Code Quality
- Use stable, descriptive Playwright locators (prefer `getByRole`, `getByLabel` over CSS/XPath when possible)
- No hardcoded credentials in test code; use fixtures and environment variables
- Follow Page Object Model pattern for UI tests
- Separate UI, API, and E2E test responsibilities into distinct suites

### File Integrity
- Do not modify existing source code, configuration files, dependencies, or Git files unless explicitly instructed
- Test files must follow the established directory structure (e.g., `tests/ui/`, `tests/api/`, `tests/e2e/`)
- Git operations (commits, pushes, branches) require explicit user approval

### Testing Practices
- Assert only what is necessary to validate the test objective
- Use fixtures for test data setup and teardown
- Include trace, screenshot, and video artifacts for failed tests in CI/CD
- Maintain test independence; tests must not depend on execution order

## Enforcement
These rules are non-negotiable. Any task requesting violation of these rules should be declined or escalated to the user for clarification.
