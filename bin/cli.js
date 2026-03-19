#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const {
  getAvailableSkills,
  installSkills,
  getInstallPath,
  getAvailableWorkflows,
  getWorkflowInstallPath,
  installWorkflows
} = require('../lib/installer');

const BANNER = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ${chalk.cyan.bold('🚀 Agent Skills Installer')}                                 ║
║                                                               ║
║   Install skills & workflows for your AI coding agent         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`;

async function main() {
  console.log(BANNER);

  const skills = getAvailableSkills();
  const workflows = getAvailableWorkflows();

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
        name: `${skill.name} ${chalk.dim('— ' + skill.description.substring(0, 60))}`,
        value: skill.name,
        checked: true
      })),
      pageSize: 20,
      validate: (answer) => {
        if (answer.length === 0) {
          return 'Please select at least one skill.';
        }
        return true;
      }
    }
  ]);

  const selectedSkills = skills.filter(s => selectedSkillNames.includes(s.name));

  // Step 2.5: Select workflows (workspace only)
  let selectedWorkflows = [];
  if (installLocation === 'workspace' && workflows.length > 0) {
    console.log('');
    const { selectedWorkflowNames } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedWorkflowNames',
        message: 'Select workflows to install:',
        choices: workflows.map(wf => ({
          name: `/${wf.name} ${chalk.dim('— ' + wf.description)}`,
          value: wf.name,
          checked: true
        })),
        pageSize: 10
      }
    ]);

    selectedWorkflows = workflows.filter(w => selectedWorkflowNames.includes(w.name));
  }

  // Step 3: Confirm installation
  console.log('');
  console.log(chalk.bold('📦 Skills to install:'));
  selectedSkills.forEach(skill => {
    console.log(`   ${chalk.green('•')} ${skill.name}`);
  });

  if (selectedWorkflows.length > 0) {
    console.log('');
    console.log(chalk.bold('⚡ Workflows to install:'));
    selectedWorkflows.forEach(wf => {
      console.log(`   ${chalk.magenta('•')} /${wf.name}`);
    });
  }

  console.log('');

  const installPath = getInstallPath(installLocation);
  console.log(chalk.dim(`📁 Skills location: ${installPath}`));
  if (selectedWorkflows.length > 0) {
    console.log(chalk.dim(`📁 Workflows location: ${getWorkflowInstallPath()}`));
  }
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
    const skillResults = await installSkills(selectedSkills, installLocation);

    // Install workflows if selected
    let workflowResults = [];
    if (selectedWorkflows.length > 0) {
      spinner.text = 'Installing workflows...';
      workflowResults = await installWorkflows(selectedWorkflows);
    }

    spinner.succeed(chalk.green('Installation complete!'));
    console.log('');

    // Show skill results
    console.log(chalk.bold('  Skills:'));
    skillResults.forEach(result => {
      if (result.success) {
        console.log(`   ${chalk.green('✔')} ${result.name}`);
        if (result.structure && result.structure.length > 1) {
          console.log(chalk.dim(`      └── ${result.structure.join(', ')}`));
        }
      } else {
        console.log(`   ${chalk.red('✖')} ${result.name} failed: ${result.error}`);
      }
    });

    // Show workflow results
    if (workflowResults.length > 0) {
      console.log('');
      console.log(chalk.bold('  Workflows:'));
      workflowResults.forEach(result => {
        if (result.success) {
          console.log(`   ${chalk.green('✔')} /${result.name}`);
        } else {
          console.log(`   ${chalk.red('✖')} /${result.name} failed: ${result.error}`);
        }
      });
    }

    console.log('');
    console.log(chalk.cyan('🎉 Ready to use!'));
    console.log(chalk.dim(`   Skills: ${installPath}`));
    if (workflowResults.length > 0) {
      console.log(chalk.dim(`   Workflows: ${getWorkflowInstallPath()}`));
    }

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
