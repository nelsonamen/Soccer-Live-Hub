import { html, css } from 'lit';

/**
 * Shared header component matching the Team card design contract (without icons).
 *
 * @param {string}      title    - Main title text (competition name, team name, …)
 * @param {TemplateResult|null} badge - Optional right-side badge (use renderSoccerBadge)
 */
export const renderSoccerHeader = ({ title, badge = null }) => {
  return html`
  <div class="top-bar">
    <div class="competition">
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
