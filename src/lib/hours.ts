export const OFFICE_HOURS = {
  zone: 'Africa/Kigali',
  days: 'Every day',
  open: '08:00',
  close: '18:00',
  lunchStart: '12:00',
  lunchEnd: '13:30',
  closed: 'after 18:00 CAT',
  label: '08:00 - 12:00 ¦ 13:30 - 18:00',
} as const

export const OFFICE_ADDRESS = {
  building: 'Ikaze House',
  street: 'KG 11 Ave',
  area: 'Kisimenti',
  city: 'Kigali, Rwanda',
  line: 'Ikaze House, KG 11 Ave, Kisimenti',
  full: 'Ikaze House, KG 11 Ave, Kisimenti, Kigali',
} as const

export const OFFICE_PHONE = {
  display: '+250 794 607 518',
  tel: '+250794607518',
  local: '0794 607 518',
} as const

/** Kigali keeps Central Africa Time, UTC+2, with no daylight saving. */
const CAT_OFFSET_MS = 2 * 60 * 60 * 1000
const OPEN_SEC = 8 * 3600
const LUNCH_START_SEC = 12 * 3600
const LUNCH_END_SEC = 13 * 3600 + 30 * 60
const CLOSE_SEC = 18 * 3600
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

interface CatWall {
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  second: number
  nowSec: number
}

function catWall(now: Date): CatWall {
  const shifted = new Date(now.getTime() + CAT_OFFSET_MS)
  const hour = shifted.getUTCHours()
  const minute = shifted.getUTCMinutes()
  const second = shifted.getUTCSeconds()

  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
    hour,
    minute,
    second,
    nowSec: hour * 3600 + minute * 60 + second,
  }
}

function catInstantMs(year: number, month: number, day: number, hour = 0, minute = 0, second = 0): number {
  return Date.UTC(year, month - 1, day, hour, minute, second) - CAT_OFFSET_MS
}

function addDays(year: number, month: number, day: number, days: number) {
  const next = new Date(Date.UTC(year, month - 1, day) + days * 86_400_000)
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
    weekday: next.getUTCDay(),
  }
}

export type OfficeState = 'open' | 'lunch' | 'closed'

export interface OfficeCountdown {
  open: boolean
  lunch: boolean
  state: OfficeState
  weAre: string
  hours: number
  minutes: number
  seconds: number
  remainingSec: number
  headline: string
  targetLabel: string
  clock: string
  hoursLabel: string
}

function weAreLabel(state: OfficeState): string {
  if (state === 'open') return 'We are open'
  if (state === 'lunch') return 'We are on lunch'
  return 'We are closed'
}

function officeState(nowSec: number): OfficeState {
  if (nowSec < OPEN_SEC || nowSec >= CLOSE_SEC) return 'closed'
  if (nowSec >= LUNCH_START_SEC && nowSec < LUNCH_END_SEC) return 'lunch'
  return 'open'
}

export function getOfficeCountdown(now = new Date()): OfficeCountdown {
  const wall = catWall(now)
  const state = officeState(wall.nowSec)
  const open = state === 'open'
  const lunch = state === 'lunch'

  let target = { year: wall.year, month: wall.month, day: wall.day, hour: 8, minute: 0, second: 0 }
  let headline = 'Opens in'
  let targetLabel = 'Today 08:00 CAT'

  if (open && wall.nowSec < LUNCH_START_SEC) {
    target = { ...target, hour: 12, minute: 0 }
    headline = 'Closes in'
    targetLabel = 'Lunch 12:00 CAT'
  } else if (open) {
    target = { ...target, hour: 18, minute: 0 }
    headline = 'Closes in'
    targetLabel = 'Today 18:00 CAT'
  } else if (lunch) {
    target = { ...target, hour: 13, minute: 30 }
    headline = 'Opens in'
    targetLabel = 'Today 13:30 CAT'
  } else if (wall.nowSec < OPEN_SEC) {
    target = { ...target, hour: 8, minute: 0 }
    headline = 'Opens in'
    targetLabel = 'Today 08:00 CAT'
  } else {
    const tomorrow = addDays(wall.year, wall.month, wall.day, 1)
    target = { ...tomorrow, hour: 8, minute: 0, second: 0 }
    headline = 'Opens in'
    targetLabel = 'Tomorrow 08:00 CAT'
  }

  const remainingMs = Math.max(0, catInstantMs(target.year, target.month, target.day, target.hour, target.minute, target.second) - now.getTime())
  const remaining = Math.floor(remainingMs / 1000)
  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  return {
    open,
    lunch,
    state,
    weAre: weAreLabel(state),
    hours,
    minutes,
    seconds,
    remainingSec: remaining,
    headline,
    targetLabel,
    clock: `${DAY_NAMES[wall.weekday]} · ${pad(wall.hour)}:${pad(wall.minute)}:${pad(wall.second)} CAT`,
    hoursLabel: OFFICE_HOURS.label,
  }
}

export function getDeskStatus(now = new Date()) {
  const countdown = getOfficeCountdown(now)

  return {
    open: countdown.open,
    lunch: countdown.lunch,
    state: countdown.state,
    weAre: countdown.weAre,
    hoursLabel: countdown.hoursLabel,
    nextLine: `${countdown.headline} ${countdown.targetLabel}`,
    closedWeekends: false,
  }
}
