# Getting Started with OrangeHRM QA Automation

## Project Purpose
This repository contains a professional QA Automation framework for the OrangeHRM Demo Web Application, built with Playwright and TypeScript. The framework is designed as a portfolio showcase demonstrating enterprise-grade test automation practices suitable for Senior QA Automation Engineer roles.

## Prerequisites
Before working with this project, ensure you have the following installed and configured:

### Development Environment
- **Node.js** v20.17.0
- **npm** 11.11.1
- **Git** 2.49.0.windows.1
- **Visual Studio Code** 1.120.0

### Testing Framework & Tools
- **Playwright** 1.60.0 with TypeScript (configured via `package.json`)
- **OpenCode** 1.15.9 (CLI tool for AI-assisted automation)
- **GitHub Copilot provider** (connected in OpenCode configuration)
- **Claude Haiku 4.5** (currently available through GitHub Copilot)
- **Playwright MCP** (Model Context Protocol, configured via `opencode.json`)

### Infrastructure & Collaboration
- **GitHub repository** (public or private)
- **Pull Request workflow** (for feature branches and code review)

## Initial Setup Workflow (Already Completed)
This section documents the setup that has already been completed for this repository:

1. **Create the Playwright TypeScript project**
   - Initialized with `npm init playwright@latest` and installed `@playwright/test` and `@types/node`

2. **Initialize Git and rename branch**
   - Configured local Git repository
   - Renamed default branch to `main`

3. **Validate Playwright starter tests**
   - Confirmed browser automation capabilities with example test

4. **Install OpenCode**
   - OpenCode CLI installed and available globally

5. **Open OpenCode from repository root**
   - Validated that OpenCode launches with project context

6. **Connect GitHub Copilot**
   - GitHub Copilot provider authenticated in OpenCode
   - Model selection available (Claude Haiku 4.5, GPT-5 mini, GPT-4.1)

7. **Configure Playwright MCP**
   - `opencode.json` configured with Playwright MCP command: `["npx", "@playwright/mcp@latest"]`
   - Enabled and validated for browser automation

8. **Validate browser navigation**
   - Successfully navigated to OrangeHRM login page using Playwright MCP
   - Confirmed UI elements are accessible and inspectable

9. **Publish to GitHub**
   - Repository pushed to GitHub with main branch and feature branches

10. **Establish Pull Request workflow**
    - Feature branches created and merged via Pull Requests
    - Commit history preserved and traceable

## Operational Notes

### OpenCode Interactive Terminal
- OpenCode runs as an interactive terminal UI
- System commands can be executed inside OpenCode by prefixing them with `!`
- Example: `! npm install` or `! git status`

### Repository Context
- OpenCode **must be opened from the repository root** (`C:\dev\orangehrm-playwright-framework` or equivalent)
- Working directory context is automatically set to the repository root

### Placeholder Replacement
- Some command examples may contain placeholders like `TU_USUARIO` or `YOUR_GITHUB_USERNAME`
- Always replace placeholders with your actual values before executing commands

### Local Artifacts
- The `.playwright-mcp/` directory contains temporary artifacts from Playwright MCP runs
- This directory is intentionally excluded from Git (see `.gitignore`)
- Do not commit or track files in this directory

### Playwright MCP Configuration Note
- The Playwright MCP setup initially created an incomplete command: `npx` (without the package argument)
- The working configuration requires the full command array: `["npx", "@playwright/mcp@latest"]`
- If you reconfigure Playwright MCP interactively, ensure this full command structure is preserved
