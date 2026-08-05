import { useState, useEffect, useCallback } from 'react'
import { Preferences } from '@capacitor/preferences'
import FocusShield from './components/FocusShield'
import BlockedSites from './components/BlockedSites'
import FocusStats from './components/FocusStats'
import type { FocusSession, BlockedSite } from './types'
import './App.css'

const SESSIONS_KEY = 'regain_sessions'
const SITES_KEY = 'regain_sites'
const DEFAULT_SITES: BlockedSite[] = [
  { id: 's1', url: 'youtube.com', label: 'YouTube', enabled: true },
  { id: 's2', url: 'reddit.com', label: 'Reddit', enabled: true },
  { id: 's3', url: 'twitter.com', label: 'Twitter / X', enabled: true },
  { id: 's4', url: 'instagram.com', label: 'Instagram', enabled: true },
  { id: 's5', url: 'tiktok.com', label: 'TikTok', enabled: true },
  { id: 's6', url: 'facebook.com', label: 'Facebook', enabled: false },
]

export default function App() {
  const [shieldActive, setShieldActive] = useState(false)
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [sites, setSites] = useState<BlockedSite[]>(DEFAULT_SITES)
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    void loadData()
  }, [])

  const loadData = async () => {
    try {
      const { value: sessionsVal } = await Preferences.get({ key: SESSIONS_KEY })
      if (sessionsVal) setSessions(JSON.parse(sessionsVal))
      const { value: sitesVal } = await Preferences.get({ key: SITES_KEY })
      if (sitesVal) setSites(JSON.parse(sitesVal))
    } catch {
      // defaults are fine
    }
  }

  const persistSites = async (next: BlockedSite[]) => {
    setSites(next)
    await Preferences.set({ key: SITES_KEY, value: JSON.stringify(next) })
  }

  const persistSessions = async (next: FocusSession[]) => {
    setSessions(next)
    await Preferences.set({ key: SESSIONS_KEY, value: JSON.stringify(next) })
  }

  useEffect(() => {
    if (!shieldActive || !currentSession) return
    const interval = setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [shieldActive, currentSession])

  const startShield = useCallback(async () => {
    const session: FocusSession = {
      id: `sess_${Date.now()}`,
      startedAt: Date.now(),
      duration: 0,
      sitesBlocked: sites.filter((s) => s.enabled).length,
      completed: false,
    }
    setCurrentSession(session)
    setElapsed(0)
    setShieldActive(true)
  }, [sites])

  const stopShield = useCallback(async () => {
    if (!currentSession) return
    const completed: FocusSession = {
      ...currentSession,
      duration: elapsed,
      completed: true,
      endedAt: Date.now(),
    }
    const next = [completed, ...sessions].slice(0, 50)
    await persistSessions(next)
    setCurrentSession(null)
    setShieldActive(false)
    setElapsed(0)
  }, [currentSession, elapsed, sessions])

  const toggleSite = (id: string) => {
    const next = sites.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    void persistSites(next)
  }

  const addSite = (url: string, label: string) => {
    const next = [...sites, { id: `s${Date.now()}`, url: url.toLowerCase(), label: label || url, enabled: true }]
    void persistSites(next)
  }

  const removeSite = (id: string) => {
    void persistSites(sites.filter((s) => s.id !== id))
  }

  const totalFocusMinutes = sessions.reduce((sum, s) => sum + Math.round(s.duration / 60), 0)
  const activeBlockCount = sites.filter((s) => s.enabled).length

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-row">
          <div className="logo-mark">
            <svg viewBox="0 0 100 100" width="36" height="36">
              <path d="M50 18 L72 30 V54 Q72 74 50 84 Q28 74 28 54 V30 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
              <path d="M40 50 L47 57 L62 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1>ReGain</h1>
            <p className="tagline">Focus Shield</p>
          </div>
        </div>
        <p className="subtitle">Reclaim your attention. Block distractions at the system level.</p>
      </header>

      <main className="app-main">
        <FocusShield
          active={shieldActive}
          elapsed={elapsed}
          blockCount={activeBlockCount}
          onStart={startShield}
          onStop={stopShield}
        />

        <FocusStats
          totalSessions={sessions.length}
          totalFocusMinutes={totalFocusMinutes}
          totalBlocks={activeBlockCount}
        />

        <BlockedSites
          sites={sites}
          shieldActive={shieldActive}
          onToggle={toggleSite}
          onAdd={addSite}
          onRemove={removeSite}
        />
      </main>

      <footer className="app-footer">
        <p>ReGain uses Android VpnService to block distracting apps and sites at the network level.</p>
      </footer>
    </div>
  )
}
