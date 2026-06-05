# UI Flow Discovery: Login Negative Authentication Scenarios

## Flow Name
Negative Authentication Scenarios - Invalid Credentials, Empty Username, Empty Password

## Objective
Validate that the OrangeHRM login page correctly handles three negative authentication scenarios:
1. Invalid credentials (non-existent user)
2. Empty username field with valid password
3. Empty password field with valid username

These scenarios ensure that the login form provides appropriate error and validation messages to guide users and prevent unauthorized access attempts.

## Preconditions
- User is not authenticated (session cleared or new browser session)
- User has access to the OrangeHRM login page at `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`
- Login form is fully loaded and interactive

## Test Data

### Scenario 1: Invalid Credentials
- **Username**: `InvalidUser` (non-existent user)
- **Password**: `InvalidPassword123` (arbitrary invalid password)
- **Expected Behavior**: Form submission should fail with error message

### Scenario 2: Empty Username
- **Username**: Empty (field left blank)
- **Password**: `admin123` (valid password)
- **Expected Behavior**: Form submission should fail with validation message

### Scenario 3: Empty Password
- **Username**: `Admin` (valid username)
- **Password**: Empty (field left blank)
- **Expected Behavior**: Form submission should fail with validation message

## Navigation Steps

### Scenario 1: Invalid Credentials

| Step | Action | Expected Result | Notes |
|------|--------|-----------------|-------|
| 1 | Navigate to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Login page loads with form visible | Page title: "OrangeHRM" |
| 2 | Enter "InvalidUser" in Username field | Username field accepts input | Field is labeled "Username" |
| 3 | Enter "InvalidPassword123" in Password field | Password field accepts input | Field is labeled "Password" |
| 4 | Click "Login" button | Form submits; page remains on login URL | POST request sent to `/web/index.php/auth/validate` with 302 redirect response |
| 5 | Wait for response | Error message appears on page | Alert element with role="alert" displays "Invalid credentials" |
| 6 | Verify error state | Login form is still visible and editable | User can retry with different credentials |

### Scenario 2: Empty Username

| Step | Action | Expected Result | Notes |
|------|--------|-----------------|-------|
| 1 | Navigate to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Login page loads with form visible | Clean state; previous form data cleared |
| 2 | Leave Username field empty | Username field remains empty | No input entered |
| 3 | Enter "admin123" in Password field | Password field accepts input | Field is labeled "Password" |
| 4 | Click "Login" button | Form submission is prevented or fails | Validation message appears |
| 5 | Wait for validation | "Required" message appears below Username field | Validation message is visible and accessible |
| 6 | Verify validation state | Login form is still visible and editable | User can enter username and retry |

### Scenario 3: Empty Password

| Step | Action | Expected Result | Notes |
|------|--------|-----------------|-------|
| 1 | Navigate to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Login page loads with form visible | Clean state; previous form data cleared |
| 2 | Enter "Admin" in Username field | Username field accepts input | Field is labeled "Username" |
| 3 | Leave Password field empty | Password field remains empty | No input entered |
| 4 | Click "Login" button | Form submission is prevented or fails | Validation message appears |
| 5 | Wait for validation | "Required" message appears below Password field | Validation message is visible and accessible |
| 6 | Verify validation state | Login form is still visible and editable | User can enter password and retry |

## UI Elements and Recommended Locators

### Login Form Elements (Reused from login-flow.md)

| Element | Purpose | Recommended Locator | Locator Strategy | Stability Notes |
|---------|---------|---------------------|------------------|-----------------|
| Username input field | Enter username | `page.getByPlaceholder('Username')` | Placeholder-based | Confirmed: uniquely identifies the input on the live page |
| | | `input[name='username']` | CSS selector | Fallback; attribute-based |
| Password input field | Enter password | `page.getByPlaceholder('Password')` | Placeholder-based | Confirmed: uniquely identifies the input on the live page |
| | | `input[name='password']` | CSS selector | Fallback; attribute-based |
| Login button | Submit credentials | `page.getByRole('button', { name: 'Login' })` | Role-based | Confirmed: uniquely identifies the submit button on the live page |
| | | `button:has-text('Login')` | Text-based | Alternative; depends on exact text |

