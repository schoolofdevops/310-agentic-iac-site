// Structural harness for stale-vs-live-sim.html
// Run: node --test modules/module-05-mcp-tool-layer/explainer/sim/stale-vs-live-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'stale-vs-live-sim.html');

describe('stale-vs-live-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['qlist', 'mcpToggle', 'answerBox']));
  it('teaches the stale-vs-live lookup model with the real captured numbers', () =>
    assertTeaches(html, ['3.6.2', '4.5.0', 'get_latest_provider_version']));
});
