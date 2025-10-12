# Quick Reference: Creating Issues

## For Repository Maintainers

### Create All 20 Issues (Recommended)

```bash
npm run create-issues
```

That's it! This single command will create all 20 contribution issues.

### Prerequisites

You only need to do this once:

```bash
# Install GitHub CLI
brew install gh  # macOS
# OR
sudo apt install gh  # Ubuntu/Debian

# Authenticate
gh auth login
```

### What You Get

- ✅ 20 ready-to-contribute issues
- ✅ Automatically labeled (enhancement, good first issue, etc.)
- ✅ Detailed descriptions and acceptance criteria
- ✅ Visible in the Issues tab for contributors

### Alternative Methods

| Method | Command/Steps | Best For |
|--------|--------------|----------|
| **NPM Script** | `npm run create-issues` | Quick local execution |
| **GitHub Actions** | Actions → Run workflow → "Create Issues from Templates" | No local setup needed |
| **Direct Script** | `node scripts/create-issues.js` | Direct control |
| **Manual** | Issues tab → New Issue → Select template | Creating specific issues only |

### Need Help?

- 📖 [Full Maintainer Guide](MAINTAINER_GUIDE.md)
- 📋 [Script Documentation](scripts/README.md)
- 💬 Open a discussion if you have questions

---

**For Contributors**: Check the [Issues tab](../../issues) for available tasks!
