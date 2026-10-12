# Soccer Live Hub

A modular Lovelace card for Home Assistant to track live football matches, standings, squads, news, top scorers, tournament brackets, and match statistics.

---

## Prerequisites

This card requires the following integration installed in Home Assistant:
- [Soccer Live Integration](https://github.com/rononline/soccerlive) by [@rononline](https://github.com/rononline)

---

## Inspiration

This project was inspired by:
- [soccerlive-card](https://github.com/rononline/soccerlive-card) by [@rononline](https://github.com/rononline)
- [f1_sensor card](https://github.com/Nicxe/f1_sensor) by [@Nicxe](https://github.com/Nicxe)

---

## Features

- **Unified Hub Card**: Single card with tab navigation to switch between Next Match, Standings, Scorers, Last Match, News, and Club views.
- **Modular Architecture**: Select any module using `card_type` or combine multiple modules in a single card.
- **Auto Discovery**: Automatically discovers related sensors for your team or league using `auto_discover_models`.
- **Adaptable Appearance**: Supports Dark, Light, and Home Assistant native themes.
- **Multilingual**: Auto-detects Home Assistant locale with support for English, Portuguese, Dutch, German, French, Spanish, Italian, and more.
- **Responsive Design**: Optimized for mobile, tablet, and desktop dashboards.

---

## Installation

### Via HACS
1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > **Custom Repositories**.
3. Add this repository URL with category **Dashboard** / **Lovelace**.
4. Click **Install**.
5. Refresh your browser.

### Manual Installation
1. Download `dist/soccer-live-hub.bundle.js`.
2. Copy the file to `/config/www/` in Home Assistant.
3. In Home Assistant, navigate to **Settings** > **Dashboards** > **Resources** and add:
   - **URL**: `/local/soccer-live-hub.bundle.js`
   - **Resource Type**: `JavaScript Module`

---

## Configuration Examples

All cards use `type: custom:soccer-live-hub` and specify the desired module via `card_type`.

### Main Multi-Model Tab Hub Card

```yaml
type: custom:soccer-live-hub
card_type: hub
auto_discover_models: true
match_model: sensor.soccer_live_next_ned_1_feyenoord_rotterdam
standings_model: sensor.soccer_live_standings_ned_1
scorers_model: sensor.soccer_live_scorers_ned_1
last_match_model: sensor.soccer_live_last_ned_1_feyenoord_rotterdam
news_model: sensor.soccer_live_news_ned_1
club_model: sensor.soccer_live_club_feyenoord_rotterdam
language: auto
appearance: ha
```

### Team Match Card

```yaml
type: custom:soccer-live-hub
card_type: team
entity: sensor.soccer_live_next_ned_1_feyenoord_rotterdam
show_event_toasts: true
```

### League Standings

```yaml
type: custom:soccer-live-hub
card_type: standings
entity: sensor.soccer_live_standings_ned_1
max_teams_visible: 18
hide_header: false
```

### Tournament Bracket

```yaml
type: custom:soccer-live-hub
card_type: bracket
entity: sensor.soccer_live_bracket_uefa_champions
style: tree
```

### Matches List

```yaml
type: custom:soccer-live-hub
card_type: matches
entity: sensor.soccer_live_all_ned_1
max_events_visible: 6
```

### Multi-Module Stacked Card

```yaml
type: custom:soccer-live-hub
title: Feyenoord Dashboard
modules:
  - type: team
    entity: sensor.soccer_live_next_ned_1_feyenoord_rotterdam
  - type: standings
    entity: sensor.soccer_live_standings_ned_1
  - type: matches
    entity: sensor.soccer_live_all_ned_1
```

---

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `card_type` | String | `team` | Module type (`team`, `standings`, `matches`, `news`, `bracket`, `scorers`, `hub`, `club`, etc.) |
| `entity` | String | *Required* | Soccer Live sensor entity ID |
| `language` | String | `auto` | Language (`auto`, `en`, `pt`, `nl`, `de`, `es`, `fr`, `it`) |
| `appearance` | String | `ha` | Theme appearance (`ha`, `dark`, `light`) |
| `compact` | Boolean | `false` | Compact display mode |

---

## Credits

- Integration by [@rononline](https://github.com/rononline) ([soccerlive](https://github.com/rononline/soccerlive)).
- Visual design and concepts inspired by [@rononline](https://github.com/rononline) ([soccerlive-card](https://github.com/rononline/soccerlive-card)) and [@Nicxe](https://github.com/Nicxe) ([f1_sensor](https://github.com/Nicxe/f1_sensor)).

---

## ☕ Support Development

<div align="center">
  <p>These projects are open source and will stay that way. If they've earned a coffee, the button's right here:</p>
  <a href="https://www.buymeacoffee.com/nelsonamen" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
  </a>
</div>
