import { GISUBIZO_PROMPTS, type KnowledgeCard } from './knowledge'
import { matchQA, relatedQuestions, shufflePrompts } from './qa'
import {
  chooseTools,
  deskBrief,
  extractDays,
  hamweCatalog,
  monthBrief,
  phrasebook,
  pickClaims,
  planDays,
  searchKnowledge,
  tokens,
} from './mcp'

export interface GisubizoTurn {
  role: 'user' | 'gisubizo'
  text: string
}

export interface GisubizoReply {
  text: string
  followups: string[]
  tools: string[]
}

type Intent =
  | 'greet'
  | 'thanks'
  | 'compare'
  | 'plan'
  | 'phrases'
  | 'pack'
  | 'hours'
  | 'catalog'
  | 'list'
  | 'cost'
  | 'yesno'
  | 'how'
  | 'why'
  | 'when'
  | 'explain'

const TOPIC_HINTS: { id: string; keys: string[] }[] = [
  { id: 'gorillas', keys: ['gorilla', 'virunga', 'volcanoes', 'permit', 'kinigi', 'musanze', 'trek'] },
  { id: 'chimps', keys: ['chimp', 'chimpanzee', 'chimps'] },
  { id: 'nyungwe', keys: ['nyungwe', 'canopy', 'forest'] },
  { id: 'akagera', keys: ['akagera', 'safari', 'lion', 'elephant', 'ihema'] },
  { id: 'kivu', keys: ['kivu', 'rubavu', 'gisenyi', 'karongi', 'kibuye'] },
  { id: 'kigali', keys: ['kigali', 'nyamirambo', 'kimironko', 'memorial'] },
  { id: 'memory', keys: ['genocide', 'memorial', 'kwibuka', '1994'] },
  { id: 'hamwe', keys: ['hamwe', 'circle', 'tour', 'ticket', 'seat'] },
  { id: 'money', keys: ['franc', 'rwf', 'momo', 'money', 'price', 'cost', 'expensive'] },
  { id: 'language', keys: ['kinyarwanda', 'muraho', 'hello', 'words'] },
  { id: 'pack', keys: ['pack', 'packing', 'bring', 'wear', 'boots'] },
]

function detectTopics(text: string): string[] {
  const q = text.toLowerCase()
  return TOPIC_HINTS.filter((topic) => topic.keys.some((key) => q.includes(key))).map((topic) => topic.id)
}

function resolveQuery(query: string, history: GisubizoTurn[]): string {
  const trimmed = query.trim()
  const intent = intentOf(trimmed)
  if (['pack', 'phrases', 'plan', 'hours', 'when', 'compare'].includes(intent)) return trimmed

  const words = tokens(trimmed)
  const followOn = /^(and|also|what about|how about|same for|compared to|vs\.?|versus)\b/i.test(trimmed)
  const short = words.length <= 3
  if (!history.length || (!followOn && !short)) return trimmed
  if (detectTopics(trimmed).length) return trimmed

  const lastUser = [...history].reverse().find((line) => line.role === 'user')
  const lastBot = [...history].reverse().find((line) => line.role === 'gisubizo')
  const priorTopics = detectTopics(`${lastUser?.text ?? ''} ${lastBot?.text ?? ''}`)
  if (!priorTopics.length) return trimmed
  return `${trimmed} (follow-up about ${priorTopics.join(' and ')})`
}

function intentOf(query: string): Intent {
  const q = query.toLowerCase().trim()
  if (!q || /^(hi|hello|hey|muraho|yo|good (morning|evening|afternoon))\b/.test(q)) return 'greet'
  if (/thank|murakoze|thanks/.test(q)) return 'thanks'
  if (/\bvs\.?\b|versus|compar|difference|differ|or chimps?|gorillas? or/.test(q)) return 'compare'
  if (extractDays(q) || /how many days|itinerary|plan .*day|sketch .*day/.test(q)) return 'plan'
  if (/kinyarwanda|rwandan word|rwandan phrase|how do you say|translate/.test(q)) return 'phrases'
  if (/pack|bring|wear|what should i take/.test(q)) return 'pack'
  if (/hour|open|closed|office|desk|weekend/.test(q)) return 'hours'
  if (/which (tour|circle)|hamwe|membership|permit included|momo|ticket/.test(q)) return 'catalog'
  if (/how much|price|cost|expensive|budget|fare/.test(q)) return 'cost'
  if (/^(is|are|can|do|does|should|will)\b/.test(q) || /\?$/.test(q) && /safe|included|need|allowed/.test(q)) return 'yesno'
  if (/why\b/.test(q)) return 'why'
  if (/when\b|best time|which month/.test(q)) return 'when'
  if (/list|what (animals|food|words|rules)|which animals/.test(q)) return 'list'
  if (/how\b/.test(q)) return 'how'
  return 'explain'
}

