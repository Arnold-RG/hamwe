import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GisubizoChat } from './GisubizoChat'

export function GisubizoDock() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      fabRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (location.pathname === '/gisubizo') return null

  return (
    <div className={`giso-dock ${open ? 'is-open' : ''}`}>
      {open ? (
        <div id="gisubizo-panel" className="giso-panel" role="dialog" aria-modal="true" aria-label="Gisubizo">
          <header className="giso-panel-head">
            <span className="giso-avatar" aria-hidden="true">
              G
            </span>
            <div>
              <strong>Gisubizo</strong>
              <p>English desk · live</p>
            </div>
            <div className="giso-panel-actions">
              <Link to="/gisubizo">Open page</Link>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close Gisubizo">
                ×
              </button>
            </div>
          </header>
          <GisubizoChat compact />
        </div>
      ) : null}
      <button
        ref={fabRef}
        className="giso-fab"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? 'gisubizo-panel' : undefined}
        aria-label={open ? 'Close Gisubizo' : 'Open Gisubizo'}
      >
        <em>{open ? '×' : 'G'}</em>
        <span>{open ? 'Close' : 'Gisubizo'}</span>
      </button>
    </div>
  )
}
