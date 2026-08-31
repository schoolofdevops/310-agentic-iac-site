---
sidebar_position: 3
title: 'M05 Reference Card'
---

# M05 Reference Card: MCP and the Tool Layer

**MCP in one sentence:** a standard protocol that lets an agent call a tool or read a
resource from an external server, instead of every agent vendor building its own
one-off integration to every tool.

## The three-way harness-component table

| | Skill (M04) | Hook (M06) | MCP (this module) |
|---|---|---|---|
| What it is | Packaged instructions | An enforced check | A live call to a real system |
| Who decides to use it | The agent, voluntarily | Nobody, it always runs | The agent, voluntarily |
| What comes back | Nothing external | Pass or block | Real, current data |
| Can it be skipped | Yes | No | Yes |

## The two servers this module configures

- **Terraform MCP server**, HashiCorp's official server. Docker image, run over stdio:
  `docker run --rm -i hashicorp/terraform-mcp-server:latest stdio`. Never the deprecated
  `awslabs/terraform-mcp-server`.
- **GitHub MCP server**, the official, hosted server at
  `https://api.githubcopilot.com/mcp/`, HTTP transport, a bearer token in the
  `Authorization` header.

## Register a server

```
claude mcp add --transport stdio terraform -- docker run --rm -i hashicorp/terraform-mcp-server:latest stdio
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer $(gh auth token)"
claude mcp get <name>       # verify it connected
claude mcp list             # see everything configured
```

## The rule that doesn't change

Opening a pull request through the GitHub MCP server is still just a proposal. The agent
proposes, the pipeline decides, same as module 1. A human reads the diff and merges, or
doesn't. This module's lab is still autonomy step 3, propose with plan, the same step as
module 4's.
