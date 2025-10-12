# Creating Issues for Contributors

This directory contains a script to automatically create GitHub issues from the issue templates in `.github/ISSUE_TEMPLATE/`.

## Prerequisites

1. **GitHub CLI (gh)** must be installed
   - Install from: https://cli.github.com/
   - On macOS: `brew install gh`
   - On Ubuntu/Debian: `sudo apt install gh`
   - On Windows: `winget install --id GitHub.cli`

2. **Authenticate with GitHub CLI**
   ```bash
   gh auth login
   ```

## Usage

Run the script from the root of the repository:

```bash
node scripts/create-issues.js
```

Or make it executable and run directly:

```bash
chmod +x scripts/create-issues.js
./scripts/create-issues.js
```

## What It Does

The script will:
1. Read all issue template files from `.github/ISSUE_TEMPLATE/`
2. Parse each template to extract:
   - Issue title
   - Issue labels
   - Issue body/description
3. Create a GitHub issue for each template using the `gh` CLI
4. Apply appropriate labels to each issue

## Expected Output

The script will create 20 issues based on the existing templates:

1. 🎨 Add Mobile Navigation Menu
2. ✨ Add Hero Section Animations
3. 🎯 Enhance Feature Cards
4. 💬 Add Testimonials Section
5. 📧 Create Contact Form
6. 🖼️ Add Image Gallery
7. 👥 Create Team Section
8. 💰 Add Pricing Section
9. ❓ Create FAQ Section
10. 📝 Add Blog/News Section
11. 🔗 Add Social Media Links
12. 🌙 Implement Dark Mode Toggle
13. 🎬 Add Scroll Animations
14. 📬 Create Newsletter Subscription
15. 🔍 Add Search Functionality
16. ♿ Improve Accessibility
17. ⚡ Optimize Performance
18. 📚 Enhance Documentation
19. 🧪 Add Unit Testing
20. 📱 Improve Responsive Design

All issues will be labeled with appropriate tags like:
- `enhancement`
- `good first issue`
- `UI`
- `documentation`
- `performance`
- etc.

## Troubleshooting

### "gh: command not found"
Install GitHub CLI following the instructions above.

### "Not authenticated with GitHub CLI"
Run `gh auth login` and follow the prompts to authenticate.

### Permission denied
Make sure you have write access to the repository.

### Rate limiting
The script includes a 1-second delay between issue creations to avoid rate limiting. If you still hit rate limits, the script will show which issues failed, and you can re-run it (it won't create duplicates if issues with the same title already exist).

## Manual Alternative

If you prefer to create issues manually, you can:
1. Go to the Issues tab on GitHub
2. Click "New Issue"
3. Select one of the 20 available templates
4. Fill in any additional information
5. Click "Submit new issue"

This needs to be done 20 times for each template.
