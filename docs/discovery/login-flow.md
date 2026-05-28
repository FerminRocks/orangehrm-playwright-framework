# UI Flow Discovery: Successful Login Flow

## Flow Name
Successful Login to Dashboard

## Objective
Authenticate a user with valid credentials (Admin/admin123) and verify successful navigation to the authenticated Dashboard page.

## Preconditions
- User is not authenticated (session cleared or new browser session)
- User has access to the OrangeHRM login page
- Valid demo credentials are available (Admin/admin123)

## Test Data
- **Accounts**: 
  - Username: `Admin`
  - Password: `admin123`
  - Expected User Display Name: `Eric Cantona`
- **Other Data**: 
  - Public demo credentials (no sensitive data)
  - Timezone offset: -6 (GMT)

## Navigation Steps

| Step | Action | Expected Result | Notes |
|------|--------|-----------------|-------|
| 1 | Navigate to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Login page loads with form visible | Page title: "OrangeHRM" |
| 2 | Enter "Admin" in Username field | Username field accepts input | Field is labeled "Username" |
| 3 | Enter "admin123" in Password field | Password field accepts input | Field is labeled "Password" |
| 4 | Click "Login" button | Form submits to `/web/index.php/auth/validate` | POST request sent |
| 5 | Wait for page load | Dashboard page loads successfully | URL changes to `/web/index.php/dashboard/index` |
| 6 | Verify authenticated state | User profile "Eric Cantona" visible in top-right | Navigation menu accessible |

## UI Elements and Recommended Locators

### Login Page Elements

| Element | Purpose | Recommended Locator | Locator Strategy | Stability Notes |
|---------|---------|---------------------|-----------------|-----------------|
| Username input field | Enter username | `getByPlaceholder('Username')` | Placeholder-based | Confirmed: uniquely identifies the input on the live page |
| | | `input[name='username']` | CSS selector | Fallback; attribute-based |
| Password input field | Enter password | `getByPlaceholder('Password')` | Placeholder-based | Confirmed: uniquely identifies the input on the live page |
| | | `input[name='password']` | CSS selector | Fallback; attribute-based |
| Login button | Submit credentials | `getByRole('button', { name: 'Login' })` | Role-based | Confirmed: uniquely identifies the submit button on the live page |
| | | `button:has-text('Login')` | Text-based | Alternative; depends on exact text |
| Forgot password link | Password recovery | `getByText('Forgot your password?')` | Text-based | Stable; unique text |
| Demo credentials hint | Display credentials | `getByText(/Username : Admin/)` | Text pattern | Informational only; not interactive |
| | | `getByText(/Password : admin123/)` | Text pattern | Informational only; not interactive |
| OrangeHRM logo | Branding | `img[alt='company-branding']` | Alt text | Stable; semantic |
| Social media links | External navigation | `getByRole('link')` | Role-based | Multiple links; use index or URL |

### Dashboard Page Elements (Post-Login)

| Element | Purpose | Recommended Locator | Locator Strategy | Stability Notes |
|---------|---------|---------------------|-----------------|-----------------|
| Dashboard heading | Page title | `getByRole('heading', { level: 6, name: 'Dashboard' })` | Role + level | Stable; semantic heading |
| User profile button | User menu | `getByText('Eric Cantona')` | Text-based | **Caution**: User name varies by account |
| | | `img[alt='profile picture']` | Alt text | Stable; semantic image |
| Sidebar navigation | Module access | `getByRole('navigation', { name: 'Sidepanel' })` | Role + name | Stable; semantic navigation |
| Admin menu item | Navigate to Admin | `getByRole('link', { name: 'Admin' })` | Role + name | Stable; business-visible |
| PIM menu item | Navigate to PIM | `getByRole('link', { name: 'PIM' })` | Role + name | Stable; business-visible |
| Leave menu item | Navigate to Leave | `getByRole('link', { name: 'Leave' })` | Role + name | Stable; business-visible |
| Time menu item | Navigate to Time | `getByRole('link', { name: 'Time' })` | Role + name | Stable; business-visible |
| Recruitment menu item | Navigate to Recruitment | `getByRole('link', { name: 'Recruitment' })` | Role + name | Stable; business-visible |
| My Info menu item | Navigate to My Info | `getByRole('link', { name: 'My Info' })` | Role + name | Stable; business-visible |
| Performance menu item | Navigate to Performance | `getByRole('link', { name: 'Performance' })` | Role + name | Stable; business-visible |
| Dashboard menu item | Navigate to Dashboard | `getByRole('link', { name: 'Dashboard' })` | Role + name | Stable; business-visible |
| Directory menu item | Navigate to Directory | `getByRole('link', { name: 'Directory' })` | Role + name | Stable; business-visible |
| Maintenance menu item | Navigate to Maintenance | `getByRole('link', { name: 'Maintenance' })` | Role + name | Stable; business-visible |
| Claim menu item | Navigate to Claim | `getByRole('link', { name: 'Claim' })` | Role + name | Stable; business-visible |
| Buzz menu item | Navigate to Buzz | `getByRole('link', { name: 'Buzz' })` | Role + name | Stable; business-visible |
| Dashboard widgets | Content cards | `locator('[class*="card"]')` | CSS class pattern | ~25 widgets; count may vary |
| Topbar menu | Secondary navigation | `getByRole('navigation', { name: 'Topbar Menu' })` | Role + name | Stable; semantic navigation |

