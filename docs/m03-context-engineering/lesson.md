---
sidebar_position: 1
title: 'Context Engineering for Infrastructure'
---

import Slides from '@site/src/components/Slides';
import Embed from '@site/src/components/Embed';

# Chapter 3: Context Engineering for Infrastructure

<Slides src="decks/m03-context-engineering.html" title="M3: Context Engineering for Infrastructure" />

## Recap: Where a Context Problem Lives

Module 1 gave you a small diagnostic: when an agentic workflow is not working, the
problem lives in one of three layers, context, harness, or loop. You would spot a
context problem by its symptom. It does not sound like "it keeps ignoring our
standards", that is a harness problem. It does not sound like "I have to babysit
every run", that is a loop problem. A context problem sounds like this: **"it can't
get one single task right, at all."**

That symptom means the agent never had what it needed to do the task correctly in
the first place. Not a bigger model. Not a cleverer prompt. Information. This
chapter is about giving an agent that information, the same way you would give it
to a new hire on their first day: the repo's shape, its naming conventions, its
provider pins, and what "done" actually looks like on this team.

## The Context Window Is a Scarce Resource

Every agent works inside a context window, a fixed budget of tokens it can hold in
its head at once. Would you call that budget generous? It is bigger than it used
to be, sure. But it is still a fixed box, and every run fills it with something.

![A fixed-size context window box divided into segments: task-relevant content, repository noise, and unused space, showing the window as a scarce, shared resource.](./diagrams/context-window.svg)

Here is the part that is easy to miss. That box does not only hold the task. It
also holds whatever files the agent happened to read along the way, old turns of
chat history that never got pruned, and sometimes plain noise, a huge log file, an
unrelated README, a dependency lock file nobody meant to hand over. None of that is
free. Every token spent on noise is a token not spent on the task. A context window
that is half full of noise behaves like a smaller window than it actually is.

That is the whole argument for this chapter, in one line: what you put in the
window, on purpose, decides how much of it is actually working for you.

### Try it: the context window visualizer

