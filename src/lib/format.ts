export const USD_TO_RWF = 1450
export const TICKET_MIN_RWF = 8000
export const DAY_TICKET_MAX_RWF = 20000
export const TICKET_MAX_RWF = 80000
export const LUXURY_PACKAGE_RWF = 80000

export function toRwf(usd: number): number {
  return Math.round(usd * USD_TO_RWF)
}

export function fromRwf(rwf: number): number {
  return rwf / USD_TO_RWF
}

export function fareFromRwf(rwf: number): number {
  if (rwf < TICKET_MIN_RWF || rwf > TICKET_MAX_RWF) {
    throw new Error(`Fares must be FRw ${TICKET_MIN_RWF}–${TICKET_MAX_RWF}`)
  }
  return fromRwf(rwf)
}

export function ticketFromRwf(rwf: number): number {
  if (rwf < TICKET_MIN_RWF || rwf > DAY_TICKET_MAX_RWF) {
    throw new Error(`Day tickets must be FRw ${TICKET_MIN_RWF}–${DAY_TICKET_MAX_RWF}`)
  }
  return fromRwf(rwf)
}

export function money(usd: number): string {
  return moneyRwf(toRwf(usd))
}

export function moneyRwf(amount: number): string {
  return `FRw ${new Intl.NumberFormat('en-RW', { maximumFractionDigits: 0 }).format(amount)}`
}

export function moneyUsd(usd: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usd)
}

export function longDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00`))
}

export function compactDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${iso}T12:00:00`))
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function ticketCode(id: string): string {
  return id.replace('HMW-', 'HMW · ')
}

export function makeTicketId(): string {
  const seed = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `HMW-${seed}`
}

export function luhnLikeValid(digits: string): boolean {
  return digits.length >= 13 && digits.length <= 19 && /^\d+$/.test(digits)
}

export function expiryValid(value: string): boolean {
  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(value.trim())
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  const end = new Date(year, month, 0)
  return end >= new Date(now.getFullYear(), now.getMonth(), 1)
}

export function rwandaPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('250')) return /^2507[2389]\d{7}$/.test(digits)
  return /^07[2389]\d{7}$/.test(digits)
}

export function paymentLabel(method: string | undefined): string {
  if (method === 'momo') return 'MTN MoMo'
  if (method === 'qr') return 'MoMo QR'
  if (method === 'paypal') return 'PayPal'
  return 'Visa / Mastercard'
}
