import { getActivity, getTour } from '../data'

const ORIGIN = 'https://arnold-rg.github.io/hamwe'

export interface PageMeta {
  title: string
  description: string
}

const pages: Record<string, PageMeta> = {
  '/': {
    title: 'Hamwe Tourism — Rwanda, walked together',
    description:
      'Hamwe Tourism plans full Rwanda tours for small groups. Buy a ticket, meet the table, walk the thousand hills together.',
  },
  '/tours': {
    title: 'Tours — Hamwe Tourism',
    description:
      'Dated, hosted Rwanda departures. Gorillas, Lake Kivu, Nyungwe, Akagera, and Kigali, with permits in the fare when a trek is listed.',
  },
  '/activities': {
    title: 'Activities — Hamwe Tourism',
    description:
      'Day tickets beside the hosted tours: markets, coffee, canopy hours, lamp boats, and tables in Kigali. Fares in Rwandan francs.',
  },
  '/destinations': {
    title: 'Destinations — Hamwe Tourism',
    description: 'Kigali, the volcanoes, Lake Kivu, Nyungwe, Akagera, and Nyanza, in the order a host would walk them.',
  },
  '/album': {
    title: 'Album — Hamwe Tourism',
    description: 'Photographs of Rwanda from the Hamwe desk: hills, parks, Kigali, and the road between them.',
  },
  '/plan': {
    title: 'Plan your trip — Hamwe Tourism',
    description: 'Visa, season, packing, and how the Kigali house works before you fly.',
  },
  '/included': {
    title: 'What’s included — Hamwe Tourism',
    description: 'Host, lodges, park fees when listed, airport welcome, and named meals. Flights stay yours.',
  },
  '/responsible': {
    title: 'Travel with care — Hamwe Tourism',
    description: 'Memorials, parks, the plastic-bag ban, photography, Umuganda, and money at the table.',
  },
  '/faq': {
    title: 'FAQ — Hamwe Tourism',
    description: 'Answers from the Hamwe desk: permits, group size, payments, and what the ticket covers.',
  },
  '/contact': {
    title: 'Request a trip — Hamwe Tourism',
    description: 'Write the Kigali house with your dates, group size, and the parks you care about.',
  },
  '/about': {
    title: 'About — Hamwe Tourism',
    description: 'Hamwe Tourism hosts small groups through Rwanda. Visit Rwanda is the national brand. We are the desk in Kigali.',
  },
  '/gisubizo': {
    title: 'Gisubizo — Hamwe Tourism',
    description: 'Ask the Hamwe desk in English: tours, fares, hours, and how a trip is put together.',
  },
  '/tickets': {
    title: 'Your tickets — Hamwe Tourism',
    description: 'Passes issued on this device. Nothing is sent to a payment processor.',
  },
  '/checkout': {
    title: 'Checkout — Hamwe Tourism',
    description: 'Reserve a seat. Demo checkout only — no live MoMo or card charge.',
  },
}

export function resolvePageMeta(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (pages[path]) return pages[path]

  if (path.startsWith('/tours/')) {
    const tour = getTour(decodeURIComponent(path.slice('/tours/'.length)))
    if (tour) {
      return {
        title: `${tour.name} — Hamwe Tourism`,
        description: tour.tagline,
      }
    }
  }

  if (path.startsWith('/activities/')) {
    const activity = getActivity(decodeURIComponent(path.slice('/activities/'.length)))
    if (activity) {
      return {
        title: `${activity.name} — Hamwe Tourism`,
        description: activity.description,
      }
    }
  }

  if (path.startsWith('/ticket/')) {
    return {
      title: 'Your ticket — Hamwe Tourism',
      description: 'A Hamwe pass issued on this device, with the trip, the fare, and a calendar file.',
    }
  }

  return {
    title: 'Hamwe Tourism',
    description: pages['/'].description,
  }
}

export function canonicalUrl(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export function applyPageMeta(pathname: string) {
  const meta = resolvePageMeta(pathname)
  const url = canonicalUrl(pathname)
  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
}
