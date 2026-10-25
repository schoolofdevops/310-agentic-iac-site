// Structural harness for stopping-condition-sim.html ("Who decides done?")
// Run: node --test modules/module-12-loop-multiagent-economics/explainer/sim/stopping-condition-sim.test.mjs
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'stopping-condition-sim.html');

describe('stopping-condition-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['judgePicker', 'scenarioPicker', 'budgetInput', 'runBtn', 'resetBtn',
      'turnLog', 'stateFile', 'verdictBox', 'tryThis']));
  it('teaches the three judges', () =>
    assertTeaches(html, ['ralph-loop', '/goal', 'Stop hook', 'verify.sh', 'runs no commands']));
  it('teaches the three verifier exits and the escalations', () =>
    assertTeaches(html, ['exit 0 done, 1 not done, 2 no verdict', 'NO VERDICT', 'budget exhausted',
      '.loop/state.md', '8 continuations']));
  it('runs an independent check after every run', () =>
    assertTeaches(html, ['Independent verify.sh afterwards']));
  it('has a three-step try-this challenge and respects reduced motion', () => {
    assertIds(html, ['try1', 'try2', 'try3']);
    assertTeaches(html, ['prefers-reduced-motion']);
  });
  it('no longer teaches the retired module content', () => {
    for (const t of ['loop.sh', 'Hermes', 'Multi-Agent Ops', 'rung', '\u2014'])
      assert.ok(!html.includes(t), `sim still contains: ${t}`);
  });
});
