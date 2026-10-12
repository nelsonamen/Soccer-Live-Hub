import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveAppearance,
  resolvePalette,
  paletteUsesCustomColors,
  mergeCardDefaults,
  resolveCompact,
  buildMigratedConfig,
  nextRadioIndex,
  APPEARANCES,
  PALETTES,
} from '../../src/skin-config.js';

test('buildMigratedConfig: seeds both axes from effective, applies pick, drops skin', () => {
  const next = buildMigratedConfig({ skin: 'blue', entity: 'sensor.x' }, 'dark', 'blue', { appearance: 'light' });
  assert.equal(next.appearance, 'light');   // the pick
  assert.equal(next.palette, 'blue');       // seeded from effective
  assert.equal(next.skin, undefined);       // legacy skin removed
  assert.equal(next.entity, 'sensor.x');    // other keys kept
  const next2 = buildMigratedConfig({ skin: 'blue' }, 'dark', 'blue', { palette: 'blue' });
  assert.equal(next2.appearance, 'dark');
  assert.equal(next2.palette, 'blue');
});

test('nextRadioIndex: wraps forward/back, ignores non-arrow keys', () => {
  assert.equal(nextRadioIndex(0, 3, 'ArrowRight'), 1);
  assert.equal(nextRadioIndex(2, 3, 'ArrowRight'), 0);   // wrap
  assert.equal(nextRadioIndex(0, 3, 'ArrowLeft'), 2);    // wrap back
  assert.equal(nextRadioIndex(1, 3, 'ArrowUp'), 0);
  assert.equal(nextRadioIndex(1, 3, 'Enter'), 1);        // unchanged
  assert.equal(nextRadioIndex(-1, 3, 'ArrowRight'), -1); // no focused button
  assert.equal(nextRadioIndex(1, 4, 'Home'), 0);         // Home -> first
  assert.equal(nextRadioIndex(1, 4, 'End'), 3);          // End -> last
});

test('resolveCompact: card value wins, else inherits shared', () => {
  assert.equal(resolveCompact({ compact: true }, { compact: false }), true);
  assert.equal(resolveCompact({ compact: false }, { compact: true }), false);   // explicit off overrides shared on
  assert.equal(resolveCompact({}, { compact: true }), true);                    // inherit shared on
  assert.equal(resolveCompact({}, { compact: false }), false);
  assert.equal(resolveCompact({}, null), false);                                // nothing -> off
});

test('mergeCardDefaults: inherits per field', () => {
  const shared = { appearance: 'dark', palette: 'blue' };
  const m = mergeCardDefaults({ appearance: 'light' }, shared);
  assert.equal(m.appearance, 'light');
  assert.equal(m.palette, 'blue');
  assert.equal(resolvePalette(m), 'blue');

  const m2 = mergeCardDefaults({ palette: 'custom' }, shared);
  assert.equal(m2.appearance, 'dark');
  assert.equal(m2.palette, 'custom');
});

test('new fields win and are validated', () => {
  assert.equal(resolveAppearance({ appearance: 'light' }), 'light');
  assert.equal(resolvePalette({ palette: 'custom' }), 'custom');
  // invalid values fall back to defaults
  assert.equal(resolveAppearance({ appearance: 'nope' }), 'ha');
  assert.equal(resolvePalette({ palette: 'nope' }), 'blue');
});

test('defaults when nothing is set', () => {
  assert.equal(resolveAppearance({}), 'ha');
  assert.equal(resolvePalette({}), 'blue');
  assert.equal(resolveAppearance(null), 'ha');
  assert.equal(resolvePalette(undefined), 'blue');
});

test('legacy skin maps to appearance + palette', () => {
  assert.equal(resolveAppearance({ skin: 'light' }), 'light');
  assert.equal(resolvePalette({ skin: 'light' }), 'blue');
  assert.equal(resolveAppearance({ skin: 'dark' }), 'dark');
  assert.equal(resolvePalette({ skin: 'dark' }), 'blue');
  assert.equal(resolvePalette({ skin: 'auto' }), 'team');
});

test('paletteUsesCustomColors: only team and custom', () => {
  assert.equal(paletteUsesCustomColors('team'), true);
  assert.equal(paletteUsesCustomColors('custom'), true);
  assert.equal(paletteUsesCustomColors('blue'), false);
});

test('option sets stay in sync with the axes', () => {
  assert.ok(APPEARANCES.includes('ha'));
  assert.ok(PALETTES.includes('team'));
  assert.ok(PALETTES.includes('blue'));
  assert.ok(PALETTES.includes('custom'));
});