function greeting(): GisubizoReply {
  return {
    text: 'Hello. I am Gisubizo, Hamwe’s Rwanda desk. I answer in English only, with facts about Rwanda and this company. Ask a clear question — you can also tap one of the prompts.',
    followups: shufflePrompts(6),
    tools: [],
  }
}

function uniqueFollowups(asked: string, cards: KnowledgeCard[], extras: string[] = []): string[] {
  const askedKey = asked.toLowerCase()
  const pool = [...extras, ...cards.flatMap((card) => card.followups), ...GISUBIZO_PROMPTS]
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of pool) {
    const key = item.toLowerCase()
    if (seen.has(key) || askedKey.includes(key) || key.includes(askedKey.slice(0, 24))) continue
    seen.add(key)
    out.push(item)
    if (out.length === 4) break
  }
  return out
}

function compareTopics(query: string): GisubizoReply | null {
  const q = query.toLowerCase()
  const gorillaChimp = /gorilla/.test(q) && /chimp/.test(q)
  const forestSavannah = /nyungwe|forest/.test(q) && /akagera|safari/.test(q)
  const kivuKigali = /kivu/.test(q) && /kigali/.test(q)

  if (gorillaChimp) {
    return {
      text: [
        'They are different mornings in different parks — do not treat chimps as cheaper gorillas.',
        'Gorillas: Volcanoes National Park, north, one habituated family, one still hour, steep mud, usual age 15+, scarce expensive permit (already in Hamwe fares that list a trek).',
        'Chimpanzees: Nyungwe forest, south-west, a faster search at dawn, denser trees, a separate permit, less of a portrait, more of a chase.',
        'Put Lake Kivu between those days. Same-day stacking is how people remember only the car.',
      ].join('\n\n'),
      followups: [
        'How do gorilla treks work?',
        'What is the Nyungwe canopy walk like?',
        'Plan 8 days in Rwanda',
        'Which Hamwe tour includes gorillas?',
      ],
      tools: ['rwanda_knowledge', 'hamwe_catalog'],
    }
  }

  if (forestSavannah) {
    return {
      text: [
        'Nyungwe is rainforest; Akagera is lakes and savannah. They answer different hungers.',
        'Choose Nyungwe for chimps, colobus, tea, and the canopy walk in cool air.',
        'Choose Akagera for lion, elephant, rhino, a boat on Ihema, and warmer, drier game-drive hours.',
        'A 12-day Full Gathering can hold both. A 5-day trip should pick one and stop pretending otherwise.',
      ].join('\n\n'),
      followups: ['Which animals live in Akagera?', 'Tell me about Nyungwe', 'How many days do I need?'],
      tools: ['rwanda_knowledge'],
    }
  }

  if (kivuKigali) {
    return {
      text: [
        'Kigali teaches the hills and the memorial. Kivu is where the circle exhales.',
        'Start in the capital. Give the genocide memorial a morning with sleep in it. Then let the western lake be swimming, coffee, and a slower table — not day one.',
      ].join('\n\n'),
      followups: ['What should I do on day one?', 'Tell me about Lake Kivu', 'How should I visit the memorial?'],
      tools: ['rwanda_knowledge'],
    }
  }

  return null
}

function leadFor(intent: Intent, query: string, primary?: KnowledgeCard): string {
  if (intent === 'plan' || intent === 'phrases' || intent === 'hours') return ''
  if (intent === 'when') {
    const month = monthBrief(query)
    if (month) return month
    return primary?.hook ?? 'Time of year in Rwanda is mud versus crowds — not a closed season.'
  }
  if (intent === 'yesno') {
    if (/safe/.test(query.toLowerCase())) {
      return 'Yes — with ordinary sense. Rwanda is one of the more orderly countries in the region, not a spell against pickpockets or bad roads after rain.'
    }
    if (/permit included/.test(query.toLowerCase()) || /gorilla permit/.test(query.toLowerCase())) {
      return 'When a Hamwe trek is listed on the tour, the gorilla permit is already in the fare.'
    }
    if (/visa/.test(query.toLowerCase())) {
      return 'Often yes — many passports use visa on arrival or an e-visa. Check Irembo for your nationality; do not trust a 2019 blog.'
    }
    if (/kids|children|child/.test(query.toLowerCase()) && /gorilla/.test(query.toLowerCase())) {
      return 'Not under 15. Gorilla day has a usual age minimum; younger travellers stay in Musanze.'
    }
    if (/expensive/.test(query.toLowerCase())) {
      return 'Street Rwanda is modest. Hamwe fares run from FRw 8,000 to FRw 80,000. Luxury packages sit at FRw 80,000 — nothing on this site costs more.'
    }
    if (/momo/.test(query.toLowerCase())) {
      return 'Yes. MTN MoMo is how much of the country pays, and Hamwe checkout can take a Rwanda 07… number (this build is a demo).'
    }
  }
  if (intent === 'pack') return 'Pack for hills and forest, not a beach.'
  if (intent === 'how' || intent === 'explain' || intent === 'list' || intent === 'cost') {
    return primary?.hook ?? ''
  }
  return ''
}

