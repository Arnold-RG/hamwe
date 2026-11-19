import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getActivityById, getMembershipById, getTourById } from '../data'
import { expiryValid, longDate, luhnLikeValid, rwandaPhoneValid } from '../lib/format'
import { useBooking } from '../context/BookingContext'
import type { CheckoutForm, PaymentMethod } from '../types'
import { Price } from '../components/Price'
import { QrMark } from '../components/QrMark'

const emptyForm: CheckoutForm = {
  travelerName: '',
  email: '',
  phone: '',
  travelers: 1,
  joinCircle: true,
  dietary: '',
  notes: '',
  paymentMethod: 'momo',
  momoPhone: '',
  paypalEmail: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

const methods: Array<{ id: PaymentMethod; label: string; hint: string }> = [
  { id: 'momo', label: 'MTN MoMo', hint: 'Pay from a Rwanda number' },
  { id: 'qr', label: 'MoMo QR', hint: 'Scan and approve' },
  { id: 'card', label: 'Visa / Mastercard', hint: 'International cards' },
  { id: 'paypal', label: 'PayPal', hint: 'PayPal balance or card' },
]

export function CheckoutPage() {
  const { cart, completeCheckout } = useBooking()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutForm>(emptyForm)
  const [error, setError] = useState('')
  const [momoSent, setMomoSent] = useState(false)

  const item = useMemo(() => {
    if (!cart) return null
    if (cart.kind === 'tour') return getTourById(cart.itemId)
    if (cart.kind === 'activity') return getActivityById(cart.itemId)
    return getMembershipById(cart.itemId)
  }, [cart])

  if (!cart || !item) {
    return (
      <div className="page-pad narrow">
        <header className="page-hero">
          <p className="eyebrow">Checkout</p>
          <h1>Your bag is empty.</h1>
          <p className="lede">Pick a tour or a day ticket first.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/tours">
              Browse tours
            </Link>
            <Link className="btn btn-ghost" to="/activities">
              Day tickets
            </Link>
          </div>
        </header>
      </div>
    )
  }

  const totalUsd = item.priceUsd * form.travelers
  const payRef = `HMW-PAY-${item.id.slice(-4).toUpperCase()}-${form.travelers}`

  const setField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (form.travelerName.trim().length < 3) {
      setError('Tell us the name on the ticket.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('We need a real email for the circle call.')
      return
    }
    if (form.travelers < 1 || form.travelers > 4) {
      setError('Each checkout holds 1–4 travelers.')
      return
    }

    if (form.paymentMethod === 'momo' || form.paymentMethod === 'qr') {
      const phone = form.momoPhone || form.phone
      if (!rwandaPhoneValid(phone)) {
        setError('Use a Rwanda MoMo number such as 0794 607 518.')
        return
      }
    }

    if (form.paymentMethod === 'card') {
      const digits = form.cardNumber.replace(/\s/g, '')
      if (!luhnLikeValid(digits)) {
        setError('Card number should be 13–19 digits. Demo: 4242 4242 4242 4242.')
        return
      }
      if (!expiryValid(form.expiry)) {
        setError('Expiry should look like 12 / 28.')
        return
      }
      if (!/^\d{3,4}$/.test(form.cvc.trim())) {
        setError('CVC is 3 or 4 digits.')
        return
      }
    }

    if (form.paymentMethod === 'paypal' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.paypalEmail || form.email)) {
      setError('PayPal needs an email on the account.')
      return
    }

    const order = completeCheckout({ ...form, travelers: Number(form.travelers) })
    if (!order) {
      setError('Could not issue the ticket. Try again.')
      return
    }
    navigate(`/ticket/${order.id}`)
  }

  return (
    <div className="checkout">
      <form className="checkout-form" onSubmit={onSubmit} noValidate>
        <p className="eyebrow">Ticket · FRw</p>
        <h1>{cart.kind === 'membership' ? 'Join the circle' : 'Reserve your seat'}</h1>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <fieldset>
          <legend>Traveler</legend>
          <label>
            Full name
            <input
              value={form.travelerName}
              onChange={(event) => setField('travelerName', event.target.value)}
              autoComplete="name"
              maxLength={80}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setField('email', event.target.value)}
              autoComplete="email"
              maxLength={120}
              required
            />
          </label>
          <label>
            Phone
            <input
              value={form.phone}
              onChange={(event) => setField('phone', event.target.value)}
              autoComplete="tel"
              placeholder="+250 794 607 518"
              maxLength={24}
            />
          </label>
          {cart.kind !== 'membership' ? (
            <label>
              Travelers on this ticket
              <input
                type="number"
                min={1}
                max={4}
                value={form.travelers}
                onChange={(event) => setField('travelers', Number(event.target.value))}
              />
            </label>
          ) : null}
        </fieldset>

        {cart.kind !== 'membership' ? (
          <fieldset>
            <legend>The circle</legend>
            <label className="check">
              <input
                type="checkbox"
                checked={form.joinCircle}
                onChange={(event) => setField('joinCircle', event.target.checked)}
              />
              Introduce me to the others before we fly
            </label>
            <label>
              Dietary notes
              <input
                value={form.dietary}
                onChange={(event) => setField('dietary', event.target.value)}
                placeholder="Vegetarian, nuts, none"
                maxLength={160}
              />
            </label>
            <label>
              Anything the host should know
              <textarea
                rows={3}
                value={form.notes}
                onChange={(event) => setField('notes', event.target.value)}
                maxLength={1000}
              />
            </label>
          </fieldset>
        ) : null}

        <fieldset>
          <legend>Pay in Rwandan francs</legend>
          <p className="tiny">Demo checkout — no live debit. Choose how you would pay on the ground.</p>
          <div className="pay-grid" role="radiogroup" aria-label="Payment method">
            {methods.map((method) => (
              <label key={method.id} className={`pay-option ${form.paymentMethod === method.id ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="pay"
                  checked={form.paymentMethod === method.id}
                  onChange={() => {
                    setField('paymentMethod', method.id)
                    setError('')
                  }}
                />
                <strong>{method.label}</strong>
                <span>{method.hint}</span>
              </label>
            ))}
          </div>

          {form.paymentMethod === 'momo' ? (
            <div className="pay-panel">
              <label>
                MTN MoMo number
                <input
                  value={form.momoPhone}
                  onChange={(event) => setField('momoPhone', event.target.value)}
                  placeholder="0794 607 518"
                  inputMode="tel"
                  maxLength={24}
                />
              </label>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  if (!rwandaPhoneValid(form.momoPhone || form.phone)) {
                    setError('Enter a Rwanda MoMo number first.')
                    return
                  }
                  setError('')
                  setMomoSent(true)
                }}
              >
                Send MoMo prompt
              </button>
              {momoSent ? <p className="tiny">Prompt sent on this demo. Approve on the phone, then pay below.</p> : null}
            </div>
          ) : null}

          {form.paymentMethod === 'qr' ? (
            <div className="pay-panel pay-qr">
              <QrMark value={`momo://hamwe.rw/pay/${payRef}`} label={payRef} />
              <p className="tiny">Scan with MoMo. Reference {payRef}. Expires in ten minutes on a live till.</p>
            </div>
          ) : null}

          {form.paymentMethod === 'card' ? (
            <div className="pay-panel">
              <p className="tiny">Visa or Mastercard. Demo number 4242 4242 4242 4242.</p>
              <label>
                Name on card
                <input
                  value={form.cardName}
                  onChange={(event) => setField('cardName', event.target.value)}
                  autoComplete="cc-name"
                  maxLength={80}
                />
              </label>
              <label>
                Card number
                <input
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={(event) => setField('cardNumber', event.target.value)}
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  maxLength={24}
                />
              </label>
              <div className="split-fields">
                <label>
                  Expiry
                  <input
                    value={form.expiry}
                    onChange={(event) => setField('expiry', event.target.value)}
                    placeholder="12 / 28"
                    autoComplete="cc-exp"
                    maxLength={7}
                  />
                </label>
                <label>
                  CVC
                  <input
                    value={form.cvc}
                    onChange={(event) => setField('cvc', event.target.value)}
                    autoComplete="cc-csc"
                    maxLength={4}
                  />
                </label>
              </div>
            </div>
          ) : null}

          {form.paymentMethod === 'paypal' ? (
            <div className="pay-panel">
              <label>
                PayPal email
                <input
                  type="email"
                  value={form.paypalEmail}
                  onChange={(event) => setField('paypalEmail', event.target.value)}
                  placeholder={form.email || 'you@email.com'}
                  maxLength={120}
                />
              </label>
              <p className="tiny">You would be sent to PayPal and returned with a paid receipt.</p>
            </div>
          ) : null}
        </fieldset>

        <button className="btn btn-primary btn-block" type="submit">
          Pay and issue ticket
        </button>
      </form>

      <aside className="buy-panel sticky">
        <p className="eyebrow">Order · Rwanda</p>
        <h2>{item.name}</h2>
        <p>{longDate(cart.departureDate)}</p>
        <p className="tiny">
          {form.travelers} × fare
        </p>
        <p className="price">
          <Price usd={totalUsd} size="l" />
        </p>
        <p className="tiny">
          Includes hosted itinerary, activity seat, or a year of the circle. Demo till — no live charge.
        </p>
      </aside>
    </div>
  )
}
