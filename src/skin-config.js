// Pure, lit-free skin configuration for Soccer Live Hub

export const APPEARANCES = ['ha', 'light', 'dark'];

export const PALETTES = ['team', 'blue', 'custom'];

export const APPEARANCE_OPTIONS = [
  ['ha', 'skin.appearance_ha'],
  ['light', 'skin.appearance_light'],
  ['dark', 'skin.appearance_dark'],
];

export const PALETTE_OPTIONS = [
  ['team', 'skin.palette_team'],
  ['blue', 'skin.palette_blue'],
  ['custom', 'skin.palette_custom'],
];

export const PALETTE_SWATCHES = {
  team: ['#0284c7', '#0f172a'],
  blue: ['#0284c7', '#0f172a'],
  custom: ['#0284c7', '#0f172a'],
};

const LEGACY_SKIN_MAP = {
  dark: { appearance: 'dark', palette: 'blue' },
  light: { appearance: 'light', palette: 'blue' },
  auto: { appearance: 'ha', palette: 'team' },
  ha: { appearance: 'ha', palette: 'team' },
};

export function resolveAppearance(config) {
  const a = config && typeof config.appearance === 'string' ? config.appearance.toLowerCase() : '';
  if (APPEARANCES.includes(a)) return a;
  const legacy = config?.skin ? LEGACY_SKIN_MAP[config.skin.toLowerCase()] : null;
  return legacy ? legacy.appearance : 'ha';
}

export function resolvePalette(config) {
  const p = config && typeof config.palette === 'string' ? config.palette.toLowerCase() : '';
  if (PALETTES.includes(p)) return p;
  const legacy = config?.skin ? LEGACY_SKIN_MAP[config.skin.toLowerCase()] : null;
  return legacy ? legacy.palette : 'blue';
}

export function paletteUsesCustomColors(palette) {
  return palette === 'custom' || palette === 'team';
}

export function mergeCardDefaults(config, defaults) {
  const cfg = config || {};
  if (!defaults || typeof defaults !== 'object') return cfg;
  const out = { ...cfg };
  if (cfg.appearance == null && defaults.appearance) out.appearance = defaults.appearance;
  if (cfg.palette == null && defaults.palette) out.palette = defaults.palette;
  return out;
}

export function resolveCompact(config, defaults) {
  if (config && config.compact !== undefined) return config.compact === true;
  return !!(defaults && defaults.compact === true);
}

export function buildMigratedConfig(config, effectiveAppearance, effectivePalette, over) {
  const next = { ...(config || {}), appearance: effectiveAppearance, palette: effectivePalette, ...(over || {}) };
  delete next.skin;
  return next;
}

export function nextRadioIndex(idx, count, key) {
  if (count <= 0) return idx;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  if (idx < 0) return idx;
  if (key === 'ArrowRight' || key === 'ArrowDown') return (idx + 1) % count;
  if (key === 'ArrowLeft' || key === 'ArrowUp') return (idx - 1 + count) % count;
  return idx;
}
