import { ticketCode, longDate, paymentLabel } from '../lib/format'
import { Price } from './Price'
import { QrMark } from './QrMark'
import { ticketPayload } from '../lib/ticket'
import type { TicketOrder } from '../types'

function kindLabel(kind: TicketOrder['kind']): string {
  if (kind === 'tour') return 'Tour seat'
  if (kind === 'activity') return 'Activity pass'
  return 'Stored pass'
}

export function TicketStub({ ticket }: { ticket: TicketOrder }) {
  return (
    <article className="ticket" id="printable-ticket">
      <div className="ticket-ornament" aria-hidden="true" />
      <div className="ticket-main">
        <p className="eyebrow">Hamwe Tourism</p>
        <p className="mono-meta boarding-route">KGL · DIGITAL PASS</p>
        <h2>{ticket.itemName}</h2>
        <dl className="ticket-meta">
          <div>
            <dt>Holder</dt>
            <dd>{ticket.travelerName}</dd>
          </div>
          <div>
            <dt>Departs</dt>
            <dd>{longDate(ticket.departureDate)}</dd>
          </div>
          <div>
            <dt>Party</dt>
            <dd>
              {ticket.travelers} {ticket.travelers === 1 ? 'traveler' : 'travelers'}
            </dd>
          </div>
          <div>
            <dt>Paid with</dt>
            <dd>{paymentLabel(ticket.paymentMethod)}</dd>
          </div>
        </dl>
      </div>
      <div className="ticket-stub">
        <QrMark value={ticketPayload(ticket)} label={ticketCode(ticket.id)} />
        <p className="imigongo-seal" aria-hidden="true">
          HMW
        </p>
        <p className="ticket-price">
          <Price usd={ticket.totalUsd} size="s" />
        </p>
        <p className="tiny">{kindLabel(ticket.kind)}</p>
      </div>
    </article>
  )
}
