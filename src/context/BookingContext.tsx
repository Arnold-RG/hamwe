import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { activities, getMembershipById, tours } from '../data'
import { makeTicketId, toRwf } from '../lib/format'
import type { CartItem, CheckoutForm, TicketOrder } from '../types'

const STORAGE_TICKETS = 'hamwe-tickets'
const STORAGE_CART = 'hamwe-cart'

function readTickets(): TicketOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_TICKETS)
    const parsed = raw ? (JSON.parse(raw) as TicketOrder[]) : []
    return parsed.map((ticket) => ({
      ...ticket,
      phone: ticket.phone ?? '',
      paymentMethod: ticket.paymentMethod ?? 'card',
      totalRwf: ticket.totalRwf ?? toRwf(ticket.totalUsd),
    }))
  } catch {
    return []
  }
}

function readCart(): CartItem | null {
  try {
    const raw = localStorage.getItem(STORAGE_CART)
    return raw ? (JSON.parse(raw) as CartItem) : null
  } catch {
    return null
  }
}

interface BookingContextValue {
  cart: CartItem | null
  tickets: TicketOrder[]
  setCart: (item: CartItem) => void
  clearCart: () => void
  completeCheckout: (form: CheckoutForm) => TicketOrder | null
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartItem | null>(() => readCart())
  const [tickets, setTickets] = useState<TicketOrder[]>(() => readTickets())

  const value = useMemo<BookingContextValue>(() => {
    const setCart = (item: CartItem) => {
      setCartState(item)
      localStorage.setItem(STORAGE_CART, JSON.stringify(item))
    }

    const clearCart = () => {
      setCartState(null)
      localStorage.removeItem(STORAGE_CART)
    }

    const completeCheckout = (form: CheckoutForm): TicketOrder | null => {
      if (!cart) return null
      const catalogItem =
        cart.kind === 'tour'
          ? tours.find((tour) => tour.id === cart.itemId)
          : cart.kind === 'activity'
            ? activities.find((activity) => activity.id === cart.itemId)
            : getMembershipById(cart.itemId)
      if (!catalogItem) return null

      const unit = catalogItem.priceUsd
      const totalUsd = unit * form.travelers
      const order: TicketOrder = {
        id: makeTicketId(),
        kind: cart.kind,
        itemId: cart.itemId,
        itemName: catalogItem.name,
        travelerName: form.travelerName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        travelers: form.travelers,
        departureDate: cart.departureDate,
        totalUsd,
        totalRwf: toRwf(totalUsd),
        createdAt: new Date().toISOString(),
        joinCircle: form.joinCircle,
        dietary: form.dietary.trim(),
        notes: form.notes.trim(),
        paymentMethod: form.paymentMethod,
      }

      setTickets((current) => {
        const next = [order, ...current]
        localStorage.setItem(STORAGE_TICKETS, JSON.stringify(next))
        return next
      })
      clearCart()
      return order
    }

    return { cart, tickets, setCart, clearCart, completeCheckout }
  }, [cart, tickets])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider')
  }
  return context
}
