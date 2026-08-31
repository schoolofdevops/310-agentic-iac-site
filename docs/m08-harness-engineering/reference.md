---
sidebar_position: 3
title: 'Reference card'
---

# M08 Reference Card: Harness Engineering

## The superpowers pattern, three disciplines

| Discipline | What it means | What gets skipped without it |
|---|---|---|
| Test-first | A failing test before any production code | A test written to match what the code already does |
| Verify before claiming | Real command output before saying something works | A confident-sounding guess |
| Root-cause debugging | Fix the cause, not the symptom | A patch that hides the error and lets it reappear elsewhere |

## The verification-hook contract

- **Checks:** does the response contain a completion-claim phrase (checkov passes, tests pass,
  it works, is clean)?
- **If no claim:** pass, nothing to verify
- **If claim + real evidence nearby** (real command output, a real pass/fail count): pass
- **If claim + no evidence:** block, non-zero exit

## Harness vs context vs loop, in one line each

| Layer | Symptom | Fixed in |
|---|---|---|
| Context | Can't get one task right at all | M03 |
| Harness | Ignores our standards | M04 to M08, this chapter assembles it |
| Loop | I have to babysit every run | M12 |

## Harness before loop

Never add a loop on top of a broken harness. A loop just repeats a broken harness's mistakes
faster. Module 12's step 5 (supervised autonomy) only works once this chapter's harness is real.
