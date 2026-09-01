// Structural harness for verification-hook-sim.html
// Run: node --test modules/module-08-harness-engineering/explainer/sim/verification-hook-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'verification-hook-sim.html');

describe('verification-hook-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['claimList', 'evidenceToggle', 'evidenceBox', 'verdictBox']));
  it('teaches the verification-before-claiming model', () =>
    assertTeaches(html, ['checkov', 'BLOCK', 'PASS', 'evidence']));
});
