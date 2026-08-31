---
sidebar_position: 3
title: 'Reference card'
---

# M02 Reference Card: Your Agentic IaC Workstation

## Install and verify

```
claude --version
codex --version
```

## Devcontainer verify checklist

```
terraform version    # 1.16.0, pinned
checkov --version     # 3.3.16, pinned
docker info           # reachable at /var/run/docker.sock
```

If `docker info` hangs, stop and fix Docker before anything else. This blocks every later
Tier 1 lab too.

## Step 1 vs step 2, in one table

| | Step 1: suggest | Step 2: draft |
|---|---|---|
| Who writes the file | You, by hand, from the agent's text | The agent, directly |
| What you control | Every keystroke | Every line, before you act on it |
| Agent touches disk | No | Yes |
| On the autonomy ladder | Step 1 | Step 2 |

## The real finding

Same intent, same model, two sessions: the outputs can genuinely differ. Nothing carries
memory between fresh sessions unless something is built to give it that memory on purpose
(module 3's subject). Read every line, every run, not just the first one.

## Where standing config lives (empty until module 3)

| Tool | File |
|---|---|
| Claude Code | `CLAUDE.md`, at the repo root |
| Codex | `AGENTS.md`, at the repo root |
