import { Component } from 'react';

const CRASH_KEY = 'cc-crash-log';
const SAVE_KEY = 'castle_clicker_v9';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    try {
      const payload = {
        message: error?.message || String(error),
        stack: error?.stack || '',
        componentStack: info?.componentStack || '',
        ts: new Date().toISOString(),
        ua: navigator.userAgent,
      };
      localStorage.setItem(CRASH_KEY, JSON.stringify(payload));
    } catch {}
  }

  handleReload = () => {
    window.location.reload();
  };

  handleCopyLog = async () => {
    try {
      const log = localStorage.getItem(CRASH_KEY) || '';
      await navigator.clipboard.writeText(log);
    } catch {}
  };

  render() {
    if (!this.state.error) return this.props.children;

    const hasSave = (() => {
      try { return !!localStorage.getItem(SAVE_KEY); } catch { return false; }
    })();

    return (
      <div style={styles.wrap}>
        <div style={styles.card}>
          <div style={styles.title}>Something went wrong</div>
          <div style={styles.sub}>
            The game hit an unexpected error. {hasSave ? 'Your save is still on your device.' : ''}
          </div>
          <div style={styles.msg}>{this.state.error?.message || 'Unknown error'}</div>
          <div style={styles.btnRow}>
            <button style={styles.primaryBtn} onClick={this.handleReload}>Reload Game</button>
            <button style={styles.secondaryBtn} onClick={this.handleCopyLog}>Copy Error Log</button>
          </div>
          <div style={styles.hint}>
            If this keeps happening, the crash log is saved under localStorage key <code>{CRASH_KEY}</code>.
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrap: {
    position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#1a1b26', color: '#e5e7eb', fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '24px',
  },
  card: {
    maxWidth: 420, width: '100%', background: '#2a1a10', border: '2px solid #fbbf24',
    borderRadius: 12, padding: '24px 20px', textAlign: 'center',
    boxShadow: '0 8px 40px rgba(0,0,0,.6)',
  },
  title: { fontSize: 20, fontWeight: 900, color: '#fbbf24', marginBottom: 8 },
  sub: { fontSize: 13, color: '#cbd5e1', marginBottom: 14, lineHeight: 1.5 },
  msg: {
    fontSize: 11, fontFamily: 'monospace', color: '#f87171',
    background: 'rgba(0,0,0,.4)', padding: '8px 10px', borderRadius: 6,
    marginBottom: 16, wordBreak: 'break-word', maxHeight: 80, overflow: 'auto',
  },
  btnRow: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 },
  primaryBtn: {
    fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8,
    border: '1px solid #fbbf24', background: '#fbbf24', color: '#1a1500', cursor: 'pointer',
  },
  secondaryBtn: {
    fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8,
    border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', cursor: 'pointer',
  },
  hint: { fontSize: 10, color: '#64748b', marginTop: 8 },
};