Words only get you so far here. There's a small, interactive tool that makes this
concrete: [Context Window Visualizer](pathname:///310-agentic-iac-site/sims/context-window-sim.html).
Add pieces to a fixed 2,000-token window (an `AGENTS.md`, the file that actually
has the bug, the one-off ask, some noise) and watch whether the task would actually
land with what you gave it. Try adding only noise first. Then try the exact fix
this chapter's lab walks through: the same `AGENTS.md`, with and without the one
policy line spelled out.

<Embed src="sims/context-window-sim.html" title="Context Window Visualizer" />

## Context Engineering, Not Prompt Engineering

You will hear the word "prompt engineering" a lot. This course does not use it,
and here is why. A prompt is what you ask once, for one task. Context is what stays
true about your repo, your team, and your standards, every single time you ask
anything at all.

![Two panels compared: standing context that is reused on every run, versus a one-off prompt that is spent once and then gone.](./diagrams/context-vs-prompt.svg)

Say you ask an agent, "build me a VPC with two subnets." That is a prompt. It gets
spent the moment you send it, and it says nothing about how your team names things,
which provider version you pin, or where secrets are supposed to come from. Write
those facts down once, in a file the agent reads every time, and you never have to
retype them again. That written-down, reused-every-time information is context. A
good prompt gets you through one task. Good context gets every future task started
from the same place a senior engineer on your team would start from.

## Anatomy of an AGENTS.md

So what actually goes in a file like this? Not a wish list. Not a style guide for
its own sake. The specific, load-bearing facts an agent would otherwise have to
guess, or get wrong.

![An annotated AGENTS.md file with four sections labeled: provider pins, naming convention, module boundaries, and a never-do list.](./diagrams/agentsmd-anatomy.svg)

**Provider pins.** Which version of Terraform or OpenTofu, which provider version,
pinned exactly. An agent that picks its own version picks whatever it last saw in
training data, which could be a year old or a year ahead of what your team runs.

**Naming convention.** `prod-billing-vpc`, not `vpc1` or `my-test-vpc`. Write the
pattern down once, and every resource an agent creates follows it, instead of you
correcting the name in every single review.

**Module boundaries.** One module per concern, `networking/`, `compute/`,
`data/`, whatever your team's actual shape is. An agent that does not know your
boundaries will happily put a database resource inside your networking module,
because nothing told it not to.

**The never-do list.** The short list of mistakes that are not subtle, a secret as
a `default` value, an `apply` run without reading the plan first, using a provider
version nobody approved. Write these down as flat rules, not as hints. An agent
follows a rule it can read far more reliably than one it has to infer.

None of this is exotic. It is exactly what you would tell a new engineer joining
your team this week, written down so you only have to say it once.

## Repo Shape Is Retrieval

Here is a fact that surprises people the first time they hear it: an agent finds
files the same way a human does, by name, by path, by what looks relevant. There
is no hidden channel where it magically knows your intent. If a human engineer
would struggle to find the right file in your repo, an agent will struggle too.

![A funnel from the whole repository, to the files relevant to the task, to what actually lands inside the context window, the same path a human would take.](./diagrams/retrieval-funnel.svg)

Picture the funnel. At the top, your whole repository, maybe hundreds of files.
In the middle, the smaller set of files actually relevant to the task at hand,
found by name and by path. At the bottom, whatever finally lands inside the
context window and gets used. A repo with clear, predictable names narrows that
funnel fast. A repo where everything is called `main.tf` and `variables.tf`,
scattered across a dozen folders with no obvious pattern, forces the agent to
guess, the same way it would force a new hire to guess. Shape your repo for a
human reader first, and you have mostly shaped it for an agent too.

## The Information Gap

Here is a real number worth sitting with. In a study of agents following written
policy, fourteen residual policy failures were on the table. Once the policy text
itself was made visible to the agent, not assumed, not implied, actually placed
where the agent could read it, **eleven of those fourteen** failures went away.

![Fourteen policy failures shown as dots, eleven turn green once policy text is made visible to the agent, three stay red.](./diagrams/information-gap.svg)

Read that number carefully: eleven of fourteen, not a rounded seventy-nine
percent. Small sample, real finding, worth stating exactly. And notice what the
fix was not. It was not a smarter model. It was not a longer, cleverer prompt. It
was making a rule that already existed, somewhere, in someone's head or in a
wiki page nobody reads, actually visible to the agent at the moment it needed it.
Most of what teams call "the agent doesn't follow our standards" is not a
harness problem or a model problem. It is an information gap. The rule was
real. It just was not written where the agent could see it.

## Before and After

Theory is easy to agree with and easy to skip. So here is the actual test: run the
exact same one-line intent, into the exact same agent, on the exact same repo,
once with no `AGENTS.md`, once with one written. What changes?

![The same one-line intent into the same agent, minus context on the left produces a hardcoded secret, plus context on the right produces a sensitive variable set from the environment.](./diagrams/before-after.svg)

Without a written convention, an agent under time pressure reaches for the
fastest thing that works, a plaintext default on a secret variable, exactly the
mistake M01's lab caught with Checkov. With the convention written down, the same
agent, given the exact same intent, produces a `sensitive` variable, set from the
environment, the very first time, no scanner needed to catch it after the fact.
That is the whole payoff of this chapter: the fix moved from "catch it after
generation" to "prevent it before generation ever happens." You will do this
exact comparison yourself in the lab.

## Vocabulary

| Term | Definition |
|---|---|
| Context window | The fixed budget of tokens an agent can hold in its working memory for a given run |
| Context engineering | Deliberately shaping what an agent knows before it starts a task, so it does not have to guess |
| Standing context | Information written down once, in a file the agent reads on every run, as opposed to a one-off prompt |
| `AGENTS.md` / `CLAUDE.md` | A written file of standing context for a repo: provider pins, naming conventions, module boundaries, a never-do list |
| Retrieval | The process by which an agent finds the files relevant to its task, mostly by name and path, the same way a human would |
| Policy visibility | Whether a rule a team actually enforces is written somewhere the agent can read it, or only lives in someone's head |
| Information gap | The distance between a rule that is real and a rule that is visible to the agent at the moment it needs it |
