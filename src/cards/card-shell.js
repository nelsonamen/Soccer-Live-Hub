import { css, html } from "lit";

export const soccerCardShellStyles = css`
  :host {
    -webkit-tap-highlight-color: transparent;
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: none;
    background: transparent;
    color: var(--cl-text);
  }

  .hero-bg, .bg-logos {
    display: none !important;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  .top-bar {
    position: relative;
    z-index: 1;
    background: transparent;
  }

  button:focus-visible,
  [role="button"]:focus-visible,
  select:focus-visible,
  input:focus-visible,
  summary:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--cl-accent, #0284c7);
    outline-offset: 2px;
  }

  .match-row,
  .h2h-row,
  .tl-row,
  .squad-row,
  .transfer-row,
  .injury-row {
    content-visibility: auto;
    contain-intrinsic-size: auto 52px;
  }
`;

export function renderCardHero(homeLogo, awayLogo) {
  return html``;
}
