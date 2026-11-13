export type Difficulty = 'gentle' | 'moderate' | 'active'

export type ActivityCategory = 'culture' | 'nature' | 'food' | 'night' | 'budget' | 'comfort' | 'taxi' | 'luxury'

export const ACTIVITY_CATEGORY_LABEL: Record<ActivityCategory, string> = {
  culture: 'Culture',
  nature: 'Nature',
  food: 'Food',
  night: 'Night',
  budget: 'Budget traveler',
  comfort: 'Comfortable traveler',
  taxi: 'Taxis / private cars',
  luxury: 'Luxury package',
}

export interface DailyBudget {
  id: string
  name: string
  transport: string
  food: string
  total: string
  note: string
  ticketSlug: string
}

export type ItemKind = 'tour' | 'activity' | 'membership'

export type PaymentMethod = 'momo' | 'qr' | 'card' | 'paypal'

export interface TravelerPreview {
  id: string
  name: string
  city: string
  country: string
  role: 'guest' | 'host'
  note: string
}

export interface ItineraryDay {
  day: number
  title: string
  location: string
  summary: string
  meals: string
}

export interface Tour {
  id: string
  slug: string
  name: string
  tagline: string
  durationDays: number
  startCity: string
  endCity: string
  nextDeparture: string
  priceUsd: number
  seatsTotal: number
  seatsTaken: number
  difficulty: Difficulty
  highlights: string[]
  includes: string[]
  itinerary: ItineraryDay[]
  image: string
  gallery: string[]
  cohortName: string
  region: string
  luxury?: boolean
}

export interface Activity {
  id: string
  slug: string
  name: string
  city: string
  duration: string
  priceUsd: number
  nextSlot: string
  spotsLeft: number
  spotsTotal: number
  description: string
  togetherNote: string
  image: string
  category: ActivityCategory
  includes: string[]
  meetingPoint?: string
}

export interface MembershipPlan {
  id: string
  slug: string
  name: string
  period: 'month' | 'year'
  priceUsd: number
  tagline: string
  perks: string[]
  highlighted?: boolean
  luxury?: boolean
}

export interface Destination {
  id: string
  slug: string
  name: string
  region: string
  blurb: string
  image: string
  tourSlug: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface AlbumPhoto {
  id: string
  src: string
  title: string
  place: string
  caption: string
  topic?: string
  topicLabel?: string
  credit?: string
  commons?: string
  full?: string
}

export interface CartItem {
  kind: ItemKind
  itemId: string
  departureDate: string
  travelers: number
  joinCircle: boolean
}

export interface TicketOrder {
  id: string
  kind: ItemKind
  itemId: string
  itemName: string
  travelerName: string
  email: string
  phone: string
  travelers: number
  departureDate: string
  totalUsd: number
  totalRwf: number
  createdAt: string
  joinCircle: boolean
  dietary: string
  notes: string
  paymentMethod: PaymentMethod
}

export interface CheckoutForm {
  travelerName: string
  email: string
  phone: string
  travelers: number
  joinCircle: boolean
  dietary: string
  notes: string
  paymentMethod: PaymentMethod
  momoPhone: string
  paypalEmail: string
  cardName: string
  cardNumber: string
  expiry: string
  cvc: string
}
