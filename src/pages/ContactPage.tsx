import { type FormEvent, useState } from 'react'
import { DeskHours } from '../components/DeskHours'
import { OFFICE_ADDRESS, OFFICE_PHONE } from '../lib/hours'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [travelWindow, setTravelWindow] = useState('')
  const [party, setParty] = useState('2')
  const [interest, setInterest] = useState('hosted-tour')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const payload = {
      name,
      email,
      window: travelWindow,
      party,
      interest,
      message,
      at: new Date().toISOString(),
    }
    let current: unknown[] = []
    try {
      const stored = JSON.parse(localStorage.getItem('hamwe-mail') ?? '[]') as unknown
      if (Array.isArray(stored)) current = stored
    } catch {
      current = []
    }
    try {
      localStorage.setItem('hamwe-mail', JSON.stringify([payload, ...current].slice(0, 40)))
    } catch {
      /* storage full or blocked; the note still confirms on this device */
    }
    setSent(true)
  }

  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Request · Hamwe Tourism</p>
        <h1>Request a trip, or write the house.</h1>
        <p className="lede">
          The desk sits at {OFFICE_ADDRESS.building} on {OFFICE_ADDRESS.street} in{' '}
          {OFFICE_ADDRESS.area}. Dietary notes, permit questions, late landings, or a custom window
          — send them here.
        </p>
      </header>
      <div className="contact-grid">
        <form className="checkout-form" onSubmit={onSubmit}>
          {sent ? (
            <p className="lede" role="status">
              Received on this demo desk. It stays in this browser. In production it would reach circle@hamwe.rw.
            </p>
          ) : (
            <>
              <label>
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  maxLength={80}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  maxLength={120}
                  required
                />
              </label>
              <label>
                Travel window
                <input
                  value={travelWindow}
                  onChange={(event) => setTravelWindow(event.target.value)}
                  placeholder="e.g. 12–24 October"
                  maxLength={80}
                />
              </label>
              <label>
                Party size
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={party}
                  onChange={(event) => setParty(event.target.value)}
                />
              </label>
              <label>
                What do you need
                <select value={interest} onChange={(event) => setInterest(event.target.value)}>
                  <option value="hosted-tour">A hosted tour seat</option>
                  <option value="custom">A custom itinerary</option>
                  <option value="gorillas">Gorillas and Volcanoes</option>
                  <option value="kivu">Lake Kivu and the west</option>
                  <option value="question">A question for the host</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={2000}
                  required
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send request
              </button>
            </>
          )}
        </form>
        <aside className="buy-panel">
          <p className="footer-label">On the ground</p>
          <p>{OFFICE_ADDRESS.building}</p>
          <p>
            {OFFICE_ADDRESS.street}, {OFFICE_ADDRESS.area}
          </p>
          <p>{OFFICE_ADDRESS.city}</p>
          <p>
            <a href={`tel:${OFFICE_PHONE.tel}`}>{OFFICE_PHONE.display}</a>
          </p>
          <p>
            <a href="mailto:circle@hamwe.rw">circle@hamwe.rw</a>
          </p>
          <DeskHours />
        </aside>
      </div>
    </div>
  )
}
