import { test } from 'node:test';
import assert from 'node:assert/strict';
import { displayCompetitionName } from '../../src/cards/shared-competition.js';

test('displayCompetitionName handles Portuguese and international leagues', () => {
  assert.equal(displayCompetitionName('Portuguese Primeira Liga'), 'Primeira Liga');
  assert.equal(displayCompetitionName('Portuguese Liga Portugal'), 'Liga Portugal');
  assert.equal(displayCompetitionName('English Premier League'), 'Premier League');
  assert.equal(displayCompetitionName('Spanish LALIGA'), 'LALIGA');
  assert.equal(displayCompetitionName('UEFA Champions League'), 'UEFA Champions League');
  assert.equal(displayCompetitionName('Taça de Portugal'), 'Taça de Portugal');
});

test('displayCompetitionName localizes friendlies', () => {
  assert.equal(displayCompetitionName('Club Friendlies', 'pt'), 'Amistosos de clubes');
  assert.equal(displayCompetitionName('Friendlies', 'pt'), 'Amistosos');
  assert.equal(displayCompetitionName('Club Friendlies', 'en'), 'Club Friendlies');
});

test('Competition category resolution logic', () => {
  function getModuleCategory(mod, hass, config = {}) {
    if (!mod) return 'Geral';
    if (mod.category && mod.category.trim()) return mod.category.trim();

    const entityId = mod.entity;
    if (entityId && hass?.states?.[entityId]) {
      const attrs = hass.states[entityId].attributes || {};
      const leagueAbbr = attrs.league_abbreviation && attrs.league_abbreviation !== 'N/A' ? attrs.league_abbreviation : null;
      const leagueName = attrs.league_name || attrs.competition_name || (attrs.matches?.[0]?.league_name && attrs.matches[0].league_name !== 'N/A' ? attrs.matches[0].league_name : null) || (attrs.league_info?.[0]?.name && attrs.league_info[0].name !== 'N/A' ? attrs.league_info[0].name : null) || null;
      const compDisplay = leagueAbbr || (leagueName ? displayCompetitionName(leagueName, config.language || 'en') : null);
      if (compDisplay) return compDisplay;
    }
    return 'Geral';
  }

  const hassMock = {
    states: {
      'sensor.standings_porto': {
        attributes: {
          league_name: 'Portuguese Primeira Liga',
          league_abbreviation: 'POR 1',
        },
      },
      'sensor.standings_ucl': {
        attributes: {
          league_name: 'UEFA Champions League',
          league_abbreviation: 'UCL',
        },
      },
      'sensor.next_porto': {
        attributes: {
          matches: [
            { league_name: 'Portuguese Primeira Liga' },
          ],
        },
      },
      'sensor.unknown_mod': {
        attributes: {},
      },
    },
  };

  // 1. Standings sensor uses league abbreviation if available
  assert.equal(getModuleCategory({ entity: 'sensor.standings_porto' }, hassMock), 'POR 1');
  assert.equal(getModuleCategory({ entity: 'sensor.standings_ucl' }, hassMock), 'UCL');

  // 2. Next match sensor resolves from matches[0].league_name
  assert.equal(getModuleCategory({ entity: 'sensor.next_porto' }, hassMock), 'Primeira Liga');

  // 3. Custom category on module overrides auto-detection
  assert.equal(getModuleCategory({ entity: 'sensor.standings_porto', category: 'Taça da Liga' }, hassMock), 'Taça da Liga');

  // 4. Fallback to Geral when no competition found
  assert.equal(getModuleCategory({ entity: 'sensor.unknown_mod' }, hassMock), 'Geral');
  assert.equal(getModuleCategory(null, hassMock), 'Geral');
});

test('Module display title formatting and auto-replacement', () => {
  function getModuleDisplayTitle(mod, modules, hass, config = {}) {
    if (!mod) return '';
    const rawTitle = (mod.title || '').trim();

    const sameTitleCount = modules.filter(m => (m.title || '').trim().toLowerCase() === rawTitle.toLowerCase()).length;
    const isGenericTitle = !rawTitle || [
      'classificação', 'standings', 'stand', 'classifica', 'classement', 'clasificación', 'tabelle',
      'mini classificação', 'mini standings', 'mini-standings'
    ].includes(rawTitle.toLowerCase());

    if (!isGenericTitle && sameTitleCount <= 1) {
      return rawTitle;
    }

    const entityId = mod.entity;
    if (entityId && hass?.states?.[entityId]) {
      const attrs = hass.states[entityId].attributes || {};
      const leagueAbbr = attrs.league_abbreviation && attrs.league_abbreviation !== 'N/A' ? attrs.league_abbreviation : null;
      const leagueName = attrs.league_name || attrs.competition_name || (attrs.matches?.[0]?.league_name && attrs.matches[0].league_name !== 'N/A' ? attrs.matches[0].league_name : null) || null;
      const compDisplay = leagueAbbr || (leagueName ? displayCompetitionName(leagueName, config.language || 'en') : null);

      if (compDisplay) {
        if (isGenericTitle) {
          return `${compDisplay}`;
        }
        return `${rawTitle} (${compDisplay})`;
      }
    }

    return rawTitle || mod.type || 'Módulo';
  }

  const hassMock = {
    states: {
      'sensor.standings_por': {
        attributes: {
          league_name: 'Portuguese Primeira Liga',
          league_abbreviation: 'POR 1',
        },
      },
      'sensor.standings_ucl': {
        attributes: {
          league_name: 'UEFA Champions League',
          league_abbreviation: 'UCL',
        },
      },
      'sensor.scorers_por': {
        attributes: {
          league_name: 'Primeira Liga',
        },
      },
      'sensor.scorers_ucl': {
        attributes: {
          league_name: 'UEFA Champions League',
        },
      },
    },
  };

  const modStandings1 = { id: 'm1', type: 'standings', title: 'Classificação', entity: 'sensor.standings_por' };
  const modStandings2 = { id: 'm2', type: 'standings', title: 'Classificação', entity: 'sensor.standings_ucl' };
  const modScorers1 = { id: 'm3', type: 'scorers', title: 'Marcadores', entity: 'sensor.scorers_por' };
  const modScorers2 = { id: 'm4', type: 'scorers', title: 'Marcadores', entity: 'sensor.scorers_ucl' };
  const modCustom = { id: 'm5', type: 'team', title: 'Meu Jogo Especial', entity: 'sensor.standings_por' };

  const allMods = [modStandings1, modStandings2, modScorers1, modScorers2, modCustom];

  // Generic standings titles are replaced with the competition abbreviation/name
  assert.equal(getModuleDisplayTitle(modStandings1, allMods, hassMock), 'POR 1');
  assert.equal(getModuleDisplayTitle(modStandings2, allMods, hassMock), 'UCL');

  // Duplicate non-generic titles get the competition in parentheses
  assert.equal(getModuleDisplayTitle(modScorers1, allMods, hassMock), 'Marcadores (Primeira Liga)');
  assert.equal(getModuleDisplayTitle(modScorers2, allMods, hassMock), 'Marcadores (UEFA Champions League)');

  // Unique custom titles are preserved without extra parentheses
  assert.equal(getModuleDisplayTitle(modCustom, allMods, hassMock), 'Meu Jogo Especial');
});

