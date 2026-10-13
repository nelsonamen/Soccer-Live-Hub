import { parseMatchTimestamp } from '../i18n.js';

export function isFinishedMatch(match) {
  if (!match) return false;
  if (match.state) {
    const s = String(match.state).trim().toLowerCase();
    if (['pre', 'scheduled', 'upcoming', 'in', 'live'].includes(s)) return false;
    if (['post', 'finished', 'ft', 'complete', 'completed', 'ended'].includes(s)) return true;
  }

  const hs = match.home_score;
  const as = match.away_score;
  const hasValidScore = hs != null && as != null && String(hs) !== '' && String(as) !== '' && String(hs) !== 'N/A' && String(as) !== 'N/A' && !isNaN(Number(hs)) && !isNaN(Number(as));
  if (hasValidScore) return true;

  const status = String(match.status || match.status_detail || '').trim().toLowerCase();
  if (['full time', 'finished', 'final', 'ft', 'einde wedstrijd', 'encerrado', 'terminado']
    .some(term => status.includes(term))) return true;

  return false;
}

export function matchTimestamp(match) {
  return parseMatchTimestamp(match?.date_iso) || parseMatchTimestamp(match?.date) || null;
}

export function matchIdentity(match) {
  if (match?.event_id !== null && match?.event_id !== undefined && match?.event_id !== '') {
    return `event:${match.event_id}`;
  }
  const kickoff = matchTimestamp(match) ?? String(match?.date_iso || match?.date || '');
  const home = match?.home_id ?? match?.home_team ?? '';
  const away = match?.away_id ?? match?.away_team ?? '';
  return `fixture:${kickoff}:${home}:${away}`;
}

export function sortMatchesByStateAndDate(matches) {
  const rank = state => {
    const s = String(state || '').trim().toLowerCase();
    if (s === 'in') return 0;
    if (s === 'pre' || s === 'scheduled') return 1;
    if (['post', 'finished', 'ft', 'complete', 'completed', 'ended'].includes(s)) return 2;
    return 3;
  };
  return [...(Array.isArray(matches) ? matches : [])].sort((a, b) => {
    const stateDiff = rank(a?.state) - rank(b?.state);
    if (stateDiff) return stateDiff;
    const aTime = matchTimestamp(a);
    const bTime = matchTimestamp(b);
    if (aTime === null && bTime === null) return 0;
    if (aTime === null) return 1;
    if (bTime === null) return -1;
    return isFinishedMatch(a) ? bTime - aTime : aTime - bTime;
  });
}
