import { Link } from 'react-router-dom'
import { useOfficeCountdown } from '../hooks/useOfficeCountdown'

function Cell({ value, unit }: { value: number; unit: string }) {
  return (
    <li>
      <b>{String(value).padStart(2, '0')}</b>
      <span>{unit}</span>
    </li>
  )
}

export function OfficeCountdown() {
  const desk = useOfficeCountdown()
  const summary = `${desk.weAre}. ${desk.headline} ${desk.hours} hours, ${desk.minutes} minutes. ${desk.targetLabel}.`

  return (
    <aside
      className={`office-clock is-${desk.state}`}
      aria-label={summary}
    >
      <div className="office-clock-inner">
        <p className="office-clock-state">
          <span className="live-pip" aria-hidden="true" />
          <strong>{desk.weAre}</strong>
          <span>Kigali · {desk.clock}</span>
        </p>

        <div className="office-clock-count">
          <p className="office-clock-label">{desk.headline}</p>
          <ol>
            <Cell value={desk.hours} unit={desk.hours === 1 ? 'hour' : 'hours'} />
            <Cell value={desk.minutes} unit="min" />
            <Cell value={desk.seconds} unit="sec" />
          </ol>
        </div>

        <p className="office-clock-meta">
          <span>{desk.targetLabel}</span>
          <span>{desk.hoursLabel}</span>
          <Link to="/contact">Ikaze House</Link>
        </p>
      </div>
    </aside>
  )
}
