interface Props {
  active: boolean
  elapsed: number
  blockCount: number
  onStart: () => void
  onStop: () => void
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

export default function FocusShield({ active, elapsed, blockCount, onStart, onStop }: Props) {
  return (
    <section className={`shield-card ${active ? 'shield-card--active' : ''}`}>
      <div className="shield-icon-wrap">
        <svg viewBox="0 0 100 100" width="72" height="72" className={`shield-svg ${active ? 'shield-svg--on' : ''}`}>
          <path
            d="M50 14 L78 28 V56 Q78 80 50 90 Q22 80 22 56 V28 Z"
            fill={active ? 'rgba(16,185,129,0.12)' : 'none'}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M38 50 L46 58 L64 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="shield-status">
        <p className="shield-status-label">{active ? 'Focus Shield Active' : 'Focus Shield Ready'}</p>
        <p className="shield-timer">{active ? formatTime(elapsed) : '00:00'}</p>
      </div>

      <p className="shield-block-info">
        {active
          ? `Blocking ${blockCount} distraction${blockCount === 1 ? '' : 's'} at the network level`
          : `${blockCount} site${blockCount === 1 ? '' : 's'} will be blocked when you start`}
      </p>

      <button
        className={`shield-btn ${active ? 'shield-btn--stop' : 'shield-btn--start'}`}
        onClick={active ? onStop : onStart}
      >
        {active ? 'Stop Focus Session' : 'Start Focus Session'}
      </button>
    </section>
  )
}
