---
name: explore-ui-flow
description: Document a single OrangeHRM UI flow using Playwright MCP exploration.
---

# Explore UI Flow Skill

## Purpose
Use the UI Explorer agent and Playwright MCP to systematically explore and document a single OrangeHRM UI flow. Capture elements, locators, validations, dependencies, and risks.

## When to Use This Skill
- You want to understand and document a specific OrangeHRM user workflow
- You need to identify stable Playwright locators before writing tests
- You need to discover test data requirements and dependencies
- You want to capture possible assertions and validations
- You need to document observed API calls or network behavior

## When NOT to Use This Skill
- You are ready to implement automated tests (use Page Object pattern instead)
- You need to modify or create data in OrangeHRM (contact a senior engineer first)
- You need to perform actions that may affect other users or production data
- You want to generate test code directly (document flow first, then automate)

## Required Reading
Before using this skill, read and understand:

1. **AGENTS.md** — Project governance and binding rules
   - Confirms documentation-first approach
   - Confirms no hardcoded credentials
   - Confirms no test creation without documented flows

2. **docs/product/product-overview.md** — OrangeHRM system overview
   - Understand the known modules
   - Review demo credentials (public, for exploratory testing only)
   - Understand test data considerations

3. **docs/testing/test-strategy.md** — Testing strategy and principles
   - Understand POM and locator strategies
   - Understand assertion philosophy
   - Understand CI/CD requirements

4. **docs/discovery/ui-flow-template.md** — Discovery documentation format
   - Know the expected structure for discovery documents
   - Understand locator strategy preferences
   - Understand how to document risks and assumptions

## Procedure

### 1. Confirm the Requested Flow Scope
- Ask the user to clearly describe:
  - Flow name (e.g., "Login to Dashboard", "Create New Employee", "Submit Leave Request")
  - Entry point (e.g., "Start at login page" or "Logged-in dashboard")
  - Exit point (e.g., "Successfully created employee" or "Leave request submitted")
  - Any specific preconditions or roles
  - Any data that will be needed

### 2. Navigate with Playwright MCP
- Use Playwright MCP to navigate the flow step-by-step
- Take snapshots at each major state transition
- Record the URL and visible page elements at each step
- Note any modals, dialogs, or overlays that appear

### 3. Capture Page and State Transitions
- Document the navigation sequence
- For each page:
  - Record the URL or page identifier
  - Note the purpose of the page
  - List visible UI elements
  - Record any transitions or animations

### 4. Identify Locator Candidates Using Stable Playwright Strategies
- For each interactive element, suggest locators in order of preference:
  1. `getByRole()` with accessible name
  2. `getByLabel()` or `getByPlaceholder()` for form fields
  3. `getByText()` for buttons/links with stable text
  4. CSS selector as fallback
  5. XPath only if absolutely necessary
- For each suggested locator, test it mentally or by inspection:
  - Is it stable across browser reloads?
  - Does it depend on dynamic content?
  - Is it business-visible (accessible name)?

### 5. Record Possible Validations and Assertions
- For each action, identify what should be asserted:
  - What appears on screen after a successful action?
  - What message is displayed?
  - What data appears in tables or lists?
  - Are there API calls that can be verified?

### 6. Observe Network Calls When Available
- If Playwright network inspection is available, capture:
  - HTTP method (GET, POST, PUT, DELETE)
  - Endpoint URL
  - Request body (if applicable)
  - Response status and structure
  - Any error responses

### 7. Document Assumptions and Risks
- Identify and record:
  - Any assumptions about user roles or permissions
  - Potential edge cases or error conditions
  - Data dependencies (e.g., "employee must exist first")
  - Any unclear or risky behavior
  - Any steps that modify data (note for authorization)

### 8. Write or Update Discovery Document
- **Only when explicitly authorized by the user**
- Use the format defined in `docs/discovery/ui-flow-template.md`
- Fill in all sections with findings from steps 1-7
- Save to `docs/discovery/[flow-name].md`

## Important Constraints

### This Skill Must NOT:
- Generate or implement Page Objects
- Create or modify test files (*.spec.ts)
- Create or modify test fixtures
- Implement test automation code
- Perform data-modifying actions without explicit authorization:
  - Do not submit forms that create records
  - Do not update or delete data
  - Do not change settings that affect other users
- Modify project configuration or dependencies
- Modify AGENTS.md or other governance documents
- Run Git operations without user approval

### Data Safety:
- If a flow requires submitting data, ask the user:
  - "This flow creates a new [Employee/Leave Request]. Do you authorize me to proceed?"
  - Only proceed with explicit "yes" confirmation
- If exploring a sensitive flow, check:
  - Does this modify production-like data?
  - Should this be tested in a safe sandbox first?

## Success Criteria
The skill is complete when:
- ✅ Flow scope is clearly understood and confirmed
- ✅ All major UI elements are identified with recommended locators
- ✅ Possible validations and assertions are documented
- ✅ Test data requirements are clear
- ✅ Network calls (if applicable) are captured
- ✅ Assumptions and risks are documented
- ✅ Discovery document (if authorized) is written and saved
- ✅ No data has been modified unless explicitly authorized