### Error and Validation Message Elements

| Element | Purpose | Recommended Locator | Locator Strategy | Stability Notes | Scenario |
|---------|---------|---------------------|------------------|-----------------|----------|
| Invalid credentials error | Display authentication failure | `page.getByRole('alert')` | Role-based | **Confirmed**: Uniquely identifies error alert on live page | Scenario 1 |
| | | `page.getByText('Invalid credentials')` | Text-based | Confirmed: Exact text match | Scenario 1 |
| | | `.oxd-alert--error` | CSS class | Fallback; class-based selector | Scenario 1 |
| Username required message | Display validation error for empty username | `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Username') }).getByText('Required', { exact: true })` | Field-scoped | **Verified**: Uniquely identifies username field error when displayed; resolves to 0 when only password error shown | Scenario 2 |
| | | `page.getByText('Required', { exact: true })` | Text-based (generic) | Observation only: displays "Required" text; cannot distinguish which field when both empty | Scenario 2 |
| | | `.oxd-input-field-error-message` | CSS class | Fallback: error message container (may match multiple) | Scenario 2 |
| Password required message | Display validation error for empty password | `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Password') }).getByText('Required', { exact: true })` | Field-scoped | **Verified**: Uniquely identifies password field error when displayed; resolves to 0 when only username error shown | Scenario 3 |
| | | `page.getByText('Required', { exact: true })` | Text-based (generic) | Observation only: displays "Required" text; cannot distinguish which field when both empty | Scenario 3 |
| | | `.oxd-input-field-error-message` | CSS class | Fallback: error message container (may match multiple) | Scenario 3 |

**Locator Selection Guidelines:**
- **Prefer** `getByRole()` with accessible names (most stable, business-visible)
- **Prefer** `getByText()` for error messages with stable, exact text
- **Prefer** `getByPlaceholder()` for form fields
- **Avoid** CSS selectors (`.class`, `#id`) unless element has no semantic meaning
- **Avoid** XPath unless absolutely necessary; CSS as last resort

## Validations / Assertions

### Scenario 1: Invalid Credentials

**Expected Behavior:**
- Form submission succeeds (POST request sent)
- Page remains on login URL (`/auth/login`)
- Error alert appears with role="alert"
- Error message displays exactly: "Invalid credentials"
- Error alert has CSS class `oxd-alert--error`
- Login form remains visible and editable
- Username and password fields are cleared after failed login attempt

**Assertions to Implement:**
```
Assert that page URL contains '/auth/login'
Assert that alert element with role="alert" is visible
Assert that alert text equals 'Invalid credentials'
Assert that alert has class 'oxd-alert--error'
Assert that username field is still visible and editable
Assert that password field is still visible and editable
Assert that login button is still visible and clickable
```

### Scenario 2: Empty Username

**Expected Behavior:**
- Form submission is prevented or fails
- Page remains on login URL (`/auth/login`)
- Validation message appears below username field
- Validation message displays exactly: "Required"
- Validation message has CSS class `oxd-input-field-error-message`
- Password field retains its value
- Login form remains visible and editable

**Assertions to Implement:**
```
Assert that page URL contains '/auth/login'
Assert that validation message element is visible
Assert that validation message text equals 'Required'
Assert that validation message is associated with username field
Assert that username field is still visible and editable
Assert that password field is still visible and editable
Assert that login button is still visible and clickable
```

**Field-Scoped Locator for Username Validation:**
- **Primary Recommendation** (Verified): `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Username') }).getByText('Required', { exact: true })`
  - This locator uniquely identifies the username field's "Required" message
  - Resolves to exactly 1 element when username validation appears
  - Does not resolve when only password validation appears
- **Generic Alternative** (Observation only): `page.getByText('Required', { exact: true })` can match either field's message; use field-scoped locator for clarity

### Scenario 3: Empty Password

