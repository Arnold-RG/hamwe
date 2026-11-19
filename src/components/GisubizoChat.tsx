import { type FormEvent, useRef, useState } from 'react'
import { QA_BANK, shufflePrompts } from '../gisubizo/qa'
import { askGisubizo } from '../gisubizo/engine'

interface Line {
  id: string
  role: 'user' | 'gisubizo'
  text: string
  followups?: string[]
}

export function GisubizoChat({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState<Line[]>([
    {
      id: 'open',
      role: 'gisubizo',
      text: 'Hello. I am Gisubizo, Hamwe’s Rwanda desk. I answer in English only. Tap a question or type your own.',
      followups: shufflePrompts(compact ? 3 : 5),
    },
  ])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const linesRef = useRef(lines)
  linesRef.current = lines

  const ask = (question: string) => {
    const text = question.trim()
    if (!text || busy) return
    setDraft('')
    setBusy(true)
    const prior = linesRef.current
    setLines((current) => [...current, { id: `u-${Date.now()}`, role: 'user', text }])

    window.setTimeout(() => {
      const history = prior.map((line) => ({ role: line.role, text: line.text }))
      const reply = askGisubizo(text, history)
      setLines((current) => [
        ...current,
        { id: `g-${Date.now()}`, role: 'gisubizo', text: reply.text, followups: reply.followups },
      ])
      setBusy(false)
      window.requestAnimationFrame(() => {
        scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
      })
    }, 280)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    ask(draft)
  }

  return (
    <div className={`giso-chat ${compact ? 'is-compact' : ''}`}>
      <div className="giso-thread" ref={scroller}>
        {lines.map((line) => (
          <article key={line.id} className={`giso-line is-${line.role}`}>
            {line.role === 'gisubizo' ? (
              <span className="giso-avatar" aria-hidden="true">
                G
              </span>
            ) : null}
            <div className="giso-bubble">
              {line.role === 'gisubizo' ? <p className="giso-who">Gisubizo</p> : null}
              <p>{line.text}</p>
              {line.followups?.length ? (
                <div className="giso-chips">
                  {line.followups.map((chip) => (
                    <button key={chip} type="button" onClick={() => ask(chip)}>
                      {chip}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
        {busy ? (
          <article className="giso-line is-gisubizo is-typing">
            <span className="giso-avatar" aria-hidden="true">
              G
            </span>
            <div className="giso-bubble">
              <p className="giso-who">Gisubizo</p>
              <p className="giso-dots" aria-label="Gisubizo is writing">
                <i />
                <i />
                <i />
              </p>
            </div>
          </article>
        ) : null}
      </div>

      <form className="giso-form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor={compact ? 'giso-dock-q' : 'giso-page-q'}>
          Ask Gisubizo
        </label>
        <input
          id={compact ? 'giso-dock-q' : 'giso-page-q'}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about Rwanda or Hamwe"
          autoComplete="off"
        />
        <button className="giso-send" type="submit" disabled={busy || !draft.trim()}>
          Send
        </button>
      </form>

      {!compact ? (
        <details className="giso-bank">
          <summary>
            Browse questions <span>{QA_BANK.length}</span>
          </summary>
          <div className="giso-chips giso-bank-chips">
            {QA_BANK.map((item) => (
              <button key={item.q} type="button" onClick={() => ask(item.q)}>
                {item.q}
              </button>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  )
}
