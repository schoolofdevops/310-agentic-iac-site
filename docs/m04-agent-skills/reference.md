---
sidebar_position: 3
title: 'Reference card'
---

# M04 Reference Card: Agent Skills for IaC

## SKILL.md frontmatter

```
---
name: short-kebab-case-name
description: What this skill is for and exactly when to use it.
---
```

- `name` — short, kebab-case, matches the directory name
- `description` — the matching key. Name the concrete trigger ("use whenever asked to
  write, generate, or extend a Terraform module for an AWS resource"), not a vague
  category ("Terraform best practices")

## Discoverability checklist

- [ ] Does the `description` name the specific task type, not just the general topic?
- [ ] Would a teammate reading only the `description` know exactly when this fires?
- [ ] Is the body a flat set of rules, not a wish list or a style essay?
- [ ] Did you test it: same intent, skill present vs skill absent, real diff?

## Context vs skill vs harness vs loop

| Layer | Loads | Who decides | Example |
|---|---|---|---|
| Context | Every run | Always on | `AGENTS.md`: provider pins, naming, never-do list |
| Skill | On demand, if matched | The agent, voluntarily | `SKILL.md`: house convention for a task type |
| Harness | Every run, enforced | The system, not the agent | A hook that blocks `apply` without a clean plan |
| Loop | Across runs | What re-triggers, when it stops | A schedule, a webhook, a stopping condition |

## This module's lab, in one line

Same intent, same agent, skill absent vs skill present: provider pin, required tags, and a
hardcoded secret all get fixed on the first try, once the skill exists and its description
is specific enough to trigger.
