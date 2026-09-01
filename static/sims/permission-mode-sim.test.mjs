// Structural harness for permission-mode-sim.html
// Run: node --test modules/module-02-your-workstation/explainer/sim/permission-mode-sim.test.mjs
import { describe, it } from 'node:test';
import { readSim, assertWellFormed, assertSelfContained, assertIds, assertTeaches } from './_harness.mjs';

const html = readSim(import.meta.url, 'permission-mode-sim.html');

describe('permission-mode-sim simulator', () => {
  it('is well-formed HTML with balanced script tags', () => assertWellFormed(html));
  it('is self-contained (no external refs)', () => assertSelfContained(html));
  it('has the required interactive controls', () =>
    assertIds(html, ['tool-Read', 'tool-Write', 'tool-Edit', 'tool-Bash', 'modeBox', 'resultBody', 'cliLine', 'warnBanner']));
  it('teaches the real allowedTools/permission-mode model', () =>
    assertTeaches(html, ['allowedTools', 'permission-mode', 'bypassPermissions', 'acceptEdits']));
});
