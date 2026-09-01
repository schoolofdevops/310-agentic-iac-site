// Structural harness for spec-vs-vibe-sim.html
// Run: node --test modules/module-07-spec-driven-infra/explainer/sim/spec-vs-vibe-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from '../../../../labs/shared/sims/_harness.mjs';

const html = readSim(import.meta.url, 'spec-vs-vibe-sim.html');

describe('spec-vs-vibe-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['specBtn', 'vibeBtn', 'codeBox', 'criteriaBox', 'summaryBox']));
  it('teaches the spec-vs-vibe-coded model with the real captured numbers', () =>
    assertTeaches(html, ['7', '1', '20', '14', 'CKV_AWS_79']));
});