**Locator Selection Guidelines:**
- **Prefer** `getByRole()` with accessible names (most stable, business-visible)
- **Prefer** `getByLabel()` or `getByPlaceholder()` for form fields
- **Prefer** `getByText()` for buttons and headings with stable text
- **Avoid** CSS selectors (`.class`, `#id`) unless element has no semantic meaning
- **Avoid** XPath unless absolutely necessary; CSS as last resort

## Validations / Assertions

### Success State (Login Page):
- Assert that the login page is displayed with URL containing `/auth/login`
- Assert that the username field is visible and accepts input
- Assert that the password field is visible and accepts input
- Assert that the "Login" button is visible and clickable
- Assert that demo credentials hint is displayed: "Username : Admin" and "Password : admin123"

### Verified Locators (Playwright MCP)

- Confirmed `page.getByPlaceholder('Username')` uniquely identifies the username input on the live login page.
- Confirmed `page.getByPlaceholder('Password')` uniquely identifies the password input on the live login page.
- Confirmed `page.getByRole('button', { name: 'Login' })` uniquely identifies the Login submit button on the live login page.
- Note: `getByLabel('Username')` / `getByLabel('Password')` did not resolve on the live page during verification and were therefore replaced with placeholder-based locators above.

### Success State (Dashboard Page):
- Assert that the dashboard page is displayed with URL containing `/dashboard/index`
- Assert that the page title is "OrangeHRM"
- Assert that the user profile displays "Eric Cantona" (or authenticated user name)
- Assert that the sidebar navigation is visible with all expected menu items:
  - Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz
- Assert that the main dashboard heading displays "Dashboard"
- Assert that dashboard widgets are loaded (approximately 25 card elements)
- Assert that the topbar menu is visible with user profile and other controls

### Error Handling:
- Assert that invalid credentials display an error message (not tested in this flow)
- Assert that empty fields prevent form submission (not tested in this flow)

## Network Calls Observed

### Login Form Submission:
- **Method**: POST
- **Endpoint**: `/web/index.php/auth/validate`
- **Request Body**: Form data with username and password (credentials not logged for security)
- **Response Status**: 302 (Redirect) or 200 (Success)
- **Redirect Target**: `/web/index.php/dashboard/index`

### Dashboard Page Load (Post-Login):
The following API calls are made after successful authentication:

- **GET** `/web/index.php/core/i18n/messages` → [304 Not Modified]
  - Purpose: Load internationalization messages
  
- **GET** `/web/index.php/api/v2/dashboard/employees/time-at-work?timezoneOffset=-6&currentDate=2026-05-28&currentTime=15:20` → [200 OK]
  - Purpose: Load employee time-at-work widget data
  
- **GET** `/web/index.php/api/v2/dashboard/employees/action-summary` → [200 OK]
  - Purpose: Load action summary widget
  
- **GET** `/web/index.php/api/v2/dashboard/shortcuts` → [200 OK]
  - Purpose: Load dashboard shortcuts
  
- **GET** `/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc` → [200 OK]
  - Purpose: Load buzz feed (social feed)
  
- **GET** `/web/index.php/api/v2/dashboard/employees/leaves?date=2026-05-28` → [200 OK]
  - Purpose: Load employee leave information
  
