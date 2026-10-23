// Structural harness for bootstrap-sim.html
// Run: node --test modules/module-08-harness-engineering/explainer/sim/bootstrap-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'bootstrap-sim.html');

describe('bootstrap-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['pluginToggle', 'requestList', 'runButton', 'firstActions', 'verdictBox']));
  it('teaches the bootstrap-and-first-action model', () =>
    assertTeaches(html, ['brainstorming', 'using-superpowers', 'SessionStart', 'verification-before-completion']));
});
