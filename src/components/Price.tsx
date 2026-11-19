import { money, moneyUsd } from '../lib/format'

export function Price({ usd, size = 'm' }: { usd: number; size?: 's' | 'm' | 'l' }) {
  return (
    <span className={`price-pair size-${size}`}>
      <b>{money(usd)}</b>
      <i>{moneyUsd(usd)}</i>
    </span>
  )
}
