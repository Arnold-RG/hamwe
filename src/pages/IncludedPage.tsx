import { Link } from 'react-router-dom'

const included = [
  {
    title: 'A Kigali host',
    copy: 'A bilingual host walks every hosted tour — airport, days, tables, and the quiet after gorillas.',
  },
  {
    title: 'Airport welcome',
    copy: 'Kigali pickup is in the tour ticket. You land. Someone is holding your name.',
  },
  {
    title: 'Lodges and the vehicle',
    copy: 'Nights named in the journal, and the road between them, are already bought.',
  },
  {
    title: 'Park fees when listed',
    copy: 'When a trek or park day is on the itinerary, the fee is in the fare. Gorilla permits too, on the tours that list a trek.',
  },
  {
    title: 'Named meals',
    copy: 'Breakfasts, many lunches, and the communal dinners written on that tour’s page.',
  },
  {
    title: 'The pre-trip call',
    copy: 'Two weeks out, faces on a call. Food rules, nerves, who is coming from where.',
  },
]

const notIncluded = [
  'International flights to Kigali (KGL)',
  'Visas and immigration fees',
  'Travel insurance',
  'Drinks and meals not named in the journal',
  'Optional day tickets and extras on Activities',
  'Tips for guides, drivers, and lodge staff',
  'Souvenirs and personal spending',
]

export function IncludedPage() {
  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Included · Hamwe Tourism</p>
        <h1>One seat. The country already assembled.</h1>
        <p className="lede">
          Hosted tours sit between FRw 32,000 and FRw 80,000. Day tickets are FRw 8,000–20,000.
          Luxury packages are FRw 80,000 — nothing on this site costs more. Flights to Kigali stay
          yours.
        </p>
      </header>

      <div className="about-grid">
        {included.map((item) => (
          <section key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </section>
        ))}
      </div>

      <section className="house-note">
        <p className="eyebrow">Not in the fare</p>
        <h2>You still arrange these.</h2>
        <ul className="include-list">
          {notIncluded.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/tours">
            Choose a tour
          </Link>
          <Link className="btn btn-ghost" to="/plan">
            Plan the rest
          </Link>
        </div>
      </section>
    </div>
  )
}
