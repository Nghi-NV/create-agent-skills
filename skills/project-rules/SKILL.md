---
name: project-rules
description: Create and maintain living project rules (similar to CLAUDE.md). Use when setting up project conventions, after making mistakes that should not repeat, or when onboarding new team members. Triggers on "project rules", "CLAUDE.md", "rules", "conventions".
---

# Project Rules — Living Documentation

Create and maintain a living rules file for each project. Every correction becomes a rule, preventing repeated mistakes.

## When to Use This Skill

- Starting a new project (create initial rules)
- After agent makes a mistake (update rules to prevent recurrence)
- Onboarding new team member or AI session
- Establishing coding conventions
- When user says "update rules", "add rule", "don't do that again"

## Rules File Location

```
project-root/
├── .agent/
│   └── rules.md          ← Project-specific rules (PRIMARY)
├── .agent/
│   └── workflows/        ← Project-specific workflows
└── src/
    └── module/
        └── .agent/
            └── rules.md  ← Module-specific rules (OPTIONAL)
```

## How to Use

### Step 1: Create Initial Rules File

Generate a starter rules file by analyzing the project:

```markdown
# Project Rules

## Build & Test
- Build: `<detected build command>`
- Test: `<detected test command>`
- Lint: `<detected lint command>`

## Code Style
- Language: <detected language>
- Framework: <detected framework>
- [Add specific style rules as discovered]

## Architecture
- [Add architecture rules as discovered]

## Mistakes Log
<!-- Rules added after corrections -->
```

### Step 2: Self-Healing Loop

When the agent makes a mistake:

```
1. User corrects the agent
2. Agent asks: "Should I add this to project rules?"
3. If yes → append to Mistakes Log section
4. Future sessions read rules → mistake doesn't recur
```

### Step 3: Keep Rules Concise

| Rules Length | Action |
|---|---|
| < 100 lines | ✅ Ideal — focused and scannable |
| 100-200 lines | ⚠️ Consider splitting by module |
| > 200 lines | ❌ Too long — split into module-level rules |

### Step 4: Rules Categories

Include only rules the agent **cannot infer** by itself:

| Category | Example |
|----------|---------|
| Build commands | `cargo build --features full` |
| Test commands | `npm test -- --coverage` |
| Code style | "Use Result type, never throw exceptions" |
| Architecture | "All API calls go through src/api/ layer" |
| Naming | "Use snake_case for Rust, camelCase for TS" |
| Dependencies | "No new deps without team approval" |
| Common mistakes | "Don't import from internal modules" |
| File patterns | "Tests go in `__tests__/` not alongside source" |

## Example Rules File

```markdown
# Project Rules — MyApp

## Build & Test
- Build: `cargo build`
- Test: `cargo test`
- Lint: `cargo clippy -- -D warnings`
- Format check: `cargo fmt --check`

## Code Style
- Use `thiserror` for error types, not manual impl
- Prefer `&str` over `String` in function parameters
- All public functions must have doc comments

## Architecture
- Domain logic in `src/domain/`, never in handlers
- Repository pattern via traits in `src/ports/`
- No direct database calls from domain code

## Mistakes Log
- 2024-01-15: Don't use `unwrap()` in production code → use `?` operator
- 2024-01-20: Always run `cargo clippy` before committing
- 2024-02-01: The `user_id` field is UUID, not i64
```

## Best Practices

1. **Start small** — Begin with build/test commands, grow over time
2. **Be specific** — "Use X" is better than "follow best practices"
3. **Update after every correction** — This is the core value of living rules
4. **Team-shared** — Commit rules file to Git for whole team benefit
5. **Module-level rules** — Split when project grows large
6. **Date entries in Mistakes Log** — Track when rules were added