- **GET** `/web/index.php/api/v2/dashboard/employees/subunit` → [200 OK]
  - Purpose: Load subunit information
  
- **GET** `/web/index.php/api/v2/dashboard/employees/locations` → [200 OK]
  - Purpose: Load location information
  
- **POST** `/web/index.php/events/push` → [200 OK]
  - Purpose: Push event tracking or notifications

**Note**: Sensitive information (tokens, cookies, session values) is not documented per security best practices.

## Risks / Open Questions

### Risks:
- **Risk**: User profile name varies by account
  - **Mitigation**: Use the authenticated user's actual name from the profile element; do not hardcode "Eric Cantona" in tests
  
- **Risk**: Dashboard widget count may vary based on user role or configuration
  - **Mitigation**: Assert that widgets are present and loaded, not a specific count
  
- **Risk**: Timezone offset is hardcoded in API calls (-6)
  - **Mitigation**: Verify that timezone is correctly detected from browser/system settings; may need to adjust for different test environments
  
- **Risk**: Session timeout may occur during long test runs
  - **Mitigation**: Implement session refresh or re-login logic in test fixtures

### Questions:
- **Question**: Does the login form have CSRF protection?
  - **Investigation needed**: Check for CSRF tokens in the form or request headers
  
- **Question**: Are there any rate-limiting or account lockout mechanisms?
  - **Investigation needed**: Attempt multiple failed logins to verify behavior
  
- **Question**: Does the login page display different content for different user roles?
  - **Investigation needed**: Test with different user accounts (Admin, Manager, Employee)
  
- **Question**: Are there any JavaScript errors or console warnings during login?
  - **Investigation needed**: Check browser console for errors during the login flow

## Automation Recommendation

### Candidate Test Type:
- [x] **Smoke test** (critical path, high priority)
- [x] **Functional UI test** (standard feature validation)
- [ ] API test (backend validation)
- [ ] E2E test (multi-module workflow)

**Rationale**: The login flow is a critical path that must work for all subsequent tests. It should be automated as a smoke test and as a prerequisite for other functional tests.

### Automation Approach:

**Page Objects:**
- Create `LoginPage` with methods:
  - `navigateToLogin()` - Navigate to login page
  - `enterUsername(username)` - Fill username field
  - `enterPassword(password)` - Fill password field
  - `clickLogin()` - Click login button
  - `isLoginPageDisplayed()` - Verify login page is visible
  
- Create `DashboardPage` with methods:
  - `isDashboardDisplayed()` - Verify dashboard is visible
  - `getUserProfileName()` - Get authenticated user name
  - `getNavigationMenuItems()` - Get list of menu items
  - `isWidgetLoaded(widgetName)` - Verify specific widget is loaded

**Test Fixtures:**
- Create `loginFixture` to handle login setup for other tests
- Create `testUser` fixture with credentials (Admin/admin123)

**Test Flow:**
1. Navigate to login page
2. Verify login page is displayed
3. Enter valid credentials (Admin/admin123)
4. Click login button
5. Verify dashboard page is displayed
6. Verify user profile name is visible
7. Verify navigation menu is accessible
8. Verify dashboard widgets are loaded

**Assertions:**
- URL contains `/dashboard/index`
- Page title is "OrangeHRM"
- User profile displays authenticated user name
- Navigation menu contains expected items
- Dashboard widgets are present and loaded
- No JavaScript errors in console

### Blocking Issues:
- None identified. The login flow is straightforward and suitable for automation.

## Additional Notes

### Page Structure:
- **Login Page**: Simple form-based authentication with demo credentials displayed
- **Dashboard Page**: Multi-panel layout with sidebar navigation, topbar menu, and content area with widgets
- **Responsive Design**: Page uses CSS grid and flexbox; may need responsive testing

### Browser Compatibility:
- Tested on: Chrome/Chromium (Playwright default)
- Should work on: Firefox, Safari, Edge (standard web standards)

### Performance Observations:
- Login form submission is fast (< 1 second)
- Dashboard page load includes multiple API calls (total ~2-3 seconds)
- All API calls return 200 OK or 304 Not Modified (no errors)

### Security Observations:
- Demo credentials are displayed on the login page (intentional for demo purposes)
- No visible CSRF tokens in the form (may be in HTTP headers)
- Session is maintained via cookies (not visible in this exploration)
