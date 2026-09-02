---
sidebar_position: 2
title: Prerequisites
---

# Prerequisites

This course does not need a credit card, a cloud account, or a GPU for any required
module. Tier 3 (real AWS) appears once, in the capstone, and it is always optional.

## What you should already know

- You can use a terminal and Git: clone a repo, commit, push, read a diff.
- You have written some Terraform before: resources, variables, `plan`, `apply`. This
  course does not teach Terraform from zero.
- You have run a Docker container before. You do not need to know Kubernetes yet,
  that starts in module 10.

## What you do not need

- No cloud account. Every module through module 9 runs against Floci, a local AWS
  emulator, or plain local providers.
- No Kubernetes cluster running anywhere. Module 10 and 11 spin up a local `kind`
  cluster on your own machine and tear it down.
- No paid API. You use a Claude and/or ChatGPT subscription you already have, through
  Claude Code and/or the Codex CLI.

## What you need installed

- **Claude Code** and/or **Codex CLI**, installed and authenticated. Verify with:
  ```
  claude --version
  codex --version
  ```
- **Docker**, reachable at `/var/run/docker.sock`. Verify with:
  ```
  docker info
  ```
- **Git** and a terminal you are comfortable in.

Everything else, exact versions of Terraform, Checkov, Trivy, `kind`, and Helm, comes
from the devcontainer, see [Environment Setup](./environment-setup.md). You do not
install those yourself.
