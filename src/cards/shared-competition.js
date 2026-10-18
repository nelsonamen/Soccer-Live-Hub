// Normalised comparison key for a competition name (lowercase, single spaces,
// separators/dots collapsed) so slugs and display names compare consistently.
function _normKey(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Localised names for the two friendly "competitions". These are both the
// output of displayCompetitionName AND — importantly — what the integration
// already stores in `league_name` for API-Football (it localises there), so a
// card may see either the English key or a translated name.
const CLUB_FRIENDLY_LABELS = {
  en: 'Club Friendlies', nl: 'Oefenwedstrijd', de: 'Vereinsfreundschaftsspiele',
  es: 'Amistosos de clubes', fr: 'Matchs amicaux clubs', it: 'Amichevoli club',
  pt: 'Amistosos de clubes',
};
const FRIENDLY_LABELS = {
  en: 'Friendlies', nl: 'Oefenwedstrijden', de: 'Freundschaftsspiele',
  es: 'Amistosos', fr: 'Matchs amicaux', it: 'Amichevoli', pt: 'Amistosos',
};

// Raw provider keys (English) plus every localised label above, normalised.
const _RAW_FRIENDLY_KEYS = [
  'friendlies clubs', 'friendlies club', 'friendly clubs', 'friendly club',
  'club friendlies', 'club friendly', 'friendlies', 'friendly',
];
const FRIENDLY_SET = new Set([
  ..._RAW_FRIENDLY_KEYS,
  ...Object.values(CLUB_FRIENDLY_LABELS).map(_normKey),
  ...Object.values(FRIENDLY_LABELS).map(_normKey),
]);

// Whether a competition is a friendly. Providers hand out a generic FIFA logo
// for friendlies, so cards use this to suppress that misleading logo. Matches
// the raw English names, every localised name, and any name containing
// "friendl" (covers "International Friendly", ESPN slugs, etc.).
export function isFriendlyCompetition(name) {
  const key = _normKey(name);
  if (!key) return false;
  return FRIENDLY_SET.has(key) || /friendl/.test(key);
}

// Single place that decides which logo a card should show for a competition.
// Friendlies get a generic FIFA crest from the provider, so for a friendly we
// return the caller's `fallbackLogo` (a team logo on team-focused cards, or
// null to fall back to a neutral icon) instead of the competition logo.
//
// Prefers the integration's stable `is_friendly` flag when provided, and only
// falls back to the name heuristic for older integrations that don't publish it.
export function resolveCompetitionLogo({ competitionName, competitionLogo, fallbackLogo = null, isFriendly } = {}) {
  const friendly = typeof isFriendly === 'boolean'
    ? isFriendly
    : isFriendlyCompetition(competitionName);
  if (friendly) return fallbackLogo;
  const logo = competitionLogo && competitionLogo !== 'N/A' ? competitionLogo : null;
  return logo || fallbackLogo;
}

// Pick the league_info entry that belongs to a given competition name.
// `league_info` can list several of a team's competitions (e.g. a friendly
// alongside the league), so naively taking the first entry can grab an
// unrelated one and mislabel the match. Match by name; only fall back to the
// sole entry, so a multi-entry list never silently resolves to the wrong competition.
export function pickLeagueInfo(leagueList, leagueName) {
  const list = Array.isArray(leagueList) ? leagueList : [];
  const name = leagueName && leagueName !== 'N/A' ? String(leagueName).toLowerCase() : '';
  const matched = name
    ? list.find(l => l && l.name && String(l.name).toLowerCase() === name)
    : null;
  return matched || (list.length === 1 ? list[0] : null);
}

// Some providers (notably ESPN) prefix a league with a country demonym, e.g.
// "Dutch Eredivisie", "Spanish LALIGA". Map those to the league's common name.
// An explicit list (rather than blindly stripping the first word) avoids
// mangling cup names such as ESPN's "German Cup" into a bare "Cup".
const COMPETITION_ALIASES = {
  'dutch eredivisie': 'Eredivisie',
  'english premier league': 'Premier League',
  'spanish laliga': 'LALIGA',
  'german bundesliga': 'Bundesliga',
  'italian serie a': 'Serie A',
  'french ligue 1': 'Ligue 1',
  'portuguese liga portugal': 'Primeira Liga',
  'portuguese primeira liga': 'Primeira Liga',
  'portuguese liga': 'Primeira Liga',
  'liga portugal': 'Primeira Liga',
  'primeira liga': 'Primeira Liga',
};

const LOCALIZED_COMPETITION_NAMES = {
  'uefa champions league': { pt: 'Liga dos Campeões', es: 'Liga de Campeones', fr: 'Ligue des Champions', de: 'Champions League', it: 'Champions League', nl: 'Champions League' },
  'champions league': { pt: 'Liga dos Campeões', es: 'Liga de Campeones', fr: 'Ligue des Champions', de: 'Champions League', it: 'Champions League', nl: 'Champions League' },
  'uefa europa league': { pt: 'Liga Europa', es: 'Liga Europa', fr: 'Ligue Europa', de: 'Europa League', it: 'Europa League', nl: 'Europa League' },
  'europa league': { pt: 'Liga Europa', es: 'Liga Europa', fr: 'Ligue Europa', de: 'Europa League', it: 'Europa League', nl: 'Europa League' },
  'uefa conference league': { pt: 'Liga Conferência', es: 'Liga Conferencia', fr: 'Ligue Conférence', de: 'Conference League', it: 'Conference League', nl: 'Conference League' },
  'conference league': { pt: 'Liga Conferência', es: 'Liga Conferencia', fr: 'Ligue Conférence', de: 'Conference League', it: 'Conference League', nl: 'Conference League' },
  'taça de portugal': { pt: 'Taça de Portugal' },
  'taca de portugal': { pt: 'Taça de Portugal' },
  'taça da liga': { pt: 'Taça da Liga' },
  'taca da liga': { pt: 'Taça da Liga' },
};

export function displayCompetitionName(name, lang = 'en') {
  const raw = String(name || '').trim();
  if (!raw || raw === 'N/A') return '';

  const key = _normKey(raw);
  const langKey = String(lang || 'en').split(/[-_]/)[0].toLowerCase();

  if (LOCALIZED_COMPETITION_NAMES[key]?.[langKey]) {
    return LOCALIZED_COMPETITION_NAMES[key][langKey];
  }

  if (['friendlies clubs', 'friendlies club', 'friendly clubs', 'friendly club',
       'club friendlies', 'club friendly'].includes(key)) {
    return CLUB_FRIENDLY_LABELS[langKey] || CLUB_FRIENDLY_LABELS.en;
  }

  if (key === 'friendlies' || key === 'friendly') {
    return FRIENDLY_LABELS[langKey] || FRIENDLY_LABELS.en;
  }

  if (COMPETITION_ALIASES[key]) return COMPETITION_ALIASES[key];

  return raw;
}
