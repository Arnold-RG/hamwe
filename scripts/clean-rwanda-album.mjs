import { writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import catalog from '../src/data/rwanda-album.json' with { type: 'json' }

const RW =
  /rwanda|rwandan|kigali|kivu|nyungwe|akagera|musanze|ruhengeri|gisenyi|rubavu|huye|butare|nyanza|muhanga|gitarama|karongi|kibuye|rusizi|cyangugu|rwamagana|intore|kagame|rwandair|amahoro|virunga|bisoke|sabyinyo|karisimbi|kinigi|nyamirambo|inyambo|imigongo|nyabarongo|muhazi|ihema|burera|ruhondo|bk arena|rebero|kimironko|gicumbi|nyagatare|bugesera|kinigi|ikibuye/i
const DROP =
  /displaced|refugee|nyanzale|tenerife|lebanon|henan|warring states|bronze|spear|halberd|south africa|nigeria|nairobi|kampala|foggy-sunrise-rwanda\.ngsversion/i

const photos = catalog.photos.filter((photo) => {
  const blob = `${photo.title} ${photo.commons}`
  if (DROP.test(blob)) return false
  return RW.test(blob)
})

const counts = {}
for (const photo of photos) counts[photo.topic] = (counts[photo.topic] || 0) + 1
console.log('kept', photos.length, counts)

await writeFile(
  new URL('../src/data/rwanda-album.json', import.meta.url),
  JSON.stringify({ generated: catalog.generated, count: photos.length, photos }, null, 2),
)

const UA = 'HamweVisitRwanda/1.0 (https://arnold-rg.github.io/hamwe/; circle@hamwe.rw)'
const picks = {
  'kigali.jpg':
    photos.find((photo) => /aerial of kigali convention/i.test(photo.title)) ||
    photos.find((photo) => /buildings in kigali cbd/i.test(photo.title)) ||
    photos.find((photo) => /building in kigali, rwanda$/i.test(photo.title)),
  'cohort.jpg':
    photos.find((photo) => /batwa people in rwanda in the village of kiguri/i.test(photo.title) && !/cropped/i.test(photo.title)) ||
    photos.find((photo) => /happy people practicing sport/i.test(photo.title)),
  'atlas-rwanda.jpg':
    photos.find((photo) => /^Hills of Rwanda 01$/i.test(photo.title)) ||
    photos.find((photo) => /green hills in rwanda/i.test(photo.title)),
  'dinner.jpg':
    photos.find((photo) => /banana, on of the rwandan/i.test(photo.title)) ||
    photos.find((photo) => /rwandan local food/i.test(photo.title)),
}

for (const [file, photo] of Object.entries(picks)) {
  console.log(file, '->', photo?.title)
  if (!photo) continue
  const res = await fetch(photo.src, { headers: { 'User-Agent': UA } })
  if (!res.ok || !res.body) continue
  await pipeline(Readable.fromWeb(res.body), createWriteStream(new URL(`../public/images/${file}`, import.meta.url)))
}
