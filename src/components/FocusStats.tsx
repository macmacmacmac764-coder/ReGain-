interface Props {
  totalSessions: number
  totalFocusMinutes: number
  totalBlocks: number
}

export default function FocusStats({ totalSessions, totalFocusMinutes, totalBlocks }: Props) {
  const hours = Math.floor(totalFocusMinutes / 60)
  const mins = totalFocusMinutes % 60
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`

  return (
    <section className="stats-card">
      <h2 className="section-title">Your Progress</h2>
      <div className="stats-grid">
        <div className="stat">
          <span className="stat-value">{totalSessions}</span>
          <span className="stat-label">Sessions</span>
        </div>
        <div className="stat">
          <span className="stat-value">{timeStr}</span>
          <span className="stat-label">Focus Time</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalBlocks}</span>
          <span className="stat-label">Blocked</span>
        </div>
      </div>
    </section>
  )
}
