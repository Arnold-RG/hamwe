type SeatMeterProps = {
  taken: number
  total: number
  unit?: 'seat' | 'spot'
}

export function SeatMeter({ taken, total, unit = 'seat' }: SeatMeterProps) {
  const open = Math.max(0, total - taken)
  const claimed = total ? Math.min(100, (taken / total) * 100) : 0
  const scarce = open <= 4
  const label = unit === 'spot' ? (open === 1 ? 'spot' : 'spots') : open === 1 ? 'seat' : 'seats'

  return (
    <div className={`seat-meter ${scarce ? 'is-scarce' : ''}`}>
      <div
        className="seat-meter-track"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={taken}
        aria-label={`${taken} of ${total} ${unit}s claimed`}
      >
        <span style={{ width: `${claimed}%` }} />
      </div>
      <p>
        <b>{open}</b> {label} open
        <span>
          {taken}/{total} claimed
        </span>
      </p>
    </div>
  )
}
