# UI Flow Discovery Template

Use this template to document a single OrangeHRM UI flow discovered through Playwright MCP exploration.

## Flow Name
[Provide a clear, descriptive name for this flow]

## Objective
[State the primary goal or user intent for this flow. What is the user trying to accomplish?]

## Preconditions
[List any prerequisites for executing this flow]
- Example: User must be logged in
- Example: Admin role required
- Example: Specific data must exist in the system

## Test Data
[Document test data needed for this flow]
- **Accounts**: 
- **Employee Records**: 
- **Department/Location**: 
- **Leave Types / Policies**: 
- **Other Data**: 

## Navigation Steps
[List the sequence of user actions to execute this flow]

| Step | Action | Expected Result | Notes |
|------|--------|-----------------|-------|
| 1 | Navigate to [page] | Page loads successfully | |
| 2 | Click on [element] | Next page/state appears | |
| 3 | Enter [data] in [field] | Field accepts input | |
| 4 | Submit form | Success message or navigation | |
| N | Final step | Final expected outcome | |

## UI Elements and Recommended Locators

| Element | Purpose | Recommended Locator | Locator Strategy | Stability Notes |
|---------|---------|---------------------|------------------|-----------------|
| Login button | Submit credentials | `getByRole('button', { name: 'Login' })` | Role-based | Stable; business-visible |
| Username field | Enter username | `getByLabel('Username')` or `getByPlaceholder('Username')` | Label/Placeholder | Stable; clear purpose |
| Password field | Enter password | `getByLabel('Password')` | Label-based | Stable; labeled form field |
| Navigation menu | Access modules | `getByRole('navigation')` | Role-based | Stable; semantic HTML |
| Dynamic table row | Select record | `getByRole('row', { name: /[Record Name]/ })` | Role + text pattern | May vary; depends on data |

**Locator Selection Guidelines:**
- **Prefer** `getByRole()` with accessible names (most stable, business-visible)
- **Prefer** `getByLabel()` or `getByPlaceholder()` for form fields
- **Prefer** `getByText()` for buttons and headings with stable text
- **Avoid** CSS selectors (`.class`, `#id`) unless element has no semantic meaning
- **Avoid** XPath unless absolutely necessary; CSS as last resort

## Validations / Assertions

[Document possible validations and assertions for this flow]

**Success State:**
- Assert that [expected outcome] appears on screen
- Assert that [data] is persisted in the system
- Assert that [navigation target] is reached

**Error Handling:**
- Assert that [error message] appears for [invalid input]
- Assert that [warning] is displayed for [boundary condition]

## Network Calls Observed

[Document any network calls observed during this flow, if available]

- POST `/api/...` - Request body: `{ ... }` - Response: Success 200 or error
- GET `/api/...` - Query params: `?filter=...` - Response: Array of records

## Risks / Open Questions

[Document any uncertainties, assumptions, or risks]

- **Risk**: [Potential issue or assumption]
  - Mitigation: [How to address or verify]
  
- **Question**: [Unclear behavior or missing information]
  - Investigation needed: [How to determine the answer]

Examples:
- Risk: User role may affect visible UI elements
  - Mitigation: Test with multiple user roles
- Question: Does leaving a form unsaved trigger a confirmation dialog?
  - Investigation needed: Attempt navigation away without saving

## Automation Recommendation

[Summarize whether and how this flow should be automated]

**Candidate Test Type:**
- [ ] Smoke test (critical path, high priority)
- [ ] Functional UI test (standard feature validation)
- [ ] API test (backend validation)
- [ ] E2E test (multi-module workflow)

**Automation Approach:**
[Suggest Page Object structure, test data strategy, and assertions]

Example:
- Create Page Object: `AdminUserManagementPage`
- Create fixture: `createTestUser(name, role)`
- Test flow: Login → Navigate to Admin → Create user → Validate in table → Verify API persistence
- Assertions: Verify UI display, API response, and database state

**Blocking Issues (if any):**
[Note any technical blockers or dependencies preventing automation]
