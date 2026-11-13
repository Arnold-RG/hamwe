import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getTour } from '../data'
import { longDate } from '../lib/format'
import { Price } from '../components/Price'
import { useBooking } from '../context/BookingContext'

export function TourDetailPage() {
  const { slug } = useParams()
  const tour = slug ? getTour(slug) : undefined
  const { setCart } = useBooking()
  const navigate = useNavigate()

  if (!tour) {
    return <Navigate to="/tours" replace />
  }

  const buy = () => {
    setCart({
      kind: 'tour',
      itemId: tour.id,
      departureDate: tour.nextDeparture,
      travelers: 1,
      joinCircle: true,
    })
    navigate('/checkout')
  }

  return (
    <div className="detail">
      <div className="detail-hero">
        <img src={tour.image} alt={`${tour.name} in ${tour.region}`} />
        <div className="detail-hero-copy">
          <p className="eyebrow">
            {tour.luxury ? 'Luxury package · ' : ''}
            {tour.region} · {tour.durationDays} days · {tour.difficulty}
          </p>
          <h1>{tour.name}</h1>
          <p>{tour.tagline}</p>
        </div>
      </div>

      <div className="detail-layout">
        <div>
          <section>
            <p className="eyebrow">The ground</p>
            <ul className="highlights">
              {tour.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="eyebrow">Field journal</p>
            <h2>Day by day</h2>
            <ol className="journal">
              {tour.itinerary.map((day) => (
                <li key={day.day}>
                  <div className="day-num">{String(day.day).padStart(2, '0')}</div>
                  <div>
                    <p className="mono-meta">
                      {day.location} · {day.meals}
                    </p>
                    <h3>{day.title}</h3>
                    <p>{day.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <p className="eyebrow">In the fare</p>
            <ul className="plain-list">
              {tour.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="buy-panel">
          <p className="mono-meta">
            {tour.region} · {tour.durationDays} days
          </p>
          <p className="price">
            <Price usd={tour.priceUsd} size="l" />
          </p>
          <p>per traveler, next {longDate(tour.nextDeparture)}</p>
          <button className="btn btn-primary btn-block" type="button" onClick={buy}>
            Buy this seat
          </button>
          <p className="tiny">
            Paying reserves your place and opens the circle introduction. Gorilla permits are
            included on tours that list them.
          </p>
        </aside>
      </div>

      {tour.gallery.length > 1 ? (
        <div className="gallery">
          {tour.gallery.map((src) => (
            <img key={src} src={src} alt={`${tour.name} field plate`} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
