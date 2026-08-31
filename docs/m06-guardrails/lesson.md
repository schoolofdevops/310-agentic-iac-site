---
sidebar_position: 1
title: 'Guardrails: Permissions, Hooks, Blast Radius'
---

import Slides from '@site/src/components/Slides';

# Chapter 6: Guardrails: Permissions, Hooks, Blast Radius

<Slides src="decks/m06-guardrails.html" title="M6: Guardrails: Permissions, Hooks, Blast Radius" />

## Recap: A Skill Can Only Ever Suggest

Module 4 gave an agent a skill, a packaged bit of capability it reaches for on its own when a
task matches. That's real, and it's useful. But notice what it depends on: the agent has to
decide to use it. Would you call that a guarantee? It is not. A skill with a vague description
sits there, correct, unused. Even a good skill can be skipped, misread, or overridden by a louder
instruction in the same prompt.

This chapter is about the part that doesn't depend on the agent deciding anything: a hook. A hook
runs at a fixed point, every time, whether or not the agent wants it to.

## Permissions: What the Agent Is Even Allowed to Touch

Before a hook ever runs, there's a simpler question. What can the agent read, write, or execute in
the first place? That's a permission boundary, and it's set before the run starts, not negotiated
in the middle of one.

![A repo divided into two zones: modules, where an agent may read and write freely, and shared, walled off with a deny rule the agent cannot argue its way past.](./diagrams/permission-boundary.svg)

A permission boundary answers a narrower question than a hook does. A hook asks "is this specific
change safe?" A permission boundary asks "should this agent even be near this file?" You'd set
this kind of rule the same way you'd hand a new contractor a badge that opens some doors and not
others, before they've done anything wrong, just because some doors matter more.

## Hooks: Code That Runs Whether or Not the Agent Wants It To

Here's the definition this chapter actually turns on: a hook is code that runs at a fixed point in
an agent's workflow, before a tool call, before an `apply`, and it runs there every single time,
regardless of what the agent decided.

![Two paths side by side: a skill, which only runs if the agent decides the task matches, and a hook, which intercepts every attempt and runs the same check every time.](./diagrams/voluntary-vs-enforced.svg)

That word "regardless" is doing all the work in that sentence. An agent can ignore a skill. An
agent cannot skip a hook that's wired into the pipeline it runs through, the same way you can't
skip airport security by deciding you're in a hurry. Would that make a skill worthless? No, a
skill is still the right tool for "help the agent do the right thing by default." A hook is the
right tool for "make sure the wrong thing cannot happen even if something upstream got it wrong."

Where does a hook actually sit in the flow the agent runs through? Right between the plan and the
apply, checking the plan itself before anything touches real infrastructure.

![The M01 authority-boundary diagram, redrawn with a checkpoint added: agent proposes, generates a plan, the hook intercepts, then pass or block, only then does apply happen.](./diagrams/hook-checkpoint.svg)

## Blast Radius, Mechanically

Module 1 named blast radius as one of the four properties that make infrastructure riskier than
application code: a bug in a shared setting takes down everything connected to it. This chapter
turns that idea into something a script can actually check.

`terraform plan` has a JSON form. Run `terraform show -json` against a saved plan file and you get
a list of every resource change, each one tagged with its type and its action, create, update,
delete, or no-op. A hook doesn't need to understand your infrastructure. It only needs to read that
list and ask three narrow questions:

![A terraform plan in JSON, parsed into three checks: does it contain a delete action, does the resource count exceed a threshold, does it touch a resource type on a high-radius list.](./diagrams/blast-radius-mechanics.svg)

- Is a `delete` action present anywhere in this plan?
- Does the total number of resource changes exceed a threshold your team picked?
- Does this plan touch a resource type your team already agreed is dangerous by shape, an IAM
  role, a shared VPC, a policy, regardless of how small the diff looks?

### Try it: the blast radius gate visualizer

There's a small, interactive tool that runs these three checks live:
[Blast Radius Gate Visualizer](pathname:///310-agentic-iac-site/sims/blast-radius-sim.html). Pick a real plan shape,
a single delete, a bulk delete, a shared VPC change, tune the policy, and watch which check
actually trips. Try loosening `max-resources` until a bulk delete would pass on count alone, then
notice the delete check still catches it, because the checks are independent, not a single score.

None of those checks require the hook to know what your S3 bucket is for. That's the whole appeal.
A mechanical check catches a mechanical property. It won't catch "this bucket name is wrong for
our naming convention," that's still a skill's job, or a scanner's job, coming in M09.

## A Gate That Actually Gates

Would every check that runs before `apply` count as a hook, in the sense this chapter means? Not
quite. There's a real difference between a check that blocks and a check that only warns, and it
comes down to one thing: the exit code.

![Two hooks side by side: one prints a warning and lets the pipeline continue anyway, the other exits non-zero and the apply never runs. Only the second one is a gate.](./diagrams/gate-vs-warning.svg)

A script that finds a problem and prints a red message, then lets `apply` run anyway, is not a
gate. It's a suggestion with better formatting. A gate exits non-zero on failure, and the thing
that calls it, a wrapper script, a CI step, a pre-commit hook, has to actually stop when it sees
that non-zero exit. Both halves matter. A gate with the right logic but a caller that ignores its
exit code is not a gate either, it's theater.

## Rung 4: Gated Apply

Module 1 introduced the autonomy ladder. Rung 4 is "gated apply," automated checks plus human
approval, together, not either one on its own. This chapter's lab is where that rung stops being
an abstract row in a table and becomes a script you wrote yourself.

![The M01 autonomy ladder, rung 4 highlighted: automated checks (the hook) and human approval, drawn as two separate boxes that both have to say yes.](./diagrams/ladder-rung4.svg)

Notice what rung 4 is not. It is not "the hook approved it, so it's safe to skip the human." It is
not "a human looked at it, so the hook is redundant." Both have to say yes. The hook catches the
mechanical, blast-radius-shaped mistakes fast and consistently, every single time, something a
tired human reviewing their fortieth plan of the day will eventually miss. The human catches the
things no mechanical check can, whether this specific delete, at this specific moment, in this
specific bucket, is actually the right call.

## Vocabulary

| Term | Meaning |
|---|---|
| Permission boundary | What an agent can read, write, or execute in a repo, set before the run starts |
| Hook | Code that runs at a fixed point in an agent's workflow, every time, regardless of what the agent decided |
| Blast radius (mechanical) | A property read directly from a `terraform plan -json`: delete actions present, resource count, high-radius resource types touched |
| Gate | A check whose caller actually stops on a non-zero exit code, as opposed to one that only prints a warning |
| Rung 4, gated apply | Automated checks and human approval together, neither one alone |
