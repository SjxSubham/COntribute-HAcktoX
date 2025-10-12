# Maintainer Guide: Creating Issues for Contributors

This guide explains how to populate the repository with contribution issues for Hacktoberfest and other contributors.

## Overview

This repository includes 20 carefully crafted issue templates located in `.github/ISSUE_TEMPLATE/`. These templates cover various contribution areas including UI enhancements, new features, accessibility, performance, documentation, and testing.

However, **issue templates alone don't create actual issues** - they just provide a form for users to create issues. To make it easy for contributors to find tasks, you need to create actual GitHub issues from these templates.

## Why Create Issues?

Creating issues from templates helps:
- 🎯 Make contribution opportunities visible and discoverable
- 📋 Provide clear, structured tasks for contributors
- 🏷️ Enable filtering by labels (e.g., "good first issue")
- 📊 Track progress and contributions
- 🎃 Support Hacktoberfest participants in finding valid contributions

## Methods to Create Issues

### Method 1: NPM Script (Easiest)

The quickest way to create all issues at once:

```bash
# 1. Install GitHub CLI (if not already installed)
# macOS:
brew install gh

# Ubuntu/Debian:
sudo apt install gh

# Windows:
winget install --id GitHub.cli

# 2. Authenticate with GitHub
gh auth login

# 3. Run the npm script
npm run create-issues
```

This will create all 20 issues in one go!

### Method 2: Direct Node.js Script

If you prefer not to use npm:

```bash
# Authenticate with GitHub CLI
gh auth login

# Run the script directly
node scripts/create-issues.js
```

### Method 3: GitHub Actions Workflow

For a GUI-based approach without installing anything locally:

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Find the **"Create Issues from Templates"** workflow in the left sidebar
4. Click **"Run workflow"** button (top right)
5. (Optional) Enable **"Dry run"** to preview what will be created
6. Click the green **"Run workflow"** button

**Dry Run Mode**: When enabled, the workflow will show what issues would be created without actually creating them. This is useful for:
- Previewing issue titles and content
- Checking for errors
- Understanding what will happen before committing

### Method 4: Manual Creation

If you prefer manual control or want to create specific issues:

1. Go to the **Issues** tab in your repository
2. Click **"New Issue"**
3. You'll see 20 template options
4. Select a template and fill it out
5. Click **"Submit new issue"**
6. Repeat for other templates as needed

## What Gets Created

Running the automated script creates 20 issues:

### UI Components (8 issues)
1. 🎨 Add Mobile Navigation Menu - `enhancement`, `good first issue`, `UI`
2. ✨ Add Hero Section Animations - `enhancement`, `good first issue`, `UI`, `animation`
3. 🎯 Enhance Feature Cards - `enhancement`, `good first issue`, `content`
4. 💬 Create Testimonials Section - `enhancement`, `good first issue`, `component`
5. 📧 Create Contact Form - `enhancement`, `component`, `form`
6. 🖼️ Add Image Gallery - `enhancement`, `component`, `UI`
7. 👥 Create Team Section - `enhancement`, `good first issue`, `content`
8. 💰 Add Pricing Section - `enhancement`, `component`, `good first issue`

### Content & Features (7 issues)
9. ❓ Create FAQ Section - `enhancement`, `good first issue`, `content`
10. 📝 Add Blog/News Section - `enhancement`, `component`
11. 🔗 Add Social Media Links - `enhancement`, `good first issue`, `UI`
12. 🌙 Implement Dark Mode - `enhancement`, `UI`, `accessibility`
13. 🎬 Add Scroll Animations - `enhancement`, `animation`, `UI`
14. 📬 Newsletter Subscription - `enhancement`, `component`, `good first issue`
15. 🔍 Add Search Functionality - `enhancement`, `component`

### Technical Improvements (5 issues)
16. ♿ Improve Accessibility - `enhancement`, `accessibility`, `good first issue`
17. ⚡ Optimize Performance - `enhancement`, `performance`
18. 📚 Enhance Documentation - `documentation`, `good first issue`
19. 🧪 Add Unit Testing - `testing`, `enhancement`
20. 📱 Improve Responsive Design - `enhancement`, `good first issue`, `UI`, `responsive`

## Labels Applied

Issues are automatically labeled with:
- `enhancement` - New features or improvements
- `good first issue` - Suitable for newcomers
- `UI` - User interface changes
- `component` - New React components
- `content` - Content additions
- `form` - Form-related work
- `animation` - Animation features
- `accessibility` - Accessibility improvements
- `performance` - Performance optimizations
- `documentation` - Documentation work
- `testing` - Testing additions
- `responsive` - Responsive design work

## Troubleshooting

### "gh: command not found"
**Solution**: Install GitHub CLI from https://cli.github.com/

### "Not authenticated with GitHub CLI"
**Solution**: Run `gh auth login` and follow the prompts

### "Permission denied" or "Resource not accessible by integration"
**Solution**: 
- For local script: Ensure you have write access to the repository
- For GitHub Actions: Check that the workflow has `issues: write` permission (already configured)

### "Rate limiting errors"
**Solution**: The script includes a 1-second delay between issues. If you still hit limits, wait a few minutes and retry.

### Issues already exist
**Solution**: The script will fail if issues with identical titles exist. You can:
- Delete existing issues and re-run
- Manually create remaining issues
- Modify the script to skip duplicates (advanced)

## Best Practices

1. **Create issues before Hacktoberfest starts** (late September)
2. **Review and adjust templates** if needed before creating issues
3. **Use dry run first** to preview what will be created
4. **Monitor issues** and respond to contributor questions
5. **Close completed issues** and thank contributors
6. **Add more issues** as needed throughout the contribution period

## Adding More Issues

To add new contribution opportunities:

1. Create a new template in `.github/ISSUE_TEMPLATE/`
2. Follow the existing template format
3. Add appropriate labels
4. Re-run the script to create the new issue

## Removing Issues

If you want to start fresh:

```bash
# List all open issues
gh issue list --limit 100

# Close specific issues
gh issue close <issue-number>

# Or close all issues (use with caution!)
gh issue list --limit 100 --json number --jq '.[].number' | xargs -I {} gh issue close {}
```

## Support

If you encounter any problems:
1. Check the [scripts/README.md](scripts/README.md) for detailed instructions
2. Review the GitHub CLI documentation: https://cli.github.com/manual/
3. Open a discussion or contact the maintainers

---

**Ready to create issues?** Run `npm run create-issues` and watch your repository become contribution-ready! 🎉
