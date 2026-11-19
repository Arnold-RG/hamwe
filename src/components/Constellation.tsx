import { useEffect, useState } from 'react'
import { useDeskStatus } from '../hooks/useDeskStatus'
import { asset } from '../lib/asset'
import { OFFICE_HOURS } from '../lib/hours'

const STOPS = [
  { name: 'Kigali', src: asset('/images/kigali.jpg') },
  { name: 'Volcanoes', src: asset('/images/gorilla-volcanoes.jpg') },
  { name: 'Kivu', src: asset('/images/lake-kivu.jpg') },
  { name: 'Nyungwe', src: asset('/images/nyungwe.jpg') },
  { name: 'Akagera', src: asset('/images/akagera.jpg') },
]

export function Constellation({ compact = false }: { compact?: boolean }) {
  const desk = useDeskStatus()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % STOPS.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [])

  const here = STOPS[index] ?? STOPS[0]
  const progress = STOPS.length > 1 ? index / (STOPS.length - 1) : 0

  return (
    <figure className={`live-route ${compact ? 'is-compact' : ''} ${desk.open ? 'is-desk-open' : 'is-desk-shut'}`}>
      <div className="live-route-stage">
        {STOPS.map((stop, stopIndex) => (
          <img
            key={stop.name}
            className={stopIndex === index ? 'is-now' : ''}
            src={stop.src}
            alt=""
          />
        ))}
        <div className="live-route-veil" aria-hidden="true" />
        <p className="live-route-where">{here.name}</p>
        <div className="live-route-track" aria-hidden="true">
          <span className="live-route-line" />
          <span className="live-route-mark" style={{ left: `${progress * 100}%` }} />
        </div>
      </div>
      <figcaption className="live-route-meta">
        <div>
          <span>On the ground</span>
          <strong>Hosted circles</strong>
        </div>
        <div>
          <span>Kigali desk</span>
          <strong>{desk.open ? 'Open' : 'Closed'} · {OFFICE_HOURS.label}</strong>
        </div>
      </figcaption>
    </figure>
  )
}
