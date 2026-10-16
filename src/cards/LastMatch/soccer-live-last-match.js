import { LitElement, html, css, render } from "lit";
import { t, resolveLang, parseMatchDate } from "../../i18n.js";
import { skinStyles, applySkin } from "../../skins.js";
import { renderInfoState, renderSyncStatusOrEmpty } from "../card-error.js";
import { OfflineCache } from "../offline-cache.js";
import { displayCompetitionName, resolveCompetitionLogo, pickLeagueInfo } from "../shared-competition.js";
import { scoreText } from "../shared-score.js";
import { standingText } from "../shared-standing.js";
import { pickLastMatch } from "../shared-last-match.js";
import { renderPopupTimeline, renderPopupLineup, renderPopupSectionStyles } from "../shared-match-sections.js";
import { pitchStyles } from "../shared-pitch.js";
import { matchStatRows, translateStatKey } from "../shared-stat-labels.js";
import { renderMatchMeta, matchMetaStyles } from "../shared-match-meta.js";
import { soccerCardShellStyles } from "../card-shell.js";
import { renderSoccerHeader, renderSoccerBadge, soccerHeaderStyles } from "../shared-header.js";

/**
 * Soccer Live Last Match Card
 * Shows the most recent finished match for a team in a large premium hero layout:
 * competition header with status badge, big team side-by-side logos, score,
 * record & form pills, venue meta, plus a Details button that opens a full details popup.
 */
class SoccerLiveLastMatchCard extends LitElement {
  static get properties() {
    return { hass: {}, _config: {}, _cachedData: {}, _showDetails: { type: Boolean } };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this._config = config;
    applySkin(this, config);
  }

