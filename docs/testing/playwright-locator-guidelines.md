# Playwright Locator Guidelines

Purpose
- This document is the mandatory project reference for locator selection, locator documentation, and locator implementation when using Playwright in this repository. All agents, skills, and contributors must follow these rules when recommending, documenting, or implementing locators.

Locator Priority
1. `page.getByRole()` with accessible name
2. `page.getByLabel()` when the label is verified to work
3. `page.getByPlaceholder()` for form inputs when verified
4. `page.getByText()` for stable business-visible text
5. `locator().filter({ has })` or `locator().filter({ hasText })` for scoped matching
6. CSS selectors only when semantic locators are not available
7. XPath only as a last resort

Verification Rules
- A locator must not be documented as "recommended" or "stable" unless it has been verified using Playwright MCP or by executing Playwright code against the live page or an authorized test environment.
- Inferred locators must be explicitly marked as `candidate` and must not be presented as verified recommendations.
- Do not claim a locator works solely because similar text or labels appear visually; verification is required.
- For repeated messages like `Required`, a generic `page.getByText('Required')` locator is an observation only and must not be used as the primary assertion when multiple matching instances may exist.
- Field-specific validation messages must use a verified scoped locator strategy (see examples below).

Invalid API Prevention
- It is forbidden to document or implement unsupported Playwright Locator API patterns. Examples that must NOT be used or recommended:
  - `.closest(...)` called on a Playwright Locator (this is not a Playwright Locator API method)
  - Selenium-style DOM traversal assumptions that are not implemented via a valid Playwright locator strategy
  - Any pattern that implies DOM traversal methods on Playwright Locator objects outside the documented API

Valid Scoped Locator Examples
- These examples illustrate valid Playwright locator strategies for field-scoped validation messages. Examples must be verified on the live page before being marked as final recommendations.

Username required validation (candidate example):
```
page.locator('.oxd-input-group')
  .filter({ has: page.getByPlaceholder('Username') })
  .getByText('Required', { exact: true })
```

Password required validation (candidate example):
```
page.locator('.oxd-input-group')
  .filter({ has: page.getByPlaceholder('Password') })
  .getByText('Required', { exact: true })
```

Code Review Blocking Rules
- A code-reviewer MUST return `NEEDS UPDATE` if any of the following are found during review:
  - A locator uses an unsupported Playwright API (for example: `.closest(...)` on a Locator)
  - A stable locator was implemented without being present and verified in an approved discovery document
  - A field-specific assertion relies only on ambiguous text (e.g., `page.getByText('Required')`) when multiple matching messages may exist

Compliance
- All agents, skills, and contributors must read this document before recommending or implementing locators. Failure to comply must be raised as a process finding in the implementation log and in the PR description.
