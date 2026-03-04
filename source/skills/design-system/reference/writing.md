# UX Writing

## Button Labels

Never "OK", "Submit", or "Yes/No". Use specific verb + object:

| Bad | Good |
|-----|------|
| OK | Save changes |
| Submit | Create account |
| Yes | Delete message |
| Cancel | Keep editing |
| Click here | Download PDF |

For destructive actions: "Delete" (permanent) not "Remove" (recoverable). Show counts: "Delete 5 items" not "Delete selected".

## Error Messages

Formula: What happened? → Why? → How to fix?

| Situation | Template |
|-----------|----------|
| Format error | "[Field] needs to be [format]. Example: [example]" |
| Missing required | "Please enter [what's missing]" |
| Permission denied | "You don't have access to [thing]. [Alternative]" |
| Network error | "Couldn't reach [thing]. Check your connection and [action]" |
| Server error | "Something went wrong on our end. [Alternative action]" |

Never blame the user. "Please enter a date in MM/DD/YYYY format" not "You entered an invalid date".

## Empty States

Onboarding opportunities: (1) Acknowledge briefly, (2) Explain value, (3) Clear action.
"No projects yet. Create your first one to get started." — not just "No items".

## Voice & Tone

Voice = consistent personality. Tone adapts to moment:
- Success: celebratory, brief
- Error: empathetic, helpful (never humorous)
- Loading: reassuring, specific ("Saving your draft..." not "Loading...")
- Destructive: serious, clear

## Accessibility Writing

- Link text with standalone meaning ("View pricing plans" not "Click here")
- Alt text describes information ("Revenue up 40% in Q4" not "Chart")
- `alt=""` for decorative images
- `aria-label` for icon buttons

## Translation Planning

German +30%, French +20%, Finnish +30–40%. Keep numbers separate, use full sentences as single strings, avoid abbreviations, give translators context.

## Consistency

Pick one term: Delete (not Remove/Trash), Settings (not Preferences/Options), Sign in (not Log in), Create (not Add/New). Build a glossary and enforce it.

## Confirmation Dialogs

Prefer undo over confirmation. When confirming: name the action, explain consequences, use specific labels ("Delete project" / "Keep project", not "Yes" / "No").
