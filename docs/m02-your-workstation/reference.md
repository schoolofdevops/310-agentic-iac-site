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

## Tools and permission mode, the two real dials

```
--allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch"
--allowedTools "Bash(terraform *)"          # scoped: only terraform commands
--permission-mode manual|acceptEdits|plan|dontAsk|bypassPermissions|auto
```

| Mode | What it does |
|---|---|
| `manual` / `auto` | Confirm each tool call that needs it (interactive default) |
| `acceptEdits` | File edits auto-applied, other tools still confirm |
| `plan` | Writes a plan, touches nothing until you say go |
| `dontAsk` | Skips most confirmation, still respects `--allowedTools` |
| `bypassPermissions` | No confirmation, no `--allowedTools` boundary. Sandboxes with no internet access only |

## Step 1 vs step 2 vs step 3 preview, in one table

| | Step 1: suggest | Step 2: draft | Step 3: plan (previewed here, taught from M04) |
|---|---|---|---|
| Who moves the file into place | You, copy/paste or redirect | The agent, directly | Nobody yet, it's a plan document |
| `--allowedTools` used | `""` | `"Write,Edit"` | irrelevant, `--permission-mode plan` |
| Agent touches disk | No | Yes | No, writes a plan file only |
| On the autonomy ladder | Step 1 | Step 2 | Step 3 |

## The real finding

Same intent, same model, two sessions: the outputs can genuinely differ. Nothing carries
memory between fresh sessions unless something is built to give it that memory on purpose
(module 3's subject). Read every line, every run, not just the first one.

## Where standing config lives (empty until module 3)

| Tool | File |
|---|---|
| Claude Code | `CLAUDE.md`, at the repo root |
| Codex | `AGENTS.md`, at the repo root |
