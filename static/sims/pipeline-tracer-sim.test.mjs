// Structural harness for pipeline-tracer-sim.html
// Run: node --test capstone/explainer/sim/pipeline-tracer-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'pipeline-tracer-sim.html');

describe('pipeline-tracer-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['stagelist', 'detail']));
  it('traces every real pipeline stage to the module that taught it', () =>
    assertTeaches(html, ['M07', 'M03', 'M04', 'M09', 'M06', 'HUMAN APPROVAL', 'reopens the spec']));
});
