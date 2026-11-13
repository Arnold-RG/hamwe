import { useEffect, useState } from 'react'
import { getDeskStatus } from '../lib/hours'

export function useDeskStatus() {
  const [status, setStatus] = useState(() => getDeskStatus())

  useEffect(() => {
    const tick = () => setStatus(getDeskStatus())
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return status
}
