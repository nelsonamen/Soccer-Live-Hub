# Soccer Live Hub

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![Release](https://img.shields.io/github/v/release/nelsonamen/Soccer-Live-Hub?include_prereleases&color=orange)](https://github.com/nelsonamen/Soccer-Live-Hub/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/nelsonamen)

A clean, modular, and fast Home Assistant Lovelace card for tracking live football matches, standings, results, team competitions, and form.

<p align="center">
  <img src="https://raw.githubusercontent.com/nelsonamen/Soccer-Live-Hub/main/images/card-preview.png" alt="Soccer Live Hub Preview" width="350">
</p>

---

## Features

- **Automatic Competition Detection**: Automatically groups modules by tournament (Primeira Liga, UEFA Champions League, Premier League, etc.) without duplicate tabs.
- **Hierarchical Navigation**:
  - **Level 1 (Teams)**: Switch between configured clubs or national teams.
  - **Level 2 (Competitions)**: Filter content by league or cup.
  - **Level 3 (Modules)**: Toggle between Next Match, Standings, Last Match, and more.
- **Visual UI Editor**: Configure everything directly in the Home Assistant dashboard editor with clear module identification badges.
- **Dynamic Team Watermark**: Subtle crest background in the card header.
- **Multilingual**: Supports English, Português, Español, Français, Deutsch, Italiano, and Nederlands.

---

## Available Modules

| Module | Description |
|---|---|
| **Next Match / Live** | Real-time scoreboard, kickoff time, clock, stadium, and TV broadcasts. |
| **Standings** | League table with points, goal difference, and qualification zones. |
| **Mini Standings** | Compact table focused on your team and direct rivals. |
| **Last Match** | Final score, goal scorers, and match recap. |
| **Team Competitions** | Tabbed overview of all active tournaments for your team. |
| **Team Form** | Form guide chart and win/draw/loss statistics. |

---

## Installation

### HACS (Recommended)

1. Open **HACS** in Home Assistant > **Frontend**.
2. Click the top-right menu (3 dots) > **Custom repositories**.
3. Add `https://github.com/nelsonamen/Soccer-Live-Hub` as a **Dashboard** repository.
4. Search for **Soccer Live Hub** and click **Download**.
5. Refresh your browser (`Ctrl + F5`).

### Manual

1. Download `dist/soccer-live-hub.bundle.js` from the [latest release](https://github.com/nelsonamen/Soccer-Live-Hub/releases).
2. Copy the file to `<config>/www/soccer-live-hub.bundle.js`.
3. Add `/local/soccer-live-hub.bundle.js` as a **JavaScript Module** under **Settings** > **Dashboards** > **Resources**.

---

## Requirements

Requires sensor entities provided by:
- [Soccer Live Integration](https://github.com/rononline/soccerlive) by [@rononline](https://github.com/rononline)

---

## Configuration (UI Editor)

1. In any Home Assistant dashboard, click **Edit Dashboard** > **Add Card** and select **Soccer Live Hub**.
2. **General Card Settings**:
   - **Card Title**: Optional header title text.
   - **Layout Mode**: Choose between *Tabs (Navigation Bar)* or *Stacked*.
   - **Appearance**: Select *Home Assistant Theme*, *Dark*, or *Light*.
   - **Show Tab Logos**: Toggle logos/crests on navigation tabs.
3. **Adding & Editing Modules**:
   - Select content from the **Add Module** dropdown (e.g., *Next Match*, *Standings*, *Last Match*).
   - Select your sensor **Entity**.
   - Set an optional **Category / Competition** to group the module under a specific tab (e.g., *Primeira Liga*, *UEFA Champions League*). If left blank, the card automatically detects the competition!

---

## Support

If you enjoy this card and want to support development:

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/nelsonamen)
