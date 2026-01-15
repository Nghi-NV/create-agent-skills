const path = require('path');
const fs = require('fs-extra');
const os = require('os');

// Path to bundled skills
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

// Required and optional directories for skill structure
const SKILL_STRUCTURE = {
  required: ['SKILL.md'],
  optional: ['scripts', 'examples', 'resources']
};

/**
 * Parse SKILL.md frontmatter to extract metadata
 */
function parseSkillMetadata(skillPath) {
  const skillMdPath = path.join(skillPath, 'SKILL.md');

  if (!fs.existsSync(skillMdPath)) {
    return null;
  }

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const metadata = {};

  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      metadata[match[1]] = match[2].trim();
    }
  });

  // Get skill structure info
  const structure = getSkillStructure(skillPath);

  return {
    name: metadata.name || path.basename(skillPath),
    description: metadata.description || 'No description provided',
    path: skillPath,
    structure
  };
}

/**
 * Get the structure of a skill folder
 * Returns array of existing components: ['SKILL.md', 'scripts', 'examples', 'resources']
 */
function getSkillStructure(skillPath) {
  const components = [];

  // Check required files
  for (const file of SKILL_STRUCTURE.required) {
    const filePath = path.join(skillPath, file);
    if (fs.existsSync(filePath)) {
      components.push(file);
    }
  }

  // Check optional directories
  for (const dir of SKILL_STRUCTURE.optional) {
    const dirPath = path.join(skillPath, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      components.push(dir);
    }
  }

  return components;
}

/**
 * Get all available skills from the bundled skills directory
 */
function getAvailableSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    return [];
  }

  const skillFolders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const skills = [];

  for (const folder of skillFolders) {
    const skillPath = path.join(SKILLS_DIR, folder);
    const metadata = parseSkillMetadata(skillPath);

    if (metadata) {
      skills.push(metadata);
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get the installation path based on location choice
 */
function getInstallPath(location) {
  if (location === 'global') {
    return path.join(os.homedir(), '.gemini', 'antigravity', 'skills');
  }
  return path.join(process.cwd(), '.agent', 'skills');
}

/**
 * Install selected skills to the target location
 * Follows the required structure:
 * .agent/skills/<skill-name>/
 * ├── SKILL.md          # Main instructions (REQUIRED)
 * ├── scripts/          # Helper scripts (optional)
 * ├── examples/         # Reference implementations (optional)
 * └── resources/        # Templates and other assets (optional)
 */
async function installSkills(skills, location) {
  const targetDir = getInstallPath(location);
  const results = [];

  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  for (const skill of skills) {
    const targetPath = path.join(targetDir, skill.name);

    try {
      // Check if skill already exists
      if (await fs.pathExists(targetPath)) {
        // Remove existing and reinstall
        await fs.remove(targetPath);
      }

      // Create skill directory
      await fs.ensureDir(targetPath);

      // Copy SKILL.md (required)
      const skillMdSource = path.join(skill.path, 'SKILL.md');
      const skillMdTarget = path.join(targetPath, 'SKILL.md');
      await fs.copy(skillMdSource, skillMdTarget);

      const copiedComponents = ['SKILL.md'];

      // Copy optional directories if they exist
      for (const optionalDir of SKILL_STRUCTURE.optional) {
        const sourcePath = path.join(skill.path, optionalDir);
        const targetDirPath = path.join(targetPath, optionalDir);

        if (await fs.pathExists(sourcePath)) {
          await fs.copy(sourcePath, targetDirPath);
          copiedComponents.push(optionalDir);
        }
      }

      results.push({
        name: skill.name,
        success: true,
        path: targetPath,
        structure: copiedComponents
      });
    } catch (error) {
      results.push({
        name: skill.name,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}

/**
 * Validate a skill folder structure
 * Checks for required structure:
 * - SKILL.md (required)
 * - scripts/ (optional)
 * - examples/ (optional)
 * - resources/ (optional)
 */
function validateSkill(skillPath) {
  const errors = [];
  const warnings = [];

  // Check SKILL.md exists (REQUIRED)
  const skillMdPath = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    errors.push('Missing SKILL.md file (required)');
    return { valid: false, errors, warnings };
  }

  // Check frontmatter
  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    errors.push('Missing YAML frontmatter in SKILL.md');
  } else {
    const frontmatter = frontmatterMatch[1];

    if (!frontmatter.includes('description:')) {
      errors.push('Missing required "description" field in frontmatter');
    }
  }

  // Check for recommended sections
  if (!content.includes('## When to')) {
    warnings.push('Missing "When to Use" section');
  }
  if (!content.includes('## How to')) {
    warnings.push('Missing "How to Use" section');
  }

  // Check optional directories structure
  const structure = getSkillStructure(skillPath);

  // Warn if there are extra files/folders not in the expected structure
  const allItems = fs.readdirSync(skillPath);
  const expectedItems = [...SKILL_STRUCTURE.required, ...SKILL_STRUCTURE.optional];
  const unexpectedItems = allItems.filter(item =>
    !expectedItems.includes(item) && !item.startsWith('.')
  );

  if (unexpectedItems.length > 0) {
    warnings.push(`Unexpected items in skill folder: ${unexpectedItems.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    structure
  };
}

/**
 * Create a new skill with proper structure
 */
async function createSkillTemplate(skillPath, name, description) {
  // Create main skill directory
  await fs.ensureDir(skillPath);

  // Create SKILL.md with template
  const skillMdContent = `---
name: ${name}
description: ${description}
---

# ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

Brief overview of what this skill provides.

## When to Use This Skill

- Use when [specific situation 1]
- Use when [specific situation 2]
- NOT for [exclusion case]

## Prerequisites

- [Required tool/setup 1]
- [Required tool/setup 2]

## How to Use

### Step 1: [First Action]

[Detailed instructions]

### Step 2: [Second Action]

[Detailed instructions]

## Examples

### [Example Scenario]

\`\`\`bash
# Example commands
\`\`\`

## Best Practices

- [Practice 1]
- [Practice 2]
`;

  await fs.writeFile(path.join(skillPath, 'SKILL.md'), skillMdContent);

  // Create optional directories
  for (const dir of SKILL_STRUCTURE.optional) {
    await fs.ensureDir(path.join(skillPath, dir));
    // Create .gitkeep to preserve empty directories
    await fs.writeFile(path.join(skillPath, dir, '.gitkeep'), '');
  }

  return {
    path: skillPath,
    structure: ['SKILL.md', ...SKILL_STRUCTURE.optional]
  };
}

module.exports = {
  getAvailableSkills,
  getInstallPath,
  installSkills,
  validateSkill,
  parseSkillMetadata,
  createSkillTemplate,
  getSkillStructure,
  SKILL_STRUCTURE
};
