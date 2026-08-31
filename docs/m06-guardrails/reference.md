---
sidebar_position: 3
title: 'Reference card'
---

# M06 Reference Card: Guardrails: Permissions, Hooks, Blast Radius

## The gate's contract

```
exit 0   ->  pass, safe to apply
exit 1   ->  blocked, do not apply
```

Both halves have to hold: the script exits non-zero on failure, and the caller (a wrapper
script, a CI step, a pre-commit hook) actually stops when it sees that exit code. A check that
only prints a warning is not a gate.

## Blast radius, mechanical checklist

- [ ] Does the plan contain any `delete` action? (block-on-delete policy)
- [ ] Does the total resource-change count exceed the team's threshold? (max-resources policy)
- [ ] Does the plan touch a resource type on the high-radius list (`aws_vpc`, `aws_iam_role`,
      `aws_iam_policy`, or your own)? (high-radius-types policy)

All three read directly from `terraform show -json`. None require understanding what any
specific resource is for.

## Context vs skill vs hook vs permission boundary

| Layer | Loads | Who decides | Can it block an action? |
|---|---|---|---|
| Context (M03) | Every run | Always on | No, it only informs |
| Skill (M04) | On demand, if matched | The agent, voluntarily | No, only suggests |
| Permission boundary (this module) | Before the run starts | The system | Yes, denies before a plan even exists |
| Hook / gate (this module) | Every attempted `apply` | The system, not the agent | Yes, blocks a specific plan |

## This module's lab, in one line

The exact same delete: with no gate, it happens. With the gate wired in, it's refused, real
non-zero exit, bucket still there. A safe additive change passes the same gate without changing
a single policy setting.
