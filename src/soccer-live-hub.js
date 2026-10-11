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

window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === 'soccer-live-hub')) {
  window.customCards.push({
    type: 'soccer-live-hub',
    name: 'Soccer Live Hub',
    description: 'Cartão modular de Futebol com placares ao vivo, classificação, último jogo e mais.',
    preview: true,
    documentationURL: 'https://github.com/nelsonamen/Teste',
  });
}

// Core and Imported Card elements
import './cards/Team/soccer-live-team.js';
import './cards/Standings/soccer-live-standings.js';
import './cards/LastMatch/soccer-live-last-match.js';
import './cards/Tutte/soccer-live-matches.js';
import './cards/Countdown/soccer-live-countdown.js';
import './cards/News/soccer-live-news.js';
import './cards/Bracket/soccer-live-bracket.js';
import './cards/MiniStandings/soccer-live-mini-standings.js';
import './cards/Scorers/soccer-live-scorers.js';
import './cards/MultiTeam/soccer-live-multi-team.js';
import './cards/TeamCompetitions/soccer-live-team-competitions.js';
import './cards/MatchCenter/soccer-live-match-center.js';
import './cards/TeamForm/soccer-live-team-form.js';
import './cards/Club/soccer-live-club.js';
import './cards/Diagnostics/soccer-live-diagnostics.js';
import './cards/Ticker/soccer-live-ticker.js';
import './cards/Lineup/soccer-live-lineup.js';
import './cards/Timeline/soccer-live-timeline.js';
import './cards/Schedule/soccer-live-schedule.js';
import './cards/Matchday/soccer-live-matchday.js';
import './cards/Archive/soccer-live-archive.js';

// ─── Card type registry (All Modules) ─────────────────────────────────────────

const CARD_MODULES = {
  team: { editor: () => import('./cards/Team/soccer-live-team-editor.js') },
  standings: { editor: () => import('./cards/Standings/soccer-live-standings-editor.js') },
  'last-match': { editor: () => import('./cards/LastMatch/soccer-live-last-match-editor.js') },
  matches: { editor: () => import('./cards/Tutte/soccer-live-matches-editor.js') },
  countdown: { editor: () => import('./cards/Countdown/soccer-live-countdown-editor.js') },
  news: { editor: () => import('./cards/News/soccer-live-news-editor.js') },
  bracket: { editor: () => import('./cards/Bracket/soccer-live-bracket-editor.js') },
  'mini-standings': { editor: () => import('./cards/MiniStandings/soccer-live-mini-standings-editor.js') },
  scorers: { editor: () => import('./cards/Scorers/soccer-live-scorers-editor.js') },
  'multi-team': { editor: () => import('./cards/MultiTeam/soccer-live-multi-team-editor.js') },
  'team-competitions': { editor: () => import('./cards/TeamCompetitions/soccer-live-team-competitions-editor.js') },
  'match-center': { editor: () => import('./cards/MatchCenter/soccer-live-match-center-editor.js') },
  hub: { editor: () => import('./cards/MatchCenter/soccer-live-match-center-editor.js') },
  race: { editor: () => import('./cards/Standings/soccer-live-standings-editor.js') },
  'team-form': { editor: () => import('./cards/TeamForm/soccer-live-team-form-editor.js') },
  club: { editor: () => import('./cards/Club/soccer-live-club-editor.js') },
  diagnostics: { editor: () => import('./cards/Diagnostics/soccer-live-diagnostics-editor.js') },
  ticker: { editor: () => import('./cards/Ticker/soccer-live-ticker-editor.js') },
  lineup: { editor: () => import('./cards/Lineup/soccer-live-lineup-editor.js') },
  timeline: { editor: () => import('./cards/Timeline/soccer-live-timeline-editor.js') },
  minimal: { editor: () => import('./cards/Schedule/soccer-live-schedule-editor.js') },
  schedule: { editor: () => import('./cards/Schedule/soccer-live-schedule-editor.js') },
  matchday: { editor: () => import('./cards/Insights/soccer-live-insights-editor.js') },
  archive: { editor: () => import('./cards/Insights/soccer-live-insights-editor.js') },
};

