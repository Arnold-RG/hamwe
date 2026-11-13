import { writeFile } from 'node:fs/promises'
import catalog from '../src/data/rwanda-album-full.json' with { type: 'json' }

const picks = [
  { topic: 'kigali', title: 'Kigali', place: 'Kigali', match: /^An aerial of Kigali Convention Center on June 19, 2019/i },
  { topic: 'cities', title: 'Musanze', place: 'Musanze', match: /^INES Ruhengeri Campus with Mount Muhabura, Musanze, Rwanda$/i },
  { topic: 'cities', title: 'Huye', place: 'Huye', match: /^Butare$/i },
  { topic: 'cities', title: 'Rubavu', place: 'Rubavu', match: /^A clear warm afternoon at Gisenyi Serena hotel$/i },
  { topic: 'cities', title: 'Nyanza', place: 'Nyanza', match: /^Gate to the King's palace Rwanda$/i },
  { topic: 'cities', title: 'Muhanga', place: 'Muhanga', match: /^Cathedral Basilica of Our Lady at Kabgayi - Outside Muhanga-Gitarama - Rwanda$/i },
  { topic: 'cities', title: 'Rwamagana', place: 'Rwamagana', match: /^Agriculture in Rwamagana Province$/i },
  { topic: 'cities', title: 'Rusizi', place: 'Rusizi', match: /^Loading Boats in Port - Cyangugu \(Rusizi\) - Rwanda/i },
  { topic: 'hills', title: 'Tea hills', place: 'Western Province', match: /^Green tea Rwanda$/i },
  { topic: 'hills', title: 'Western hills', place: 'Gaseke', match: /Gaseke 6h \(cropped 2\)/i },
  { topic: 'hills', title: 'Hills above Kivu', place: 'Karongi', match: /^Scenery in Hills above Lake Kivu - Near Karongi-Kibuye - Western Rwanda - 01$/i },
  { topic: 'mountains', title: 'Bisoke crater', place: 'Volcanoes National Park', match: /^Bisoke Crater Lake in Volcanoes National Park, Rwanda$/i },
  { topic: 'mountains', title: 'Mount Bisoke', place: 'Virunga', match: /^Bisoke Volcano$/i },
  { topic: 'mountains', title: 'Mount Muhabura', place: 'Musanze', match: /^Muhabura volcano located at Musanze District$/i },
  { topic: 'mountains', title: 'Virunga lodge', place: 'Volcanoes', match: /virunga lodge aerila/i },
  { topic: 'lakes', title: 'Lake Kivu', place: 'Karongi', match: /^Karongi District Rwanda-Kivu view$/i },
  { topic: 'lakes', title: 'Kivu island', place: 'Lake Kivu', match: /^Island in Lake Kivu - Near Kibuye \(Karongi\) - Rwanda/i },
  { topic: 'lakes', title: 'Lake Burera', place: 'Lake Burera', match: /^Beautiful view of the lake burera$/i },
  { topic: 'lakes', title: 'Lake Muhazi', place: 'Lake Muhazi', match: /^Beauty of Muhazi Lake$/i },
  { topic: 'lakes', title: 'Lake Ruhondo', place: 'Lake Ruhondo', match: /^Barrage of Ruhondo$/i },
  { topic: 'rivers', title: 'Nyabarongo', place: 'Nyabarongo River', match: /^A view of Nyabarongo river$/i },
  { topic: 'rivers', title: 'Akagera river', place: 'Akagera', match: /^An aerial of Nyabarongo River from Nyungwe National Park to River Nile/i },
  { topic: 'wildlife', title: 'Mountain gorilla', place: 'Volcanoes National Park', match: /^Mother and baby mountain gorillas\. Volcanoes National Park, Rwanda \(8159409698\)$/i },
  { topic: 'wildlife', title: 'Akagera giraffe', place: 'Akagera', match: /girraffe in akagera/i },
  { topic: 'wildlife', title: 'Golden monkey', place: 'Nyungwe', match: /^Golden monkey in Nyungwe forest$/i },
  { topic: 'people', title: 'On the trail', place: 'Congo Nile Trail', match: /^A visit to the Batwa people in Rwanda in the village of Kiguri on the Congo Nile Trail$/i },
  { topic: 'people', title: 'Rwandans', place: 'Huye', match: /happy people practicing sport/i },
  { topic: 'dance', title: 'Intore', place: 'Traditional dance', match: /^Dance traditionnelle au Rwanda$/i },
  { topic: 'culture', title: 'Imigongo', place: 'Rwanda', match: /fresque imigongo-festival international de géographie 2011 \(2\)/i },
  { topic: 'culture', title: 'Inyambo', place: 'Nyanza', match: /^Inyambo \(1\)$/i },
  { topic: 'culture', title: 'Kigali Memorial', place: 'Gisozi', match: /genocide memorial site of gisozi kigali genocide memorial 001/i },
  { topic: 'aviation', title: 'RwandAir', place: 'RwandAir', match: /^RwandAir A330-343, 9XR-WP, MSN 1759/i },
  { topic: 'transport', title: 'Moto-taxi', place: 'Kigali', match: /motorist carries a passenger amid a beautiful sunset in the sky of kigali on august 12/i },
  { topic: 'transport', title: 'Kigali bus', place: 'Kigali', match: /^Bus transport in Rwanda$/i },
  { topic: 'hotels', title: 'Mille Collines', place: 'Kigali', match: /^Facade of Hotel des Mille Collines/i },
  { topic: 'stadiums', title: 'Amahoro Stadium', place: 'Kigali', match: /^Amahoro National Stadium$/i },
  { topic: 'gardens', title: 'Ruhande arboretum', place: 'Huye', match: /^Arboretum of Ruhande in Rwanda$/i },
  { topic: 'gardens', title: 'Hotel garden', place: 'Kigali', match: /garden of the Hotel des Mille Collines - Kigali$/i },
  { topic: 'weddings', title: 'Traditional wedding', place: 'Rwanda', match: /^Bride in Rwanda traditional wedding$/i },
  { topic: 'president', title: 'Paul Kagame', place: 'Republic of Rwanda', match: /^Paul Kagame 2024 \(cropped\)$/i },
  { topic: 'soldiers', title: 'Rwanda Defence Force', place: 'RDF', match: /^Rwanda Defense Force$/i },
  { topic: 'police', title: 'Rwanda National Police', place: 'RNP', match: /^Rwanda National Police$/i },
  { topic: 'culture', title: 'Coffee', place: 'Rwamagana', match: /^NP Rwanda Coffee5/i },
  { topic: 'hills', title: 'Nyungwe tea', place: 'Nyungwe', match: /^Tea pickers work the slopes on the edge of Nyungwe National Park in Rwanda$/i },
  { topic: 'wildlife', title: 'Akagera', place: 'Akagera National Park', match: /^Akagera$/i },
  { topic: 'lakes', title: 'Kivu trees', place: 'Lake Kivu', match: /^Lake Kivu \(Karongi\) with beautiful long trees surrounding the lake\. Gisenyi, Rwanda$/i },
  { topic: 'rivers', title: 'A river', place: 'Rwanda', match: /^A river in Rwanda/i },
  { topic: 'transport', title: 'Kivu road', place: 'Western Province', match: /^A Kivu belt Road in Rutsiro District/i },
  { topic: 'cities', title: 'Karongi', place: 'Karongi', match: /^Boats on Shore - Kibuye \(Karongi\) - Rwanda/i },
  { topic: 'culture', title: 'Royal cattle', place: 'Nyanza', match: /^King of Rwanda's Inyambo cattle in Nyanza \(8\)$/i },
]

const labels = {
  kigali: 'Kigali',
  cities: 'Cities',
  hills: 'Hills',
  mountains: 'Mountains',
  lakes: 'Lakes',
  rivers: 'Rivers',
  wildlife: 'Wildlife',
  people: 'Rwandans',
  dance: 'Traditional dance',
  culture: 'Culture',
  aviation: 'RwandAir',
  transport: 'Transport',
  hotels: 'Hotels',
  stadiums: 'Stadiums',
  gardens: 'Gardens',
  weddings: 'Weddings',
  president: 'President',
  soldiers: 'Soldiers',
  police: 'Police',
}

const photos = []
for (const pick of picks) {
  const hit = catalog.photos.find((photo) => pick.match.test(photo.title))
  if (!hit) {
    console.log('MISSING', pick.title, String(pick.match))
    continue
  }
  photos.push({
    id: pick.topic + '-' + pick.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    src: hit.src,
    full: hit.full || hit.src,
    title: pick.title,
    place: pick.place,
    caption: pick.place,
    topic: pick.topic,
    topicLabel: labels[pick.topic],
    credit: hit.credit,
    commons: hit.commons,
  })
}

console.log('picked', photos.length)
await writeFile(new URL('../src/data/rwanda-album.json', import.meta.url), JSON.stringify({ count: photos.length, photos }, null, 2))
