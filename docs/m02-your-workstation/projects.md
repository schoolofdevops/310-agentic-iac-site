---
sidebar_position: 4
title: 'Exploratory projects'
---

# M02 Projects: Your Agentic IaC Workstation

3 seeds, hints not solutions.

1. **Run the same intent through both CLIs.** Give Claude Code and Codex the exact same
   one-line ask and compare their first drafts. Where do they agree, and where does the
   design choice differ?

2. **Break the devcontainer on purpose.** Comment out the Docker socket mount in
   `.devcontainer/devcontainer.json`, rebuild, and try Lab 1's `docker info` check. You should
   see the exact failure mode module 1 warned about. Fix it, and confirm it's clean again.

3. **Write your own step 1 to step 2 pair.** Pick a small, real ask from your own work, not
   from this course. Run it through step 1 first, by hand, then step 2. Note what actually
   differed, the way this module's own lab did.
