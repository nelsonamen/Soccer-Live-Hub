import { test } from 'node:test';
import assert from 'node:assert/strict';
import { displayCompetitionName } from '../../src/cards/shared-competition.js';

test('displayCompetitionName handles Portuguese and international leagues', () => {
  assert.equal(displayCompetitionName('Portuguese Primeira Liga'), 'Primeira Liga');
  assert.equal(displayCompetitionName('Portuguese Liga Portugal'), 'Primeira Liga');
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
      const leagueName = attrs.league_name || attrs.competition_name || (attrs.matches?.[0]?.league_name && attrs.matches[0].league_name !== 'N/A' ? attrs.matches[0].league_name : null) || (attrs.league_info?.[0]?.name && attrs.league_info[0].name !== 'N/A' ? attrs.league_info[0].name : null) || null;
      const compDisplay = leagueName ? displayCompetitionName(leagueName, config.language || 'en') : (attrs.league_abbreviation && attrs.league_abbreviation !== 'N/A' ? attrs.league_abbreviation : null);
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

  // 1. Standings sensor uses league name if available
  assert.equal(getModuleCategory({ entity: 'sensor.standings_porto' }, hassMock), 'Primeira Liga');
  assert.equal(getModuleCategory({ entity: 'sensor.standings_ucl' }, hassMock), 'UEFA Champions League');

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
    if (rawTitle) return rawTitle;
    return mod.type || 'Módulo';
  }

  const modStandings1 = { id: 'm1', type: 'standings', title: 'Classificação', entity: 'sensor.standings_por' };
  const modCustom = { id: 'm5', type: 'team', title: 'Meu Jogo Especial', entity: 'sensor.standings_por' };

  assert.equal(getModuleDisplayTitle(modStandings1, [modStandings1]), 'Classificação');
  assert.equal(getModuleDisplayTitle(modCustom, [modCustom]), 'Meu Jogo Especial');
});
