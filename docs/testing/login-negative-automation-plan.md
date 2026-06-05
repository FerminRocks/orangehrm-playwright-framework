# Login Negative Automation Plan

Purpose
- Provide an implementation plan for the approved Negative Login coverage vertical slice. This document is documentation-first and must be approved before any test code is committed.

Scope
- Included: three negative Login scenarios against the OrangeHRM demo site:
  - Invalid credentials
  - Empty username
  - Empty password
- Explicitly excluded: password reset flows, successful Login (positive path), multi-browser expansion beyond the existing Playwright configuration, API test implementation, CI changes, visual/screenshot testing, and storageState use.

Approved Implementation Files (planned)
- Files to create (likely):
  - tests/ui/auth/login-negative.spec.ts (one spec file with 3 tests)
- Files to modify (likely):
  - src/pages/LoginPage.ts (minimal extension for negative assertions)
  - docs/onboarding/implementation-log.md (log Phase 6 entry)

Page Object Design (LoginPage)
- Reuse existing verified locators only:
  - page.getByPlaceholder('Username')
  - page.getByPlaceholder('Password')
  - page.getByRole('button', { name: 'Login' })
- Add minimal methods:
  - async submitCredentials(username: string, password: string)
  - async expectInvalidCredentialsError()
  - async expectUsernameRequiredMessage()
  - async expectPasswordRequiredMessage()
- Validation locators for Required messages must use the verified field-scoped locator strategy from discovery and the Playwright locator guidelines, for example:
  - page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Username') }).getByText('Required', { exact: true })
  - page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Password') }).getByText('Required', { exact: true })
- Do NOT use unsupported locator patterns such as .closest(...) on Playwright Locators.

Test Design
- One spec file: tests/ui/auth/login-negative.spec.ts
- Tests (exactly 3):
  1. Invalid credentials displays authentication error (@functional-ui @negative)
  2. Empty username shows username required validation (@functional-ui @negative)
  3. Empty password shows password required validation (@functional-ui @negative)
- Each test should:
  - Verify login controls are visible before actions
  - Execute the scenario
  - Assert the specific error/validation message is visible using the page object assertion
  - Assert user remains on Login page (URL contains '/auth/login') and Dashboard is not reached
- Tags: @functional-ui and @negative. Do not use @smoke unless explicitly justified.

Test Data Strategy
- Invalid credentials: use plainly fake values (e.g., InvalidUser / InvalidPassword123) documented as non-sensitive test data
- Valid demo credentials remain supplied via environment variables when needed; do not hardcode secrets
- Do not add or modify .env in the repository

Network / API Observations
- Network observations used for discovery only. Do not implement API assertions in this UI-focused PR.
- Do not assert HTTP 302 or absence of POST in the UI tests unless the assertion is justified as stable across environments.

Validation Commands (to run after implementation, before commit)
- npx playwright test tests/ui/auth/login-negative.spec.ts --project=chromium
- npm run test:ui -- --project=chromium
- npm run test -- --project=chromium
- Use PowerShell environment variables to set ORANGEHRM_BASE_URL, ORANGEHRM_USERNAME, ORANGEHRM_PASSWORD as needed for local validation. Do not create .env files in the repo.

Model Checkpoint
- GPT-5 mini is approved for this limited implementation work. Advanced Claude is not required at this time.
- Re-evaluate model upgrades before large refactors, fixtures abstraction, API client design, or multi-module automation.

Acceptance Criteria for Implementation
- Tests implemented according to the Page Object design and locator guidelines
- No unsupported Playwright Locator API patterns used
- All locators implemented must match approved discovery and be verified per docs/testing/playwright-locator-guidelines.md
- Implementation is documented in the PR and includes the validation commands output
