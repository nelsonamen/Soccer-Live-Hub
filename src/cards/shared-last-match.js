import { parseMatchTimestamp } from '../i18n.js';

// Sortable timestamp from either `date_iso` or `date`
function _dateKey(match) {
  return parseMatchTimestamp(match?.date_iso) || parseMatchTimestamp(match?.date) || 0;
}

/**
 * Return the most recently finished match, or null.
 *
 * Compares finished matches from both the primary `matches` list and the
 * `previous_matches` list, picking the most recent one chronologically.
 */
export function pickLastMatch(attributes) {
  const matches = Array.isArray(attributes?.matches) ? attributes.matches : [];
  const previous = Array.isArray(attributes?.previous_matches) ? attributes.previous_matches : [];
  const finished = matches.filter(m => m && m.state === 'post');
  const compact = previous.filter(m => m && (m.state === 'post' || m.state == null));
  const pool = [...finished, ...compact];
  if (!pool.length) return null;

  const seen = new Set();
  const uniquePool = pool.filter(m => {
    const key = m.event_id != null ? String(m.event_id) : `${m.home_team}_${m.away_team}_${m.date_iso || m.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return uniquePool.sort((a, b) => _dateKey(b) - _dateKey(a))[0];
}
