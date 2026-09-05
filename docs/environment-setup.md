---
sidebar_position: 3
title: Environment Setup
---

# Environment Setup

Every command in this course was run against one exact set of tool versions, and every
`[ Expected output ]` block you will read was captured from a real run against those
versions. If your own Terraform, Checkov, or Trivy is a different version, your output
can genuinely differ from the lab's. Install these exact versions once, directly on
your own machine, and every module after this one just works.

## Get the labs repo

```
git clone https://github.com/schoolofdevops/310-agentic-iac-labs.git
cd 310-agentic-iac-labs
```

## Install the pinned tools

Run this on macOS or Linux (including WSL2 on Windows, see below). It detects your OS
and CPU architecture, downloads the exact pinned binary for each tool from its
official release, and installs it to `~/.local/bin`, a directory you already own, so
none of this needs `sudo`:

```bash
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64) ARCH_TF="amd64"; ARCH_TRIVY="64bit"; ARCH_K8S="amd64" ;;
  arm64|aarch64) ARCH_TF="arm64"; ARCH_TRIVY="ARM64"; ARCH_K8S="arm64" ;;
  *) echo "Unrecognized architecture: $ARCH"; exit 1 ;;
esac
[ "$OS" = "darwin" ] && OS_TRIVY="macOS" || OS_TRIVY="Linux"

TERRAFORM_VERSION=1.16.0
OPENTOFU_VERSION=1.12.2
TRIVY_VERSION=0.74.0
CHECKOV_VERSION=3.3.16
KIND_VERSION=0.32.0
HELM_VERSION=4.0.0
KUBECTL_VERSION=1.34.0
INFRACOST_VERSION=0.10.44
CONFTEST_VERSION=0.68.2

# Terraform and OpenTofu, one language, two runtimes
curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_${OS}_${ARCH_TF}.zip" -o /tmp/tf.zip \
  && unzip -oq /tmp/tf.zip -d "$INSTALL_DIR" && rm /tmp/tf.zip
curl -fsSL "https://github.com/opentofu/opentofu/releases/download/v${OPENTOFU_VERSION}/tofu_${OPENTOFU_VERSION}_${OS}_${ARCH_TF}.zip" -o /tmp/tofu.zip \
  && unzip -oq /tmp/tofu.zip -d /tmp/tofu && mv /tmp/tofu/tofu "$INSTALL_DIR/" && rm -rf /tmp/tofu*

# Trivy and Checkov, always both
curl -fsSL "https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}/trivy_${TRIVY_VERSION}_${OS_TRIVY}-${ARCH_TRIVY}.tar.gz" \
  | tar xz -C "$INSTALL_DIR" trivy
pip install --user "checkov==${CHECKOV_VERSION}"

# OPA policy checks and cost gates (module 9 onward)
curl -fsSL "https://github.com/open-policy-agent/conftest/releases/download/v${CONFTEST_VERSION}/conftest_${CONFTEST_VERSION}_$([ "$OS" = "darwin" ] && echo Darwin || echo Linux)_${ARCH}.tar.gz" \
  | tar xz -C "$INSTALL_DIR" conftest
curl -fsSL "https://github.com/infracost/infracost/releases/download/v${INFRACOST_VERSION}/infracost-${OS}-${ARCH_TF}.tar.gz" \
  | tar xz -C /tmp && mv "/tmp/infracost-${OS}-${ARCH_TF}" "$INSTALL_DIR/infracost"

# Kubernetes tools, needed from module 10 onward
curl -fsSLo "$INSTALL_DIR/kind" "https://kind.sigs.k8s.io/dl/v${KIND_VERSION}/kind-${OS}-${ARCH_TF}" && chmod +x "$INSTALL_DIR/kind"
curl -fsSLo "$INSTALL_DIR/kubectl" "https://dl.k8s.io/release/v${KUBECTL_VERSION}/bin/${OS}/${ARCH_TF}/kubectl" && chmod +x "$INSTALL_DIR/kubectl"
curl -fsSL "https://get.helm.sh/helm-v${HELM_VERSION}-${OS}-${ARCH_TF}.tar.gz" \
  | tar xz -C /tmp && mv "/tmp/${OS}-${ARCH_TF}/helm" "$INSTALL_DIR/" && rm -rf "/tmp/${OS}-${ARCH_TF}"
```

Put `~/.local/bin` first on your `PATH` so these versions win over anything else
already installed. Add this line to your shell profile (`~/.zshrc` on a default macOS
shell, `~/.bashrc` on most Linux setups), then open a new terminal:

```
export PATH="$HOME/.local/bin:$PATH"
```

If you'd tried an earlier version of this page that installed to `/usr/local/bin` and
hit a `Permission denied` or a `root/wheel` overwrite prompt partway through, that's
expected there, `/usr/local/bin` is root-owned by default on a stock macOS install.
Nothing from that partial attempt needs cleaning up: putting `~/.local/bin` first on
your `PATH` means the correct, pinned version installed here is always what actually
runs, regardless of what's sitting in `/usr/local/bin`.

## Install the GitHub CLI

Module 11 opens a real pull request, `gh` needs to already be there by then:

```
# macOS
brew install gh

# Linux (Debian/Ubuntu)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh
```

Then authenticate once: `gh auth login`.

## Install Docker

This was already host-side either way, Floci and `kind` both run as real Docker
containers on your machine:

- **macOS / Windows**: install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- **Linux**: `curl -fsSL https://get.docker.com | sh`, then add your user to the
  `docker` group (`sudo usermod -aG docker $USER`, log out and back in) so you do not
  need `sudo` for every `docker` command.

## Windows

Every command on this page assumes a Unix-like shell. Install
[WSL2](https://learn.microsoft.com/windows/wsl/install), then run every command on
this page inside your WSL2 Linux distribution, exactly as written for Linux.

## Verify it worked

Run these before starting module 1. All should succeed and print the pinned versions:

```
terraform version     # 1.16.0
tofu version           # 1.12.2
checkov --version      # 3.3.16
trivy --version         # 0.74.0
kind version             # 0.32.0
helm version --short      # v4.0.0
kubectl version --client   # 1.34.0
gh --version                # any recent version
docker info                  # reachable, no version pin required
```

If any version printed does not match the pinned one, your lab output can genuinely
differ from what this course shows. Fix the version before continuing, do not assume
"close enough" is close enough.

If `docker info` hangs or errors, stop and fix Docker before anything else, every
Tier 1 lab in this course depends on it.

## Tier 2 and Tier 3 tools

You do not need `kind` or Helm working until module 10. You do not need an AWS
account until the optional Tier 3 part of the capstone. Both are covered again, in
more depth, in their own module's Pre Requisites section when you get there.

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
