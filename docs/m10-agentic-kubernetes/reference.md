---
sidebar_position: 3
title: 'Reference card'
---

# M10 Reference Card: Agentic Kubernetes and Platform IaC

## Cluster setup

```
kind create cluster --config kind-config.yaml
kubectl get nodes
```

`kind-config.yaml` pins the node image by digest:
```
image: kindest/node:v1.31.0@sha256:...
```
Confirm any digest yourself: `docker pull kindest/node:<tag>` and read the printed `Digest:` line.

## Crossplane v2 install

```
helm repo add crossplane-stable https://charts.crossplane.io/stable
helm install crossplane crossplane-stable/crossplane \
  --namespace crossplane-system --version 2.4.0 --wait
```
Confirm it's v2: `helm list -n crossplane-system`, `APP VERSION` starts with `2.`.

## XRD / Composition / XR checklist

| Piece | Terraform equivalent | What it does |
|---|---|---|
| XRD (`CompositeResourceDefinition`) | provider's resource schema | defines what fields a request can carry |
| Composition | module | the recipe: what gets created when someone asks |
| XR | resource block | the actual request, applied directly, namespaced in v2, no claim object |

v2 change, stated precisely: **claims removed**. `spec.scope: Namespaced` on the XRD is what
makes a namespaced XR possible; there is no `claimNames` field to add.

## Numbered teardown

1. `kubectl delete -f xr.yaml` (composed resources go with it via owner references)
2. `kind delete cluster --name <cluster>`
3. Confirm: `docker ps -a --filter "name=<cluster>"` returns nothing
