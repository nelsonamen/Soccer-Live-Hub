import { html, css } from 'lit';

/**
 * Shared header component matching the Standings & Team card design contract.
 * Renders a 100% unified top banner with gradient background, competition logo icon,
 * title, subtitle, status badge, and league logo watermark on the right.
 *
 * @param {string|null} logo         - URL of logo shown in comp-icon & watermark
 * @param {string}      title        - Main title text (competition name, team name, …)
 * @param {string}      subtitle     - Optional subtitle text (e.g. "Classificação · 2026-27")
 * @param {TemplateResult|null} badge - Optional right-side badge (use renderSoccerBadge)
 * @param {string}      fallbackIcon - Emoji shown when logo is absent (default '⚽')
 */
export const renderSoccerHeader = ({ logo, title, subtitle = '', badge = null, fallbackIcon = '⚽' }) => {
  const validLogo = logo && logo !== 'N/A' ? logo : null;
  return html`
  <div class="top-bar">
    ${validLogo ? html`<img class="top-bar-watermark" src="${validLogo}" alt="" loading="lazy">` : ''}
    <div class="competition">
      <span class="comp-icon">
        ${validLogo ? html`
          <img src="${validLogo}" alt=""
            @error=${e => { e.target.style.display = 'none'; e.target.nextElementSibling && (e.target.nextElementSibling.style.display = ''); }}>
          <span style="display:none">${fallbackIcon}</span>
        ` : fallbackIcon}
      </span>
      <div class="comp-text">
        <span class="comp-name">${title || ' '}</span>
        ${subtitle ? html`<span class="comp-sub">${subtitle}</span>` : ''}
      </div>
    </div>
    ${badge || ''}
  </div>
`;
};

export const renderSoccerBadge = (text, variant = 'date') => html`
  <span class="sh-badge ${variant}">${text}</span>
`;

export const soccerHeaderStyles = css`
  .top-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px 16px;
    min-height: 68px;
    box-sizing: border-box;
    background: linear-gradient(135deg, rgba(var(--cl-accent-rgb, 2, 132, 199), 0.14), rgba(var(--cl-accent-2-rgb, 236, 72, 153), 0.08) 60%, transparent);
    border-bottom: 1px solid var(--cl-divider, rgba(0,0,0,0.08));
    overflow: hidden;
  }
  .top-bar-watermark {
    position: absolute;
    right: -12px;
    top: -12px;
    width: 95px;
    height: 95px;
    object-fit: contain;
    opacity: 0.12;
    pointer-events: none;
    transform: rotate(10deg);
  }
  .competition {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 800;
    color: var(--cl-text);
    letter-spacing: -0.01em;
    min-width: 0;
    position: relative;
    z-index: 1;
  }
  .comp-icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--cl-surface, #f8fafc);
    border: 1px solid var(--cl-divider, rgba(0,0,0,0.08));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    overflow: hidden;
  }
  .comp-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .comp-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .comp-name {
    font-size: 16px;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--cl-text);
  }
  .comp-sub {
    font-size: 11px;
    font-weight: 600;
    color: var(--cl-text-2, #94a3b8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sh-badge {
    flex-shrink: 0;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    position: relative;
    z-index: 1;
  }
  .sh-badge.live    { background: #e53935; color: #fff; }
  .sh-badge.ft      { background: var(--cl-green, #10b981); color: #fff; text-transform: uppercase; }
  .sh-badge.finished { background: var(--cl-green, #10b981); color: #fff; text-transform: uppercase; }
  .sh-badge.date    { background: var(--cl-surface, rgba(0,0,0,0.05)); border: 1px solid var(--cl-divider, rgba(0,0,0,0.1)); color: var(--cl-text, #0f172a); }
  .sh-badge.neutral { background: var(--cl-surface, rgba(0,0,0,0.05)); color: var(--cl-text-2, #64748b); }
`;
