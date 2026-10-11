import { html, css } from 'lit';

export const editorStyles = css`
  .card-config { display: flex; flex-direction: column; gap: 16px; }
  .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  label { font-size: 14px; color: var(--primary-text-color); }
  .editor-section { margin-bottom: 20px; }
  .editor-section h3 { margin: 12px 0 8px; font-size: 13px; text-transform: uppercase; color: var(--secondary-text-color); }
  .editor-field { margin-bottom: 12px; }
  .field-label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--secondary-text-color); }
  .field-hint { display: block; font-size: 11px; color: var(--secondary-text-color); margin-top: 2px; }
  select, input:not([type="checkbox"]), ha-entity-picker {
    width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 14px;
    border-radius: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
    background: var(--card-background-color, #fff); color: var(--primary-text-color, #000);
  }
  select:focus, input:focus { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: -1px; }
  h3 { margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: .05em; color: var(--secondary-text-color); }
  .hint { font-size: 12px; color: var(--secondary-text-color); }
  .field-info { background: rgba(33, 150, 243, 0.1); border-left: 3px solid var(--primary-color); padding: 8px 12px; border-radius: 2px; font-size: 12px; margin-top: 8px; }
  .field-warning { background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; padding: 8px 12px; border-radius: 2px; font-size: 12px; margin-top: 8px; }
`;

// Languages offered by the cards (besides "" = inherit / HA locale), shown by
// their endonym rather than the bare code.
const LANGUAGES = [
  ['en', 'English'],
  ['nl', 'Nederlands'],
  ['de', 'Deutsch'],
  ['pt', 'Português'],
  ['fr', 'Français'],
  ['es', 'Español'],
  ['it', 'Italiano'],
];
const LANGUAGE_NAME = Object.fromEntries(LANGUAGES);

export function fireEditorConfig(host, next) {
  if (typeof host._fireConfigChanged === 'function') return host._fireConfigChanged(next);
  if (typeof host._fire === 'function') return host._fire(next);
  host._config = next;
  host.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next }, bubbles: true, composed: true }));
  host.requestUpdate?.();
}

export function setEditorConfigValue(host, key, value, { removeEmpty = false } = {}) {
  const next = { ...(host?._config || {}) };
  if (removeEmpty && (value === '' || value === null || value === undefined)) delete next[key];
  else next[key] = value;
  fireEditorConfig(host, next);
}

export function soccerEntityIds(hass, { sensorTypes = [], includes = [] } = {}) {
  if (!hass?.states) return [];
  const types = new Set(sensorTypes);
  return Object.keys(hass.states).filter(entityId => {
    if (!entityId.startsWith('sensor.')) return false;
    const sensorType = hass.states[entityId]?.attributes?.sensor_type;
    return types.has(sensorType) || includes.some(part => entityId.includes(part));
  }).sort();
}

export function renderAppearanceControl(host, config, t) {
  const label = (k) => (typeof t === 'function' ? t(k) : k);
  const current = config?.appearance || 'ha';
  const onChange = (e) => {
    const v = e.target.value;
    const next = { ...config, appearance: v };
    fireEditorConfig(host, next);
  };
  return html`
    <div class="field-group">
      <label class="field-label">${label('skin.appearance')}</label>
      <select .value=${current} @change=${onChange}>
        <option value="ha" ?selected=${current === 'ha' || !current}>${label('skin.appearance_ha')}</option>
        <option value="dark" ?selected=${current === 'dark'}>${label('skin.appearance_dark')}</option>
        <option value="light" ?selected=${current === 'light'}>${label('skin.appearance_light')}</option>
      </select>
    </div>
  `;
}

const IGNORED_TEAM_NAMES = new Set([
  'classificacao', 'classificacao ligas', 'da configuracao', 'da sincronizacao',
  'estado da configuracao', 'estado da sincronizacao', 'melhores marcadores',
  'pontape de saida', 'proximo pontape de saida', 'quadro eliminatorio',
  'todos os jogos', 'diagnosticos', 'resultados', 'noticias', 'standings', 'scorers', 'news'
]);

/**
 * Auto-discovers all teams/countries configured in the soccerlive integration in Home Assistant.
 */
