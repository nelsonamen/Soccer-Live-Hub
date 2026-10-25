import { parseMatchTimestamp } from '../i18n.js';
import { isFinishedMatch } from './shared-match-order.js';
import { normalizeArchiveMatch } from './shared-archive-model.js';
import { displayCompetitionName } from './shared-competition.js';

// Sortable timestamp from either `date_iso` or `date`
function _dateKey(match) {
  return parseMatchTimestamp(match?.date_iso) || parseMatchTimestamp(match?.date) || 0;
}

/**
 * Return the most recently finished match, or null.
 *
 * Compares finished matches from primary `matches`, `previous_matches`,
 * `match_archive`, `schedule_recent_matches`, `past_matches`, `match`, `next_match`,
 * or state object attributes, picking the most recent one.
 */
export function pickLastMatch(attributes, options = {}) {
  if (!attributes) return null;
  const matches = Array.isArray(attributes.matches) ? attributes.matches : [];
  const previous = Array.isArray(attributes.previous_matches) ? attributes.previous_matches : [];
  const archive = Array.isArray(attributes.match_archive) ? attributes.match_archive : [];
  const recent = Array.isArray(attributes.schedule_recent_matches) ? attributes.schedule_recent_matches : [];
  const past = Array.isArray(attributes.past_matches) ? attributes.past_matches : [];
  const singleMatch = attributes.match && typeof attributes.match === 'object' ? [attributes.match] : [];
  const nextMatch = attributes.next_match && typeof attributes.next_match === 'object' ? [attributes.next_match] : [];
  const selfMatch = (attributes.home_team || attributes.home_score != null || attributes.state) ? [attributes] : [];

  const pool = [...matches, ...previous, ...archive, ...recent, ...past, ...singleMatch, ...nextMatch, ...selfMatch]
    .map(normalizeArchiveMatch)
    .filter(Boolean);

  const finished = pool.filter(m => m && isFinishedMatch(m));
  if (!finished.length) return null;

  const targetComp = typeof options === 'string'
    ? options.trim()
    : (options?.competition || options?.category || '').trim();

  if (targetComp) {
    const lang = options?.lang || 'en';
    const normTarget = displayCompetitionName(targetComp, lang) || targetComp;
    const targetKey = normTarget.toLowerCase();

    const compFiltered = finished.filter(m => {
      const rawComp = m.league_name || m.competition_name || '';
      const mComp = displayCompetitionName(rawComp, lang) || rawComp;
      const mKey = mComp.toLowerCase();
      return mKey === targetKey || mKey.includes(targetKey) || targetKey.includes(mKey);
    });

    if (compFiltered.length > 0) {
      const seen = new Set();
      const unique = compFiltered.filter(m => {
        const key = m.event_id != null ? String(m.event_id) : `${m.home_team}_${m.away_team}_${m.date_iso || m.date}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return unique.sort((a, b) => _dateKey(b) - _dateKey(a))[0];
    }
  }

  const seen = new Set();
  const uniquePool = finished.filter(m => {
    const key = m.event_id != null ? String(m.event_id) : `${m.home_team}_${m.away_team}_${m.date_iso || m.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return uniquePool.sort((a, b) => _dateKey(b) - _dateKey(a))[0];
}
