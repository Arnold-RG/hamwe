/**
 * Pull real photographs of Rwanda from Wikimedia Commons.
 * Writes src/data/rwanda-album.json and a small set of local hero replacements.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const UA = 'HamweVisitRwanda/1.0 (https://arnold-rg.github.io/hamwe/; circle@hamwe.rw)'
const API = 'https://commons.wikimedia.org/w/api.php'
const SKIP =
  /flag of|coat of arms|locator map|blank map|outline map|svg|icon |logo of|signature of|stamp of|election|ballot|diagram|chart |wikidata|qr code|pdf/i

const TOPICS = [
  { id: 'dance', label: 'Traditional dance', place: 'Intore · Rwanda', searches: ['Intore dance Rwanda', 'traditional dance Rwanda', 'Umushagiriro Rwanda'] },
  { id: 'aviation', label: 'RwandAir', place: 'RwandAir · Kigali', searches: ['RwandAir aircraft', 'Kigali International Airport', 'RwandAir Boeing'] },
  { id: 'people', label: 'Rwandans', place: 'People of Rwanda', searches: ['People of Rwanda', 'Rwandan women', 'Rwandan children market'] },
  { id: 'kigali', label: 'Kigali', place: 'Kigali', searches: ['Kigali skyline', 'Kigali Convention Centre', 'Nyamirambo Kigali', 'Kigali city'] },
  { id: 'cities', label: 'Cities', place: 'Towns of Rwanda', searches: ['Musanze Rwanda', 'Huye Rwanda', 'Rubavu Rwanda', 'Nyanza Rwanda', 'Muhanga Rwanda', 'Rwamagana Rwanda', 'Karongi Rwanda', 'Rusizi Rwanda'] },
  { id: 'hills', label: 'Hills', place: 'Thousand hills', searches: ['terraces Rwanda', 'hills of Rwanda', 'tea plantation Rwanda'] },
  { id: 'mountains', label: 'Mountains', place: 'Virunga · Volcanoes', searches: ['Volcanoes National Park Rwanda', 'Mount Bisoke', 'Mount Sabyinyo', 'Virunga Rwanda'] },
  { id: 'rivers', label: 'Rivers', place: 'Rivers of Rwanda', searches: ['Nyabarongo River', 'Akagera River', 'river Rwanda'] },
  { id: 'lakes', label: 'Lakes', place: 'Lakes of Rwanda', searches: ['Lake Kivu Rwanda', 'Lake Muhazi', 'Lake Ihema', 'Lake Burera', 'Lake Ruhondo'] },
  { id: 'president', label: 'President', place: 'Republic of Rwanda', searches: ['Paul Kagame', 'President of Rwanda'] },
  { id: 'soldiers', label: 'Soldiers', place: 'Rwanda Defence Force', searches: ['Rwanda Defence Force', 'RDF soldiers Rwanda', 'Rwandan army'] },
  { id: 'police', label: 'Police', place: 'Rwanda National Police', searches: ['Rwanda National Police', 'police Rwanda Kigali'] },
  { id: 'weddings', label: 'Weddings', place: 'Ceremonies', searches: ['wedding Rwanda', 'traditional wedding Rwanda', 'gusaba Rwanda'] },
  { id: 'gardens', label: 'Gardens', place: 'Gardens · parks', searches: ['garden Kigali', 'Kigali park', 'arboretum Rwanda', 'botanical Rwanda'] },
  { id: 'transport', label: 'Transport', place: 'Roads · vehicles', searches: ['bus Rwanda', 'motorcycle taxi Rwanda', 'taxi Kigali', 'minibus Rwanda'] },
  { id: 'stadiums', label: 'Stadiums', place: 'Amahoro · BK Arena', searches: ['Amahoro Stadium', 'BK Arena Kigali', 'stadium Rwanda'] },
  { id: 'hotels', label: 'Hotels', place: 'Hotels of Rwanda', searches: ['hotel Kigali', 'Serena Kigali', 'hotel Lake Kivu', 'lodge Volcanoes Rwanda'] },
  { id: 'wildlife', label: 'Wildlife', place: 'Parks of Rwanda', searches: ['mountain gorilla Rwanda', 'Akagera National Park', 'Nyungwe chimpanzee', 'golden monkey Rwanda'] },
  { id: 'culture', label: 'Culture', place: 'Craft · memorial', searches: ['Imigongo Rwanda', 'Kigali Genocide Memorial', 'King Palace Nyanza', 'Inyambo cattle'] },
]

const LOCAL_HEROES = [
  { file: 'hero-hills.jpg', search: 'terraced hills Rwanda', name: 'hero-hills' },
  { file: 'kigali.jpg', search: 'Kigali Convention Centre', name: 'kigali' },
  { file: 'gorilla-volcanoes.jpg', search: 'mountain gorilla Volcanoes National Park Rwanda', name: 'gorilla-volcanoes' },
  { file: 'lake-kivu.jpg', search: 'Lake Kivu Rwanda shoreline', name: 'lake-kivu' },
  { file: 'nyungwe.jpg', search: 'Nyungwe Forest canopy', name: 'nyungwe' },
  { file: 'akagera.jpg', search: 'Akagera National Park wildlife', name: 'akagera' },
  { file: 'cohort.jpg', search: 'people walking Rwanda village', name: 'cohort' },
  { file: 'coffee.jpg', search: 'coffee Rwanda cooperative', name: 'coffee' },
  { file: 'dinner.jpg', search: 'market food Kigali Rwanda', name: 'dinner' },
  { file: 'imigongo.jpg', search: 'Imigongo Rwanda', name: 'imigongo' },
  { file: 'nyanza.jpg', search: 'Nyanza Rwanda palace', name: 'nyanza' },
  { file: 'atlas-rwanda.jpg', search: 'landscape Rwanda hills aerial', name: 'atlas-rwanda' },
]

async function api(params) {
  const url = new URL(API)
  url.search = new URLSearchParams({ format: 'json', origin: '*', ...params }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function searchFiles(query, limit = 80) {
  const titles = []
  let offset = 0
  while (titles.length < limit) {
    const data = await api({
      action: 'query',
      list: 'search',
      srsearch: query,
      srnamespace: '6',
      srlimit: String(Math.min(50, limit - titles.length)),
      sroffset: String(offset),
    })
    const hits = data.query?.search ?? []
    if (!hits.length) break
    for (const hit of hits) titles.push(hit.title)
    if (!data.continue?.sroffset) break
    offset = Number(data.continue.sroffset)
    await wait(120)
  }
  return titles
}

async function fileInfo(titles) {
  const out = []
  for (let i = 0; i < titles.length; i += 40) {
    const chunk = titles.slice(i, i + 40)
    const data = await api({
      action: 'query',
      titles: chunk.join('|'),
      prop: 'imageinfo',
      iiprop: 'url|mime|size|extmetadata',
      iiurlwidth: '1400',
    })
    const pages = Object.values(data.query?.pages ?? {})
    for (const page of pages) {
      const info = page.imageinfo?.[0]
      if (!info) continue
      if (!/^image\/(jpeg|png|webp)$/i.test(info.mime || '')) continue
      if ((info.width || 0) < 500 || (info.height || 0) < 360) continue
      const title = String(page.title || '').replace(/^File:/, '')
      if (SKIP.test(title)) continue
      const meta = info.extmetadata || {}
      const artist = strip(meta.Artist?.value || 'Wikimedia Commons')
      const license = strip(meta.LicenseShortName?.value || 'CC')
      out.push({
        title,
        src: info.thumburl || info.url,
        full: info.url,
        width: info.width,
        height: info.height,
        artist,
        license,
        commons: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replaceAll(' ', '_'))}`,
      })
    }
    await wait(80)
  }
  return out
}

function strip(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok || !res.body) throw new Error(`download ${res.status} ${url}`)
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest))
}

const seen = new Set()
const album = []

for (const topic of TOPICS) {
  for (const query of topic.searches) {
    process.stdout.write(`search ${query}\n`)
    const titles = await searchFiles(query, 70)
    const files = await fileInfo(titles)
    for (const file of files) {
      const key = file.title.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      album.push({
        id: `${topic.id}-${slug(file.title)}`,
        src: file.src,
        title: file.title.replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' '),
        place: topic.place,
        caption: `Real photograph. ${file.artist}. ${file.license}.`,
        topic: topic.id,
        topicLabel: topic.label,
        credit: `${file.artist} · ${file.license}`,
        commons: file.commons,
        full: file.full,
      })
    }
  }
}

album.sort((a, b) => a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title))

await mkdir(path.join(ROOT, 'src/data'), { recursive: true })
await writeFile(
  path.join(ROOT, 'src/data/rwanda-album.json'),
  JSON.stringify({ generated: new Date().toISOString(), count: album.length, photos: album }, null, 2),
)
process.stdout.write(`catalog ${album.length} photos\n`)

const localDir = path.join(ROOT, 'public/images')
for (const hero of LOCAL_HEROES) {
  const titles = await searchFiles(hero.search, 12)
  const files = await fileInfo(titles)
  const pick = files.find((file) => file.width >= 1000) || files[0]
  if (!pick) {
    process.stdout.write(`skip local ${hero.file}\n`)
    continue
  }
  const dest = path.join(localDir, hero.file)
  await download(pick.src, dest)
  process.stdout.write(`saved ${hero.file} <- ${pick.title}\n`)
  await wait(200)
}
