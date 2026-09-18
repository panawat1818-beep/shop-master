:root {
  --bg: #0f172a;
  --panel: #111827;
  --panel-soft: #1f2937;
  --card: #ffffff;
  --card-alt: #f8fafc;
  --primary: #ff7a00;
  --primary-soft: rgba(255, 122, 0, 0.12);
  --accent: #ff9d3f;
  --text: #e5e7eb;
  --text-soft: #9ca3af;
  --border: rgba(255, 255, 255, 0.08);
  --green: #10b981;
  --blue: #2563eb;
  --dark: #0b1220;
  --shadow: 0 16px 32px rgba(15, 23, 42, 0.25);
}

* {
  box-sizing: border-box;
}

html {
  color-scheme: dark;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button {
  font: inherit;
}

.app-shell {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px 16px 40px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0 20px;
}

.eyebrow {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--text-soft);
  font-weight: 700;
}

.ghost-button {
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  width: 42px;
  height: 42px;
  color: var(--text);
}

.dashboard {
  display: grid;
  gap: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 96px;
  justify-content: center;
}

.stat-card.accent {
  background: linear-gradient(135deg, rgba(255, 122, 0, 0.24), rgba(255, 157, 63, 0.12));
  border-color: rgba(255, 122, 0, 0.25);
}

.label {
  color: var(--text-soft);
  font-size: 0.78rem;
}

.stat-card strong {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.1;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.action-btn {
  min-height: 54px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  font-weight: 600;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.action-btn:active {
  transform: translateY(1px) scale(0.99);
}

.action-btn.primary {
  background: linear-gradient(135deg, var(--primary), #ff9d3f);
  border-color: rgba(255, 122, 0, 0.6);
  color: #fff;
  box-shadow: var(--shadow);
}

.store-list,
.insight-panel {
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

.store-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
}

.store-row:last-child {
  border-bottom: none;
}

.store-name-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.store-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.store-dot.shopee { background: #ff6b2c; }
.store-dot.lazada { background: #1d64ff; }
.store-dot.tiktok { background: #1f2937; }

.status-tag {
  color: var(--text-soft);
  font-size: 0.76rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 10px;
}

.insight-panel {
  padding: 18px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.05rem;
}

.panel-header span {
  color: var(--text-soft);
  font-size: 0.8rem;
}

.summary-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.summary-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
}

.summary-list span {
  color: var(--text-soft);
}

.summary-list strong {
  font-size: 1rem;
}

@media (min-width: 640px) {
  .app-shell {
    max-width: 820px;
    padding-top: 40px;
  }

  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
