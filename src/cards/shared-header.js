import { html, css } from 'lit';

/**
 * Shared header component matching the Team card design contract.
 *
 * @param {string|null} logo     - URL of logo shown in the comp-icon wrapper
 * @param {string}      title    - Main title text (competition name, team name, …)
 * @param {TemplateResult|null} badge - Optional right-side badge (use renderSoccerBadge)
 * @param {string}      fallbackIcon - Emoji shown when logo is absent (default '⚽')
 */
export const renderSoccerHeader = ({ logo, title, badge = null, fallbackIcon = '⚽' }) => {
  const validLogo = logo && logo !== 'N/A' ? logo : null;
  return html`
  <div class="top-bar">
    <div class="competition">
      <span class="comp-icon">
        ${validLogo ? html`
          <img src="${validLogo}" alt=""
            @error=${e => { e.target.style.display = 'none'; e.target.nextElementSibling && (e.target.nextElementSibling.style.display = ''); }}>
          <span style="display:none">${fallbackIcon}</span>
        ` : fallbackIcon}
      </span>
      <span class="comp-name">${title || ' '}</span>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: transparent;
    border-bottom: 1px solid var(--cl-divider, rgba(0,0,0,0.08));
  }
  .competition {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 700;
    color: var(--cl-text);
    letter-spacing: -0.01em;
    min-width: 0;
  }
  .comp-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    background: var(--cl-surface, #f8fafc);
    border: 1px solid var(--cl-divider, rgba(0,0,0,0.08));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    overflow: hidden;
  }
  .comp-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .comp-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sh-badge {
    flex-shrink: 0;
    padding: 5px 11px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
  }
  .sh-badge.live    { background: #e53935; color: #fff; }
  .sh-badge.ft      { background: var(--cl-surface, rgba(0,0,0,0.05)); border: 1px solid var(--cl-divider, rgba(0,0,0,0.1)); color: var(--cl-text, #0f172a); }
  .sh-badge.date    { background: var(--cl-surface, rgba(0,0,0,0.05)); border: 1px solid var(--cl-divider, rgba(0,0,0,0.1)); color: var(--cl-text, #0f172a); }
  .sh-badge.neutral { background: var(--cl-surface, rgba(0,0,0,0.05)); color: var(--cl-text-2, #64748b); }
`;
