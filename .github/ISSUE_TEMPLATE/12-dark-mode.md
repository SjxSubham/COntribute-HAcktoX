---
name: 🌙 Implement Dark Mode Toggle
about: Add dark mode functionality with toggle switch
title: '[Feature] Implement Dark Mode Toggle'
labels: ['enhancement', 'UI', 'accessibility']
assignees: ''
---

## Description
Implement dark mode with a toggle switch for better user experience.

## Current Behavior
The site only has a light color scheme.

## Proposed Solution
Add dark mode support with a toggle button in the header or footer.

## Implementation Ideas
- Use React Context or state management for theme
- Create dark mode color variants with Tailwind
- Add a toggle button (sun/moon icon)
- Persist user preference in localStorage
- Respect system preference (prefers-color-scheme)

## Acceptance Criteria
- [ ] Dark mode toggle button added to UI
- [ ] All sections properly styled in dark mode
- [ ] User preference persists across sessions
- [ ] Smooth transition between themes
- [ ] Respects system color scheme preference

## Additional Context
Tailwind CSS has built-in dark mode support with the `dark:` prefix.
