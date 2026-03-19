---
description: Create implementation plan and cross-review it like a staff engineer
---

# Plan Review Workflow

Create a solid implementation plan, then review it critically as a staff engineer before executing.

## Steps

### 1. Create the Plan
Switch to PLANNING mode. Create `implementation_plan.md`:
- Analyze the current codebase
- List all files to modify/create/delete
- Define the approach for each component
- Include verification plan

### 2. Self-Review as Staff Engineer
Review your own plan critically:

```
Act as a senior staff engineer reviewing this plan.
Challenge every assumption:
- Is this the simplest approach?
- What edge cases are missed?
- Are there any breaking changes?
- Does this follow existing patterns?
- What could go wrong?
- Is the verification plan sufficient?
```

### 3. Update Plan
Incorporate review feedback:
- Address all concerns raised
- Add missing edge cases
- Simplify over-engineered parts
- Strengthen verification plan

### 4. Request User Review
Present the reviewed plan to user via `notify_user`:
- Highlight key design decisions
- Flag any trade-offs or risks
- Ask for approval before proceeding

### 5. Execute (After Approval)
Switch to EXECUTION mode and implement the approved plan.
Follow the plan step by step.
