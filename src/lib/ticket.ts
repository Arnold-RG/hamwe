import { longDate, ticketCode } from './format'
import type { TicketOrder } from '../types'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function icsStamp(iso: string, hours = 8, minutes = 0): string {
  const date = new Date(`${iso}T12:00:00`)
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hours)}${pad(minutes)}00`
}

function download(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function ticketPayload(ticket: TicketOrder): string {
  return `HAMWE|${ticket.id}|${ticket.itemName}|${ticket.travelerName}|${ticket.departureDate}`
}

export function addToCalendar(ticket: TicketOrder) {
  const start = icsStamp(ticket.departureDate, 8, 0)
  const end = icsStamp(ticket.departureDate, ticket.kind === 'activity' ? 12 : 18, 0)
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const description = [
    `Hamwe ticket ${ticketCode(ticket.id)}`,
    `Holder: ${ticket.travelerName}`,
    `Party: ${ticket.travelers}`,
    'Meet at Ikaze House, KG 11 Ave, Kisimenti, Kigali unless your host writes otherwise.',
  ].join('\\n')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hamwe Tourism//Rwanda//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${ticket.id}@hamwe.rw`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Africa/Kigali:${start}`,
    `DTEND;TZID=Africa/Kigali:${end}`,
    `SUMMARY:Hamwe · ${ticket.itemName}`,
    'LOCATION:Kigali, Rwanda',
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  download(`${ticket.id}.ics`, ics, 'text/calendar;charset=utf-8')
}

export function saveWalletPass(ticket: TicketOrder) {
  const pass = {
    formatVersion: 1,
    passTypeIdentifier: 'pass.rw.hamwe.ticket',
    serialNumber: ticket.id,
    teamIdentifier: 'HAMWEDEMO',
    organizationName: 'Hamwe Tourism',
    description: `${ticket.itemName} · Hamwe Tourism`,
    logoText: 'HAMWE',
    foregroundColor: 'rgb(247, 244, 234)',
    backgroundColor: 'rgb(5, 10, 7)',
    labelColor: 'rgb(226, 178, 58)',
    barcode: {
      format: 'PKBarcodeFormatQR',
      message: ticketPayload(ticket),
      messageEncoding: 'iso-8859-1',
      altText: ticketCode(ticket.id),
    },
    boardingPass: {
      headerFields: [{ key: 'gate', label: 'HUB', value: 'KGL' }],
      primaryFields: [{ key: 'event', label: 'CIRCLE', value: ticket.itemName }],
      secondaryFields: [
        { key: 'holder', label: 'HOLDER', value: ticket.travelerName },
        { key: 'date', label: 'DEPARTS', value: longDate(ticket.departureDate) },
      ],
      auxiliaryFields: [
        { key: 'party', label: 'PARTY', value: String(ticket.travelers) },
        { key: 'fare', label: 'FARE', value: `FRw ${ticket.totalRwf.toLocaleString('en-RW')}` },
      ],
      backFields: [
        {
          key: 'note',
          label: 'Host',
          value: 'Hamwe host · Ikaze House, KG 11 Ave, Kisimenti. This demo pass is unsigned until Apple certificates are added.',
        },
      ],
    },
  }

  download(`${ticket.id}.pkpass.json`, JSON.stringify(pass, null, 2), 'application/json')
}

export function printTicket() {
  window.print()
}
