#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const { getAvailableSkills, installSkills, getInstallPath } = require('../lib/installer');

const BANNER = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ${chalk.cyan.bold('🚀 Agent Skills Installer')}                                 ║
║                                                               ║
║   Install skills to extend your AI agent's capabilities       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`;

async function main() {
  console.log(BANNER);

  const skills = getAvailableSkills();

  if (skills.length === 0) {
    console.log(chalk.yellow('⚠️  No skills available to install.'));
    process.exit(0);
  }

  // Step 1: Choose installation location
  const { installLocation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'installLocation',
      message: 'Where do you want to install skills?',
      choices: [
        {
          name: `${chalk.green('Workspace')} (.agent/skills/) - Project-specific skills`,
          value: 'workspace'
        },
        {
          name: `${chalk.blue('Global')} (~/.gemini/antigravity/skills/) - Available everywhere`,
          value: 'global'
        }
      ]
    }
  ]);

  // Step 2: Select skills with checkbox
  const { selectedSkillNames } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedSkillNames',
      message: 'Select skills to install:',
      choices: skills.map(skill => ({
        name: skill.name,
        value: skill.name,
        checked: true
      })),
      pageSize: 15,
      validate: (answer) => {
        if (answer.length === 0) {
          return 'Please select at least one skill.';
        }
        return true;
      }
    }
  ]);

  const selectedSkills = skills.filter(s => selectedSkillNames.includes(s.name));

  // Step 3: Confirm installation
  console.log('');
  console.log(chalk.bold('📦 Skills to install:'));
  selectedSkills.forEach(skill => {
    console.log(`   ${chalk.green('•')} ${skill.name}`);
  });
  console.log('');

  const installPath = getInstallPath(installLocation);
  console.log(chalk.dim(`📁 Install location: ${installPath}`));
  console.log('');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with installation?',
      default: true
    }
  ]);

  if (!confirm) {
    console.log(chalk.yellow('Installation cancelled.'));
    process.exit(0);
  }

  // Step 4: Install skills
  const spinner = ora('Installing skills...').start();

  try {
    const results = await installSkills(selectedSkills, installLocation);

    spinner.succeed(chalk.green('Installation complete!'));
    console.log('');

    // Show results
    results.forEach(result => {
      if (result.success) {
        console.log(`   ${chalk.green('✔')} ${result.name} installed successfully`);
        if (result.structure && result.structure.length > 1) {
          console.log(chalk.dim(`      └── ${result.structure.join(', ')}`));
        }
      } else {
        console.log(`   ${chalk.red('✖')} ${result.name} failed: ${result.error}`);
      }
    });

    console.log('');
    console.log(chalk.cyan('🎉 Skills are ready to use!'));
    console.log(chalk.dim(`   Location: ${installPath}`));

  } catch (error) {
    spinner.fail(chalk.red('Installation failed'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

main().catch(error => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});
