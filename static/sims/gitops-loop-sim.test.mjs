// Structural harness for gitops-loop-sim.html
// Run: node --test modules/module-11-agentic-gitops/explainer/sim/gitops-loop-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'gitops-loop-sim.html');

describe('gitops-loop-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['stages', 'nextBtn', 'tamperBtn', 'resetBtn', 'logBox']));
  it('teaches the full gitops loop and step 5', () =>
    assertTeaches(html, ['Argo CD', 'CI gate', 'merge', 'step 5', 'self-heal']));
});
