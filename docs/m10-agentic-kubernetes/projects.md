---
sidebar_position: 4
title: 'Exploratory projects'
---

# M10 Projects: Agentic Kubernetes and Platform IaC

3-5 stretch projects. Hints, not solutions.

1. **Compose a second platform resource.** Write a new XRD and Composition for something your
   own team would actually want as a namespaced XR: a namespaced quota, a default network
   policy, a starter deployment. Reuse `function-patch-and-transform`, or try a different
   composition function if you're curious.

2. **Break the reconcile loop on purpose.** Delete the composed `ConfigMap` directly with
   `kubectl delete configmap`, out from under Crossplane, and watch what happens. Does it come
   back? How long does that take? Compare this against what happens if you delete a
   Terraform-managed resource out from under Terraform's own state.

3. **Compare a v1 claim example against this module's v2 approach.** Find a Crossplane v1
   example online (a lot of documentation still shows claims). What object existed in that
   example that doesn't exist in yours? What took over its job?

4. **Add a real readiness check.** Swap the `ConfigMap` in this lab's Composition for a
   resource type that has real status conditions (a `Deployment`, for instance), and write a
   proper `readinessChecks` entry instead of `type: None`. Confirm the XR only goes `Ready`
   once the underlying resource actually is.

5. **Pin by digest somewhere else in your own stack.** Find one place in your own
   infrastructure that still references a floating tag (`latest`, or a bare version) for
   something that matters. Pin it by digest and write down what you'd have to change if that
   digest ever needed to move.
