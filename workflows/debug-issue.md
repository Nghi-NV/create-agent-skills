---
description: Systematic debugging workflow — from bug report to verified fix
---

# Debug Issue Workflow

Systematic approach to debugging issues end-to-end — from bug report to verified fix.

## Steps

### 1. Understand the Bug
// turbo
Read and analyze the bug report/error:
- What is the expected behavior?
- What is the actual behavior?
- When did it start (recent change? always broken?)

If bug report is unclear, ask user for:
- Steps to reproduce
- Error messages / stack traces
- Relevant logs

### 2. Reproduce the Issue
Try to reproduce the bug:
```bash
# Run the failing test/command
# Check logs for error details
```

### 3. Locate Root Cause
// turbo
- Search for relevant code using error messages/stack traces
- Trace the execution path from entry point to failure
- Check recent git changes that might have introduced the bug:
```bash
git log --oneline -10
git diff HEAD~5 -- <suspected-files>
```

### 4. Plan the Fix
Before changing code, document:
- Root cause (1-2 sentences)
- Proposed fix approach
- Files that need to change
- Potential side effects

### 5. Implement the Fix
Make the minimal change to fix the issue:
- Follow existing code patterns
- Don't refactor while fixing bugs
- Add a comment explaining the fix if non-obvious

### 6. Verify the Fix
// turbo
Run verification loop (use `verify-loop` skill):
```bash
# Build
# Lint
# Test (especially the failing test)
# Manual verification if needed
```

### 7. Report
Report to user:
- ✅ Root cause identified
- ✅ Fix implemented
- ✅ Tests passing
- Any follow-up items (related bugs, tech debt)