  updated(changed) {
    if (changed.has("hass") && this._config) {
      const stateObj = this.hass?.states[this._config.entity];
      if (stateObj && stateObj.state !== "unavailable") {
        this._cachedData = stateObj.attributes;
        OfflineCache.set(this._config.entity, stateObj.attributes);
      } else if (!this._cachedData) {
        this._cachedData = OfflineCache.get(this._config.entity);
      }
    }
    if (changed.has("_showDetails")) {
      if (this._showDetails) this._renderDetailsPortal();
      else this._removeDetailsPortal();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeDetailsPortal();
  }

  getCardSize() { return 5; }

  _t(key, vars) { return t(key, resolveLang(this.hass, this._config), vars); }

  _attrs() {
    const stateObj = this.hass?.states[this._config.entity];
    return (stateObj && stateObj.state !== "unavailable") ? stateObj.attributes : this._cachedData;
  }

  render() {
    if (!this._config || !this.hass) return html``;
    applySkin(this, this._config);
    const attrs = this._attrs();
    if (!attrs || (!attrs.matches && !attrs.previous_matches && !attrs.match_archive && !attrs.schedule_recent_matches)) {
      return renderSyncStatusOrEmpty(attrs, (k) => this._t(k), () =>
        renderInfoState("📅", this._t("last_match.none"), this._t("last_match.none_hint")));
    }

    const match = pickLastMatch(attrs);
    if (!match) {
      return html`<ha-card>${renderInfoState("📅", this._t("last_match.none"), this._t("last_match.none_hint"))}</ha-card>`;
    }
    return html`<ha-card>${this._renderMatch(match)}</ha-card>`;
  }

  _hasDetails(match) {
    return !!match;
  }

  _renderStatusBadge(match) {
    return html`<span class="status-badge finished">${this._t('status.finished')}</span>`;
  }

  _renderClock(match) {
    return html`<div class="clock finished">${this._t('status.full_time')}</div>`;
  }

  _renderRecord(record) {
    if (!record || record === 'N/A') return '';
    const parts = String(record).split('-');
    if (parts.length === 3) {
      if (parts.every(p => parseInt(p, 10) === 0)) return '';
      return html`<div class="record">
        <span class="rec rec-w">${parts[0]}${this._t('form.W')}</span>
        <span class="rec rec-d">${parts[1]}${this._t('form.D')}</span>
        <span class="rec rec-l">${parts[2]}${this._t('form.L')}</span>
      </div>`;
    }
    return html`<div class="record"><span class="rec">${record}</span></div>`;
  }

  _renderStandingSummary(match, side) {
    const text = standingText(match, side, (k) => this._t(k));
    return text ? html`<div class="standing-summary">${text}</div>` : '';
  }

  _renderForm(formStr) {
    if (!formStr || formStr === 'N/A') return '';
    const letters = String(formStr).replace(/[^WLDwld]/g, '').toUpperCase();
    if (letters.length < 2) return '';
    const recent = letters.slice(-5).split('');
    const labelOf = (l) => this._t('form.' + l);
    return html`
      <div class="form-pills">
        ${recent.map(l => html`<div class="form-pill ${l}">${labelOf(l)}</div>`)}
      </div>
    `;
  }

  _renderMatch(match) {
    const lang = resolveLang(this.hass, this._config);
    const attrs = this._attrs() || {};
    const leagueName = (match.league_name && match.league_name !== "N/A" ? match.league_name : "") || attrs.league_name || "";
    const leagueInfo = pickLeagueInfo(attrs.league_info, leagueName);
    const leagueLogo = resolveCompetitionLogo({
      competitionName: leagueName || (leagueInfo && leagueInfo.name) || '',
      competitionLogo: (match.league_logo && match.league_logo !== 'N/A')
        ? match.league_logo
        : ((leagueInfo && leagueInfo.logo_href) || attrs.league_logo || (attrs.league_info && attrs.league_info[0]?.logo_href)),
      fallbackLogo: null,
      isFriendly: match.is_friendly,
    });
    const competition = displayCompetitionName(leagueName, lang);

    const homeGoals = Number(match.home_score);
    const awayGoals = Number(match.away_score);
    const homeWin = Number.isFinite(homeGoals) && Number.isFinite(awayGoals) && homeGoals > awayGoals;
    const awayWin = Number.isFinite(homeGoals) && Number.isFinite(awayGoals) && awayGoals > homeGoals;

    const myTeam = (this._config.my_team || this._config.team_name || attrs.team_name || "").toLowerCase();
    const homeIsMyTeam = myTeam && match.home_team && match.home_team.toLowerCase().includes(myTeam);
    const awayIsMyTeam = myTeam && match.away_team && match.away_team.toLowerCase().includes(myTeam);

    const logoEl = (logo, abbrev) => logo
      ? html`<img class="team-logo-big" src="${logo}" alt="" loading="lazy">`
      : html`<div class="team-logo-fallback">${abbrev || "?"}</div>`;

    return html`
      ${renderSoccerHeader({
        logo: leagueLogo,
        title: competition,
        subtitle: `${this._t("last_match.label") || "Último resultado"}${match.season_info ? ` · ${match.season_info}` : ""}`,
        badge: this._renderStatusBadge(match),
      })}

      <div class="scoreboard">
        <div class="team-side home">
          <div class="team-logo-wrap">
            ${logoEl(match.home_logo, match.home_abbrev)}
          </div>
          <div class="team-name-big ${homeIsMyTeam ? "my-team" : ""}">${match.home_team || match.home_abbrev || "?"}</div>
          ${this._renderStandingSummary(match, "home")}
          ${this._renderRecord(match.home_record)}
          ${this._renderForm(match.last_five_home || match.home_form)}
        </div>

        <div class="score-center">
          <div class="score-numbers">
            <span class="${homeWin ? "win" : ""}">${scoreText(match.home_score, "–")}</span>
            <span class="dash">-</span>
            <span class="${awayWin ? "win" : ""}">${scoreText(match.away_score, "–")}</span>
          </div>
          ${this._renderClock(match)}
        </div>

        <div class="team-side away">
          <div class="team-logo-wrap">
            ${logoEl(match.away_logo, match.away_abbrev)}
          </div>
          <div class="team-name-big ${awayIsMyTeam ? "my-team" : ""}">${match.away_team || match.away_abbrev || "?"}</div>
          ${this._renderStandingSummary(match, "away")}
          ${this._renderRecord(match.away_record)}
          ${this._renderForm(match.last_five_away || match.away_form)}
        </div>
      </div>

      ${this._config.hide_meta !== true ? renderMatchMeta(match, { lang, t: (k, vars) => this._t(k, vars), showDate: true, hideBroadcasts: true }) : ""}

      ${this._hasDetails(match) ? html`
        <div class="lm-actions">
          <button class="lm-details-btn" @click=${() => { this._showDetails = true; }}>
            ${this._t("team.details")} ›
          </button>
        </div>` : ""}
    `;
  }

  // ─── Details popup (portal in document.body, so it escapes the card) ────────

  _renderDetailsPortal() {
    const match = pickLastMatch(this._attrs());
    if (!match) { this._showDetails = false; return; }

    if (!this._portal) {
      this._portal = document.createElement("dialog");
      this._portal.className = "soccer-live-last-match-portal";
      this._cancel = (e) => { e.preventDefault(); this._showDetails = false; };
      this._backdrop = (e) => { if (e.target === this._portal) this._showDetails = false; };
      this._escape = (e) => { if (e.key === "Escape") this._showDetails = false; };
      this._portal.addEventListener("cancel", this._cancel);
      this._portal.addEventListener("click", this._backdrop);
      document.addEventListener("keydown", this._escape);
      document.body.appendChild(this._portal);
    }
    this._copyThemeVars(this._portal);
    render(html`${this._portalStyles()}${renderPopupSectionStyles("mp")}${this._renderDetails(match)}`, this._portal);
    if (!this._portal.open) {
      try { this._portal.showModal(); } catch { this._portal.setAttribute("open", ""); }
    }
  }

  _removeDetailsPortal() {
    if (!this._portal) return;
    if (this._portal.open) this._portal.close();
    this._portal.removeEventListener("cancel", this._cancel);
    this._portal.removeEventListener("click", this._backdrop);
    document.removeEventListener("keydown", this._escape);
    render(html``, this._portal);
    this._portal.remove();
    this._portal = null;
  }

  _copyThemeVars(target) {
    const computed = getComputedStyle(this);
    ["--cl-bg", "--cl-text", "--cl-text-2", "--cl-divider", "--cl-accent",
     "--cl-accent-2", "--cl-accent-rgb", "--cl-green", "--cl-live",
     "--cl-win", "--cl-draw", "--cl-loss"]
      .forEach(name => {
        const v = computed.getPropertyValue(name);
        if (v) target.style.setProperty(name, v);
      });
  }

  separateEvents(match) {
    const details = match.match_details || match.key_events || match.timeline || match.events || [];
    const goals = [];
    const yellowCards = [];
    const redCards = [];
    details.forEach(d => {
      const text = typeof d === 'string' ? d : (d.text || d.description || d.type_text || '');
      const lower = text.toLowerCase();
      if (lower.includes('goal') || lower.includes('golo') || d.type === 'goal') goals.push(text);
      else if (lower.includes('yellow') || lower.includes('amarelo') || d.type === 'yellow_card') yellowCards.push(text);
      else if (lower.includes('red') || lower.includes('vermelho') || d.type === 'red_card') redCards.push(text);
    });
    return { goals, yellowCards, redCards };
  }

  _renderPopupEventGroups(m) {
    const { goals, yellowCards, redCards } = this.separateEvents(m);
    if (!goals.length && !yellowCards.length && !redCards.length) return '';
    return html`
      ${goals.length ? html`
        <div class="lmp-event-group goal">
          <h5 class="lmp-event-title">${this._t('popup.goals')}</h5>
          <ul class="lmp-event-list">${goals.map(i => html`<li>${i}</li>`)}</ul>
        </div>
      ` : ''}
      ${yellowCards.length ? html`
        <div class="lmp-event-group yellow">
          <h5 class="lmp-event-title">${this._t('popup.yellow_cards')}</h5>
          <ul class="lmp-event-list">${yellowCards.map(i => html`<li>${i}</li>`)}</ul>
        </div>
      ` : ''}
      ${redCards.length ? html`
        <div class="lmp-event-group red">
          <h5 class="lmp-event-title">${this._t('popup.red_cards')}</h5>
          <ul class="lmp-event-list">${redCards.map(i => html`<li>${i}</li>`)}</ul>
        </div>
      ` : ''}
    `;
  }

  _renderDetails(match) {
    const lang = resolveLang(this.hass, this._config);
    const translate = (k, v) => this._t(k, v);
    const dateObj = parseMatchDate(match.date_iso || match.date);
    const dateStr = dateObj
      ? dateObj.toLocaleDateString(lang, { weekday: "short", day: "numeric", month: "short" })
      : "";
    const competition = displayCompetitionName(match.league_name, lang);

    return html`
      <div class="lmp-box">
        <button class="lmp-close" aria-label="${this._t("last_match.close")}" @click=${() => { this._showDetails = false; }}>×</button>
        <div class="lmp-score-row">
          <img class="lmp-logo" src="${match.home_logo}" alt="" @error=${e => e.target.style.display = "none"}>
          <div class="lmp-center">
            <div class="lmp-score">${scoreText(match.home_score, "-")}<span> – </span>${scoreText(match.away_score, "-")}</div>
            <div class="lmp-ft">${this._t("status.full_time")}</div>
          </div>
          <img class="lmp-logo" src="${match.away_logo}" alt="" @error=${e => e.target.style.display = "none"}>
        </div>
        <p class="lmp-teams"><strong>${match.home_team}</strong> – <strong>${match.away_team}</strong></p>
        ${competition || dateStr ? html`<p class="lmp-meta">${[competition, dateStr].filter(Boolean).join(" · ")}${match.venue && match.venue !== "N/A" ? ` · ${match.venue}` : ""}</p>` : ""}

        ${this._renderStats(match, translate)}
        ${this._renderPopupEventGroups(match)}
        ${this._renderRatings(match)}
        ${renderPopupTimeline(match, { translate })}
        ${renderPopupLineup(match, { translate })}
        ${this._renderH2H(match, translate)}

        <button class="lmp-done" @click=${() => { this._showDetails = false; }}>${this._t("last_match.close")}</button>
      </div>
    `;
  }

  _renderStats(match, translate) {
    const homeStats = match.home_statistics || match.statistics?.home || match.stats?.home || match.homeStats || {};
    const awayStats = match.away_statistics || match.statistics?.away || match.stats?.away || match.awayStats || {};
    const rows = matchStatRows(homeStats, awayStats);
    if (!rows.length) return "";
    const num = v => {
      const n = parseFloat(String(v).replace("%", ""));
      return Number.isFinite(n) ? n : 0;
    };
    return html`
      <div class="mp-section">
        <h5 class="mp-section-title">${this._t("tab.stats")}</h5>
        <div class="lmp-stats">
          ${rows.map(r => {
            const h = num(r.home), a = num(r.away);
            const total = h + a;
            const hp = total > 0 ? Math.round((h / total) * 100) : 50;
            return html`
              <div class="lmp-stat">
                <span class="lmp-stat-h">${r.home ?? "-"}</span>
                <span class="lmp-stat-label">${translateStatKey(r.key, translate)}</span>
                <span class="lmp-stat-a">${r.away ?? "-"}</span>
              </div>
              <div class="lmp-bar"><div class="lmp-bar-h" style="width:${hp}%"></div><div class="lmp-bar-a" style="width:${100 - hp}%"></div></div>`;
          })}
        </div>
      </div>`;
  }

  _ratingChip(rating) {
    const n = parseFloat(rating);
    if (!Number.isFinite(n)) return "";
    const bg = n >= 8 ? "#1f9d55" : n >= 7 ? "#4a9e2f" : n >= 6 ? "#c98a00" : "#c0392b";
    return html`<span class="lmp-rating" style="background:${bg}">${n.toFixed(1)}</span>`;
  }

  _renderRatings(match) {
    const potm = match.player_of_the_match;
    const rated = Array.isArray(match.top_rated_players) ? match.top_rated_players : [];
    if (!potm && !rated.length) return "";
    return html`
      <div class="mp-section">
        <h5 class="mp-section-title">${this._t("popup.ratings")}</h5>
        ${potm && (potm.name || potm.player) ? html`
          <div class="lmp-potm">
            <span class="lmp-potm-label">⭐ ${this._t("popup.player_of_match")}</span>
            <span class="lmp-potm-name">${potm.name || potm.player}</span>
            ${this._ratingChip(potm.rating)}
          </div>` : ""}
        ${rated.length ? html`
          <div class="lmp-ratings">
            ${rated.slice(0, 6).map(p => html`
              <div class="lmp-rated">
                ${p.photo ? html`<img src="${p.photo}" alt="" loading="lazy" @error=${e => e.target.style.display = "none"}>` : ""}
                <span class="lmp-rated-name">${p.short_name || p.name}</span>
                ${p.position ? html`<small class="lmp-rated-pos">${p.position}</small>` : ""}
                ${this._ratingChip(p.rating)}
              </div>`)}
          </div>` : ""}
      </div>`;
  }

  _renderH2H(match, translate) {
    const h2h = Array.isArray(match.head_to_head) ? match.head_to_head : [];
    if (!h2h.length) return "";
    const attrs = this._attrs() || {};
    const tracked = (this._config.my_team || this._config.team_name || attrs.team_name
      || match.home_team || "").toLowerCase();
    const outcome = (g) => {
      const hs = parseInt(g.home_score, 10), as_ = parseInt(g.away_score, 10);
      if (!tracked || Number.isNaN(hs) || Number.isNaN(as_)) return "";
      const isHome = (g.home_team || g.home || "").toLowerCase().includes(tracked);
      const isAway = (g.away_team || g.away || "").toLowerCase().includes(tracked);
      if (!isHome && !isAway) return "";
      if (hs === as_) return "draw";
      return ((isHome && hs > as_) || (isAway && as_ > hs)) ? "win" : "loss";
    };
    const lang = resolveLang(this.hass, this._config);
    const dateOf = (g) => {
      const d = parseMatchDate(g.date_iso || g.date);
      return d ? d.toLocaleDateString(lang, { day: "2-digit", month: "short", year: "numeric" }).replace(/\.$/, "") : "";
    };
    return html`
      <div class="mp-section">
        <h5 class="mp-section-title">${translate("popup.h2h")}</h5>
        <div class="lmp-h2h">
          ${h2h.slice(0, 6).map(g => html`
            <div><span>${g.home_team || g.home}</span><div class="lmp-h2h-mid"><b class="lmp-h2h-score ${outcome(g)}">${scoreText(g.home_score, "-")} – ${scoreText(g.away_score, "-")}</b>${dateOf(g) ? html`<small class="lmp-h2h-date">${dateOf(g)}</small>` : ""}</div><span>${g.away_team || g.away}</span></div>`)}
        </div>
      </div>`;
  }

  _portalStyles() {
    return html`<style>
      ${pitchStyles.cssText}
      .mp-section { margin: 12px 0 0; padding: 12px 14px; border-radius: 10px; background: rgba(255,255,255,0.045); border-left: 3px solid var(--cl-accent, #6366f1); }
      .mp-section-title { margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 800; color: var(--cl-text, #f8fafc); }
      .soccer-live-last-match-portal {
        border: 0; padding: 0; margin: auto; max-width: none; max-height: none;
        width: 100vw; height: 100vh; background: transparent; overflow: auto;
        color: var(--cl-text, var(--primary-text-color));
      }
      .soccer-live-last-match-portal::backdrop { background: rgba(0,0,0,0.6); }
      .lmp-box {
        position: relative; box-sizing: border-box;
        max-width: 560px; margin: 5vh auto; padding: 20px 18px 24px;
        background: var(--cl-bg, var(--card-background-color, #1c1c1c));
        color: var(--cl-text, var(--primary-text-color));
        border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      }
      .lmp-close {
        position: absolute; top: 10px; right: 12px; border: 0; background: transparent;
        color: var(--cl-text-2, var(--secondary-text-color)); font-size: 24px; line-height: 1;
        cursor: pointer; padding: 4px;
      }
      .lmp-score-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; }
      .lmp-logo { width: 48px; height: 48px; object-fit: contain; justify-self: center; }
      .lmp-center { text-align: center; }
      .lmp-score { font-size: 2rem; font-weight: 800; font-variant-numeric: tabular-nums; }
      .lmp-ft { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--cl-text-2, var(--secondary-text-color)); }
      .lmp-teams { text-align: center; margin: 6px 0 2px; }
      .lmp-meta { text-align: center; font-size: 0.82rem; color: var(--cl-text-2, var(--secondary-text-color)); margin: 0 0 4px; }
      .lmp-stats { display: flex; flex-direction: column; gap: 8px; }
      .lmp-stat { display: grid; grid-template-columns: auto 1fr auto; gap: 8px; font-size: 0.85rem; }
      .lmp-stat-label { text-align: center; color: var(--cl-text-2, var(--secondary-text-color)); }
      .lmp-stat-h, .lmp-stat-a { font-weight: 700; font-variant-numeric: tabular-nums; }
      .lmp-stat-a { text-align: right; }
      .lmp-bar { display: flex; height: 5px; border-radius: 3px; overflow: hidden; background: var(--cl-divider, rgba(127,127,127,0.2)); }
      .lmp-bar-h { background: var(--cl-accent, #3b82f6); }
      .lmp-bar-a { background: var(--cl-text-2, #9aa0a6); opacity: 0.6; }
      .lmp-event-group { margin: 12px 0 0; padding: 12px 14px; border-radius: 10px; border-left: 3px solid; background: rgba(255,255,255,0.045); }
      .lmp-event-group.goal { border-color: #6366f1; background: rgba(99,102,241,0.08); }
      .lmp-event-group.yellow { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
      .lmp-event-group.red { border-color: #ef4444; background: rgba(239,68,68,0.08); }
      .lmp-event-title { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 800; }
      .lmp-event-group.goal .lmp-event-title { color: #6366f1; }
      .lmp-event-group.yellow .lmp-event-title { color: #f59e0b; }
      .lmp-event-group.red .lmp-event-title { color: #ef4444; }
      .lmp-event-list { margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--cl-text); }
      .lmp-event-list li { margin: 3px 0; }
      .lmp-potm { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .lmp-potm-label { font-size: 0.78rem; color: var(--cl-text-2, var(--secondary-text-color)); white-space: nowrap; }
      .lmp-potm-name { font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lmp-rating { margin-left: auto; flex: 0 0 auto; min-width: 34px; text-align: center; font-weight: 700; font-variant-numeric: tabular-nums; color: #fff; border-radius: 5px; padding: 2px 6px; font-size: 0.8rem; }
      .lmp-ratings { display: flex; flex-direction: column; gap: 6px; }
      .lmp-rated { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }
      .lmp-rated img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; }
      .lmp-rated-name { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lmp-rated-pos { color: var(--cl-text-2, var(--secondary-text-color)); }
      .lmp-h2h > div { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; font-size: 0.85rem; padding: 3px 0; align-items: center; }
      .lmp-h2h > div > span:last-child { text-align: right; }
      .lmp-h2h b { font-variant-numeric: tabular-nums; }
      .lmp-h2h-mid { display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .lmp-h2h-date { color: var(--cl-text-2, var(--secondary-text-color)); font-size: 0.62rem; white-space: nowrap; }
      .lmp-h2h-score { padding: 1px 8px; border-radius: 6px; }
      .lmp-h2h-score.win  { color: #fff; background: var(--cl-win, #22c55e); }
      .lmp-h2h-score.loss { color: #fff; background: var(--cl-loss, #ef4444); }
      .lmp-h2h-score.draw { color: var(--cl-text, #f8fafc); background: var(--cl-divider, rgba(127,127,127,0.28)); }
      .lmp-done {
        margin-top: 20px; width: 100%; padding: 12px 20px; border: 0; border-radius: 12px;
        cursor: pointer; font-weight: 800; font-size: 14px; color: #fff;
        background: linear-gradient(135deg, var(--cl-accent, #6366f1), var(--cl-accent-2, var(--cl-accent, #ec4899)));
      }
      .lmp-done:hover { filter: brightness(1.08); }
    </style>`;
  }

  static get styles() {
    return [skinStyles, soccerCardShellStyles, soccerHeaderStyles, matchMetaStyles, css`
      :host { display: block; }
      ha-card { padding: 16px 18px; overflow: hidden; background: var(--cl-bg); color: var(--cl-text); border-radius: 20px; }
      .status-badge { font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.06em; display: inline-flex; align-items: center; gap: 5px; }
      .status-badge.finished { background: var(--cl-green, #10b981); color: #fff; }
      .clock.finished { font-size: 11px; font-weight: 700; color: var(--cl-text-2); background: var(--cl-surface, rgba(255,255,255,0.06)); padding: 4px 10px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.05em; }
      .record { display: flex; gap: 4px; font-size: 10px; font-weight: 800; justify-content: center; }
      .rec { padding: 2px 6px; border-radius: 4px; }
      .rec-w { background: #22c55e; color: #fff; }
      .rec-d { background: var(--cl-text-2, #64748b); color: #fff; }
      .rec-l { background: #ef4444; color: #fff; }
      .standing-summary { font-size: 11px; font-weight: 700; color: var(--cl-accent); text-align: center; }
      .form-pills { display: flex; gap: 3px; justify-content: center; }
      .form-pill { width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; }
      .form-pill.W, .form-pill.w { background: #22c55e; color: #fff; }
      .form-pill.D, .form-pill.d { background: var(--cl-text-2, #64748b); color: #fff; }
      .form-pill.L, .form-pill.l { background: #ef4444; color: #fff; }
      .my-team { font-weight: 800; color: var(--cl-accent); }
      .scoreboard { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; padding: 16px 12px 14px; }
      .team-side { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; min-width: 0; }
      .team-logo-wrap { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
      .team-logo-big { width: 48px; height: 48px; object-fit: contain; }
      .team-logo-fallback { width: 44px; height: 44px; border-radius: 50%; background: var(--cl-surface-2); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; }
      .team-name-big { font-weight: 700; font-size: 0.95rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; color: var(--cl-text); }
      .score-center { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 8px; }
      .score-numbers { font-size: 2.2rem; font-weight: 800; font-variant-numeric: tabular-nums; display: flex; align-items: center; gap: 8px; color: var(--cl-text-2); }
      .score-numbers > span.win { color: var(--cl-text); }
      .dash { font-weight: 300; font-size: 1.8rem; color: var(--cl-text-2); }
      .score-status { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cl-text-2); }
      .lm-actions { display: flex; justify-content: center; margin-top: 10px; padding-bottom: 4px; }
      .lm-details-btn {
        border: 0; cursor: pointer; font-weight: 700; font-size: 0.85rem;
        padding: 8px 20px; border-radius: 99px;
        background: var(--cl-accent, #0284c7); color: #fff;
      }
      .lm-details-btn:hover { filter: brightness(1.08); }
    `];
  }
}

if (!customElements.get("soccer-live-last-match")) {
  customElements.define("soccer-live-last-match", SoccerLiveLastMatchCard);
}