**Expected Behavior:**
- Form submission is prevented or fails
- Page remains on login URL (`/auth/login`)
- Validation message appears below password field
- Validation message displays exactly: "Required"
- Validation message has CSS class `oxd-input-field-error-message`
- Username field retains its value
- Login form remains visible and editable

**Assertions to Implement:**
```
Assert that page URL contains '/auth/login'
Assert that validation message element is visible
Assert that validation message text equals 'Required'
Assert that validation message is associated with password field
Assert that username field is still visible and editable
Assert that password field is still visible and editable
Assert that login button is still visible and clickable
```

**Field-Scoped Locator for Password Validation:**
- **Primary Recommendation** (Verified): `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Password') }).getByText('Required', { exact: true })`
  - This locator uniquely identifies the password field's "Required" message
  - Resolves to exactly 1 element when password validation appears
  - Does not resolve when only username validation appears
- **Generic Alternative** (Observation only): `page.getByText('Required', { exact: true })` can match either field's message; use field-scoped locator for clarity

## Network Calls Observed

### Scenario 1: Invalid Credentials

**Login Form Submission:**
- **Method**: POST
- **Endpoint**: `/web/index.php/auth/validate`
- **Request Body**: Form data with username and password (credentials not logged for security)
- **Response Status**: 302 Found (redirect back to login page with error message rendered)
- **Response Content**: Redirect to login page; error alert displayed on page

**Post-Submission Requests:**
- **GET** `/web/index.php/core/i18n/messages` → [304 Not Modified]
  - Purpose: Load internationalization messages (cached)

**Notes:**
- Server responded with `302 Found`; the browser followed the redirect back to the login URL and the error message was rendered on the login page
- Error message is rendered on the login page (no separate authenticated navigation observed)
- No authenticated Dashboard navigation was observed after the failed authentication attempt

### Scenario 2: Empty Username

**Form Submission Behavior:**
- Client-side validation was observed: the "Required" message was displayed and no authentication POST request was observed during the validation window. The internal implementation mechanism was not independently confirmed.
- No network call is made when form submission is prevented
- If submission were to occur, server-side validation should reject the request
- Validation message appears immediately upon form submission attempt

**Notes:**
- Validation message appears immediately upon form submission attempt
- No authentication attempt is made
- User remained on login page after validation

### Scenario 3: Empty Password

**Form Submission Behavior:**
- Client-side validation was observed: the "Required" message was displayed and no authentication POST request was observed during the validation window. The internal implementation mechanism was not independently confirmed.
- No network call is made when form submission is prevented
- If submission were to occur, server-side validation should reject the request
- Validation message appears immediately upon form submission attempt

**Notes:**
- Validation message appears immediately upon form submission attempt
- No authentication attempt is made
- User remained on login page after validation

**Security Note:**
- Sensitive information (tokens, cookies, session values) is not documented per security best practices
- Credentials are not logged or recorded in any form

## Risks / Open Questions

### Risks

**Risk 1: Validation Message Ambiguity**
- **Description**: Both empty username and empty password scenarios display "Required" message. Automation must distinguish which field triggered the validation.
- **Mitigation**: Use field-scoped locators (e.g., locate the username field, then find the error message within its parent container). Test both scenarios separately to ensure correct field identification.
- **Impact**: Medium - Could lead to false positives if locators are not field-specific

**Risk 2: Client-Side vs. Server-Side Validation**
- **Description**: Empty field validation may be handled entirely by client-side HTML5 validation (required attribute), preventing network calls. If client-side validation is disabled, server-side validation should handle it.
- **Mitigation**: Test with JavaScript disabled to verify server-side validation. Verify that both client-side and server-side validation work correctly.
- **Impact**: Low - Both approaches are valid; tests should account for either behavior

**Risk 3: Error Message Persistence**
- **Description**: Error messages may persist if the user navigates away and returns to the login page without clearing the form.
- **Mitigation**: Always reload the page or clear form fields before each test scenario to ensure clean state.
- **Impact**: Medium - Could cause test flakiness if not properly managed

