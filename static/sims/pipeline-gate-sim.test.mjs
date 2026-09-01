// Structural harness for pipeline-gate-sim.html
// Run: node --test modules/module-09-verifying-ai-infra/explainer/sim/pipeline-gate-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'pipeline-gate-sim.html');

describe('pipeline-gate-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['runBtn', 'stageRow', 'verdictBox']));
  it('teaches the assembled pipeline model', () =>
    assertTeaches(html, ['trivy', 'checkov', 'infracost', 'approval']));
});
