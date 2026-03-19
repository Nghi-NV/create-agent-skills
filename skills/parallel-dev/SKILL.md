---
name: parallel-dev
description: Guide for parallel development using Git worktrees. Use when working on multiple tasks simultaneously, setting up isolated workspaces, or managing concurrent feature branches. Triggers on "worktree", "parallel", "multi-task", "isolated workspace".
---

# Parallel Development with Git Worktree

Maximize productivity by running multiple development sessions in parallel, each in its own isolated workspace.

## When to Use This Skill

- Working on multiple features/fixes simultaneously
- Need isolated workspace for each task
- Want to context-switch without stashing
- Setting up a dedicated analysis/investigation workspace
- Running experiments without affecting main workspace

## Core Concept

```
git worktree = isolated working directory sharing same .git repo
```

Each worktree has its own files, own branch, but shares Git history and config.

## How to Use

### Step 1: Create Worktrees for Each Task

```bash
# From your main project directory
git worktree add ../feature-auth feature/auth
git worktree add ../fix-bug-123 fix/bug-123
git worktree add ../refactor-api refactor/api-layer
git worktree add ../analysis main          # dedicated analysis workspace
```

### Step 2: Set Up Shell Aliases (One-time)

Add to `~/.zshrc` or `~/.bashrc`:

```bash
# Quick worktree navigation
alias wt-list="git worktree list"
alias wt-add="git worktree add"
alias wt-rm="git worktree remove"

# Project-specific (customize per project)
# alias wt-feat="cd ../feature-auth"
# alias wt-fix="cd ../fix-bug-123"
```

### Step 3: Parallel Workflow

```
Worktree 1 (feature)  → Session 1 → Build feature
Worktree 2 (bugfix)   → Session 2 → Fix bug
Worktree 3 (refactor) → Session 3 → Refactor code
Worktree 4 (analysis) → Session 4 → Read logs, investigate
```

### Step 4: Cleanup When Done

```bash
# Remove worktree after merging
git worktree remove ../feature-auth

# Force remove if needed
git worktree remove --force ../feature-auth

# Prune stale worktrees
git worktree prune
```

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `git worktree list` | Show all active worktrees |
| `git worktree add <path> <branch>` | Create new worktree |
| `git worktree add <path> -b <new-branch>` | Create worktree with new branch |
| `git worktree remove <path>` | Remove worktree |
| `git worktree prune` | Clean up stale entries |
| `git worktree lock <path>` | Prevent automatic pruning |

## Best Practices

1. **Name worktree dirs consistently** — Use `../task-description` pattern
2. **One branch per worktree** — Never checkout same branch in 2 worktrees
3. **Keep analysis worktree** — Dedicated space for investigation on `main`
4. **Clean up regularly** — Remove merged worktrees to avoid clutter
5. **Use with IDE** — Open each worktree as separate project/window
6. **Don't nest worktrees** — Keep them as siblings, not children

## Decision Tree

```
Need to work on something new?
├── Quick fix (< 30 min)?
│   └── Work in current workspace
├── Parallel task (don't want to stash)?
│   └── Create new worktree
├── Investigation / analysis?
│   └── Use dedicated analysis worktree
└── Long-running experiment?
    └── Create worktree, lock it
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "branch already checked out" | Use a different branch or create new one |
| Can't delete worktree | `git worktree remove --force <path>` |
| Stale worktree entries | `git worktree prune` |
| Shared node_modules issues | Run `npm install` in each worktree separately |
