#!/usr/bin/env node

/**
 * Script to create GitHub issues from issue templates
 * 
 * This script reads all issue template files from .github/ISSUE_TEMPLATE/
 * and creates corresponding GitHub issues using the GitHub CLI (gh).
 * 
 * Prerequisites:
 * - GitHub CLI (gh) must be installed and authenticated
 * - Run: gh auth login
 * 
 * Usage:
 * node scripts/create-issues.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ISSUE_TEMPLATE_DIR = path.join(__dirname, '..', '.github', 'ISSUE_TEMPLATE');

/**
 * Parse issue template markdown file
 * @param {string} filePath - Path to the template file
 * @returns {object} Parsed issue data
 */
function parseIssueTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Split frontmatter and body
  const parts = content.split('---');
  if (parts.length < 3) {
    console.warn(`Warning: Invalid template format in ${filePath}`);
    return null;
  }
  
  const frontmatter = parts[1].trim();
  const body = parts.slice(2).join('---').trim();
  
  // Parse frontmatter
  const issueData = {
    title: '',
    labels: [],
    body: body
  };
  
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    if (line.startsWith('title:')) {
      issueData.title = line.replace('title:', '').trim().replace(/^['"]|['"]$/g, '');
    } else if (line.startsWith('labels:')) {
      // Parse labels array
      const labelsMatch = line.match(/\[(.*)\]/);
      if (labelsMatch) {
        issueData.labels = labelsMatch[1]
          .split(',')
          .map(l => l.trim().replace(/^['"]|['"]$/g, ''))
          .filter(l => l.length > 0);
      }
    }
  }
  
  return issueData;
}

/**
 * Create a GitHub issue using gh CLI
 * @param {object} issueData - Issue data with title, labels, and body
 */
function createIssue(issueData) {
  if (!issueData || !issueData.title) {
    console.error('Invalid issue data');
    return false;
  }
  
  try {
    // Build the gh command
    let command = `gh issue create --title "${issueData.title}" --body "${issueData.body.replace(/"/g, '\\"')}"`;
    
    // Add labels if present
    if (issueData.labels && issueData.labels.length > 0) {
      const labelArgs = issueData.labels.map(l => `"${l}"`).join(',');
      command += ` --label ${labelArgs}`;
    }
    
    console.log(`Creating issue: ${issueData.title}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error creating issue "${issueData.title}":`, error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Creating GitHub issues from templates...\n');
  
  // Check if gh CLI is installed
  try {
    execSync('gh --version', { stdio: 'pipe' });
  } catch {
    console.error('❌ GitHub CLI (gh) is not installed or not in PATH.');
    console.error('Please install it from: https://cli.github.com/');
    console.error('After installation, run: gh auth login');
    process.exit(1);
  }
  
  // Check if authenticated
  try {
    execSync('gh auth status', { stdio: 'pipe' });
  } catch {
    console.error('❌ Not authenticated with GitHub CLI.');
    console.error('Please run: gh auth login');
    process.exit(1);
  }
  
  // Read all template files
  const files = fs.readdirSync(ISSUE_TEMPLATE_DIR)
    .filter(file => file.endsWith('.md') && file !== 'config.yml')
    .sort();
  
  if (files.length === 0) {
    console.log('No issue templates found.');
    return;
  }
  
  console.log(`Found ${files.length} issue templates.\n`);
  
  let created = 0;
  let failed = 0;
  
  // Create issues from templates
  for (const file of files) {
    const filePath = path.join(ISSUE_TEMPLATE_DIR, file);
    const issueData = parseIssueTemplate(filePath);
    
    if (issueData) {
      if (createIssue(issueData)) {
        created++;
      } else {
        failed++;
      }
      
      // Add a small delay to avoid rate limiting
      execSync('sleep 1');
    } else {
      failed++;
    }
  }
  
  console.log('\n✨ Done!');
  console.log(`✅ Successfully created: ${created} issues`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} issues`);
  }
}

// Run the script
main();
