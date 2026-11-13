import { initials } from '../lib/format'
import type { TravelerPreview } from '../types'

export function CohortAvatars({
  people,
  limit = 8,
}: {
  people: TravelerPreview[]
  limit?: number
}) {
  const shown = people.slice(0, limit)
  const rest = people.length - shown.length

  return (
    <ul className="cohort" aria-label="Travelers already in this circle">
      {shown.map((person) => (
        <li key={person.id} title={`${person.name}, ${person.city}`}>
          <span className={person.role === 'host' ? 'avatar host' : 'avatar'}>
            {initials(person.name)}
          </span>
        </li>
      ))}
      {rest > 0 ? (
        <li>
          <span className="avatar more">+{rest}</span>
        </li>
      ) : null}
    </ul>
  )
}
