# Agent Skills CLI

CLI tool to install Agent Skills for AI coding assistants.

## Installation

```bash
npx create-agent-skills@latest
```

Or install globally:

```bash
npm install -g create-agent-skills@latest
```

## Usage

Run the CLI and follow the interactive prompts:

```bash
npx create-agent-skills@latest
```

### Options

1. **Install Location**
   - `Workspace` - `.agent/skills/` (project-specific)
   - `Global` - `~/.gemini/antigravity/skills/` (all projects)

2. **Skill Selection**
   - Use `Space` to toggle skills
   - Use `a` to toggle all
   - Use `i` to invert selection
   - Press `Enter` to confirm

## Available Skills

| Skill | Description |
|-------|-------------|
| `build-check` | Auto-detect project type and run build/test verification |
| `code-review` | Reviews code for bugs, style, and security issues |
| `create-agent-skill` | Helps create new skills following guidelines |
| `flutter-clean-arch` | Flutter Clean Architecture using BLoC, Dio, and GetIt |
| `git-commit` | Writes conventional commit messages |
| `git-pr` | Creates well-structured pull requests |
| `git-review` | Reviews PRs for code quality and best practices |
| `landing-page-slider` | Landing pages with integrated slider for presentations |
| `learning-mode` | AI-powered learning with explanations, diagrams, and Q&A |
| `lumi-tester` | Guide for extending the Lumi Tester framework |
| `parallel-dev` | Parallel development using Git worktrees |
| `project-documentation` | Generates comprehensive documentation for existing projects |
| `project-rules` | Create and maintain living project rules |
| `prompt-mastery` | Advanced prompting techniques for better AI output |
| `remotion` | Create videos programmatically in React |
| `rust-backend` | Build backend services with Rust and Clean Architecture |
| `safe-commands` | Safety rules for destructive commands (rm, force push, etc.) |
| `smart-routing` | Auto-select the right skill based on user intent |
| `tailwindcss-v4` | Tailwind CSS v4 setup and migration guide |
| `tauri-v2` | Build desktop apps with Tauri v2 + React |
| `techdebt` | Scan and address technical debt in codebase |
| `testing` | Helps write unit, integration, and E2E tests |
| `threejs` | Complete Three.js development guide |
| `verify-loop` | Automated build/test/lint loop until all pass |

## Available Workflows

Workflows are installed to `.agent/workflows/` (workspace only) and provide structured step-by-step processes.

| Workflow | Slash Command | Description |
|----------|--------------|-------------|
| `debug-issue` | `/debug-issue` | Systematic debugging from bug report to verified fix |
| `new-feature` | `/new-feature` | Full feature development: spec → plan → implement → verify |
| `plan-review` | `/plan-review` | Create implementation plan and cross-review as staff engineer |
| `verify-all` | `/verify-all` | Run full verification pipeline (build, lint, test, typecheck) |

## Creating New Skills

See [SKILL_GUIDELINES.md](./SKILL_GUIDELINES.md) for the complete guide.

### Quick Start

```bash
mkdir -p .agent/skills/my-skill
```

Create `SKILL.md` with:

```markdown
---
name: my-skill
description: What this skill does. Use when...
---

# My Skill

Instructions for the agent...
```

### Folder Structure

```
.agent/skills/<skill-name>/
├── SKILL.md          # Main instructions (REQUIRED)
├── scripts/          # Helper scripts (optional)
├── examples/         # Reference implementations (optional)
└── resources/        # Templates and other assets (optional)
```

## Development

```bash
# Clone the repo
git clone https://github.com/Nghi-NV/create-agent-skills.git
cd create-agent-skills

# Install dependencies
npm install

# Run locally
node bin/cli.js
```

## License

MIT
