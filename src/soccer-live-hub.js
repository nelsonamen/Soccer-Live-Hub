import { LitElement, html, css } from 'lit';
import { t, resolveLang } from './i18n.js';
import { blendHassSources } from "./cards/shared-source-blend.js";
import { discoverSoccerModels, discoverSoccerTeams, renderAppearanceControl } from './cards/editor-helper.js';
import { applySkin } from './skins.js';

console.info(
  '%c SOCCER-LIVE-HUB %c Loaded successfully ',
  'background: #0284c7; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
  'color: #0284c7; font-weight: bold;'
);

// Core Card elements
import './cards/Team/soccer-live-team.js';
import './cards/Standings/soccer-live-standings.js';
import './cards/LastMatch/soccer-live-last-match.js';

// ─── Card type registry (Core 3 Modules) ──────────────────────────────────────

const CARD_MODULES = {
  team: { editor: () => import('./cards/Team/soccer-live-team-editor.js') },
  standings: { editor: () => import('./cards/Standings/soccer-live-standings-editor.js') },
  'last-match': { editor: () => import('./cards/LastMatch/soccer-live-last-match-editor.js') },
};

const MODULE_PROMISES = new Map();
function loadCardModule(type, kind) {
  const loader = CARD_MODULES[type]?.[kind];
  if (!loader) return Promise.resolve();
  const key = `${type}:${kind}`;
  if (!MODULE_PROMISES.has(key)) MODULE_PROMISES.set(key, loader());
  return MODULE_PROMISES.get(key);
}

const CARD_REGISTRY = [
  { value: 'team',       element: 'soccer-live-team',       label: 'Próximo Jogo', description: 'Placar ao vivo, relógio, alinhamento e tempo' },
  { value: 'standings',  element: 'soccer-live-standings',  label: 'Classificação', description: 'Tabela classificativa da liga' },
  { value: 'last-match', element: 'soccer-live-last-match', label: 'Último Jogo',  description: 'Resultado do último jogo terminado' },
];

const TYPE_TO_ELEMENT = Object.fromEntries(CARD_REGISTRY.map(c => [c.value, c.element]));
const LEGACY_ELEMENTS = new Set(CARD_REGISTRY.map(c => c.element));

function resolveElement(cardType) {
  return TYPE_TO_ELEMENT[cardType] || (LEGACY_ELEMENTS.has(cardType) ? cardType : 'soccer-live-team');
}

const WRAPPER_TYPE = 'custom:soccer-live-hub';

// ─── Modular Visual Editor ─────────────────────────────────────────────────────

class SoccerLiveCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _selectedModuleIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this._config = {};
    this._selectedModuleIndex = 0;
  }

  setConfig(config) {
    this._config = { ...(config || {}) };
    if (!Array.isArray(this._config.modules) || this._config.modules.length === 0) {
      const models = discoverSoccerModels(this.hass, this._config) || {};
      const defaults = [];
      if (models.match_model) defaults.push({ id: 'mod_match', type: 'team', title: 'Próximo Jogo', entity: models.match_model });
      if (models.standings_model) defaults.push({ id: 'mod_standings', type: 'standings', title: 'Classificação', entity: models.standings_model });
      if (models.last_match_model) defaults.push({ id: 'mod_last', type: 'last-match', title: 'Último Jogo', entity: models.last_match_model });

      this._config.modules = defaults;
    }
    this.requestUpdate();
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  _dispatch(config) {
    const nextConfig = { ...config, type: WRAPPER_TYPE };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: nextConfig },
      bubbles: true,
      composed: true,
    }));
  }

  _moveModule(index, direction) {
    const modules = [...(this._config.modules || [])];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= modules.length) return;
    const temp = modules[index];
    modules[index] = modules[targetIdx];
    modules[targetIdx] = temp;
    this._selectedModuleIndex = targetIdx;
    this._dispatch({ ...this._config, modules });
  }

  _addModule(type) {
    if (!type) return;
    const item = CARD_REGISTRY.find(c => c.value === type);
    const title = item ? item.label : type;
    const models = discoverSoccerModels(this.hass, this._config) || {};

    let defaultEntity = '';
    if (type === 'team') defaultEntity = models.match_model;
    else if (type === 'standings') defaultEntity = models.standings_model;
    else if (type === 'last-match') defaultEntity = models.last_match_model;

    const newMod = {
      id: `mod_${Date.now()}`,
      type,
      title,
      entity: defaultEntity,
    };
    const modules = [...(this._config.modules || []), newMod];
    this._selectedModuleIndex = modules.length - 1;
    this._dispatch({ ...this._config, modules });
  }

  _duplicateModule(index) {
    const modules = [...(this._config.modules || [])];
    const source = modules[index];
    if (!source) return;
    const cloned = { ...source, id: `mod_${Date.now()}`, title: `${source.title} (Cópia)` };
    modules.splice(index + 1, 0, cloned);
    this._selectedModuleIndex = index + 1;
    this._dispatch({ ...this._config, modules });
  }

  _removeModule(index) {
    const modules = [...(this._config.modules || [])];
    modules.splice(index, 1);
    this._selectedModuleIndex = Math.max(0, index - 1);
    this._dispatch({ ...this._config, modules });
  }

  _updateSelectedModule(key, value) {
    const modules = (this._config.modules || []).map((mod, idx) => {
      if (idx !== this._selectedModuleIndex) return mod;
      const nextMod = { ...mod };
      if (value === '' || value === null || value === undefined) {
        delete nextMod[key];
      } else {
        nextMod[key] = value;
      }
      return nextMod;
    });
    this._dispatch({ ...this._config, modules });
  }

  _moduleTeamChanged(teamName) {
    const modules = (this._config.modules || []).map((mod, idx) => {
      if (idx !== this._selectedModuleIndex) return mod;
      const nextMod = { ...mod, team: teamName };
      if (!teamName) delete nextMod.team;
      const models = discoverSoccerModels(this.hass, { ...this._config, team: teamName || this._config.team });
      if (mod.type === 'team') nextMod.entity = models.match_model || mod.entity;
      else if (mod.type === 'standings') nextMod.entity = models.standings_model || mod.entity;
      else if (mod.type === 'last-match') nextMod.entity = models.last_match_model || mod.entity;
      return nextMod;
    });
    this._dispatch({ ...this._config, modules });
  }

  render() {
    const modules = this._config.modules || [];
    const selectedIdx = Math.min(this._selectedModuleIndex, Math.max(0, modules.length - 1));
    const selectedMod = modules[selectedIdx] || null;
    const availableTeams = discoverSoccerTeams(this.hass);

    return html`
      <div class="editor-box card-box">
        <div class="box-header">
          <span class="badge badge-card">CARD</span>
          <div class="box-title-group">
            <span class="box-title">${this._t('editor.whole_card')}</span>
            <span class="box-subtitle">${this._t('editor.whole_card_desc')}</span>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">${this._t('editor.card_title')}</label>
          <input
            type="text"
            .value=${this._config.title || ''}
            placeholder="ex. Futebol"
            @change=${e => this._dispatch({ ...this._config, title: e.target.value })}
          >
        </div>

        <div class="field-group">
          <label class="field-label">Subtítulo do Cartão</label>
          <input
            type="text"
            .value=${this._config.subtitle || ''}
            placeholder="ex. A tua vista de futebol"
            @change=${e => this._dispatch({ ...this._config, subtitle: e.target.value })}
          >
        </div>

        <div class="field-group">
          <label class="field-label">${this._t('editor.layout_mode')}</label>
          <select
            .value=${this._config.layout || 'tabs'}
            @change=${e => this._dispatch({ ...this._config, layout: e.target.value })}
          >
            <option value="tabs" ?selected=${(this._config.layout || 'tabs') === 'tabs'}>${this._t('editor.layout_tabs')}</option>
            <option value="stack" ?selected=${this._config.layout === 'stack'}>${this._t('editor.layout_stack')}</option>
          </select>
        </div>

        <div class="field-group" style="margin-top: 16px; border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1)); padding-top: 12px;">
          ${renderAppearanceControl(this, this._config, k => this._t(k))}
        </div>
      </div>

      <div class="editor-box module-box">
        <div class="box-header">
          <span class="badge badge-module">MODULE</span>
          <div class="box-title-group">
            <span class="box-title">${this._t('editor.selected_content')}</span>
            <span class="box-subtitle">${this._t('editor.selected_content_desc')}</span>
          </div>
        </div>

        <div class="modules-list">
          ${modules.map((mod, index) => {
            const isSelected = index === selectedIdx;
            const numStr = String(index + 1).padStart(2, '0');
            return html`
              <div
                class="module-item ${isSelected ? 'selected' : ''}"
                @click=${() => { this._selectedModuleIndex = index; this.requestUpdate(); }}
              >
                <span class="module-num">${numStr}</span>
                <span class="module-title">${mod.title || mod.type}</span>
                <div class="module-arrows" @click=${e => e.stopPropagation()}>
                  <button
                    class="arrow-btn"
                    ?disabled=${index === 0}
                    @click=${() => this._moveModule(index, -1)}
                  >↑</button>
                  <button
                    class="arrow-btn"
                    ?disabled=${index === modules.length - 1}
                    @click=${() => this._moveModule(index, 1)}
                  >↓</button>
                </div>
              </div>
            `;
          })}
        </div>

        <div class="add-module-wrap">
          <label class="field-label">${this._t('editor.add_module')}</label>
          <select @change=${e => { this._addModule(e.target.value); e.target.value = ''; }}>
            <option value="">${this._t('editor.choose_content')}</option>
            ${CARD_REGISTRY.map(c => html`<option value=${c.value}>${c.label}</option>`)}
          </select>
        </div>
      </div>

      ${selectedMod ? html`
        <div class="editor-box editing-box">
          <div class="box-header">
            <span class="badge badge-editing">${selectedIdx + 1}</span>
            <div class="box-title-group">
              <span class="box-title">${this._t('editor.editing_module', { current: selectedIdx + 1, total: modules.length })}</span>
              <span class="box-subtitle">${this._t('editor.editing_module_desc')}</span>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Equipa do Módulo</label>
            <select
              .value=${selectedMod.team || this._config.team || ''}
              @change=${e => this._moduleTeamChanged(e.target.value)}
            >
              <option value="">— Herdar equipa do cartão (${this._config.team || 'Geral'}) —</option>
              ${availableTeams.map(t => html`
                <option value=${t.name} ?selected=${(selectedMod.team || this._config.team) === t.name}>${t.name}</option>
              `)}
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">${this._t('editor.module_title')}</label>
            <input
              type="text"
              .value=${selectedMod.title || ''}
              @change=${e => this._updateSelectedModule('title', e.target.value)}
            >
          </div>

          <div class="field-group">
            <label class="field-label">${this._t('editor.entity')}</label>
            <ha-entity-picker
              .key=${selectedMod.entity || ''}
              .hass=${this.hass}
              .value=${selectedMod.entity || ''}
              .includeDomains=${['sensor']}
              allow-custom-entity
              @value-changed=${e => this._updateSelectedModule('entity', e.detail?.value || '')}
            ></ha-entity-picker>
          </div>

          <div class="module-actions">
            <button class="btn btn-secondary" @click=${() => this._duplicateModule(selectedIdx)}>${this._t('editor.duplicate_module')}</button>
            <button class="btn btn-danger" @click=${() => this._removeModule(selectedIdx)}>${this._t('editor.remove_module')}</button>
          </div>
        </div>
      ` : ''}
    `;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .editor-box {
        border-radius: 12px;
        padding: 16px;
        background: var(--card-background-color, #ffffff);
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      }
      .card-box {
        border: 2px solid #0284c7;
        background: rgba(2, 132, 199, 0.03);
      }
      .module-box, .editing-box {
        border: 2px solid #0284c7;
        background: rgba(2, 132, 199, 0.03);
      }
      .box-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 14px;
      }
      .badge {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.05em;
        padding: 3px 8px;
        border-radius: 6px;
        text-transform: uppercase;
        display: inline-block;
      }
      .badge-card {
        border: 1.5px solid #0284c7;
        color: #0284c7;
      }
      .badge-module {
        border: 1.5px solid #0284c7;
        color: #0284c7;
      }
      .badge-editing {
        border: 1.5px solid #0284c7;
        color: #0284c7;
        padding: 2px 8px;
      }
      .box-title-group {
        display: flex;
        flex-direction: column;
      }
      .box-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .box-subtitle {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .field-group {
        margin-bottom: 12px;
      }
      .field-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--secondary-text-color);
      }
      input[type="text"], select {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
        background: var(--card-background-color, #ffffff);
        color: var(--primary-text-color);
      }
      ha-entity-picker {
        display: block;
        width: 100%;
      }
      .modules-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 14px;
      }
      .module-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 10px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #ffffff);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .module-item.selected {
        border: 2px solid #0284c7;
        box-shadow: 0 2px 8px rgba(2, 132, 199, 0.15);
      }
      .module-num {
        font-size: 12px;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .module-title {
        flex: 1;
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .module-arrows {
        display: flex;
        gap: 4px;
      }
      .arrow-btn {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
        background: var(--card-background-color, #f8fafc);
        color: var(--primary-text-color);
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      .add-module-wrap {
        margin-top: 10px;
      }
      .module-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }
      .btn {
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .btn-secondary {
        background: var(--card-background-color, #f1f5f9);
        color: var(--primary-text-color);
        border-color: var(--divider-color, #cbd5e1);
      }
      .btn-danger {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
        border-color: rgba(220, 38, 38, 0.3);
      }
    `;
  }
}

if (!customElements.get('soccer-live-hub-editor')) {
  customElements.define('soccer-live-hub-editor', SoccerLiveCardEditor);
}

// ─── Wrapper card (Modular Main Card) ─────────────────────────────────────────

class SoccerLiveCard extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = {};
    this._activeModuleId = null;
    this._tabBar = null;
    this._contentContainer = null;
    this._childElements = new Map();
  }

  set hass(hass) {
    this._hass = hass;
    for (const [id, child] of this._childElements.entries()) {
      const mod = this._getModules().find(m => m.id === id);
      if (mod && child) {
        const resolvedEntity = this._resolveModuleEntity(mod);
        const modConfig = {
          ...mod,
          skin: this._config.skin,
          appearance: this._config.appearance || 'ha',
          palette: this._config.palette || 'purple',
          language: this._config.language,
          entity: resolvedEntity,
          card_type: mod.type,
        };
        child.hass = blendHassSources(hass, modConfig);
        child._isLoading = false;
      }
    }
  }

  _getModules() {
    if (Array.isArray(this._config?.modules) && this._config.modules.length > 0) {
      return this._config.modules.filter(Boolean);
    }
    const models = discoverSoccerModels(this._hass, this._config) || {};
    const defaults = [];
    if (models.match_model) defaults.push({ id: 'mod_match', type: 'team', title: 'Próximo Jogo', entity: models.match_model });
    if (models.standings_model) defaults.push({ id: 'mod_standings', type: 'standings', title: 'Classificação', entity: models.standings_model });
    if (models.last_match_model) defaults.push({ id: 'mod_last', type: 'last-match', title: 'Último Jogo', entity: models.last_match_model });

    if (!defaults.length) {
      defaults.push({ id: 'mod_default', type: 'team', title: 'Próximo Jogo', entity: this._config?.entity || '' });
    }
    return defaults;
  }

  _getGroupedModules() {
    const modules = this._getModules();
    const groups = new Map();
    if (!Array.isArray(modules)) {
      groups.set('Geral', [{ id: 'mod_default', type: 'team', title: 'Próximo Jogo', entity: '' }]);
      return groups;
    }
    for (const mod of modules) {
      if (!mod) continue;
      const teamName = mod.team || this._config?.team || 'Geral';
      if (!groups.has(teamName)) groups.set(teamName, []);
      const list = groups.get(teamName);
      if (list) list.push(mod);
    }
    if (groups.size === 0) {
      groups.set('Geral', [{ id: 'mod_default', type: 'team', title: 'Próximo Jogo', entity: '' }]);
    }
    return groups;
  }

  _resolveModuleEntity(mod) {
    if (mod.type === 'team') {
      const teamName = mod.team || this._config?.team || '';
      const cleanTeam = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (const [id, st] of Object.entries(this._hass?.states || {})) {
        if (!id.startsWith('sensor.')) continue;
        const stType = st?.attributes?.sensor_type;
        const cleanId = id.toLowerCase();
        const attrTeam = (st?.attributes?.team_name || st?.attributes?.team || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (['team_matches_mixed', 'team_matches'].includes(stType) || cleanId.includes('all_mixed') || cleanId.includes('todos')) {
          if (!cleanTeam || cleanId.includes(cleanTeam) || attrTeam.includes(cleanTeam)) {
            return id;
          }
        }
      }
      for (const [id, st] of Object.entries(this._hass?.states || {})) {
        if (!id.startsWith('sensor.')) continue;
        const stType = st?.attributes?.sensor_type;
        const cleanId = id.toLowerCase();
        if (['team_matches_mixed', 'team_matches'].includes(stType) || cleanId.includes('all_mixed') || cleanId.includes('todos')) {
          return id;
        }
      }
      for (const [id, st] of Object.entries(this._hass?.states || {})) {
        if (!id.startsWith('sensor.')) continue;
        if (st?.attributes?.sensor_type === 'team_match' || id.toLowerCase().includes('next')) {
          return id;
        }
      }
    }

    if (mod.type === 'last-match') {
      const teamName = mod.team || this._config?.team || '';
      const cleanTeam = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (const [id, st] of Object.entries(this._hass?.states || {})) {
        if (!id.startsWith('sensor.')) continue;
        const stType = st?.attributes?.sensor_type;
        const cleanId = id.toLowerCase();
        const attrTeam = (st?.attributes?.team_name || st?.attributes?.team || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (stType === 'last_match' || cleanId.includes('last')) {
          if (!cleanTeam || cleanId.includes(cleanTeam) || attrTeam.includes(cleanTeam)) {
            return id;
          }
        }
      }
      for (const [id, st] of Object.entries(this._hass?.states || {})) {
        if (!id.startsWith('sensor.')) continue;
        if (st?.attributes?.sensor_type === 'last_match' || id.toLowerCase().includes('last')) {
          return id;
        }
      }
    }

    if (mod.entity && this._hass?.states?.[mod.entity]) {
      const stateObj = this._hass.states[mod.entity];
      const sensorType = stateObj?.attributes?.sensor_type;
      if (sensorType) {
        if (mod.type === 'standings' && sensorType === 'standings') return mod.entity;
      } else {
        return mod.entity;
      }
    }
    const models = discoverSoccerModels(this._hass, this._config) || {};
    if (mod.type === 'team') return models.match_model || mod.entity;
    if (mod.type === 'standings') return models.standings_model || mod.entity;
    if (mod.type === 'last-match') return models.last_match_model || mod.entity;
    return mod.entity || models.match_model;
  }

  setConfig(config) {
    this._config = config || {};
    applySkin(this, this._config);
    this._renderCard();
  }

  _applyWrapperTheme(wrapper) {
    if (!wrapper) return;
    const appearance = this._config.appearance || 'ha';
    if (appearance === 'dark') {
      wrapper.style.background = '#0f172a';
      wrapper.style.color = '#ffffff';
      wrapper.style.setProperty('--primary-text-color', '#ffffff');
      wrapper.style.setProperty('--card-background-color', '#1e293b');
      wrapper.style.setProperty('--secondary-text-color', '#94a3b8');
      wrapper.style.setProperty('--divider-color', 'rgba(255,255,255,0.10)');
      wrapper.style.borderTop = '4px solid #38bdf8';
    } else if (appearance === 'light') {
      wrapper.style.background = '#ffffff';
      wrapper.style.color = '#0f172a';
      wrapper.style.setProperty('--primary-text-color', '#0f172a');
      wrapper.style.setProperty('--card-background-color', '#f8fafc');
      wrapper.style.setProperty('--secondary-text-color', '#64748b');
      wrapper.style.setProperty('--divider-color', '#e2e8f0');
      wrapper.style.borderTop = '4px solid #0284c7';
    } else { // 'ha'
      wrapper.style.background = 'var(--ha-card-background, var(--card-background-color, #ffffff))';
      wrapper.style.color = 'var(--primary-text-color, #0f172a)';
      wrapper.style.borderTop = '4px solid var(--primary-color, #03a9f4)';
    }
  }

  _renderCard() {
    const modules = this._getModules();
    const layout = this._config.layout || 'tabs';
    applySkin(this, this._config);

    if (!modules.length) {
      this.innerHTML = '';
      this.appendChild(this._placeholder());
      return;
    }

    if (layout === 'stack') {
      this.innerHTML = '';
      this._tabBar = null;
      const stackWrapper = document.createElement('div');
      stackWrapper.className = 'soccer-live-stack-wrapper';
      stackWrapper.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

      for (const mod of modules) {
        const modCard = this._createModuleElement(mod);
        if (modCard) stackWrapper.appendChild(modCard);
      }
      this.appendChild(stackWrapper);
      return;
    }

    if (!this._tabBar) {
      this.innerHTML = '';
      const wrapper = document.createElement('ha-card');
      wrapper.className = 'soccer-live-hub-wrapper';
      wrapper.style.cssText = 'border-radius: 20px; overflow: hidden; padding: 0; border-top: 4px solid #e50000;';
      this._applyWrapperTheme(wrapper);

      if (this._config.title) {
        const header = document.createElement('div');
        header.className = 'soccer-live-card-title';
        header.style.cssText = 'padding: 16px 18px 8px;';
        header.innerHTML = `
          <div style="font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--primary-text-color);">${this._config.title}</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; font-weight: 500;">${this._config.subtitle || 'Soccer Live Hub'}</div>
        `;
        wrapper.appendChild(header);
      }

      this._tabBar = document.createElement('div');
      this._tabBar.className = 'soccer-live-hub-tab-bar';
      this._tabBar.style.cssText = 'display:flex;flex-direction:column;border-bottom:1px solid var(--divider-color,rgba(0,0,0,0.08));';

      this._contentContainer = document.createElement('div');
      this._contentContainer.className = 'soccer-live-hub-content';

      wrapper.appendChild(this._tabBar);
      wrapper.appendChild(this._contentContainer);
      this.appendChild(wrapper);
    } else {
      const wrapper = this.querySelector('.soccer-live-hub-wrapper');
      if (wrapper) this._applyWrapperTheme(wrapper);
    }

    const groups = this._getGroupedModules();
    const teams = [...groups.keys()];
    if (!this._activeTeam || !groups.has(this._activeTeam)) {
      this._activeTeam = teams[0];
    }
    const teamModules = groups.get(this._activeTeam) || [];
    let activeMod = teamModules.find(m => m.id === this._activeModuleId);
    if (!activeMod) {
      activeMod = teamModules[0];
      this._activeModuleId = activeMod?.id;
    }

    this._updateTabBar(modules);

    this._contentContainer.innerHTML = '';
    const activeEl = activeMod ? this._createModuleElement(activeMod) : null;
    if (activeEl) this._contentContainer.appendChild(activeEl);
  }

  _updateTabBar(modules) {
    if (!this._tabBar) return;
    this._tabBar.innerHTML = '';

    const appearance = this._config.appearance || 'ha';
    const isDark = appearance === 'dark';
    const isLight = appearance === 'light';

    const bgInactive = isDark ? '#1e293b' : (isLight ? '#ffffff' : 'var(--card-background-color, #ffffff)');
    const textInactive = isDark ? '#f8fafc' : (isLight ? '#0f172a' : 'var(--primary-text-color, #000000)');
    const borderInactive = isDark ? 'rgba(255,255,255,0.15)' : (isLight ? 'rgba(0,0,0,0.15)' : 'var(--divider-color, rgba(0,0,0,0.15))');

    const bgActive = isDark ? '#ffffff' : (isLight ? '#0f172a' : 'var(--primary-text-color, #000000)');
    const textActive = isDark ? '#0f172a' : (isLight ? '#ffffff' : 'var(--card-background-color, #ffffff)');
    const borderActive = isDark ? '#ffffff' : (isLight ? '#0f172a' : 'var(--primary-text-color, #000000)');

    const groups = this._getGroupedModules();
    const teams = [...groups.keys()];

    if (!this._activeTeam || !groups.has(this._activeTeam)) {
      this._activeTeam = teams[0];
    }

    const teamModules = groups.get(this._activeTeam) || [];
    let activeMod = teamModules.find(m => m.id === this._activeModuleId);
    if (!activeMod) {
      activeMod = teamModules[0];
      this._activeModuleId = activeMod?.id;
    }

    // ─── TIER 1: Teams Selector (F1 Style Top Row) ───────────────────────────
    if (teams.length > 1) {
      const teamsRow = document.createElement('div');
      teamsRow.style.cssText = `display:flex;gap:10px;padding:12px 16px;background:${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};border-bottom:1px solid ${borderInactive};overflow-x:auto;scrollbar-width:none;align-items:center;`;
      for (const team of teams) {
        const isTeamActive = team === this._activeTeam;
        const btn = document.createElement('button');
        btn.style.cssText = `
          background: var(--card-background-color, #ffffff);
          color: var(--primary-text-color);
          border: ${isTeamActive ? '2px solid var(--primary-text-color, #111111)' : '1px solid var(--divider-color, rgba(0,0,0,0.15))'};
          padding: ${isTeamActive ? '7px 15px' : '8px 16px'};
          font-size: 13px;
          font-weight: ${isTeamActive ? '700' : '500'};
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 10px;
          box-shadow: ${isTeamActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'};
          transition: all 0.2s ease;
          white-space: nowrap;
        `;
        btn.textContent = team;
        btn.addEventListener('click', () => {
          this._activeTeam = team;
          const firstModOfTeam = groups.get(team)?.[0];
          this._activeModuleId = firstModOfTeam?.id;
          this._renderCard();
        });
        teamsRow.appendChild(btn);
      }
      this._tabBar.appendChild(teamsRow);
    }

    // ─── TIER 2: Modules Selector (Bottom Row for Active Team) ────────────────
    const modulesRow = document.createElement('div');
    modulesRow.style.cssText = `display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;background:${isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'};align-items:center;`;
    for (const mod of teamModules) {
      const isModActive = mod.id === this._activeModuleId;
      const btn = document.createElement('button');
      btn.style.cssText = `
        background: var(--card-background-color, #ffffff);
        color: var(--primary-text-color);
        border: ${isModActive ? '2px solid var(--primary-text-color, #111111)' : '1px solid var(--divider-color, rgba(0,0,0,0.15))'};
        border-radius: 10px;
        padding: ${isModActive ? '7px 13px' : '8px 14px'};
        font-size: 12px;
        font-weight: ${isModActive ? '700' : '500'};
        text-transform: uppercase;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        box-shadow: ${isModActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'};
        transition: all 0.2s ease;
      `;
      btn.textContent = mod.title || mod.type;
      btn.addEventListener('click', () => {
        this._activeModuleId = mod.id;
        this._renderCard();
      });
      modulesRow.appendChild(btn);
    }
    this._tabBar.appendChild(modulesRow);
  }

  _createModuleElement(mod) {
    const type = mod.type || 'team';
    const elementName = resolveElement(type);
    if (!elementName || !customElements.get(elementName)) {
      return this._errorCard(`Módulo desconhecido: ${type}`);
    }

    let el = this._childElements.get(mod.id);
    if (!el || el.tagName.toLowerCase() !== elementName) {
      el = document.createElement(elementName);
      this._childElements.set(mod.id, el);
    }

    const resolvedEntity = this._resolveModuleEntity(mod);

    const modConfig = {
      ...mod,
      skin: this._config.skin,
      appearance: this._config.appearance || 'ha',
      palette: this._config.palette || 'purple',
      language: this._config.language,
      entity: resolvedEntity,
      card_type: type,
    };

    try {
      el.setConfig(modConfig);
    } catch (e) {
      if (modConfig.entity) console.warn(`SoccerLiveCard: setConfig failed for module ${mod.id}:`, e);
    }
    if (this._hass) {
      el.hass = blendHassSources(this._hass, modConfig);
      el._isLoading = false;
    }

    setTimeout(() => {
      if (el.shadowRoot) {
        const styleId = 'soccer-live-hub-flatten';
        if (!el.shadowRoot.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.textContent = `
            ha-card {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              padding: 0 !important;
              margin: 0 !important;
            }
          `;
          el.shadowRoot.appendChild(style);
        }
      }
    }, 50);

    return el;
  }

  _placeholder() {
    const el = document.createElement('ha-card');
    el.style.cssText = 'padding:24px;text-align:center;color:#94a3b8;font-size:13px;';
    const lang = this._hass ? (this._hass.language || 'en').split('-')[0] : 'en';
    el.textContent = t('ui.open_editor_to_configure', lang);
    return el;
  }

  _errorCard(message) {
    const el = document.createElement('ha-card');
    el.style.cssText = 'padding:24px;text-align:center;color:#ef4444;font-size:13px;border:1px solid rgba(239,68,68,0.3);';
    el.textContent = message;
    return el;
  }

  getCardSize() { return 8; }

  static getConfigElement() {
    const el = document.createElement('soccer-live-hub-editor');
    if (el && typeof el.setConfig !== 'function') {
      el.setConfig = function(config) {
        this._config = config;
        if (typeof this.requestUpdate === 'function') this.requestUpdate();
      };
    }
    return el;
  }

  static getStubConfig() { return { title: 'Futebol', layout: 'tabs', modules: [] }; }
}

if (!customElements.get('soccer-live-hub')) {
  customElements.define('soccer-live-hub', SoccerLiveCard);
}
if (!customElements.get('soccer-live-card')) {
  customElements.define('soccer-live-card', SoccerLiveCard);
}

window.customCards = window.customCards || [];
for (const t of ['soccer-live-hub', 'custom:soccer-live-hub']) {
  if (!window.customCards.some(c => c.type === t)) {
    window.customCards.push({
      type: t,
      name: 'Soccer Live Hub',
      description: 'Modular football hub card with reorderable modules, tabs or stack layout.',
      preview: true,
      documentationURL: 'https://github.com/nelsonamen/Teste',
    });
  }
}
