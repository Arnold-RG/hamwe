import { Link } from 'react-router-dom'
import { TicketStub } from '../components/TicketStub'
import { useBooking } from '../context/BookingContext'

export function TicketsPage() {
  const { tickets } = useBooking()

  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Wallet</p>
        <h1>Your digital passes.</h1>
        <p className="lede">
          Each ticket carries a QR the host can scan, a Calendar file for iPhone, and a Wallet pass
          download. Open a pass to save it.
        </p>
      </header>

      {tickets.length === 0 ? (
        <div className="empty">
          <p className="eyebrow">Wallet empty</p>
          <p>No tickets yet. The country is still out there.</p>
          <Link className="btn btn-primary" to="/tours">
            Find a tour
          </Link>
        </div>
      ) : (
        <div className="ticket-stack">
          {tickets.map((ticket) => (
            <Link key={ticket.id} to={`/ticket/${ticket.id}`} className="ticket-link">
              <TicketStub ticket={ticket} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
