// Structural harness for context-window-sim.html
// Run: node --test modules/module-03-context-engineering/explainer/sim/context-window-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'context-window-sim.html');

describe('context-window-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['chunkList', 'barOuter', 'stack', 'verdictBox', 'budgetLabel', 'policyToggle', 'resetBtn']));
  it('teaches the context-window-as-scarce-resource model', () =>
    assertTeaches(html, ['AGENTS.md', 'tokens', 'noise', 'policy']));
});
