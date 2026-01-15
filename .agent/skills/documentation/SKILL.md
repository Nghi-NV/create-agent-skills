---
name: documentation
description: Creates clear, comprehensive documentation. Use when writing READMEs, API docs, code comments, or user guides. Follows documentation best practices.
---

# Documentation Skill

Guide for creating effective documentation that helps users and developers understand your code.

## When to Use This Skill

- Writing or updating README files
- Creating API documentation
- Documenting code with comments
- Writing user guides or tutorials
- Creating architecture documentation

## Documentation Types

### 1. README.md

Every project needs a README with these sections:

```markdown
# Project Name

Brief description of what this project does.

## Features

- Feature 1
- Feature 2

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Quick Start

\`\`\`javascript
// Minimal example to get started
\`\`\`

## Documentation

Link to full documentation.

## Contributing

How to contribute.

## License

MIT / Apache-2.0 / etc.
```

### 2. API Documentation

Document every public API:

```javascript
/**
 * Creates a new user in the system.
 * 
 * @param {Object} userData - The user data
 * @param {string} userData.email - User's email address
 * @param {string} userData.name - User's display name
 * @param {string} [userData.avatar] - Optional avatar URL
 * @returns {Promise<User>} The created user object
 * @throws {ValidationError} If email is invalid
 * @throws {DuplicateError} If email already exists
 * 
 * @example
 * const user = await createUser({
 *   email: 'john@example.com',
 *   name: 'John Doe'
 * });
 */
async function createUser(userData) { }
```

### 3. Code Comments

#### When to Comment

| Comment | Don't Comment |
|---------|---------------|
| Complex business logic | Obvious code |
| Non-obvious decisions | What the code does |
| Workarounds/hacks | Self-explanatory names |
| TODO/FIXME items | Commented-out code |

#### Comment Examples

```javascript
// ❌ Bad - states the obvious
// Increment counter by 1
counter++;

// ✅ Good - explains why
// Use weekday index for backwards compatibility with legacy API
const dayIndex = date.getDay();

// ✅ Good - documents known issue
// HACK: Safari doesn't support this API, using polyfill
// TODO: Remove when Safari 17+ adoption > 90%
if (!window.ResizeObserver) { }
```

### 4. Architecture Documentation

Use diagrams for complex systems:

```markdown
## System Architecture

\`\`\`mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[User Service]
    B --> E[Order Service]
    D --> F[(User DB)]
    E --> G[(Order DB)]
\`\`\`
```

## Decision Tree: What to Document

```
Is this public/exported?
├── YES
│   ├── Is it a function/method?
│   │   └── Document: params, return, throws, example
│   ├── Is it a class?
│   │   └── Document: purpose, usage, public methods
│   └── Is it a constant/config?
│       └── Document: purpose, valid values
└── NO (internal)
    ├── Is the logic complex?
    │   └── Add inline comments explaining why
    └── Is it straightforward?
        └── No documentation needed
```

## Writing Guidelines

### Be Concise
```diff
- ❌ "This function is used to validate the user's email address by checking if it conforms to the standard email format using a regular expression pattern."

+ ✅ "Validates email format. Returns true if valid."
```

### Use Active Voice
```diff
- ❌ "The configuration should be loaded before the server is started."
+ ✅ "Load configuration before starting the server."
```

### Include Examples
```javascript
/**
 * Formats a date relative to now.
 * 
 * @example
 * formatRelative(new Date()) // "just now"
 * formatRelative(yesterday) // "1 day ago"
 * formatRelative(lastWeek) // "7 days ago"
 */
```

### Use Consistent Terminology

Create a glossary for project-specific terms:

| Term | Definition |
|------|------------|
| Workspace | A user's collection of projects |
| Skill | A reusable AI capability package |
| Agent | The AI assistant that executes skills |

## Documentation Checklist

### README
- [ ] Clear project description
- [ ] Installation instructions
- [ ] Quick start example
- [ ] Prerequisites listed
- [ ] License specified

### API Docs
- [ ] All public functions documented
- [ ] Parameters and return types specified
- [ ] Examples for common use cases
- [ ] Error conditions documented

### Code Comments
- [ ] Complex logic explained
- [ ] Non-obvious decisions documented
- [ ] TODOs have issue links
- [ ] No commented-out code

## Best Practices

1. **Keep docs close to code** - Inline comments and JSDoc stay in sync better
2. **Update docs with code** - Make it part of your PR checklist
3. **Use spell check** - Typos undermine credibility
4. **Test your examples** - Ensure code samples actually work
5. **Review as user** - Read your docs as if you know nothing

## Tools

| Tool | Purpose |
|------|---------|
| JSDoc | JavaScript API documentation |
| TypeDoc | TypeScript documentation |
| Swagger/OpenAPI | REST API documentation |
| MkDocs | Documentation sites |
| Mermaid | Diagrams in markdown |
