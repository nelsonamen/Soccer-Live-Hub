// Pure helpers for the Last Match card: pick the most recent finished match and
// extract its goalscorers. Kept free of Home Assistant / Lit so it can be unit
// tested directly.

// Sortable timestamp from either an ISO `date_iso` or the "DD-MM-YYYY HH:MM"
// display date, so matches from the full and the compact list compare cleanly.
function _dateKey(match) {
  const raw = String(match?.date_iso || match?.date || '');
  const iso = Date.parse(raw);
  if (!Number.isNaN(iso)) return iso;
  const m = raw.match(/^(\d{2})[-/](\d{2})[-/](\d{4})(?:\s+(\d{2}):(\d{2}))?/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime();
  return 0;
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
