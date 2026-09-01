// Structural harness for stopping-condition-sim.html
// Run: node --test modules/module-12-loop-multiagent-economics/explainer/sim/stopping-condition-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'stopping-condition-sim.html');

describe('stopping-condition-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['conditionPicker', 'tickRow', 'runBtn', 'resetBtn', 'verdictBox']));
  it('teaches the stopping-condition and economics models', () =>
    assertTeaches(html, ['checkov', 'ESCALATE', 'step 6', 'Caveman', 'rtk']));
});