export function discoverSoccerTeams(hass) {
  if (!hass?.states) return [];

  const teamsMap = new Map();

  for (const [entityId, stateObj] of Object.entries(hass.states)) {
    if (!entityId.startsWith('sensor.soccer_live_') && !entityId.startsWith('sensor.soccer_')) continue;
    const attrs = stateObj?.attributes || {};
    const sensorType = attrs.sensor_type || '';

    if (['standings', 'top_scorers', 'bracket', 'news', 'match_day'].includes(sensorType)) continue;
    if (entityId.includes('standings') || entityId.includes('scorers') || entityId.includes('news') || entityId.includes('bracket')) continue;

    let extractedName = attrs.team_name || attrs.team || '';
    if (!extractedName && attrs.friendly_name) {
      const parts = attrs.friendly_name.split(' - ');
      if (parts.length > 1 && !parts[0].toLowerCase().includes('classifica')) extractedName = parts[0];
    }

    if (!extractedName) {
      const clean = entityId.replace('sensor.soccer_live_', '').replace('sensor.soccer_', '');
      const segments = clean.split('_');
      if (segments.length >= 3) {
        const potential = segments.slice(2).join(' ');
        if (!potential.includes('standings') && !potential.includes('scorers') && !potential.includes('news')) {
          extractedName = segments.slice(2).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        }
      }
    }

    if (extractedName && extractedName.length >= 2) {
      const formatted = extractedName.trim();
      const key = formatted.toLowerCase();
      if (!IGNORED_TEAM_NAMES.has(key) && !key.includes('classifica') && !key.includes('marcador') && !key.includes('configuracao')) {
        if (!teamsMap.has(key)) {
          teamsMap.set(key, {
            name: formatted,
            entity: entityId,
          });
        }
      }
    }
  }

  return Array.from(teamsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Auto-discovers and resolves model entities for F1-sensor style Hub configuration.
 */
export function discoverSoccerModels(hass, config = {}) {
  const models = {
    match_model: config.match_model || config.entity || '',
    standings_model: config.standings_model || config.standings_entity || '',
    scorers_model: config.scorers_model || '',
    last_match_model: config.last_match_model || '',
    news_model: config.news_model || '',
    bracket_model: config.bracket_model || '',
    club_model: config.club_model || '',
  };

  if (!hass?.states) return models;

  const baseEntity = config.match_model || config.entity || config.club_model || '';
  const baseState = baseEntity ? hass.states[baseEntity] : null;
  const teamName = config.team || baseState?.attributes?.team_name || baseState?.attributes?.team || '';
  const leagueName = baseState?.attributes?.league_id || baseState?.attributes?.league || '';

  // Clean key for matching (e.g. 'feyenoord', 'fcporto', 'portugal', or 'ned_1')
  const cleanKey = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const keyTeam = cleanKey(teamName);
  const keyLeague = cleanKey(leagueName);
  const baseKey = baseEntity ? cleanKey(baseEntity.replace('sensor.', '').replace('soccer_live_', '')) : '';

  for (const [entityId, stateObj] of Object.entries(hass.states)) {
    if (!entityId.startsWith('sensor.')) continue;
    const sensorType = stateObj?.attributes?.sensor_type || '';
    const cleanId = cleanKey(entityId);
    const attrTeam = cleanKey(stateObj?.attributes?.team_name || stateObj?.attributes?.team);

    const matchesContext = (
      (keyTeam && (cleanId.includes(keyTeam) || attrTeam.includes(keyTeam))) ||
      (baseKey && cleanId.includes(baseKey)) ||
      (keyLeague && cleanId.includes(keyLeague)) ||
      config.auto_discover_models === true
    );

    if (!matchesContext) continue;

    if (sensorType === 'team_match' || cleanId.includes('next')) {
      models.match_model = entityId;
    } else if (!models.match_model && ['team_match', 'team_matches_mixed', 'team_matches'].includes(sensorType)) {
      models.match_model = entityId;
    } else if (!models.standings_model && sensorType === 'standings') {
      models.standings_model = entityId;
    } else if (!models.last_match_model && (sensorType === 'last_match' || cleanId.includes('last_match') || cleanId.includes('last'))) {
      models.last_match_model = entityId;
    }
  }

  // Fallback: prioritize specific team_match / next sensors over mixed sensors
  if (!models.match_model || models.match_model.includes('all_mixed') || models.match_model.includes('todos')) {
    for (const [entityId, stateObj] of Object.entries(hass.states)) {
      if (!entityId.startsWith('sensor.')) continue;
      const sensorType = stateObj?.attributes?.sensor_type || '';
      const cleanId = entityId.toLowerCase();
      if (sensorType === 'team_match' || cleanId.includes('next')) {
        models.match_model = entityId;
        break;
      }
    }
    if (!models.match_model) {
      for (const [entityId, stateObj] of Object.entries(hass.states)) {
        if (!entityId.startsWith('sensor.')) continue;
        const sensorType = stateObj?.attributes?.sensor_type || '';
        if (['team_match', 'team_matches_mixed', 'team_matches'].includes(sensorType)) {
          models.match_model = entityId;
          break;
        }
      }
    }
  }

  if (!models.standings_model) {
    for (const [entityId, stateObj] of Object.entries(hass.states)) {
      if (!entityId.startsWith('sensor.')) continue;
      if (stateObj?.attributes?.sensor_type === 'standings') {
        models.standings_model = entityId;
        break;
      }
    }
  }

  return models;
}

/**
 * Shared language selector. The empty option inherits the language (the sensor's
 * shared card_defaults.language if set, else the HA locale) and shows that
 * explicitly, e.g. "nl · shared", consistently across every card editor.
 */
export function renderLanguageControl(host, config, t) {
  const label = (k) => (typeof t === 'function' ? t(k) : k);
  const entityId = config?.entity || (config?.entities && config.entities[0]);
  const sharedLang = entityId && host?.hass?.states?.[entityId]?.attributes?.card_defaults?.language;
  const current = config?.language || '';
  const autoLabel = sharedLang
    ? `${LANGUAGE_NAME[sharedLang] || sharedLang} · ${label('skin.shared')}${sharedVia(host, config, label)}`
    : label('lang.auto');
  const onChange = (e) => {
    const v = e.target.value;
    const next = { ...config };
    if (v) next.language = v; else delete next.language;  // clear the key, don't store ''
    fireEditorConfig(host, next);
  };
  return html`
    <label class="field-label">${label('editor.language')}</label>
    <select @change=${onChange}>
      <option value="" ?selected=${!current}>${autoLabel}</option>
      ${LANGUAGES.map(([code, name]) => html`<option value="${code}" ?selected=${current === code}>${name}</option>`)}
    </select>
  `;
}

/** For a multi-entity card, a " (via <sensor>)" suffix naming the sensor whose
 * shared defaults are used (the first one), so it's clear where they come from.
 * Empty for single-entity cards, where it's obvious. */
export function sharedVia(host, config, label) {
  const entities = config?.entities;
  if (!Array.isArray(entities) || entities.length <= 1) return '';
  const id = entities[0];
  if (!id) return '';
  const name = host?.hass?.states?.[id]?.attributes?.friendly_name || id;
  const via = typeof label === 'function' ? label('skin.via') : 'via';
  return ` (${via} ${name})`;
}

export const renderFieldGroup = (label, hint, content) => html`
  <div class="editor-field">
    <label class="field-label">${label}</label>
    ${content}
    ${hint ? html`<span class="field-hint">${hint}</span>` : ''}
  </div>
`;

export const renderEntitySelector = (label, hint, currentValue, callback, filterFn = null) => html`
  <div class="editor-field">
    <label class="field-label">${label}</label>
    <select @change=${(e) => callback(e.target.value)}>
      ${!currentValue ? html`<option value="">— ${label} —</option>` : ''}
      <option value="${currentValue}" selected>${currentValue || label}</option>
    </select>
    ${hint ? html`<span class="field-hint">${hint}</span>` : ''}
  </div>
`;

export const renderSelector = (label, hint, options, currentValue, callback, infoText = null) => html`
  <div class="editor-field">
    <label class="field-label">${label}</label>
    <select @change=${(e) => callback(e.target.value)}>
      ${options.map(opt => html`<option value="${opt}" ?selected=${opt === currentValue}>${opt}</option>`)}
    </select>
    ${hint ? html`<span class="field-hint">${hint}</span>` : ''}
    ${infoText ? html`<div class="field-info">ℹ️ ${infoText}</div>` : ''}
  </div>
`;

export const renderToggle = (label, hint, checked, callback, warningText = null) => html`
  <div class="editor-field">
    <label style="display: flex; align-items: center; gap: 8px;">
      <input type="checkbox" .checked=${checked} @change=${(e) => callback(e.target.checked)} />
      <span class="field-label" style="margin: 0;">${label}</span>
    </label>
    ${hint ? html`<span class="field-hint">${hint}</span>` : ''}
    ${warningText ? html`<div class="field-warning">⚠️ ${warningText}</div>` : ''}
  </div>
`;

export const renderNumberInput = (label, hint, min, max, value, callback, infoText = null) => html`
  <div class="editor-field">
    <label class="field-label">${label}</label>
    <input type="number" min="${min}" max="${max}" .value=${value} @change=${(e) => callback(parseInt(e.target.value, 10))} />
    ${hint ? html`<span class="field-hint">${hint}</span>` : ''}
    ${infoText ? html`<div class="field-info">ℹ️ ${infoText}</div>` : ''}
  </div>
`;

export const renderSection = (title, ...fields) => html`
  <div class="editor-section">
    <h3>${title}</h3>
    ${fields}
  </div>
`;
