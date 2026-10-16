# ⚽ Soccer Live Hub

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/nelsonamen/Soccer-Live-Hub?include_prereleases&color=orange)](https://github.com/nelsonamen/Soccer-Live-Hub/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/nelsonamen)

A modular, highly customizable Lovelace card for **Home Assistant** to track football matches, standings, fixtures, results, squads, news, top scorers, tournament brackets, and live match statistics.

<p align="center">
  <img src="https://raw.githubusercontent.com/nelsonamen/Soccer-Live-Hub/main/images/card-preview.png" alt="Soccer Live Hub Preview" width="350">
</p>

---

## 🌟 Highlights & Key Features

- **🏆 Automatic League & Competition Detection**: No more duplicate generic tab buttons (like `[ STANDINGS ] [ STANDINGS ]`) when tracking multiple tournaments. The card reads sensor metadata and automatically labels tabs with the competition name (e.g. `PRIMEIRA LIGA`, `UEFA CHAMPIONS LEAGUE`, `PREMIER LEAGUE`).
- **🗂️ 3-Tier Hierarchical Navigation**:
  - **Level 1 (Teams)**: Toggle between your favorite clubs or national teams.
  - **Level 2 (Competitions & Subcategories)**: Group modules by tournament (e.g. Domestic League, European Cup, National Cup).
  - **Level 3 (Modules)**: Seamlessly switch between cards (Live Match, Standings, Scorers, Brackets).
- **🎨 Complete Visual UI Editor**: Fully configurable directly through the Home Assistant dashboard editor without touching YAML.
- **⚡ Smart Sensor Auto-Discovery**: Automatically matches and suggests relevant sensor entities for your team or competition.
- **🧩 11+ Specialized Modules**: From live match center with pitch telemetry to tournament brackets and mini-standings.
- **🌓 Theme & Style Adaptability**: Native Dark, Light, and custom Home Assistant theme support.
- **🌍 Multilingual**: Automatic language detection supporting **English**, **Português**, **Español**, **Français**, **Deutsch**, **Italiano**, and **Nederlands**.

---

## 📋 Available Modules

| Module | Identifier | Description |
|---|---|---|
| **Live / Team Match** | `live` / `team_match` | Real-time score, countdown, lineups, referee, stadium, and match status. |
| **Standings** | `standings` | Complete league table with points, goals, form (W/D/L), and promotion/relegation zones. |
| **Mini Standings** | `mini_standings` | Compact standings view centered around your team and direct rivals. |
| **Matches & Schedule** | `matches` | Upcoming fixtures and schedule for your team or league. |
| **Last Match** | `last_match` | Detailed recap and statistics from the most recent match played. |
| **Top Scorers** | `scorers` | Leaderboards for goals, assists, and key player statistics. |
| **Team Competitions** | `team_competitions` | Overview of all competitions your club is competing in with current rank and stats. |
| **Team Form** | `team_form` | Form guide and visual breakdown of recent results. |
| **Countdown** | `countdown` | Prominent countdown timer to the next kickoff. |
| **Match Center** | `match_center` | Deep-dive head-to-head stats, possession, shots, and live telemetry. |
| **Tournament Bracket** | `bracket` | Knockout bracket visualization for domestic and international cups. |

---

## 🧭 Navigation Hierarchy

The card automatically organizes your layout into a clean, intuitive hierarchy:

```text
[ FC PORTO ] [ BENFICA ] [ SPORTING ]                  <-- Level 1: Team Selector (optional multi-team)
     │
     ├── [ PRIMEIRA LIGA ] [ CHAMPIONS LEAGUE ]         <-- Level 2: Competition / Subcategory Tabs
     │        │
     │        ├── [ Standings ] [ Scorers ] [ Form ]   <-- Level 3: Module Pills
```

- When multiple competitions are detected (or assigned via the **Category / Competition** editor field), subcategory tabs appear automatically.
- Generic names are automatically replaced by the competition's real name or acronym.
- Clicking any subcategory tab instantly filters and displays the corresponding module content.

---

## 📦 Prerequisites

This card requires the following Home Assistant integration:
- [Soccer Live Integration](https://github.com/rononline/soccerlive) by [@rononline](https://github.com/rononline)

---

## 🚀 Installation

### Via HACS (Recommended)

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > Top right menu (3 dots) > **Custom repositories**.
3. Add repository:
   - **Repository**: `https://github.com/nelsonamen/Soccer-Live-Hub`
   - **Category**: `Dashboard` (or `Lovelace`)
4. Click **Add**, find **Soccer Live Hub**, and click **Download**.
5. Restart Home Assistant or reload your browser (`Ctrl + F5`).

### Manual Installation

1. Download `dist/soccer-live-hub.bundle.js` from the [latest release](https://github.com/nelsonamen/Soccer-Live-Hub/releases).
2. Copy the file into your Home Assistant directory: `<config>/www/soccer-live-hub.bundle.js`.
3. In Home Assistant, go to **Settings** > **Dashboards** > **Resources** (top right menu).
4. Click **Add Resource**:
   - **URL**: `/local/soccer-live-hub.bundle.js`
   - **Resource Type**: `JavaScript Module`
5. Refresh your browser cache.

---

## ⚙️ Configuration

### Using the Visual Editor (UI)

1. In any dashboard, click **Add Card** and choose **Soccer Live Hub**.
2. **General Settings**:
   - **Title**: Header text for the card (optional).
   - **Layout Mode**: Choose between `Tabs` (tab navigation) or `Stacked` (all modules stacked vertically).
   - **Theme Appearance**: Select `Auto`, `Dark`, or `Light`.
3. **Modules (`Adicionar módulo` / `Add module`)**:
   - **Module Type**: Select from the dropdown (Standings, Match, Scorers, etc.).
   - **Sensor Entity**: Pick your soccer sensor entity.
   - **Categoria / Competição (Optional)**: Type a custom category/competition name to group this module into a specific subcategory tab. If left empty, the card will automatically detect the competition from the sensor!
   - **Custom Title (Optional)**: Override the default title.

### YAML Example

```yaml
type: custom:soccer-live-hub
title: "FC Porto Hub"
layout: tabs
teams:
  - id: fc_porto
    name: "FC Porto"
    logo: "https://example.com/fcporto.png"
modules:
  - type: live
    entity: sensor.soccer_live_fc_porto
    category: "Primeira Liga"

  - type: standings
    entity: sensor.soccer_standings_primeira_liga
    category: "Primeira Liga"

  - type: scorers
    entity: sensor.soccer_scorers_primeira_liga
    category: "Primeira Liga"

  - type: standings
    entity: sensor.soccer_standings_champions_league
    category: "Champions League"

  - type: bracket
    entity: sensor.soccer_bracket_champions_league
    category: "Champions League"
```

---

## 💡 Inspiration & Credits

- [Soccer Live Integration](https://github.com/rononline/soccerlive) by [@rononline](https://github.com/rononline).
- Visual inspiration and concepts from [soccerlive-card](https://github.com/rononline/soccerlive-card) by [@rononline](https://github.com/rononline) and [f1_sensor](https://github.com/Nicxe/f1_sensor) by [@Nicxe](https://github.com/Nicxe).

---

## ☕ Support Development

<div align="center">
  <p>These projects are open source and will stay that way. If they've earned a coffee, the button's right here:</p>
  <a href="https://www.buymeacoffee.com/nelsonamen" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
  </a>
</div>
