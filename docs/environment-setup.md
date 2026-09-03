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

## What the devcontainer is for, and what it is not for

The devcontainer pins the **infra tooling only**: Terraform, OpenTofu, Checkov, Trivy,
`kind`, Helm, the GitHub CLI. It does not install Claude Code or Codex, and it is not
where you run them. Those are your own subscription-based tools, already installed
and authenticated on your host, and they stay there.

The devcontainer mounts this same repo folder, so a file `claude` or `codex` edits on
your host is instantly visible inside the container, and a `terraform apply` you run
inside the container is instantly visible to your agent on the host. Two terminals,
one shared folder: your normal host terminal for the agent, the devcontainer for the
pinned commands the labs actually check your output against.

## Open the devcontainer

If you use VS Code, open the folder and accept the "Reopen in Container" prompt. Its
integrated terminal gives you the pinned tools; open a second, ordinary terminal on
your host, in the same folder, for `claude`/`codex`.

VS Code is not required. The devcontainer is just a JSON spec plus a Dockerfile, and
the standalone `devcontainer` CLI builds and runs it with no editor at all:

```
npm install -g @devcontainers/cli
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . bash
```

`devcontainer up` builds and starts the container. `devcontainer exec ... bash` opens
a shell inside it, with the pinned Terraform/Checkov/Trivy/Docker-socket setup, for
running the lab's own commands. Run `claude` or `codex` in a separate, ordinary
terminal on your host, in the same cloned folder, not inside this shell.

GitHub Codespaces reads the same `.devcontainer/devcontainer.json` too, if you want
a browser-only path for the infra tooling. Its own terminal is still a container
shell, same rule applies: run the agent from wherever you'd normally run it, pointed
at your Codespace's synced folder if your setup supports that, or fall back to typing
suggestions in by hand for that session.

The devcontainer:

- Mounts your host's Docker socket (`/var/run/docker.sock`) into the container,
  rather than installing Docker inside it. This is required, not optional, Floci and
  `kind` both need it. If a Tier 1 lab hangs on `terraform apply`, this is the first
  thing to check.
- Pins Terraform 1.16.0, Checkov 3.3.16, and Trivy 0.74.0.
- Forwards port 4566 (Floci) and 8080, for labs that expose a local service.
- Installs the GitHub CLI, for modules that open a real pull request.

None of this is mandatory. Every tool the devcontainer pins can be installed directly
on your own workstation instead, matching the same versions, if you'd rather skip the
container entirely. The devcontainer buys you one thing: nobody has to debug a version
mismatch between your machine and this course's.

## Verify it worked

Run these three checks before starting module 1. All three should succeed:

```
terraform version    # 1.16.0
tofu version         # 1.12.2
checkov --version    # 3.3.16
docker info          # reachable at /var/run/docker.sock
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
