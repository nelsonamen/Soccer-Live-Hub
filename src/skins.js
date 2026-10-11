import { css } from "lit";
import { normalizeCssColor, hexToRgbTriplet, getAutoColors, buildGradient, clampOpacity, normalizeWatermarkSize, sanitizeWatermarkUrl } from "./skin-colors.js";
import { resolveAppearance, resolvePalette, paletteUsesCustomColors, mergeCardDefaults } from "./skin-config.js";

export const skinStyles = css`
  :host {
    /* Semantic, skin-independent colours. */
    --cl-green: #10b981;
    --cl-gold: #f59e0b;
    --cl-gold-glow: rgba(245,158,11,0.3);
    --cl-gold-text: #f59e0b;
    --cl-cl: #0284c7;
    --cl-el: #f97316;
    --cl-rel: #ef4444;
    --cl-conf: #0284c7;
    --cl-win: #10b981;
    --cl-draw: #64748b;
    --cl-loss: #ef4444;
    --cl-accent-soft: rgba(0,0,0,0.04);
    --cl-accent-visible: var(--cl-accent);
  }

  /* Clean Neutral Base Accent */
  :host,
  :host([data-palette="purple"]),
  :host([data-palette="custom"]),
  :host([data-palette="team"]) {
    --cl-accent: #0284c7;
    --cl-accent-2: #0f172a;
    --cl-accent-rgb: 2,132,199;
    --cl-accent-2-rgb: 15,23,42;
    --cl-live: #ef4444;
    --cl-live-glow: rgba(239,68,68,0.4);
  }

  /* ============================ APPEARANCES (neutrals) ============================ */
  :host,
  :host([data-appearance="dark"]) {
    --cl-bg: #0f172a;
    --cl-surface: #1e293b;
    --cl-surface-2: #334155;
    --cl-card-2: #1e293b;
    --cl-divider: rgba(255,255,255,0.10);
    --cl-glass-border: rgba(255,255,255,0.12);
    --cl-text: #ffffff;
    --cl-text-2: #94a3b8;
    --cl-shadow: rgba(0,0,0,0.45);
    --cl-overlay-strong: rgba(0,0,0,0.70);
    --cl-overlay-soft: rgba(0,0,0,0.35);
    --cl-bar-outline: rgba(255,255,255,0.14);
    --cl-bar-separator: rgba(255,255,255,0.25);
    --cl-chip-bg: #1e293b;
    --cl-chip-border: rgba(255,255,255,0.15);
    --cl-toast-bg: #1e293b;
    --cl-num-bg: #1e293b;
  }

  :host([data-appearance="light"]) {
    --cl-bg: #ffffff;
    --cl-surface: #f8fafc;
    --cl-surface-2: #f1f5f9;
    --cl-card-2: #ffffff;
    --cl-divider: #e2e8f0;
    --cl-glass-border: #cbd5e1;
    --cl-text: #0f172a;
    --cl-text-2: #64748b;
    --cl-shadow: rgba(15,23,42,0.06);
    --cl-overlay-strong: rgba(15,23,42,0.60);
    --cl-overlay-soft: rgba(15,23,42,0.20);
    --cl-bar-outline: rgba(15,23,42,0.18);
    --cl-bar-separator: rgba(0,0,0,0.12);
    --cl-chip-bg: #f1f5f9;
    --cl-chip-border: #e2e8f0;
    --cl-toast-bg: #0f172a;
    --cl-num-bg: #ffffff;
  }

  :host([data-appearance="ha"]) {
    --cl-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --cl-surface: var(--secondary-background-color, #f8fafc);
    --cl-surface-2: var(--secondary-background-color, #f1f5f9);
    --cl-card-2: var(--secondary-background-color, #ffffff);
    --cl-divider: var(--divider-color, #e2e8f0);
    --cl-glass-border: var(--divider-color, #cbd5e1);
    --cl-text: var(--primary-text-color, #0f172a);
    --cl-text-2: var(--secondary-text-color, #64748b);
    --cl-shadow: rgba(0,0,0,0.08);
    --cl-overlay-strong: rgba(0,0,0,0.55);
    --cl-overlay-soft: rgba(0,0,0,0.25);
    --cl-bar-outline: var(--divider-color, #e2e8f0);
    --cl-bar-separator: rgba(0,0,0,0.12);
    --cl-chip-bg: var(--secondary-background-color, #f1f5f9);
    --cl-chip-border: var(--divider-color, #e2e8f0);
    --cl-toast-bg: var(--card-background-color, #0f172a);
    --cl-num-bg: var(--card-background-color, #ffffff);
  }
`;

