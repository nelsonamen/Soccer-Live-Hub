const EMPTY_VALUES = new Set(['', 'N/A', 'n/a', 'unknown', 'Unknown']);

function present(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return !EMPTY_VALUES.has(value.trim());
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

function normalizedName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b(fc|cf|sc|afc|club|football|voetbal|rotterdam)\b/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function sameTeam(left, right) {
  const a = normalizedName(left);
  const b = normalizedName(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

function kickoffDay(match) {
  return String(match?.date_iso || match?.date || '').slice(0, 10);
}

export function sameFixture(left, right) {
  if (!left || !right) return false;
  if (
    left.event_id != null
    && right.event_id != null
    && String(left.event_id) === String(right.event_id)
  ) return true;
  const dayA = kickoffDay(left);
  const dayB = kickoffDay(right);
  return Boolean(
    dayA && dayB && dayA === dayB
    && sameTeam(left.home_team, right.home_team)
    && sameTeam(left.away_team, right.away_team)
  );
}

function equivalent(left, right) {
  if (left === right) return true;
  if (typeof left === 'object' || typeof right === 'object') {
    try { return JSON.stringify(left) === JSON.stringify(right); } catch (_) { return false; }
  }
  return String(left) === String(right);
}

function clockProgress(value) {
  const text = String(value || '').toUpperCase().trim();
  if (text === 'HT') return 45;
  const parts = text.match(/\d+/g)?.map(Number) || [];
  return parts.length ? parts.reduce((total, part) => total + part, 0) : -1;
}

export function blendHassSources(hass, config) {
  if (!hass) return hass;
  const entityId = config?.entity || (config?.entities && config.entities[0]);
  const broadcastEntity = config?.broadcast_entity;
  const broadcastVal = (broadcastEntity && hass?.states?.[broadcastEntity])
    ? (['unavailable', 'unknown'].includes(hass.states[broadcastEntity].state) ? '' : hass.states[broadcastEntity].state)
    : config?.broadcast;

  if (!broadcastVal) return hass;

  const states = { ...hass.states };
  if (entityId && states[entityId]) {
    const origState = states[entityId];
    const attrs = { ...origState.attributes };
    attrs.broadcast = broadcastVal;
    attrs.broadcasts = [broadcastVal];
    if (attrs.next_match && typeof attrs.next_match === 'object') {
      attrs.next_match = { ...attrs.next_match, broadcast: broadcastVal, broadcasts: [broadcastVal] };
    }
    if (Array.isArray(attrs.upcoming_matches)) {
      attrs.upcoming_matches = attrs.upcoming_matches.map(m => m ? { ...m, broadcast: broadcastVal, broadcasts: [broadcastVal] } : m);
    }
    if (Array.isArray(attrs.matches)) {
      attrs.matches = attrs.matches.map(m => m ? { ...m, broadcast: broadcastVal, broadcasts: [broadcastVal] } : m);
    }
    states[entityId] = {
      ...origState,
      attributes: attrs
    };
  }

  return {
    ...hass,
    states
  };
}

function richness(attrs) {
  const matches = attrs?.matches || [];
  return matches.reduce((score, match) => score + [
    'key_events', 'lineup_home', 'home_statistics', 'head_to_head',
    'prediction', 'odds', 'injuries_home', 'review', 'momentum',
  ].filter(key => present(match?.[key])).length, 0);
}

export function findEnrichmentEntity(hass, config) {
  const primaryId = config?.entity;
  const primary = hass?.states?.[primaryId];
  if (!primary) return '';
  const attrs = primary.attributes || {};
  const primaryMatches = attrs.matches || [];
  const primaryDays = new Set(primaryMatches.map(kickoffDay).filter(Boolean));
  const primaryIds = new Set(
    primaryMatches.map(match => String(match?.event_id || '')).filter(Boolean),
  );
  const provider = attrs.provider;
  const candidates = Object.entries(hass.states)
    .filter(([id, state]) =>
      id !== primaryId
      && id.startsWith('sensor.')
      && state?.attributes
      && state.attributes.provider
      && state.attributes.provider !== provider
      && Array.isArray(state.attributes.matches)
      && state.attributes.matches.some(match => (
        primaryDays.has(kickoffDay(match))
        || primaryIds.has(String(match?.event_id || ''))
      )))
    .map(([id, state]) => {
      const matches = state.attributes.matches;
      const overlap = primaryMatches.reduce(
        (count, match) => count + (matches.some(candidate => sameFixture(match, candidate)) ? 1 : 0),
        0,
      );
      return { id, score: overlap * 100 + richness(state.attributes) };
    })
    .filter(candidate => candidate.score >= 100)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return candidates[0]?.id || '';
}
