import { activities, destinations, faqs, tours } from '../data'
import { money } from '../lib/format'
import { getDeskStatus, OFFICE_ADDRESS, OFFICE_HOURS, OFFICE_PHONE } from '../lib/hours'
import { KNOWLEDGE, MONTHS, PHRASES, type KnowledgeCard } from './knowledge'

export interface McpTool {
  name: string
  description: string
  inputSchema: { query?: string; days?: number }
}

export const GISUBIZO_TOOLS: McpTool[] = [
  {
    name: 'rwanda_knowledge',
    description: 'Retrieve Rwanda facts: geography, culture, parks, language, safety, travel practice.',
    inputSchema: { query: 'string' },
  },
  {
    name: 'hamwe_catalog',
    description: 'List matching Hamwe Tourism tours, extras, and FAQ lines.',
    inputSchema: { query: 'string' },
  },
  {
    name: 'desk_hours',
    description: 'Live Kigali desk open/closed status and weekday hours.',
    inputSchema: {},
  },
  {
    name: 'plan_days',
    description: 'Compose a day-by-day Rwanda sketch from a number of days.',
    inputSchema: { days: 5 },
  },
  {
    name: 'phrasebook',
    description: 'Return Kinyarwanda phrases that match a visitor question.',
    inputSchema: { query: 'string' },
  },
]

const STOP = new Set([
  'the', 'and', 'for', 'with', 'what', 'when', 'where', 'how', 'who', 'why',
  'is', 'are', 'a', 'an', 'to', 'of', 'in', 'on', 'do', 'i', 'me', 'my', 'we',
  'can', 'you', 'please', 'tell', 'about', 'some', 'any', 'does', 'did', 'should',
  'would', 'could', 'there', 'this', 'that', 'they', 'them', 'from', 'into',
  'need', 'want', 'give', 'more', 'know', 'your', 'our', 'also', 'just',
])

const TYPOS: Record<string, string> = {
  gorila: 'gorilla',
  gorilas: 'gorilla',
  kinyrwanda: 'kinyarwanda',
  kinyarwand: 'kinyarwanda',
  rawanda: 'rwanda',
  ruanda: 'rwanda',
  kiglai: 'kigali',
  kigiri: 'kigali',
  gisenyi: 'rubavu',
  kibuye: 'karongi',
  butare: 'huye',
  chimps: 'chimpanzee',
  chimp: 'chimpanzee',
  momo: 'momo',
  visah: 'visa',
}

const SYNONYMS: Record<string, string[]> = {
  gorilla: ['gorillas', 'virunga', 'volcanoes', 'permit', 'kinigi', 'musanze', 'trek', 'trekking', 'sabyinyo'],
  chimpanzee: ['chimp', 'chimps', 'chimpanzees', 'nyungwe'],
  kigali: ['capital', 'kisimenti', 'nyamirambo', 'kgl', 'city'],
  kivu: ['rubavu', 'gisenyi', 'karongi', 'kibuye', 'lake'],
  nyungwe: ['canopy', 'forest', 'tea'],
  akagera: ['safari', 'savannah', 'ihema', 'lion', 'elephant'],
  money: ['franc', 'rwf', 'currency', 'atm', 'usd', 'cost', 'price', 'expensive', 'budget'],
  pack: ['packing', 'bring', 'wear', 'clothes', 'boots', 'luggage'],
  visa: ['passport', 'entry', 'evisa', 'immigration'],
  safety: ['safe', 'crime', 'solo', 'women'],
  food: ['eat', 'brochette', 'isombe', 'coffee', 'tea', 'beer'],
  hamwe: ['circle', 'tour', 'ticket', 'seat', 'host'],
  language: ['kinyarwanda', 'hello', 'muraho', 'words', 'phrase', 'speak'],
  memorial: ['genocide', 'kwibuka', '1994', 'history'],
  weather: ['rain', 'dry', 'season', 'month', 'climate', 'june', 'april'],
  family: ['kids', 'children', 'child', 'teen'],
  transport: ['moto', 'bus', 'taxi', 'drive', 'car'],
}

export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((word) => TYPOS[word] ?? word)
    .filter((word) => word.length > 1 && !STOP.has(word))
}

export function expandTokens(words: string[]): string[] {
  const extra: string[] = []
  for (const word of words) {
    extra.push(word)
    for (const [key, aliases] of Object.entries(SYNONYMS)) {
      if (word === key || aliases.includes(word) || word.includes(key) || key.includes(word)) {
        extra.push(key, ...aliases)
      }
    }
  }
  return [...new Set(extra)]
}

