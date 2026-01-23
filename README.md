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
| `code-review` | Reviews code for bugs, style, and security issues |
| `create-agent-skill` | Helps create new skills following guidelines |
| `documentation` | Creates clear READMEs, API docs, and comments |
| `git-commit` | Writes conventional commit messages |
| `git-pr` | Creates well-structured pull requests |
| `git-review` | Reviews PRs for code quality and best practices |
| `maestro-testing` | Write E2E tests for mobile/web apps using Maestro |
| `remotion` | Create videos programmatically in React |
| `rust-backend` | Build backend services with Rust and Clean Architecture |
| `tailwindcss-v4` | Tailwind CSS v4 setup and migration guide |
| `tauri-v2` | Build desktop apps with Tauri v2 + React |
| `testing` | Helps write unit, integration, and E2E tests |
| `threejs` | Complete Three.js development guide |

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
