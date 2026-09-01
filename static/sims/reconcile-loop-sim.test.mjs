// Structural harness for reconcile-loop-sim.html
// Run: node --test modules/module-10-agentic-kubernetes/explainer/sim/reconcile-loop-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'reconcile-loop-sim.html');

describe('reconcile-loop-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['desired', 'observed', 'driftBtn', 'tickBtn', 'resetBtn', 'loopTrack', 'logLine']));
  it('teaches the reconcile-loop model', () =>
    assertTeaches(html, ['XAppConfig', 'drift', 'reconcile', 'Crossplane', 'one-shot']));
});