**Risk 4: Rate Limiting or Account Lockout**
- **Description**: Multiple failed login attempts may trigger rate limiting or temporary account lockout.
- **Mitigation**: Use non-existent usernames for invalid credential tests to avoid triggering lockout on real accounts. Monitor for rate-limiting headers in responses.
- **Impact**: Medium - Could affect test execution if not considered

### Questions

**Question 1: Does the login form have CSRF protection?**
- **Investigation needed**: Check for CSRF tokens in the form or request headers during form submission
- **Relevance**: Important for understanding security mechanisms and potential test setup requirements

**Question 2: Are there any rate-limiting or account lockout mechanisms?**
- **Investigation needed**: Attempt multiple failed logins to verify behavior; check for HTTP 429 (Too Many Requests) responses
- **Relevance**: Important for test design to avoid triggering lockout during test execution

**Question 3: Does the login page display different content for different user roles?**
- **Investigation needed**: Test with different user accounts (Admin, Manager, Employee) to verify behavior
- **Relevance**: May affect test data setup and validation logic

**Question 4: Are there any JavaScript errors or console warnings during failed login attempts?**
- **Investigation needed**: Check browser console for errors during the login flow
- **Relevance**: Important for identifying potential issues with form handling or error display

**Question 5: How does the application handle rapid successive login attempts?**
- **Investigation needed**: Submit multiple failed login attempts in quick succession to verify rate limiting
- **Relevance**: Important for understanding security mechanisms and test execution strategy

## Automation Recommendation

### Candidate Test Type
- [x] **Smoke test** (critical path validation, high priority)
- [x] **Functional UI test** (standard feature validation)
- [ ] API test (backend validation)
- [ ] E2E test (multi-module workflow)

**Rationale**: Negative authentication scenarios are critical for security and user experience. They should be automated as functional UI tests to ensure the login form correctly handles error cases and provides appropriate feedback to users.

### Automation Approach

**Page Objects:**

Create `LoginPage` with methods:
- `navigateToLogin()` - Navigate to login page
- `enterUsername(username)` - Fill username field
- `enterPassword(password)` - Fill password field
- `clickLogin()` - Click login button
- `isLoginPageDisplayed()` - Verify login page is visible
- `getInvalidCredentialsError()` - Get invalid credentials error message
- `getUsernameRequiredError()` - Get username required validation message
- `getPasswordRequiredError()` - Get password required validation message
- `isErrorAlertVisible()` - Verify error alert is displayed
- `isValidationMessageVisible(fieldName)` - Verify validation message for specific field

**Test Fixtures:**

Create fixtures for:
- `loginPage` - LoginPage instance
- `invalidCredentials` - Test data for invalid credentials scenario
- `emptyUsernameData` - Test data for empty username scenario
- `emptyPasswordData` - Test data for empty password scenario

**Test Flow - Scenario 1: Invalid Credentials**

```
1. Navigate to login page
2. Verify login page is displayed
3. Enter invalid username and password
4. Click login button
5. Wait for response
6. Verify error alert is visible
7. Verify error message text equals "Invalid credentials"
8. Verify login form is still visible and editable
9. Verify page URL contains '/auth/login'
```

**Test Flow - Scenario 2: Empty Username**

```
1. Navigate to login page
2. Verify login page is displayed
3. Leave username field empty
4. Enter valid password
5. Click login button
6. Wait for validation
7. Verify validation message is visible
8. Verify validation message text equals "Required"
9. Verify validation message is associated with username field
10. Verify login form is still visible and editable
11. Verify page URL contains '/auth/login'
```

**Test Flow - Scenario 3: Empty Password**

```
1. Navigate to login page
2. Verify login page is displayed
3. Enter valid username
4. Leave password field empty
5. Click login button
6. Wait for validation
7. Verify validation message is visible
8. Verify validation message text equals "Required"
9. Verify validation message is associated with password field
10. Verify login form is still visible and editable
11. Verify page URL contains '/auth/login'
```

**Assertions:**