const MODULE_PROMISES = new Map();
function loadCardModule(type, kind) {
  const norm = normalizeCardType(type);
  const loader = CARD_MODULES[norm]?.[kind];
  if (!loader) return Promise.resolve();
  const key = `${norm}:${kind}`;
  if (!MODULE_PROMISES.has(key)) MODULE_PROMISES.set(key, loader());
  return MODULE_PROMISES.get(key);
}

const CARD_REGISTRY = [
  { value: 'team',              element: 'soccer-live-team',              editor: 'soccer-live-team-editor',              label: 'Próximo Jogo / Ao Vivo', description: 'Placar ao vivo, relógio, alinhamento e tempo' },
  { value: 'standings',         element: 'soccer-live-standings',         editor: 'soccer-live-standings-editor',         label: 'Classificação',          description: 'Tabela classificativa da liga com zonas' },
  { value: 'last-match',        element: 'soccer-live-last-match',        editor: 'soccer-live-last-match-editor',        label: 'Último Jogo',            description: 'Resultado e marcadores do último jogo terminado' },
  { value: 'matches',           element: 'soccer-live-matches',           editor: 'soccer-live-matches-editor',           label: 'Jogos / Calendário',     description: 'Lista de jogos agrupados por data com destaque ao vivo' },
  { value: 'countdown',         element: 'soccer-live-countdown',         editor: 'soccer-live-countdown-editor',         label: 'Contagem Decrescente',   description: 'Contador regressivo para o próximo jogo com placar ao vivo' },
  { value: 'match-center',      element: 'soccer-live-match-center',      editor: 'soccer-live-match-center-editor',      label: 'Centro de Jogo',         description: 'Resumo, estatísticas, cronologia, alinhamento e H2H' },
  { value: 'scorers',           element: 'soccer-live-scorers',           editor: 'soccer-live-scorers-editor',           label: 'Melhores Marcadores',    description: 'Lista de marcadores com foto e número de golos' },
  { value: 'team-form',         element: 'soccer-live-team-form',         editor: 'soccer-live-team-form-editor',         label: 'Forma da Equipa',        description: 'Tendência de forma, histórico V/E/D e golos' },
  { value: 'lineup',            element: 'soccer-live-lineup',            editor: 'soccer-live-lineup-editor',            label: 'Onze Inicial',           description: 'Alinhamento titular de ambas as equipas' },
  { value: 'timeline',          element: 'soccer-live-timeline',          editor: 'soccer-live-timeline-editor',          label: 'Cronologia / Eventos',   description: 'Eventos minuto a minuto da partida' },
  { value: 'mini-standings',    element: 'soccer-live-mini-standings',    editor: 'soccer-live-mini-standings-editor',    label: 'Mini Classificação',     description: 'Classificação compacta com número de linhas configurável' },
  { value: 'team-competitions', element: 'soccer-live-team-competitions', editor: 'soccer-live-team-competitions-editor', label: 'Competições da Equipa',  description: 'Todas as competições da equipa com abas' },
  { value: 'multi-team',        element: 'soccer-live-multi-team',        editor: 'soccer-live-multi-team-editor',        label: 'Múltiplas Equipas',      description: 'Várias equipas num só cartão compacto' },
  { value: 'news',              element: 'soccer-live-news',              editor: 'soccer-live-news-editor',              label: 'Notícias',               description: 'Feed de artigos com imagens e datas' },
  { value: 'bracket',           element: 'soccer-live-bracket',           editor: 'soccer-live-bracket-editor',           label: 'Eliminatórias / Taça',   description: 'Quadro da fase a eliminar ou árvore do torneio' },
  { value: 'club',              element: 'soccer-live-club',              editor: 'soccer-live-club-editor',              label: 'Perfil do Clube',        description: 'Perfil do clube, plantel, transferências e época' },
  { value: 'ticker',            element: 'soccer-live-ticker',            editor: 'soccer-live-ticker-editor',            label: 'Ticker de Jogos',        description: 'Faixa horizontal com os jogos de hoje' },
  { value: 'minimal',           element: 'soccer-live-schedule',          editor: 'soccer-live-schedule-editor',          label: 'Vista Minimalista',      description: 'Vista minimalista em texto: jogos, próximo jogo ou forma' },
  { value: 'matchday',          element: 'soccer-live-matchday',          editor: 'soccer-live-insights-editor',          label: 'Jornada',                description: 'Uma jornada com estado, jogos e dados' },
  { value: 'archive',           element: 'soccer-live-archive',           editor: 'soccer-live-insights-editor',          label: 'Arquivo',                description: 'Histórico pessoal de jogos terminados' },
  { value: 'diagnostics',       element: 'soccer-live-diagnostics',       editor: 'soccer-live-diagnostics-editor',       label: 'Diagnóstico',            description: 'Estado de saúde dos sensores e agendamento' },
  { value: 'hub',               element: 'soccer-live-match-center',      editor: 'soccer-live-match-center-editor',      label: 'Match Hub',              description: 'Vista dinâmica adaptada à fase (pré-jogo, ao vivo, pós-jogo)' },
  { value: 'race',              element: 'soccer-live-standings',         editor: 'soccer-live-standings-editor',         label: 'Corrida ao Título',      description: 'Diferença de pontos para título, vagas europeias e descida' },
];

