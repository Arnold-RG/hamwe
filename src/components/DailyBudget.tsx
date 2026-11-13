import { Link } from 'react-router-dom'
import { dailyBudgets } from '../data'

export function DailyBudget() {
  return (
    <section className="daily-budget" aria-labelledby="daily-budget-title">
      <header>
        <p className="eyebrow">Accurate daily costs · FRw</p>
        <h2 id="daily-budget-title">What a day actually costs, excluding a hotel.</h2>
        <p>
          Day tickets on this site are FRw 8,000–20,000. Luxury packages are FRw 80,000. Nothing
          listed here costs more than that ceiling.
        </p>
      </header>
      <div className="daily-budget-grid">
        {dailyBudgets.map((band) => (
          <article key={band.id} className={`daily-budget-card is-${band.id}`}>
            <p className="eyebrow">{band.name}</p>
            <dl>
              <div>
                <dt>Transport</dt>
                <dd>{band.transport}</dd>
              </div>
              <div>
                <dt>Food</dt>
                <dd>{band.food}</dd>
              </div>
              <div>
                <dt>Total excluding accommodation</dt>
                <dd>{band.total}</dd>
              </div>
            </dl>
            <p className="tiny">{band.note}</p>
            <Link className="text-link" to={`/activities/${band.ticketSlug}`}>
              Buy this day ticket
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
