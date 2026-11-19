import { useMemo, useState } from 'react'
import { tours } from '../data'
import { TourCard } from '../components/TourCard'
import type { Difficulty } from '../types'

const filters: Array<{ id: 'all' | Difficulty | 'luxury'; label: string }> = [
  { id: 'all', label: 'All tours' },
  { id: 'luxury', label: 'Luxury packages' },
  { id: 'gentle', label: 'Gentle' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'active', label: 'Active' },
]

export function ToursPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')

  const list = useMemo(() => {
    if (filter === 'all') return tours
    if (filter === 'luxury') return tours.filter((tour) => tour.luxury)
    return tours.filter((tour) => tour.difficulty === filter)
  }, [filter])

  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Tours · live seats</p>
        <h1>Choose a hosted trip, not a brochure.</h1>
        <p className="lede">
          Every Hamwe Tourism tour is a dated, hosted itinerary with lodges. Fares are FRw
          32,000–80,000. Luxury packages — The Full Gathering and Virunga Dawn Circle — are FRw
          80,000, the site maximum. Day tickets are FRw 8,000–20,000 on Activities.
        </p>
      </header>

      <div className="filters" role="tablist" aria-label="Filter by pace">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? 'on' : ''}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {list.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  )
}
