import { addToCalendar, printTicket, saveWalletPass, ticketPayload } from '../lib/ticket'
import type { TicketOrder } from '../types'
import { QrMark } from './QrMark'
import { ticketCode } from '../lib/format'

export function TicketActions({ ticket }: { ticket: TicketOrder }) {
  return (
    <div className="ticket-actions">
      <QrMark value={ticketPayload(ticket)} label={ticketCode(ticket.id)} />
      <div className="ticket-action-row">
        <button className="btn btn-primary" type="button" onClick={() => addToCalendar(ticket)}>
          Add to Calendar
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => saveWalletPass(ticket)}>
          Add to Apple Wallet
        </button>
        <button className="btn btn-ghost" type="button" onClick={printTicket}>
          Save / print PDF
        </button>
      </div>
      <p className="tiny">
        Calendar saves an .ics file for iPhone Calendar. Wallet downloads a pass file (unsigned demo).
        Save / print opens a clean ticket for PDF.
      </p>
    </div>
  )
}
