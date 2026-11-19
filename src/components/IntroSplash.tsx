import { useEffect, useState } from 'react'

const HOLD_MS = 1100
const EXIT_MS = 520

export function IntroSplash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.classList.add('intro-lock')
    document.getElementById('boot-intro')?.remove()

    const leaveAt = window.setTimeout(() => setLeaving(true), HOLD_MS)
    const doneAt = window.setTimeout(() => {
      document.body.classList.remove('intro-lock')
      onDone()
    }, HOLD_MS + EXIT_MS)

    return () => {
      window.clearTimeout(leaveAt)
      window.clearTimeout(doneAt)
      document.body.classList.remove('intro-lock')
    }
  }, [onDone])

  const skip = () => {
    document.body.classList.remove('intro-lock')
    document.getElementById('boot-intro')?.remove()
    onDone()
  }

  return (
    <div className={`intro-splash ${leaving ? 'is-leaving' : ''}`}>
      <div className="intro-glow" aria-hidden="true" />
      <img
        className="intro-logo"
        src={`${import.meta.env.BASE_URL}brand/hamwe-logo-lockup.png?v=tourism`}
        alt="Hamwe Tourism"
        width={1246}
        height={408}
      />
      <span className="intro-line" aria-hidden="true" />
      <button className="intro-skip" type="button" onClick={skip}>
        Enter site
      </button>
    </div>
  )
}