function scoreText(hay: string, words: string[]): number {
  const haystack = hay.toLowerCase()
  return words.reduce((sum, word) => {
    const safe = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const hits = haystack.match(new RegExp(`\\b${safe}\\b`, 'g'))?.length ?? 0
    if (hits) return sum + hits * 3 + 2
    return haystack.includes(word) ? sum + 1 : sum
  }, 0)
}

export function searchKnowledge(query: string, limit = 4): KnowledgeCard[] {
  const words = expandTokens(tokens(query))
  if (!words.length) return KNOWLEDGE.slice(0, limit)

  return [...KNOWLEDGE]
    .map((card) => {
      const tagHits = card.tags.filter((tag) =>
        words.some((word) => tag.includes(word) || word.includes(tag)),
      ).length
      const titleHits = scoreText(card.title, words)
      const bodyHits = scoreText(`${card.hook} ${card.claims.join(' ')}`, words)
      const planBoost = extractDays(query) && card.id === 'days' ? 48 : 0
      const packBoost = /pack|packing|bring|wear|clothes|boots/.test(query.toLowerCase()) && card.id === 'pack' ? 40 : 0
      return { card, score: tagHits * 16 + titleHits * 5 + bodyHits + planBoost + packBoost }
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.card)
}

export function pickClaims(cards: KnowledgeCard[], query: string, limit = 6): string[] {
  const words = expandTokens(tokens(query))
  const ranked = cards.flatMap((card, index) => {
    const hookBonus = index === 0 ? 4 : 0
    return card.claims.map((claim) => ({
      claim,
      score: scoreText(claim, words) + hookBonus + (index === 0 ? 2 : 0),
      card: card.id,
    }))
  })

  const chosen: string[] = []
  const perCard: Record<string, number> = {}
  for (const row of ranked.sort((a, b) => b.score - a.score)) {
    if (chosen.includes(row.claim)) continue
    if ((perCard[row.card] ?? 0) >= 3) continue
    if (row.score <= 0 && chosen.length >= 3) continue
    chosen.push(row.claim)
    perCard[row.card] = (perCard[row.card] ?? 0) + 1
    if (chosen.length >= limit) break
  }

  if (!chosen.length && cards[0]) return cards[0].claims.slice(0, 3)
  return chosen
}

export function hamweCatalog(query: string): string {
  const words = tokens(query)
  const q = query.toLowerCase()
  const wantGorilla = /gorilla|permit|virunga|volcano/.test(q)
  const wantExtra = /activity|extra|studio|dinner|jazz|boat|market/.test(q)

  const tourHits = tours.filter((tour) => {
    const blob = `${tour.name} ${tour.tagline} ${tour.region} ${tour.highlights.join(' ')}`.toLowerCase()
    if (wantGorilla) return /gorilla/.test(blob)
    return words.some((word) => blob.includes(word)) || /tour|hamwe|circle|seat|depart/.test(q)
  })
  const pick = (tourHits.length ? tourHits : tours).slice(0, 3)
  const lines = pick.map((tour) => {
    return `${tour.name} — ${tour.durationDays} days, next ${tour.nextDeparture}, ${money(tour.priceUsd)}. ${tour.tagline}`
  })

  const extras = wantExtra
    ? activities.slice(0, 3).map((item) => `${item.name} (${item.city}) — ${item.duration}, ${money(item.priceUsd)}.`)
    : []

  const plans = /member|subscription/.test(q)
    ? ['Hamwe Tourism no longer sells memberships. Book a dated tour or a day ticket, or request a custom trip at /contact.']
    : []

  const land = destinations
    .filter((place) => words.some((word) => `${place.name} ${place.blurb}`.toLowerCase().includes(word)))
    .slice(0, 2)
    .map((place) => `${place.name}: ${place.blurb}`)

  const faqHits = faqs
    .filter((item) => words.some((word) => `${item.q} ${item.a}`.toLowerCase().includes(word)))
    .slice(0, 1)
    .map((item) => `${item.q} ${item.a}`)

  return [...lines, ...extras, ...plans, ...land, ...faqHits].join('\n')
}

export function deskBrief(): string {
  const desk = getDeskStatus()
  return `${desk.weAre} now. ${OFFICE_HOURS.label}. ${desk.nextLine}. ${OFFICE_ADDRESS.full}. circle@hamwe.rw · ${OFFICE_PHONE.display}.`
}

export function phrasebook(query: string): string {
  const words = tokens(query)
  const hits = PHRASES.filter((row) => {
    const blob = `${row.rw} ${row.en}`.toLowerCase()
    return words.some((word) => blob.includes(word))
  })
  const pick = (hits.length ? hits : PHRASES).slice(0, hits.length ? 8 : 10)
  return pick.map((row) => `${row.rw} — ${row.en}`).join('\n')
}

export function monthBrief(query: string): string | null {
  const q = query.toLowerCase()
  const hit = MONTHS.find((month) => new RegExp(`\\b${month.id}\\b`, 'i').test(q))
  if (!hit) return null
  const rain =
    hit.rain === 'high' ? 'Typically rainier.' : hit.rain === 'low' ? 'Typically drier.' : 'A shoulder month — mixed rain.'
  return `${hit.id[0].toUpperCase()}${hit.id.slice(1)}: ${rain} ${hit.note}`
}

export function planDays(days: number): string {
  const n = Math.max(2, Math.min(14, Math.round(days)))
  if (n <= 3) {
    return [
      `${n} days is a Kigali chapter, not the whole country.`,
      'Day 1: land, Nyamirambo walk, ridge sunset, early night.',
      'Day 2: Kigali Genocide Memorial in the morning. Inema or Kimironko after. Long table.',
      n === 3 ? 'Day 3: a city extra (Imigongo, market, jazz) or a slow café and the airport.' : '',
      'Do not bolt a gorilla dawn onto a two-night trip unless you already hold a permit and sleep in Musanze.',
    ]
      .filter(Boolean)
      .join('\n')
  }
  if (n <= 5) {
    return [
      `${n} days can hold Kigali plus one gorilla morning if the permit is real.`,
      'Day 1: Kigali ridges and food.',
      'Day 2: memorial morning, then drive north to Musanze.',
      'Day 3: gorilla trek. Quiet afternoon.',
      n >= 5 ? 'Days 4–5: twin lakes or a second north-park walk, then return to Kigali.' : 'Day 4: return to Kigali.',
      'Hamwe’s Kigali First Circle (4 days) and Akagera Wild Circle (5 days) sit in this length if you prefer savannah to volcanoes.',
    ].join('\n')
  }
  if (n <= 8) {
    return [
      `${n} days is the classic: Kigali, gorillas, then Lake Kivu as the exhale.`,
      'Days 1–2: Kigali (memorial on a morning with sleep in it).',
      'Days 3–4: Musanze and the gorilla hour. Optional golden monkeys.',
      `Days 5–${Math.min(n, 7)}: Rubavu or Karongi. Coffee cooperative. Swim. Lamp boat.`,
      n === 8 ? 'Day 8: road back to Kigali.' : '',
      'This shape is Virunga Dawn Circle (8 days) or Kivu Shore Cohort (6 days) depending how much lake you want.',
    ]
      .filter(Boolean)
      .join('\n')
  }
  return [
    `${n} days can walk the country in order: hills, volcanoes, inland sea, then forest or savannah.`,
    'Kigali 2 nights → Volcanoes 2–3 → Kivu 2 → Nyungwe 2 or Akagera 2 → Kigali out.',
    'Do not stack chimps and gorillas on consecutive dawns. Put Kivu between them.',
    'Hamwe’s Canopy & Kingdom (9 days) or The Full Gathering (12 days) already hold this map, permits included when a trek is listed.',
  ].join('\n')
}

export function extractDays(query: string): number | null {
  const match = query.match(/(\d+)\s*(?:-|\s)?\s*(?:day|days|nights|night)/i)
  if (match) return Number(match[1])
  if (/\ba week\b|\b7 days\b/i.test(query)) return 7
  if (/\btwo weeks\b/i.test(query)) return 12
  if (/\blong weekend\b/i.test(query)) return 3
  return null
}

export function runTool(name: string, query: string): string {
  if (name === 'desk_hours') return deskBrief()
  if (name === 'hamwe_catalog') return hamweCatalog(query)
  if (name === 'phrasebook') return phrasebook(query)
  if (name === 'plan_days') {
    const days = extractDays(query) ?? 5
    return planDays(days)
  }
  const cards = searchKnowledge(query)
  return cards.map((card) => `${card.hook} ${card.claims.slice(0, 2).join(' ')}`).join('\n')
}

export function chooseTools(query: string): string[] {
  const q = query.toLowerCase()
  const tools: string[] = []
  if (/hour|open|closed|office|desk|weekend|contact|phone|email/.test(q)) tools.push('desk_hours')
  if (/hamwe|tour|seat|ticket|circle|fare|momo|permit|membership|depart|price|cost|extra/.test(q)) {
    tools.push('hamwe_catalog')
  }
  if (/kinyarwanda|rwandan word|how do you say|translate/.test(q)) tools.push('phrasebook')
  if (extractDays(q) || /how many days|itinerary|plan .*day|schedule|route/.test(q)) tools.push('plan_days')
  tools.push('rwanda_knowledge')
  return [...new Set(tools)]
}
