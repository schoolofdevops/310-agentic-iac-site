// Structural harness for skill-discoverability-sim.html
// Run: node --test modules/module-04-agent-skills/explainer/sim/skill-discoverability-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'skill-discoverability-sim.html');

describe('skill-discoverability-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['taskInput', 'presets', 'skillList']));
  it('teaches the discoverability model', () =>
    assertTeaches(html, ['description', 'terraform-best-practices', 'vague']));
});
