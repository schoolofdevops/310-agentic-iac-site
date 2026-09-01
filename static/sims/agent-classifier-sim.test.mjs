// Structural harness for agent-classifier-sim.html
// Run: node --test modules/module-01-clickops-to-agents/explainer/sim/agent-classifier-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'agent-classifier-sim.html');

describe('agent-classifier-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['presets', 'hasLoop', 'decides', 'stops', 'touches', 'planFirst', 'autoGate', 'verdictArea', 'trailArea', 'ladderArea']));
  it('teaches the loop / stopping-condition / autonomy-ladder model', () =>
    assertTeaches(html, ['autocomplete', 'stopping condition', 'ladder', 'supervised autonomy']));
});
