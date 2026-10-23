import { LitElement, html, css } from 'lit';
import { editorStyles, renderLanguageControl } from '../editor-helper.js';
import { t, resolveLang } from '../../i18n.js';
import { renderSkinControls } from '../skin-editor.js';
import { nextRadioIndex } from '../../skin-config.js';

class SoccerLiveTeamCardEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      entities: { type: Array },
    };
  }

  constructor() {
    super();
    this.entities = [];
  }

  static get styles() {
    return [editorStyles, css`
      .tri {
        display: inline-flex; border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
        border-radius: 8px; overflow: hidden; flex-shrink: 0;
      }
      .tri button {
        border: 0; border-right: 1px solid var(--divider-color, rgba(127,127,127,0.3));
        padding: 6px 10px; font-size: 12px; cursor: pointer;
        background: transparent; color: var(--primary-text-color);
      }
      .tri button:last-child { border-right: 0; }
      .tri button.sel { background: var(--primary-color, #3b82f6); color: #fff; }
    `];
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    const cleaned = { ...config };
    if (cleaned.entity && (cleaned.entity.startsWith('sensor.sun_') || cleaned.entity.startsWith('sensor.time') || cleaned.entity.startsWith('sensor.date'))) {
      delete cleaned.entity;
    }
    this._config = cleaned;
  }

  get config() { return this._config; }

  updated(changedProperties) {
    if (changedProperties.has('hass')) this._fetchEntities();
  }

  _t(key) { return t(key, resolveLang(this.hass, this._config)); }

  _fireConfigChanged(newConfig) {
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  _entityChanged(ev) {
    if (!this._config) return;
    const value = ev.target.value;
    if (value === this._config.entity) return;
    this._fireConfigChanged({ ...this._config, entity: value });
  }

  _switchChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    if (!target.dataset || !target.dataset.configValue) return;
    const key = target.dataset.configValue;
    const value = target.checked;
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  _selectChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    if (!target.dataset || !target.dataset.configValue) return;
    const key = target.dataset.configValue;
    const value = target.value;
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  _triKeydown(ev) {
    const btns = [...ev.currentTarget.querySelectorAll('button')];
    const cur = btns.indexOf(ev.target);
    const idx = nextRadioIndex(cur, btns.length, ev.key);
    if (idx === cur) return;
    ev.preventDefault();
    btns[idx].focus();
    btns[idx].click();
  }

  _fetchEntities() {
    if (!this.hass) return;
    this.entities = Object.keys(this.hass.states)
      .filter((entityId) =>
        entityId.includes('soccerlive_next') || entityId.includes('soccer_live_next') ||
        entityId.includes('soccerlive_all_mixed') || entityId.includes('soccer_live_all_mixed') ||
        ['team_match', 'team_matches_mixed'].includes(this.hass.states[entityId]?.attributes?.sensor_type)
      )
      .sort();
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const currentEntity = this._config.entity || '';
    const entityInList = currentEntity && this.entities.includes(currentEntity);
    // Shared compact default from the sensor, for the compact tri-state's "inherit" hint.
    const sharedDefaults = this.hass?.states?.[currentEntity]?.attributes?.card_defaults || {};
    const sharedCompact = sharedDefaults.compact;
    const compactVal = this._config.compact;

    return html`
      <div class="card-config">
        <h3>${this._t('editor.sensor')}</h3>
        <div>
          <label class="field-label">${this._t('editor.entity')}</label>
          <select @change=${this._entityChanged}>
            ${!entityInList ? html`<option value="${currentEntity}" selected>${currentEntity || this._t('editor.select')}</option>` : ''}
            ${this.entities.map(e => html`
              <option value="${e}" ?selected=${e === currentEntity}>${e}</option>
            `)}
          </select>
        </div>

        <h3>${this._t('editor.section_match')}</h3>

        <div class="option">
          <label>${this._t('editor.show_previous_matches')}</label>
          <ha-switch .checked=${this._config.show_previous_matches === true}
            data-config-value="show_previous_matches" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t('editor.show_weather')}</label>
          <ha-switch .checked=${this._config.show_weather !== false}
            data-config-value="show_weather" @change=${this._switchChanged}></ha-switch>
        </div>
        <h3>${this._t('editor.section_display')}</h3>
        <div class="option">
          <label>${this._t('editor.hide_broadcasts')}</label>
          <ha-switch .checked=${this._config.hide_broadcasts === true} data-config-value="hide_broadcasts" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t('editor.hide_meta')}</label>
          <ha-switch .checked=${this._config.hide_meta === true} data-config-value="hide_meta" @change=${this._switchChanged}></ha-switch>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('soccer-live-team-editor')) {
  customElements.define('soccer-live-team-editor', SoccerLiveTeamCardEditor);
}
