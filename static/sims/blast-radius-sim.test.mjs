// Structural harness for blast-radius-sim.html
// Run: node --test modules/module-06-guardrails/explainer/sim/blast-radius-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'blast-radius-sim.html');

describe('blast-radius-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['scenarioList', 'planTitle', 'planBody', 'maxResources', 'blockOnDelete', 'highRadiusTypes', 'verdictBox']));
  it('teaches the blast-radius gate model', () =>
    assertTeaches(html, ['delete', 'resource', 'block']));
});