function bullets(lines: string[]): string {
  return lines.map((line) => `· ${line.replace(/^[·\-]\s*/, '')}`).join('\n')
}

function composeBody(intent: Intent, query: string, cards: KnowledgeCard[], tools: string[]): string {
  const focused = cards.slice(0, 1)
  const claims = pickClaims(focused.length ? focused : cards, query, intent === 'list' || intent === 'pack' ? 6 : 4)

  if (intent === 'phrases' || tools.includes('phrasebook')) {
    return `English explanations of common Kinyarwanda words:\n${bullets(phrasebook(query).split('\n'))}\n\nEnglish is enough in Kigali and on Hamwe tours. Gisubizo replies in English only.`
  }

  if (intent === 'plan' || tools.includes('plan_days')) {
    const days = extractDays(query) ?? 5
    return planDays(days)
  }

  if (intent === 'hours' || tools.includes('desk_hours')) {
    return `${deskBrief()}\n\n${claims.slice(0, 2).join(' ')}`.trim()
  }

  if (intent === 'pack') {
    const packCard = cards.find((card) => card.id === 'pack') ?? searchKnowledge('packing clothes boots rain', 1)[0]
    const extras = pickClaims(
      cards.filter((card) => card.id !== 'pack'),
      `${query} rain gloves boots layers`,
      2,
    ).filter((claim) => /glove|boots|rain trousers|sock|rain shell|adapter|plastic bag|daypack|perfume|nettle/i.test(claim))
    return bullets([...(packCard?.claims ?? []), ...extras].slice(0, 7))
  }

  if (intent === 'list') {
    return bullets(claims)
  }

  if (intent === 'catalog' || (intent === 'cost' && tools.includes('hamwe_catalog'))) {
    const catalog = hamweCatalog(query)
    const head = claims.slice(0, 2).join(' ')
    return [head, catalog].filter(Boolean).join('\n\n')
  }

  if (intent === 'cost') {
    const catalog = tools.includes('hamwe_catalog') ? hamweCatalog(query) : ''
    return [claims.join(' '), catalog].filter(Boolean).join('\n\n')
  }

  return claims.join(' ')
}

function closeFor(intent: Intent, tools: string[]): string {
  if (intent === 'plan') return 'If you want the map walked for you, pick a dated Hamwe circle instead of inventing transfers.'
  if (intent === 'hours') return 'Boarding a circle is separate from the doorbell — seats can still show open on a Sunday.'
  if (tools.includes('hamwe_catalog') && intent !== 'catalog') {
    return 'Ask for a named tour if you want dates and francs for a real seat.'
  }
  return ''
}

export function askGisubizo(query: string, history: GisubizoTurn[] = []): GisubizoReply {
  const raw = query.trim()
  const intent = intentOf(raw)
  if (intent === 'greet') return greeting()
  if (intent === 'thanks') {
    return {
      text: 'You are welcome. Ask another Rwanda or Hamwe question whenever you want.',
      followups: shufflePrompts(4),
      tools: [],
    }
  }

  const resolved = resolveQuery(raw, history)
  const matched = matchQA(resolved) ?? matchQA(raw)
  if (matched) {
    return {
      text: matched.a,
      followups: relatedQuestions(matched, raw),
      tools: ['rwanda_knowledge'],
    }
  }
  if (intent === 'compare') {
    const compared = compareTopics(resolved)
    if (compared) return compared
  }

  const tools = chooseTools(resolved)
  const cards = searchKnowledge(resolved, 4)
  const month = monthBrief(resolved)

  if (!cards.length && !tools.filter((name) => name !== 'rwanda_knowledge').length) {
    return {
      text: 'I only answer Rwanda and Hamwe questions in English. Try the capital, gorilla trekking, visas, Hamwe circles, office hours, or tap a prompt below.',
      followups: GISUBIZO_PROMPTS.slice(0, 4),
      tools,
    }
  }

  const primary = cards[0]
  const lead = month && intent !== 'when' ? `${leadFor(intent, resolved, primary)}\n\n${month}` : leadFor(intent, resolved, primary)
  const body = composeBody(intent, resolved, cards, tools)
  const close = closeFor(intent, tools)

  const parts = [lead, body, close]
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part, index, all) => index === 0 || part !== all[index - 1])

  // Avoid repeating the hook if the body already starts with it.
  const text = parts
    .filter((part, index) => index === 0 || !part.startsWith(parts[0].slice(0, 40)))
    .join('\n\n')

  return {
    text: text.trim(),
    followups: uniqueFollowups(
      raw,
      cards,
      intent === 'plan' ? ['Which Hamwe tour includes gorillas?', 'What should I pack?'] : [],
    ),
    tools,
  }
}
