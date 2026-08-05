import { useState } from 'react'
import type { BlockedSite } from '../types'

interface Props {
  sites: BlockedSite[]
  shieldActive: boolean
  onToggle: (id: string) => void
  onAdd: (url: string, label: string) => void
  onRemove: (id: string) => void
}

export default function BlockedSites({ sites, shieldActive, onToggle, onAdd, onRemove }: Props) {
  const [showAdd, setShowAdd] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const handleAdd = () => {
    const url = newUrl.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (!url) return
    onAdd(url, newLabel.trim())
    setNewUrl('')
    setNewLabel('')
    setShowAdd(false)
  }

  return (
    <section className="sites-card">
      <div className="sites-header">
        <h2 className="section-title">Blocked Sites</h2>
        <button className="add-btn" onClick={() => setShowAdd(!showAdd)} disabled={shieldActive}>
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAdd && (
        <div className="add-form">
          <input
            type="text"
            placeholder="e.g. netflix.com"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="add-input"
            autoFocus
          />
          <input
            type="text"
            placeholder="Label (optional)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="add-input"
          />
          <button className="add-confirm-btn" onClick={handleAdd}>
            Add Site
          </button>
        </div>
      )}

      {shieldActive && (
        <p className="sites-locked-note">Sites are locked while a focus session is active.</p>
      )}

      <ul className="sites-list">
        {sites.map((site) => (
          <li key={site.id} className="site-item">
            <div className="site-info">
              <span className="site-label">{site.label}</span>
              <span className="site-url">{site.url}</span>
            </div>
            <div className="site-actions">
              {!site.enabled && <span className="site-off">Off</span>}
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={site.enabled}
                  onChange={() => onToggle(site.id)}
                  disabled={shieldActive}
                />
                <span className="toggle-slider"></span>
              </label>
              <button
                className="site-remove"
                onClick={() => onRemove(site.id)}
                disabled={shieldActive}
                aria-label={`Remove ${site.label}`}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
