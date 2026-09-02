---
sidebar_position: 3
title: Environment Setup
---

# Environment Setup

Every lab in this course runs inside a pinned devcontainer, so your Terraform version
is the same one this course was written against. Set it up once, use it for every
module.

## Get the labs repo

```
git clone https://github.com/schoolofdevops/310-agentic-iac-labs.git
cd 310-agentic-iac-labs
```

## Open the devcontainer

If you use VS Code, open the folder and accept the "Reopen in Container" prompt. If
you use another editor, any devcontainer-compatible tool (the `devcontainer` CLI,
GitHub Codespaces) reads the same `.devcontainer/devcontainer.json`.

The devcontainer:

- Mounts your host's Docker socket (`/var/run/docker.sock`) into the container,
  rather than installing Docker inside it. This is required, not optional, Floci and
  `kind` both need it. If a Tier 1 lab hangs on `terraform apply`, this is the first
  thing to check.
- Pins Terraform 1.16.0, Checkov 3.3.16, and Trivy 0.74.0.
- Forwards port 4566 (Floci) and 8080, for labs that expose a local service.
- Installs the GitHub CLI, for modules that open a real pull request.

## Verify it worked

Run these three checks before starting module 1. All three should succeed:

```
terraform version    # 1.16.0
tofu version          # 1.12.2
checkov --version     # 3.3.16
docker info           # reachable at /var/run/docker.sock
```

If `docker info` hangs or errors, stop and fix Docker before anything else, every
Tier 1 lab in this course depends on it.

## Tier 2 and Tier 3 tools

You do not need `kind` or Helm until module 10. You do not need an AWS account until
the optional Tier 3 part of the capstone. Both are covered in their own module's
Pre Requisites section when you get there, not upfront.

## The four lab tiers

| Tier | What it runs on | Cost | Used by |
|---|---|---|---|
| 0 | Local Terraform providers only (`local`, `null`, `random`, `docker`) | free, no account | Modules 1-3, 12 |
| 1 | Floci, a local AWS emulator | free, no account | Modules 4-9 |
| 2 | A local `kind` Kubernetes cluster | free | Modules 10-11 |
| 3 | Your own real AWS account | optional spend | Capstone only, always optional |

If Floci ever needs to be pinned to a different version, or a Tier 1 lab misbehaves,
`labs/shared/floci-spike/RESULTS.md` in the source repo has the accepted version and
the regression check.
