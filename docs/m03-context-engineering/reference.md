---
sidebar_position: 3
title: 'Reference card'
---

# M03 reference card: Context Engineering for Infrastructure

One side of A4. Pin it above your desk.

## The context symptom test (from M01)

| Symptom | Layer |
|---|---|
| "Can't get one task right at all" | Context (this module) |
| "Works, but ignores our standards" | Harness (M06) |
| "Works, but I babysit every run" | Loop (M12) |

## Context engineering vs a prompt

| | Context | Prompt |
|---|---|---|
| Written | Once | Every time |
| True | Every run | This run only |
| Lives in | `AGENTS.md` / `CLAUDE.md` | The chat window |
| Example | "Secrets are always `sensitive`" | "Build me a VPC with two subnets" |

## AGENTS.md checklist

- [ ] Provider + version pins, exact, not a range
- [ ] Naming convention, with a real example
- [ ] Module boundaries, one module per concern
- [ ] A never-do list, written as flat rules
- [ ] Where secrets come from (`TF_VAR_`, never a `default`)

## The information gap

**11 of 14** residual policy failures resolved once policy text was made visible
to the agent. Not a rounded 79%. The fix was not a smarter model, it was making an
existing rule readable at the moment the agent needed it.

## The rule

An agent finds files the way a human does: by name, by path, by what looks
relevant. Shape your repo for a human reader first, and you have mostly shaped
it for an agent too.