export function applySkin(el, config) {
  const merged = withCardDefaults(el, config);
  const appearance = resolveAppearance(merged);
  const palette = resolvePalette(merged);
  if (el && el.setAttribute) {
    el.setAttribute('data-appearance', appearance);
    el.setAttribute('data-palette', palette);
    applyCustomPaletteVars(el, merged, palette);
  }
  return { appearance, palette };
}

function withCardDefaults(el, config) {
  const cfg = config || {};
  const entityId = cfg.entity || (cfg.entities && cfg.entities[0]);
  const defaults = entityId && el?.hass?.states?.[entityId]?.attributes?.card_defaults;
  return mergeCardDefaults(cfg, defaults);
}

const CUSTOM_COLOR_KEYS = [
  ['accent_color', '--cl-accent', '--cl-accent-rgb'],
  ['accent_2_color', '--cl-accent-2', '--cl-accent-2-rgb'],
  ['secondary_color', '--cl-accent-2', '--cl-accent-2-rgb'],
  ['live_color', '--cl-live', null],
  ['gold_color', '--cl-gold', null],
  ['background_color', '--cl-bg', null],
  ['surface_color', '--cl-surface', null],
  ['surface_2_color', '--cl-surface-2', null],
  ['card_color', '--cl-card-2', null],
  ['text_color', '--cl-text', null],
  ['secondary_text_color', '--cl-text-2', null],
  ['divider_color', '--cl-divider', null],
  ['chip_color', '--cl-chip-bg', null],
  ['chip_border_color', '--cl-chip-border', null],
];

const CUSTOM_EXTRA_VARS = ['--cl-bg', '--cl-bg-image', '--cl-bg-image-opacity', '--cl-bg-image-size'];
const CUSTOM_COLOR_VARS = new Set(
  CUSTOM_COLOR_KEYS.flatMap(([, colorVar, rgbVar]) => rgbVar ? [colorVar, rgbVar] : [colorVar])
    .concat(CUSTOM_EXTRA_VARS)
);

function applyCustomPaletteVars(el, config, palette) {
  for (const cssVar of CUSTOM_COLOR_VARS) el.style.removeProperty(cssVar);
  if (!config || !paletteUsesCustomColors(palette)) return;

  const entityAttrs = getEntityAttributes(el, config);
  const sourceConfig = { ...entityAttrs, ...config };

  for (const [key, cssVar, rgbVar] of CUSTOM_COLOR_KEYS) {
    const val = normalizeCssColor(sourceConfig[key]);
    if (val) {
      el.style.setProperty(cssVar, val);
      if (rgbVar) {
        const rgb = hexToRgbTriplet(val);
        if (rgb) el.style.setProperty(rgbVar, rgb);
      }
    }
  }

  const bg = normalizeCssColor(sourceConfig.background_color);
  if (bg) el.style.setProperty('--cl-bg', bg);

  const img = sanitizeWatermarkUrl(sourceConfig.background_image);
  if (img) {
    el.style.setProperty('--cl-bg-image', `url("${img}")`);
    const op = clampOpacity(sourceConfig.watermark_opacity, 0.07);
    el.style.setProperty('--cl-bg-image-opacity', String(op));
    const sz = normalizeWatermarkSize(sourceConfig.watermark_size);
    if (sz) el.style.setProperty('--cl-bg-image-size', sz);
  }
}

function getEntityAttributes(el, config) {
  const entityId = config.entity || (config.entities && config.entities[0]);
  if (!entityId || !el || !el.hass || !el.hass.states) return {};
  const stateObj = el.hass.states[entityId];
  return stateObj?.attributes?.card_defaults || {};
}
