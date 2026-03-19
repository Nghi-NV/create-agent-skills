---
name: learning-mode
description: Use AI to learn and explain codebases, concepts, and architectures. Generate visual explanations, ASCII diagrams, and interactive presentations. Triggers on "explain", "teach me", "how does this work", "diagram".
---

# Learning Mode — AI-Powered Knowledge Building

Use AI to deeply understand codebases, protocols, and concepts through visual explanations, diagrams, and interactive learning.

## When to Use This Skill

- Exploring an unfamiliar codebase
- Understanding complex algorithms or protocols
- Need visual explanation (diagrams, presentations)
- Want to test your understanding with Q&A
- Onboarding onto a new project

## Technique 1: Code Explanation

```
"Explain the authentication flow in this codebase.
Start from the login endpoint and trace through
every function call until the JWT is returned."
```

Output format options:
- **Step-by-step narrative** — "First, the request hits..."
- **Numbered flow** — "1. Client sends POST /login → 2. authController validates..."
- **Call graph** — Show function-by-function flow

## Technique 2: ASCII Diagrams

```
"Draw an ASCII diagram showing the data flow
between these 3 services: API Gateway, Auth Service,
Database."
```

Example output:
```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Client  │────▶│ API Gateway  │────▶│   Auth   │
│          │◀────│   (nginx)    │◀────│ Service  │
└──────────┘     └──────┬───────┘     └────┬─────┘
                        │                   │
                        │              ┌────▼─────┐
                        └─────────────▶│ Database │
                                       └──────────┘
```

## Technique 3: Mermaid Diagrams

Ask for mermaid diagrams for complex flows:

```
"Create a mermaid sequence diagram showing
the OAuth2 authorization code flow."
```

## Technique 4: Architecture Overview

```
"Give me a complete architecture overview of this project:
1. Directory structure and purpose of each folder
2. Key dependencies and why they're used
3. Data flow from request to response
4. State management approach
Output as a structured document with diagrams."
```

## Technique 5: Comparative Learning

```
"Compare these two approaches:
1. Current: callback-based error handling
2. Proposed: Result type pattern

Show pros/cons table and code examples for each."
```

## Technique 6: Knowledge Testing

```
"I think this module handles user sessions by storing
them in Redis with a 24-hour TTL. Is that correct?
What am I missing?"
```

The AI will:
1. Verify your understanding
2. Correct any misconceptions
3. Fill in gaps you missed
4. Ask follow-up questions to test deeper understanding

## Output Formats

| Request | Good For |
|---------|----------|
| "Explain in steps" | Linear processes |
| "Draw ASCII diagram" | Quick architecture views |
| "Create mermaid diagram" | Complex flows, sequences |
| "Make a comparison table" | Evaluating options |
| "Give me the TL;DR" | Quick overview |
| "Explain like I'm a junior dev" | Deep, accessible explanations |

## Best Practices

1. **Start broad, then zoom in** — "Overview first, then explain X"
2. **Ask "why" not just "what"** — Understanding decisions matters
3. **Test your understanding** — State what you think, ask for correction
4. **Request diagrams** — Visual aids improve comprehension 2x
5. **Chain questions** — Build on previous answers for deeper understanding
6. **Save insights** — Ask agent to update project rules with key learnings
