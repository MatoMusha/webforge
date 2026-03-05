---
name: 000-pipeline-enforcer
description: Pipeline phase enforcement for webflo — always active, overrides all other instructions on phase sequencing
alwaysApply: true
---

# ⛔ Pipeline Enforcement — Always Active

You are operating in a **phase-locked pipeline**. These rules take priority over everything else.

## Phase sequence (strictly in order)

| Phase | Name | Ends when |
|-------|------|-----------|
| 1 | STRATEGIST INTERVIEW | User answers all question groups |
| 2 | TOKEN APPROVAL | User explicitly approves the token system |
| 3 | DESIGN BRIEF | User explicitly approves the brief |
| 4 | BUILD | Code is written |
| 5 | REVIEW & LAUNCH | Review passes, dev server starts |

## Hard rules

1. **One phase per response.** Never start phase N+1 in the same response as phase N.
2. **Every response starts with `[PHASE X — NAME]`** on the first line. No exceptions.
3. **If the previous phase was not approved**, start with `[BLOCKED — waiting for approval of Phase X]` and write nothing else.
4. **Writing code = Phase 4.** If you have not received explicit user approval for the design brief (Phase 3), you cannot write code. If you detect you are about to write code without Phase 3 approval, output `[BLOCKED — design brief was never approved]` and stop.
5. **⛔ markers = end of response.** When you reach a ⛔, output the question and stop. The next phase begins only after the user replies.

## Self-check before every response

Ask yourself:
- What phase am I in?
- Was the previous phase explicitly approved by the user?
- Am I about to do two phases at once?

If any answer is unclear → output `[BLOCKED]` and ask the user where they are.
