import { Link } from 'react-router-dom'
import type { Tour } from '../types'
import { compactDate } from '../lib/format'
import { Price } from './Price'

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="tour-card" data-reveal>
      <Link to={`/tours/${tour.slug}`} className="tour-card-media">
        <img src={tour.image} alt="" />
        <span className="chip chip-dark">{tour.region}</span>
        {tour.luxury ? <span className="chip chip-luxury">Luxury package</span> : null}
      </Link>
      <div className="tour-card-body">
        <p className="mono-meta">
          {compactDate(tour.nextDeparture)} · {tour.durationDays} days
        </p>
        <h3>
          <Link to={`/tours/${tour.slug}`}>{tour.name}</Link>
        </h3>
        <p>{tour.tagline}</p>
        <div className="tour-card-foot">
          <Price usd={tour.priceUsd} />
        </div>
      </div>
    </article>
  )
}
