---
sidebar_position: 1
title: 'Agentic Kubernetes and Platform IaC'
---

import Slides from '@site/src/components/Slides';

# Chapter 10: Agentic Kubernetes and Platform IaC

<Slides src="decks/m10-agentic-kubernetes.html" title="M10: Agentic Kubernetes and Platform IaC" />

## From Plan and Apply to Reconcile

Every module before this one ran against Terraform. Local providers in the early modules,
Floci-emulated cloud providers from module four onward. The discipline stayed the same the
whole way: read the intent, generate against it, check the plan, scan it, gate it, apply
it.

This module keeps that discipline and changes what it runs against. `terraform apply` is a
one-shot action. You run it, it does its work, and it stops. Kubernetes does not work that
way. A Kubernetes controller reads what you want, compares it against what is actually
running, and keeps doing that forever, in a loop, whether or not anyone is watching. That
loop is called reconciliation, and it is the real mechanical difference this chapter is
about.

![A one-shot Terraform plan then apply, next to Kubernetes continuously reconciling desired state against a live cluster.](./diagrams/plan-apply-vs-reconcile.svg)

Would a one-shot apply and a continuous reconcile loop ever disagree on the same intent?
Not on what you asked for. They disagree on what happens after. Delete something a
Terraform-managed resource owns, and it stays deleted until someone runs `apply` again.
Delete something a Kubernetes controller owns, and it often comes right back, because the
controller is still watching.

### Try it: the reconcile loop visualizer

Words describe a loop, they don't let you feel one running. There's a small, interactive
tool that does: [Reconcile Loop Visualizer](pathname:///310-agentic-iac-site/sims/reconcile-loop-sim.html). Drift
the live state away from what's desired, the same way the lab's own drift step does, and
watch the controller correct it back over a few ticks, unattended, without anyone running a
command.

## A Real Cluster, Not an Emulated One

Tier 1 in this course ran against Floci, an AWS-API-shaped emulator. That was the right
choice there: Terraform's providers speak to a cloud API, and emulating the API is enough
to teach the discipline safely, for free, on a laptop.

Kubernetes does not need that emulation. `kind` runs a real Kubernetes cluster inside a
single Docker container. Not a look-alike, not a subset, a real control plane, a real
kubelet, a real API server, the same binaries a production cluster runs.

![A whole Kubernetes cluster running inside one Docker container, its node image pinned by digest so it rebuilds identically every time.](./diagrams/kind-cluster-in-container.svg)

That container's image matters more than it looks like it should. A `kind` config that
says `kindest/node:v1.31.0` is naming a moving target. New builds of that tag land over
time, and a cluster you build today can quietly differ from the one you build in six
months. Pin the image by digest instead, the exact content hash, not the name someone
might repoint later. Every learner who runs this module's lab gets the identical cluster,
every single time.

## Helm 4

You will use Helm in this module to install Crossplane. Helm 3 has been the default for
years, and a lot of documentation still shows it as current. It is not, not for much
longer. Helm 3's last feature release landed in September 2026, and its security support
ends in February 2027. This course teaches Helm 4 from here on.

![Helm 3, security support ending February 2027, next to Helm 4, the version this course teaches.](./diagrams/helm3-vs-helm4.svg)

Nothing about the chart-install workflow got harder. `helm install`, `helm upgrade`, `helm
list`, all still work the way you would expect. The point of this section is smaller than
it sounds: stop treating Helm 3 commands you find online as automatically current, and know
which version you are actually running.

## Crossplane v2: Claims Removed

Crossplane turns a Kubernetes custom resource into real, composed infrastructure. Version 1
did this with two objects working together: a cluster-scoped composite resource (an XR) and
a namespaced claim that stood in for it, so an application team could request infrastructure
without needing cluster-wide permissions.

Version 2 removed the claim. The composite resource itself is namespaced now, so a team
requests it directly, in their own namespace, with no separate claim object standing in the
way.

![Crossplane v1's extra claim object next to v2's namespaced composite resource doing the same job directly, with the claim removed.](./diagrams/claims-removed-v1-vs-v2.svg)

That is one fewer object to reason about, and one fewer indirection between what a team
asks for and what actually exists. A namespace boundary was already how Kubernetes
separates teams. Crossplane v2 just stopped duplicating that boundary with a second object.

## XRD, Composition, XR

Three pieces make up the platform layer, and they map cleanly onto what you already know
from Terraform.

![XRD, Composition, and XR mapped against Terraform's provider, module, and resource, the same generate-verify-fix shape under different names.](./diagrams/xrd-composition-xr.svg)

A `CompositeResourceDefinition` (an XRD) is the schema, what fields a request can carry,
the same job a Terraform provider's resource schema does. A `Composition` is the recipe,
what actually gets created when someone asks, playing the same role a Terraform module
plays. The XR itself, the object a team applies, is the request, the same role a Terraform
resource block plays. Different names, the same three-layer shape: define the contract,
write the recipe, request the thing.

## The Same Authority Boundary, a New Substrate

Nothing about the course's thesis changes here. The agent proposes, the pipeline decides,
whether the object being proposed is a Terraform resource or a Kubernetes manifest.

![The agent proposes, the pipeline decides boundary redrawn for Kubernetes, kubectl diff in place of terraform plan, before a gated apply.](./diagrams/new-substrate-boundary.svg)

`kubectl diff` plays the same role `terraform plan` played in every earlier module: read it
before anything lands. A human approval gate sits in the same spot it always has. Only the
verb at the very end changes, `kubectl apply` instead of `terraform apply`.

## Vocabulary

| Term | Meaning |
|---|---|
| Reconcile loop | A Kubernetes controller continuously comparing desired state against actual state, and correcting drift, instead of running once and stopping |
| `kind` | A tool that runs a real Kubernetes cluster inside Docker, used here for a free, local, real Tier 2 lab |
| Node image digest | The exact content hash of a `kind` node image, pinned instead of a floating version tag, so every learner gets an identical cluster |
| Helm 4 | The chart-install tool this course teaches from here on, Helm 3's security support ends February 2027 |
| Crossplane v2 | The version of Crossplane used in this module, where claims were removed in favor of namespaced composite resources |
| XRD | `CompositeResourceDefinition`, the schema for a platform request, Terraform's provider-resource-schema equivalent |
| Composition | The recipe a Crossplane XRD generates against, Terraform's module equivalent |
| XR | The composite resource a team actually requests, Terraform's resource-block equivalent |
