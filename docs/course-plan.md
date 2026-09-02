---
sidebar_position: 4
title: Course Plan
---

# Course Plan

Twelve modules, one real project each, plus a capstone. The course thesis, repeated
in every module: **the agent proposes, the pipeline decides.** Every module either
improves what the agent proposes, or makes the pipeline's decision safer.

## The arc

| Stage | What it means | Modules |
|---|---|---|
| **AI-augmented IaC** | The agent suggests and drafts. A human drives every step. | 1-3 |
| **Agentic IaC** | The agent has real skills, real live tools, and needs less step-by-step supervision. | 4-5, 7 |
| **Guardrails, verification, safe delivery** | What makes higher autonomy actually safe: enforced gates, scanning, safe delivery. | 6, 8, 9, 11 |
| **Operating it for real** | Running this at scale, on real infrastructure, unattended. | 10, 12, capstone |

Context engineering, harness engineering, and loop engineering run through every
stage, not confined to one module: module 3 builds context engineering, every later
module keeps using it; module 4's skill and module 6's guardrail harness are the same
discipline, escalating; module 12 names and completes the loop-engineering thread
module 3 previews.

## The twelve projects

| # | Module | The real project | Tier |
|---|---|---|---|
| 01 | From ClickOps to Agents | Run a generate-verify-fix loop by hand, no agent, so you feel what an agent later automates | 0 |
| 02 | Your Agentic IaC Workstation | Build an nginx test module using Claude Code's agent modes: suggest, draft, plan, `acceptEdits`, a subagent, a slash command | 0 |
| 03 | Context Engineering for Infrastructure | Manage context for an nginx module using `AGENTS.md` and `STATE.md`: Reduce, Retain, Route | 0-1 |
| 04 | Agent Skills for IaC | Build a Terraform VPC module using a Claude Code skill that bundles a real script | 1 |
| 05 | MCP and the Tool Layer | Build an RDS module using the Terraform MCP server, `aws-iac-mcp-server`, and the GitHub MCP server | 1 |
| 06 | Guardrails: Permissions, Hooks, Blast Radius | Guard a real delete using a hook and a plan-approve-apply harness | 1 |
| 07 | Spec-Driven Infrastructure | Build an autoscaling web tier using spec-driven development, compared against a vibe-coded run | 1 |
| 08 | Harness Engineering | Build a verification-before-claiming harness using a skill and a hook, rooted in the `superpowers` discipline | 1 |
| 09 | Verifying AI-Generated Infrastructure | Build a scan-and-policy pipeline for a real S3 module: Trivy, Checkov, OPA, Infracost | 1 |
| 10 | Agentic Kubernetes and Platform IaC | Build a database-as-a-service capability using Helm, manifests, and Crossplane v2 | 2 |
| 11 | Agentic GitOps and Pipelines | Ship an agent's change to production using a pipeline and GitOps | 2 |
| 12 | Loop Engineering, Multi-Agent Ops, Economics | Build a self-healing compliance loop with a GitHub Actions trigger | 0 |
| CAP | Capstone | Ship infrastructure through a propose-verify-approve-apply pipeline, all three tiers | 1, 2, 3 (optional) |

Each project is real: applied and destroyed against Floci or a local `kind` cluster,
not a plan file that never runs. See [Environment Setup](./environment-setup.md) for
what "Tier" means.

## The autonomy ladder

Introduced in module 1, revisited at the end of every module, closed out in module
12. Six steps, from the agent only suggesting text a human types, up to the agent
running unattended to a stopping condition a human only reviews after the fact. No
module teaches a step without first teaching the gate that makes it safe.

## How each module is built

Every module ships the same five pieces: an explainer with narrated diagrams, a
hands-on lab you run yourself, a standalone reading chapter, a reference cheat sheet,
and a quiz. Work through them in order.
