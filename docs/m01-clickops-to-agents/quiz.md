---
sidebar_position: 5
title: 'Quiz'
---

# M01 Quiz: From ClickOps to Agents

8 questions. Answers are collapsed, click to reveal.

---

**1. Put the seven eras in order: GitOps, ClickOps, agentic, declarative IaC, AI-assisted, scripts, configuration management.**

<details>
<summary>Answer</summary>

ClickOps → scripts → configuration management → declarative IaC → GitOps → AI-assisted →
agentic. Each era raises the level at which a human states intent and hands more of the
translation to a machine.

</details>

---

**2. A teammate pastes a Terraform error into a chat window, gets a suggested fix, and copies the fixed line into their own file by hand. Is this automation, autocomplete, or an agent? Why?**

<details>
<summary>Answer</summary>

Autocomplete. There's no loop: the tool produced one suggestion and stopped. It didn't act,
observe the result, and decide what to do next. The teammate did all of the deciding and
all of the acting.

</details>

---

**3. A CI script always runs `terraform fmt`, `terraform validate`, and `terraform apply` in that fixed order, with no branching logic. Is this an agent? Why or why not?**

<details>
<summary>Answer</summary>

No. It's automation, not an agent. It executes a fixed sequence regardless of what it
observes along the way. An agent would decide, based on what `validate` returned, whether
to proceed, fix something, or stop.

</details>

---

**4. A tool reads a one-line intent, generates a Terraform module, runs `checkov` against it, and if the scan fails, rewrites the offending resource and re-scans, up to three attempts, before handing the result to a human. Which step of the autonomy ladder is this, and what's still missing before it could safely move up one step?**

<details>
<summary>Answer</summary>

Step 5, supervised autonomy: the agent loops on its own across multiple iterations, and a
human reviews the outcome rather than each step. To move to step 6, unattended, it would
need a defined stopping condition that doesn't require a human to review every run, plus
whatever gate currently makes the human review meaningful would need to become automated
enough to trust without that review.

</details>

---

**5. Which of the following is NOT one of the four properties that make infrastructure harder for an agent to touch than application code: (a) no undo, (b) state, (c) verbose syntax, (d) blast radius, (e) silent failure?**

<details>
<summary>Answer</summary>

(c) verbose syntax. Terraform's syntax has nothing to do with why infrastructure mistakes
are more dangerous. The four properties are no undo, state, blast radius, and silent
failure.

</details>

---

**6. Given the thesis "the agent proposes, the pipeline decides," where is `apply` authorized to run in a well-built agentic infrastructure workflow?**

<details>
<summary>Answer</summary>

Only after the pipeline, scanners, policy checks, cost checks, and human approval, has
reviewed the plan and approved it. The agent's own confidence that its plan is correct is
never sufficient on its own; its authority ends at producing the plan.

</details>

---

**7. A team says: "Our agent writes correct Terraform for simple modules, but every time we ask it to follow our internal naming convention or use our approved module registry, it ignores the instruction." Which of the three layers, context, harness, or loop, does this symptom point to, and why not one of the other two?**

<details>
<summary>Answer</summary>

Harness. The agent isn't failing to understand the task (that would be a context problem)
and it isn't failing to stop or re-trigger correctly (a loop problem). It's ignoring team
standards, which live in the tools, hooks, and gates around the agent, the harness, not in
what the agent knows or when it runs.

</details>

---

**8. A junior engineer argues: "Since 46% of organizations already run AI for infrastructure in production, we should let our agent apply changes unattended, adoption is clearly high enough." What's wrong with that argument?**

<details>
<summary>Answer</summary>

It conflates adoption with trust. The same survey found only 34% would trust an autonomous
system to make production changes without human approval, and 43% named absent guardrails
as the top blocker to going further. High adoption of AI-assisted work, most of it well
below step 6, doesn't imply readiness for unattended production changes; it implies the
opposite: most teams that have adopted this are deliberately not running it unattended yet.

</details>
