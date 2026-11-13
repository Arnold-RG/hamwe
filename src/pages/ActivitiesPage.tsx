import { useMemo, useState } from 'react'
import { activities } from '../data'
import { ActivityCard } from '../components/ActivityCard'
import { DailyBudget } from '../components/DailyBudget'
import { ACTIVITY_CATEGORY_LABEL, type ActivityCategory } from '../types'

const filters: Array<{ id: 'all' | ActivityCategory | string; label: string }> = [
  { id: 'all', label: 'All tickets' },
  { id: 'luxury', label: ACTIVITY_CATEGORY_LABEL.luxury },
  { id: 'budget', label: ACTIVITY_CATEGORY_LABEL.budget },
  { id: 'comfort', label: ACTIVITY_CATEGORY_LABEL.comfort },
  { id: 'taxi', label: ACTIVITY_CATEGORY_LABEL.taxi },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food' },
  { id: 'nature', label: 'Nature' },
  { id: 'night', label: 'Night' },
  { id: 'Kigali', label: 'Kigali' },
  { id: 'Musanze', label: 'Musanze' },
  { id: 'Lake Kivu', label: 'Kivu' },
]

export function ActivitiesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')

  const list = useMemo(() => {
    if (filter === 'all') return activities
    if (
      filter === 'culture' ||
      filter === 'food' ||
      filter === 'nature' ||
      filter === 'night' ||
      filter === 'budget' ||
      filter === 'comfort' ||
      filter === 'taxi' ||
      filter === 'luxury'
    ) {
      return activities.filter((activity) => activity.category === filter)
    }
    return activities.filter((activity) => activity.city.includes(String(filter)))
  }, [filter])

  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Tickets · FRw 8,000–80,000</p>
        <h1>Day tickets and luxury packages at real Rwanda prices.</h1>
        <p className="lede">
          Day tickets are FRw 8,000–20,000. Luxury packages are FRw 80,000 — the highest fare on this
          site. Hosted tours sit between FRw 32,000 and FRw 80,000 on Tours.
        </p>
      </header>
      <DailyBudget />

      <div className="filters" role="tablist" aria-label="Filter activities">
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
        {list.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