For Scenario 1 (Invalid Credentials):
- URL contains `/auth/login`
- Alert element with role="alert" is visible
- Alert text equals "Invalid credentials"
- Alert has class "oxd-alert--error"
- Username field is visible and editable
- Password field is visible and editable

For Scenario 2 (Empty Username):
- URL contains `/auth/login`
- Validation message is visible
- Validation message text equals "Required"
- Validation message is associated with username field
- Username field is visible and editable
- Password field is visible and editable

For Scenario 3 (Empty Password):
- URL contains `/auth/login`
- Validation message is visible
- Validation message text equals "Required"
- Validation message is associated with password field
- Username field is visible and editable
- Password field is visible and editable

### Blocking Issues
- None identified. All three negative scenarios are straightforward and suitable for automation.

## Additional Notes

### Page Structure
- **Login Page**: Simple form-based authentication with error/validation message display
- **Error Display**: Invalid credentials error appears as an alert element with role="alert"
- **Validation Display**: Empty field validation messages appear below respective form fields with class "oxd-input-field-error-message"

### Browser Compatibility
- Tested on: Chrome/Chromium (Playwright default)
- Should work on: Firefox, Safari, Edge (standard web standards)

### Performance Observations
- Invalid credentials form submission is fast (< 1 second)
- Validation messages appear immediately (client-side validation)
- No significant performance issues observed

### Security Observations
- Invalid credentials error message is generic ("Invalid credentials") - does not reveal whether username or password is incorrect
- Empty field validation was observed to occur before form submission; no HTML5 `required` attribute was present on input elements
- No visible CSRF tokens in the form (may be in HTTP headers)
- User remained on login page after failed authentication attempts (no redirect to Dashboard)

### Locator Stability Summary

**Confirmed Stable Locators:**
- `page.getByPlaceholder('Username')` - Username input field
- `page.getByPlaceholder('Password')` - Password input field
- `page.getByRole('button', { name: 'Login' })` - Login button
- `page.getByRole('alert')` - Invalid credentials error alert (Scenario 1) - verified locator recommendation for the currently observed demo UI
- `page.getByText('Invalid credentials')` - Invalid credentials error message (Scenario 1) - verified locator recommendation for the currently observed demo UI
- `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Username') }).getByText('Required', { exact: true })` - Username required validation (Scenario 2) - verified field-scoped locator
- `page.locator('.oxd-input-group').filter({ has: page.getByPlaceholder('Password') }).getByText('Required', { exact: true })` - Password required validation (Scenario 3) - verified field-scoped locator
- `page.getByText('Required', { exact: true })` - Generic observation for validation message (may match multiple fields)

**Fallback Locators:**
- `input[name='username']` - Username input field (CSS selector)
- `input[name='password']` - Password input field (CSS selector)
- `.oxd-alert--error` - Error alert (CSS class)
- `.oxd-input-field-error-message` - Validation message (CSS class)

### Recommended Test Data Strategy
- Use non-existent usernames for invalid credential tests to avoid triggering account lockout
- Use arbitrary invalid passwords (no pattern matching required)
- Ensure clean login page state before each test scenario (reload page or clear form)
- Do not use real user accounts for negative testing unless specifically required

## Summary

This discovery document covers three critical negative authentication scenarios for the OrangeHRM login page:

1. **Invalid Credentials**: Validates that the application correctly rejects non-existent users with an appropriate error message
2. **Empty Username**: Validates that the application requires the username field and displays a validation message
3. **Empty Password**: Validates that the application requires the password field and displays a validation message

All three scenarios have been explored using Playwright MCP. Verified locator recommendations have been identified and tested on the live OrangeHRM application:
- Semantic HTML locators (role-based and text-based) are used for maximum stability
- Field-scoped locators have been verified to uniquely identify validation messages for each field
- Locator recommendations reflect verified behavior on the currently observed demo UI

These scenarios are suitable for automation as functional UI tests and should be implemented as part of the login test suite to ensure comprehensive coverage of both positive and negative authentication paths.
