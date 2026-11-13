import { OFFICE_HOURS } from '../lib/hours'
import { useDeskStatus } from '../hooks/useDeskStatus'

export function DeskHours({ compact = false }: { compact?: boolean }) {
  const desk = useDeskStatus()

  return (
    <div className={`desk-hours is-${desk.state}`}>
      <p className="desk-hours-status">
        <span className="live-pip" />
        {desk.weAre}
      </p>
      {compact ? (
        <p>{OFFICE_HOURS.label}</p>
      ) : (
        <>
          <p>
            <strong>Every day</strong> {OFFICE_HOURS.label}
          </p>
          <p className="tiny">{desk.nextLine}</p>
        </>
      )}
    </div>
  )
}
