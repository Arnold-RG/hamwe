import { faqs } from '../data'
import { Link } from 'react-router-dom'

export function FaqPage() {
  return (
    <div className="page-pad narrow">
      <header className="page-hero">
        <p className="eyebrow">FAQ</p>
        <h1>Before you buy a seat.</h1>
        <p className="lede">
          Permits, MoMo, francs, Wallet, and who this is for. If the answer is not here, write the
          host.
        </p>
      </header>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <p className="lede" style={{ marginTop: '2rem' }}>
        Still stuck? <Link to="/contact">Write the Kigali house</Link>.
      </p>
    </div>
  )
}
