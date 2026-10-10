(()=>{"use strict";var t={374(t,e,a){a.r(e);var s=a(957),i=a(759),o=a(7),r=a(738);class n extends s.WF{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return o.yj}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}_t(t){return(0,i.t)(t,(0,i.$c)(this.hass,this._config))}get config(){return this._config}updated(t){t.has("hass")&&this._fetchEntities()}_entityChanged(t){(0,o.vD)(this,"entity",t.target.value)}_fetchEntities(){this.hass&&(this.entities=(0,o.J)(this.hass,{sensorTypes:["team_match","team_matches","team_matches_mixed"],includes:["soccerlive_next","soccer_live_next","soccerlive_all","soccer_live_all"]}))}render(){if(!this._config||!this.hass)return s.qy``;const t=this._config.entity||"",e=t&&this.entities.includes(t);return s.qy`
      <div class="card-config">
        <h3>${this._t("editor.sensor")}</h3>
        <div>
          <label class="field-label">Entity (team_match sensor — soccer_live_next_*)</label>
          <select @change=${this._entityChanged}>
            ${e?"":s.qy`<option value="${t}" selected>${t||this._t("editor.select")}</option>`}
            ${this.entities.map(e=>s.qy`<option value="${e}" ?selected=${e===t}>${e}</option>`)}
          </select>
          <div class="hint" style="margin-top: 4px;">${this._t("last_match.editor_hint")}</div>
        </div>

        <h3>${this._t("editor.settings")}</h3>
        <div>
          <label class="field-label">${this._t("editor.skin")}</label>
          ${(0,r.m)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
        <div>
          ${(0,o.YV)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
      </div>
    `}}customElements.get("soccer-live-last-match-editor")||customElements.define("soccer-live-last-match-editor",n)},24(t,e,a){a.r(e);var s=a(957),i=a(759),o=a(7),r=a(738);class n extends s.WF{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array},groups:{type:Array}}}constructor(){super(),this.entities=[],this.groups=[]}static get styles(){return o.yj}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}_t(t){return(0,i.t)(t,(0,i.$c)(this.hass,this._config))}get config(){return this._config}updated(t){t.has("hass")&&this._fetchEntities(),(t.has("_config")||t.has("hass"))&&this._config&&this._config.entity&&this._fetchGroups()}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(t){if(!this._config)return;const e=t.target.value;e!==this._config.entity&&this._fireConfigChanged({...this._config,entity:e})}_groupChanged(t){if(!this._config)return;const e=t.target.value;e!==this._config.selected_group&&this._fireConfigChanged({...this._config,selected_group:e})}_switchChanged(t){if(!this._config)return;const e=t.target;if(!e.dataset||!e.dataset.configValue)return;const a=e.dataset.configValue,s=e.checked;this._config[a]!==s&&this._fireConfigChanged({...this._config,[a]:s})}_selectChanged(t){if(!this._config)return;const e=t.target;if(!e.dataset||!e.dataset.configValue)return;const a=e.dataset.configValue,s=e.value;this._config[a]!==s&&this._fireConfigChanged({...this._config,[a]:s})}_numberChanged(t){if(!this._config)return;const e=t.target;if(!e.dataset||!e.dataset.configValue)return;const a=e.dataset.configValue,s=parseInt(e.value,10);isNaN(s)||this._config[a]!==s&&this._fireConfigChanged({...this._config,[a]:s})}_viewChanged(t){const e={...this._config};"race"===t.target.value?e.standings_view="race":delete e.standings_view,"race"===e.card_type&&(e.card_type="standings"),this._fireConfigChanged(e)}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter(t=>t.includes("soccerlive_standings")||t.includes("soccer_live_standings")).sort())}_fetchGroups(){const t=this._config&&this._config.entity;if(!this.hass||!t)return void(this.groups=[]);const e=this.hass.states[t];e&&e.attributes&&e.attributes.standings_groups?this.groups=e.attributes.standings_groups.map(t=>t.name):this.groups=[]}render(){if(!this._config||!this.hass)return s.qy``;const t=this._config.entity||"",e=t&&this.entities.includes(t);return s.qy`
      <div class="card-config">
        <h3>${this._t("editor.sensor")}</h3>
        <div>
          <label class="field-label">${this._t("editor.entity")}</label>
          <select @change=${this._entityChanged}>
            ${e?"":s.qy`<option value="${t}" selected>${t||this._t("editor.select")}</option>`}
            ${this.entities.map(e=>s.qy`
              <option value="${e}" ?selected=${e===t}>${e}</option>
            `)}
          </select>
        </div>

        <h3>${this._t("editor.settings")}</h3>
        <div>
          <label class="field-label">${this._t("editor.standings_mode")}</label>
          <select @change=${this._viewChanged}>
            <option value="table" ?selected=${"race"!==this._config.card_type&&"race"!==this._config.standings_view}>${this._t("editor.standings_table")}</option>
            <option value="race" ?selected=${"race"===this._config.card_type||"race"===this._config.standings_view}>${this._t("editor.standings_race")}</option>
          </select>
        </div>
        <div>
          <label class="field-label">${this._t("editor.standings_group")}</label>
          <select @change=${this._groupChanged}>
            <option value="" ?selected=${!this._config.selected_group}>— ${this._t("editor.all_groups")} —</option>
            ${this.groups.map(t=>s.qy`
              <option value="${t}" ?selected=${t===this._config.selected_group}>${t}</option>
            `)}
          </select>
        </div>

        <div class="option">
          <label>${this._t("editor.hide_header")}</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>${this._t("editor.show_event_toasts")}</label>
          <ha-switch
            .checked=${!0===this._config.show_event_toasts}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">${this._t("editor.max_teams")}</label>
          <input type="number" min="1" max="50"
            .value=${this._config.max_teams_visible||10}
            data-config-value="max_teams_visible" @change=${this._numberChanged} />
        </div>

        <div>
          <label class="field-label">${this._t("editor.my_team")}</label>
          <input type="text" placeholder="${this._t("editor.my_team_hint")}"
            .value=${this._config.highlight_team||this._config.my_team||""}
            @change=${t=>this._fireConfigChanged({...this._config,highlight_team:t.target.value,my_team:t.target.value})} />
        </div>

        <div class="option">
          <label>${this._t("editor.show_season_totals")}</label>
          <ha-switch .checked=${!1!==this._config.show_stats}
            data-config-value="show_stats" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_goals_per_team")}</label>
          <ha-switch .checked=${!0===this._config.show_goals_for}
            data-config-value="show_goals_for" @change=${this._switchChanged}></ha-switch>
        </div>

        <div class="option">
          <label>${this._t("editor.compact")}</label>
          <ha-switch .checked=${!0===this._config.compact_mode}
            data-config-value="compact_mode" @change=${this._switchChanged}></ha-switch>
        </div>

        ${this._config.compact_mode?s.qy`
          <div>
            <label class="field-label">${this._t("editor.top_n_teams")}</label>
            <input type="number" min="1" max="20"
              .value=${this._config.compact_top||5}
              data-config-value="compact_top" @change=${this._numberChanged} />
          </div>
          <div>
            <label class="field-label">${this._t("editor.bottom_n_teams")}</label>
            <input type="number" min="1" max="10"
              .value=${this._config.compact_bottom||3}
              data-config-value="compact_bottom" @change=${this._numberChanged} />
          </div>
        `:""}
        <div>
          <label class="field-label">${this._t("editor.skin")}</label>
          ${(0,r.m)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
        <div>
          ${(0,o.YV)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
      </div>
    `}}customElements.get("soccer-live-standings-editor")||customElements.define("soccer-live-standings-editor",n)},197(t,e,a){a.r(e);var s=a(957),i=a(7),o=a(759),r=a(738),n=a(257);class l extends s.WF{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return[i.yj,s.AH`.tri{display:inline-flex;border:1px solid var(--divider-color,rgba(127,127,127,0.3));border-radius:8px;overflow:hidden;flex-shrink:0;}.tri button{border:0;border-right:1px solid var(--divider-color,rgba(127,127,127,0.3));padding:6px 10px;font-size:12px;cursor:pointer;background:transparent;color:var(--primary-text-color);}.tri button:last-child{border-right:0;}.tri button.sel{background:var(--primary-color,#3b82f6);color:#fff;}`]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}get config(){return this._config}updated(t){t.has("hass")&&this._fetchEntities()}_t(t){return(0,o.t)(t,(0,o.$c)(this.hass,this._config))}_fireConfigChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(t){if(!this._config)return;const e=t.target.value;e!==this._config.entity&&this._fireConfigChanged({...this._config,entity:e})}_switchChanged(t){if(!this._config)return;const e=t.target;if(!e.dataset||!e.dataset.configValue)return;const a=e.dataset.configValue,s=e.checked;this._config[a]!==s&&this._fireConfigChanged({...this._config,[a]:s})}_selectChanged(t){if(!this._config)return;const e=t.target;if(!e.dataset||!e.dataset.configValue)return;const a=e.dataset.configValue,s=e.value;this._config[a]!==s&&this._fireConfigChanged({...this._config,[a]:s})}_triKeydown(t){const e=[...t.currentTarget.querySelectorAll("button")],a=e.indexOf(t.target),s=(0,n.lS)(a,e.length,t.key);s!==a&&(t.preventDefault(),e[s].focus(),e[s].click())}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter(t=>t.includes("soccerlive_next")||t.includes("soccer_live_next")||t.includes("soccerlive_all_mixed")||t.includes("soccer_live_all_mixed")||["team_match","team_matches_mixed"].includes(this.hass.states[t]?.attributes?.sensor_type)).sort())}render(){if(!this._config||!this.hass)return s.qy``;const t=this._config.entity||"",e=t&&this.entities.includes(t),a=(this.hass?.states?.[t]?.attributes?.card_defaults||{}).compact,o=this._config.compact;return s.qy`
      <div class="card-config">
        <h3>${this._t("editor.sensor")}</h3>
        <div>
          <label class="field-label">${this._t("editor.entity")}</label>
          <select @change=${this._entityChanged}>
            ${e?"":s.qy`<option value="${t}" selected>${t||this._t("editor.select")}</option>`}
            ${this.entities.map(e=>s.qy`
              <option value="${e}" ?selected=${e===t}>${e}</option>
            `)}
          </select>
        </div>

        <h3>${this._t("editor.section_match")}</h3>
        <div>
          <label class="field-label">${this._t("editor.my_team")}</label>
          <input type="text" placeholder="${this._t("editor.my_team_hint")}"
            .value=${this._config.my_team||""}
            @change=${t=>this._fireConfigChanged({...this._config,my_team:t.target.value})} />
        </div>
        <div class="option">
          <label>${this._t("editor.show_form_trend")}</label>
          <ha-switch .checked=${!0===this._config.show_form_trend}
            data-config-value="show_form_trend" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_previous_matches")}</label>
          <ha-switch .checked=${!0===this._config.show_previous_matches}
            data-config-value="show_previous_matches" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_weather")}</label>
          <ha-switch .checked=${!1!==this._config.show_weather}
            data-config-value="show_weather" @change=${this._switchChanged}></ha-switch>
        </div>
        <h3>${this._t("editor.section_prediction")}</h3>
        <div class="option">
          <label>${this._t("editor.show_prediction")}</label>
          <ha-switch .checked=${!1!==this._config.show_prediction}
            data-config-value="show_prediction" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_prediction_details")}</label>
          <ha-switch .checked=${!1!==this._config.show_prediction_details}
            data-config-value="show_prediction_details" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_odds")}</label>
          <ha-switch .checked=${!1!==this._config.show_odds}
            data-config-value="show_odds" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.show_injuries")}</label>
          <ha-switch .checked=${!1!==this._config.show_injuries}
            data-config-value="show_injuries" @change=${this._switchChanged}></ha-switch>
        </div>
        <h3>${this._t("editor.section_display")}</h3>
        <div class="option">
          <label>${this._t("editor.show_event_toasts")}</label>
          <ha-switch
            .checked=${!0===this._config.show_event_toasts}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.hide_broadcasts")}</label>
          <ha-switch .checked=${!0===this._config.hide_broadcasts} data-config-value="hide_broadcasts" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.hide_meta")}</label>
          <ha-switch .checked=${!0===this._config.hide_meta} data-config-value="hide_meta" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>${this._t("editor.compact")}</label>
          <div class="tri" role="radiogroup" aria-label=${this._t("editor.compact")} @keydown=${this._triKeydown}>
            <button type="button" role="radio" class=${void 0===o?"sel":""} aria-checked=${void 0===o} tabindex=${void 0===o?"0":"-1"}
              @click=${()=>{const t={...this._config};delete t.compact,this._fireConfigChanged(t)}}>
              ${this._t("editor.inherit")}${void 0!==a?` (${a?this._t("editor.on"):this._t("editor.off")})`:""}
            </button>
            <button type="button" role="radio" class=${!0===o?"sel":""} aria-checked=${!0===o} tabindex=${!0===o?"0":"-1"}
              @click=${()=>this._fireConfigChanged({...this._config,compact:!0})}>${this._t("editor.on")}</button>
            <button type="button" role="radio" class=${!1===o?"sel":""} aria-checked=${!1===o} tabindex=${!1===o?"0":"-1"}
              @click=${()=>this._fireConfigChanged({...this._config,compact:!1})}>${this._t("editor.off")}</button>
          </div>
        </div>
        <h3>${this._t("editor.appearance")}</h3>
        <div>
          ${(0,r.m)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
        <div>
          <label class="field-label">${this._t("editor.score_size")}</label>
          <select data-config-value="score_size" @change=${this._selectChanged}>
            <option value="normal" ?selected=${"normal"===(this._config.score_size||"normal")}>${this._t("editor.size_normal")}</option>
            <option value="big" ?selected=${"big"===this._config.score_size}>${this._t("editor.size_big")}</option>
            <option value="huge" ?selected=${"huge"===this._config.score_size}>${this._t("editor.size_huge")}</option>
          </select>
        </div>
        <div>
          ${(0,i.YV)(this,this._config,t=>this._t?this._t(t):t)}
        </div>
      </div>
    `}}customElements.get("soccer-live-team-editor")||customElements.define("soccer-live-team-editor",l)},7(t,e,a){a.d(e,{J:()=>c,Lz:()=>h,RJ:()=>u,YV:()=>g,sz:()=>d,vD:()=>l,wH:()=>m});var s=a(957);const i=s.AH`.card-config{display:flex;flex-direction:column;gap:16px;}.option{display:flex;align-items:center;justify-content:space-between;gap:12px;}label{font-size:14px;color:var(--primary-text-color);}.editor-section{margin-bottom:20px;}.editor-section h3{margin:12px 0 8px;font-size:13px;text-transform:uppercase;color:var(--secondary-text-color);}.editor-field{margin-bottom:12px;}.field-label{display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--secondary-text-color);}.field-hint{display:block;font-size:11px;color:var(--secondary-text-color);margin-top:2px;}select,input:not([type="checkbox"]),ha-entity-picker{width:100%;box-sizing:border-box;padding:10px 12px;font-size:14px;border-radius:8px;border:1px solid var(--divider-color,rgba(0,0,0,0.12));background:var(--card-background-color,#fff);color:var(--primary-text-color,#000);}select:focus,input:focus{outline:2px solid var(--primary-color,#03a9f4);outline-offset:-1px;}h3{margin:8px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--secondary-text-color);}.hint{font-size:12px;color:var(--secondary-text-color);}.field-info{background:rgba(33,150,243,0.1);border-left:3px solid var(--primary-color);padding:8px 12px;border-radius:2px;font-size:12px;margin-top:8px;}.field-warning{background:rgba(255,152,0,0.1);border-left:3px solid #ff9800;padding:8px 12px;border-radius:2px;font-size:12px;margin-top:8px;}`,o=[["en","English"],["nl","Nederlands"],["de","Deutsch"],["pt","Português"],["fr","Français"],["es","Español"],["it","Italiano"]],r=Object.fromEntries(o);function n(t,e){return"function"==typeof t._fireConfigChanged?t._fireConfigChanged(e):"function"==typeof t._fire?t._fire(e):(t._config=e,t.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),void t.requestUpdate?.())}function l(t,e,a,{removeEmpty:s=!1}={}){const i={...t?._config||{}};!s||""!==a&&null!=a?i[e]=a:delete i[e],n(t,i)}function c(t,{sensorTypes:e=[],includes:a=[]}={}){if(!t?.states)return[];const s=new Set(e);return Object.keys(t.states).filter(e=>{if(!e.startsWith("sensor."))return!1;const i=t.states[e]?.attributes?.sensor_type;return s.has(i)||a.some(t=>e.includes(t))}).sort()}function d(t,e,a){const i=t=>"function"==typeof a?a(t):t,o=e?.appearance||"ha";return s.qy`
    <div class="field-group">
      <label class="field-label">${i("skin.appearance")}</label>
      <select .value=${o} @change=${a=>{const s=a.target.value,i={...e,appearance:s};n(t,i)}}>
        <option value="ha" ?selected=${"ha"===o||!o}>${i("skin.appearance_ha")}</option>
        <option value="dark" ?selected=${"dark"===o}>${i("skin.appearance_dark")}</option>
        <option value="light" ?selected=${"light"===o}>${i("skin.appearance_light")}</option>
      </select>
    </div>
  `}const p=new Set(["classificacao","classificacao ligas","da configuracao","da sincronizacao","estado da configuracao","estado da sincronizacao","melhores marcadores","pontape de saida","proximo pontape de saida","quadro eliminatorio","todos os jogos","diagnosticos","resultados","noticias","standings","scorers","news"]);function h(t){if(!t?.states)return[];const e=new Map;for(const[a,s]of Object.entries(t.states)){if(!a.startsWith("sensor.soccer_live_")&&!a.startsWith("sensor.soccer_"))continue;const t=s?.attributes||{},i=t.sensor_type||"";if(["standings","top_scorers","bracket","news","match_day"].includes(i))continue;if(a.includes("standings")||a.includes("scorers")||a.includes("news")||a.includes("bracket"))continue;let o=t.team_name||t.team||"";if(!o&&t.friendly_name){const e=t.friendly_name.split(" - ");e.length>1&&!e[0].toLowerCase().includes("classifica")&&(o=e[0])}if(!o){const t=a.replace("sensor.soccer_live_","").replace("sensor.soccer_","").split("_");if(t.length>=3){const e=t.slice(2).join(" ");e.includes("standings")||e.includes("scorers")||e.includes("news")||(o=t.slice(2).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "))}}if(o&&o.length>=2){const t=o.trim(),s=t.toLowerCase();p.has(s)||s.includes("classifica")||s.includes("marcador")||s.includes("configuracao")||e.has(s)||e.set(s,{name:t,entity:a})}}return Array.from(e.values()).sort((t,e)=>t.name.localeCompare(e.name))}function u(t,e={}){const a={match_model:e.match_model||e.entity||"",standings_model:e.standings_model||e.standings_entity||"",scorers_model:e.scorers_model||"",last_match_model:e.last_match_model||"",news_model:e.news_model||"",bracket_model:e.bracket_model||"",club_model:e.club_model||""};if(!t?.states)return a;const s=e.match_model||e.entity||e.club_model||"",i=s?t.states[s]:null,o=e.team||i?.attributes?.team_name||i?.attributes?.team||"",r=i?.attributes?.league_id||i?.attributes?.league||"",n=t=>String(t||"").toLowerCase().replace(/[^a-z0-9]/g,""),l=n(o),c=n(r),d=s?n(s.replace("sensor.","").replace("soccer_live_","")):"";for(const[s,i]of Object.entries(t.states)){if(!s.startsWith("sensor."))continue;const t=i?.attributes?.sensor_type||"",o=n(s),r=n(i?.attributes?.team_name||i?.attributes?.team);(l&&(o.includes(l)||r.includes(l))||d&&o.includes(d)||c&&o.includes(c)||!0===e.auto_discover_models)&&(["team_matches_mixed","team_matches"].includes(t)||o.includes("all_mixed")||o.includes("todos")?a.match_model=s:a.match_model||"team_match"!==t?a.standings_model||"standings"!==t?a.last_match_model||"last_match"!==t&&!o.includes("last")||(a.last_match_model=s):a.standings_model=s:a.match_model=s)}if(!a.match_model){for(const[e,s]of Object.entries(t.states)){if(!e.startsWith("sensor."))continue;const t=s?.attributes?.sensor_type||"",i=e.toLowerCase();if(["team_matches_mixed","team_matches"].includes(t)||i.includes("all_mixed")||i.includes("todos")){a.match_model=e;break}}if(!a.match_model)for(const[e,s]of Object.entries(t.states))if(e.startsWith("sensor.")&&"team_match"===s?.attributes?.sensor_type){a.match_model=e;break}}if(!a.last_match_model)for(const[e,s]of Object.entries(t.states)){if(!e.startsWith("sensor."))continue;const t=s?.attributes?.sensor_type||"",i=e.toLowerCase();if("last_match"===t||i.includes("last")){a.last_match_model=e;break}}if(!a.standings_model)for(const[e,s]of Object.entries(t.states))if(e.startsWith("sensor.")&&"standings"===s?.attributes?.sensor_type){a.standings_model=e;break}return a}function g(t,e,a){const i=t=>"function"==typeof a?a(t):t,l=e?.entity||e?.entities&&e.entities[0],c=l&&t?.hass?.states?.[l]?.attributes?.card_defaults?.language,d=e?.language||"",p=c?`${r[c]||c} · ${i("skin.shared")}${m(t,e,i)}`:i("lang.auto");return s.qy`
    <label class="field-label">${i("editor.language")}</label>
    <select @change=${a=>{const s=a.target.value,i={...e};s?i.language=s:delete i.language,n(t,i)}}>
      <option value="" ?selected=${!d}>${p}</option>
      ${o.map(([t,e])=>s.qy`<option value="${t}" ?selected=${d===t}>${e}</option>`)}
    </select>
  `}function m(t,e,a){const s=e?.entities;if(!Array.isArray(s)||s.length<=1)return"";const i=s[0];if(!i)return"";const o=t?.hass?.states?.[i]?.attributes?.friendly_name||i;return` (${"function"==typeof a?a("skin.via"):"via"} ${o})`}a.d(e,["yj",0,i])},738(t,e,a){a.d(e,{m:()=>m});var s=a(957),i=a(257),o=a(179),r=a(7);const n={dark:"#12141f",light:"#f6f8fc"},l={dark:"#f4f6fb",light:"#0f172a"},c={dark:"#aab2c5",light:"#5a6472"},d=[["accent_color","skin.custom_accent"],["accent_2_color","skin.custom_accent_2"],["background_color","skin.custom_background"],["text_color","skin.custom_text"]],p=[["live_color","skin.custom_live"],["gold_color","skin.custom_gold"],["surface_color","skin.custom_surface"],["card_color","skin.custom_card"],["secondary_text_color","skin.custom_text_2"],["divider_color","skin.custom_divider"],["chip_color","skin.custom_chip"]],h=[...d,...p].map(([t])=>t).concat(["gradient_from","gradient_to","gradient_angle","background_image","watermark_opacity","watermark_size"]);function u(t,e){return"function"==typeof t._fireConfigChanged?t._fireConfigChanged(e):"function"==typeof t._fire?t._fire(e):(t._config=e,t.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),void t.requestUpdate?.())}function g(t,e,a,i,o){const r=t?.[e]||"",n=/^#[0-9a-f]{6}$/i.test(r)?r:"#6366f1";return s.qy`
    <label class="custom-skin-field">
      <span>${i(a)}</span>
      <input type="color" .value=${n} @input=${t=>o(e,t.target.value)}>
      <input type="text" .value=${r} placeholder="#6366f1" @change=${t=>o(e,t.target.value)}>
    </label>
  `}function m(t,e,a){const m=t=>"function"==typeof a?a(t):t,f=(a,s)=>u(t,{...e,[a]:s}),_=a=>{const s={...e};delete s[a],u(t,s)},b=(a,s)=>{const i={...e};""===s||null==s?delete i[a]:i[a]=s,u(t,i)},v=e?.entity||e?.entities&&e.entities[0],x=v&&t?.hass?.states?.[v]?.attributes?.card_defaults||{},y=(0,i.pV)(e,x),w=(0,i.J4)(y),$=(0,i.i5)(y),k="string"==typeof e?.appearance,C="string"==typeof e?.palette,S="string"==typeof e?.skin,z=(0,r.wH)(t,e,m),A=(t,e)=>{if(!t)return m("skin.default");const a=e.find(([e])=>e===t);return`${a?m(a[1]):t} · ${m("skin.shared")}${z}`},E=S?w:e?.appearance,q=S?$:e?.palette,M=a=>u(t,(0,i.EK)(e,w,$,a)),T=t=>{const e=[...t.currentTarget.querySelectorAll("button")],a=e.indexOf(t.target),s=(0,i.lS)(a,e.length,t.key);s!==a&&(t.preventDefault(),e[s].focus(),e[s].click())},P=[];if("custom"===$){const t=(0,o.GD)(e?.gradient_from),a=(0,o.GD)(e?.gradient_to),s=t&&a?[t,a]:[(0,o.GD)(e?.background_color)||n[w]].filter(Boolean);if(s.length){const t=(t,a,i)=>{const r=(0,o.GD)(e?.[t])||a;return!!r&&s.some(t=>{const e=(0,o.yN)(t,r);return null!==e&&e<i})};t("text_color",l[w],4.5)&&P.push("skin.custom_text"),t("secondary_text_color",c[w],4.5)&&P.push("skin.custom_text_2"),t("accent_color","#6366f1",3)&&P.push("skin.custom_accent")}}const L=!!(0,o.GD)(e?.gradient_from)!=!!(0,o.GD)(e?.gradient_to);return s.qy`
    <style>
      .skin-controls { display: grid; gap: 12px; }
      .skin-row > .skin-label { font-size: 12px; font-weight: 600; color: var(--secondary-text-color); margin-bottom: 6px; }
      .skin-seg { display: inline-flex; border: 1px solid var(--divider-color, rgba(255,255,255,0.14)); border-radius: 8px; overflow: hidden; }
      .skin-seg button {
        border: 0; padding: 7px 12px; font-size: 12px; cursor: pointer;
        background: transparent; color: var(--primary-text-color, #fff);
        border-right: 1px solid var(--divider-color, rgba(255,255,255,0.14));
      }
      .skin-seg button:last-child { border-right: 0; }
      .skin-seg button.sel { background: var(--primary-color, #3b82f6); color: #fff; }
      .skin-swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
      .skin-swatch {
        display: flex; align-items: center; gap: 7px; padding: 6px 8px; cursor: pointer;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.14)); border-radius: 8px;
        background: transparent; color: var(--primary-text-color, #fff); font-size: 11px; text-align: left;
      }
      .skin-swatch.sel { border-color: var(--primary-color, #3b82f6); box-shadow: 0 0 0 1px var(--primary-color, #3b82f6); }
      .skin-swatch .dot {
        width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
        border: 1px solid rgba(127,127,127,0.4);
      }
      .skin-swatch span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .custom-skin-fields {
        display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding: 10px;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.12)); border-radius: 8px; background: rgba(127,127,127,0.08);
      }
      .custom-skin-field { display: grid; grid-template-columns: auto 34px; gap: 6px; align-items: center; min-width: 0; }
      .custom-skin-field span { grid-column: 1 / -1; font-size: 11px; font-weight: 700; color: var(--secondary-text-color); }
      .custom-skin-field input[type="color"] { width: 34px; height: 34px; padding: 0; border-radius: 6px; border: 1px solid var(--divider-color, rgba(255,255,255,0.12)); background: transparent; }
      .custom-skin-field input[type="text"] { min-width: 0; width: 100%; box-sizing: border-box; padding: 8px 9px; border-radius: 6px; border: 1px solid var(--divider-color, rgba(255,255,255,0.12)); background: var(--card-background-color, #1c1c1c); color: var(--primary-text-color, #fff); font-size: 13px; }
      .skin-adv { margin-top: 8px; }
      .skin-adv summary { cursor: pointer; font-size: 12px; font-weight: 600; color: var(--secondary-text-color); margin: 4px 0 8px; }
      .skin-warn { display: flex; gap: 6px; align-items: center; margin-top: 8px; font-size: 12px; color: var(--warning-color, #f59e0b); }
      .skin-bg-title { font-size: 11px; font-weight: 700; color: var(--secondary-text-color); margin: 10px 0 6px; }
      .skin-bg-field { display: grid; gap: 4px; margin-top: 8px; }
      .skin-bg-field span { font-size: 11px; font-weight: 600; color: var(--secondary-text-color); }
      .skin-bg-field input, .skin-bg-field select { padding: 8px 9px; border-radius: 6px; border: 1px solid var(--divider-color, rgba(255,255,255,0.12)); background: var(--card-background-color, #1c1c1c); color: var(--primary-text-color, #fff); font-size: 13px; box-sizing: border-box; }
      .skin-hint { font-size: 10px; color: var(--secondary-text-color); opacity: 0.8; }
      .skin-hint-warn { color: var(--warning-color, #f59e0b); opacity: 1; margin-top: 6px; }
      .skin-reset { margin-top: 10px; justify-self: start; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--divider-color, rgba(255,255,255,0.12)); background: transparent; color: var(--primary-text-color, #fff); font-size: 12px; cursor: pointer; }
      @media (max-width: 520px) { .custom-skin-fields { grid-template-columns: 1fr; } }
    </style>
    <div class="skin-controls">
      <div class="skin-row">
        <div class="skin-label">${m("skin.appearance")}</div>
        <div class="skin-seg" role="radiogroup" aria-label=${m("skin.appearance")} @keydown=${T}>
          ${S?"":s.qy`
            <button type="button" role="radio" class=${k?"":"sel"} aria-checked=${!k} tabindex=${k?"-1":"0"} @click=${()=>_("appearance")}>${A(x.appearance,i.kW)}</button>
          `}
          ${i.kW.map(([t,e])=>s.qy`
            <button type="button" role="radio" class=${E===t?"sel":""} aria-checked=${E===t} tabindex=${E===t?"0":"-1"} @click=${()=>(t=>S?M({appearance:t}):f("appearance",t))(t)}>${m(e)}</button>
          `)}
        </div>
      </div>
      <div class="skin-row">
        <div class="skin-label">${m("skin.palette")}</div>
        <div class="skin-swatches" role="radiogroup" aria-label=${m("skin.palette")} @keydown=${T}>
          ${S?"":s.qy`
            <button type="button" role="radio" class="skin-swatch ${C?"":"sel"}" aria-checked=${!C} tabindex=${C?"-1":"0"} @click=${()=>_("palette")}>
              <span class="dot" style="background:${x.palette&&i.rH[x.palette]?`linear-gradient(135deg, ${i.rH[x.palette][0]} 50%, ${i.rH[x.palette][1]} 50%)`:"repeating-linear-gradient(135deg,#888 0 4px,#aaa 4px 8px)"}"></span>
              <span>${A(x.palette,i.HX)}</span>
            </button>
          `}
          ${i.HX.map(([t,e])=>{const[a,o]=i.rH[t]||["#6366f1","#ec4899"];return s.qy`
              <button type="button" role="radio" class="skin-swatch ${q===t?"sel":""}" aria-checked=${q===t} tabindex=${q===t?"0":"-1"} title=${m(e)} @click=${()=>(t=>S?M({palette:t}):f("palette",t))(t)}>
                <span class="dot" style="background:linear-gradient(135deg, ${a} 50%, ${o} 50%)"></span>
                <span>${m(e)}</span>
              </button>
            `})}
        </div>
      </div>
      ${"custom"===$?s.qy`
        <div>
          <div class="custom-skin-fields">
            ${d.map(([t,a])=>g(e,t,a,m,b))}
          </div>
          ${P.length?s.qy`<div class="skin-warn">⚠️ ${m("skin.contrast_warning")}: ${P.map(t=>m(t)).join(", ")}</div>`:""}
          <details class="skin-adv">
            <summary>${m("skin.advanced")}</summary>
            <div class="custom-skin-fields">
              ${p.map(([t,a])=>g(e,t,a,m,b))}
            </div>
            <div class="skin-bg-title">${m("skin.background")}</div>
            <div class="custom-skin-fields">
              ${g(e,"gradient_from","skin.gradient_from",m,b)}
              ${g(e,"gradient_to","skin.gradient_to",m,b)}
            </div>
            ${L?s.qy`<div class="skin-hint skin-hint-warn">${m("skin.gradient_incomplete")}</div>`:""}
            <label class="skin-bg-field">
              <span>${m("skin.gradient_angle")}</span>
              <input type="number" min="0" max="360" step="5" .value=${e?.gradient_angle??""} placeholder="135"
                @change=${t=>b("gradient_angle",""===t.target.value?"":Math.max(0,Math.min(360,Number(t.target.value))))}>
            </label>
            <label class="skin-bg-field">
              <span>${m("skin.watermark_url")}</span>
              <input type="text" .value=${e?.background_image||""} placeholder="/local/crest.png"
                title=${m("skin.watermark_url_hint")}
                @change=${t=>b("background_image",t.target.value.trim())}>
              <span class="skin-hint">${m("skin.watermark_url_hint")}</span>
            </label>
            <label class="skin-bg-field">
              <span>${m("skin.watermark_opacity")}</span>
              <input type="number" min="0" max="1" step="0.01" .value=${e?.watermark_opacity??""} placeholder="0.07"
                @change=${t=>b("watermark_opacity",""===t.target.value?"":Math.max(0,Math.min(1,Number(t.target.value))))}>
            </label>
            <label class="skin-bg-field">
              <span>${m("skin.watermark_size")}</span>
              <select @change=${t=>b("watermark_size",t.target.value)}>
                ${["","40%","60%","80%","contain"].map(t=>s.qy`
                  <option value="${t}" ?selected=${(e?.watermark_size||"")===t}>${t||m("skin.default")}</option>`)}
              </select>
            </label>
          </details>
          <button type="button" class="skin-reset" @click=${()=>{const a={...e};for(const t of h)delete a[t];u(t,a)}}>${m("skin.custom_reset")}</button>
        </div>
      `:""}
    </div>
  `}},759(t,e,a){a.d(e,{$c:()=>i,DK:()=>l,IU:()=>c,iS:()=>n,n1:()=>r,t:()=>o});const s={pt:{"card.team":"Próximo Jogo","card.standings":"Classificação","card.last_match":"Último Jogo","match.vs":"VS","match.draw":"Empate","time.now":"Agora","time.tomorrow":"Amanhã","time.in_n_min":"em {n} min","time.in_n_h":"em {n} h","time.in_n_d":"em {n} dias","time.in_duration":"em {value}","status.live":"AO VIVO","status.finished":"Terminado","status.scheduled":"Agendado","status.full_time":"Fim do Jogo","form.W":"V","form.D":"E","form.L":"D","team.top_scorer":"Melhor Marcador","team.possession":"Posse de bola","team.xg":"Golos Esperados (xG)","team.shots":"Remates","team.on_target":"Remates à baliza","team.fouls":"Faltas","team.form_trend":"Forma","team.previous_matches":"Jogos Anteriores","team.upcoming_matches":"Próximos Jogos","team.h2h":"Confronto Direto (H2H)","team.off_season":"Período de inter-época","popup.match_details":"Detalhes do Jogo","popup.h2h":"Confronto Direto","event.goal":"Golo","event.yellow_card":"Cartão Amarelo","event.red_card":"Cartão Vermelho","generic.close":"Fechar","col.pos":"#","col.team":"EQUIPA","col.played":"J","col.wins":"V","col.draws":"E","col.losses":"D","col.gd":"+/-","col.points":"PTS","col.goal_diff":"DG","col.form":"Forma","ui.loading":"A carregar...","ui.open_editor_to_configure":"Abre o editor visual para configurar o cartão","generic.unknown_entity":"Entidade desconhecida","ui.no_standings_data":"Sem dados de classificação disponíveis","ui.entity_not_found":"Entidade não encontrada","ui.sensor_unavailable":"Sensor indisponível","ui.sensor_unavailable_hint":"O sensor de futebol não está a responder","ui.loading_timeout":"Tempo esgotado ao carregar","ui.entity_not_responding":"Entidade sem resposta","ui.wrong_entity_type":"Tipo de entidade incorreto","ui.off_season":"Fora de época","standings.preseason":"Época {season} (Pré-época)","standings.stats":"jogos disputados","standings.goals":"golos","standings.compact_hidden":"equipas ocultas","editor.whole_card":"Configurações Globais do Cartão","editor.whole_card_desc":"Estas opções aplicam-se a todos os módulos","editor.card_title":"Título do Cartão","editor.layout_mode":"Modo de Visualização","editor.layout_tabs":"Abas (Navegação Superior / Inferior)","editor.layout_stack":"Lista Vertical (Empilhado)","editor.selected_content":"Módulos Selecionados","editor.selected_content_desc":"Reordena, adiciona ou remove módulos","editor.add_module":"Adicionar Módulo","editor.choose_content":"Escolher conteúdo...","editor.editing_module":"A Editar Módulo {current} de {total}","editor.editing_module_desc":"Personaliza o título e entidade deste módulo","editor.module_title":"Título do Módulo","editor.entity":"Entidade (Sensor)","editor.duplicate_module":"Duplicar Módulo","editor.remove_module":"Remover Módulo","skin.appearance_ha":"Automático (Tema Home Assistant)","skin.appearance_light":"Claro (Light)","skin.appearance_dark":"Escuro (Dark)","skin.palette_team":"Cores Padrão","skin.palette_blue":"Azul Royal","skin.palette_custom":"Personalizado"},en:{"card.team":"Next Match","card.standings":"Standings","card.last_match":"Last Match","match.vs":"VS","match.draw":"Draw","time.now":"Now","time.tomorrow":"Tomorrow","time.in_n_min":"in {n} min","time.in_n_h":"in {n} h","time.in_n_d":"in {n} days","time.in_duration":"in {value}","status.live":"LIVE","status.finished":"Finished","status.scheduled":"Scheduled","status.full_time":"Full Time","form.W":"W","form.D":"D","form.L":"L","team.top_scorer":"Top Scorer","team.possession":"Possession","team.xg":"Expected Goals (xG)","team.shots":"Shots","team.on_target":"Shots on target","team.fouls":"Fouls","team.form_trend":"Form","team.previous_matches":"Previous Matches","team.upcoming_matches":"Upcoming Matches","team.h2h":"Head-to-Head (H2H)","team.off_season":"Off season","popup.match_details":"Match Details","popup.h2h":"Head-to-Head","event.goal":"Goal","event.yellow_card":"Yellow Card","event.red_card":"Red Card","generic.close":"Close","col.pos":"#","col.team":"TEAM","col.played":"P","col.wins":"W","col.draws":"D","col.losses":"L","col.gd":"+/-","col.points":"PTS","col.goal_diff":"GD","col.form":"Form","ui.loading":"Loading...","ui.open_editor_to_configure":"Open the visual editor to configure the card","generic.unknown_entity":"Unknown entity","ui.no_standings_data":"No standings data available","ui.entity_not_found":"Entity not found","ui.sensor_unavailable":"Sensor unavailable","ui.sensor_unavailable_hint":"Soccer sensor is not responding","ui.loading_timeout":"Loading timeout","ui.entity_not_responding":"Entity not responding","ui.wrong_entity_type":"Incorrect entity type","ui.off_season":"Off season","standings.preseason":"Season {season} (Pre-season)","standings.stats":"matches played","standings.goals":"goals","standings.compact_hidden":"hidden teams","editor.whole_card":"Card Settings","editor.whole_card_desc":"These settings apply to every module","editor.card_title":"Card Title","editor.layout_mode":"Layout Mode","editor.layout_tabs":"Tabs (Two-tier Navigation)","editor.layout_stack":"Vertical Stack","editor.selected_content":"Selected Modules","editor.selected_content_desc":"Reorder, add, or remove modules","editor.add_module":"Add Module","editor.choose_content":"Choose content...","editor.editing_module":"Editing Module {current} of {total}","editor.editing_module_desc":"Customize title and entity for this module","editor.module_title":"Module Title","editor.entity":"Entity (Sensor)","editor.duplicate_module":"Duplicate Module","editor.remove_module":"Remove Module","skin.appearance_ha":"Automatic (Home Assistant Theme)","skin.appearance_light":"Light","skin.appearance_dark":"Dark","skin.palette_team":"Default Colors","skin.palette_blue":"Royal Blue","skin.palette_custom":"Custom"}};function i(t,e){return e&&e.language?e.language.toLowerCase():(t?.locale?.language||t?.language||"pt").split("-")[0].toLowerCase()}function o(t,e="pt",a={}){const i=s[e]?e:s.pt?"pt":"en";let o=s[i]?.[t]||s.en?.[t]||t;if(o===t){if("match.vs"===t)return"VS";if("time.in_n_h"===t)return"em {n} h";if("time.in_n_min"===t)return"em {n} min";if("time.in_n_d"===t)return"em {n} dias";if("time.now"===t)return"Agora";if("time.tomorrow"===t)return"Amanhã";if("time.in_duration"===t)return"em {value}";if("status.live"===t)return"AO VIVO";if("status.finished"===t)return"Terminado";if("status.scheduled"===t)return"Agendado"}for(const[t,e]of Object.entries(a))o=o.replace(new RegExp(`\\{${t}\\}`,"g"),String(e));return o}function r(t){if(!t)return null;const e=new Date(t);return isNaN(e.getTime())?null:e}function n(t,e="pt"){const a=r(t);return a?a.toLocaleDateString("pt"===e?"pt-PT":"en-US",{day:"2-digit",month:"2-digit",year:"numeric"}):t||""}function l(t,e="pt"){const a=r(t);return a?`${a.toLocaleDateString("pt"===e?"pt-PT":"en-US",{day:"2-digit",month:"2-digit",year:"numeric"})} ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:t||""}function c(t,e="pt"){const a=r(t);return a?`${a.toLocaleDateString("pt"===e?"pt-PT":"en-US",{weekday:"long"})} ${a.toLocaleDateString("pt"===e?"pt-PT":"en-US",{day:"2-digit",month:"2-digit",year:"numeric"})} ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:t||""}},179(t,e,a){function s(t){if("string"!=typeof t)return null;const e=t.trim();return/^#[0-9a-f]{3}$/i.test(e)?`#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`.toLowerCase():/^#[0-9a-f]{6}$/i.test(e)?e.toLowerCase():/^[0-9a-f]{6}$/i.test(e)?`#${e.toLowerCase()}`:/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(e)?e:null}function i(t){return/^#[0-9a-f]{6}$/i.test(t)?[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)].join(","):null}function o(t){if(!/^#[0-9a-f]{6}$/i.test(t))return null;const e=t=>{const e=t/255;return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)},[a,s,i]=function(t){return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)]}(t);return.2126*e(a)+.7152*e(s)+.0722*e(i)}function r(t,e){const a=o(t),s=o(e);return null===a||null===s?null:(Math.max(a,s)+.05)/(Math.min(a,s)+.05)}function n(t){if(""===t||null==t)return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function l(t){const e="string"==typeof t?t.trim():"";return/^(contain|cover|\d{1,3}%|\d{1,4}px)$/i.test(e)?e:null}function c(t){const e="string"==typeof t?t.trim():"";return e&&/^(\/local\/|https?:\/\/|data:image\/)/i.test(e)?e:null}a.d(e,{GD:()=>s,LX:()=>n,_R:()=>i,tS:()=>c,yN:()=>r,zg:()=>l}),new Set(["to top","to bottom","to left","to right","to top left","to top right","to bottom left","to bottom right","to left top","to right top","to left bottom","to right bottom"])},257(t,e,a){a.d(e,{EK:()=>p,J4:()=>r,JL:()=>l,Oc:()=>d,i5:()=>n,lS:()=>h,pV:()=>c});const s=["ha","light","dark"],i=["team","blue","custom"],o={dark:{appearance:"dark",palette:"blue"},light:{appearance:"light",palette:"blue"},auto:{appearance:"ha",palette:"team"},ha:{appearance:"ha",palette:"team"}};function r(t){const e=t&&"string"==typeof t.appearance?t.appearance.toLowerCase():"";if(s.includes(e))return e;const a=t?.skin?o[t.skin.toLowerCase()]:null;return a?a.appearance:"ha"}function n(t){const e=t&&"string"==typeof t.palette?t.palette.toLowerCase():"";if(i.includes(e))return e;const a=t?.skin?o[t.skin.toLowerCase()]:null;return a?a.palette:"blue"}function l(t){return"custom"===t||"team"===t}function c(t,e){const a=t||{};if(!e||"object"!=typeof e)return a;const s={...a};return null==a.appearance&&e.appearance&&(s.appearance=e.appearance),null==a.palette&&e.palette&&(s.palette=e.palette),s}function d(t,e){return t&&void 0!==t.compact?!0===t.compact:!(!e||!0!==e.compact)}function p(t,e,a,s){const i={...t||{},appearance:e,palette:a,...s||{}};return delete i.skin,i}function h(t,e,a){return e<=0?t:"Home"===a?0:"End"===a?e-1:t<0?t:"ArrowRight"===a||"ArrowDown"===a?(t+1)%e:"ArrowLeft"===a||"ArrowUp"===a?(t-1+e)%e:t}a.d(e,["HX",0,[["team","skin.palette_team"],["blue","skin.palette_blue"],["custom","skin.palette_custom"]],"kW",0,[["ha","skin.appearance_ha"],["light","skin.appearance_light"],["dark","skin.appearance_dark"]],"rH",0,{team:["#0284c7","#0f172a"],blue:["#0284c7","#0f172a"],custom:["#0284c7","#0f172a"]}])},957(t,e,a){a.d(e,{WF:()=>ht,AH:()=>l,qy:()=>U,XX:()=>dt});const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;class n{constructor(t,e,a){if(this._$cssResult$=!0,a!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const a=void 0!==e&&1===e.length;a&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&r.set(e,t))}return t}toString(){return this.cssText}}const l=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,a,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new n(a,t,o)},c=(t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const a of e){const e=document.createElement("style"),i=s.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=a.cssText,t.appendChild(e)}},d=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const a of t.cssRules)e+=a.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:p,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:g,getOwnPropertySymbols:m,getPrototypeOf:f}=Object,_=globalThis,b=_.trustedTypes,v=b?b.emptyScript:"",x=_.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=null!==t;break;case Number:a=null===t?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch(t){a=null}}return a}},$=(t,e)=>!p(t,e),k={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const a=Symbol(),s=this.getPropertyDescriptor(t,a,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,a){const{get:s,set:i}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);i?.call(this,e),this.requestUpdate(t,o,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...g(t),...m(t)];for(const a of e)this.createProperty(a,t[a])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const a=this._$Eu(t,e);void 0!==a&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const t of a)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const a=e.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const a of e.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,a){this._$AK(t,a)}_$ET(t,e){const a=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,a);if(void 0!==s&&!0===a.reflect){const i=(void 0!==a.converter?.toAttribute?a.converter:w).toAttribute(e,a.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const a=this.constructor,s=a._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=a.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const o=i.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,a,s=!1,i){if(void 0!==t){const o=this.constructor;if(!1===s&&(i=this[t]),a??=o.getPropertyOptions(t),!((a.hasChanged??$)(i,e)||a.useDefault&&a.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,a))))return;this.C(t,e,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:a,reflect:s,wrapped:i},o){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==i||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||a||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,a]of t){const{wrapped:t}=a,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,a,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[y("elementProperties")]=new Map,C[y("finalized")]=new Map,x?.({ReactiveElement:C}),(_.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,z=t=>t,A=S.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,q="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,P=`<${T}>`,L=document,j=()=>L.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,B=/>/g,F=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,V=/"/g,G=/^(?:script|style|textarea|title)$/i,R=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),U=R(1),J=(R(2),R(3),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),Z=new WeakMap,X=L.createTreeWalker(L,129);function Y(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Q=(t,e)=>{const a=t.length-1,s=[];let i,o=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<a;e++){const a=t[e];let n,l,c=-1,d=0;for(;d<a.length&&(r.lastIndex=d,l=r.exec(a),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=I:void 0!==l[1]?r=B:void 0!==l[2]?(G.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=F):void 0!==l[3]&&(r=F):r===F?">"===l[0]?(r=i??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?F:'"'===l[3]?V:W):r===V||r===W?r=F:r===I||r===B?r=O:(r=F,i=void 0);const p=r===F&&t[e+1].startsWith("/>")?" ":"";o+=r===O?a+P:c>=0?(s.push(n),a.slice(0,c)+q+a.slice(c)+M+p):a+M+(-2===c?e:p)}return[Y(t,o+(t[a]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class tt{constructor({strings:t,_$litType$:e},a){let s;this.parts=[];let i=0,o=0;const r=t.length-1,n=this.parts,[l,c]=Q(t,e);if(this.el=tt.createElement(l,a),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(q)){const e=c[o++],a=s.getAttribute(t).split(M),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:i,name:r[2],strings:a,ctor:"."===r[1]?ot:"?"===r[1]?rt:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:i}),s.removeAttribute(t));if(G.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let a=0;a<e;a++)s.append(t[a],j()),X.nextNode(),n.push({type:2,index:++i});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===T)n.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)n.push({type:7,index:i}),t+=M.length-1}i++}}static createElement(t,e){const a=L.createElement("template");return a.innerHTML=t,a}}function et(t,e,a=t,s){if(e===J)return e;let i=void 0!==s?a._$Co?.[s]:a._$Cl;const o=N(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(t),i._$AT(t,a,s)),void 0!==s?(a._$Co??=[])[s]=i:a._$Cl=i),void 0!==i&&(e=et(t,i._$AS(t,e.values),i,s)),e}class at{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:a}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);X.currentNode=s;let i=X.nextNode(),o=0,r=0,n=a[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new st(i,i.nextSibling,this,t):1===n.type?e=new n.ctor(i,n.name,n.strings,this,t):6===n.type&&(e=new lt(i,this,t)),this._$AV.push(e),n=a[++r]}o!==n?.index&&(i=X.nextNode(),o++)}return X.currentNode=L,s}p(t){let e=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(t,a,e),e+=a.strings.length-2):a._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,a,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=a,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:a}=t,s="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=tt.createElement(Y(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new at(s,this),a=t.u(this.options);t.p(e),this.T(a),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new tt(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let a,s=0;for(const i of t)s===e.length?e.push(a=new st(this.O(j()),this.O(j()),this,this.options)):a=e[s],a._$AI(i),s++;s<e.length&&(this._$AR(a&&a._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,a,s,i){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=K}_$AI(t,e=this,a,s){const i=this.strings;let o=!1;if(void 0===i)t=et(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==J,o&&(this._$AH=t);else{const s=t;let r,n;for(t=i[0],r=0;r<i.length-1;r++)n=et(this,s[a+r],e,r),n===J&&(n=this._$AH[r]),o||=!N(n)||n!==this._$AH[r],n===K?t=K:t!==K&&(t+=(n??"")+i[r+1]),this._$AH[r]=n}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends it{constructor(t,e,a,s,i){super(t,e,a,s,i),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??K)===J)return;const a=this._$AH,s=t===K&&a!==K||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,i=t!==K&&(a===K||s);s&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class lt{constructor(t,e,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const ct=S.litHtmlPolyfillSupport;ct?.(tt,st),(S.litHtmlVersions??=[]).push("3.3.3");const dt=(t,e,a)=>{const s=a?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=a?.renderBefore??null;s._$litPart$=i=new st(e.insertBefore(j(),t),t,void 0,a??{})}return i._$AI(t),i},pt=globalThis;class ht extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=dt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}ht._$litElement$=!0,ht.finalized=!0,pt.litElementHydrateSupport?.({LitElement:ht});const ut=pt.litElementPolyfillSupport;ut?.({LitElement:ht}),(pt.litElementVersions??=[]).push("4.2.2")}};const e={};function a(s){const i=e[s];if(void 0!==i)return i.exports;const o=e[s]={exports:{}};return t[s](o,o.exports,a),o.exports}a.d=(t,e)=>{if(Array.isArray(e))for(var s=0;s<e.length;){var i=e[s++],o=e[s++],r=0===o?{enumerable:!0,value:e[s++]}:{enumerable:!0,get:o};a.o(t,i)||Object.defineProperty(t,i,r)}else for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},a.o=(t,e)=>Object.hasOwn(t,e),a.r=t=>{Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s=a(957),i=a(759);const o=new Set(["","N/A","n/a","unknown","Unknown"]);function r(t){return null!=t&&("string"==typeof t?!o.has(t.trim()):Array.isArray(t)?t.length>0:"object"!=typeof t||Object.keys(t).length>0)}function n(t){return String(t||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\b(fc|cf|sc|afc|club|football|voetbal|rotterdam)\b/g,"").replace(/[^a-z0-9]+/g,"")}function l(t,e){const a=n(t),s=n(e);return Boolean(a&&s&&(a===s||a.includes(s)||s.includes(a)))}function c(t){return String(t?.date_iso||t?.date||"").slice(0,10)}function d(t,e){if(!t||!e)return!1;if(null!=t.event_id&&null!=e.event_id&&String(t.event_id)===String(e.event_id))return!0;const a=c(t),s=c(e);return Boolean(a&&s&&a===s&&l(t.home_team,e.home_team)&&l(t.away_team,e.away_team))}function p(t,e){if(t===e)return!0;if("object"==typeof t||"object"==typeof e)try{return JSON.stringify(t)===JSON.stringify(e)}catch(t){return!1}return String(t)===String(e)}function h(t){const e=String(t||"").toUpperCase().trim();if("HT"===e)return 45;const a=e.match(/\d+/g)?.map(Number)||[];return a.length?a.reduce((t,e)=>t+e,0):-1}function u(t){const e=Number(t?.home_score),a=Number(t?.away_score);return Number.isFinite(e)&&Number.isFinite(a)?e+a:-1}function g(t){const e=String(t?.state||"").toLowerCase();return"post"===e?1e3:"in"===e||"live"===e?100+Math.max(0,h(t?.clock)):0}function m(t){if(!t||g(t)<100||g(t)>=1e3)return t;const e=h(t.clock),a=function(t){return(Array.isArray(t?.key_events)?t.key_events:[]).reduce((t,e)=>Math.max(t,h(e?.minute??e?.clock)),-1)}(t);return e<0||a<=e?t:{...t,clock:"",stale_clock:t.clock}}function f(t,e,a,s,i,o){if(!t||"object"!=typeof t||Array.isArray(t))return t;if(!e||"object"!=typeof e||Array.isArray(e))return t;const n={...t};for(const[t,l]of Object.entries(e)){const e=a?`${a}.${t}`:t,c=n[t];!r(c)&&r(l)?(n[t]=l,s[e]=o):!r(c)||!r(l)||p(c,l)||"object"!=typeof c||Array.isArray(c)||"object"!=typeof l||Array.isArray(l)?r(c)&&r(l)&&!p(c,l)&&["home_score","away_score","state","status","period","clock","date_iso","venue"].includes(t)&&i.push({field:e,primary:c,secondary:l}):n[t]=f(c,l,e,s,i,o)}return n}function _(t,e,a="primary",s="secondary"){if(!e||!d(t,e))return t;const i={},o=[];let n=f(t,e,"",i,o,s);return n=function(t,e,a,s,i){const o=g(e),n=g(a),l=n>o,c=n>=100&&u(a)>u(e);if(!l&&!c)return t;const d={...t},p=[...l?["state","status","period","clock"]:[],"home_score","away_score"];for(const t of p)r(a[t])&&(d[t]=a[t],s[t]=i);return d}(n,t,e,i,s),{...n,source_provenance:{...t.source_provenance||{},...i},source_conflicts:[...t.source_conflicts||[],...o],source_providers:[...new Set([...t.source_providers||[],a,s].filter(Boolean))]}}const b={schedule:["date","date_iso","venue","competition_name","league_name","broadcasts"],preview:["head_to_head","prediction","odds","injuries_home","injuries_away","weather"],lineup:["lineup_home","lineup_away","formation_home","formation_away"],timeline:["key_events","match_details"],statistics:["home_statistics","away_statistics","momentum","shotmap"],review:["review","player_of_the_match","team_of_the_match","match_story"]};function v(t,e,a,s,i){const o=t?.source_provenance||{};return Object.fromEntries(Object.entries(b).map(([n,l])=>{const c=Object.keys(o),d=l.filter(t=>c.some(e=>e===t||e.startsWith(`${t}.`))),p=d.length>0,h=l.some(e=>r(t?.[e])),u=l.some(e=>r(t?.[e])&&!d.includes(e));return[n,{available:h,provider:p&&u?`${e} + ${a}`:p?a:e,updated_at:p?i:s,enriched:p}]}))}function x(t,e){return e.find(e=>d(t,e))}function y(t,e){const a=e?.entity,s=t?.states?.[a];if(!t?.states||!a||!s)return t;const i=[e?.enrichment_entity,...Array.isArray(e?.supplementary_entities)?e.supplementary_entities:[]].filter(Boolean);!i.length&&e?.auto_enrichment&&i.push(function(t,e){const a=e?.entity,s=t?.states?.[a];if(!s)return"";const i=s.attributes||{},o=i.matches||[],r=new Set(o.map(c).filter(Boolean)),n=new Set(o.map(t=>String(t?.event_id||"")).filter(Boolean)),l=i.provider,p=Object.entries(t.states).filter(([t,e])=>t!==a&&t.startsWith("sensor.")&&e?.attributes&&e.attributes.provider&&e.attributes.provider!==l&&Array.isArray(e.attributes.matches)&&e.attributes.matches.some(t=>r.has(c(t))||n.has(String(t?.event_id||"")))).map(([t,e])=>{const a=e.attributes.matches;return{id:t,score:100*o.reduce((t,e)=>t+(a.some(t=>d(e,t))?1:0),0)+w(e.attributes)}}).filter(t=>t.score>=100).sort((t,e)=>e.score-t.score||t.id.localeCompare(e.id));return p[0]?.id||""}(t,e));const o=[...new Set(i)].filter(e=>e&&e!==a&&t?.states?.[e]),n=o.reduce((e,a)=>function(t,e){const a=t||{},s=e||{},i=a.provider||"primary",o=s.provider||"secondary",n=s.matches||[],l=a.last_successful_update||a.data_quality?.updated_at,c=s.last_successful_update||s.data_quality?.updated_at,p=(a.matches||[]).map(t=>{const e=_(t,x(t,n),i,o);return{...e,source_sections:v(e,i,o,l,c)}}),h=f(a,s,"",{},[],o),u=r(a.detail_service)?a:r(s.detail_service)?s:null;u&&(h.detail_service=u.detail_service,Object.prototype.hasOwnProperty.call(u,"detail_service_data")?h.detail_service_data=u.detail_service_data:delete h.detail_service_data),a.matches&&(h.matches=p);for(const t of["next_match","current_match"]){if(!a[t])continue;const e=s[t]&&d(a[t],s[t])&&s[t]||x(a[t],n),r=_(a[t],e,i,o);h[t]={...r,source_sections:v(r,i,o,l,c)}}const g=p.reduce((t,e)=>t+Object.keys(e.source_provenance||{}).length,0),m=p.reduce((t,e)=>t+(e.source_conflicts||[]).length,0);return h.source_blend={primary:i,secondary:o,enriched_fields:g,conflicts:m},h}(e,t.states[a].attributes),function(t){const e=t||{},a={...e};Array.isArray(e.matches)&&(a.matches=e.matches.map(m));for(const t of["next_match","current_match"])e[t]&&(a[t]=m(e[t]));return a}(s.attributes)),l=Object.create(t.states);l[a]={...s,attributes:{...n,source_blend:{...n.source_blend||{},primary:s.attributes.provider||"primary",supplementary_entities:o}}};const p=Object.create(t);return Object.defineProperty(p,"states",{configurable:!0,enumerable:!0,value:l}),p}function w(t){return(t?.matches||[]).reduce((t,e)=>t+["key_events","lineup_home","home_statistics","head_to_head","prediction","odds","injuries_home","review","momentum"].filter(t=>r(e?.[t])).length,0)}var $=a(7),k=a(179),C=a(257);const S=s.AH`:host{--cl-green:#10b981;--cl-gold:#f59e0b;--cl-gold-glow:rgba(245,158,11,0.3);--cl-gold-text:#f59e0b;--cl-cl:#0284c7;--cl-el:#f97316;--cl-rel:#ef4444;--cl-conf:#0284c7;--cl-win:#10b981;--cl-draw:#64748b;--cl-loss:#ef4444;--cl-accent-soft:rgba(var(--cl-accent-rgb),0.10);--cl-accent-visible:var(--cl-accent);}:host,:host([data-palette="purple"]),:host([data-palette="custom"]),:host([data-palette="team"]){--cl-accent:#0284c7;--cl-accent-2:#0f172a;--cl-accent-rgb:2,132,199;--cl-accent-2-rgb:15,23,42;--cl-live:#ef4444;--cl-live-glow:rgba(239,68,68,0.4);}:host,:host([data-appearance="dark"]){--cl-bg:#0f172a;--cl-surface:#1e293b;--cl-surface-2:#334155;--cl-card-2:#1e293b;--cl-divider:rgba(255,255,255,0.10);--cl-glass-border:rgba(255,255,255,0.12);--cl-text:#ffffff;--cl-text-2:#94a3b8;--cl-shadow:rgba(0,0,0,0.45);--cl-overlay-strong:rgba(0,0,0,0.70);--cl-overlay-soft:rgba(0,0,0,0.35);--cl-bar-outline:rgba(255,255,255,0.14);--cl-bar-separator:rgba(255,255,255,0.25);--cl-chip-bg:rgba(2,132,199,0.14);--cl-chip-border:rgba(2,132,199,0.30);--cl-toast-bg:#1e293b;--cl-num-bg:#1e293b;}:host([data-appearance="light"]){--cl-bg:#ffffff;--cl-surface:#f8fafc;--cl-surface-2:#f1f5f9;--cl-card-2:#ffffff;--cl-divider:#e2e8f0;--cl-glass-border:#cbd5e1;--cl-text:#0f172a;--cl-text-2:#64748b;--cl-shadow:rgba(15,23,42,0.06);--cl-overlay-strong:rgba(15,23,42,0.60);--cl-overlay-soft:rgba(15,23,42,0.20);--cl-bar-outline:rgba(15,23,42,0.18);--cl-bar-separator:rgba(0,0,0,0.12);--cl-chip-bg:#f1f5f9;--cl-chip-border:#e2e8f0;--cl-toast-bg:#0f172a;--cl-num-bg:#ffffff;}:host([data-appearance="ha"]){--cl-bg:var(--ha-card-background,var(--card-background-color,#ffffff));--cl-surface:var(--secondary-background-color,#f8fafc);--cl-surface-2:var(--secondary-background-color,#f1f5f9);--cl-card-2:var(--secondary-background-color,#ffffff);--cl-divider:var(--divider-color,#e2e8f0);--cl-glass-border:var(--divider-color,#cbd5e1);--cl-text:var(--primary-text-color,#0f172a);--cl-text-2:var(--secondary-text-color,#64748b);--cl-shadow:rgba(0,0,0,0.08);--cl-overlay-strong:rgba(0,0,0,0.55);--cl-overlay-soft:rgba(0,0,0,0.25);--cl-bar-outline:var(--divider-color,#e2e8f0);--cl-bar-separator:rgba(0,0,0,0.12);--cl-chip-bg:rgba(2,132,199,0.08);--cl-chip-border:var(--divider-color,#e2e8f0);--cl-toast-bg:var(--card-background-color,#0f172a);--cl-num-bg:var(--card-background-color,#ffffff);}`;function z(t,e){const a=function(t,e){const a=e||{},s=a.entity||a.entities&&a.entities[0],i=s&&t?.hass?.states?.[s]?.attributes?.card_defaults;return(0,C.pV)(a,i)}(t,e),s=(0,C.J4)(a),i=(0,C.i5)(a);return t&&t.setAttribute&&(t.setAttribute("data-appearance",s),t.setAttribute("data-palette",i),function(t,e,a){for(const e of E)t.style.removeProperty(e);if(!e||!(0,C.JL)(a))return;const s=function(t,e){const a=e.entity||e.entities&&e.entities[0];if(!(a&&t&&t.hass&&t.hass.states))return{};const s=t.hass.states[a];return s?.attributes?.card_defaults||{}}(t,e),i={...s,...e};for(const[e,a,s]of A){const o=(0,k.GD)(i[e]);if(o&&(t.style.setProperty(a,o),s)){const e=(0,k._R)(o);e&&t.style.setProperty(s,e)}}const o=(0,k.GD)(i.background_color);o&&t.style.setProperty("--cl-bg",o);const r=(0,k.tS)(i.background_image);if(r){t.style.setProperty("--cl-bg-image",`url("${r}")`);const e=(0,k.LX)(i.watermark_opacity,.07);t.style.setProperty("--cl-bg-image-opacity",String(e));const a=(0,k.zg)(i.watermark_size);a&&t.style.setProperty("--cl-bg-image-size",a)}}(t,a,i)),{appearance:s,palette:i}}const A=[["accent_color","--cl-accent","--cl-accent-rgb"],["accent_2_color","--cl-accent-2","--cl-accent-2-rgb"],["secondary_color","--cl-accent-2","--cl-accent-2-rgb"],["live_color","--cl-live",null],["gold_color","--cl-gold",null],["background_color","--cl-bg",null],["surface_color","--cl-surface",null],["surface_2_color","--cl-surface-2",null],["card_color","--cl-card-2",null],["text_color","--cl-text",null],["secondary_text_color","--cl-text-2",null],["divider_color","--cl-divider",null],["chip_color","--cl-chip-bg",null],["chip_border_color","--cl-chip-border",null]],E=new Set(A.flatMap(([,t,e])=>e?[t,e]:[t]).concat(["--cl-bg","--cl-bg-image","--cl-bg-image-opacity","--cl-bg-image-size"]));function q(t,e="0"){if(null==t)return e;if("object"==typeof t){const a=t.displayValue??t.value;return null==a?e:String(a)}return t}const M=new Map,T=new Map,P=new Map,L={"Johan Cruijff Arena":{lat:52.3145,lon:4.9425},"Johan Cruijff ArenA":{lat:52.3145,lon:4.9425},"Philips Stadion":{lat:51.4424,lon:5.4675},"Stadion Feyenoord":{lat:51.8896,lon:4.5219},"Feyenoord Stadium":{lat:51.8896,lon:4.5219},"De Kuip":{lat:51.8896,lon:4.5219},"Stadion de Kuip":{lat:51.8896,lon:4.5219},"AFAS Stadion":{lat:52.6281,lon:4.7483},"Stadion Galgenwaard":{lat:52.0779,lon:5.1456},"De Grolsch Veste":{lat:52.2373,lon:6.8296},"Goffert Stadion":{lat:51.8307,lon:5.8606},"Abe Lenstra Stadion":{lat:52.9584,lon:5.9141},"Sparta-Stadion Het Kasteel":{lat:51.9171,lon:4.4658},"Sparta Stadion Het Kasteel":{lat:51.9171,lon:4.4658},"Het Kasteel":{lat:51.9171,lon:4.4658},"De Adelaarshorst":{lat:52.2488,lon:6.1737},"Polman Stadion":{lat:52.3514,lon:6.6582},"Mandemakers Stadion":{lat:51.6853,lon:5.0535},Euroborg:{lat:53.1822,lon:6.5942},"MAC³PARK Stadion":{lat:52.5143,lon:6.1006},"MACPARK Stadion":{lat:52.5143,lon:6.1006},"Yanmar Stadion":{lat:52.3893,lon:5.2152},"Rat Verlegh Stadion":{lat:51.5747,lon:4.7716},"Koning Willem II Stadion":{lat:51.5547,lon:5.0917},"Fortuna Sittard Stadion":{lat:51.0011,lon:5.8683},GelreDome:{lat:51.9653,lon:5.9111},"Kras Stadion":{lat:52.4436,lon:4.6264},"De Vijverberg":{lat:51.963,lon:6.2872},"Cambuur Stadion":{lat:53.2112,lon:5.8102},"Parkstad Limburg Stadion":{lat:50.9081,lon:5.9928},"Cars Jeans Stadion":{lat:52.0667,lon:4.3167},"BENU Stadion":{lat:52.0667,lon:4.3167},"ADO Den Haag Stadium":{lat:52.0667,lon:4.3167},"Bingoal Stadion":{lat:52.0667,lon:4.3167},Goffertstadion:{lat:51.8307,lon:5.8606},"Sportcomplex Varkenoord":{lat:51.8896,lon:4.5219},Varkenoord:{lat:51.8896,lon:4.5219},"M-Scores Stadion":{lat:51.8139,lon:4.6836},"Stadion Krommedijk":{lat:51.8139,lon:4.6836},"Riwal Hoogwerkers Stadion":{lat:51.8139,lon:4.6836},Krommedijk:{lat:51.8139,lon:4.6836},"Kooi Stadion":{lat:53.2112,lon:5.8102},"Kooi Stadium":{lat:53.2112,lon:5.8102},"Leeuwarden Stadion":{lat:53.2112,lon:5.8102},"711 Stadion":{lat:52.4592,lon:4.6556},"BUKO Stadion":{lat:52.4592,lon:4.6556},"Rabobank IJmond Stadion":{lat:52.4592,lon:4.6556},"WerkTalent Stadion":{lat:52.0667,lon:4.3167},"Stadion Woudestein":{lat:51.9308,lon:4.5386},"Van Donge & De Roo Stadion":{lat:51.9308,lon:4.5386},"Goffert Stadium":{lat:51.8307,lon:5.8606},"Grolsch Veste":{lat:52.2373,lon:6.8296},"Abe Lenstra Stadium":{lat:52.9584,lon:5.9141},"Philips Stadium":{lat:51.4424,lon:5.4675},"Hitachi Capital Mobility Stadion":{lat:53.1822,lon:6.5942},"Koning Willem II Stadium":{lat:51.5547,lon:5.0917},Galgenwaard:{lat:52.0779,lon:5.1456},"MetLife Stadium":{lat:40.8135,lon:-74.0745},"AT&T Stadium":{lat:32.748,lon:-97.0927},"SoFi Stadium":{lat:33.9535,lon:-118.3392},"Levi's Stadium":{lat:37.4032,lon:-121.9699},"Hard Rock Stadium":{lat:25.958,lon:-80.2389},"Lincoln Financial Field":{lat:39.9008,lon:-75.1675},"Arrowhead Stadium":{lat:39.049,lon:-94.4839},"GEHA Field at Arrowhead Stadium":{lat:39.049,lon:-94.4839},"NRG Stadium":{lat:29.6847,lon:-95.4107},"Mercedes-Benz Stadium":{lat:33.7554,lon:-84.4008},"Estadio Banorte":{lat:19.303,lon:-99.1506},"Allegiant Stadium":{lat:36.0908,lon:-115.1839},"Gillette Stadium":{lat:42.0909,lon:-71.2643},"Century Link Field":{lat:47.5952,lon:-122.3316},"Lumen Field":{lat:47.5952,lon:-122.3316},"BC Place":{lat:49.2768,lon:-123.1117},"BMO Field":{lat:43.6334,lon:-79.4179},"Estadio Azteca":{lat:19.303,lon:-99.1506},"Estadio BBVA":{lat:25.6694,lon:-100.2436},"Estadio Akron":{lat:20.6854,lon:-103.4673},"Allianz Arena":{lat:48.2188,lon:11.6247},"Signal Iduna Park":{lat:51.4532,lon:7.4516},Olympiastadion:{lat:52.5147,lon:13.2395},"Wembley Stadium":{lat:51.556,lon:-.2796},"Tottenham Hotspur Stadium":{lat:51.6043,lon:-.0665},"Emirates Stadium":{lat:51.5549,lon:-.1084},"Stamford Bridge":{lat:51.4821,lon:-.191},"Old Trafford":{lat:53.4632,lon:-2.291},"Etihad Stadium":{lat:53.4831,lon:-2.2004},Anfield:{lat:53.4308,lon:-2.9608},"Villa Park":{lat:52.5092,lon:-1.8847},"Camp Nou":{lat:41.3815,lon:2.1229},"Spotify Camp Nou":{lat:41.3815,lon:2.1229},"Estadi Olímpic Lluís Companys":{lat:41.3643,lon:2.158},"Santiago Bernabéu":{lat:40.453,lon:-3.6883},"Civitas Metropolitano":{lat:40.4361,lon:-3.5995},"San Mamés":{lat:43.2627,lon:-2.9385},"Estadio de La Cerámica":{lat:39.9441,lon:-.1042},Mestalla:{lat:39.4747,lon:-.3583},"Parc des Princes":{lat:48.8414,lon:2.253},"Stade de France":{lat:48.9244,lon:2.3601},"Groupama Stadium":{lat:45.7654,lon:4.9825},Vélodrome:{lat:43.2697,lon:5.3961},"Stade Vélodrome":{lat:43.2697,lon:5.3961},"San Siro":{lat:45.4781,lon:9.124},"Stadio Giuseppe Meazza":{lat:45.4781,lon:9.124},"Allianz Stadium":{lat:45.1096,lon:7.6412},"Stadio Olimpico":{lat:41.9341,lon:12.4547},"Stadio Diego Armando Maradona":{lat:40.8279,lon:14.193},BayArena:{lat:51.0382,lon:7.0023},"Red Bull Arena":{lat:51.3457,lon:12.3484},Volksparkstadion:{lat:53.5875,lon:9.8985},"Volksparkstadion Hamburg":{lat:53.5875,lon:9.8985},"Stadion Feijenoord":{lat:51.8896,lon:4.5219},"Estádio da Luz":{lat:38.7526,lon:-9.1849},"Estádio José Alvalade":{lat:38.7613,lon:-9.1609},"Estádio do Dragão":{lat:41.1611,lon:-8.5834},"Celtic Park":{lat:55.8491,lon:-4.2051},"Ibrox Stadium":{lat:55.8508,lon:-4.3095},"Johan Cruyff Arena":{lat:52.3145,lon:4.9425},"PSV Stadion":{lat:51.4424,lon:5.4675},"Fenerbahçe Şükrü Saracoğlu":{lat:40.9836,lon:29.0333},"Türk Telekom Stadium":{lat:41.1066,lon:29.0103},"Vodafone Park":{lat:41.0038,lon:28.9967}};function j(t){if(t.size>=150){const e=t.keys().next().value;t.delete(e)}}function N(t,e,a,s=!1){return{temp:Math.round(t),code:e,wind:(o=a,o<1?0:o<6?1:o<12?2:o<20?3:o<29?4:o<39?5:o<50?6:o<62?7:o<75?8:o<89?9:o<103?10:o<118?11:12),wind_unit:"BFT",icon:(i=e,i&&0!==i&&1!==i?2===i?"⛅":3===i?"☁️":45===i||48===i?"🌫️":i>=51&&i<=55?"🌦️":i>=61&&i<=65?"🌧️":i>=71&&i<=77?"🌨️":i>=80&&i<=82?"🌧️":85===i||86===i?"🌨️":95===i||96===i||99===i?"⛈️":"🌤️":"☀️"),description:D(e),description_key:H(e),forecast:s,timestamp:Date.now()};var i,o}function D(t){return{0:"Clear",1:"Mostly clear",2:"Partly cloudy",3:"Cloudy",45:"Foggy",48:"Foggy",51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",61:"Rain",63:"Heavy rain",65:"Very heavy rain",71:"Light snow",73:"Snow",75:"Heavy snow",77:"Snow grains",80:"Showers",81:"Heavy showers",82:"Violent showers",85:"Snow showers",86:"Heavy snow showers",95:"Thunderstorm",96:"Thunderstorm + hail",99:"Thunderstorm + heavy hail"}[t]||"Unknown"}function H(t){return 0===t?"weather.clear":1===t||2===t?"weather.partly_cloudy":3===t?"weather.cloudy":45===t||48===t?"weather.foggy":t>=51&&t<=55?"weather.drizzle":t>=61&&t<=65?"weather.rain":t>=71&&t<=77?"weather.snow":t>=80&&t<=86?"weather.showers":95===t||96===t||99===t?"weather.thunderstorm":"weather.unknown"}const O=s.AH`.weather-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px;background:rgba(0,0,0,0.1);font-size:12px;color:var(--primary-text-color);}.weather-icon{font-size:18px;}.weather-temp{font-weight:600;}.weather-wind{font-size:11px;opacity:0.7;}`,I=s.AH`.spinner-container{display:flex;align-items:center;justify-content:center;padding:24px;min-height:100px;}.spinner{display:inline-block;width:20px;height:20px;border:2px solid var(--cl-chip-border,rgba(255,255,255,0.3));border-radius:50%;border-top-color:var(--cl-accent,var(--primary-color,#2196F3));animation:spinner-rotate 1s linear infinite;}@keyframes spinner-rotate{to{transform:rotate(360deg);}}.spinner-text{margin-left:12px;font-size:12px;color:var(--cl-text-2,var(--secondary-text-color));}`,B=(t="Loading...")=>s.qy`
  <div class="spinner-container">
    <div class="spinner"></div>
    <span class="spinner-text">${t}</span>
  </div>
`;s.AH`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}`;const F=(t,e,a,i=null)=>s.qy`
  <ha-card style="padding: 20px 18px; text-align: center; color: var(--cl-live, var(--error-color, #ef5350)); background: var(--cl-bg, var(--card-background-color)); border: 1px solid var(--cl-glass-border, rgba(239,68,68,0.24)); border-radius: 18px; box-shadow: 0 4px 24px var(--cl-shadow, rgba(0,0,0,0.24));">
    <div style="font-size: 26px; margin-bottom: 10px;">${t}</div>
    <div style="font-size: 14px; font-weight: 800; margin-bottom: 5px; color: var(--cl-text, var(--primary-text-color));">${e}</div>
    <div style="font-size: 12px; color: var(--cl-text-2, var(--secondary-text-color)); margin-bottom: 8px;">${a}</div>
    ${i?s.qy`<div style="font-size: 11px; color: var(--cl-text-2, var(--secondary-text-color)); background: var(--cl-surface, rgba(0,0,0,0.1)); border: 1px solid var(--cl-divider, transparent); padding: 8px; border-radius: 8px; margin-top: 8px;">${i}</div>`:""}
  </ha-card>
`,W=(t,e)=>{const a=function(t){switch(t){case"initializing":case"fetching":return{kind:"info",icon:"⏳",title:"ui.sync_fetching",sub:"ui.sync_fetching_hint"};case"rate_limited":return{kind:"info",icon:"⏱",title:"ui.sync_rate_limited",sub:"ui.sync_rate_limited_hint"};case"authentication_failed":return{kind:"error",icon:"🔑",title:"ui.sync_auth_failed",sub:"ui.sync_auth_failed_hint"};case"provider_unavailable":return{kind:"error",icon:"📡",title:"ui.sync_provider_unavailable",sub:"ui.sync_provider_unavailable_hint"};default:return null}}(t);if(!a)return null;const s=e(a.title),i=e(a.sub);return"error"===a.kind?F(a.icon,s,i,e("ui.check_integration")):G(a.icon,s,i)},V=(t,e,a)=>t&&W(t.sync_status,e)||a(),G=(t,e,a,i=null)=>s.qy`
  <ha-card style="padding: 26px 18px; text-align: center; color: var(--cl-text-2, var(--secondary-text-color)); background: var(--cl-bg, var(--card-background-color)); border: 1px solid var(--cl-glass-border, rgba(255,255,255,0.10)); border-radius: 18px; box-shadow: 0 4px 24px var(--cl-shadow, rgba(0,0,0,0.20));">
    <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.55;">${t}</div>
    <div style="font-size: 13px; font-weight: 800; margin-bottom: 4px; color: var(--cl-text, var(--primary-text-color));">${e}</div>
    <div style="font-size: 12px; opacity: 0.78; margin-bottom: 8px;">${a}</div>
    ${i?s.qy`<div style="font-size: 11px; opacity: 0.62; margin-top: 8px;">${i}</div>`:""}
  </ha-card>
`,R="soccer_live_cache_",U=864e5,J=new Map;class K{static _cacheKeys(){return Array.from({length:localStorage.length},(t,e)=>localStorage.key(e)).filter(t=>t?.startsWith(R))}static _prune(){try{const t=Date.now(),e=[];for(const a of this._cacheKeys())try{const s=JSON.parse(localStorage.getItem(a));if(!Number.isFinite(s?.timestamp)||t-s.timestamp>=U){localStorage.removeItem(a),J.delete(a.slice(18));continue}e.push({key:a,timestamp:s.timestamp})}catch(t){localStorage.removeItem(a),J.delete(a.slice(18))}e.sort((t,e)=>e.timestamp-t.timestamp).slice(50).forEach(({key:t})=>{localStorage.removeItem(t),J.delete(t.slice(18))})}catch(t){console.debug("Failed to prune cache:",t)}}static set(t,e){try{const a=JSON.stringify(e);if(J.get(t)===a)return;J.size>=50&&J.delete(J.keys().next().value),J.set(t,a),localStorage.setItem(R+t,JSON.stringify({timestamp:Date.now(),data:e})),this._prune()}catch(t){console.debug("Failed to cache:",t)}}static get(t){try{const e=localStorage.getItem(R+t);if(!e)return null;const{timestamp:a,data:s}=JSON.parse(e),i=Date.now()-a;return i<U?{data:s,age:i,isCached:!0}:(this.clear(t),null)}catch(t){return console.debug("Failed to read cache:",t),null}}static clear(t){try{localStorage.removeItem(R+t),J.delete(t)}catch(t){console.debug("Failed to clear cache:",t)}}static clearAll(){try{this._cacheKeys().forEach(t=>localStorage.removeItem(t)),J.clear()}catch(t){console.debug("Failed to clear all cache:",t)}}static getAge(t){try{const e=localStorage.getItem(R+t);if(!e)return null;const{timestamp:a}=JSON.parse(e),s=Date.now()-a,i=Math.floor(s/6e4);if(i<60)return`${i}m ago`;const o=Math.floor(i/60);return o<24?`${o}h ago`:`${Math.floor(o/24)}d ago`}catch(t){return null}}}const Z=s.AH`.top-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:transparent;border-bottom:1px solid var(--cl-divider,rgba(0,0,0,0.08));}.competition{display:flex;align-items:center;gap:10px;font-size:12px;font-weight:700;color:var(--cl-text);letter-spacing:-0.01em;min-width:0;}.comp-icon{flex-shrink:0;width:24px;height:24px;border-radius:8px;background:var(--cl-surface,#f8fafc);border:1px solid var(--cl-divider,rgba(0,0,0,0.08));display:flex;align-items:center;justify-content:center;font-size:12px;overflow:hidden;}.comp-icon img{width:100%;height:100%;object-fit:contain;}.comp-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.sh-badge{flex-shrink:0;padding:5px 11px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:0.06em;}.sh-badge.live{background:#e53935;color:#fff;}.sh-badge.ft{background:var(--cl-surface,rgba(0,0,0,0.05));border:1px solid var(--cl-divider,rgba(0,0,0,0.1));color:var(--cl-text,#0f172a);}.sh-badge.date{background:var(--cl-surface,rgba(0,0,0,0.05));border:1px solid var(--cl-divider,rgba(0,0,0,0.1));color:var(--cl-text,#0f172a);}.sh-badge.neutral{background:var(--cl-surface,rgba(0,0,0,0.05));color:var(--cl-text-2,#64748b);}`,X=s.AH`.smm-venue-row{display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:10px 18px;font-size:11px;color:var(--cl-text-2,#94a3b8);border-bottom:1px solid var(--cl-divider,rgba(255,255,255,0.06));}.smm-venue,.smm-date{display:flex;align-items:center;gap:4px;min-width:0;}.smm-venue span,.smm-date span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.smm-icon{width:13px;height:13px;flex-shrink:0;opacity:0.7;}.smm-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 18px;border-bottom:1px solid var(--cl-divider,rgba(255,255,255,0.06));}.smm-chip{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700;background:var(--cl-surface,rgba(255,255,255,0.06));color:var(--cl-text-2,#94a3b8);white-space:nowrap;}.smm-chip.link{cursor:pointer;color:var(--cl-accent,#6366f1);background:rgba(var(--cl-accent-rgb,99 102 241),0.1);}.smm-chip.link:hover{background:rgba(var(--cl-accent-rgb,99 102 241),0.2);}`,Y={nl:{"Combo Double chance":"Combi dubbele kans","Combo Winner":"Combi winnaar","Double chance":"Dubbele kans",Winner:"Winnaar"," or draw":" of gelijkspel"," and ":" en "," goals":" doelpunten","No predictions available":"Geen voorspelling beschikbaar"},de:{"Combo Double chance":"Kombi Doppelte Chance","Combo Winner":"Kombi Sieger","Double chance":"Doppelte Chance",Winner:"Sieger"," or draw":" oder Unentschieden"," and ":" und "," goals":" Tore","No predictions available":"Keine Prognose verfügbar"},es:{"Combo Double chance":"Combo doble oportunidad","Combo Winner":"Combo ganador","Double chance":"Doble oportunidad",Winner:"Ganador"," or draw":" o empate"," and ":" y "," goals":" goles","No predictions available":"Sin pronóstico disponible"},fr:{"Combo Double chance":"Combo double chance","Combo Winner":"Combo vainqueur","Double chance":"Double chance",Winner:"Vainqueur"," or draw":" ou match nul"," and ":" et "," goals":" buts","No predictions available":"Aucun pronostic disponible"},it:{"Combo Double chance":"Combo doppia chance","Combo Winner":"Combo vincente","Double chance":"Doppia chance",Winner:"Vincente"," or draw":" o pareggio"," and ":" e "," goals":" gol","No predictions available":"Nessun pronostico disponibile"},pt:{"Combo Double chance":"Combo dupla hipótese","Combo Winner":"Combo vencedor","Double chance":"Dupla hipótese",Winner:"Vencedor"," or draw":" ou empate"," and ":" e "," goals":" gols","No predictions available":"Sem previsão disponível"}},Q=t=>"number"==typeof t&&isFinite(t)?t:null,tt=["form","att","def"],et=new Set(["nl","de","fr","it","es","pt"]);function at(t,e){if(null==t||""===t)return"";const a=String(t).trim();let s="",i=a;return a.startsWith("-")?(s="< ",i=a.slice(1)):a.startsWith("+")&&(s="> ",i=a.slice(1)),et.has(e)&&(i=i.replace(".",",")),s+i}const st=t=>null==t?"–":`${t}%`;function it(t,e){return t&&"in"===t.state?s.qy`<span class="sec-status">${e("team.status_prematch")}</span>`:""}const ot=s.AH`.pred{margin:10px 12px 4px;padding:10px 12px;background:var(--cl-card-2,rgba(255,255,255,0.03));border-radius:10px;}.pred-title{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--cl-text-2,#94a3b8);}.sec-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;}.sec-status{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--cl-text-2,#94a3b8);background:var(--cl-chip-bg,rgba(255,255,255,0.08));border:1px solid var(--cl-chip-border,rgba(255,255,255,0.12));border-radius:5px;padding:2px 6px;white-space:nowrap;}.info{cursor:help;text-decoration:underline dotted;text-underline-offset:2px;text-decoration-color:var(--cl-divider,rgba(148,163,184,0.5));}.pred-bar{display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--cl-overlay-soft,rgba(0,0,0,0.28));box-shadow:inset 0 0 0 1px var(--cl-bar-outline,rgba(255,255,255,0.14));}.pred-seg{height:100%;}.pred-seg + .pred-seg{box-shadow:inset 1px 0 0 var(--cl-bar-separator,rgba(255,255,255,0.32));}.pred-seg.home{background:var(--cl-accent,#6366f1);}.pred-seg.draw{background:#64748b;}.pred-seg.away{background:var(--cl-live,#ef4444);}.pred-legend{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;font-weight:700;color:var(--cl-text-2,#94a3b8);}.pred-l.home,.pred-l.away{color:var(--cl-text,#e2e8f0);}.pred-l.home::before,.pred-l.away::after{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;vertical-align:middle;position:relative;top:-1px;box-shadow:inset 0 0 0 1px var(--cl-bar-outline,rgba(255,255,255,0.14));}.pred-l.home::before{background:var(--cl-accent,#6366f1);margin-right:6px;}.pred-l.away::after{background:var(--cl-live,#ef4444);margin-left:6px;}.pred-cmp{margin-top:10px;display:flex;flex-direction:column;gap:6px;}.pred-cmp-head{display:flex;justify-content:space-between;align-items:baseline;font-size:10px;font-weight:700;color:var(--cl-text-2,#94a3b8);}.pred-cmp-label{text-transform:uppercase;letter-spacing:0.05em;font-size:9px;}.pred-cmp-v.home,.pred-cmp-v.away{color:var(--cl-text,#e2e8f0);}.pred-cmp-bar{display:flex;height:5px;border-radius:3px;overflow:hidden;margin-top:2px;background:var(--cl-overlay-soft,rgba(0,0,0,0.28));box-shadow:inset 0 0 0 1px var(--cl-bar-outline,rgba(255,255,255,0.14));}.pred-cmp-seg{height:100%;}.pred-cmp-seg + .pred-cmp-seg{box-shadow:inset 1px 0 0 var(--cl-bar-separator,rgba(255,255,255,0.32));}.pred-cmp-seg.home{background:var(--cl-accent,#6366f1);}.pred-cmp-seg.away{background:var(--cl-live,#ef4444);}.pred-xg{margin-top:8px;display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:10px;color:var(--cl-text-2,#94a3b8);}.pred-xg-label{font-weight:800;text-transform:uppercase;letter-spacing:0.05em;font-size:9px;}.pred-xg-val{font-weight:700;color:var(--cl-text,#e2e8f0);}.pred-advice{margin-top:8px;font-size:11px;color:var(--cl-text,#e2e8f0);font-style:italic;text-align:center;}.odds{margin:8px 12px 4px;padding:10px 12px;background:var(--cl-card-2,rgba(255,255,255,0.03));border-radius:10px;}.odds-head{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-bottom:8px;}.odds-title{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--cl-text-2,#94a3b8);}.odds-sub{font-size:9px;font-weight:600;color:var(--cl-text-2,#94a3b8);opacity:0.75;}.odds-sub.live{color:var(--cl-live,#ef4444);opacity:1;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;display:inline-flex;align-items:center;gap:4px;}.odds-sub.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--cl-live,#ef4444);animation:odds-live-pulse 1.4s ease-in-out infinite;}@keyframes odds-live-pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}.odds-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}.odds-col{display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 4px;border-radius:8px;background:var(--cl-card,rgba(255,255,255,0.02));}.odds-sign{font-size:12px;font-weight:900;line-height:1;color:var(--cl-text-2,#94a3b8);}.odds-col.home .odds-sign{color:var(--cl-accent,#6366f1);}.odds-col.away .odds-sign{color:var(--cl-live,#ef4444);}.odds-team{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.02em;color:var(--cl-text-2,#94a3b8);max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.odds-val{font-size:16px;font-weight:800;color:var(--cl-text,#e2e8f0);font-variant-numeric:tabular-nums;margin-top:1px;}.odds-col.fav{background:var(--cl-accent-soft,rgba(99,102,241,0.10));}.inj{margin:8px 12px 4px;padding:10px 12px;background:var(--cl-card-2,rgba(255,255,255,0.03));border-radius:10px;}.inj-title{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--cl-text-2,#94a3b8);margin-bottom:8px;}.inj-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;}.inj-team{font-size:10px;font-weight:800;color:var(--cl-text,#e2e8f0);margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.inj-row{display:flex;align-items:baseline;gap:5px;padding:2px 0;font-size:11px;}.inj-ic{font-size:10px;flex-shrink:0;}.inj-name{font-weight:600;color:var(--cl-text,#e2e8f0);white-space:nowrap;}.inj-reason{color:var(--cl-text-2,#94a3b8);font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.inj-none{color:var(--cl-text-2,#94a3b8);font-size:11px;}.inj-more{color:var(--cl-text-2,#94a3b8);font-size:10px;font-weight:700;padding-top:2px;opacity:0.85;}`,rt=["delay","drink break","cooling break","video review"],nt={kickoff:"status.kickoff",halftime:"status.halftime","half time":"status.halftime","end of half":"status.halftime","start 2nd half":"status.second_half","second half":"status.second_half","2nd half":"status.second_half","first half":"status.first_half","1st half":"status.first_half","in progress":"status.live",live:"status.live","full time":"status.full_time",final:"status.full_time","end regular time":"status.full_time",end:"status.end","extra time":"status.extra_time","start extra time":"status.extra_time_start","halftime extra time":"status.extra_time_halftime","half time extra time":"status.extra_time_halftime","start 2nd half extra time":"status.extra_time_second_half","2nd half extra time":"status.extra_time_second_half","end extra time":"status.extra_time_end",shootout:"status.shootout","penalty shootout":"status.shootout","start shootout":"status.shootout_start","end match":"status.end_match"};function lt(t){return String(t||"").trim().toLowerCase().replace(/[._-]+/g," ").replace(/\s+/g," ").trim()}const ct={en:"Club Friendlies",nl:"Oefenwedstrijd",de:"Vereinsfreundschaftsspiele",es:"Amistosos de clubes",fr:"Matchs amicaux clubs",it:"Amichevoli club",pt:"Amistosos de clubes"},dt={en:"Friendlies",nl:"Oefenwedstrijden",de:"Freundschaftsspiele",es:"Amistosos",fr:"Matchs amicaux",it:"Amichevoli",pt:"Amistosos"},pt=new Set(["friendlies clubs","friendlies club","friendly clubs","friendly club","club friendlies","club friendly","friendlies","friendly",...Object.values(ct).map(lt),...Object.values(dt).map(lt)]);function ht({competitionName:t,competitionLogo:e,fallbackLogo:a=null,isFriendly:s}={}){return("boolean"==typeof s?s:function(t){const e=lt(t);return!!e&&(pt.has(e)||/friendl/.test(e))}(t))?a:(e&&"N/A"!==e?e:null)||a}const ut={"dutch eredivisie":"Eredivisie","english premier league":"Premier League","spanish laliga":"LALIGA","german bundesliga":"Bundesliga","italian serie a":"Serie A","french ligue 1":"Ligue 1","portuguese liga portugal":"Liga Portugal"};function gt(t,e="en"){const a=String(t||"").trim();if(!a||"N/A"===a)return"";const s=lt(a);return["friendlies clubs","friendlies club","friendly clubs","friendly club","club friendlies","club friendly"].includes(s)?ct[e]||ct.en:"friendlies"===s||"friendly"===s?dt[e]||dt.en:ut[s]?ut[s]:a}function mt(t){return t?String(t).split(/[-\s]+/).map(Number).filter(t=>Number.isFinite(t)&&t>0):[]}function ft(t){const e=String(t?.position??"").toUpperCase();return"GK"===e||"G"===e}function _t(t,e){if(!t.length)return[];let a=t.findIndex(ft);-1===a&&(a=0);const s=t[a],i=t.filter((t,e)=>e!==a),o=[[s]];let r=0;for(const t of e){if(r>=i.length)break;o.push(i.slice(r,r+t)),r+=t}return r<i.length&&o.push(i.slice(r)),o}const bt=s.AH`.pit-outer{}.pit-field{position:relative;background-color:#2d7d30;background-image:repeating-linear-gradient(180deg,transparent,transparent 36px,rgba(0,0,0,0.06) 36px,rgba(0,0,0,0.06) 72px);border-radius:6px;margin:12px;overflow:hidden;}.pit-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}.pit-fm{position:absolute;z-index:1;font-size:9px;font-weight:800;letter-spacing:0.04em;color:rgba(255,255,255,0.6);padding:3px 6px;}.pit-fm.away{top:4px;right:6px;}.pit-fm.home{bottom:4px;left:6px;}.pit-half{display:flex;flex-direction:column;gap:10px;padding:10px 8px;}.pit-mid{height:24px;}.pit-row{display:flex;justify-content:space-around;align-items:flex-start;}.pit-player{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:34px;}.pit-dot-wrap{position:relative;display:inline-flex;}.pit-dot{width:30px;height:30px;border-radius:50%;background:var(--cl-accent,#6366f1);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white;box-shadow:0 2px 6px rgba(0,0,0,0.5);}.pit-rating{position:absolute;top:-5px;right:-6px;font-size:8px;font-weight:800;line-height:1;color:#fff;border-radius:4px;padding:2px 3px;font-variant-numeric:tabular-nums;box-shadow:0 1px 3px rgba(0,0,0,0.6);}.pit-dot.away{background:#374151;}.pit-dot.gk{background:#d946ef;}.pit-dot.away.gk{background:#6b7280;}.pit-name{font-size:8px;font-weight:600;color:rgba(255,255,255,0.95);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:54px;text-shadow:0 1px 3px rgba(0,0,0,0.9);}.pit-bench{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 16px;border-top:1px solid var(--cl-divider,rgba(255,255,255,0.06));}.pit-bench-title{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--cl-text-2,#94a3b8);margin-bottom:6px;}.pit-bench-p{display:flex;align-items:center;gap:5px;font-size:11px;padding:3px 0;border-bottom:1px solid var(--cl-divider,rgba(255,255,255,0.04));}.pit-bench-num{font-size:10px;font-weight:800;color:var(--cl-accent,#6366f1);min-width:16px;}`;function vt(t){return!0===t?.detail_loaded||Boolean(t?.key_events?.length||t?.lineup_home?.length||t?.lineup_away?.length||Object.keys(t?.home_statistics||{}).length||t?.momentum?.length||t?.shotmap?.length)}const xt=new WeakMap;function yt(t,e,a=12e4){const s=e?.event_uid;if(!s)return!0;const i=Date.now(),o=xt.get(t)||new Map;for(const[t,e]of o)i-e>a&&o.delete(t);return!o.has(s)&&(o.set(s,i),xt.set(t,o),!0)}function wt(t,e,a){if("soccer_live_goal"===e)return{message:`${t("event.goal").toUpperCase()}! ${a.player||""} · ${a.home_team} ${a.home_score} - ${a.away_score} ${a.away_team}`,variant:"goal"};if("soccer_live_goal_cancelled"===e)return{message:`↩ ${t("event.goal_cancelled")} · ${a.home_team} ${a.home_score} - ${a.away_score} ${a.away_team}`,variant:"red"};if("soccer_live_yellow_card"===e||"soccer_live_red_card"===e){const s=e.includes("red");return{message:`${s?"🟥":"🟨"} ${t(s?"event.red_card":"event.yellow_card")} · ${a.player||""}${a.minute?` (${a.minute}')`:""}`,variant:s?"red":"yellow"}}return"soccer_live_match_finished"===e?{message:`${t("status.finished")}! ${a.home_team} ${a.home_score} - ${a.away_score} ${a.away_team}`,variant:"finished"}:e.endsWith("_changed")?{message:`🗓 ${t("event.fixture_changed")} · ${a.home_team} – ${a.away_team}`,variant:"yellow"}:null}function $t(t,e=10){return s.qy`<style>
    .${t}-section-lineup{background:rgba(16,185,129,.08);border-color:#10b981}
    .${t}-section-timeline{background:rgba(251,191,36,.08);border-color:#fbbf24}
    .${t}-section-title.lineup{color:#10b981}
    .${t}-section-title.timeline{color:#fbbf24}
    .${t}-lineup-team{margin-bottom:${e}px}
    .${t}-lineup-team:last-child{margin-bottom:0}
    .${t}-lineup-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
    .${t}-lineup-header span:first-child{font-size:12px;font-weight:800;color:#fff}
    .${t}-formation{font-size:10px;font-weight:700;color:var(--cl-accent,#6366f1);letter-spacing:.1em}
    .${t}-lineup-players{font-size:12px;color:#cbd5e1;line-height:1.7}
    .${t}-player{display:inline-block;padding:2px 8px;background:rgba(255,255,255,.05);border-radius:6px;margin:2px}
    .${t}-jersey{color:#fbbf24;font-weight:800}
    .${t}-timeline-list{margin:0;padding:0;list-style:none}
    .${t}-timeline-item{display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:12px;color:#cbd5e1}
    .${t}-timeline-item:last-child{border-bottom:0}
    .${t}-tl-clock{min-width:32px;text-align:right;font-size:11px;font-weight:700;color:#94a3b8;font-variant-numeric:tabular-nums;padding-top:2px;flex-shrink:0}
    .${t}-tl-badge{display:inline-block;font-size:8px;font-weight:800;padding:1px 5px;border-radius:3px;text-transform:uppercase;letter-spacing:.04em;flex-shrink:0;line-height:15px;white-space:nowrap;margin-top:1px}
    .${t}-tl-badge.goal{background:rgba(99,102,241,.18);color:#6366f1}
    .${t}-tl-badge.yellow{background:rgba(245,158,11,.18);color:#f59e0b}
    .${t}-tl-badge.red{background:rgba(239,68,68,.18);color:#ef4444}
    .${t}-tl-badge.sub{background:rgba(148,163,184,.12);color:#94a3b8}
    .${t}-tl-badge.meta{background:transparent;color:#94a3b8;font-size:14px;padding:0 4px;letter-spacing:0}
    .${t}-tl-text strong{color:#fff}
    .${t}-tl-team{color:#94a3b8;font-size:11px}
  </style>`}function kt(t){const e=String(t?.type||"").toLowerCase(),a=String(t?.type_text||"").toLowerCase();return function(t){const e=(t.type||"").toLowerCase(),a=(t.type_text||"").toLowerCase();return!(a.includes("missed")||a.includes("disallow")||a.includes("cancel"))&&(!!t.scoring_play||"goal"===e||a.includes("penalty - scored"))}(t)?"goal":a.includes("yellow")?"yellow":a.includes("red card")?"red":"substitution"===e||a.includes("substitut")?"sub":"meta"}function Ct(t,{translate:e,prefix:a="mp"}){const i=function(t){return(t?.key_events||[]).filter(t=>{const e=String(t?.type_text||"").toLowerCase();return!rt.some(t=>e.includes(t))})}(t);return i.length?s.qy`
    <div class="${a}-section ${a}-section-timeline">
      <h5 class="${a}-section-title timeline">${e("popup.timeline")}</h5>
      <ul class="${a}-timeline-list">
        ${i.map(t=>{const i=kt(t);return s.qy`
            <li class="${a}-timeline-item">
              <span class="${a}-tl-clock">${t.clock||t.minute||""}</span>
              ${function(t,e,a){const i={goal:"event.goal",yellow:"event.yellow_card",red:"event.red_card",sub:"event.substitution"};return i[t]?s.qy`<span class="${a}-tl-badge ${t}">${e(i[t])}</span>`:s.qy`<span class="${a}-tl-badge meta">·</span>`}(i,e,a)}
              <span class="${a}-tl-text">
                <strong>${function(t,e){const a=(t?.athletes||[]).filter(Boolean),s=kt(t);if("sub"===s){const e=t?.assist||a[1]||"",s=t?.player||a[0]||"";if(e&&s)return`▲ ${e} ▼ ${s}`}let i=a.length?a.join(", "):nt[String(t?.type_text||"").toLowerCase()]?e(nt[String(t?.type_text||"").toLowerCase()]):t?.type_text||t?.short_text||"";if("goal"===s){const a=String(t?.type_text||"").toLowerCase();a.includes("own goal")||a.includes("own-goal")?i+=` (${e("event.own_goal")})`:a.includes("penalty")&&(i+=` (${e("event.penalty")})`)}return i}(t,e)}</strong>
                ${t.team?s.qy`<br><span class="${a}-tl-team">${t.team}</span>`:""}
              </span>
            </li>`})}
      </ul>
    </div>`:""}function St(t,{translate:e,prefix:a="mp",startersOnly:i=!1}){const o=t?.lineup_home||[],r=t?.lineup_away||[];if(!o.length&&!r.length)return"";const n=function(t,e={}){const a=e.t||(t=>t),i=!1!==e.showBench,o=t.lineup_home||[],r=t.lineup_away||[];if(!o.length&&!r.length)return null;const n=mt(t.formation_home),l=mt(t.formation_away);if(!n.length&&!l.length)return null;const c=t=>t.some(t=>!0===t.starter||!1===t.starter),d=c(o)?o.filter(t=>!0===t.starter):o,p=c(o)?o.filter(t=>!1===t.starter):[],h=c(r)?r.filter(t=>!0===t.starter):r,u=c(r)?r.filter(t=>!1===t.starter):[],g=_t(d,n),m=_t(h,l),f=g.length>1?[...g.slice(1).reverse(),g[0]]:g,_=(t,e)=>s.qy`
    <div class="pit-row">${t.map(t=>((t,e)=>s.qy`
    <div class="pit-player">
      <div class="pit-dot-wrap">
        <div class="pit-dot ${e}${ft(t)?" gk":""}">${t.jersey||""}</div>
        ${function(t){const e=parseFloat(t);if(!Number.isFinite(e))return"";const a=e>=8?"#1f9d55":e>=7?"#4a9e2f":e>=6?"#c98a00":"#c0392b";return s.qy`<span class="pit-rating" style="background:${a}">${e.toFixed(1)}</span>`}(t.rating)}
      </div>
      <div class="pit-name">${function(t){const e=t.short_name||t.name||"";return/^[A-Z]\. /.test(e)?e.slice(3):e}(t)}</div>
    </div>
  `)(t,e))}</div>
  `,b=t=>s.qy`
    <div class="pit-bench-p">
      <span class="pit-bench-num">${t.jersey||""}</span>
      <span>${t.short_name||t.name||""}</span>
    </div>
  `;return s.qy`
    <div class="pit-outer">
      <div class="pit-field">
        <svg class="pit-lines" viewBox="0 0 100 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="98" height="148" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
          <rect x="20" y="1" width="60" height="24" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.8"/>
          <rect x="37" y="1" width="26" height="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <circle cx="50" cy="17" r="1.5" fill="rgba(255,255,255,0.5)"/>
          <path d="M 44 25 A 10 10 0 0 1 56 25" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.8"/>
          <line x1="1" y1="75" x2="99" y2="75" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
          <circle cx="50" cy="75" r="13" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
          <circle cx="50" cy="75" r="1.5" fill="rgba(255,255,255,0.5)"/>
          <rect x="20" y="125" width="60" height="24" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.8"/>
          <rect x="37" y="141" width="26" height="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <circle cx="50" cy="133" r="1.5" fill="rgba(255,255,255,0.5)"/>
          <path d="M 44 125 A 10 10 0 0 1 56 125" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.8"/>
          <path d="M 1 6 A 5 5 0 0 1 6 1" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <path d="M 94 1 A 5 5 0 0 1 99 6" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <path d="M 1 144 A 5 5 0 0 1 6 149" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
          <path d="M 94 149 A 5 5 0 0 1 99 144" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
        </svg>
        ${t.formation_away?s.qy`<div class="pit-fm away">${t.formation_away}</div>`:""}
        <div class="pit-half">${m.map(t=>_(t,"away"))}</div>
        <div class="pit-mid"></div>
        <div class="pit-half">${f.map(t=>_(t,"home"))}</div>
        ${t.formation_home?s.qy`<div class="pit-fm home">${t.formation_home}</div>`:""}
      </div>
      ${i&&(p.length||u.length)?s.qy`
        <div class="pit-bench">
          <div>
            <div class="pit-bench-title">${t.home_team||a("generic.home")}</div>
            ${p.map(b)}
          </div>
          <div>
            <div class="pit-bench-title">${t.away_team||a("generic.away")}</div>
            ${u.map(b)}
          </div>
        </div>
      `:""}
    </div>
  `}(t,{t:e});if(n)return s.qy`
    <div class="${a}-section ${a}-section-lineup">
      <h5 class="${a}-section-title lineup">${e("popup.lineups")}</h5>
      ${n}
    </div>`;const l=(t,o,r)=>{const{starters:n,substitutes:l}=function(t,e=!1){const a=Array.isArray(t)?t:[],s=a.some(t=>!0===t.starter||!1===t.starter);return{starters:s?a.filter(t=>!0===t.starter):a,substitutes:e||!s?[]:a.filter(t=>!1===t.starter)}}(t,i);if(!n.length)return"";const c=t=>s.qy`<span class="${a}-player">${t.jersey?s.qy`<strong class="${a}-jersey">${t.jersey}</strong> `:""}${t.short_name||t.name||""}</span>`;return s.qy`
      <div class="${a}-lineup-team">
        <div class="${a}-lineup-header">
          <span>${r||""}</span>
          ${o?s.qy`<span class="${a}-formation">${o}</span>`:""}
        </div>
        <div class="${a}-lineup-players">${n.map(c)}</div>
        ${l.length?s.qy`
          <div class="${a}-lineup-header"><span>${e("popup.substitutes")}</span></div>
          <div class="${a}-lineup-players">${l.map(c)}</div>
        `:""}
      </div>`};return s.qy`
    <div class="${a}-section ${a}-section-lineup">
      <h5 class="${a}-section-title lineup">${e("popup.lineups")}</h5>
      ${l(o,t.formation_home,t.home_team)}
      ${l(r,t.formation_away,t.away_team)}
    </div>`}class zt extends s.WF{static get properties(){return{hass:{},_config:{},_isLoading:{type:Boolean},showPopup:{type:Boolean},activeMatch:{type:Object},_eventSubscriptions:{type:Array},_toastMessage:{type:String},_toastVisible:{type:Boolean},_toastVariant:{type:String},_weatherBadge:{type:Object},_cachedData:{type:Object},showEventToasts:{type:Boolean},myTeam:{type:String},showPreviousMatches:{type:Boolean},showFormTrend:{type:Boolean},compact:{type:Boolean}}}setConfig(t){if(!t.entity)throw new Error("Entity required");this._config=t,z(this,t);const e=["big","huge"].includes(t.score_size)?t.score_size:"normal";this.setAttribute("data-score",e),this._isLoading=!0,this._loadingStarted=Date.now(),this._lastWeatherVenue=null,this.showPopup=!1,this.activeMatch=null,this.showEventToasts=!0===t.show_event_toasts,this.myTeam=(t.my_team||"").toLowerCase(),this.showPreviousMatches=!0===t.show_previous_matches,this.showFormTrend=!0===t.show_form_trend,this.compact=!0===t.compact,this._toastMessage="",this._toastVisible=!1,this._toastVariant="goal",this._toastTimer=null,this._animationTimers||(this._animationTimers=[])}_t(t,e){return(0,i.t)(t,(0,i.$c)(this.hass,this._config),e)}_translatePhase(t){return t?{"regular-season":this._t("phase.regular_season"),"regular season":this._t("phase.regular_season"),"group-stage":this._t("phase.group_stage"),"group stage":this._t("phase.group_stage"),playoffs:this._t("phase.playoffs")}[String(t).toLowerCase()]||t:""}_shouldShowPhase(t){return!!t&&"regular-season"!==String(t).toLowerCase()}connectedCallback(){super.connectedCallback(),this._subscribeToEvents(),this._countdownInterval=setInterval(()=>this.requestUpdate(),3e4),this._loadingTimer=setTimeout(()=>this.requestUpdate(),1e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._countdownInterval),this._countdownInterval=null,clearTimeout(this._loadingTimer),this._eventSubscriptionGeneration=(this._eventSubscriptionGeneration||0)+1,this._eventSubscriptionPromise=null,this._eventSubscriptions&&Array.isArray(this._eventSubscriptions)&&(this._eventSubscriptions.forEach(t=>{"function"==typeof t&&t()}),this._eventSubscriptions=[]),this._escHandler&&(document.removeEventListener("keydown",this._escHandler),this._escHandler=null),this._removePopupPortal(),clearTimeout(this._toastTimer),this._toastTimer=null,this._animationTimers&&(this._animationTimers.forEach(t=>clearTimeout(t)),this._animationTimers=[])}_subscribeToEvents(){if(!this.hass||!this.hass.connection)return;if(this._eventSubscriptionPromise||this._eventSubscriptions?.length)return;const t=this._eventSubscriptionGeneration||0,e=this._handleSoccerLiveEvent.bind(this),a=Promise.allSettled(["soccer_live_goal","soccer_live_goal_cancelled","soccer_live_yellow_card","soccer_live_red_card","soccer_live_kickoff_changed","soccer_live_venue_changed","soccer_live_opponent_changed"].map(t=>this.hass.connection.subscribeEvents(e,t)));this._eventSubscriptionPromise=a,a.then(e=>{const a=e.filter(t=>"fulfilled"===t.status&&"function"==typeof t.value).map(t=>t.value);if((this._eventSubscriptionGeneration||0)!==t||!this.isConnected)return void a.forEach(t=>t());const s=e.filter(t=>"rejected"===t.status);s.length>0?(a.forEach(t=>t()),this._eventSubscriptions=[],s.forEach(t=>console.warn("Soccer Live Team subscription failed:",t.reason))):this._eventSubscriptions=a}).finally(()=>{this._eventSubscriptionPromise===a&&(this._eventSubscriptionPromise=null)})}_eventBelongsToThisCard(t){if(!this.hass||!this._config)return!1;const e=this.hass.states[this._config.entity];if(!e)return!1;const a=e.attributes.matches||[];if(0===a.length)return!1;const s=a[0];return s.home_team===t.home_team&&s.away_team===t.away_team}_handleSoccerLiveEvent(t){const e=t.event_type,a=t.data;if(this._eventBelongsToThisCard(a)&&yt(this,a)&&this.showEventToasts)if("soccer_live_goal"===e){const t=a.team===a.home_team?"home":"away";requestAnimationFrame(()=>this._triggerGoalCelebration(t,a))}else this._showEventToast(e,a)}_showEventToast(t,e){const a=wt(t=>this._t(t),t,e);a&&(this._toastMessage=a.message,this._toastVariant=a.variant,this._toastVisible=!0,this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>{this._toastVisible=!1,this.requestUpdate()},4e3),this.requestUpdate())}_triggerGoalCelebration(t,e){const a=this.shadowRoot&&this.shadowRoot.querySelector("ha-card");if(!a)return;a.querySelectorAll(".confetti, .goal-banner, .goal-flash-overlay").forEach(t=>t.remove()),a.classList.remove("goal-flash"),a.offsetWidth,a.classList.add("goal-flash"),this._animationTimers.push(setTimeout(()=>a.classList.remove("goal-flash"),1700));const s=document.createElement("div");s.className="goal-flash-overlay",a.appendChild(s),this._animationTimers.push(setTimeout(()=>s.remove(),1e3));const i=document.createElement("div");i.className="goal-banner";const o=document.createElement("div");o.className="goal-banner-text",o.textContent=(this._t("event.goal")||"GOAL")+"!",i.appendChild(o),a.appendChild(i),this._animationTimers.push(setTimeout(()=>i.remove(),1700));const r=a.querySelector(".score-numbers");r&&(r.classList.remove("goal-scored"),r.offsetWidth,r.classList.add("goal-scored"),this._animationTimers.push(setTimeout(()=>r.classList.remove("goal-scored"),1300)));const n=a.querySelectorAll(".team-side .team-logo-big"),l="away"===t?n[1]:n[0];l&&(l.classList.remove("scorer-bounce"),l.offsetWidth,l.classList.add("scorer-bounce"),this._animationTimers.push(setTimeout(()=>l.classList.remove("scorer-bounce"),1300))),navigator.vibrate&&navigator.vibrate([180,80,180,80,280]),this._animationTimers.push(setTimeout(()=>this._showEventToast("soccer_live_goal",e),600));const c=["#ec4899","#6366f1","#06b6d4","#fbbf24","#10b981","#ef4444"],d=["⚽","🎉","✨","🔥","⭐"];for(let t=0;t<36;t++){const t=document.createElement("div");t.className="confetti",Math.random()>.55?(t.textContent=d[Math.floor(Math.random()*d.length)],t.style.fontSize=14+10*Math.random()+"px",t.style.background="transparent"):(t.style.background=c[Math.floor(Math.random()*c.length)],t.style.borderRadius=Math.random()>.5?"50%":"2px");const e=380*(Math.random()-.5)+"px",s=240*Math.random()+100+"px";t.style.setProperty("--dx",e),t.style.setProperty("--dy",s),t.style.animationDelay=.3*Math.random()+"s",a.appendChild(t),this._animationTimers.push(setTimeout(()=>t.remove(),2e3))}}_parseMatchDate(t){return(0,i.n1)(t)}_liveCountdown(t){if(!t||"pre"!==t.state)return null;const e=this._parseMatchDate(t.date);if(!e)return null;const a=e-new Date;if(a<=0||a>1728e5)return null;const s=Math.floor(a/6e4);if(s<1)return this._t("time.now");if(s<60)return this._t("time.in_n_min",{n:s});if(s<1440)return this._t("time.in_n_h",{n:Math.floor(s/60)});const i=function(t,e=2){if(!Number.isFinite(t)||t<=0)return[];let a=Math.ceil(t);return[["day",Math.floor(a/1440)],["hour",Math.floor(a%1440/60)],["minute",a%60]].filter(([,t])=>t>0).slice(0,Math.max(1,e)).map(([t,e])=>({unit:t,value:e}))}(s,2).map(({unit:t,value:e})=>this._t(`popup.duration_${t}${1===e?"":"s"}`,{n:e})),o=i.length>1?`${i.slice(0,-1).join(", ")} ${this._t("popup.duration_and")} ${i.at(-1)}`:i[0];return this._t("time.in_duration",{value:o})}getCardSize(){return 4}static getConfigElement(){return document.createElement("soccer-live-team-editor")}static getStubConfig(){return{entity:"sensor.soccer_live_next_",show_event_toasts:!1}}async showDetails(t){this.activeMatch=t,this.showPopup=!0;const e=this.hass?.states?.[this._config.entity]?.attributes;if(e?.detail_service&&!vt(t))try{await async function(t,e,a){const s=e?.detail_service;if(!s||!a?.event_id||vt(a))return!1;const[i,o]=String(s).split(".",2);if(!i||!o)return!1;const r={...e.detail_service_data||{},match_id:String(a.event_id)};if("soccer_live"===i&&"function"==typeof t?.callWS){const e=await t.callWS({type:"call_service",domain:i,service:o,service_data:r,return_response:!0}),s=e?.response??e?.service_response??e,n=s?.match;return n&&"object"==typeof n&&Object.assign(a,n),Boolean(n)}return"function"==typeof t?.callService&&(await t.callService(i,o,r),!0)}(this.hass,e,t)}catch(t){}finally{this.requestUpdate()}}closePopup(){this.showPopup=!1}separateEvents(t){const e=[],a=[],s=[];return t.forEach(t=>{const i=String(t||"");i.includes("Goal")&&!i.includes("Disallowed")||i.includes("Penalty - Scored")?e.push(this.formatMatchEvent(i)):i.includes("Yellow Card")?a.push(this.formatMatchEvent(i)):i.includes("Red Card")&&s.push(this.formatMatchEvent(i))}),{goals:e,yellowCards:a,redCards:s}}formatMatchEvent(t){const e=t=>this._t(t);let a=String(t||"").trim();a=a.replace(/^Goal\s*-\s*/i,"").replace(/^Yellow Card\s*-\s*/i,"").replace(/^Red Card\s*-\s*/i,"").replace(/^Penalty - Scored\s*-\s*/i,`${e("event.penalty")} - `).replace(/^Header\s*-\s*/i,`${e("event.header")} - `).replace(/^Shot\s*-\s*/i,`${e("event.shot")} - `).replace(/^Free-kick\s*-\s*/i,`${e("event.free_kick")} - `).replace(/^Penalty\s*-\s*/i,`${e("event.penalty")} - `),a=a.replace(/^([^:]+):\s*/,"$1 ");const s=[e("event.header"),e("event.shot"),e("event.penalty"),e("event.free_kick")].map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return a=a.replace(new RegExp(`^(${s.join("|")})\\s*-\\s*(.+)$`,"i"),(t,e,a)=>`${a} (${e.toLowerCase()})`),a=a.replace(/\bN\/A\b/g,e("generic.unknown")),a}_renderStatusBadge(t){const e=t.state;return"in"===e?s.qy`<span class="status-badge live"><span class="dot"></span>${this._t("status.live")}</span>`:"post"===e?s.qy`<span class="status-badge finished">${this._t("status.finished")}</span>`:this.compact?"":s.qy`<span class="status-badge scheduled">${t.date||this._t("status.scheduled")}</span>`}_renderClock(t){const e=t.state;if("in"===e){const e=t.status_detail&&"N/A"!==t.status_detail?t.status_detail:"",a=t.clock&&"N/A"!==t.clock?t.clock:"",i=e||t.status||"",o=nt[String(i).trim().toLowerCase()],r=a||(o?this._t(o):i);return s.qy`<div class="clock"><span class="dot"></span>${r}</div>`}if("post"===e)return s.qy`<div class="clock finished">${this._t("status.full_time")}</div>`;const a=this._liveCountdown(t);return s.qy`<div class="clock upcoming">${a||t.date||""}</div>`}_renderRecord(t){if(!t||"N/A"===t)return"";const e=String(t).split("-");return 3===e.length?e.every(t=>0===parseInt(t))?"":s.qy`<div class="record">
        <span class="rec rec-w">${e[0]}${this._t("form.W")}</span>
        <span class="rec rec-d">${e[1]}${this._t("form.D")}</span>
        <span class="rec rec-l">${e[2]}${this._t("form.L")}</span>
      </div>`:s.qy`<div class="record"><span class="rec">${t}</span></div>`}_renderStandingSummary(t,e){const a=function(t,e,a){if(!t)return"";const s=t[`${e}_rank`];if(null!=s){const i=t[`${e}_points`];return`#${s}${null!=i?` · ${i} ${a("team.pts")}`:""}`}const i=t[`${e}_standing_summary`];return i&&"N/A"!==i?i:""}(t,e,t=>this._t(t));return a?s.qy`<div class="standing-summary">${a}</div>`:""}_hexToRgb(t){if(!t||"N/A"===t)return null;const e=String(t).replace("#","");return 6!==e.length?null:`${parseInt(e.slice(0,2),16)},${parseInt(e.slice(2,4),16)},${parseInt(e.slice(4,6),16)}`}_renderTopScorer(t){if(!t||!t.name)return"";const e=t.short_name||t.name,a=this._t("team.top_scorer");return s.qy`
      <div class="top-scorer" title="${a}: ${t.name} (${t.value})">
        <span class="ts-label">⚽ ${a}</span>
        <div class="ts-row">
          <span class="ts-name">${e}</span>
          <span class="ts-val">${t.value}<span class="ts-unit">★</span></span>
        </div>
      </div>
    `}_renderForm(t){if(!t||"N/A"===t)return"";const e=String(t).replace(/[^WLDwld]/g,"").toUpperCase();if(e.length<2)return"";const a=e.slice(-5).split(""),i=t=>this._t("form."+t);return s.qy`
      <div class="form-pills">
        ${a.map(t=>s.qy`<div class="form-pill ${t}">${i(t)}</div>`)}
      </div>
    `}_renderPrediction(t){return function(t,{t:e,lang:a,showDetails:i=!0}){const o=t.prediction;if(!o||"in"===t.state||"post"===t.state)return"";const r=function(t){const e=t||{},a=Q(e.percent_home),s=Q(e.percent_draw),i=Q(e.percent_away),o=(a||0)+(s||0)+(i||0),r=t=>o>0&&null!==t?t/o*100:0;return{hasBar:null!==a||null!==s||null!==i,home:a,draw:s,away:i,wHome:r(a),wDraw:r(s),wAway:r(i)}}(o),n=function(t,e="en"){const a=String(t||"").trim();if(!a)return a;const s=Y[(e||"en").split("-")[0].toLowerCase()];if(!s)return a;let i=a;for(const[t,e]of Object.entries(s))i.includes(t)&&(i=i.split(t).join(e));return i}(o.advice&&"N/A"!==o.advice?o.advice:"",a),l=i?function(t){const e=t&&t.comparison||{},a=[];for(const t of tt){const s=e[t];if(!s)continue;const i=Q(s.home),o=Q(s.away);if(null===i&&null===o)continue;const r=(i||0)+(o||0);a.push({key:t,home:i,away:o,wHome:r>0?(i||0)/r*100:50,wAway:r>0?(o||0)/r*100:50})}return a}(o):[],c=i?function(t){const e=t||{},a=e.goals_home||"",s=e.goals_away||"",i=e.under_over||"";return a||s||i?{home:a,away:s,line:i}:null}(o):null;if(!(r.hasBar||n||l.length||c))return"";const d=t.home_abbrev||t.home_team||"",p=t.away_abbrev||t.away_team||"";return s.qy`
    <div class="pred">
      <div class="sec-head">
        <span class="pred-title info" title="${e("team.prediction_note")}" aria-label="${e("team.prediction_note")}">${e("team.prediction")}</span>
        ${it(t,e)}
      </div>
      ${r.hasBar?s.qy`
        <div class="pred-bar">
          <div class="pred-seg home" style="width:${r.wHome}%" title="${d} ${st(r.home)}"></div>
          <div class="pred-seg draw" style="width:${r.wDraw}%" title="${e("match.draw")} ${st(r.draw)}"></div>
          <div class="pred-seg away" style="width:${r.wAway}%" title="${p} ${st(r.away)}"></div>
        </div>
        <div class="pred-legend">
          <span class="pred-l home">${d} ${st(r.home)}</span>
          <span class="pred-l draw">${e("match.draw")} ${st(r.draw)}</span>
          <span class="pred-l away">${st(r.away)} ${p}</span>
        </div>
      `:""}
      ${l.length?s.qy`
        <div class="pred-cmp">
          ${l.map(t=>s.qy`
            <div class="pred-cmp-head">
              <span class="pred-cmp-v home">${st(t.home)}</span>
              <span class="pred-cmp-label">${e("team.cmp_"+t.key)}</span>
              <span class="pred-cmp-v away">${st(t.away)}</span>
            </div>
            <div class="pred-cmp-bar">
              <div class="pred-cmp-seg home" style="width:${t.wHome}%"></div>
              <div class="pred-cmp-seg away" style="width:${t.wAway}%"></div>
            </div>
          `)}
        </div>
      `:""}
      ${c?s.qy`
        <div class="pred-xg" title="${e("team.goal_lines_note")}" aria-label="${e("team.goal_lines_note")}">
          <span class="pred-xg-label info">${e("team.goal_lines")}</span>
          <span class="pred-xg-val">${d} ${at(c.home,a)||"—"} · ${p} ${at(c.away,a)||"—"}${c.line?` · ${e("team.goal_lines_total")} ${at(c.line,a)}`:""}</span>
        </div>
      `:""}
      ${n?s.qy`<div class="pred-advice">${n}</div>`:""}
    </div>
  `}(t,{t:t=>this._t(t),lang:(0,i.$c)(this.hass,this._config),showDetails:!1!==this._config.show_prediction_details})}_renderOdds(t){return function(t,{t:e}){if("post"===t.state)return"";const a=t.odds;if(!a)return"";const i=function(t){const e=t||{},a=Q(e.home),s=Q(e.draw),i=Q(e.away),o=[a,s,i].filter(t=>null!==t),r=o.length?Math.min(...o):null,n=o.length>=2&&1===o.filter(t=>t===r).length,l="number"==typeof e.bookmaker_count&&e.bookmaker_count>0?e.bookmaker_count:null,c=!0===e.live;return{present:o.length>0,home:a,draw:s,away:i,min:r,showFav:n,count:c?null:l,singular:1===l,live:c}}(a);if(!i.present)return"";const o=t.home_abbrev||t.home_team||"",r=t.away_abbrev||t.away_team||"",n=i.singular?"team.odds_avg_one":"team.odds_avg",l=(t,a,o,r)=>{const n=i.showFav&&null!==r&&r===i.min,l=n?e("team.favourite"):"";return s.qy`
      <div class="odds-col ${t}${n?" fav":""}" title="${l}" aria-label="${l}">
        <div class="odds-sign">${a}</div>
        <div class="odds-team">${o}</div>
        <div class="odds-val">${null!==r?r.toFixed(2):"–"}</div>
      </div>`};return s.qy`
    <div class="odds">
      <div class="odds-head">
        <span class="odds-title info" title="${i.live?e("team.odds_live_note"):e("team.odds_note")}" aria-label="${i.live?e("team.odds_live_note"):e("team.odds_note")}">${i.live?e("team.odds_live"):e("team.odds")}</span>
        ${i.live?s.qy`<span class="odds-sub live">${e("team.odds_live_badge")}</span>`:i.count?s.qy`<span class="odds-sub">${e(n,{n:i.count})}</span>`:""}
        ${i.live?"":it(t,e)}
      </div>
      <div class="odds-row">
        ${l("home","1",o,i.home)}
        ${l("draw","X",e("match.draw"),i.draw)}
        ${l("away","2",r,i.away)}
      </div>
    </div>
  `}(t,{t:(t,e)=>this._t(t,e)})}_renderInjuries(t){return function(t,{t:e}){if("post"===t.state)return"";const a=t.injuries_home||[],i=t.injuries_away||[];if(!a.length&&!i.length)return"";const o=t=>{const a=t.suspended?e("team.suspended"):e("team.injured");return s.qy`
      <div class="inj-row">
        <span class="inj-ic" role="img" aria-label="${a}" title="${a}">${t.suspended?"🚫":"🩹"}</span>
        <span class="inj-name">${t.player}</span>
        ${t.reason?s.qy`<span class="inj-reason">${t.reason}</span>`:""}
      </div>`},r=(t,a)=>{const{shown:i,extra:r}=function(t){const e=Array.isArray(t)?t:[];return{shown:e.slice(0,6),extra:Math.max(0,e.length-6)}}(a);return s.qy`
      <div class="inj-col">
        <div class="inj-team">${t}</div>
        ${i.length?i.map(o):s.qy`<div class="inj-none">–</div>`}
        ${r>0?s.qy`<div class="inj-more">${e("team.and_more",{n:r})}</div>`:""}
      </div>`};return s.qy`
    <div class="inj">
      <div class="inj-title">${e("team.injuries")}</div>
      <div class="inj-cols">
        ${r(t.home_team||"",a)}
        ${r(t.away_team||"",i)}
      </div>
    </div>
  `}(t,{t:(t,e)=>this._t(t,e)})}_renderStatsRow(t){const e=t.home_statistics||{},a=t.away_statistics||{},i=[],o=t=>{const e=parseFloat(t);return isNaN(e)?null:e},r=(t,s,r,n="")=>{const l=o(e[s]),c=o(a[r]);null!==l&&null!==c&&i.push({label:t,home:e[s],away:a[r],hNum:l,aNum:c,suffix:n})};return r(this._t("team.possession"),"possessionPct","possessionPct","%"),r(this._t("team.xg"),"expectedGoals","expectedGoals"),r(this._t("team.shots"),"totalShots","totalShots"),r(this._t("team.on_target"),"shotsOnTarget","shotsOnTarget"),0===i.length?"":s.qy`
      <div class="stats-row">
        ${i.map(t=>{const e=t.hNum+t.aNum,a=e>0?t.hNum/e*100:50,i=100-a;return s.qy`
            <div class="stat-bar">
              <div class="stat-bar-label">
                <span class="home-val">${t.home}${t.suffix}</span>
                <span class="label-text">${t.label}</span>
                <span class="away-val">${t.away}${t.suffix}</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-home" style="width: ${a}%;"></div>
                <div class="stat-bar-away" style="width: ${i}%;"></div>
              </div>
            </div>
          `})}
      </div>
    `}render(){if(z(this,this._config),!this.hass||!this._config)return B(this._t("ui.loading"));const t=this._config.entity,e=this.hass.states[t];if(this.compact=(0,C.Oc)(this._config,e?.attributes?.card_defaults),!e){const e=K.get(t);if(!e||!e.data.matches)return F("⚠️",this._t("ui.entity_not_found"),`${this._t("ui.entity_not_found")}: ${t}`,this._t("ui.check_entity_config"));this._cachedData=e.data}if(e&&"unavailable"===e.state){const e=K.get(t);if(!e||!e.data.matches)return F("📡",this._t("ui.sensor_unavailable"),this._t("ui.sensor_unavailable_hint"),this._t("ui.restart_ha"));this._cachedData=e.data}if(e&&this._isLoading)return Date.now()-this._loadingStarted>1e4?F("⏱",this._t("ui.loading_timeout"),`${this._t("ui.entity_not_responding")}: ${this._config.entity}`,this._t("ui.check_integration")):B(this._t("ui.loading"));const a=e&&"unavailable"!==e.state?e.attributes:this._cachedData;if(!a||!a.matches||0===a.matches.length)return V(a,t=>this._t(t),()=>{const t=this._config.entity||"";return t.includes("soccerlive_next")||t.includes("soccerlive_all_mixed")||t.includes("soccer_live_next")||t.includes("soccer_live_all_mixed")?G("📅",this._t("ui.off_season"),this._t("team.off_season")):F("⚠️",this._t("ui.wrong_entity_type"),t,this._t("ui.wrong_entity_type_hint"))});const o=a.matches[0],r=(o.league_name&&"N/A"!==o.league_name?o.league_name:"")||"",n=function(t,e){const a=Array.isArray(t)?t:[],s=e&&"N/A"!==e?String(e).toLowerCase():"";return(s?a.find(t=>t&&t.name&&String(t.name).toLowerCase()===s):null)||(1===a.length?a[0]:null)}(a.league_info,r),l=ht({competitionName:r||n&&n.name||"",competitionLogo:o.league_logo&&"N/A"!==o.league_logo?o.league_logo:n&&n.logo_href,fallbackLogo:null,isFriendly:o.is_friendly}),c="in"===o.state,d="post"===o.state,p=c||d,h=(0,i.$c)(this.hass,this._config),u=gt(o.league_name&&"N/A"!==o.league_name?o.league_name:n&&n.abbreviation&&"N/A"!==n.abbreviation?n.abbreviation:o.season_info&&"N/A"!==o.season_info&&this._shouldShowPhase(o.season_info)?this._translatePhase(o.season_info):"",h),g=this._hexToRgb(o.home_color),m=this._hexToRgb(o.away_color),f=g||m?`background:\n      radial-gradient(ellipse at 0% 0%, rgba(${g||"99,102,241"},0.18), transparent 55%),\n      radial-gradient(ellipse at 100% 100%, rgba(${m||"236,72,153"},0.18), transparent 55%)`:"",_=this.myTeam||(a.team_name||"").toLowerCase(),b=_&&o.home_team&&o.home_team.toLowerCase().includes(_),v=_&&o.away_team&&o.away_team.toLowerCase().includes(_);return s.qy`
      <ha-card class="${c?"live":""} ${this.compact?"compact":""}">
        <div class="bg-logos">
          ${o.home_logo?s.qy`<div class="bg-logo home"><img src="${o.home_logo}" alt="" loading="lazy"></div>`:""}
          ${o.away_logo?s.qy`<div class="bg-logo away"><img src="${o.away_logo}" alt="" loading="lazy"></div>`:""}
        </div>
        <div class="hero-bg" style="${f}"></div>

        ${this.showEventToasts&&this._toastVisible?s.qy`
          <div class="event-toast variant-${this._toastVariant}" .textContent=${this._toastMessage}></div>
        `:""}

        <div class="top-bar">
          <div class="competition">
            <span class="comp-icon">
              ${l?s.qy`<img src="${l}" alt="" />`:"⚽"}
            </span>
            <span class="comp-name">${u||" "}</span>
          </div>
          ${this._renderStatusBadge(o)}
        </div>

        <div class="scoreboard">
          <div class="team-side home">
            <div class="team-logo-wrap">
              ${o.home_logo?s.qy`<img class="team-logo-big" src="${o.home_logo}" alt="${o.home_team}" />`:s.qy`<div class="team-logo-fallback">${o.home_abbrev||"?"}</div>`}
            </div>
            <div class="team-name-big ${b?"my-team":""}">${o.home_team}</div>
            ${c?"":this._renderStandingSummary(o,"home")}
            ${this._renderRecord(o.home_record)}
            ${c?this._renderForm(o.home_form):this._renderForm(o.last_five_home)||this._renderForm(o.home_form)}
            ${c?"":this._renderTopScorer(o.home_top_scorer)}
          </div>

          <div class="score-center">
            ${p?s.qy`<div class="score-numbers">${q(o.home_score)} <span class="dash">-</span> ${q(o.away_score)}</div>`:s.qy`<div class="score-vs">${this._t("match.vs")}</div>`}
            ${this._renderClock(o)}
          </div>

          <div class="team-side away">
            <div class="team-logo-wrap">
              ${o.away_logo?s.qy`<img class="team-logo-big" src="${o.away_logo}" alt="${o.away_team}" />`:s.qy`<div class="team-logo-fallback">${o.away_abbrev||"?"}</div>`}
            </div>
            <div class="team-name-big ${v?"my-team":""}">${o.away_team}</div>
            ${c?"":this._renderStandingSummary(o,"away")}
            ${this._renderRecord(o.away_record)}
            ${c?this._renderForm(o.away_form):this._renderForm(o.last_five_away)||this._renderForm(o.away_form)}
            ${c?"":this._renderTopScorer(o.away_top_scorer)}
          </div>
        </div>

        ${c?this._renderStatsRow(o):""}

        ${!0===this._config.hide_meta?"":((t,{lang:e="en",t:a=t=>t,weatherBadge:o=null,showDate:r=!1,hideBroadcasts:n=!1}={})=>{if(!t)return s.qy``;const l=t.venue&&"N/A"!==t.venue?t.venue:"",c=t.venue_city&&"N/A"!==t.venue_city?t.venue_city:"",d=l?c?`${l}, ${c}`:l:"",p=t.neutral_site||!1,h=n?[]:Array.isArray(t.broadcasts)&&t.broadcasts.length?t.broadcasts:t.broadcast&&"N/A"!==t.broadcast?[t.broadcast]:[],u=parseInt(t.attendance,10),g=!isNaN(u)&&u>0,m=t.links||{},f=t.has_stats&&(m.stats||m.summary),_=t.has_commentary&&(m.commentary||m.summary),b=!!m.video,v=h.length||g||f||_||b,x=t=>t&&/^https?:\/\//i.test(t)&&window.open(t,"_blank","noopener,noreferrer");return s.qy`
    ${d||o||r?s.qy`
      <div class="smm-venue-row">
        ${d?s.qy`
          <div class="smm-venue">
            <svg class="smm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span title="${p?a("ui.neutral_site")||"Neutral venue":""}">${d}${p?" ⚖️":""}</span>
          </div>
        `:""}
        ${o||""}
        ${r&&t.date?s.qy`
          <div class="smm-date">
            <svg class="smm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${(0,i.IU)(t.date,e)||t.date}</span>
          </div>
        `:""}
      </div>
    `:""}

    ${v?s.qy`
      <div class="smm-chips">
        ${h.length?s.qy`
          <span class="smm-chip broadcast">
            <svg class="smm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="13" rx="2"/>
              <polyline points="17 2 12 7 7 2"/>
            </svg>
            ${h.join(" · ")}
          </span>
        `:""}
        ${g?s.qy`
          <span class="smm-chip attendance">
            <svg class="smm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            ${u.toLocaleString(e)} ${a("team.spectators")||""}
          </span>
        `:""}
        ${f?s.qy`
          <span class="smm-chip link" title="${a("ui.open_stats")||""}" @click=${()=>x(m.stats||m.summary)}>
            📊 ${a("card.stats")||"Stats"}
          </span>
        `:""}
        ${_?s.qy`
          <span class="smm-chip link" title="${a("ui.open_commentary")||""}" @click=${()=>x(m.commentary||m.summary)}>
            💬 ${a("card.commentary")||"Commentary"}
          </span>
        `:""}
        ${b?s.qy`
          <span class="smm-chip link" title="${a("ui.open_video")||""}" @click=${()=>x(m.video)}>
            🎬 ${a("card.video")||"Video"}
          </span>
        `:""}
      </div>
    `:""}
  `})(o,{lang:(0,i.$c)(this.hass,this._config),t:t=>this._t(t),weatherBadge:!1!==this._config.show_weather&&this._weatherBadge||null,showDate:!p&&!this.compact,hideBroadcasts:!0===this._config.hide_broadcasts})}
        ${p?s.qy`
          <div class="meta-row details-row">
            <button class="info-btn" @click="${()=>this.showDetails(o)}">${this._t("team.details")} ›</button>
          </div>
        `:""}

        ${this.compact||!1===this._config.show_prediction?"":this._renderPrediction(o)}
        ${this.compact||!1===this._config.show_odds?"":this._renderOdds(o)}
        ${this.compact||!1===this._config.show_injuries?"":this._renderInjuries(o)}
        ${!this.compact&&this.showFormTrend?this._renderFormTrend(a.previous_matches,a.matches,this.myTeam||a.team_name):""}
        ${!this.compact&&this.showPreviousMatches?this._renderPreviousMatches(a.previous_matches,a.matches,this.myTeam||a.team_name):""}
        ${this.compact?"":this._renderH2H(o.head_to_head,this.myTeam||a.team_name||o.home_team)}
        ${this.compact?"":this._renderUpcomingList(a.upcoming_matches,a.matches,this.myTeam||a.team_name)}
      </ha-card>
    `}_relativeDate(t){if(!t)return"";const e=t.split(" "),[a,s,o]=(e[0]||"").split(/[-\/]/).map(Number);if(!a||!s||!o)return e[0]||"";const r=new Date(o,s-1,a),n=new Date;n.setHours(0,0,0,0);const l=Math.round((r-n)/864e5);if(1===l)return this._t("time.tomorrow");if(l<=6&&l>1)return this._t("time.in_n_d",{n:l});(0,i.$c)(this.hass,this._config);const c=`month.${s}`;return`${a} ${this._t(c)}`}_teamBadge(t,e,a){const i=(0,k.GD)(e)||"rgba(var(--cl-accent-rgb),0.7)",o=t=>t&&"N/A"!==t?t:"",r=o(t)||o(a)||"?";return s.qy`<span class="abbrev-badge" style="--team-c:${i}"><span class="abbrev-name">${r}</span></span>`}_renderFormTrend(t,e,a){const i=(a||"").toLowerCase(),o=t&&t.length>0?t:(e||[]).filter(t=>"post"===t.state).slice(-10).reverse();if(0===o.length)return"";const r=o.map(t=>{const e=t.home_team&&t.home_team.toLowerCase().includes(i),a=parseInt(t.home_score),s=parseInt(t.away_score);return isNaN(a)||isNaN(s)?null:a===s?"D":e&&a>s||!e&&s>a?"W":"L"}).filter(Boolean).reverse();if(r.length<2)return"";const n=r.filter(t=>"W"===t).length,l=r.filter(t=>"D"===t).length,c=r.filter(t=>"L"===t).length;return s.qy`
      <div class="form-trend-section">
        <div class="upcoming-list-title">${this._t("team.form_trend")||"Seizoenvorm"}</div>
        <div class="form-trend-row">
          <div class="form-trend-dots">
            ${r.map(t=>s.qy`<span class="ft-dot ${t.toLowerCase()}">${this._t("form."+t)}</span>`)}
          </div>
          <span class="form-trend-summary">${n}${this._t("form.W")} ${l}${this._t("form.D")} ${c}${this._t("form.L")}</span>
        </div>
      </div>
    `}_renderPreviousMatches(t,e,a){const o=t&&t.length>0?t.filter(t=>"post"===t.state||!t.state):e?e.filter(t=>"post"===t.state).slice(-3).reverse():[];if(0===o.length)return"";const r=(a||"").toLowerCase();return s.qy`
      <div class="upcoming-list">
        <div class="upcoming-list-title">${this._t("team.previous_matches")}</div>
        ${o.map(t=>{const e=r&&t.home_team&&t.home_team.toLowerCase().includes(r),a=r&&t.away_team&&t.away_team.toLowerCase().includes(r),o=parseInt(t.home_score),n=parseInt(t.away_score),l=!isNaN(o)&&!isNaN(n)&&o>n,c=!isNaN(o)&&!isNaN(n)&&n>o,d=e||a?e&&l||a&&c?"tw":e&&c||a&&l?"tl":"draw":l?"home-win":c?"away-win":"draw",p=t=>t&&"N/A"!==t?t:"",h=gt(p(t.league_abbrev)||p(t.league_abbreviation)||p(t.competition_abbreviation)||p(t.league_name),(0,i.$c)(this.hass,this._config));return s.qy`
            <div class="upcoming-row">
              <span class="upcoming-date">
                ${(0,i.iS)(t.date,(0,i.$c)(this.hass,this._config))||(t.date?t.date.split(" ")[0]:"")}
                <span class="upcoming-date-day prev-comp-label">${h}</span>
              </span>
              <span class="upcoming-team home-side ${e?"tracked":""}">
                ${t.home_logo?s.qy`<img src="${t.home_logo}" alt="" />`:""}
                ${this._teamBadge(t.home_abbrev,t.home_color,t.home_team)}
              </span>
              <span class="prev-score ${d}">
                ${q(t.home_score,"-")}-${q(t.away_score,"-")}
              </span>
              <span class="upcoming-team away-side ${a?"tracked":""}">
                ${this._teamBadge(t.away_abbrev,t.away_color,t.away_team)}
                ${t.away_logo?s.qy`<img src="${t.away_logo}" alt="" />`:""}
              </span>
            </div>
          `})}
      </div>
    `}_renderUpcomingList(t,e,a){const o=t&&t.length>0?t:e&&e.length>1?e.slice(1).filter(t=>"pre"===t.state||"in"===t.state).slice(0,4):[];if(0===o.length)return"";const r=(a||"").toLowerCase();return s.qy`
      <div class="upcoming-list">
        <div class="upcoming-list-title">${this._t("team.upcoming_matches")}</div>
        ${o.map(t=>{const e=r&&t.home_team&&t.home_team.toLowerCase().includes(r),a=r&&t.away_team&&t.away_team.toLowerCase().includes(r),o="in"===t.state,n=t.head_to_head&&t.head_to_head.length>0,l=t=>t&&"N/A"!==t?t:"",c=e?l(t.away_form):a?l(t.home_form):"",d=gt(t.league_name&&"N/A"!==t.league_name?t.league_name:"",(0,i.$c)(this.hass,this._config));return s.qy`
            <div class="upcoming-row ${n?"clickable":""}"
                 @click="${n?()=>this.showDetails(t):null}">
              <span class="upcoming-date">
                ${t.date&&t.date.split(" ")[1]||""}
                <span class="upcoming-date-day">${this._relativeDate(t.date)}</span>
                ${d?s.qy`<span class="upl-comp-label">${d}</span>`:""}
              </span>
              <span class="upcoming-team home-side ${e?"tracked":""}">
                ${t.home_logo?s.qy`<img src="${t.home_logo}" alt="" />`:""}
                ${this._teamBadge(t.home_abbrev,t.home_color,t.home_team)}
              </span>
              ${o?s.qy`<span class="upcoming-live-score">${q(t.home_score)}<span class="live-dot">●</span>${q(t.away_score)}</span>`:s.qy`<span class="upcoming-vs">-</span>`}
              <span class="upcoming-team away-side ${a?"tracked":""}">
                ${this._teamBadge(t.away_abbrev,t.away_color,t.away_team)}
                ${t.away_logo?s.qy`<img src="${t.away_logo}" alt="" />`:""}
              </span>
              ${p=c,h=e?"side-right":"side-left",p?s.qy`<div class="upl-opp-form ${h}">
              ${p.split("").slice(-5).map(t=>{const e="W"===t?"w":"L"===t||"V"===t?"l":"d";return s.qy`<span class="upl-fd ${e}"></span>`})}
            </div>`:""}
            </div>
          `;var p,h})}
      </div>
    `}_renderH2H(t,e){if(!t||0===t.length)return"";const a=(e||"").toLowerCase();let o=0,r=0,n=0;t.forEach(t=>{const e=parseInt(t.home_score)||0,s=parseInt(t.away_score)||0;e!==s?((t.home_team||"").toLowerCase().includes(a)||a.includes((t.home_team||"").toLowerCase().split(" ")[0])?e>s:s>e)?o++:n++:r++});const l=o+r+n,c=l?Math.round(o/l*100):33,d=l?Math.round(r/l*100):34,p=100-c-d;return s.qy`
      <div class="h2h-section">
        <div class="upcoming-list-title">${this._t("team.h2h")}</div>
        <div class="h2h-summary">
          <span class="h2h-summary-num home">${o}</span>
          <span class="h2h-summary-label">${this._t("match.draw")||"D"} ${r}</span>
          <span class="h2h-summary-num away">${n}</span>
        </div>
        <div class="h2h-bar">
          <div class="h2h-bar-seg home" style="width:${c}%"></div>
          <div class="h2h-bar-seg draw" style="width:${d}%"></div>
          <div class="h2h-bar-seg away" style="width:${p}%"></div>
        </div>
        ${t.slice(0,5).map(t=>{const e=(0,i.iS)(t.date,(0,i.$c)(this.hass,this._config)),o=parseInt(t.home_score)>parseInt(t.away_score),r=parseInt(t.away_score)>parseInt(t.home_score),n=t=>{const e=(t||"").toLowerCase();return e.includes(a)||a.includes(e.split(" ")[0])},l=parseInt(t.home_score,10),c=parseInt(t.away_score,10);let d="";if(!Number.isNaN(l)&&!Number.isNaN(c)){const e=n(t.home_team),a=n(t.away_team);(e||a)&&(d=l===c?"draw":e&&l>c||a&&c>l?"win":"loss")}return s.qy`
            <div class="h2h-row">
              <span class="h2h-date">${e}</span>
              <span class="h2h-team ${o?"winner":""}">${t.home_team||""}</span>
              <span class="h2h-score ${d}">${q(t.home_score,"-")} - ${q(t.away_score,"-")}</span>
              <span class="h2h-team away ${r?"winner":""}">${t.away_team||""}</span>
            </div>
          `})}
      </div>
    `}updated(t){if((t.has("showPopup")||t.has("activeMatch"))&&(this.showPopup?(this._renderPopupPortal(),this._escHandler||(this._escHandler=t=>{"Escape"===t.key&&(this.showPopup=!1)},document.addEventListener("keydown",this._escHandler))):(this._removePopupPortal(),this._escHandler&&(document.removeEventListener("keydown",this._escHandler),this._escHandler=null))),t.has("activeMatch")&&this.activeMatch&&this._loadWeather(this.activeMatch.venue,this.activeMatch.venue_lat,this.activeMatch.venue_lon,this.activeMatch.date_iso),t.has("hass")&&this.hass&&!this._eventSubscriptions?.length&&this._subscribeToEvents(),t.has("hass")&&this.hass&&this._config){const t=this.hass.states[this._config.entity];if(this.activeMatch&&t?.attributes){const s=(e=t.attributes,(a=this.activeMatch.event_id)?String(e?.next_match?.event_id)===String(a)?e.next_match:(e?.matches||[]).find(t=>String(t.event_id)===String(a))||null:null);s&&s!==this.activeMatch&&(this.activeMatch=s)}if(t&&"unavailable"!==t.state&&(this._isLoading=!1,K.set(this._config.entity,t.attributes)),t&&t.attributes.matches&&t.attributes.matches[0]){const e=t.attributes.matches[0];e.venue!==this._lastWeatherVenue&&this._loadWeather(e.venue,e.venue_lat,e.venue_lon,e.date_iso)}}var e,a}_copyPopupThemeVars(t){const e=getComputedStyle(this);["--cl-bg","--cl-text","--cl-text-2","--cl-divider","--cl-accent","--cl-accent-2"].forEach(a=>{const s=e.getPropertyValue(a);s&&t.style.setProperty(a,s)})}_renderPopupPortal(){if(this.activeMatch&&(this._popupPortal||(this._popupPortal=document.createElement("dialog"),this._popupPortal.className="soccer-live-popup-portal",this._popupCancelHandler=t=>{t.preventDefault(),this.showPopup=!1},this._popupClickHandler=t=>{t.target===this._popupPortal&&(this.showPopup=!1)},this._popupPortal.addEventListener("cancel",this._popupCancelHandler),this._popupPortal.addEventListener("click",this._popupClickHandler),document.body.appendChild(this._popupPortal)),this._copyPopupThemeVars(this._popupPortal),(0,s.XX)(s.qy`${this._renderPopupPortalStyles()}${$t("popup",8)}${this._renderPopup()}`,this._popupPortal),!this._popupPortal.open))try{this._popupPortal.showModal()}catch(t){this._popupPortal.setAttribute("open","")}}_removePopupPortal(){this._popupPortal&&(this._popupPortal.open&&this._popupPortal.close(),this._popupCancelHandler&&(this._popupPortal.removeEventListener("cancel",this._popupCancelHandler),this._popupCancelHandler=null),this._popupClickHandler&&(this._popupPortal.removeEventListener("click",this._popupClickHandler),this._popupClickHandler=null),(0,s.XX)(s.qy``,this._popupPortal),this._popupPortal.remove(),this._popupPortal=null)}async _loadWeather(t,e=null,a=null,o=null){this._lastWeatherVenue=t;try{this._weatherBadge=await async function(t,e=null,a=null,o=null,r=null,n=null){if(!t||"N/A"===t)return s.qy``;try{const l=null==o||""===o?NaN:Number(o),c=null==r||""===r?NaN:Number(r);let d=Number.isFinite(l)&&Number.isFinite(c)?{lat:l,lon:c}:await function(t){if(!t||"N/A"===t)return null;if(M.has(t))return M.get(t);let e=L[t]||null;if(!e){const a=t.replace(/\s+\d+$/,"");a!==t&&(e=L[a]||null)}return e&&(j(M),M.set(t,e)),e}(t);if(!d)return s.qy``;const p=await async function(t,e,a=null){const s=function(t){if(!t)return null;const e=Date.parse(t);if(Number.isNaN(e))return null;const a=e-Date.now();return a<=36e5||a>13824e5?null:Math.floor(e/1e3)}(a),i=s?`${t},${e},@${s}`:`${t},${e}`;if(T.has(i)){const t=T.get(i);if(Date.now()-t.timestamp<36e5)return t.data}if(P.has(i))return P.get(i);const o=(async()=>{try{const a=s?await async function(t,e,a){const s=new Date(1e3*a).toISOString().slice(0,10),i=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=GMT&timeformat=unixtime&start_date=${s}&end_date=${s}`),o=(await i.json()).hourly;if(!o||!Array.isArray(o.time)||!o.time.length)return null;let r=0,n=1/0;for(let t=0;t<o.time.length;t++){const e=Math.abs(o.time[t]-a);e<n&&(n=e,r=t)}return N(o.temperature_2m[r],o.weather_code[r],o.wind_speed_10m[r],!0)}(t,e,s):await async function(t,e){const a=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`),s=await a.json();return s.current?N(s.current.temperature_2m,s.current.weather_code,s.current.wind_speed_10m,!1):null}(t,e);if(a)return j(T),T.set(i,{data:a,timestamp:Date.now()}),a}catch(t){console.warn("Weather fetch failed:",t)}finally{P.delete(i)}return null})();return P.set(i,o),o}(d.lat,d.lon,n);if(!p)return s.qy``;const h=e?(0,i.$c)(e,a):"en",u=(0,i.t)("weather.wind",h),g=(0,i.t)(p.description_key||"weather.unknown",h),m=p.forecast?`${t}: ${g} (⏱)`:`${t}: ${g}`;return s.qy`
      <div class="weather-badge" title="${m}">
        <span class="weather-icon">${p.icon}</span>
        <span class="weather-temp">${p.temp}°</span>
        <span class="weather-wind" title="${u}">${p.wind} ${p.wind_unit||"BFT"}</span>
      </div>
    `}catch(t){return console.warn("Weather badge error:",t),s.qy``}}(t,this.hass,this._config,e,a,o),this.requestUpdate()}catch(t){console.warn("Weather load failed:",t)}}_renderPopup(){const t=this.activeMatch,e="pre"===t.state,a="in"===t.state,o="post"===t.state,r=a?t.clock&&"N/A"!==t.clock?t.clock:function(t,e){const a=String(t||"").trim(),s=nt[a.toLowerCase()];return s?e(s):a}(t.status,t=>this._t(t))||this._t("status.live"):o?this._t("status.full_time"):e&&((0,i.DK)(t.date,(0,i.$c)(this.hass,this._config))||t.date)||"";return s.qy`
      <div
        class="popup-overlay"
        @click="${t=>{t.target===t.currentTarget&&(this.showPopup=!1)}}"
      >
        <div class="popup-box" @click="${t=>t.stopPropagation()}">
          <h3 class="popup-title">${this._t("popup.match_details")}</h3>
          <div class="popup-score-row">
            <div class="popup-team-col">
              <img class="popup-logo" src="${t.home_logo}" alt="" @error="${t=>t.target.style.display="none"}">
              <div class="popup-team-name">${t.home_team}</div>
            </div>
            <div class="popup-score-center">
              <div class="popup-score">${q(t.home_score,"-")}<span class="popup-score-sep"> - </span>${q(t.away_score,"-")}</div>
              ${r?s.qy`<div class="popup-clock">${r}</div>`:""}
            </div>
            <div class="popup-team-col">
              <img class="popup-logo" src="${t.away_logo}" alt="" @error="${t=>t.target.style.display="none"}">
              <div class="popup-team-name">${t.away_team}</div>
            </div>
          </div>
          ${this._hasStats(t.home_statistics)||this._hasStats(t.away_statistics)?s.qy`
          <div class="popup-stats-grid">
            ${this._renderPopupStatBox(t.home_team,t.home_statistics)}
            ${this._renderPopupStatBox(t.away_team,t.away_statistics)}
          </div>`:""}
          ${this._renderPopupEventGroups(t)}
          ${this._renderPopupLineup(t)}
          ${this._renderPopupTimeline(t)}
          ${this._renderPopupH2H(t)}
          <button class="popup-close-btn" @click="${()=>this.showPopup=!1}">${this._t("generic.close")}</button>
        </div>
      </div>
    `}_renderPopupPortalStyles(){return s.qy`
      <style>
        ${bt.cssText}
        .soccer-live-popup-portal {
          border: 0;
          padding: 0;
          margin: auto;
          max-width: none;
          max-height: none;
          width: 100vw;
          height: 100vh;
          background: transparent;
          color: inherit;
          overflow: hidden;
        }
        .soccer-live-popup-portal::backdrop {
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
        }
        .popup-overlay {
          position: fixed;
          inset: 0;
          pointer-events: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
          padding: 16px;
          box-sizing: border-box;
          font-family: var(--primary-font-family, sans-serif);
        }
        .popup-box {
          background: var(--cl-bg, #1a1f2e);
          border: 1px solid var(--cl-divider, rgba(255,255,255,0.08));
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          color: var(--cl-text, #f8fafc);
          max-height: 85vh;
          max-width: 560px;
          width: 100%;
          overflow-y: auto;
          padding: 24px;
          margin: auto;
          box-sizing: border-box;
        }
        .popup-title {
          margin: 0 0 20px;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--cl-accent, #6366f1), var(--cl-accent-2, #ec4899));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .popup-score-row { display: flex; justify-content: center; align-items: flex-start; gap: 14px; margin-bottom: 24px; }
        .popup-team-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .popup-team-name { font-size: 12px; font-weight: 700; text-align: center; color: var(--cl-text, #f8fafc); line-height: 1.25; word-break: break-word; }
        .popup-logo { width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); }
        .popup-score-center { flex: 0 0 auto; text-align: center; padding-top: 14px; }
        .popup-score { font-size: 42px; font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
        .popup-score-sep { opacity: 0.4; }
        .popup-clock { font-size: 12px; color: var(--cl-text-2, #94a3b8); margin-top: 8px; font-weight: 600; }
        .popup-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
        .popup-stat-box { background: rgba(255,255,255,0.04); padding: 14px; border-radius: 14px; }
        .popup-stat-team { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--cl-text-2, #94a3b8); font-weight: 700; margin-bottom: 6px; }
        .popup-stat-row { font-size: 13px; margin-bottom: 2px; }
        .popup-stat-row span { color: var(--cl-text-2, #94a3b8); }
        .popup-event-group { margin-bottom: 14px; padding: 14px; border-radius: 10px; border-left: 3px solid; }
        .popup-event-group.goal { background: rgba(99,102,241,0.1); border-color: #6366f1; }
        .popup-event-group.yellow { background: rgba(245,158,11,0.1); border-color: #f59e0b; }
        .popup-event-group.red { background: rgba(239,68,68,0.1); border-color: #ef4444; }
        .popup-event-title { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 800; }
        .popup-event-group.goal .popup-event-title { color: #6366f1; }
        .popup-event-group.yellow .popup-event-title { color: #f59e0b; }
        .popup-event-group.red .popup-event-title { color: #ef4444; }
        .popup-event-list { margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; }
        .popup-event-list li { margin: 4px 0; }
        .popup-section { margin-bottom: 14px; padding: 14px; border-radius: 10px; border-left: 3px solid; }
        .popup-section-h2h { background: rgba(99,102,241,0.08); border-color: var(--cl-accent, #6366f1); }
        .popup-section-title { margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 800; }
        .popup-section-title.h2h { color: var(--cl-accent, #6366f1); }
        .popup-h2h-summary { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; color: #cbd5e1; }
        .popup-h2h-num { color: #fff; font-size: 18px; font-weight: 800; }
        .popup-h2h-draw { color: #94a3b8; }
        .popup-h2h-bar { display: flex; gap: 2px; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 12px; }
        .popup-h2h-seg.home { background: var(--cl-accent, #6366f1); border-radius: 3px 0 0 3px; }
        .popup-h2h-seg.draw { background: #94a3b8; }
        .popup-h2h-seg.away { background: var(--cl-accent-2, #ec4899); border-radius: 0 3px 3px 0; }
        .popup-h2h-list { margin: 0; padding: 0; list-style: none; }
        .popup-h2h-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 6px; align-items: center; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 12px; }
        .popup-h2h-team { color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: right; }
        .popup-h2h-team.away { text-align: left; }
        .popup-h2h-team.winner { color: #fff; font-weight: 800; }
        .popup-h2h-score { font-weight: 700; color: #cbd5e1; white-space: nowrap; text-align: center; }
        .popup-h2h-date { text-align: center; padding: 2px 0; font-size: 10px; color: #475569; border-bottom: 1px solid rgba(255,255,255,0.04); list-style: none; }
        .popup-close-btn {
          background: linear-gradient(135deg, var(--cl-accent, #6366f1), var(--cl-accent-2, #ec4899));
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          margin-top: 20px;
          font-weight: 800;
          width: 100%;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .popup-box { padding: 16px; }
          .popup-logo { width: 52px; height: 52px; }
          .popup-score { font-size: 32px; }
          .popup-score-center { padding-top: 10px; }
          .popup-stats-grid { grid-template-columns: 1fr; }
        }
      </style>
    `}_hasStats(t){return!!t&&Object.keys(t).length>0}_renderPopupStatBox(t,e){const a=e||{};return this._hasStats(a)?s.qy`
      <div class="popup-stat-box">
        <div class="popup-stat-team">${t}</div>
        <div class="popup-stat-row"><span>${this._t("team.possession")}:</span> <strong>${a.possessionPct??"—"}</strong></div>
        <div class="popup-stat-row"><span>${this._t("team.shots")}:</span> <strong>${a.totalShots??"—"}</strong></div>
        <div class="popup-stat-row"><span>${this._t("team.on_target")}:</span> <strong>${a.shotsOnTarget??"—"}</strong></div>
        <div class="popup-stat-row"><span>${this._t("team.fouls")}:</span> <strong>${a.foulsCommitted??"—"}</strong></div>
      </div>
    `:s.qy`<div class="popup-stat-box"><div class="popup-stat-team">${t}</div></div>`}_renderPopupEventGroups(t){const{goals:e,yellowCards:a,redCards:i}=this.separateEvents(t.match_details||[]);if(!e.length&&!a.length&&!i.length)return"";const o=(t,e,a)=>e.length?s.qy`
      <div class="popup-event-group ${a}">
        <h5 class="popup-event-title">${t}</h5>
        <ul class="popup-event-list">${e.map(t=>s.qy`<li>${t}</li>`)}</ul>
      </div>`:"";return s.qy`
      ${o(this._t("event.goal"),e,"goal")}
      ${o(this._t("event.yellow_card"),a,"yellow")}
      ${o(this._t("event.red_card"),i,"red")}
    `}_renderPopupLineup(t){return St(t,{translate:(t,e)=>this._t(t,e),prefix:"popup",startersOnly:!0})}_renderPopupTimeline(t){return Ct(t,{translate:(t,e)=>this._t(t,e),prefix:"popup"})}_renderPopupH2H(t){const e=t.head_to_head||[];if(!e.length)return"";const a=(t.home_team||"").toLowerCase();let o=0,r=0,n=0;e.forEach(t=>{const e=parseInt(t.home_score)||0,s=parseInt(t.away_score)||0;e!==s?((t.home_team||"").toLowerCase().includes(a)||a.includes((t.home_team||"").toLowerCase().split(" ")[0])?e>s:s>e)?o++:n++:r++});const l=o+r+n,c=l?Math.round(o/l*100):33,d=l?Math.round(r/l*100):34,p=100-c-d,h=(0,i.$c)(this.hass,this._config);return s.qy`
      <div class="popup-section popup-section-h2h">
        <h5 class="popup-section-title h2h">${this._t("popup.h2h")} (${e.length})</h5>
        <div class="popup-h2h-summary">
          <span><strong class="popup-h2h-num">${o}</strong> ${t.home_team||""}</span>
          <span class="popup-h2h-draw">${r} ${this._t("match.draw")||"D"}</span>
          <span>${t.away_team||""} <strong class="popup-h2h-num">${n}</strong></span>
        </div>
        <div class="popup-h2h-bar">
          <div class="popup-h2h-seg home" style="width:${c}%"></div>
          <div class="popup-h2h-seg draw" style="width:${d}%"></div>
          <div class="popup-h2h-seg away" style="width:${p}%"></div>
        </div>
        <ul class="popup-h2h-list">
          ${e.slice(0,8).map(t=>{const e=parseInt(t.home_score)||0,a=parseInt(t.away_score)||0,o=(0,i.n1)(t.date),r=o?o.toLocaleDateString(h):"";return s.qy`
              <li class="popup-h2h-row">
                <span class="popup-h2h-team ${e>a?"winner":""}">${t.home_team}</span>
                <span class="popup-h2h-score">${q(t.home_score,"-")} - ${q(t.away_score,"-")}</span>
                <span class="popup-h2h-team away ${a>e?"winner":""}">${t.away_team}</span>
              </li>
              <li class="popup-h2h-date">${r}</li>`})}
        </ul>
      </div>`}static get styles(){return[S,Z,X,I,O,ot,s.AH`:host{--cl-accent:#0284c7;--cl-accent-2:#0f172a;--cl-live:#ef4444;--cl-live-glow:rgba(239,68,68,0.4);--cl-green:#10b981;--cl-gold:#f59e0b;--cl-gold-text:#f59e0b;--cl-card-2:rgba(0,0,0,0.03);--cl-divider:rgba(0,0,0,0.08);--cl-glass-border:rgba(0,0,0,0.08);}ha-card{position:relative;overflow:hidden;border-radius:20px;padding:0;box-shadow:none;background:transparent;color:var(--cl-text);}ha-card.empty{padding:24px;text-align:center;color:var(--cl-text-2);}.bg-logos,.hero-bg{display:none !important;}ha-card.live .hero-bg{background:radial-gradient(ellipse at 0% 0%,rgba(239,68,68,0.25),transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(251,191,36,0.20),transparent 50%);animation:hero-pulse 3s ease-in-out infinite;}@keyframes hero-pulse{0%,100%{opacity:1;}50%{opacity:0.6;}}.top-bar,.scoreboard,.stats-row,.meta-row{position:relative;z-index:2;}.top-bar{position:relative;z-index:2;}.status-badge{flex-shrink:0;padding:5px 11px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;display:inline-flex;align-items:center;gap:6px;}.status-badge.live{background:linear-gradient(135deg,var(--cl-live),#f97316);color:white;box-shadow:0 4px 16px var(--cl-live-glow);animation:badge-pulse 2s ease-in-out infinite;}.status-badge.live .dot{width:6px;height:6px;border-radius:50%;background:white;animation:pulse-dot 1.2s ease-in-out infinite;}.status-badge.finished{background:linear-gradient(135deg,var(--cl-green),#059669);color:white;}.status-badge.scheduled{background:var(--cl-card-2);border:1px solid var(--cl-glass-border);color:var(--cl-text);}@keyframes badge-pulse{0%,100%{box-shadow:0 4px 16px var(--cl-live-glow);}50%{box-shadow:0 4px 24px var(--cl-live-glow),0 0 32px var(--cl-live-glow);}}@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.3;transform:scale(0.7);}}.scoreboard{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;padding:28px 18px 22px;}.team-side{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;min-width:0;}.team-logo-wrap{position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center;}.team-logo-wrap::before{content:'';position:absolute;inset:-8px;background:radial-gradient(circle,rgba(var(--cl-accent-rgb),0.22),transparent 70%);border-radius:50%;animation:logo-glow 4s ease-in-out infinite;}.team-logo-big{position:relative;width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 6px 16px rgba(0,0,0,0.25));transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);}.team-logo-fallback{position:relative;display:grid;place-items:center;width:72px;height:72px;border:1px solid var(--cl-chip-border);border-radius:50%;background:var(--cl-chip-bg);color:var(--cl-text);font-size:14px;font-weight:900;}.team-side:hover .team-logo-big{transform:scale(1.1) rotate(-3deg);}@keyframes logo-glow{0%,100%{opacity:0.6;transform:scale(1);}50%{opacity:1;transform:scale(1.15);}}.team-name-big{font-size:13px;font-weight:700;line-height:1.2;max-width:110px;letter-spacing:-0.01em;color:var(--cl-text);}.form-pills{display:flex;gap:3px;padding:3px 7px;background:var(--cl-card-2);border:1px solid var(--cl-glass-border);border-radius:999px;}.record{display:flex;gap:4px;font-size:9px;font-weight:800;letter-spacing:0.04em;}.record .rec{padding:2px 6px;border-radius:4px;font-variant-numeric:tabular-nums;}.record .rec-w{background:rgba(16,185,129,0.18);color:var(--cl-green);}.record .rec-d{background:rgba(245,158,11,0.18);color:#f59e0b;}.record .rec-l{background:rgba(239,68,68,0.18);color:var(--cl-live);}.top-scorer{display:inline-flex;flex-direction:column;align-items:stretch;gap:4px;padding:5px 9px 6px;background:var(--cl-card-2);border:1px solid var(--cl-glass-border);border-radius:10px;font-size:10px;font-weight:700;color:var(--cl-text-2);max-width:150px;}.top-scorer .ts-label{font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--cl-gold);text-align:center;line-height:1;}.top-scorer .ts-row{display:flex;align-items:center;justify-content:center;gap:6px;}.top-scorer .ts-name{max-width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--cl-text);font-size:11px;font-weight:700;}.top-scorer .ts-val{display:inline-flex;align-items:baseline;gap:1px;color:var(--cl-gold);font-weight:800;font-variant-numeric:tabular-nums;font-size:12px;}.top-scorer .ts-unit{font-size:9px;opacity:0.85;}.form-pill{width:14px;height:14px;border-radius:4px;font-size:8px;font-weight:800;color:white;display:flex;align-items:center;justify-content:center;}.form-pill.W{background:linear-gradient(135deg,#10b981,#059669);}.form-pill.L{background:linear-gradient(135deg,#ef4444,#dc2626);}.form-pill.D{background:linear-gradient(135deg,#f59e0b,#d97706);}.score-center{display:flex;flex-direction:column;align-items:center;gap:8px;padding:0 4px;}.score-numbers{font-size:48px;font-weight:900;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;line-height:0.95;background:linear-gradient(180deg,var(--cl-text) 30%,var(--cl-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:score-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) backwards;}.score-numbers .dash{opacity:0.4;font-weight:700;margin:0 4px;}:host([data-score="big"]) .score-numbers{font-size:68px;}:host([data-score="huge"]) .score-numbers{font-size:92px;}:host([data-score="big"]) .score-vs{font-size:38px;}:host([data-score="huge"]) .score-vs{font-size:48px;}.score-vs{font-size:30px;font-weight:800;letter-spacing:0.08em;color:var(--cl-text-2);opacity:0.6;}@keyframes score-pop{0%{opacity:0;transform:scale(0.5);}70%{transform:scale(1.1);}100%{opacity:1;transform:scale(1);}}.clock{font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;color:var(--cl-live);background:rgba(239,68,68,0.12);}.clock .dot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pulse-dot 1.4s ease-in-out infinite;}.clock.upcoming{color:var(--cl-accent);background:rgba(var(--cl-accent-rgb),0.12);}.clock.upcoming .dot,.clock.finished .dot{animation:none;}.clock.finished{color:var(--cl-green);background:rgba(16,185,129,0.12);}.stats-row{padding:0 18px 18px;display:flex;flex-direction:column;gap:10px;}.stat-bar{display:flex;flex-direction:column;gap:4px;}.stat-bar-label{display:flex;justify-content:space-between;font-size:11px;font-weight:700;}.stat-bar-label .home-val{color:var(--cl-accent);}.stat-bar-label .away-val{color:var(--cl-accent-2);}.stat-bar-label .label-text{text-transform:uppercase;letter-spacing:0.1em;font-size:9px;color:var(--cl-text-2);}.stat-bar-track{height:6px;background:var(--cl-card-2);border-radius:999px;overflow:hidden;display:flex;}.stat-bar-home{height:100%;background:linear-gradient(90deg,var(--cl-accent),var(--cl-accent));border-radius:999px 0 0 999px;transition:width 0.8s cubic-bezier(0.16,1,0.3,1);}.stat-bar-away{height:100%;background:linear-gradient(90deg,var(--cl-accent-2),var(--cl-accent-2));margin-left:auto;border-radius:0 999px 999px 0;transition:width 0.8s cubic-bezier(0.16,1,0.3,1);}.meta-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 18px;border-top:1px solid var(--cl-divider);background:var(--cl-card-2);}.info-btn{background:linear-gradient(135deg,var(--cl-accent),var(--cl-accent-2));color:white;border:none;padding:7px 14px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.04em;cursor:pointer;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);box-shadow:0 4px 12px rgba(var(--cl-accent-rgb),0.4);}.info-btn:hover{transform:translateY(-1px) scale(1.04);box-shadow:0 8px 20px rgba(99,102,241,0.6);}.event-toast{position:absolute;top:12px;left:50%;transform:translateX(-50%);background:var(--cl-toast-bg);color:#ffffff;padding:10px 18px;border-radius:14px;font-size:13px;font-weight:800;z-index:100;animation:toast-bounce 4s cubic-bezier(0.16,1,0.3,1) forwards;pointer-events:none;max-width:90%;text-align:center;letter-spacing:-0.01em;text-shadow:0 1px 2px rgba(0,0,0,0.8);}.event-toast.variant-goal{box-shadow:0 0 0 2px var(--cl-gold),0 0 0 4px rgba(251,191,36,0.3),0 12px 40px rgba(0,0,0,0.7),0 0 60px rgba(251,191,36,0.4);}.event-toast.variant-goal strong{color:var(--cl-gold-text);}.event-toast.variant-yellow{box-shadow:0 0 0 2px #f59e0b,0 0 0 4px rgba(245,158,11,0.3),0 12px 40px rgba(0,0,0,0.7);}.event-toast.variant-yellow strong{color:#fbbf24;}.event-toast.variant-red{box-shadow:0 0 0 2px var(--cl-live),0 0 0 4px rgba(239,68,68,0.3),0 12px 40px rgba(0,0,0,0.7);}.event-toast.variant-red strong{color:#fca5a5;}@keyframes toast-bounce{0%{opacity:0;transform:translate(-50%,-20px) scale(0.7);}8%{opacity:1;transform:translate(-50%,0) scale(1.08);}14%{transform:translate(-50%,0) scale(1);}90%{opacity:1;transform:translate(-50%,0) scale(1);}100%{opacity:0;transform:translate(-50%,-10px) scale(0.95);}}.upcoming-list{border-top:1px solid var(--cl-divider);padding:10px 16px 14px;}.upcoming-list-title{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:var(--cl-text-2);margin-bottom:8px;}.upcoming-row{display:grid;grid-template-columns:52px 1fr 45px 1fr;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px;}.upcoming-row:last-child{border-bottom:none;}.upcoming-date{font-size:11px;font-weight:700;color:var(--cl-accent);font-variant-numeric:tabular-nums;display:flex;flex-direction:column;line-height:1.3;flex-shrink:0;white-space:nowrap;min-width:52px;}.upcoming-date-day{font-size:9px;font-weight:600;color:var(--cl-text-2);}.upcoming-team{display:flex;align-items:center;gap:5px;font-weight:600;color:var(--cl-text);min-width:0;overflow:hidden;}.upcoming-team.home-side{justify-content:flex-end;}.upcoming-team.away-side{justify-content:flex-start;}.upcoming-team img{width:18px;height:18px;object-fit:contain;flex-shrink:0;}.upcoming-team.tracked .abbrev-badge{font-weight:800;box-shadow:inset 0 -2px 0 var(--cl-accent-visible,var(--cl-accent,#6366f1));}.upcoming-row.clickable{cursor:pointer;}.upcoming-row.clickable:hover{background:var(--cl-card-2);border-radius:8px;}.prev-comp-label{color:var(--cl-accent);opacity:0.75;font-size:8px;letter-spacing:0.04em;text-transform:uppercase;display:block;max-width:68px;line-height:1.15;white-space:normal;overflow-wrap:anywhere;}.upl-comp-label{color:var(--cl-text-2);font-size:8px;letter-spacing:0.03em;text-transform:uppercase;display:block;max-width:68px;line-height:1.15;white-space:normal;overflow-wrap:anywhere;}.upl-opp-form{grid-column:1 / -1;display:flex;gap:2px;margin-top:-3px;padding-bottom:2px;}.upl-opp-form.side-right{justify-content:flex-end;}.upl-opp-form.side-left{justify-content:flex-start;padding-left:58px;}.upl-fd{width:5px;height:5px;border-radius:50%;}.upl-fd.w{background:var(--cl-green);}.upl-fd.l{background:var(--cl-live);}.upl-fd.d{background:var(--cl-text-2);opacity:0.6;}.form-trend-section{border-top:1px solid var(--cl-divider);padding:10px 16px 8px;}.form-trend-row{display:flex;align-items:center;gap:10px;margin-top:6px;}.form-trend-dots{display:flex;gap:4px;flex-wrap:wrap;}.ft-dot{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:white;flex-shrink:0;}.ft-dot.w{background:var(--cl-green);}.ft-dot.d{background:var(--cl-gold);color:rgba(0,0,0,0.7);}.ft-dot.l{background:var(--cl-live);}.form-trend-summary{font-size:10px;font-weight:700;color:var(--cl-text-2);white-space:nowrap;flex-shrink:0;}.prev-score{font-size:12px;font-weight:900;color:var(--cl-text-2);text-align:center;min-width:32px;font-variant-numeric:tabular-nums;}.prev-score.home-win{color:var(--cl-green);}.prev-score.away-win{color:var(--cl-live);}.prev-score.tw{color:var(--cl-green);}.prev-score.tl{color:var(--cl-live);}.prev-score.draw{color:var(--cl-text-2);}.upcoming-live-score{font-size:12px;font-weight:900;color:var(--cl-live);text-align:center;min-width:16px;font-variant-numeric:tabular-nums;display:flex;align-items:center;gap:2px;}.live-dot{font-size:7px;animation:live-blink 1s ease-in-out infinite;}@keyframes live-blink{0%,100%{opacity:1}50%{opacity:0.2}}.team-name-big.my-team{background:linear-gradient(135deg,var(--cl-text),var(--cl-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}.upcoming-vs{font-size:11px;font-weight:700;color:var(--cl-text-2);text-align:center;}.abbrev-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:var(--cl-text,#f8fafc);letter-spacing:0.01em;min-width:0;}.abbrev-badge::before{content:'';width:7px;height:7px;border-radius:2px;background:var(--team-c,var(--cl-accent,#6366f1));flex-shrink:0;}.abbrev-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px;}.h2h-section{border-top:1px solid var(--cl-divider);padding:10px 16px 14px;}.h2h-summary{display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-bottom:6px;color:var(--cl-text-2);}.h2h-summary-num{font-size:20px;font-weight:800;color:var(--cl-text);}.h2h-summary-label{font-size:10px;text-align:center;color:var(--cl-text-2);}.h2h-bar{display:flex;height:5px;border-radius:3px;overflow:hidden;gap:2px;margin-bottom:10px;}.h2h-bar-seg.home{background:var(--cl-accent);border-radius:3px 0 0 3px;}.h2h-bar-seg.draw{background:var(--cl-text-2);opacity:0.4;}.h2h-bar-seg.away{background:var(--cl-accent-2);border-radius:0 3px 3px 0;}.h2h-row{display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:11px;}.h2h-row:last-child{border-bottom:none;}.h2h-date{font-size:10px;font-weight:600;color:var(--cl-text-2);min-width:44px;flex-shrink:0;}.h2h-team{flex:1;font-weight:600;color:var(--cl-text-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.h2h-team.away{text-align:right;}.h2h-team.winner{color:var(--cl-text);font-weight:800;}.h2h-score{font-size:12px;font-weight:800;color:var(--cl-text);flex-shrink:0;text-align:center;min-width:36px;font-variant-numeric:tabular-nums;}.h2h-score.win{color:#fff;background:var(--cl-win,#22c55e);border-radius:5px;padding:1px 6px;}.h2h-score.loss{color:#fff;background:var(--cl-loss,#ef4444);border-radius:5px;padding:1px 6px;}.h2h-score.draw{color:var(--cl-text);background:var(--cl-divider,rgba(127,127,127,0.28));border-radius:5px;padding:1px 6px;}ha-card.goal-flash{animation:card-goal-flash 1.6s cubic-bezier(0.16,1,0.3,1);}@keyframes card-goal-flash{0%{box-shadow:0 4px 24px rgba(0,0,0,0.15);}20%{box-shadow:0 0 0 4px var(--cl-accent),0 0 60px 20px var(--cl-accent),0 4px 24px rgba(0,0,0,0.15);}50%{box-shadow:0 0 0 2px var(--cl-accent-2),0 0 40px 10px var(--cl-accent-2),0 4px 24px rgba(0,0,0,0.15);}100%{box-shadow:0 4px 24px rgba(0,0,0,0.15);}}.score-numbers.goal-scored{animation:score-goal-pop 1.2s cubic-bezier(0.34,1.56,0.64,1);}@keyframes score-goal-pop{0%{transform:scale(1);}20%{transform:scale(1.4);filter:drop-shadow(0 0 30px var(--cl-accent));}40%{transform:scale(0.95);}60%{transform:scale(1.15);}100%{transform:scale(1);}}.team-logo-big.scorer-bounce{animation:scorer-bounce 1.2s cubic-bezier(0.34,1.56,0.64,1);}@keyframes scorer-bounce{0%{transform:scale(1) rotate(0deg);}25%{transform:scale(1.3) rotate(-15deg);}50%{transform:scale(1.1) rotate(10deg);}75%{transform:scale(1.2) rotate(-5deg);}100%{transform:scale(1) rotate(0deg);}}.goal-banner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:50;overflow:hidden;}.goal-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,var(--cl-overlay-strong) 0%,var(--cl-overlay-soft) 40%,transparent 70%);animation:banner-backdrop 1.6s ease-out forwards;}@keyframes banner-backdrop{0%{opacity:0;}20%{opacity:1;}80%{opacity:1;}100%{opacity:0;}}.goal-banner-text{position:relative;font-size:84px;font-weight:900;letter-spacing:-0.06em;color:var(--cl-gold-text);-webkit-text-stroke:2px #1a0f00;text-shadow:0 0 24px rgba(251,191,36,1),0 0 48px rgba(251,191,36,0.7),0 6px 0 #b45309,0 8px 24px rgba(0,0,0,0.6);animation:goal-text-blast 1.6s cubic-bezier(0.16,1,0.3,1) forwards;transform-origin:center;}@keyframes goal-text-blast{0%{opacity:0;transform:scale(0.3) rotate(-8deg);}20%{opacity:1;transform:scale(1.15) rotate(-3deg);}40%{transform:scale(0.95) rotate(2deg);}60%{transform:scale(1.05) rotate(0deg);}80%{opacity:1;transform:scale(1) rotate(0deg);}100%{opacity:0;transform:scale(1.3) rotate(0deg);}}.goal-flash-overlay{position:absolute;inset:0;background:radial-gradient(circle at center,rgba(251,191,36,0.25),transparent 70%);pointer-events:none;z-index:49;animation:flash-overlay 1s ease-out forwards;}@keyframes flash-overlay{0%{opacity:0;}20%{opacity:1;}100%{opacity:0;}}.confetti{position:absolute;top:20px;left:50%;width:8px;height:8px;pointer-events:none;z-index:99;animation:confetti-fly 1.8s ease-out forwards;}@keyframes confetti-fly{0%{transform:translate(-50%,0) rotate(0deg);opacity:1;}100%{transform:translate(calc(-50% + var(--dx)),var(--dy)) rotate(720deg);opacity:0;}}@media (max-width:600px){ha-card{padding:12px !important;}.hero{padding:14px 10px 12px !important;}.team-logo{width:40px !important;height:40px !important;}.team-name{font-size:12px !important;}.score{font-size:32px !important;letter-spacing:4px !important;}.vs-text{font-size:18px !important;}.stat-val{font-size:11px !important;min-width:24px !important;}.stat-label{font-size:9px !important;}.comp-logo{width:14px !important;height:14px !important;}.comp-name{font-size:10px !important;}.meta{font-size:10px !important;padding:8px 12px !important;}.events{max-height:180px !important;}.event-row{padding:4px 0 !important;font-size:11px !important;}.event-min{font-size:10px !important;}.form-indicator{width:18px !important;height:18px !important;font-size:10px !important;}}@media (max-width:400px){.score{font-size:28px !important;letter-spacing:2px !important;}.team-name{font-size:11px !important;max-width:70px !important;}.event-icon{font-size:12px !important;}}ha-card.compact .team-logo-big{width:48px !important;height:48px !important;}ha-card.compact .team-name-big{font-size:12px !important;}ha-card.compact .scoreboard{padding:12px 16px !important;}ha-card.compact .score-num{font-size:36px !important;letter-spacing:4px !important;}ha-card.compact .standing-summary{display:none;}ha-card.compact .form-dots-row{display:none;}ha-card.compact .top-scorer-row{display:none;}ha-card.compact .smm-chips{display:none;}ha-card.compact .meta-row{padding:8px 14px !important;}`]}}function At(t,e=0){const a=Number.parseInt(t,10);return Number.isFinite(a)?a:e}customElements.get("soccer-live-team")||customElements.define("soccer-live-team",zt);const Et=(t,e)=>Array.from({length:e-t+1},(e,a)=>t+a),qt={serie_a:{match:(t,e)=>"ita.1"===t||e.includes("italian_serie_a"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:"bottom3"},premier_league:{match:(t,e)=>"eng.1"===t||e.includes("english_premier"),champions:[1,2,3,4,5],europa:[6],conference:[7],relegation:"bottom3"},laliga:{match:(t,e)=>"esp.1"===t||e.includes("spanish_la_liga")||e.includes("spanish_laliga"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:"bottom3"},bundesliga:{match:(t,e)=>"ger.1"===t||e.includes("german_bundesliga"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:[17,18]},ligue_1:{match:(t,e)=>"fra.1"===t||e.includes("french_ligue_1"),champions:[1,2,3],europa:[4],conference:[5],relegation:[17,18]},eredivisie:{match:(t,e)=>"ned.1"===t||e.includes("dutch_eredivisie"),champions:[1,2],europa:[3],conference:[4,5],relegation:[17,18]},primeira_liga:{match:(t,e)=>"por.1"===t||e.includes("portuguese_primeira"),champions:[1,2],europa:[3],conference:[4],relegation:[17,18]},ucl_league_phase:{match:(t,e)=>"uefa.champions"===t||e.includes("uefa_champions_league"),champions:Et(1,8),europa:Et(9,24),conference:[],relegation:"bottom12"},uel_league_phase:{match:(t,e)=>"uefa.europa"===t||e.includes("uefa_europa_league"),champions:Et(1,8),europa:Et(9,24),conference:[],relegation:"bottom12"},uecl_league_phase:{match:(t,e)=>"uefa.europa.conf"===t||e.includes("uefa_conference"),champions:Et(1,8),europa:Et(9,24),conference:[],relegation:"bottom12"},world_cup:{match:(t,e)=>"fifa.world"===t||e.includes("fifa_world_cup")||e.includes("world_cup"),champions:[1,2],europa:[3],conference:[],relegation:"bottom1",kind:"cup_group",hero:{icon:"🏆",accent:"world_cup"},labels:{champions:"zone.qualified",europa:"zone.third_place_playoff",conference:null,relegation:"zone.eliminated"}},uefa_euro:{match:(t,e)=>"uefa.euro"===t||e.includes("uefa_euro")||e.includes("european_championship"),champions:[1,2],europa:[3],conference:[],relegation:"bottom1",kind:"cup_group",hero:{icon:"⭐",accent:"uefa_euro"},labels:{champions:"zone.qualified",europa:"zone.third_place_playoff",conference:null,relegation:"zone.eliminated"}},copa_america:{match:(t,e)=>"conmebol.america"===t||e.includes("copa_america")||e.includes("conmebol_america"),champions:[1,2],europa:[],conference:[],relegation:"bottom2",kind:"cup_group",hero:{icon:"🏆",accent:"copa_america"},labels:{champions:"zone.qualified",europa:null,conference:null,relegation:"zone.eliminated"}}};class Mt extends s.WF{static get properties(){return{hass:{},_config:{},maxTeamsVisible:{type:Number},hideHeader:{type:Boolean},selectedGroup:{type:String},showEventToasts:{type:Boolean},highlightTeam:{type:String},showStats:{type:Boolean},showGoalsFor:{type:Boolean},compactMode:{type:Boolean},compactTop:{type:Number},compactBottom:{type:Number},_eventSubscriptions:{type:Array},_toastMessage:{type:String},_toastVisible:{type:Boolean},_toastVariant:{type:String}}}setConfig(t){if(!t.entity)throw new Error("Entity required");this._config=t,z(this,t),this.maxTeamsVisible=t.max_teams_visible?t.max_teams_visible:10,this.hideHeader=t.hide_header||!1,this.selectedGroup=t.selected_group||"",this.showEventToasts=!0===t.show_event_toasts,this.highlightTeam=(t.highlight_team||t.my_team||"").toLowerCase(),this.showStats=!1!==t.show_stats,this.showGoalsFor=!0===t.show_goals_for,this.compactMode=!0===t.compact_mode,this.compactTop=parseInt(t.compact_top)||5,this.compactBottom=parseInt(t.compact_bottom)||3,this._toastMessage="",this._toastVisible=!1,this._toastVariant="goal",this._toastTimer=null}_t(t,e){return(0,i.t)(t,(0,i.$c)(this.hass,this._config),e)}connectedCallback(){super.connectedCallback(),this._subscribeToEvents()}disconnectedCallback(){super.disconnectedCallback(),this._toastTimer&&clearTimeout(this._toastTimer),this._eventSubscriptionGeneration=(this._eventSubscriptionGeneration||0)+1,this._eventSubscriptionPromise=null,this._eventSubscriptions&&Array.isArray(this._eventSubscriptions)&&(this._eventSubscriptions.forEach(t=>{"function"==typeof t&&t()}),this._eventSubscriptions=[])}updated(t){t.has("hass")&&this.hass&&!this._eventSubscriptions?.length&&this._subscribeToEvents()}_subscribeToEvents(){if(!this.hass||!this.hass.connection)return;if(this._eventSubscriptionPromise||this._eventSubscriptions?.length)return;const t=this._eventSubscriptionGeneration||0,e=this._handleSoccerLiveEvent.bind(this),a=Promise.allSettled(["soccer_live_goal","soccer_live_goal_cancelled","soccer_live_yellow_card","soccer_live_red_card","soccer_live_match_finished"].map(t=>this.hass.connection.subscribeEvents(e,t)));this._eventSubscriptionPromise=a,a.then(e=>{const a=e.filter(t=>"fulfilled"===t.status&&"function"==typeof t.value).map(t=>t.value);if((this._eventSubscriptionGeneration||0)!==t||!this.isConnected)return void a.forEach(t=>t());const s=e.filter(t=>"rejected"===t.status);s.length>0?(a.forEach(t=>t()),this._eventSubscriptions=[],s.forEach(t=>console.warn("Soccer Live Standings subscription failed:",t.reason))):this._eventSubscriptions=a}).finally(()=>{this._eventSubscriptionPromise===a&&(this._eventSubscriptionPromise=null)})}_eventBelongsToThisCard(t){if(!this.hass||!this._config)return!1;const e=this._config.entity||"",a=t.competition_code;if(!a)return!1;const s=a.replace(/\./g,"_").toLowerCase();return e.toLowerCase().includes(s)}_handleSoccerLiveEvent(t){const e=t.event_type,a=t.data;this._eventBelongsToThisCard(a)&&yt(this,a)&&this.showEventToasts&&this._showEventToast(e,a)}_showEventToast(t,e){const a=wt(t=>this._t(t),t,e);a&&(this._toastMessage=a.message,this._toastVariant=a.variant,this._toastVisible=!0,this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>{this._toastVisible=!1,this.requestUpdate()},4e3),this.requestUpdate())}getCardSize(){return 5}static getConfigElement(){return document.createElement("soccer-live-standings-editor")}static getStubConfig(){return{entity:"sensor.soccer_live_standings_",max_teams_visible:10,hide_header:!1,selected_group:"",show_event_toasts:!1}}_getZoneConfig(){return this._config.zone_config?this._config.zone_config:this._config.zone_preset&&qt[this._config.zone_preset]?qt[this._config.zone_preset]:this._inferPresetFromEntity()||{champions:[],europa:[],conference:[],relegation:null}}_getZoneLabels(){const t=this._getZoneConfig().labels||{};return{champions:void 0!==t.champions?t.champions:"zone.champions",europa:void 0!==t.europa?t.europa:"zone.europa",conference:void 0!==t.conference?t.conference:"zone.conference",relegation:void 0!==t.relegation?t.relegation:"zone.relegation"}}_hasZonePositions(t){return!!t&&(Array.isArray(t)?t.length>0:"string"==typeof t&&/^bottom\d+$/.test(t))}_inferPresetFromEntity(){const t=(this._config.entity||"").toLowerCase(),e=this.hass&&this._config.entity?this.hass.states[this._config.entity]:null,a=e&&e.attributes?String(e.attributes.competition_code||"").toLowerCase():"";for(const[,e]of Object.entries(qt))if(e.match&&e.match(a,t))return e;return null}_positionInZone(t,e,a){if(!a)return!1;const s=String(a).match(/^bottom(\d+)$/);if(s){const a=parseInt(s[1],10);return e&&t>e-a}return!!Array.isArray(a)&&a.includes(Number(t))}_translatePhase(t){return t?{"regular-season":this._t("phase.regular_season"),"regular season":this._t("phase.regular_season"),"group-stage":this._t("phase.group_stage"),"group stage":this._t("phase.group_stage"),playoffs:this._t("phase.playoffs")}[String(t).toLowerCase()]||t:""}_shouldShowPhase(t){return!!t&&"regular-season"!==String(t).toLowerCase()&&!/\d{4}/.test(t)}_isCupGroupStage(){const t=this._getZoneConfig();return t&&"cup_group"===t.kind}_groupHasNoMatches(t){if(!t||!t.length)return!1;const e=t=>{if(null==t||""===t)return 0;const e=parseInt(String(t).replace("+",""),10);return isNaN(e)?0:e};return t.every(t=>e(t.wins)+e(t.draws)+e(t.losses)===0)}_zoneClass(t,e,a){if(a&&a.zone_color)return"zone-espn";const s=this._getZoneConfig();return this._positionInZone(t,e,s.champions)?1!==t||this._isCupGroupStage()?"zone-cl":"zone-cl rank-first":this._positionInZone(t,e,s.europa)?"zone-el":this._positionInZone(t,e,s.conference)?"zone-conf":this._positionInZone(t,e,s.relegation)?"zone-rel":"zone-default"}_sortStandings(t,e){let a=(t||[]).filter(t=>null!=t.rank);return e.includes("MLS")?(a=a.slice().sort((t,e)=>e.points!==t.points?e.points-t.points:e.goal_difference!==t.goal_difference?e.goal_difference-t.goal_difference:e.goals_for-t.goals_for),a.forEach((t,e)=>{t.rank=e+1})):a=a.slice().sort((t,e)=>t.rank-e.rank),a}_currentGroup(t){return t.find(t=>t.name===this.selectedGroup)||t[0]}render(){if(z(this,this._config),!this.hass||!this._config)return s.qy``;const t=this._config.entity,e=this.hass.states[t];if(!e)return s.qy`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${t}</ha-card>`;if("race"===this._config.card_type||"race"===this._config.standings_view)return this._renderRace(e);const a=e.attributes.season||"",i=e.attributes.league_abbreviation&&"N/A"!==e.attributes.league_abbreviation?e.attributes.league_abbreviation:null,o=i&&e.attributes.league_name?a.replace(e.attributes.league_name,i).trim():a,r=e.attributes.standings_groups||[],n=!this.selectedGroup&&r.length>1,l=this._currentGroup(r),c=this._sortStandings(l?l.standings:[],o),d=c.length;if(!d){const t=W(e.attributes.sync_status,t=>this._t(t));if(t)return t}const p=48*Math.min(this.maxTeamsVisible,d)+50,h=this.highlightTeam?(c.find(t=>t.team_name&&t.team_name.toLowerCase().includes(this.highlightTeam))||{}).rank:null,u=Math.round(c.reduce((t,e)=>t+(parseInt(e.games_played)||0),0)/2),g=c.reduce((t,e)=>t+(parseInt(e.goals_for)||0),0),m=!(e.attributes.standings_groups||[]).some(t=>(t.standings||[]).some(t=>(parseInt(t.games_played)||0)>0))&&d>0&&c.every(t=>0===parseInt(t.wins??"0")&&0===parseInt(t.draws??"0")&&0===parseInt(t.losses??"0"));return s.qy`
      <ha-card>
        ${this.showEventToasts&&this._toastVisible?s.qy`
          <div class="event-toast variant-${this._toastVariant}" .textContent=${this._toastMessage}></div>
        `:""}

        ${this.hideHeader?"":this._renderHeader(e,o,l,r,n,h)}

        ${m?s.qy`
          <div class="preseason-banner">
            <span class="preseason-icon">🗓️</span>
            <span>${this._t("standings.preseason",{season:o||""})}</span>
          </div>
        `:""}

        ${n?this._renderGroupsGrid(r,o):s.qy`
            <div class="table-wrap" style="max-height: ${p}px;">
              ${this._renderFullTable(c,d)}
            </div>
          `}

        ${this.showStats&&u>0?s.qy`
          <div class="season-stats">
            <span>${u} ${this._t("standings.stats").split("·")[0].trim()}</span>
            <span class="stats-dot">·</span>
            <span>${g} ${this._t("standings.goals")}</span>
          </div>
        `:""}

        ${this._renderLegend(l)}
      </ha-card>
    `}_renderRace(t){const e=this._config.highlight_team||this._config.my_team||"",a=function(t={},e=""){const a=t.competition_race?.groups?.[0],s=t.standings_groups?.[0],i=a?.rows||s?.standings||[];if(!i.length)return null;const o=[...i].sort((t,e)=>At(t.rank,999)-At(e.rank,999)),r=At(o[0]?.points),n=Math.max(...o.map(t=>At(t.games_played)),Math.max(0,2*(o.length-1))),l=o.map((t,e)=>{const a=At(t.points),s=At(t.games_played),i=null==t.remaining?Math.max(0,n-s):At(t.remaining);return{...t,points:a,played:s,remaining:i,maximum:null==t.maximum_points?a+3*i:At(t.maximum_points),projected:null==t.projected_points?a:At(t.projected_points),gamesInHand:At(t.games_in_hand),scenarios:t.next_match_scenarios||null,gapLeader:null==t.gap_to_leader?Math.max(0,r-a):At(t.gap_to_leader),gapAbove:null==t.gap_to_above?e?Math.max(0,At(o[e-1].points)-a):0:At(t.gap_to_above)}}),c=String(e||"").toLowerCase(),d=l.find(t=>c&&String(t.team_name||"").toLowerCase().includes(c)),p=(t.standings_history||[]).map(t=>{const e=(t.groups?.[0]?.standings||[]).find(t=>null!=d?.team_id?String(t.team_id)===String(d.team_id):c&&String(t.team_name||"").toLowerCase().includes(c));return e?{date:t.captured_at,rank:At(e.rank),points:At(e.points)}:null}).filter(Boolean);return{rows:l,tracked:d,trajectory:p,totalMatches:a?.total_matches??n,remainingSource:a?.remaining_source||"table_format",group:a?.name||s?.name||""}}(t.attributes,e);if(!a)return W(t.attributes.sync_status,t=>this._t(t))||s.qy`<ha-card class="empty">${this._t("ui.no_standings_data")}</ha-card>`;const i=a.tracked?a.rows.filter(t=>Math.abs(Number(t.rank)-Number(a.tracked.rank))<=2):a.rows.slice(0,6),o=Math.max(...i.map(t=>t.maximum),1),r=a.trajectory.slice(-12);return s.qy`<ha-card class="race-card">
      <header class="race-head"><span>🏁</span><div><small>${this._t("card.race")}</small><h2>${t.attributes.league_name||a.group}</h2></div><b>${t.attributes.season||""}</b></header>
      ${a.tracked?s.qy`<section class="race-focus">
        ${a.tracked.team_logo?s.qy`<img src=${a.tracked.team_logo} alt="">`:""}
        <div><strong>${a.tracked.team_name}</strong><small>#${a.tracked.rank} · ${a.tracked.points} ${this._t("col.points")}</small></div>
        <span>${a.tracked.gapLeader?`−${a.tracked.gapLeader}`:this._t("race.leader")}</span>
      </section>`:""}
      <div class="race-list">${i.map(t=>s.qy`<div class=${t===a.tracked?"tracked":""}>
        <b>${t.rank}</b><span>${t.team_name}<i style="width:${Math.max(3,t.points/o*100)}%"></i></span>
        <strong>${t.points}</strong><small>${t.maximum} ${this._t("race.maximum")}</small>
      </div>`)}</div>
      ${a.tracked&&(a.tracked.gamesInHand||a.tracked.projected!==a.tracked.points||a.tracked.title_clinched||a.tracked.title_possible||a.tracked.europe_secured||a.tracked.relegation_safe)?s.qy`
        <section class="race-projection">
          ${a.tracked.gamesInHand?s.qy`<span>${this._t("race.games_in_hand",{n:a.tracked.gamesInHand})}</span>`:""}
          <span>${this._t("race.projected_points",{n:a.tracked.projected})}</span>
          ${a.tracked.scenarios?s.qy`<span>${this._t("race.next_scenarios",{win:a.tracked.scenarios.win,draw:a.tracked.scenarios.draw,loss:a.tracked.scenarios.loss})}</span>`:""}
          ${a.tracked.title_clinched?s.qy`<span>🏆 ${this._t("race.title_clinched")}</span>`:""}
          ${!a.tracked.title_clinched&&a.tracked.title_possible?s.qy`<span>${this._t("race.magic_points",{n:a.tracked.magic_points_title})}</span>`:""}
          ${a.tracked.europe_secured?s.qy`<span>✓ ${this._t("race.europe_secured")}</span>`:""}
          ${a.tracked.relegation_safe?s.qy`<span>✓ ${this._t("race.relegation_safe")}</span>`:""}
        </section>`:""}
      ${r.length>1?s.qy`<section class="trajectory"><small>${this._t("race.trajectory")}</small><div>
        ${r.map(t=>s.qy`<span title="${t.date||""}: #${t.rank}"><i style="height:${Math.max(12,100-(t.rank-1)/Math.max(1,a.rows.length-1)*88)}%"></i><b>${t.rank}</b></span>`)}
      </div></section>`:""}
      <footer>${this._t("race.remaining",{n:a.tracked?.remaining??a.rows[0]?.remaining??0})}</footer>
    </ha-card>`}_renderFullTable(t,e){let a=t,i=null;if(this.compactMode&&e>this.compactTop+this.compactBottom){const s=t.slice(0,this.compactTop),o=t.slice(e-this.compactBottom),r=e-this.compactTop-this.compactBottom,n=this.highlightTeam?t.slice(this.compactTop,e-this.compactBottom).find(t=>t.team_name&&t.team_name.toLowerCase().includes(this.highlightTeam)):null;a=[...s,...n?[n]:[],{_separator:!0,hiddenCount:r},...o],i=!0}return s.qy`
      <table class="standings-table">
        <thead>
          <tr>
            <th>${this._t("col.pos")}</th>
            <th class="team-col">${this._t("col.team")}</th>
            <th>${this._t("col.played")}</th>
            <th>${this._t("col.wins")}</th>
            <th>${this._t("col.draws")}</th>
            <th>${this._t("col.losses")}</th>
            <th>${this._t("col.gd")}</th>
            <th>${this._t("col.points")}</th>
          </tr>
        </thead>
        <tbody>
          ${a.map(t=>{if(t._separator)return s.qy`
              <tr class="separator-row">
                <td colspan="8">
                  <span class="separator-dots">· · · ${t.hiddenCount} ${this._t("standings.compact_hidden")} · · ·</span>
                </td>
              </tr>`;const a=this.highlightTeam&&t.team_name&&t.team_name.toLowerCase().includes(this.highlightTeam),i=t=>{if(null==t||""===t)return null;const e=parseInt(String(t).replace("+",""),10);return isNaN(e)?null:e},o=i(t.wins),r=i(t.draws),n=i(t.losses),l=i(t.goal_difference),c=null!==o&&null!==r&&null!==n?o+r+n:null,d=null===l?"":l>0?"gd-pos":l<0?"gd-neg":"",p=null===l?"-":l>0?`+${l}`:`${l}`;return s.qy`
              <tr class="${this._zoneClass(t.rank,e,t)} ${a?"highlighted-team":""}">
                <td style="${t.zone_color?`border-left:3px solid ${t.zone_color};padding-left:11px`:""}"><div class="rank-cell"><div class="rank-num">${t.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${t.team_logo}" alt="${t.team_name}" />
                  <div class="tname-group">
                    <span class="tname">${t.team_name}</span>
                    ${this.showGoalsFor&&t.goals_for&&parseInt(t.goals_for)>=0?s.qy`<span class="goals-for-hint">⚽ ${t.goals_for}</span>`:""}
                  </div>
                </td>
                <td>${c??"-"}</td>
                <td>${o??"-"}</td>
                <td>${r??"-"}</td>
                <td>${n??"-"}</td>
                <td class="${d}">${p}</td>
                <td class="points-cell">${t.points??"-"}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}_renderCompactTable(t,e){return s.qy`
      <table class="standings-table compact">
        <thead>
          <tr>
            <th>${this._t("col.pos")}</th>
            <th class="team-col">${this._t("col.team")}</th>
            <th>${this._t("col.gd")}</th>
            <th>${this._t("col.points")}</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>{const a=(t=>{if(null==t||""===t)return null;const e=parseInt(String(t).replace("+",""),10);return isNaN(e)?null:e})(t.goal_difference),i=null===a?"":a>0?"gd-pos":a<0?"gd-neg":"",o=null===a?"-":a>0?`+${a}`:`${a}`;return s.qy`
              <tr class="${this._zoneClass(t.rank,e,t)}">
                <td style="${t.zone_color?`border-left:3px solid ${t.zone_color};padding-left:11px`:""}"><div class="rank-cell"><div class="rank-num">${t.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${t.team_logo}" alt="${t.team_name}" />
                  <span class="tname">${t.team_name}</span>
                </td>
                <td class="${i}">${o}</td>
                <td class="points-cell">${t.points??"-"}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}_renderHeader(t,e,a,i,o,r){const n=this._getZoneConfig(),l=this._isCupGroupStage(),c=n&&n.hero?n.hero:null,d=t.attributes.league_abbreviation&&"N/A"!==t.attributes.league_abbreviation?t.attributes.league_abbreviation:null,p=d&&e?e.replace(d,"").trim():e&&"n/a"!==e.toLowerCase()?e:"",h=o?this._t("phase.group_stage"):this._shouldShowPhase(a&&a.name)?this._translatePhase(a.name):"",u=[];d&&u.push(this._t("card.standings")),p&&u.push(p),h&&u.push(h);let g=0;if(o)for(const t of i)g+=(t.standings||[]).filter(t=>null!=t.rank).length;return s.qy`
      <div class="top-bar ${l?"top-bar-cup":""} ${c?`accent-${c.accent}`:""}">
        ${c&&c.icon?s.qy`<div class="hero-icon">${c.icon}</div>`:""}
        <div class="league-title">
          <h2>${d||t.state}</h2>
          <div class="sub">${u.join(" · ")}</div>
        </div>
        ${r?s.qy`<span class="highlight-pos-badge">${r}e</span>`:""}
        ${o&&l?s.qy`
          <div class="hero-badges">
            <span class="badge">${i.length} ${this._t("hero.groups")}</span>
            <span class="badge">${g} ${this._t("hero.teams")}</span>
          </div>
        `:""}
      </div>
    `}_renderLegend(t){const e=new Map;for(const a of t&&t.standings||[])a.zone_color&&a.zone_label&&!e.has(a.zone_label)&&e.set(a.zone_label,{color:a.zone_color,abbrev:a.zone_abbrev});if(e.size)return s.qy`
        <div class="legend">
          ${[...e.entries()].map(([t,e])=>s.qy`
            <div class="legend-item" title="${t}">
              <span class="legend-dot" style="background:${e.color};"></span>${e.abbrev||t}
            </div>
          `)}
        </div>
      `;const a=this._getZoneConfig(),i=this._getZoneLabels(),o=[{key:"champions",dot:"cl",positions:a.champions,label:i.champions},{key:"europa",dot:"el",positions:a.europa,label:i.europa},{key:"conference",dot:"conf",positions:a.conference,label:i.conference},{key:"relegation",dot:"rel",positions:a.relegation,label:i.relegation}].filter(t=>t.label&&this._hasZonePositions(t.positions));return o.length?s.qy`
      <div class="legend">
        ${o.map(t=>s.qy`
          <div class="legend-item">
            <span class="legend-dot ${t.dot}"></span>${this._t(t.label)}
          </div>
        `)}
      </div>
    `:""}_renderGroupsGrid(t,e){const a=this._isCupGroupStage();return s.qy`
      <div class="groups-grid ${a?"groups-grid-cup":""}">
        ${t.map(t=>{const a=this._sortStandings(t.standings||[],e),i=this._groupHasNoMatches(a);return s.qy`
            <div class="group-cell ${i?"group-cell-pending":""}">
              <div class="group-title">
                <span>${t.name}</span>
                ${i?s.qy`<span class="group-pending-badge">${this._t("hero.not_started")}</span>`:""}
              </div>
              ${this._renderCompactTable(a,a.length)}
            </div>
          `})}
      </div>
    `}static get styles(){return[S,s.AH`ha-card{position:relative;overflow:hidden;border-radius:20px;padding:0;background:var(--cl-bg);color:var(--cl-text);box-shadow:0 4px 24px var(--cl-shadow);}ha-card.empty{padding:24px;text-align:center;color:var(--cl-text-2);}.top-bar{position:relative;padding:20px 18px;background:linear-gradient(135deg,rgba(var(--cl-accent-rgb),0.15),rgba(var(--cl-accent-2-rgb),0.10) 60%,transparent);border-bottom:1px solid var(--cl-divider);overflow:hidden;}.top-bar::before{content:'⚽';position:absolute;right:-10px;top:-10px;font-size:90px;opacity:0.06;transform:rotate(15deg);}.top-bar-cup{padding:28px 22px 22px;background:radial-gradient(circle at 20% 20%,rgba(99,102,241,0.30),transparent 55%),radial-gradient(circle at 80% 60%,rgba(var(--cl-accent-2-rgb),0.20),transparent 50%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0));}.top-bar-cup::before{display:none;}.top-bar-cup .hero-icon{position:absolute;right:14px;top:14px;font-size:56px;line-height:1;opacity:0.95;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.45));}.top-bar-cup h2{font-size:24px;letter-spacing:-0.04em;}.top-bar-cup .sub{font-size:13px;margin-top:6px;letter-spacing:0.02em;}.top-bar.accent-world_cup{background:radial-gradient(circle at 20% 20%,rgba(251,191,36,0.22),transparent 55%),radial-gradient(circle at 80% 60%,rgba(99,102,241,0.18),transparent 55%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0));}.top-bar.accent-uefa_euro{background:radial-gradient(circle at 20% 20%,rgba(59,130,246,0.30),transparent 55%),radial-gradient(circle at 80% 60%,rgba(251,191,36,0.18),transparent 55%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0));}.top-bar.accent-copa_america{background:radial-gradient(circle at 20% 20%,rgba(16,185,129,0.25),transparent 55%),radial-gradient(circle at 80% 60%,rgba(245,158,11,0.20),transparent 55%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0));}.hero-badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;}.hero-badges .badge{font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.12);color:var(--cl-text);backdrop-filter:blur(8px);}.top-bar h2{margin:0;font-size:20px;font-weight:900;letter-spacing:-0.03em;background:linear-gradient(135deg,var(--cl-text),var(--cl-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}.top-bar .sub{color:var(--cl-text-2);font-size:12px;margin-top:4px;font-weight:500;}.table-wrap{overflow-y:auto;}.standings-table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;}.standings-table thead th{position:sticky;top:0;background:var(--cl-card-2);backdrop-filter:blur(8px);padding:10px 4px;text-align:center;font-size:10px;font-weight:800;color:var(--cl-text-2);text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid var(--cl-divider);z-index:1;}.standings-table thead th:first-child{padding-left:14px;text-align:left;}.standings-table thead th:last-child{padding-right:14px;}.standings-table thead th.team-col{text-align:left;}.standings-table tbody tr{transition:all 0.2s cubic-bezier(0.4,0,0.2,1);}.standings-table tbody tr:hover{background:var(--cl-card-2);}.standings-table tbody td{padding:10px 4px;text-align:center;border-bottom:1px solid var(--cl-divider);font-variant-numeric:tabular-nums;font-weight:600;color:var(--cl-text);}.standings-table tbody tr:last-child td{border-bottom:none;}.preseason-banner{display:flex;align-items:center;gap:10px;margin:0 14px 4px;padding:10px 14px;background:rgba(var(--cl-accent-rgb),0.08);border:1px solid rgba(99,102,241,0.18);border-radius:10px;font-size:12px;font-weight:600;color:var(--cl-text-2);}.preseason-icon{font-size:16px;}.standings-table tbody td:first-child{padding-left:14px;text-align:left;}.highlight-pos-badge{flex-shrink:0;background:linear-gradient(135deg,var(--cl-accent),var(--cl-accent-2));color:white;font-size:12px;font-weight:900;padding:4px 10px;border-radius:999px;box-shadow:0 2px 10px rgba(var(--cl-accent-rgb),0.4);letter-spacing:-0.01em;}.season-stats{display:flex;align-items:center;gap:8px;padding:8px 16px;font-size:11px;font-weight:600;color:var(--cl-text-2);border-top:1px solid var(--cl-divider);justify-content:center;}.stats-dot{opacity:0.5;}.separator-row td{padding:6px 0;text-align:center;border:none;}.separator-dots{font-size:10px;font-weight:700;color:var(--cl-text-2);letter-spacing:0.1em;opacity:0.6;}.tname-group{display:flex;flex-direction:column;min-width:0;overflow:hidden;}.goals-for-hint{font-size:9px;font-weight:600;color:var(--cl-text-2);opacity:0.7;margin-top:1px;}.highlighted-team{background:rgba(var(--cl-accent-rgb),0.07);}.highlighted-team .tname{font-weight:800;color:var(--cl-text);}.highlighted-team .points-cell{color:var(--cl-accent);font-weight:900;}.zone-cl td:first-child{border-left:3px solid var(--cl-cl);padding-left:11px;}.zone-el td:first-child{border-left:3px solid var(--cl-el);padding-left:11px;}.zone-conf td:first-child{border-left:3px solid var(--cl-conf);padding-left:11px;}.zone-rel td:first-child{border-left:3px solid var(--cl-rel);padding-left:11px;}.zone-espn td:first-child{border-left:3px solid var(--cl-zone-espn);padding-left:11px;}.standings-table tbody td:last-child{padding-right:14px;}.rank-cell{display:flex;align-items:center;gap:6px;font-weight:800;}.rank-num{width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;}.zone-cl .rank-num{background:linear-gradient(135deg,var(--cl-cl),#4f46e5);color:white;box-shadow:0 2px 12px rgba(var(--cl-accent-rgb),0.4);}.zone-cl.rank-first .rank-num{background:linear-gradient(135deg,var(--cl-gold),#d97706);color:#1f1410;box-shadow:0 2px 16px var(--cl-gold-glow);animation:gold-shimmer 3s ease-in-out infinite;}@keyframes gold-shimmer{0%,100%{box-shadow:0 2px 16px var(--cl-gold-glow);}50%{box-shadow:0 2px 24px var(--cl-gold-glow),0 0 32px var(--cl-gold-glow);}}.zone-el .rank-num{background:linear-gradient(135deg,var(--cl-el),#ea580c);color:white;box-shadow:0 2px 12px rgba(249,115,22,0.4);}.zone-rel .rank-num{background:linear-gradient(135deg,var(--cl-rel),#b91c1c);color:white;box-shadow:0 2px 12px rgba(239,68,68,0.4);}.zone-conf .rank-num{background:linear-gradient(135deg,var(--cl-conf),#7e22ce);color:white;box-shadow:0 2px 12px rgba(168,85,247,0.4);}.zone-default .rank-num{background:var(--cl-card-2);color:var(--cl-text-2);}.team-cell{display:flex;align-items:center;gap:10px;text-align:left !important;}.team-cell img{width:24px;height:24px;object-fit:contain;flex-shrink:0;}.team-cell .tname{font-weight:700;font-size:13px;letter-spacing:-0.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.points-cell{font-weight:900 !important;font-size:14px !important;}.gd-pos{color:var(--cl-green);font-weight:800 !important;}.gd-neg{color:var(--cl-live);font-weight:800 !important;}.groups-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;padding:12px;}.group-cell{background:transparent;border:none;border-radius:0;box-shadow:none;overflow:hidden;display:flex;flex-direction:column;margin-bottom:16px;}.group-title{padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;color:var(--cl-text);background:linear-gradient(135deg,rgba(var(--cl-accent-rgb),0.12),rgba(236,72,153,0.06));border-bottom:1px solid var(--cl-divider);display:flex;align-items:center;justify-content:space-between;gap:8px;}.group-pending-badge{font-size:9px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.08);color:var(--cl-text-2);border:1px solid var(--cl-divider);}.groups-grid-cup .group-cell{border-left:3px solid var(--cl-accent);}.groups-grid-cup .group-cell-pending{border-left-color:var(--cl-divider);opacity:0.92;}.standings-table.compact{font-size:12px;}.standings-table.compact thead th{padding:8px 4px;font-size:9px;letter-spacing:0.08em;}.standings-table.compact tbody td{padding:7px 4px;font-size:12px;}.standings-table.compact .rank-num{width:20px;height:20px;font-size:10px;border-radius:6px;}.standings-table.compact .team-cell{gap:7px;}.standings-table.compact .team-cell img{width:18px;height:18px;}.standings-table.compact .team-cell .tname{font-size:12px;font-weight:700;}.standings-table.compact .points-cell{font-size:13px !important;}.legend{display:flex;flex-wrap:wrap;gap:12px;padding:12px 16px;border-top:1px solid var(--cl-divider);background:var(--cl-card-2);}.legend-item{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--cl-text-2);font-weight:700;letter-spacing:0.04em;}.legend-dot{display:inline-block;flex-shrink:0;width:10px;height:10px;border-radius:3px;}.legend-dot.cl{background:linear-gradient(135deg,var(--cl-cl),#4f46e5);}.legend-dot.el{background:linear-gradient(135deg,var(--cl-el),#ea580c);}.legend-dot.rel{background:linear-gradient(135deg,var(--cl-rel),#b91c1c);}.legend-dot.conf{background:linear-gradient(135deg,var(--cl-conf),#7e22ce);}.event-toast{position:absolute;top:12px;left:50%;transform:translateX(-50%);background:var(--cl-toast-bg);color:#ffffff;padding:10px 18px;border-radius:14px;font-size:13px;font-weight:800;z-index:100;animation:toast-bounce 4s cubic-bezier(0.16,1,0.3,1) forwards;pointer-events:none;max-width:90%;text-align:center;letter-spacing:-0.01em;text-shadow:0 1px 2px rgba(0,0,0,0.8);}.event-toast.variant-goal{box-shadow:0 0 0 2px var(--cl-gold),0 0 0 4px rgba(251,191,36,0.3),0 12px 40px rgba(0,0,0,0.7),0 0 60px rgba(251,191,36,0.4);}.event-toast.variant-goal strong{color:var(--cl-gold-text);}.event-toast.variant-yellow{box-shadow:0 0 0 2px #f59e0b,0 0 0 4px rgba(245,158,11,0.3),0 12px 40px rgba(0,0,0,0.7);}.event-toast.variant-yellow strong{color:#fbbf24;}.event-toast.variant-red{box-shadow:0 0 0 2px var(--cl-live),0 0 0 4px rgba(239,68,68,0.3),0 12px 40px rgba(0,0,0,0.7);}.event-toast.variant-red strong{color:#fca5a5;}.event-toast.variant-finished{box-shadow:0 0 0 2px var(--cl-green),0 0 0 4px rgba(16,185,129,0.3),0 12px 40px rgba(0,0,0,0.7);}.event-toast.variant-finished strong{color:#6ee7b7;}@keyframes toast-bounce{0%{opacity:0;transform:translate(-50%,-20px) scale(0.7);}8%{opacity:1;transform:translate(-50%,0) scale(1.08);}14%{transform:translate(-50%,0) scale(1);}90%{opacity:1;transform:translate(-50%,0) scale(1);}100%{opacity:0;transform:translate(-50%,-10px) scale(0.95);}}.race-card{padding:16px;background:var(--cl-bg);color:var(--cl-text)}.race-head{display:flex;align-items:center;gap:9px}.race-head>span{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--cl-accent-soft)}.race-head div{flex:1}.race-head small{color:var(--cl-text-2);font-size:8px;font-weight:800;text-transform:uppercase}.race-head h2{margin:2px 0 0;font-size:16px}.race-head>b{color:var(--cl-text-2);font-size:9px}.race-focus{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:9px;margin:13px 0;padding:11px;border:1px solid var(--cl-divider);border-radius:12px;background:var(--cl-surface)}.race-focus img{width:40px;height:40px;object-fit:contain}.race-focus div{display:grid;gap:3px}.race-focus small{color:var(--cl-text-2);font-size:9px}.race-focus>span{color:var(--cl-accent);font-weight:900}.race-list{display:grid}.race-list>div{display:grid;grid-template-columns:22px 1fr 28px 64px;align-items:center;gap:7px;padding:8px 4px;border-bottom:1px solid var(--cl-divider);font-size:10px}.race-list>div.tracked{background:var(--cl-accent-soft);border-radius:8px}.race-list span{display:grid;gap:4px}.race-list i{display:block;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--cl-accent),var(--cl-accent-2))}.race-list strong{text-align:right}.race-list small{color:var(--cl-text-2);text-align:right;font-size:8px}.race-projection{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.race-projection span{padding:5px 8px;border:1px solid var(--cl-divider);border-radius:999px;background:var(--cl-surface);color:var(--cl-text-2);font-size:8px;font-weight:800}.trajectory{margin-top:12px;padding:10px;border-radius:10px;background:var(--cl-surface)}.trajectory>small{color:var(--cl-text-2);font-size:8px;text-transform:uppercase}.trajectory>div{display:flex;align-items:end;gap:4px;height:64px;margin-top:7px}.trajectory span{display:grid;grid-template-rows:1fr auto;align-items:end;flex:1;height:100%;text-align:center}.trajectory i{display:block;border-radius:3px 3px 0 0;background:var(--cl-accent);opacity:.75}.trajectory b{font-size:7px;color:var(--cl-text-2)}.race-card footer{margin-top:9px;color:var(--cl-text-2);font-size:8px;text-align:right}`]}}function Tt(t){const e=String(t?.date_iso||t?.date||""),a=Date.parse(e);if(!Number.isNaN(a))return a;const s=e.match(/^(\d{2})[-/](\d{2})[-/](\d{4})(?:\s+(\d{2}):(\d{2}))?/);return s?new Date(+s[3],+s[2]-1,+s[1],+(s[4]||0),+(s[5]||0)).getTime():0}function Pt(t){const e=Array.isArray(t?.matches)?t.matches:[],a=Array.isArray(t?.previous_matches)?t.previous_matches:[],s=e.filter(t=>t&&"post"===t.state),i=a.filter(t=>t&&("post"===t.state||null==t.state)),o=s.length?s:i;return o.length?[...o].sort((t,e)=>Tt(e)-Tt(t))[0]:null}customElements.get("soccer-live-standings")||customElements.define("soccer-live-standings",Mt);const Lt={possessionPct:"team.possession",totalShots:"team.shots",shotsOnTarget:"team.on_target",foulsCommitted:"team.fouls",goalAssists:"stat.assists",totalGoals:"stat.goals",wonCorners:"stat.corners",appearances:"stat.appearances",shotAssists:"stat.shot_assists",yellowCards:"stat.yellow_cards",redCards:"stat.red_cards",offsides:"stat.offsides",saves:"stat.saves",blockedShots:"stat.blocked_shots",shotsOffTarget:"stat.shots_off_target",expectedGoals:"stat.expected_goals",expectedGoalsOpenPlay:"stat.expected_goals_open_play",expectedGoalsSetPlay:"stat.expected_goals_set_play",expectedGoalsNonPenalty:"stat.expected_goals_non_penalty",expectedGoalsOnTarget:"stat.expected_goals_on_target",touchesInOppositionBox:"stat.touches_opposition_box",bigChances:"stat.big_chances",bigChancesMissed:"stat.big_chances_missed",accuratePasses:"stat.accurate_passes",totalPasses:"stat.total_passes",passesCompleted:"stat.passes_completed",tacklesTotal:"stat.tackles",interceptions:"stat.interceptions",aerialDuelsWon:"stat.aerial_duels_won",freeKickGoals:"stat.free_kick_goals",penaltyGoals:"stat.penalty_goals",accurateCrosses:"stat.accurate_crosses",clearances:"stat.clearances",successfulDribbles:"stat.successful_dribbles",duelsWon:"stat.duels_won",groundDuelsWon:"stat.ground_duels_won",accurateLongBalls:"stat.accurate_long_balls",oppositionHalfPasses:"stat.opposition_half_passes",ownHalfPasses:"stat.own_half_passes",throws:"stat.throws",blocks:"stat.blocks",shotsInsideBox:"stat.shots_inside_box",shotsOutsideBox:"stat.shots_outside_box",hitWoodwork:"stat.hit_woodwork"},jt=Object.fromEntries(Object.keys(Lt).map(t=>[t.replace(/[^a-z0-9]/gi,"").toLowerCase(),t]));Object.assign(jt,{ballpossesion:"possessionPct",touchesoppbox:"touchesInOppositionBox",touchesoppositionbox:"touchesInOppositionBox",bigchance:"bigChances",bigchancemissed:"bigChancesMissed",bigchancemissedtitle:"bigChancesMissed",accuratepass:"accuratePasses",accuratepasses:"accuratePasses",yellowcard:"yellowCards",shotsontarget:"shotsOnTarget",shotsofftarget:"shotsOffTarget",corners:"wonCorners",offsides:"offsides",accuratecrosses:"accurateCrosses",aerialswon:"aerialDuelsWon",clearances:"clearances",dribblessucceeded:"successfulDribbles",duelwon:"duelsWon",fouls:"foulsCommitted",groundduelswon:"groundDuelsWon",interceptions:"interceptions",keepersaves:"saves",longballsaccurate:"accurateLongBalls",tackles:"tacklesTotal",matchstatsheaderstackles:"tacklesTotal",passes:"totalPasses",ballpossession:"possessionPct",shotsongoal:"shotsOnTarget",shotsoffgoal:"shotsOffTarget",cornerkicks:"wonCorners",goalkeepersaves:"saves",passesaccurate:"accuratePasses",oppositionhalfpasses:"oppositionHalfPasses",ownhalfpasses:"ownHalfPasses",playerthrows:"throws",redcards:"redCards",shotblocks:"blocks",shotsinsidebox:"shotsInsideBox",shotsoutsidebox:"shotsOutsideBox",shotswoodwork:"hitWoodwork"});const Nt=t=>{const e=String(t||"");return jt[e.replace(/[^a-z0-9]/gi,"").toLowerCase()]||e};class Dt extends s.WF{static get properties(){return{hass:{},_config:{},_cachedData:{},_showDetails:{type:Boolean}}}setConfig(t){if(!t.entity)throw new Error("Entity required");this._config=t,z(this,t)}updated(t){if(t.has("hass")&&this._config){const t=this.hass?.states[this._config.entity];t&&"unavailable"!==t.state?(this._cachedData=t.attributes,K.set(this._config.entity,t.attributes)):this._cachedData||(this._cachedData=K.get(this._config.entity))}t.has("_showDetails")&&(this._showDetails?this._renderDetailsPortal():this._removeDetailsPortal())}disconnectedCallback(){super.disconnectedCallback(),this._removeDetailsPortal()}getCardSize(){return 3}_t(t,e){return(0,i.t)(t,(0,i.$c)(this.hass,this._config),e)}_attrs(){const t=this.hass?.states[this._config.entity];return t&&"unavailable"!==t.state?t.attributes:this._cachedData}render(){if(!this._config||!this.hass)return s.qy``;z(this,this._config);const t=this._attrs();if(!t||!t.matches&&!t.previous_matches)return V(t,t=>this._t(t),()=>G("📅",this._t("last_match.none"),this._t("last_match.none_hint")));const e=Pt(t);return e?s.qy`<ha-card>${this._renderMatch(e)}</ha-card>`:s.qy`<ha-card>${G("📅",this._t("last_match.none"),this._t("last_match.none_hint"))}</ha-card>`}_hasDetails(t){return!!(t.key_events&&t.key_events.length||t.lineup_home&&t.lineup_home.length||t.lineup_away&&t.lineup_away.length||t.home_statistics||t.head_to_head&&t.head_to_head.length)}_renderMatch(t){const e=(0,i.$c)(this.hass,this._config),a=t.league_name&&"N/A"!==t.league_name?t.league_name:"",o=ht({competitionName:a,competitionLogo:t.league_logo,fallbackLogo:null,isFriendly:t.is_friendly}),r=gt(a,e),n=(0,i.n1)(t.date_iso||t.date),l=n?n.toLocaleDateString(e,{day:"numeric",month:"short"}):"",c=Number(t.home_score),d=Number(t.away_score),p=Number.isFinite(c)&&Number.isFinite(d)&&c>d,h=Number.isFinite(c)&&Number.isFinite(d)&&d>c,u=t=>t?s.qy`<img class="lm-logo" src="${t}" alt="" loading="lazy">`:s.qy`<div class="lm-logo placeholder">⚽</div>`;return s.qy`
      <div class="lm-head">
        <span class="lm-comp">
          ${o?s.qy`<img src="${o}" alt="">`:s.qy`<span>⚽</span>`}
          ${r||s.qy`<span>&nbsp;</span>`}
        </span>
        <span class="lm-label">${this._t("last_match.label")}</span>
      </div>

      <div class="lm-score-row">
        <div class="lm-side home">
          ${u(t.home_logo)}
          <span class="lm-team">${t.home_team||t.home_abbrev||"?"}</span>
        </div>
        <div class="lm-scoreline">
          <span class="lm-score ${p?"win":""}">${q(t.home_score,"–")}</span>
          <span class="lm-sep">–</span>
          <span class="lm-score ${h?"win":""}">${q(t.away_score,"–")}</span>
        </div>
        <div class="lm-side away">
          <span class="lm-team">${t.away_team||t.away_abbrev||"?"}</span>
          ${u(t.away_logo)}
        </div>
      </div>

      ${l||r?s.qy`<div class="lm-meta">${[r,l].filter(Boolean).join(" · ")}</div>`:""}

      ${this._hasDetails(t)?s.qy`
        <div class="lm-actions">
          <button class="lm-details-btn" @click=${()=>{this._showDetails=!0}}>
            ${this._t("last_match.details")} ›
          </button>
        </div>`:""}
    `}_renderDetailsPortal(){const t=Pt(this._attrs());if(t){if(this._portal||(this._portal=document.createElement("dialog"),this._portal.className="soccer-live-last-match-portal",this._cancel=t=>{t.preventDefault(),this._showDetails=!1},this._backdrop=t=>{t.target===this._portal&&(this._showDetails=!1)},this._escape=t=>{"Escape"===t.key&&(this._showDetails=!1)},this._portal.addEventListener("cancel",this._cancel),this._portal.addEventListener("click",this._backdrop),document.addEventListener("keydown",this._escape),document.body.appendChild(this._portal)),this._copyThemeVars(this._portal),(0,s.XX)(s.qy`${this._portalStyles()}${$t("mp")}${this._renderDetails(t)}`,this._portal),!this._portal.open)try{this._portal.showModal()}catch{this._portal.setAttribute("open","")}}else this._showDetails=!1}_removeDetailsPortal(){this._portal&&(this._portal.open&&this._portal.close(),this._portal.removeEventListener("cancel",this._cancel),this._portal.removeEventListener("click",this._backdrop),document.removeEventListener("keydown",this._escape),(0,s.XX)(s.qy``,this._portal),this._portal.remove(),this._portal=null)}_copyThemeVars(t){const e=getComputedStyle(this);["--cl-bg","--cl-text","--cl-text-2","--cl-divider","--cl-accent","--cl-accent-2","--cl-accent-rgb","--cl-green","--cl-live","--cl-win","--cl-draw","--cl-loss"].forEach(a=>{const s=e.getPropertyValue(a);s&&t.style.setProperty(a,s)})}_renderDetails(t){const e=(0,i.$c)(this.hass,this._config),a=(t,e)=>this._t(t,e),o=(0,i.n1)(t.date_iso||t.date),r=o?o.toLocaleDateString(e,{weekday:"short",day:"numeric",month:"short"}):"",n=gt(t.league_name,e);return s.qy`
      <div class="lmp-box">
        <button class="lmp-close" aria-label="${this._t("last_match.close")}" @click=${()=>{this._showDetails=!1}}>×</button>
        <div class="lmp-score-row">
          <img class="lmp-logo" src="${t.home_logo}" alt="" @error=${t=>t.target.style.display="none"}>
          <div class="lmp-center">
            <div class="lmp-score">${q(t.home_score,"-")}<span> – </span>${q(t.away_score,"-")}</div>
            <div class="lmp-ft">${this._t("status.full_time")}</div>
          </div>
          <img class="lmp-logo" src="${t.away_logo}" alt="" @error=${t=>t.target.style.display="none"}>
        </div>
        <p class="lmp-teams"><strong>${t.home_team}</strong> – <strong>${t.away_team}</strong></p>
        ${n||r?s.qy`<p class="lmp-meta">${[n,r].filter(Boolean).join(" · ")}${t.venue&&"N/A"!==t.venue?` · ${t.venue}`:""}</p>`:""}

        ${this._renderStats(t,a)}
        ${this._renderRatings(t)}
        ${Ct(t,{translate:a})}
        ${St(t,{translate:a})}
        ${this._renderH2H(t,a)}

        <button class="lmp-done" @click=${()=>{this._showDetails=!1}}>${this._t("last_match.close")}</button>
      </div>
    `}_renderStats(t,e){const a=((t,e={})=>{if(!t||"object"!=typeof t)return[];const a=new Map;if(e&&"object"==typeof e)for(const[t,s]of Object.entries(e)){const e=Nt(t);a.has(e)||a.set(e,s)}const s=new Set,i=[];for(const[e,o]of Object.entries(t)){const t=Nt(e);"Unknown"===t||"appearances"===t||s.has(t)||(s.add(t),i.push({key:t,home:o,away:a.has(t)?a.get(t):"—"}))}return i})(t.home_statistics,t.away_statistics);if(!a.length)return"";const i=t=>{const e=parseFloat(String(t).replace("%",""));return Number.isFinite(e)?e:0};return s.qy`
      <div class="mp-section">
        <h5 class="mp-section-title">${this._t("tab.stats")}</h5>
        <div class="lmp-stats">
          ${a.map(t=>{const a=i(t.home),o=a+i(t.away),r=o>0?Math.round(a/o*100):50;return s.qy`
              <div class="lmp-stat">
                <span class="lmp-stat-h">${t.home??"-"}</span>
                <span class="lmp-stat-label">${((t,e)=>{const a=String(t||""),s=Nt(a),i=Lt[s];if(i){const t=e(i);if(t&&t!==i)return t}return a.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^./,t=>t.toUpperCase()).trim()})(t.key,e)}</span>
                <span class="lmp-stat-a">${t.away??"-"}</span>
              </div>
              <div class="lmp-bar"><div class="lmp-bar-h" style="width:${r}%"></div><div class="lmp-bar-a" style="width:${100-r}%"></div></div>`})}
        </div>
      </div>`}_ratingChip(t){const e=parseFloat(t);if(!Number.isFinite(e))return"";const a=e>=8?"#1f9d55":e>=7?"#4a9e2f":e>=6?"#c98a00":"#c0392b";return s.qy`<span class="lmp-rating" style="background:${a}">${e.toFixed(1)}</span>`}_renderRatings(t){const e=t.player_of_the_match,a=Array.isArray(t.top_rated_players)?t.top_rated_players:[];return e||a.length?s.qy`
      <div class="mp-section">
        <h5 class="mp-section-title">${this._t("popup.ratings")}</h5>
        ${e&&(e.name||e.player)?s.qy`
          <div class="lmp-potm">
            <span class="lmp-potm-label">⭐ ${this._t("popup.player_of_match")}</span>
            <span class="lmp-potm-name">${e.name||e.player}</span>
            ${this._ratingChip(e.rating)}
          </div>`:""}
        ${a.length?s.qy`
          <div class="lmp-ratings">
            ${a.slice(0,6).map(t=>s.qy`
              <div class="lmp-rated">
                ${t.photo?s.qy`<img src="${t.photo}" alt="" loading="lazy" @error=${t=>t.target.style.display="none"}>`:""}
                <span class="lmp-rated-name">${t.short_name||t.name}</span>
                ${t.position?s.qy`<small class="lmp-rated-pos">${t.position}</small>`:""}
                ${this._ratingChip(t.rating)}
              </div>`)}
          </div>`:""}
      </div>`:""}_renderH2H(t,e){const a=Array.isArray(t.head_to_head)?t.head_to_head:[];if(!a.length)return"";const o=this._attrs()||{},r=(this._config.my_team||this._config.team_name||o.team_name||t.home_team||"").toLowerCase(),n=(0,i.$c)(this.hass,this._config),l=t=>{const e=(0,i.n1)(t.date_iso||t.date);return e?e.toLocaleDateString(n,{day:"2-digit",month:"short",year:"numeric"}).replace(/\.$/,""):""};return s.qy`
      <div class="mp-section">
        <h5 class="mp-section-title">${e("popup.h2h")}</h5>
        <div class="lmp-h2h">
          ${a.slice(0,6).map(t=>s.qy`
            <div><span>${t.home_team||t.home}</span><div class="lmp-h2h-mid"><b class="lmp-h2h-score ${(t=>{const e=parseInt(t.home_score,10),a=parseInt(t.away_score,10);if(!r||Number.isNaN(e)||Number.isNaN(a))return"";const s=(t.home_team||t.home||"").toLowerCase().includes(r),i=(t.away_team||t.away||"").toLowerCase().includes(r);return s||i?e===a?"draw":s&&e>a||i&&a>e?"win":"loss":""})(t)}">${q(t.home_score,"-")} – ${q(t.away_score,"-")}</b>${l(t)?s.qy`<small class="lmp-h2h-date">${l(t)}</small>`:""}</div><span>${t.away_team||t.away}</span></div>`)}
        </div>
      </div>`}_portalStyles(){return s.qy`<style>
      ${bt.cssText}
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
    </style>`}static get styles(){return[S,s.AH`:host{display:block;}ha-card{padding:14px 16px;overflow:hidden;background:var(--cl-bg);color:var(--cl-text);}.lm-head{display:flex;align-items:center;justify-content:space-between;gap:8px;}.lm-comp{display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--cl-text-2);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.lm-comp img{width:18px;height:18px;object-fit:contain;}.lm-label{font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--cl-accent);white-space:nowrap;}.lm-score-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;margin:12px 0 6px;}.lm-side{display:flex;align-items:center;gap:8px;min-width:0;}.lm-side.away{justify-content:flex-end;}.lm-logo{width:34px;height:34px;object-fit:contain;flex:0 0 auto;}.lm-logo.placeholder{display:flex;align-items:center;justify-content:center;font-size:1.1rem;}.lm-team{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--cl-text);}.lm-scoreline{display:flex;align-items:center;gap:8px;}.lm-score{font-size:1.6rem;font-weight:800;font-variant-numeric:tabular-nums;color:var(--cl-text-2);}.lm-score.win{color:var(--cl-text);}.lm-sep{font-size:1.1rem;color:var(--cl-text-2);}.lm-meta{text-align:center;font-size:0.8rem;color:var(--cl-text-2);}.lm-actions{display:flex;justify-content:center;margin-top:14px;}.lm-details-btn{border:0;cursor:pointer;font-weight:700;font-size:0.8rem;padding:6px 16px;border-radius:99px;background:var(--cl-accent);color:#fff;}.lm-details-btn:hover{filter:brightness(1.08);}`]}}customElements.get("soccer-live-last-match")||customElements.define("soccer-live-last-match",Dt),new Map;const Ht=[{value:"team",element:"soccer-live-team",label:"Próximo Jogo",description:"Placar ao vivo, relógio, alinhamento e tempo"},{value:"standings",element:"soccer-live-standings",label:"Classificação",description:"Tabela classificativa da liga"},{value:"last-match",element:"soccer-live-last-match",label:"Último Jogo",description:"Resultado do último jogo terminado"}],Ot=Object.fromEntries(Ht.map(t=>[t.value,t.element])),It=new Set(Ht.map(t=>t.element));class Bt extends s.WF{static get properties(){return{hass:{type:Object},_config:{type:Object},_selectedModuleIndex:{type:Number}}}constructor(){super(),this._config={},this._selectedModuleIndex=0}setConfig(t){if(this._config={...t||{}},!Array.isArray(this._config.modules)||0===this._config.modules.length){const t=(0,$.RJ)(this.hass,this._config)||{},e=[];t.match_model&&e.push({id:"mod_match",type:"team",title:"Próximo Jogo",entity:t.match_model}),t.standings_model&&e.push({id:"mod_standings",type:"standings",title:"Classificação",entity:t.standings_model}),t.last_match_model&&e.push({id:"mod_last",type:"last-match",title:"Último Jogo",entity:t.last_match_model}),this._config.modules=e}this.requestUpdate()}_t(t,e){return(0,i.t)(t,(0,i.$c)(this.hass,this._config),e)}_dispatch(t){const e={...t,type:"custom:soccer-live-hub"};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_moveModule(t,e){const a=[...this._config.modules||[]],s=t+e;if(s<0||s>=a.length)return;const i=a[t];a[t]=a[s],a[s]=i,this._selectedModuleIndex=s,this._dispatch({...this._config,modules:a})}_addModule(t){if(!t)return;const e=Ht.find(e=>e.value===t),a=e?e.label:t,s=(0,$.RJ)(this.hass,this._config)||{};let i="";"team"===t?i=s.match_model:"standings"===t?i=s.standings_model:"last-match"===t&&(i=s.last_match_model);const o={id:`mod_${Date.now()}`,type:t,title:a,entity:i},r=[...this._config.modules||[],o];this._selectedModuleIndex=r.length-1,this._dispatch({...this._config,modules:r})}_duplicateModule(t){const e=[...this._config.modules||[]],a=e[t];if(!a)return;const s={...a,id:`mod_${Date.now()}`,title:`${a.title} (Cópia)`};e.splice(t+1,0,s),this._selectedModuleIndex=t+1,this._dispatch({...this._config,modules:e})}_removeModule(t){const e=[...this._config.modules||[]];e.splice(t,1),this._selectedModuleIndex=Math.max(0,t-1),this._dispatch({...this._config,modules:e})}_updateSelectedModule(t,e){const a=(this._config.modules||[]).map((a,s)=>{if(s!==this._selectedModuleIndex)return a;const i={...a};return""===e||null==e?delete i[t]:i[t]=e,i});this._dispatch({...this._config,modules:a})}_moduleTeamChanged(t){const e=(this._config.modules||[]).map((e,a)=>{if(a!==this._selectedModuleIndex)return e;const s={...e,team:t};t||delete s.team;const i=(0,$.RJ)(this.hass,{...this._config,team:t||this._config.team});return"team"===e.type?s.entity=i.match_model||e.entity:"standings"===e.type?s.entity=i.standings_model||e.entity:"last-match"===e.type&&(s.entity=i.last_match_model||e.entity),s});this._dispatch({...this._config,modules:e})}render(){const t=this._config.modules||[],e=Math.min(this._selectedModuleIndex,Math.max(0,t.length-1)),a=t[e]||null,i=(0,$.Lz)(this.hass);return s.qy`
      <div class="editor-box card-box">
        <div class="box-header">
          <span class="badge badge-card">CARD</span>
          <div class="box-title-group">
            <span class="box-title">${this._t("editor.whole_card")}</span>
            <span class="box-subtitle">${this._t("editor.whole_card_desc")}</span>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">${this._t("editor.card_title")}</label>
          <input
            type="text"
            .value=${this._config.title||""}
            placeholder="ex. Futebol"
            @change=${t=>this._dispatch({...this._config,title:t.target.value})}
          >
        </div>

        <div class="field-group">
          <label class="field-label">Subtítulo do Cartão</label>
          <input
            type="text"
            .value=${this._config.subtitle||""}
            placeholder="ex. A tua vista de futebol"
            @change=${t=>this._dispatch({...this._config,subtitle:t.target.value})}
          >
        </div>

        <div class="field-group">
          <label class="field-label">${this._t("editor.layout_mode")}</label>
          <select
            .value=${this._config.layout||"tabs"}
            @change=${t=>this._dispatch({...this._config,layout:t.target.value})}
          >
            <option value="tabs" ?selected=${"tabs"===(this._config.layout||"tabs")}>${this._t("editor.layout_tabs")}</option>
            <option value="stack" ?selected=${"stack"===this._config.layout}>${this._t("editor.layout_stack")}</option>
          </select>
        </div>

        <div class="field-group" style="margin-top: 16px; border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1)); padding-top: 12px;">
          ${(0,$.sz)(this,this._config,t=>this._t(t))}
        </div>
      </div>

      <div class="editor-box module-box">
        <div class="box-header">
          <span class="badge badge-module">MODULE</span>
          <div class="box-title-group">
            <span class="box-title">${this._t("editor.selected_content")}</span>
            <span class="box-subtitle">${this._t("editor.selected_content_desc")}</span>
          </div>
        </div>

        <div class="modules-list">
          ${t.map((a,i)=>{const o=i===e,r=String(i+1).padStart(2,"0");return s.qy`
              <div
                class="module-item ${o?"selected":""}"
                @click=${()=>{this._selectedModuleIndex=i,this.requestUpdate()}}
              >
                <span class="module-num">${r}</span>
                <span class="module-title">${a.title||a.type}</span>
                <div class="module-arrows" @click=${t=>t.stopPropagation()}>
                  <button
                    class="arrow-btn"
                    ?disabled=${0===i}
                    @click=${()=>this._moveModule(i,-1)}
                  >↑</button>
                  <button
                    class="arrow-btn"
                    ?disabled=${i===t.length-1}
                    @click=${()=>this._moveModule(i,1)}
                  >↓</button>
                </div>
              </div>
            `})}
        </div>

        <div class="add-module-wrap">
          <label class="field-label">${this._t("editor.add_module")}</label>
          <select @change=${t=>{this._addModule(t.target.value),t.target.value=""}}>
            <option value="">${this._t("editor.choose_content")}</option>
            ${Ht.map(t=>s.qy`<option value=${t.value}>${t.label}</option>`)}
          </select>
        </div>
      </div>

      ${a?s.qy`
        <div class="editor-box editing-box">
          <div class="box-header">
            <span class="badge badge-editing">${e+1}</span>
            <div class="box-title-group">
              <span class="box-title">${this._t("editor.editing_module",{current:e+1,total:t.length})}</span>
              <span class="box-subtitle">${this._t("editor.editing_module_desc")}</span>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Equipa do Módulo</label>
            <select
              .value=${a.team||this._config.team||""}
              @change=${t=>this._moduleTeamChanged(t.target.value)}
            >
              <option value="">— Herdar equipa do cartão (${this._config.team||"Geral"}) —</option>
              ${i.map(t=>s.qy`
                <option value=${t.name} ?selected=${(a.team||this._config.team)===t.name}>${t.name}</option>
              `)}
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">${this._t("editor.module_title")}</label>
            <input
              type="text"
              .value=${a.title||""}
              @change=${t=>this._updateSelectedModule("title",t.target.value)}
            >
          </div>

          <div class="field-group">
            <label class="field-label">${this._t("editor.entity")}</label>
            <ha-entity-picker
              .key=${a.entity||""}
              .hass=${this.hass}
              .value=${a.entity||""}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${t=>this._updateSelectedModule("entity",t.detail?.value||"")}
            ></ha-entity-picker>
          </div>

          <div class="module-actions">
            <button class="btn btn-secondary" @click=${()=>this._duplicateModule(e)}>${this._t("editor.duplicate_module")}</button>
            <button class="btn btn-danger" @click=${()=>this._removeModule(e)}>${this._t("editor.remove_module")}</button>
          </div>
        </div>
      `:""}
    `}static get styles(){return s.AH`:host{display:flex;flex-direction:column;gap:16px;}.editor-box{border-radius:12px;padding:16px;background:var(--card-background-color,#ffffff);border:1px solid var(--divider-color,rgba(0,0,0,0.12));}.card-box{border:2px solid #0284c7;background:rgba(2,132,199,0.03);}.module-box,.editing-box{border:2px solid #0284c7;background:rgba(2,132,199,0.03);}.box-header{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;}.badge{font-size:10px;font-weight:800;letter-spacing:0.05em;padding:3px 8px;border-radius:6px;text-transform:uppercase;display:inline-block;}.badge-card{border:1.5px solid #0284c7;color:#0284c7;}.badge-module{border:1.5px solid #0284c7;color:#0284c7;}.badge-editing{border:1.5px solid #0284c7;color:#0284c7;padding:2px 8px;}.box-title-group{display:flex;flex-direction:column;}.box-title{font-size:14px;font-weight:700;color:var(--primary-text-color);}.box-subtitle{font-size:12px;color:var(--secondary-text-color);margin-top:2px;}.field-group{margin-bottom:12px;}.field-label{display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--secondary-text-color);}input[type="text"],select{box-sizing:border-box;width:100%;padding:10px 12px;font-size:14px;border-radius:8px;border:1px solid var(--divider-color,rgba(0,0,0,0.15));background:var(--card-background-color,#ffffff);color:var(--primary-text-color);}ha-entity-picker{display:block;width:100%;}.modules-list{display:flex;flex-direction:column;gap:8px;margin-bottom:14px;}.module-item{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;border:1px solid var(--divider-color,rgba(0,0,0,0.12));background:var(--card-background-color,#ffffff);cursor:pointer;transition:all 0.2s ease;}.module-item.selected{border:2px solid #0284c7;box-shadow:0 2px 8px rgba(2,132,199,0.15);}.module-num{font-size:12px;font-weight:700;color:var(--secondary-text-color);}.module-title{flex:1;font-size:14px;font-weight:600;color:var(--primary-text-color);}.module-arrows{display:flex;gap:4px;}.arrow-btn{width:30px;height:30px;border-radius:6px;border:1px solid var(--divider-color,rgba(0,0,0,0.15));background:var(--card-background-color,#f8fafc);color:var(--primary-text-color);font-size:13px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}.arrow-btn:disabled{opacity:0.3;cursor:not-allowed;}.add-module-wrap{margin-top:10px;}.module-actions{display:flex;gap:8px;margin-top:16px;}.btn{padding:8px 16px;font-size:12px;font-weight:600;border-radius:8px;cursor:pointer;border:1px solid transparent;}.btn-secondary{background:var(--card-background-color,#f1f5f9);color:var(--primary-text-color);border-color:var(--divider-color,#cbd5e1);}.btn-danger{background:rgba(220,38,38,0.1);color:#dc2626;border-color:rgba(220,38,38,0.3);}`}}customElements.get("soccer-live-hub-editor")||customElements.define("soccer-live-hub-editor",Bt);class Ft extends HTMLElement{constructor(){super(),this._hass=null,this._config={},this._activeModuleId=null,this._tabBar=null,this._contentContainer=null,this._childElements=new Map}set hass(t){this._hass=t;for(const[e,a]of this._childElements.entries()){const s=this._getModules().find(t=>t.id===e);if(s&&a){const e=this._resolveModuleEntity(s),i={...s,skin:this._config.skin,appearance:this._config.appearance||"ha",palette:this._config.palette||"purple",language:this._config.language,entity:e,card_type:s.type};a.hass=y(t,i),a._isLoading=!1}}}_getModules(){if(Array.isArray(this._config?.modules)&&this._config.modules.length>0)return this._config.modules.filter(Boolean);const t=(0,$.RJ)(this._hass,this._config)||{},e=[];return t.match_model&&e.push({id:"mod_match",type:"team",title:"Próximo Jogo",entity:t.match_model}),t.standings_model&&e.push({id:"mod_standings",type:"standings",title:"Classificação",entity:t.standings_model}),t.last_match_model&&e.push({id:"mod_last",type:"last-match",title:"Último Jogo",entity:t.last_match_model}),e.length||e.push({id:"mod_default",type:"team",title:"Próximo Jogo",entity:this._config?.entity||""}),e}_getGroupedModules(){const t=this._getModules(),e=new Map;if(!Array.isArray(t))return e.set("Geral",[{id:"mod_default",type:"team",title:"Próximo Jogo",entity:""}]),e;for(const a of t){if(!a)continue;const t=a.team||this._config?.team||"Geral";e.has(t)||e.set(t,[]);const s=e.get(t);s&&s.push(a)}return 0===e.size&&e.set("Geral",[{id:"mod_default",type:"team",title:"Próximo Jogo",entity:""}]),e}_resolveModuleEntity(t){if("team"===t.type){const e=(t.team||this._config?.team||"").toLowerCase().replace(/[^a-z0-9]/g,"");for(const[t,a]of Object.entries(this._hass?.states||{})){if(!t.startsWith("sensor."))continue;const s=a?.attributes?.sensor_type,i=t.toLowerCase(),o=(a?.attributes?.team_name||a?.attributes?.team||"").toLowerCase().replace(/[^a-z0-9]/g,"");if((["team_matches_mixed","team_matches"].includes(s)||i.includes("all_mixed")||i.includes("todos"))&&(!e||i.includes(e)||o.includes(e)))return t}for(const[t,e]of Object.entries(this._hass?.states||{})){if(!t.startsWith("sensor."))continue;const a=e?.attributes?.sensor_type,s=t.toLowerCase();if(["team_matches_mixed","team_matches"].includes(a)||s.includes("all_mixed")||s.includes("todos"))return t}for(const[t,e]of Object.entries(this._hass?.states||{}))if(t.startsWith("sensor.")&&("team_match"===e?.attributes?.sensor_type||t.toLowerCase().includes("next")))return t}if("last-match"===t.type){const e=(t.team||this._config?.team||"").toLowerCase().replace(/[^a-z0-9]/g,"");for(const[t,a]of Object.entries(this._hass?.states||{})){if(!t.startsWith("sensor."))continue;const s=a?.attributes?.sensor_type,i=t.toLowerCase(),o=(a?.attributes?.team_name||a?.attributes?.team||"").toLowerCase().replace(/[^a-z0-9]/g,"");if(("last_match"===s||i.includes("last"))&&(!e||i.includes(e)||o.includes(e)))return t}for(const[t,e]of Object.entries(this._hass?.states||{}))if(t.startsWith("sensor.")&&("last_match"===e?.attributes?.sensor_type||t.toLowerCase().includes("last")))return t}if(t.entity&&this._hass?.states?.[t.entity]){const e=this._hass.states[t.entity],a=e?.attributes?.sensor_type;if(!a)return t.entity;if("standings"===t.type&&"standings"===a)return t.entity}const e=(0,$.RJ)(this._hass,this._config)||{};return"team"===t.type?e.match_model||t.entity:"standings"===t.type?e.standings_model||t.entity:"last-match"===t.type?e.last_match_model||t.entity:t.entity||e.match_model}setConfig(t){this._config=t||{},z(this,this._config),this._renderCard()}_applyWrapperTheme(t){if(!t)return;const e=this._config.appearance||"ha";"dark"===e?(t.style.background="#0f172a",t.style.color="#ffffff",t.style.setProperty("--primary-text-color","#ffffff"),t.style.setProperty("--card-background-color","#1e293b"),t.style.setProperty("--secondary-text-color","#94a3b8"),t.style.setProperty("--divider-color","rgba(255,255,255,0.10)")):"light"===e?(t.style.background="#ffffff",t.style.color="#0f172a",t.style.setProperty("--primary-text-color","#0f172a"),t.style.setProperty("--card-background-color","#f8fafc"),t.style.setProperty("--secondary-text-color","#64748b"),t.style.setProperty("--divider-color","#e2e8f0")):(t.style.background="var(--ha-card-background, var(--card-background-color, #ffffff))",t.style.color="var(--primary-text-color, #0f172a)")}_renderCard(){const t=this._getModules(),e=this._config.layout||"tabs";if(z(this,this._config),!t.length)return this.innerHTML="",void this.appendChild(this._placeholder());if("stack"===e){this.innerHTML="",this._tabBar=null;const e=document.createElement("div");e.className="soccer-live-stack-wrapper",e.style.cssText="display:flex;flex-direction:column;gap:12px;";for(const a of t){const t=this._createModuleElement(a);t&&e.appendChild(t)}return void this.appendChild(e)}if(this._tabBar){const t=this.querySelector(".soccer-live-hub-wrapper");t&&this._applyWrapperTheme(t)}else{this.innerHTML="";const t=document.createElement("ha-card");if(t.className="soccer-live-hub-wrapper",t.style.cssText="border-radius: 20px; overflow: hidden; padding: 0; border-top: 4px solid #e50000;",this._applyWrapperTheme(t),this._config.title){const e=document.createElement("div");e.className="soccer-live-card-title",e.style.cssText="padding: 16px 18px 8px;",e.innerHTML=`\n          <div style="font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--primary-text-color);">${this._config.title}</div>\n          <div style="font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; font-weight: 500;">${this._config.subtitle||"Soccer Live Hub"}</div>\n        `,t.appendChild(e)}this._tabBar=document.createElement("div"),this._tabBar.className="soccer-live-hub-tab-bar",this._tabBar.style.cssText="display:flex;flex-direction:column;border-bottom:1px solid var(--divider-color,rgba(0,0,0,0.08));",this._contentContainer=document.createElement("div"),this._contentContainer.className="soccer-live-hub-content",t.appendChild(this._tabBar),t.appendChild(this._contentContainer),this.appendChild(t)}const a=this._getGroupedModules(),s=[...a.keys()];this._activeTeam&&a.has(this._activeTeam)||(this._activeTeam=s[0]);const i=a.get(this._activeTeam)||[];let o=i.find(t=>t.id===this._activeModuleId);o||(o=i[0],this._activeModuleId=o?.id),this._updateTabBar(t),this._contentContainer.innerHTML="";const r=o?this._createModuleElement(o):null;r&&this._contentContainer.appendChild(r)}_updateTabBar(t){if(!this._tabBar)return;this._tabBar.innerHTML="";const e=this._config.appearance||"ha",a="dark"===e,s=a?"rgba(255,255,255,0.15)":"light"===e?"rgba(0,0,0,0.15)":"var(--divider-color, rgba(0,0,0,0.15))",i=this._getGroupedModules(),o=[...i.keys()];this._activeTeam&&i.has(this._activeTeam)||(this._activeTeam=o[0]);const r=i.get(this._activeTeam)||[];let n=r.find(t=>t.id===this._activeModuleId);if(n||(n=r[0],this._activeModuleId=n?.id),o.length>1){const t=document.createElement("div");t.style.cssText=`display:flex;gap:10px;padding:12px 16px;background:${a?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)"};border-bottom:1px solid ${s};overflow-x:auto;scrollbar-width:none;align-items:center;`;for(const e of o){const a=e===this._activeTeam,s=document.createElement("button");s.style.cssText=`\n          background: var(--card-background-color, #ffffff);\n          color: var(--primary-text-color);\n          border: ${a?"2px solid var(--primary-text-color, #111111)":"1px solid var(--divider-color, rgba(0,0,0,0.15))"};\n          padding: ${a?"7px 15px":"8px 16px"};\n          font-size: 13px;\n          font-weight: ${a?"700":"500"};\n          letter-spacing: 0.05em;\n          text-transform: uppercase;\n          cursor: pointer;\n          border-radius: 10px;\n          box-shadow: ${a?"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)":"none"};\n          transition: all 0.2s ease;\n          white-space: nowrap;\n        `,s.textContent=e,s.addEventListener("click",()=>{this._activeTeam=e;const t=i.get(e)?.[0];this._activeModuleId=t?.id,this._renderCard()}),t.appendChild(s)}this._tabBar.appendChild(t)}const l=document.createElement("div");l.style.cssText=`display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;background:${a?"rgba(255,255,255,0.01)":"rgba(0,0,0,0.01)"};align-items:center;`;for(const t of r){const e=t.id===this._activeModuleId,a=document.createElement("button");a.style.cssText=`\n        background: var(--card-background-color, #ffffff);\n        color: var(--primary-text-color);\n        border: ${e?"2px solid var(--primary-text-color, #111111)":"1px solid var(--divider-color, rgba(0,0,0,0.15))"};\n        border-radius: 10px;\n        padding: ${e?"7px 13px":"8px 14px"};\n        font-size: 12px;\n        font-weight: ${e?"700":"500"};\n        text-transform: uppercase;\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        box-shadow: ${e?"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)":"none"};\n        transition: all 0.2s ease;\n      `,a.textContent=t.title||t.type,a.addEventListener("click",()=>{this._activeModuleId=t.id,this._renderCard()}),l.appendChild(a)}this._tabBar.appendChild(l)}_createModuleElement(t){const e=t.type||"team",a=Ot[s=e]||(It.has(s)?s:"soccer-live-team");var s;if(!a||!customElements.get(a))return this._errorCard(`Módulo desconhecido: ${e}`);let i=this._childElements.get(t.id);i&&i.tagName.toLowerCase()===a||(i=document.createElement(a),this._childElements.set(t.id,i));const o=this._resolveModuleEntity(t),r={...t,skin:this._config.skin,appearance:this._config.appearance||"ha",palette:this._config.palette||"purple",language:this._config.language,entity:o,card_type:e};try{i.setConfig(r)}catch(e){r.entity&&console.warn(`SoccerLiveCard: setConfig failed for module ${t.id}:`,e)}return this._hass&&(i.hass=y(this._hass,r),i._isLoading=!1),setTimeout(()=>{if(i.shadowRoot){const t="soccer-live-hub-flatten";if(!i.shadowRoot.getElementById(t)){const e=document.createElement("style");e.id=t,e.textContent="\n            ha-card {\n              background: transparent !important;\n              border: none !important;\n              box-shadow: none !important;\n              border-radius: 0 !important;\n              padding: 0 !important;\n              margin: 0 !important;\n            }\n          ",i.shadowRoot.appendChild(e)}}},50),i}_placeholder(){const t=document.createElement("ha-card");t.style.cssText="padding:24px;text-align:center;color:#94a3b8;font-size:13px;";const e=this._hass?(this._hass.language||"en").split("-")[0]:"en";return t.textContent=(0,i.t)("ui.open_editor_to_configure",e),t}_errorCard(t){const e=document.createElement("ha-card");return e.style.cssText="padding:24px;text-align:center;color:#ef4444;font-size:13px;border:1px solid rgba(239,68,68,0.3);",e.textContent=t,e}getCardSize(){return 8}static getConfigElement(){const t=document.createElement("soccer-live-hub-editor");return t&&"function"!=typeof t.setConfig&&(t.setConfig=function(t){this._config=t,"function"==typeof this.requestUpdate&&this.requestUpdate()}),t}static getStubConfig(){return{title:"Futebol",layout:"tabs",modules:[]}}}customElements.get("soccer-live-hub")||customElements.define("soccer-live-hub",Ft),customElements.get("soccer-live-card")||customElements.define("soccer-live-card",Ft),window.customCards=window.customCards||[];for(const t of["soccer-live-hub","custom:soccer-live-hub"])window.customCards.some(e=>e.type===t)||window.customCards.push({type:t,name:"Soccer Live Hub",description:"Modular football hub card with reorderable modules, tabs or stack layout.",preview:!0,documentationURL:"https://github.com/nelsonamen/Teste"})})();