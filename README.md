# Soccer Live Hub

A modular Lovelace card for Home Assistant to track live football matches, standings, squads, news, top scorers, tournament brackets, and match statistics.

<p align="center">
  <img src="https://raw.githubusercontent.com/nelsonamen/Soccer-Live-Hub/main/images/card-preview.png" alt="Soccer Live Hub Preview" width="200">
</p>

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

- **Visual UI Editor**: Fully configurable directly through Home Assistant's visual UI editor.
- **Modular Layout**: Add multiple modules (Next Match, Standings, Scorers, News, Club, Brackets) and switch views using Navigation Tabs or Vertical Stacks.
- **Auto Discovery**: Automatically detects and links related sensors for your team or league.
- **Adaptable Appearance**: Supports Dark, Light, and Home Assistant native themes.
- **Multilingual**: Auto-detects Home Assistant locale (English, Portuguese, Dutch, German, French, Spanish, Italian, etc.).

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

## How to Use

1. Add the **Soccer Live Hub** card in your Home Assistant dashboard editor.
2. Choose your card title, layout mode (Tabs or Stacked), and theme appearance.
3. Under **Modules** (`Adicionar módulo`), select the content module you want to add (Match, Standings, Scorers, News, Club, etc.) and select its sensor entity.

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
