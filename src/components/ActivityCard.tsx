import { Link } from 'react-router-dom'
import type { Activity } from '../types'
import { ACTIVITY_CATEGORY_LABEL } from '../types'
import { Price } from './Price'

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="activity-card" data-reveal>
      <Link to={`/activities/${activity.slug}`} className="activity-media">
        <img src={activity.image} alt="" />
        <span className="chip">{ACTIVITY_CATEGORY_LABEL[activity.category]}</span>
      </Link>
      <div className="activity-body">
        <p className="mono-meta">
          {activity.city} · {activity.duration}
        </p>
        <h3>
          <Link to={`/activities/${activity.slug}`}>{activity.name}</Link>
        </h3>
        <p>{activity.togetherNote}</p>
        <div className="tour-card-foot">
          <Price usd={activity.priceUsd} />
        </div>
      </div>
    </article>
  )
}
