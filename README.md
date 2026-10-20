# ⚽ Soccer Live Hub

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/nelsonamen/Soccer-Live-Hub?include_prereleases&color=orange)](https://github.com/nelsonamen/Soccer-Live-Hub/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/nelsonamen)

A modular, sleek, and ultra-fast **Home Assistant** Lovelace card to track live football matches, standings, recent results, team competitions, and form guide for your favorite clubs and national teams.

---

## 🌟 Key Features

- **🏆 Automatic League & Competition Detection**: Automatically groups modules by competition (e.g., **Primeira Liga**, **UEFA Champions League**, **Premier League**) without duplicate generic tabs.
- **🗂️ 3-Tier Hierarchical Navigation**:
  - **Tier 1 (Teams)**: Easily switch between your favorite clubs and national teams.
  - **Tier 2 (Competitions & Subcategories)**: Group modules by league or tournament.
  - **Tier 3 (Modules)**: Seamlessly toggle between Next Match, Standings, Last Match, etc.
- **🛡️ Dynamic Crest Watermark**: Displays a subtle official crest watermark of the active team in the top-right header.
- **🎨 Complete Visual UI Editor**: Fully configurable directly through the Home Assistant dashboard editor without touching YAML.
- **🏷️ Clear Module Identification in Editor**: Each item in the editor list shows a badge with its Team and Competition name for effortless navigation.
- **🌓 Theme & Style Adaptability**: Native Dark, Light, and Home Assistant theme support.
- **🌍 Multilingual**: Automatic user language detection supporting **English**, **Português**, **Español**, **Français**, **Deutsch**, **Italiano**, and **Nederlands**.

---

## 📋 Available Modules

| Module | Description |
|---|---|
| **Next Match / Live** | Real-time live scoreboard, clock, referee, venue, and TV broadcast details. |
| **Standings** | Complete league table with points, goal difference, and promotion/qualification zones. |
| **Mini Standings** | Compact standings view centered around your team and direct rivals. |
| **Last Match** | Final score, goal scorers, and detailed match recap from the last completed fixture. |
| **Team Competitions** | Tabbed overview of all tournaments your team is competing in. |
| **Team Form** | Form guide trend chart and W/D/L statistics. |

---

## 📦 Prerequisites

This card relies on sensor entities created by the following Home Assistant integration:
- [Soccer Live Integration](https://github.com/rononline/soccerlive) by [@rononline](https://github.com/rononline)

---

## 🚀 Installation

### Via HACS (Recommended)

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > Top right menu (3 dots) > **Custom repositories**.
3. Add repository:
   - **Repository**: `https://github.com/nelsonamen/Soccer-Live-Hub`
   - **Category**: `Dashboard` (or `Lovelace`)
4. Click **Add**, search for **Soccer Live Hub**, and click **Download**.
5. Perform a *Hard Refresh* in your browser (`Ctrl + F5`).

### Manual Installation

1. Download `dist/soccer-live-hub.bundle.js` from the [latest release](https://github.com/nelsonamen/Soccer-Live-Hub/releases).
2. Copy the file into your Home Assistant directory: `<config>/www/soccer-live-hub.bundle.js`.
3. In Home Assistant, go to **Settings** > **Dashboards** > **Resources** (top right menu).
4. Click **Add Resource**:
   - **URL**: `/local/soccer-live-hub.bundle.js`
   - **Resource Type**: `JavaScript Module`
5. Refresh your browser page (`Ctrl + F5`).

---

## ⚙️ Configuration (UI Editor)

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

## ☕ Support Development

<div align="center">
  <p>These projects are open source and free. If you'd like to support development with a coffee:</p>
  <a href="https://www.buymeacoffee.com/nelsonamen" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
  </a>
</div>
