---
name: prompt-mastery
description: Advanced prompting techniques for better AI output. Use when crafting complex requests, writing detailed specs, challenging AI responses, or needing higher quality code generation. Triggers on "prompt", "how to ask", "better results", "spec", "requirements".
---

# Prompt Mastery — Advanced Techniques

Level up your prompting to get dramatically better results from AI coding assistants.

## When to Use This Skill

- Writing complex feature requests
- Getting mediocre results and need improvement
- Crafting detailed specifications
- Wanting AI to self-verify its work
- Reviewing/challenging AI-generated code

## Technique 1: Bounded Context

Constrain what the AI should touch:

```
# ❌ Vague
"Add authentication"

# ✅ Bounded
"Add JWT authentication:
- Touch only files in src/auth/ and src/middleware/
- Use the existing pattern in src/services/userService.ts
- No new dependencies
- Use bcrypt (already in package.json)"
```

## Technique 2: Challenge & Verify

Force the AI to prove its work:

```
"Prove this works — compare main vs your branch."
"Grill me on edge cases before we merge."
"Act as a staff engineer reviewing this PR. Be critical."
"What could go wrong with this approach?"
```

## Technique 3: Iterative Refinement

When first attempt is mediocre:

```
"Scrap this and implement the elegant solution
given what you've learned from the first attempt."

"This works but is too complex. Simplify using
the pattern from src/utils/existing-helper.ts"
```

## Technique 4: Detailed Specs

Remove ambiguity before handing off:

```markdown
## Feature: User Preferences API

### Endpoints
- GET /api/preferences → returns all prefs
- PATCH /api/preferences → partial update

### Data Model
- theme: "light" | "dark" | "system"
- language: ISO 639-1 code
- notifications: { email: bool, push: bool }

### Constraints
- Max 10 preferences per user
- Values must be JSON-serializable
- 1KB max per preference value

### Error Cases
- 404 if user not found
- 422 if invalid preference key
- 413 if value exceeds size limit
```

## Technique 5: Role Assignment

```
"You are a senior Rust developer reviewing this code.
Focus on: memory safety, error handling, performance."

"Act as a security auditor. Find vulnerabilities
in this authentication flow."
```

## Technique 6: Output Format Control

```
"Return the result as:
1. Summary (2-3 sentences)
2. Files changed (table format)
3. Breaking changes (if any)
4. Test commands to verify"
```

## Prompt Templates

### Bug Fix Request
```
Bug: [description]
Steps to reproduce: [steps]
Expected: [expected behavior]
Actual: [actual behavior]
Logs/Error: [paste relevant logs]

Fix this bug. Run tests after fixing to verify.
```

### Feature Request
```
Feature: [name]
User story: As a [role], I want [action], so that [benefit]
Acceptance criteria:
- [ ] [criterion 1]
- [ ] [criterion 2]
Files to modify: [list or "you decide"]
Constraints: [any limitations]
```

### Refactor Request
```
Refactor: [what to refactor]
Current problem: [why it needs refactoring]
Target pattern: [desired pattern or "suggest one"]
Constraints:
- No behavior changes
- All existing tests must pass
- Touch only [specific files/modules]
```

## Anti-Patterns to Avoid

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| "Fix it" | "Fix the null pointer on line 42 in auth.ts" |
| "Make it better" | "Reduce complexity, extract helper functions" |
| "Add everything" | "Add only the login endpoint first" |
| "Just do it" | "Follow the pattern in existingService.ts" |
| Multi-topic prompt | One topic per prompt, chain results |

## Best Practices

1. **One task per prompt** — Break complex work into steps
2. **Provide examples** — Show desired input/output format
3. **Set constraints early** — Files, deps, patterns to follow
4. **Include acceptance criteria** — How do we know it's done?
5. **Reference existing code** — "Use the pattern from X"
6. **Ask for plan first** — "Plan this, don't implement yet"
