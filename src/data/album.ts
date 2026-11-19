import catalog from './rwanda-album.json' with { type: 'json' }
import { asset } from '../lib/asset'
import type { AlbumPhoto } from '../types'

export const rwandaAlbum = (catalog.photos as AlbumPhoto[]).map((photo) => ({
  ...photo,
  src: asset(photo.src),
  full: asset(photo.full || photo.src),
}))

const TOPIC_ORDER = [
  'kigali',
  'cities',
  'hills',
  'mountains',
  'lakes',
  'rivers',
  'wildlife',
  'people',
  'dance',
  'culture',
  'aviation',
  'transport',
  'hotels',
  'stadiums',
  'gardens',
  'weddings',
  'president',
  'soldiers',
  'police',
] as const

export const albumTopics = [
  { id: 'all', label: 'All' },
  ...TOPIC_ORDER.map((id) => {
    const hit = rwandaAlbum.find((photo) => photo.topic === id)
    return { id, label: hit?.topicLabel ?? id }
  }),
]

export const album: AlbumPhoto[] = TOPIC_ORDER.flatMap((topic) => {
  const match = rwandaAlbum.find((photo) => photo.topic === topic)
  return match ? [match] : []
})
