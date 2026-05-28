# Login Automation Implementation Plan

This document defines the approved minimal plan for the first automated UI test: the successful Login → Dashboard vertical slice for OrangeHRM. This is a documentation-only plan; no code is implemented here.

1. Automation target

- Implement only the successful OrangeHRM Login to Dashboard UI test.
- This is the first professional vertical slice of the framework and must validate Login itself (no use of authenticated storage state).

2. Approved project structure (implementation will create)

- src/config/env.ts
- src/pages/LoginPage.ts
- src/pages/DashboardPage.ts
- tests/ui/auth/login.spec.ts
- .env.example

Notes on structure:
- Page Objects and reusable components belong under src/ (not under tests/).
- Test specifications belong under tests/ with a clear ui/auth path for authentication flows.

3. Environment and configuration strategy

- Required environment variables:
  - ORANGEHRM_BASE_URL (e.g. https://opensource-demo.orangehrmlive.com)
  - ORANGEHRM_USERNAME (Admin)
  - ORANGEHRM_PASSWORD (admin123)
- Use dotenv for local development convenience. `.env` must never be committed; add `.env` to `.gitignore` if not already ignored.
- Provide `.env.example` documenting that the values are public demo credentials only.
- Configure Playwright baseURL from the environment configuration (e.g., baseURL: process.env.ORANGEHRM_BASE_URL).
- Add a fail-fast validation that required env vars exist before running the login test. If variables are missing, fail with a clear message.

4. Page Object responsibilities

- LoginPage (src/pages/LoginPage.ts)
  - navigate(): go to the login page (baseURL + /web/index.php/auth/login)
  - isDisplayed(): confirm login page visibility (URL and key controls visible)
  - enterUsername(username)
  - enterPassword(password)
  - submit(): click login
  - Use only verified locators from discovery:
    - page.getByPlaceholder('Username')
    - page.getByPlaceholder('Password')
    - page.getByRole('button', { name: 'Login' })

- DashboardPage (src/pages/DashboardPage.ts)
  - isDisplayed(): confirm Dashboard is visible using stable UI elements (e.g., Dashboard heading or sidebar navigation)
  - Keep minimal; do not assert a hardcoded profile name.

5. Test specification design (tests/ui/auth/login.spec.ts)

- Test title: "Successful login redirects authenticated user to Dashboard"
- Classification: smoke, functional UI
- Preconditions:
  - ORANGEHRM_BASE_URL, ORANGEHRM_USERNAME, ORANGEHRM_PASSWORD set in environment
  - No active session (fresh browser context)
- Steps:
  1. Navigate to login page
  2. Assert login controls are visible
  3. Fill username and password from environment
  4. Click Login
  5. Wait for navigation/network idle
  6. Assert Dashboard route or heading is visible
- Assertions:
  - Login placeholders and button are visible before submission
  - After submission, URL contains `/dashboard/index` OR Dashboard heading is visible
  - Sidebar navigation is visible (optional)

6. Package and Playwright configuration decisions

- package.json: add minimal npm scripts during implementation:
  - "test": "playwright test"
  - "test:ui": "playwright test tests/ui"
  - "test:smoke": "playwright test --grep @smoke" (optional)
  - "report": "playwright show-report"
- Add dotenv as a dev dependency during implementation for local convenience.
- playwright.config.ts: set baseURL to process.env.ORANGEHRM_BASE_URL during implementation (no other changes required now).
- Reporter and trace: keep HTML reporter and trace: 'on-first-retry' as-is.
- Do not add video, screenshot-on-failure, or advanced reporting in this first PR.

7. Public demo environment risks

- Availability and response time are outside our control; tests should tolerate reasonable latencies and use retries where appropriate in CI.
- Public demo account state and displayed profile values may change; avoid asserting dynamic data like hardcoded profile names.
- Dashboard widgets count or content may vary by role or environment; assertions should focus on stable UI anchors (heading, navigation).

8. Future implementation workflow requirements

- Before generating test code, the repository must have:
  - An automation-developer subagent
  - A code-reviewer subagent
  - A controlled implementation skill that creates UI test code from an approved discovery document
- These agents/skills enable consistent code generation, review, and safe artifact handling.

9. Model checkpoint

- GPT-5 mini is approved for implementing this small login vertical slice and for subsequent small, focused automation tasks.
- An advanced Claude model is not required for this step. Re-evaluate before larger work: API clients, extensive fixture designs, or cross-module automation.

10. Implementation log update requirement

- After this plan is approved, add a Phase 5 entry to docs/onboarding/implementation-log.md (date 2026-05-28) describing the assessment and deferral of code generation until coding/review agents and implementation skill exist.

Appendix: Verified locators

- page.getByPlaceholder('Username')
- page.getByPlaceholder('Password')
- page.getByRole('button', { name: 'Login' })

End of plan.