const CARD_TYPE_ALIASES = { schedule: 'minimal' };
function normalizeCardType(cardType) {
  return CARD_TYPE_ALIASES[cardType] || cardType;
}

const TYPE_TO_ELEMENT = Object.fromEntries(CARD_REGISTRY.map(c => [c.value, c.element]));
const LEGACY_ELEMENTS = new Set(CARD_REGISTRY.map(c => c.element));
const CARD_EDITORS    = Object.fromEntries(CARD_REGISTRY.filter(c => c.editor).map(c => [c.value, c.editor]));

function resolveElement(cardType) {
  const norm = normalizeCardType(cardType);
  return TYPE_TO_ELEMENT[norm] || (LEGACY_ELEMENTS.has(norm) ? norm : 'soccer-live-team');
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
    this._subEditor = null;
    this._subEditorType = null;
    this._subEditorIndex = null;
  }

  setConfig(config) {
    this._config = { ...(config || {}) };
    if (!Array.isArray(this._config.modules)) {
      this._config.modules = [];
    }
    this._config.modules = this._config.modules.map(mod => {
      if (mod?.entity && (mod.entity.startsWith('sensor.sun_') || mod.entity.startsWith('sensor.time') || mod.entity.startsWith('sensor.date'))) {
        const nextMod = { ...mod };
        delete nextMod.entity;
        return nextMod;
      }
      return mod;
    });
    this.requestUpdate();
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  _dispatch(config) {
    const rawType = this._config?.type || WRAPPER_TYPE;
    const type = rawType.startsWith('custom:') ? rawType : `custom:${rawType}`;
    const nextConfig = { ...config, type };
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
    this._subEditorIndex = null;
    this._dispatch({ ...this._config, modules });
  }

  _addModule(type) {
    if (!type) return;
    const item = CARD_REGISTRY.find(c => c.value === type);
    const title = item ? item.label : type;
    const models = discoverSoccerModels(this.hass, this._config) || {};

    let defaultEntity = '';
    const norm = normalizeCardType(type);
    if (norm === 'team' || norm === 'countdown' || norm === 'lineup' || norm === 'timeline' || norm === 'match-center' || norm === 'hub') {
      defaultEntity = models.match_model;
    } else if (norm === 'standings' || norm === 'mini-standings' || norm === 'race') {
      defaultEntity = models.standings_model;
    } else if (norm === 'last-match' || norm === 'archive') {
      defaultEntity = models.last_match_model;
    } else if (norm === 'scorers') {
      defaultEntity = models.scorers_model;
    } else if (norm === 'news') {
      defaultEntity = models.news_model;
    } else if (norm === 'bracket') {
      defaultEntity = models.bracket_model;
    } else if (norm === 'club') {
      defaultEntity = models.club_model;
    } else if (norm === 'matches' || norm === 'ticker' || norm === 'team-competitions' || norm === 'matchday' || norm === 'minimal') {
      defaultEntity = models.match_model;
    }

    const newMod = {
      id: `mod_${Date.now()}`,
      type,
      title,
      entity: defaultEntity || '',
    };
    const modules = [...(this._config.modules || []), newMod];
    this._selectedModuleIndex = modules.length - 1;
    this._subEditorIndex = null;
    this._dispatch({ ...this._config, modules });
  }

  _changeModuleType(index, newType) {
    if (!newType) return;
    const modules = [...(this._config.modules || [])];
    const mod = modules[index];
    if (!mod) return;
    const oldType = mod.type;
    const meta = CARD_REGISTRY.find(c => c.value === newType);
    const newTitle = meta ? meta.label : newType;

    const models = discoverSoccerModels(this.hass, { ...this._config, team: mod.team || this._config.team }) || {};
    let defaultEntity = mod.entity || '';
    const norm = normalizeCardType(newType);
    if (norm === 'team' || norm === 'countdown' || norm === 'lineup' || norm === 'timeline' || norm === 'match-center' || norm === 'hub') {
      defaultEntity = models.match_model || defaultEntity;
    } else if (norm === 'standings' || norm === 'mini-standings' || norm === 'race') {
      defaultEntity = models.standings_model || defaultEntity;
    } else if (norm === 'last-match' || norm === 'archive') {
      defaultEntity = models.last_match_model || defaultEntity;
    } else if (norm === 'scorers') {
      defaultEntity = models.scorers_model || defaultEntity;
    } else if (norm === 'news') {
      defaultEntity = models.news_model || defaultEntity;
    } else if (norm === 'bracket') {
      defaultEntity = models.bracket_model || defaultEntity;
    } else if (norm === 'club') {
      defaultEntity = models.club_model || defaultEntity;
    } else if (norm === 'matches' || norm === 'ticker' || norm === 'team-competitions' || norm === 'matchday' || norm === 'minimal') {
      defaultEntity = models.match_model || defaultEntity;
    }

    const oldMeta = CARD_REGISTRY.find(c => c.value === oldType);
    const shouldUpdateTitle = !mod.title || mod.title === oldMeta?.label || mod.title === oldType;

    modules[index] = {
      id: mod.id,
      type: newType,
      title: shouldUpdateTitle ? newTitle : mod.title,
      team: mod.team,
      entity: defaultEntity,
    };
    this._subEditor = null;
    this._subEditorType = null;
    this._subEditorIndex = null;
    this._dispatch({ ...this._config, modules });
  }

  _duplicateModule(index) {
    const modules = [...(this._config.modules || [])];
    const source = modules[index];
    if (!source) return;
    const cloned = { ...source, id: `mod_${Date.now()}`, title: `${source.title} (Cópia)` };
    modules.splice(index + 1, 0, cloned);
    this._selectedModuleIndex = index + 1;
    this._subEditorIndex = null;
    this._dispatch({ ...this._config, modules });
  }

  _removeModule(index) {
    const modules = [...(this._config.modules || [])];
    modules.splice(index, 1);
    this._selectedModuleIndex = Math.max(0, index - 1);
    this._subEditor = null;
    this._subEditorType = null;
    this._subEditorIndex = null;
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
      const norm = normalizeCardType(mod.type);
      if (norm === 'team' || norm === 'countdown' || norm === 'lineup' || norm === 'timeline' || norm === 'match-center' || norm === 'hub') {
        nextMod.entity = models.match_model || mod.entity;
      } else if (norm === 'standings' || norm === 'mini-standings' || norm === 'race') {
        nextMod.entity = models.standings_model || mod.entity;
      } else if (norm === 'last-match' || norm === 'archive') {
        nextMod.entity = models.last_match_model || mod.entity;
      } else if (norm === 'scorers') {
        nextMod.entity = models.scorers_model || mod.entity;
      } else if (norm === 'news') {
        nextMod.entity = models.news_model || mod.entity;
      } else if (norm === 'bracket') {
        nextMod.entity = models.bracket_model || mod.entity;
      } else if (norm === 'club') {
        nextMod.entity = models.club_model || mod.entity;
      } else if (norm === 'matches' || norm === 'ticker' || norm === 'team-competitions' || norm === 'matchday' || norm === 'minimal') {
        nextMod.entity = models.match_model || mod.entity;
      }
      return nextMod;
    });
    this._dispatch({ ...this._config, modules });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this._subEditor) {
      this._subEditor.hass = this.hass;
    }
    this._syncSubEditor();
  }

  _syncSubEditor() {
    const container = this.shadowRoot?.getElementById('module-sub-editor-container');
    if (!container) return;

    const modules = this._config.modules || [];
    const selectedIdx = Math.min(this._selectedModuleIndex, Math.max(0, modules.length - 1));
    const selectedMod = modules[selectedIdx];

    if (!selectedMod) {
      container.innerHTML = '';
      this._subEditor = null;
      this._subEditorType = null;
      this._subEditorIndex = null;
      return;
    }

    const rawType = selectedMod.type || 'team';
    const type = normalizeCardType(rawType);
    const editorName = CARD_EDITORS[type];

    if (!editorName) {
      container.innerHTML = '<div style="font-size: 12px; color: var(--secondary-text-color); padding: 8px 0;">Este tipo de módulo não tem opções adicionais.</div>';
      this._subEditor = null;
      this._subEditorType = null;
      this._subEditorIndex = null;
      return;
    }

    if (!customElements.get(editorName)) {
      container.innerHTML = `<div style="font-size: 12px; color: var(--secondary-text-color); padding: 8px 0;">${this._t('ui.loading')}</div>`;
      loadCardModule(type, 'editor').then(() => {
        this._syncSubEditor();
      }).catch(err => {
        container.innerHTML = `<div style="font-size: 12px; color: #ef4444; padding: 8px 0;">Erro ao carregar editor: ${err}</div>`;
      });
      return;
    }

    const modConfig = {
      ...selectedMod,
      card_type: type,
      _hide_skin_controls: true,
    };

    if (this._subEditor && this._subEditorType === type && this._subEditorIndex === selectedIdx) {
      this._subEditor.hass = this.hass;
      try {
        this._subEditor.setConfig(modConfig);
      } catch (e) {}
      return;
    }

    container.innerHTML = '';
    const sub = document.createElement(editorName);
    sub.dataset.moduleEditor = 'true';
    sub.hass = this.hass;

    sub.addEventListener('config-changed', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      const detail = e.detail?.config || {};
      const curModules = [...(this._config.modules || [])];
      const curMod = curModules[this._selectedModuleIndex];
      if (!curMod) return;

      const merged = { ...curMod, ...detail };
      merged.id = curMod.id;
      merged.type = curMod.type;
      if (curMod.title) merged.title = curMod.title;
      if (curMod.team) merged.team = curMod.team;
      delete merged._hide_skin_controls;
      delete merged.card_type;

      curModules[this._selectedModuleIndex] = merged;
      this._dispatch({ ...this._config, modules: curModules });
    });

    try {
      sub.setConfig(modConfig);
    } catch (e) {}

    container.appendChild(sub);
    this._subEditor = sub;
    this._subEditorType = type;
    this._subEditorIndex = selectedIdx;
  }

  render() {
    const modules = this._config.modules || [];
    const selectedIdx = Math.min(this._selectedModuleIndex, Math.max(0, modules.length - 1));
    const selectedMod = modules[selectedIdx] || null;
    const selectedMeta = selectedMod ? CARD_REGISTRY.find(c => c.value === selectedMod.type) : null;
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
            <label class="field-label">Sensor de Canal / Transmissão (Broadcast Sensor)</label>
            <ha-entity-picker
              .key=${selectedMod.broadcast_entity || ''}
              .hass=${this.hass}
              .value=${selectedMod.broadcast_entity || ''}
              .includeDomains=${['sensor']}
              allow-custom-entity
              @value-changed=${e => this._updateSelectedModule('broadcast_entity', e.detail?.value || '')}
            ></ha-entity-picker>
          </div>

          <div class="module-options-section">
            <div class="module-options-title">
              <span>⚙️ ${this._t('editor.module_options')}</span>
              <span style="font-size: 11px; font-weight: 500; color: var(--secondary-text-color); text-transform: none;">— ${selectedMeta?.label || selectedMod.type}</span>
            </div>
            <div id="module-sub-editor-container"></div>
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
      .module-options-section {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }
      .module-options-title {
        font-size: 12px;
        font-weight: 700;
        color: #0284c7;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      #module-sub-editor-container {
        display: block;
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
    if (Array.isArray(this._config?.modules)) {
      return this._config.modules.filter(Boolean);
    }
    return [];
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
    if (mod.entity && this._hass?.states?.[mod.entity]) {
      return mod.entity;
    }
    const teamName = mod.team || this._config?.team || '';
    const cleanTeam = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const type = normalizeCardType(mod.type || 'team');
    const models = discoverSoccerModels(this._hass, { ...this._config, team: teamName }) || {};

    if (['team', 'countdown', 'lineup', 'timeline', 'match-center', 'hub'].includes(type)) {
      if (cleanTeam) {
        for (const [id, st] of Object.entries(this._hass?.states || {})) {
          if (!id.startsWith('sensor.')) continue;
          const stType = st?.attributes?.sensor_type;
          const cleanId = id.toLowerCase();
          const attrTeam = (st?.attributes?.team_name || st?.attributes?.team || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (['team_matches_mixed', 'team_matches', 'team_match'].includes(stType) || cleanId.includes('next')) {
            if (cleanId.includes(cleanTeam) || attrTeam.includes(cleanTeam)) return id;
          }
        }
      }
      return models.match_model || mod.entity || '';
    }

    if (type === 'last-match') {
      if (cleanTeam) {
        for (const [id, st] of Object.entries(this._hass?.states || {})) {
          if (!id.startsWith('sensor.')) continue;
          const stType = st?.attributes?.sensor_type;
          const cleanId = id.toLowerCase();
          const attrTeam = (st?.attributes?.team_name || st?.attributes?.team || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (stType === 'last_match' || cleanId.includes('last')) {
            if (cleanId.includes(cleanTeam) || attrTeam.includes(cleanTeam)) return id;
          }
        }
      }
      return models.last_match_model || mod.entity || '';
    }

    if (['standings', 'mini-standings', 'race'].includes(type)) {
      return models.standings_model || mod.entity || '';
    }
    if (type === 'scorers') {
      return models.scorers_model || mod.entity || '';
    }
    if (type === 'news') {
      return models.news_model || mod.entity || '';
    }
    if (type === 'bracket') {
      return models.bracket_model || mod.entity || '';
    }
    if (type === 'club') {
      return models.club_model || mod.entity || '';
    }
    if (['matches', 'ticker', 'team-competitions', 'matchday', 'minimal'].includes(type)) {
      return models.match_model || mod.entity || '';
    }

    return mod.entity || models.match_model || '';
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
      const wrapper = document.createElement('ha-card');
      wrapper.className = 'soccer-live-hub-wrapper';
      wrapper.style.cssText = 'border-radius: 20px; overflow: hidden; padding: 0;';
      this._applyWrapperTheme(wrapper);

      const header = document.createElement('div');
      header.className = 'soccer-live-card-title';
      header.style.cssText = 'padding: 16px 18px 8px;';
      header.innerHTML = `
        <div style="font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--primary-text-color);">${this._config.title || 'Desporto'}</div>
        <div style="font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; font-weight: 500;">${this._config.subtitle || 'Soccer Live Hub'}</div>
      `;
      wrapper.appendChild(header);

      const placeholderWrap = document.createElement('div');
      placeholderWrap.style.cssText = 'padding: 0 16px 16px;';
      placeholderWrap.appendChild(this._placeholder());

      wrapper.appendChild(placeholderWrap);
      this.appendChild(wrapper);
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
      wrapper.style.cssText = 'border-radius: 20px; overflow: hidden; padding: 0; border-top: 4px solid #0284c7;';
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
      let blendedHass = blendHassSources(this._hass, modConfig);
      const broadcastEntity = mod.broadcast_entity;
      const broadcastVal = (broadcastEntity && this._hass?.states?.[broadcastEntity])
        ? (['unavailable', 'unknown'].includes(this._hass.states[broadcastEntity].state) ? '' : this._hass.states[broadcastEntity].state)
        : mod.broadcast;

      if (broadcastVal && modConfig.entity && blendedHass?.states?.[modConfig.entity]) {
        const origState = blendedHass.states[modConfig.entity];
        blendedHass = {
          ...blendedHass,
          states: {
            ...blendedHass.states,
            [modConfig.entity]: {
              ...origState,
              attributes: {
                ...origState.attributes,
                broadcast: broadcastVal,
                broadcasts: [broadcastVal]
              }
            }
          }
        };
      }
      el.hass = blendedHass;
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
            :host {
              --cl-accent: #0284c7 !important;
              --cl-accent-2: #0f172a !important;
              --cl-accent-rgb: 2,132,199 !important;
              --cl-accent-2-rgb: 15,23,42 !important;
              --cl-live: #ef4444 !important;
              --cl-live-glow: rgba(239,68,68,0.4) !important;
            }
          `;
          el.shadowRoot.appendChild(style);
        }
      }
    }, 50);

    return el;
  }

  _placeholder() {
    const el = document.createElement('div');
    el.style.cssText = `
      border: 2px dashed var(--divider-color, rgba(127,127,127,0.35));
      border-radius: 16px;
      padding: 36px 24px;
      text-align: center;
      color: var(--secondary-text-color, #64748b);
      font-size: 14px;
      font-weight: 500;
      margin: 16px;
      background: rgba(0, 0, 0, 0.01);
    `;
    const lang = resolveLang(this._hass, this._config);
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
    return document.createElement('soccer-live-hub-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:soccer-live-hub',
      title: 'Desporto',
      subtitle: 'Soccer Live Hub',
      layout: 'tabs',
      appearance: 'ha',
      modules: []
    };
  }
}

if (!customElements.get('soccer-live-hub')) {
  customElements.define('soccer-live-hub', SoccerLiveCard);
}
if (!customElements.get('soccer-live-card')) {
  customElements.define('soccer-live-card', SoccerLiveCard);
}
if (!customElements.get('soccer-live-card-editor')) {
  customElements.define('soccer-live-card-editor', SoccerLiveCardEditor);
}

window.customCards = window.customCards || [];
const hubTypes = ['soccer-live-hub', 'custom:soccer-live-hub'];
for (const cardType of hubTypes) {
  if (!window.customCards.some(c => c.type === cardType)) {
    window.customCards.push({
      type: cardType,
      name: 'Soccer Live Hub',
      description: 'Cartão modular de Futebol com placares ao vivo, classificação, último jogo e mais.',
      preview: true,
      documentationURL: 'https://github.com/nelsonamen/Teste',
    });
  }
}
