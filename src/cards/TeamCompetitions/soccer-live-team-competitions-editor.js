import { LitElement, html, css } from 'lit';
import { renderSkinControls } from '../skin-editor.js';
import { t, resolveLang } from '../../i18n.js';
import { editorStyles, renderLanguageControl, setEditorConfigValue, soccerEntityIds } from '../editor-helper.js';


class SoccerLiveTeamCompetitionsEditor extends LitElement {
  static get properties() { return { _config: { type: Object }, hass: { type: Object }, entities: { type: Array } }; }
  constructor() { super(); this.entities = []; }

  static get styles() {
    return [editorStyles, css`.hint{font-size:11px}`];
  }

  setConfig(config) { this._config = { ...config }; }
  _t(key) { return t(key, resolveLang(this.hass, this._config)); }

  updated(p) { if (p.has('hass')) this._fetchEntities(); }

  _fetchEntities() {
    if (!this.hass) return;
    this.entities = soccerEntityIds(this.hass, {
      sensorTypes: ['team_matches_mixed'],
      includes: ['all_mixed', 'todas_as_competicoes', 'todas_competicoes', 'competicoes', 'competições'],
      excludes: ['standings', 'classificacao', 'classificação', 'melhores_marcadores', 'scorers', 'top_scorers', 'bracket', 'noticias', 'news'],
    });
  }

  _entityChanged(ev) { setEditorConfigValue(this, 'entity', ev.target.value); }
  _selectChanged(ev) { setEditorConfigValue(this, ev.target.dataset.configValue, ev.target.value, { removeEmpty: true }); }
  _numberChanged(ev) { const value = parseInt(ev.target.value, 10); if (!isNaN(value)) setEditorConfigValue(this, ev.target.dataset.configValue, value); }
  _textChanged(ev) { setEditorConfigValue(this, ev.target.dataset.configValue, ev.target.value, { removeEmpty: true }); }
  _switchChanged(ev) { setEditorConfigValue(this, ev.target.dataset.configValue, ev.target.checked); }

  render() {
    if (!this._config || !this.hass) return html``;
    const current = this._config.entity || '';
    const inList = current && this.entities.includes(current);

    return html`
      <div class="card-config">
        <h3>${this._t("editor.sensor")}</h3>
        <p class="hint">${this._t('editor.hint_team_competitions_sensor')}</p>
        <div>
          <label class="field-label">${this._t('editor.entity')}</label>
          <select @change=${this._entityChanged}>
            ${!inList ? html`<option value="${current}" selected>${current || this._t('editor.select')}</option>` : ''}
            ${this.entities.map(e => html`<option value="${e}" ?selected=${e === current}>${e}</option>`)}
          </select>
        </div>

        <h3>${this._t("editor.settings")}</h3>
        <div>
          <label class="field-label">${this._t('editor.team_name')}</label>
          <input type="text" .value=${this._config.team_name || ''} data-config-value="team_name" @input=${this._textChanged} placeholder="${this._t('editor.my_team_hint')}">
        </div>
        <div>
          <label class="field-label">${this._t('editor.default_competition')}</label>
          <input type="text" .value=${this._config.default_comp || ''} data-config-value="default_comp" @input=${this._textChanged} placeholder="${this._t('editor.default_competition_hint')}">
        </div>
        <div>
          <label class="field-label">${this._t('editor.max_matches') || 'Número máximo de jogos'}</label>
          <input type="number" min="1" max="10" .value=${this._config.max_matches || 4} data-config-value="max_matches" @change=${this._numberChanged}>
        </div>
        <div class="option">
          <label>${this._t('editor.show_last_match')}</label>
          <ha-switch .checked=${this._config.show_last_match !== false} data-config-value="show_last_match" @change=${this._switchChanged}></ha-switch>
        </div>

        ${renderSkinControls(this, this._config, (k) => (this._t ? this._t(k) : k))}
      </div>
    `;
  }
}

if (!customElements.get("soccer-live-team-competitions-editor")) {
  customElements.define("soccer-live-team-competitions-editor", SoccerLiveTeamCompetitionsEditor);
}
