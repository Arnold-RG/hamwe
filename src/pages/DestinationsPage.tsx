import { Link } from 'react-router-dom'
import { destinations } from '../data'

export function DestinationsPage() {
  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Destinations · in a sensible order</p>
        <h1>The country, walked as a map.</h1>
        <p className="lede">
          Six grounds Hamwe Tourism actually uses. Each plate opens a tour that already has a date,
          a host, and a road.
        </p>
      </header>
      <div className="land-grid">
        {destinations.map((place) => (
          <article key={place.id} className="land-plate">
            <Link to={`/tours/${place.tourSlug}`}>
              <img src={place.image} alt={place.name} />
              <div>
                <p className="mono-meta">{place.region}</p>
                <h2>{place.name}</h2>
                <p>{place.blurb}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
