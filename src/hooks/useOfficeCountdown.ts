import { useEffect, useState } from 'react'
import { getOfficeCountdown } from '../lib/hours'

export function useOfficeCountdown() {
  const [value, setValue] = useState(() => getOfficeCountdown())

  useEffect(() => {
    const tick = () => setValue(getOfficeCountdown())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return value
}
