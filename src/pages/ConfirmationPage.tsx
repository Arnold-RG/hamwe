import { Link, Navigate, useParams } from 'react-router-dom'
import { TicketStub } from '../components/TicketStub'
import { TicketActions } from '../components/TicketActions'
import { useBooking } from '../context/BookingContext'
import { activities } from '../data'

export function ConfirmationPage() {
  const { id } = useParams()
  const { tickets } = useBooking()
  const ticket = tickets.find((item) => item.id === id)

  if (!ticket) {
    return <Navigate to="/tickets" replace />
  }

  return (
    <div className="page-pad narrow confirm">
      <p className="eyebrow">Issued · digital pass</p>
      <h1>You are on the list.</h1>
      <p className="lede">
        {ticket.kind === 'membership'
          ? 'This older membership pass is still stored on this device. Hamwe Tourism now sells tour seats and day tickets only.'
          : ticket.joinCircle
            ? 'A group introduction lands in your inbox two weeks before departure. Save this pass to Calendar or Wallet.'
            : 'Your seat is reserved. Add it to Calendar so the morning does not sneak up.'}
      </p>
      <TicketStub ticket={ticket} />
      <TicketActions ticket={ticket} />
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/tickets">
          All my tickets
        </Link>
        <Link className="btn btn-ghost" to="/activities">
          Add an activity
        </Link>
      </div>
      <div className="suggest">
        {activities.slice(0, 4).map((activity) => (
          <Link key={activity.id} to={`/activities/${activity.slug}`}>
            {activity.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
