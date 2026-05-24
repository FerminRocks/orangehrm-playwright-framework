# AI Model Selection Guide

## Principle: Explicit Model Selection
Every OpenCode task instruction **must** explicitly state:
1. **Recommended model** for the task
2. **Reason for that model choice**

This ensures cost-effective decision-making and enables evaluation of model performance over time.

## Available Models (GitHub Copilot Provider)
The following models are currently available through GitHub Copilot integration:

| Model | Best Use Case |
|-------|---------------|
| **Claude Haiku 4.5** | Fast, documentation, discovery, setup |
| **GPT-5 mini** | Broader reasoning, troubleshooting |
| **GPT-4.1** | Routine code assistance |

## Initial Usage Recommendations

### Claude Haiku 4.5 (Default for Most Tasks)
**Recommended for:**
- Creating and refining documentation
- Discovering product flows through Playwright MCP
- Making small configuration changes
- Validating setup steps
- Short exploratory tasks
- Collecting and summarizing findings

**Rationale:** Fast, accurate for well-structured tasks, cost-efficient

**Example Instructions:**
- "Using Claude Haiku 4.5 (recommended for documentation creation): Create a UI flow template..."
- "Using Claude Haiku 4.5 (recommended for controlled discovery): Explore the OrangeHRM login flow..."

### GPT-5 mini (For Broader Reasoning)
**Recommended when:**
- Claude Haiku 4.5 output is insufficient or unclear
- Troubleshooting complex integration issues
- Deciding between multiple architectural approaches
- Reviewing comprehensive documentation

**Rationale:** Broader reasoning context, better for trade-off analysis

**Example Instructions:**
- "Using GPT-5 mini (recommended for troubleshooting): Review the Playwright MCP setup and suggest fixes..."

### GPT-4.1 (Available Alternative for Code Assistance)
**Recommended when:**
- Routine TypeScript code generation is needed
- An alternative to Claude Haiku 4.5 or GPT-5 mini is preferred for a specific task

**Rationale:** Available model for code assistance tasks

**Example Instructions:**
- "Using GPT-4.1 (alternative for code assistance): Generate Page Object classes for the Admin module..."

## Upgrade Checkpoint: When to Re-Evaluate Models

### Do NOT upgrade the plan only for:
- Markdown documentation creation
- Simple setup tasks
- Discovery of routine UI flows
- Template creation
- Configuration file updates

### DO re-evaluate model choice before:
- **Framework architecture design**: Selecting POM patterns, API client design, fixture strategies
- **Substantial code generation**: Creating Page Objects, API clients, or test utilities
- **Complex refactoring**: Restructuring existing code or test organization
- **Deep code review**: Analyzing test maintainability, performance, or coverage strategy

### Re-Evaluation Process:
1. Check current budget and model availability
2. Confirm that advanced Claude models (if available) would provide measurable value
3. Document the decision in the implementation log
4. Execute the task with the chosen model
5. Log the outcome and any lessons learned

## Decision Logging
When model choices diverge from the default (Haiku 4.5), record in `docs/onboarding/implementation-log.md`:

```markdown
| Date | Phase | Activity | Model Chosen | Reason | Result |
|------|-------|----------|--------------|--------|--------|
| YYYY-MM-DD | N | Task description | Model Name | Why upgraded/selected | Outcome |
```

## Model Availability and Cost Consideration
- **Claude Haiku 4.5**: Currently available in this project; verify request multiplier or cost treatment with your active GitHub Copilot plan before making cost-based decisions
- **GPT-5 mini**: Included model on paid GitHub Copilot plans; does not consume premium requests
- **GPT-4.1**: Included model on paid GitHub Copilot plans; does not consume premium requests

**Decision-Making:**
Use Claude Haiku 4.5 for well-defined documentation and controlled discovery tasks. Use GPT-5 mini for review and troubleshooting when broader reasoning is needed. Use GPT-4.1 as an available alternative for routine code assistance. Verify your plan's specific treatment of each model before making cost-based decisions.

## Summary
Start with Claude Haiku 4.5 for documentation and controlled discovery. Use GPT-5 mini for review, troubleshooting, and broader reasoning when needed. Use GPT-4.1 as an available alternative for routine code assistance. Re-evaluate model choice before framework architecture design or substantial code generation. Verify your GitHub Copilot plan's specific cost treatment of each model before making cost-based decisions.
