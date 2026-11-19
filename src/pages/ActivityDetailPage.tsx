import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getActivity } from '../data'
import { longDate } from '../lib/format'
import { Price } from '../components/Price'
import { useBooking } from '../context/BookingContext'
import { ACTIVITY_CATEGORY_LABEL } from '../types'

export function ActivityDetailPage() {
  const { slug } = useParams()
  const activity = slug ? getActivity(slug) : undefined
  const { setCart } = useBooking()
  const navigate = useNavigate()

  if (!activity) {
    return <Navigate to="/activities" replace />
  }

  const buy = () => {
    setCart({
      kind: 'activity',
      itemId: activity.id,
      departureDate: activity.nextSlot,
      travelers: 1,
      joinCircle: true,
    })
    navigate('/checkout')
  }

  return (
    <div className="detail">
      <div className="detail-hero short">
        <img src={activity.image} alt={activity.name} />
        <div className="detail-hero-copy">
          <p className="eyebrow">
            {ACTIVITY_CATEGORY_LABEL[activity.category]} · {activity.city} · {activity.duration}
          </p>
          <h1>{activity.name}</h1>
          <p>{activity.description}</p>
        </div>
      </div>

      <div className="detail-layout">
        <div>
          <p className="lede">{activity.togetherNote}</p>
          {activity.meetingPoint ? (
            <p className="tiny">Meet: {activity.meetingPoint}</p>
          ) : null}
          <p className="eyebrow">Included</p>
          <ul className="plain-list">
            {activity.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="buy-panel">
          <p className="price">
            <Price usd={activity.priceUsd} size="l" />
          </p>
          <p>next {longDate(activity.nextSlot)}</p>
          <button className="btn btn-primary btn-block" type="button" onClick={buy}>
            Join this activity
          </button>
        </aside>
      </div>
    </div>
  )
}
