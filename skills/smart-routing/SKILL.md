---
name: smart-routing
description: Quick reference for mapping user intents to the right skills. Use when unsure which skill to apply, or when auto-suggesting the best skill based on user keywords.
---

# Smart Routing — Skill Selector

Quick-reference routing table to find the right skill for any task. This skill helps AI agents auto-select the most relevant skill based on user intent keywords.

## When to Use This Skill

- When a user request could match multiple skills
- When uncertain which skill applies best
- For discovering available skills

## Routing Table

### Development & Build

| User Keywords | → Skill | Description |
|---|---|---|
| commit, push, git add | `git-commit` | Conventional commits with emoji |
| review, PR, pull request | `git-pr`, `code-review` | PR creation and code review |
| review code, audit, check quality | `git-review`, `code-review` | Code review guidelines |
| build, check build, verify, compile | `build-check` | Auto-detect and run build |
| verify all, check everything, run all checks | `verify-loop` | Build+lint+test loop until pass |
| init, setup, new project | `project-init` | Project initialization |
| worktree, parallel, multi-task | `parallel-dev` | Git worktree parallel dev |
| rules, conventions, CLAUDE.md | `project-rules` | Living project rules |
| tech debt, cleanup, duplication | `techdebt` | Tech debt scanner |
| prompt, how to ask, better results, spec | `prompt-mastery` | Advanced prompting |
| explain, teach, how does this work, diagram | `learning-mode` | AI-powered learning |

### Frameworks & Languages

| User Keywords | → Skill | Description |
|---|---|---|
| flutter, dart, bloc, clean arch | `flutter-clean-arch` | Flutter clean architecture |
| tauri, desktop, electron | `tauri-v2` | Tauri 2.0 desktop apps |
| rust, backend, API, axum | `rust-backend` | Rust backend services |
| tailwind, CSS, styling | `tailwindcss-v4` | Tailwind CSS v4 |
| three.js, 3D, WebGL, scene | `threejs` | Three.js 3D development |
| remotion, video, animation | `remotion` | Programmatic video creation |

### Testing & Safety

| User Keywords | → Skill | Description |
|---|---|---|
| test, lumi, automation | `lumi-tester` | Lumi test framework |
| rm, delete, force push, dangerous | `safe-commands` | Command safety validation |
| document, docs, README | `project-documentation` | Auto-generate docs |

### Meta & Learning

| User Keywords | → Skill | Description |
|---|---|---|
| create skill, new skill | `create-agent-skill` | Skill creation guide |

## Priority Rules

When multiple skills match:

1. **Exact framework match** → Use framework-specific skill
2. **Generic match** → Use general skill
3. **Learning request** → Use `learning-mode` skill

## Decision Tree

```
User Request Analysis:
├── Contains git/commit/push keywords?
│   └── Use git-commit skill
├── Contains framework name? (flutter/tauri/rust/etc.)
│   └── Use framework-specific skill
├── Contains "build"/"test"/"verify"?
│   ├── Single check → Use build-check skill
│   └── Full verification → Use verify-loop
├── Contains "review"/"PR"?
│   └── Use code-review or git-pr
├── Contains "delete"/"rm"/"force"?
│   └── Check safe-commands skill first
├── Contains "worktree"/"parallel"?
│   └── Use parallel-dev skill
├── Contains "rules"/"conventions"?
│   └── Use project-rules skill
├── Contains "tech debt"/"cleanup"?
│   └── Use techdebt skill
├── Contains "explain"/"teach"/"diagram"?
│   └── Use learning-mode skill
├── Contains "prompt"/"spec"/"requirements"?
│   └── Use prompt-mastery skill
└── Not sure?
    └── Ask user for clarification
```
