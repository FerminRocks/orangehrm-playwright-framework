# OrangeHRM Product Overview

## System Under Test
OrangeHRM is an open-source Human Resource Management (HRM) system designed to manage employee information, leave requests, recruitment workflows, and administrative functions. The demo application is accessible at https://opensource-demo.orangehrmlive.com/ and serves as the product under test for this QA Automation portfolio.

## Known Modules

### Login
- Authentication module for user access
- Supports credential-based login
- Demo test credentials available for validation purposes

### Dashboard
- Primary landing page post-authentication
- Displays user profile information and quick actions
- Serves as the hub for navigating to other modules

### Admin
- Administrative configuration and settings
- User and role management
- System-wide configuration options

### PIM (Personal Information Management)
- Employee information management
- Employee records, contact details, and employment history
- Reporting and employee data aggregation

### Leave
- Leave request and approval workflows
- Leave balance tracking
- Leave policy configuration

### Recruitment
- Recruitment pipeline and candidate management
- Job opening postings
- Candidate application tracking

## Test Data

### Public Demo Credentials
The OrangeHRM demo login page displays public credentials for exploratory testing and initial automation setup:
- **Username**: Admin
- **Password**: admin123
- **Login URL**: https://opensource-demo.orangehrmlive.com/

**Important Notes**:
- These credentials are **publicly available** and displayed directly on the OrangeHRM login page; they are not confidential.
- These credentials are documented here only for **exploratory testing and initial framework setup**.
- **Future test implementation**: Credentials must NOT be hardcoded directly inside test files. Instead, credentials should be managed through:
  - Environment variables (e.g., `process.env.ORANGEHRM_USERNAME`)
  - Configuration files (e.g., `.env.local`, excluded from version control)
  - Test fixtures that inject credentials at runtime
  - CI/CD secrets management for production test environments
- This documentation serves as a reference for initial product discovery; test code must follow the credential management principles defined in `AGENTS.md`.

## Known Assumptions
- The OrangeHRM demo environment is publicly accessible and stable for testing
- Standard browser compatibility across Chromium, Firefox, and WebKit
- No persistent test data pollution between test runs is expected
- API endpoints follow RESTful conventions (pending discovery)

## Pending Discovery Items
- Complete API endpoint mapping for all modules
- Detailed navigation paths and URL patterns
- Role-based access control (RBAC) matrix for different user types
- Data persistence and cleanup strategies
- Performance baselines and acceptable response times
- Mobile and responsive design behavior
- Accessibility compliance requirements (WCAG)
- Integration points with external systems (if any)
