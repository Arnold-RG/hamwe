import { asset } from './lib/asset'
import type { Activity, DailyBudget, Destination, FaqItem, MembershipPlan, Tour, TravelerPreview } from './types'
import { fareFromRwf, ticketFromRwf, LUXURY_PACKAGE_RWF } from './lib/format'

export const BRAND = 'Hamwe'
export const TAGLINE = 'Arrive as strangers. Walk Rwanda as a circle.'

export const travelers: TravelerPreview[] = []

export const tours: Tour[] = [
  {
    id: 'tour-gathering',
    slug: 'full-rwanda-gathering',
    name: 'The Full Gathering',
    tagline: 'Luxury package. Twelve days. One small circle. The country, walked in order.',
    durationDays: 12,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-10-14',
    priceUsd: fareFromRwf(LUXURY_PACKAGE_RWF),
    seatsTotal: 14,
    seatsTaken: 0,
    difficulty: 'moderate',
    region: 'Countrywide',
    cohortName: 'October Circle',
    luxury: true,
    image: asset('/images/cohort.jpg'),
    gallery: [asset('/images/kigali.jpg'), asset('/images/gorilla-volcanoes.jpg'), asset('/images/lake-kivu.jpg'), asset('/images/nyungwe.jpg')],
    highlights: [
      'Gorilla trek in Volcanoes National Park',
      'Lake Kivu nights and coffee cooperatives',
      'Nyungwe canopy + chimpanzee morning',
      'Akagera game drive and Lake Ihema',
      'Kigali memorial, markets, and farewell table',
    ],
    includes: [
      'All lodges and park fees, including gorilla permit',
      'Private circle vehicle and bilingual host',
      'Breakfasts, most lunches, four communal dinners',
      'Pre-departure circle call two weeks before',
      'Airport welcome in Kigali',
    ],
    itinerary: [
      {
        day: 1,
        title: 'The hill city',
        location: 'Kigali',
        summary:
          'Land, drop bags, walk Nyamirambo with a local guide. Sunset from Rebero so the map of hills sits in your body before the itinerary does.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Memory, then making',
        location: 'Kigali',
        summary:
          'Morning at the Kigali Genocide Memorial. Afternoon at Inema Arts and Kimironko market. The circle eats together and learns each other’s names for real.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 3,
        title: 'North to the volcanoes',
        location: 'Musanze',
        summary:
          'Drive the thousand hills to Musanze. Twin lakes walk. Briefing for the gorilla day. Early night.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 4,
        title: 'Among the gorillas',
        location: 'Volcanoes National Park',
        summary:
          'Pre-dawn departure. One hour with a mountain gorilla family. The rest of the day is quiet on purpose.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 5,
        title: 'Culture on the lava',
        location: 'Iby’Iwacu · Musanze',
        summary:
          'Golden monkeys or a Dian Fossey hike, then Iby’Iwacu cultural village. Stories, dance, and a home lunch.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 6,
        title: 'The inland sea',
        location: 'Rubavu, Lake Kivu',
        summary:
          'West to Kivu. Swim, walk the lakeside, watch the fishermen’s lamps come on.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 7,
        title: 'Coffee and still water',
        location: 'Lake Kivu',
        summary:
          'Cooperative visit from cherry to cup. Free afternoon. Optional kayak. Circle dinner on the terrace.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 8,
        title: 'South through tea',
        location: 'Nyungwe',
        summary:
          'Long beautiful drive through tea plantations into the rainforest. Lodge fire. Night sounds.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 9,
        title: 'Canopy and chimps',
        location: 'Nyungwe National Park',
        summary:
          'Canopy walkway at first light. Chimpanzee tracking or a waterfall hike. The forest does the talking.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 10,
        title: 'Kingdom roads',
        location: 'Huye · Nyanza',
        summary:
          'Ethnographic Museum in Huye, then the King’s Palace in Nyanza with the long-horned Inyambo cattle.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 11,
        title: 'East to the wild',
        location: 'Akagera National Park',
        summary:
          'Game drive through savannah and lakes. Boat on Lake Ihema at dusk if the light holds.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 12,
        title: 'Return and table',
        location: 'Kigali',
        summary:
          'Back to Kigali. Farewell lunch. Airport transfers as needed. You leave with names, not just photographs.',
        meals: 'Breakfast, lunch',
      },
    ],
  },
  {
    id: 'tour-virunga',
    slug: 'virunga-dawn-circle',
    name: 'Virunga Dawn Circle',
    tagline: 'Luxury package. Eight days under the volcanoes, built around one unforgettable hour.',
    durationDays: 8,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-11-02',
    priceUsd: fareFromRwf(LUXURY_PACKAGE_RWF),
    seatsTotal: 12,
    seatsTaken: 0,
    difficulty: 'active',
    region: 'North',
    cohortName: 'November Mist',
    luxury: true,
    image: asset('/images/gorilla-volcanoes.jpg'),
    gallery: [asset('/images/gorilla-volcanoes.jpg'), asset('/images/hero-hills.jpg'), asset('/images/kigali.jpg')],
    highlights: [
      'Gorilla permit and trek included',
      'Twin lakes and Musanze caves',
      'Iby’Iwacu community visit',
      'Two nights to arrive, not rush',
    ],
    includes: [
      'Gorilla permit and park fees',
      '7 nights lodge',
      'Circle host and driver',
      'Most meals',
      'Pre-trip circle introduction',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kigali landing',
        location: 'Kigali',
        summary: 'Airport pickup, city orientation, welcome dinner on a hill terrace.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'The capital properly',
        location: 'Kigali',
        summary: 'Memorial, crafts, and a long lunch. Drive north after siesta hour.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 3,
        title: 'Lakes under volcanoes',
        location: 'Burera & Ruhondo',
        summary: 'Walk the twin lakes. Briefing. Early sleep.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 4,
        title: 'Gorilla day',
        location: 'Volcanoes National Park',
        summary: 'The trek. Silence after. Hot lunch back at the lodge.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 5,
        title: 'Second mountain',
        location: 'Volcanoes National Park',
        summary: 'Golden monkeys or a crater hike. Those who want rest, rest.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 6,
        title: 'Village day',
        location: 'Kinigi',
        summary: 'Iby’Iwacu. Dance, archery, and a shared meal with the community.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 7,
        title: 'Return south',
        location: 'Kigali',
        summary: 'Scenic drive, last-night table, optional night market.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 8,
        title: 'Departures',
        location: 'Kigali',
        summary: 'Breakfast, transfers, and a WhatsApp circle that usually stays alive.',
        meals: 'Breakfast',
      },
    ],
  },
  {
    id: 'tour-kivu',
    slug: 'kivu-shore-cohort',
    name: 'Kivu Shore Cohort',
    tagline: 'Six unhurried days on the inland sea — swim, coffee, strangers at one table.',
    durationDays: 6,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-10-22',
    priceUsd: fareFromRwf(56000),
    seatsTotal: 12,
    seatsTaken: 0,
    difficulty: 'gentle',
    region: 'West',
    cohortName: 'Shore Table',
    image: asset('/images/lake-kivu.jpg'),
    gallery: [asset('/images/lake-kivu.jpg'), asset('/images/coffee.jpg'), asset('/images/dinner.jpg')],
    highlights: [
      'Three nights on Lake Kivu',
      'Coffee cooperative from cherry to cup',
      'Sunset boat with the circle',
      'Kigali bookends',
    ],
    includes: [
      'Lodges and Kivu boat',
      'Coffee visit',
      'Host and transport',
      'Breakfasts and three dinners',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Meet in Kigali',
        location: 'Kigali',
        summary: 'Names, a city walk, first dinner. No rushing to the lake on day one.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Westward',
        location: 'Rubavu',
        summary: 'Drive to Kivu. Swim. Terrace sundowners.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 3,
        title: 'Coffee hills',
        location: 'Lake Kivu',
        summary: 'Cooperative visit, optional kayak, long lunch.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 4,
        title: 'Boat day',
        location: 'Lake Kivu',
        summary: 'Circle boat along the shore. Picnic islands. Night market if you want it.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 5,
        title: 'Back to the capital',
        location: 'Kigali',
        summary: 'Scenic return. Farewell dinner in a courtyard.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 6,
        title: 'Soft landing',
        location: 'Kigali',
        summary: 'Breakfast and airport runs. Keep the circle chat.',
        meals: 'Breakfast',
      },
    ],
  },
  {
    id: 'tour-canopy',
    slug: 'canopy-and-kingdom',
    name: 'Canopy & Kingdom',
    tagline: 'Rainforest, tea, and the old royal roads of the south.',
    durationDays: 9,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-11-18',
    priceUsd: fareFromRwf(72000),
    seatsTotal: 12,
    seatsTaken: 0,
    difficulty: 'moderate',
    region: 'South & West',
    cohortName: 'Tea Line',
    image: asset('/images/nyungwe.jpg'),
    gallery: [asset('/images/nyungwe.jpg'), asset('/images/imigongo.jpg'), asset('/images/hero-hills.jpg')],
    highlights: [
      'Nyungwe canopy walk',
      'Chimpanzee tracking',
      'King’s Palace and Inyambo cattle',
      'Imigongo studio in the east-south corridor',
    ],
    includes: [
      'Park fees and canopy walk',
      'Museum and palace entries',
      'Lodges, host, vehicle',
      'Most meals',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Gather',
        location: 'Kigali',
        summary: 'Welcome walk and dinner.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'South',
        location: 'Huye',
        summary: 'Ethnographic Museum. Overnight in the university town.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 3,
        title: 'Palace',
        location: 'Nyanza',
        summary: 'King’s Palace, Inyambo cattle, then onward toward the forest.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 4,
        title: 'Tea line',
        location: 'Nyungwe',
        summary: 'Plantation walk and lodge arrival.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 5,
        title: 'Canopy',
        location: 'Nyungwe National Park',
        summary: 'Walkway at first light. Waterfall afternoon.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 6,
        title: 'Chimpanzees',
        location: 'Nyungwe National Park',
        summary: 'Tracking morning. Slow afternoon.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 7,
        title: 'Pattern and pigment',
        location: 'East-south studios',
        summary: 'Imigongo workshop with a master artist. You take a panel home.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 8,
        title: 'Kigali night',
        location: 'Kigali',
        summary: 'Return, last dinner, optional jazz.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 9,
        title: 'Depart',
        location: 'Kigali',
        summary: 'Transfers.',
        meals: 'Breakfast',
      },
    ],
  },
  {
    id: 'tour-akagera',
    slug: 'akagera-wild-circle',
    name: 'Akagera Wild Circle',
    tagline: 'Five days of savannah, lakes, and a boat at the edge of the day.',
    durationDays: 5,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-10-29',
    priceUsd: fareFromRwf(48000),
    seatsTotal: 10,
    seatsTaken: 0,
    difficulty: 'gentle',
    region: 'East',
    cohortName: 'Ihema Light',
    image: asset('/images/akagera.jpg'),
    gallery: [asset('/images/akagera.jpg'), asset('/images/hero-hills.jpg'), asset('/images/dinner.jpg')],
    highlights: [
      'Two game drives in Akagera',
      'Boat on Lake Ihema',
      'Night in a park-edge lodge',
      'Small circle of ten',
    ],
    includes: [
      'Park fees and boat',
      'Lodge nights',
      'Guide and vehicle',
      'All meals in park',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Meet and brief',
        location: 'Kigali',
        summary: 'Circle dinner and safari briefing.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Into the park',
        location: 'Akagera',
        summary: 'Drive east. Afternoon game drive.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 3,
        title: 'Full wild day',
        location: 'Akagera',
        summary: 'Dawn drive, rest, dusk boat on Ihema.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 4,
        title: 'Last light',
        location: 'Akagera · Kigali',
        summary: 'Morning game drive, return to Kigali, courtyard dinner.',
        meals: 'Breakfast, lunch, dinner',
      },
      {
        day: 5,
        title: 'Out',
        location: 'Kigali',
        summary: 'Breakfast and airport.',
        meals: 'Breakfast',
      },
    ],
  },
  {
    id: 'tour-kigali',
    slug: 'kigali-first-circle',
    name: 'Kigali First Circle',
    tagline: 'Four days to learn the capital with people, not a checklist.',
    durationDays: 4,
    startCity: 'Kigali',
    endCity: 'Kigali',
    nextDeparture: '2026-10-17',
    priceUsd: fareFromRwf(32000),
    seatsTotal: 14,
    seatsTaken: 0,
    difficulty: 'gentle',
    region: 'Kigali',
    cohortName: 'Hill Weekend',
    image: asset('/images/kigali.jpg'),
    gallery: [asset('/images/kigali.jpg'), asset('/images/imigongo.jpg'), asset('/images/dinner.jpg')],
    highlights: [
      'Memorial and city hills',
      'Nyamirambo food walk',
      'Inema and Kimironko',
      'One long communal table',
    ],
    includes: [
      '3 nights boutique stay',
      'All listed visits',
      'Circle host',
      'Breakfasts and two dinners',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive on a hill',
        location: 'Kigali',
        summary: 'Check-in, orientation walk, dinner.',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Memory and market',
        location: 'Kigali',
        summary: 'Memorial morning. Kimironko afternoon.',
        meals: 'Breakfast, lunch',
      },
      {
        day: 3,
        title: 'Making and Nyamirambo',
        location: 'Kigali',
        summary: 'Inema studio, fabric, and a Nyamirambo food walk after dark.',
        meals: 'Breakfast, dinner',
      },
      {
        day: 4,
        title: 'Last coffee',
        location: 'Kigali',
        summary: 'Slow breakfast. Transfers.',
        meals: 'Breakfast',
      },
    ],
  },
]

export const dailyBudgets: DailyBudget[] = [
  {
    id: 'budget',
    name: 'Budget traveler',
    transport: 'FRw 8,000–10,000 / day',
    food: 'FRw 5,000–10,000 / day',
    total: 'FRw 10,000–20,000 / day',
    note: 'Excludes accommodation. Motos, coaches, and local plates.',
    ticketSlug: 'budget-traveler-day',
  },
  {
    id: 'comfort',
    name: 'Comfortable traveler',
    transport: 'FRw 10,000–25,000 / day',
    food: 'FRw 10,000–20,000 / day',
    total: 'FRw 20,000–45,000 / day',
    note: 'Excludes accommodation. Hamwe day tickets stay FRw 8,000–20,000. Luxury packages cap at FRw 80,000.',
    ticketSlug: 'comfortable-traveler-day',
  },
  {
    id: 'taxi',
    name: 'Taxis and private cars',
    transport: 'FRw 20,000–50,000 / day',
    food: 'Not included in this band',
    total: 'Transport alone FRw 20,000–50,000 / day',
    note: 'Frequent taxis or a hired car. A set Hamwe taxi block is FRw 20,000. A luxury package is FRw 80,000 — nothing on this site costs more.',
    ticketSlug: 'taxi-private-day',
  },
]

export const activities: Activity[] = [
  {
    id: 'act-budget-day',
    slug: 'budget-traveler-day',
    name: 'Budget traveler day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: ticketFromRwf(15000),
    nextSlot: '2026-10-16',
    spotsLeft: 12,
    spotsTotal: 14,
    category: 'budget',
    image: asset('/images/kigali.jpg'),
    description:
      'One independent day of local transport and meals in Kigali. This ticket sits in the real budget band: FRw 10,000–20,000 a day excluding a hotel. Motos, coaches, and local plates — not a private car.',
    togetherNote: 'For travelers who want accurate street prices, not a lodge package.',
    includes: ['Day host briefing', 'Moto / coach plan', 'Two local meals'],
    meetingPoint: 'Ikaze House, KG 11 Ave, Kisimenti',
  },
  {
    id: 'act-budget-transport',
    slug: 'budget-transport-day',
    name: 'Budget transport day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: ticketFromRwf(9000),
    nextSlot: '2026-10-16',
    spotsLeft: 12,
    spotsTotal: 14,
    category: 'budget',
    image: asset('/images/hero-hills.jpg'),
    description:
      'A day of ordinary Kigali movement: motos and coaches. Real budget transport is FRw 8,000–10,000 per day. This ticket is FRw 9,000.',
    togetherNote: 'Does not include food or a hotel.',
    includes: ['Moto / coach day plan', 'Helmet reminder', 'Host number'],
    meetingPoint: 'Ikaze House, KG 11 Ave, Kisimenti',
  },
  {
    id: 'act-budget-food',
    slug: 'budget-meals-day',
    name: 'Budget meals day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: ticketFromRwf(8000),
    nextSlot: '2026-10-16',
    spotsLeft: 10,
    spotsTotal: 14,
    category: 'budget',
    image: asset('/images/dinner.jpg'),
    description:
      'Local plates for the day — brochettes, beans, tea. Real budget food is FRw 5,000–10,000 per day. This ticket is FRw 8,000, inside Hamwe’s FRw 8,000–20,000 ticket range.',
    togetherNote: 'Does not include transport or a hotel.',
    includes: ['Two meals', 'Tea or water', 'Market stall map'],
    meetingPoint: 'Nyamirambo food street',
  },
  {
    id: 'act-comfort-day',
    slug: 'comfortable-traveler-day',
    name: 'Comfortable traveler day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: ticketFromRwf(20000),
    nextSlot: '2026-10-17',
    spotsLeft: 8,
    spotsTotal: 12,
    category: 'comfort',
    image: asset('/images/kigali.jpg'),
    description:
      'Sit-down meals and regular taxis for one day, excluding a hotel. A comfortable independent day in Rwanda is often FRw 20,000–45,000. This pass is FRw 20,000. Luxury packages are FRw 80,000.',
    togetherNote: 'For a full private day at the site ceiling, buy the Luxury package day.',
    includes: ['Taxi plan', 'Two sit-down meals', 'Host check-in'],
    meetingPoint: 'Ikaze House, KG 11 Ave, Kisimenti',
  },
  {
    id: 'act-taxi-day',
    slug: 'taxi-private-day',
    name: 'Taxi / private car day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: ticketFromRwf(20000),
    nextSlot: '2026-10-17',
    spotsLeft: 6,
    spotsTotal: 8,
    category: 'taxi',
    image: asset('/images/atlas-rwanda.jpg'),
    description:
      'A set block of taxi or private-car hours. Using taxis or private cars frequently is often FRw 20,000–50,000 per day for transport alone. This ticket is FRw 20,000 for a defined daytime block. The Luxury package day is FRw 80,000 — the highest fare on this site.',
    togetherNote: 'All-day private hire at the Hamwe ceiling is the Luxury package day, FRw 80,000.',
    includes: ['Booked car block', 'Driver', 'City / airport run as agreed'],
    meetingPoint: 'Ikaze House, KG 11 Ave, Kisimenti',
  },
  {
    id: 'act-luxury-day',
    slug: 'luxury-package-day',
    name: 'Luxury package day',
    city: 'Kigali',
    duration: '1 day',
    priceUsd: fareFromRwf(LUXURY_PACKAGE_RWF),
    nextSlot: '2026-10-18',
    spotsLeft: 4,
    spotsTotal: 6,
    category: 'luxury',
    image: asset('/images/cohort.jpg'),
    description:
      'The Hamwe ceiling: a private car, sit-down meals, and a host for one full day. This ticket is FRw 80,000. No fare on this site is higher.',
    togetherNote: 'Luxury packages — day or hosted circle — top out at FRw 80,000.',
    includes: ['Private car and driver', 'Host', 'Two sit-down meals', 'Airport or city runs as agreed'],
    meetingPoint: 'Ikaze House, KG 11 Ave, Kisimenti',
  },
  {
    id: 'act-imigongo',
    slug: 'imigongo-studio',
    name: 'Imigongo studio',
    city: 'Kigali / East',
    duration: '3 hours',
    priceUsd: ticketFromRwf(18000),
    nextSlot: '2026-10-16',
    spotsLeft: 6,
    spotsTotal: 10,
    category: 'culture',
    image: asset('/images/imigongo.jpg'),
    description:
      'Learn the geometry of Imigongo — black, cream, and oxblood spirals — from a working studio. You leave with a small panel and red under your nails.',
    togetherNote: 'Pairs well with any Kigali night. Strangers share a workbench.',
    includes: ['Materials', 'Studio fee', 'Tea'],
  },
  {
    id: 'act-coffee',
    slug: 'cherry-to-cup',
    name: 'Cherry to cup',
    city: 'Lake Kivu',
    duration: '4 hours',
    priceUsd: ticketFromRwf(16000),
    nextSlot: '2026-10-23',
    spotsLeft: 8,
    spotsTotal: 12,
    category: 'food',
    image: asset('/images/coffee.jpg'),
    description:
      'Walk a cooperative from red cherry to washed parchment to the cupping table. Farmers host. The circle tastes blind and argues kindly.',
    togetherNote: 'Best as a Kivu Shore extra. Open to any Hamwe traveler in town.',
    includes: ['Cooperative visit', 'Tasting flight', 'Light lunch'],
  },
  {
    id: 'act-dinner',
    slug: 'long-table-kigali',
    name: 'Long table, Kigali',
    city: 'Kigali',
    duration: '3.5 hours',
    priceUsd: ticketFromRwf(15000),
    nextSlot: '2026-10-15',
    spotsLeft: 4,
    spotsTotal: 14,
    category: 'food',
    image: asset('/images/dinner.jpg'),
    description:
      'A courtyard supper for people who arrived alone. Isombe, brochettes, akabenz, sorghum juice. Place cards mix the table on purpose.',
    togetherNote: 'The original Hamwe ritual. Come even if you are not on a full tour.',
    includes: ['Shared menu', 'Welcome drink', 'Host'],
  },
  {
    id: 'act-canopy',
    slug: 'canopy-add-on',
    name: 'Nyungwe canopy hour',
    city: 'Nyungwe',
    duration: '2 hours',
    priceUsd: ticketFromRwf(20000),
    nextSlot: '2026-11-20',
    spotsLeft: 9,
    spotsTotal: 12,
    category: 'nature',
    image: asset('/images/nyungwe.jpg'),
    description:
      'A first-light walk on the hanging bridge if your tour does not already include it — or a second pass for people who want the mist twice.',
    togetherNote: 'Small group. Guides wait for the slowest camera.',
    includes: ['Park entry add-on', 'Guide'],
  },
  {
    id: 'act-boat',
    slug: 'kivu-lamp-boat',
    name: 'Kivu lamp boat',
    city: 'Rubavu',
    duration: '2 hours',
    priceUsd: ticketFromRwf(14000),
    nextSlot: '2026-10-24',
    spotsLeft: 7,
    spotsTotal: 10,
    category: 'night',
    image: asset('/images/lake-kivu.jpg'),
    description:
      'Evening boat as the fishing lamps come on. The circle sits on the same bench and watches the water turn copper.',
    togetherNote: 'Open seats for any traveler on the shore that night.',
    includes: ['Boat', 'Captain', 'Blanket'],
  },
  {
    id: 'act-hills',
    slug: 'twin-lakes-walk',
    name: 'Twin lakes walk',
    city: 'Musanze',
    duration: '5 hours',
    priceUsd: ticketFromRwf(12000),
    nextSlot: '2026-11-03',
    spotsLeft: 10,
    spotsTotal: 12,
    category: 'nature',
    image: asset('/images/hero-hills.jpg'),
    description:
      'A guided walk between Lakes Burera and Ruhondo. Terraces, children selling passion fruit, volcanoes on the skyline.',
    togetherNote: 'Easy miles. Good for people who want to talk while they walk.',
    includes: ['Guide', 'Fruit stop'],
    meetingPoint: 'Kinigi visitor centre, Musanze',
  },
  {
    id: 'act-memorial',
    slug: 'memorial-morning',
    name: 'Memorial morning',
    city: 'Kigali',
    duration: '3 hours',
    priceUsd: ticketFromRwf(8000),
    nextSlot: '2026-10-16',
    spotsLeft: 8,
    spotsTotal: 12,
    category: 'culture',
    image: asset('/images/kigali.jpg'),
    description:
      'A guided morning at the Kigali Genocide Memorial with time after to sit, not rush. The circle stays small so the hour can stay quiet.',
    togetherNote: 'Open to Hamwe travelers and to people in Kigali who want company, not a crowd.',
    includes: ['Entry', 'Guide', 'Quiet hour after'],
    meetingPoint: 'Kigali Genocide Memorial, Gisozi',
  },
  {
    id: 'act-market',
    slug: 'kimironko-market-walk',
    name: 'Kimironko market walk',
    city: 'Kigali',
    duration: '2.5 hours',
    priceUsd: ticketFromRwf(10000),
    nextSlot: '2026-10-18',
    spotsLeft: 9,
    spotsTotal: 12,
    category: 'food',
    image: asset('/images/kigali.jpg'),
    description:
      'Fruit, fabric, brochettes, and the noise of a working capital. A host who shops there walks you through without turning it into a photoshoot.',
    togetherNote: 'Best the afternoon you land, before the hills start.',
    includes: ['Host', 'Tasting stops'],
    meetingPoint: 'Kimironko market gate',
  },
  {
    id: 'act-caves',
    slug: 'musanze-caves',
    name: 'Musanze caves',
    city: 'Musanze',
    duration: '2 hours',
    priceUsd: ticketFromRwf(14000),
    nextSlot: '2026-11-04',
    spotsLeft: 7,
    spotsTotal: 10,
    category: 'nature',
    image: asset('/images/gorilla-volcanoes.jpg'),
    description:
      'Lava tunnels under the volcanoes, helmets on, lamps low. A short walk that still feels like another country under the country.',
    togetherNote: 'Pairs with Virunga Dawn. Bring a jacket.',
    includes: ['Entry', 'Lamp and helmet', 'Guide'],
    meetingPoint: 'Musanze caves ticket office',
  },
  {
    id: 'act-jazz',
    slug: 'kigali-jazz-night',
    name: 'Kigali jazz night',
    city: 'Kigali',
    duration: '3 hours',
    priceUsd: ticketFromRwf(12000),
    nextSlot: '2026-10-19',
    spotsLeft: 6,
    spotsTotal: 14,
    category: 'night',
    image: asset('/images/dinner.jpg'),
    description:
      'A reserved table for the circle at a hill jazz room. One drink included. The rest is conversation and whatever the band decides.',
    togetherNote: 'Come even if you travelled alone. Place cards mix the table.',
    includes: ['Seat', 'Welcome drink', 'Host'],
    meetingPoint: 'The Jazz Club, Kiyovu',
  },
]

export const destinations: Destination[] = [
  {
    id: 'd-kigali',
    slug: 'kigali',
    name: 'Kigali',
    region: 'Capital hills',
    blurb: 'Memorial mornings, Nyamirambo food, a city that teaches the map of hills before the itinerary does.',
    image: asset('/images/kigali.jpg'),
    tourSlug: 'kigali-first-circle',
  },
  {
    id: 'd-volcanoes',
    slug: 'volcanoes',
    name: 'Volcanoes',
    region: 'North · Musanze',
    blurb: 'One hour with a gorilla family. The rest of the day is quiet on purpose.',
    image: asset('/images/gorilla-volcanoes.jpg'),
    tourSlug: 'virunga-dawn-circle',
  },
  {
    id: 'd-kivu',
    slug: 'kivu',
    name: 'Lake Kivu',
    region: 'West · Rubavu',
    blurb: 'Coffee cooperatives, lamp boats, and a table that stays late on the inland sea.',
    image: asset('/images/lake-kivu.jpg'),
    tourSlug: 'kivu-shore-cohort',
  },
  {
    id: 'd-nyungwe',
    slug: 'nyungwe',
    name: 'Nyungwe',
    region: 'South-west forest',
    blurb: 'Canopy walkway at first light. Chimpanzees. Tea on the way in.',
    image: asset('/images/nyungwe.jpg'),
    tourSlug: 'canopy-and-kingdom',
  },
  {
    id: 'd-akagera',
    slug: 'akagera',
    name: 'Akagera',
    region: 'East savannah',
    blurb: 'Game drives, lakes, and a boat on Ihema when the light holds.',
    image: asset('/images/akagera.jpg'),
    tourSlug: 'akagera-wild-circle',
  },
  {
    id: 'd-nyanza',
    slug: 'nyanza',
    name: 'Nyanza',
    region: 'Kingdom roads',
    blurb: 'The King’s Palace, Inyambo cattle, and the old royal line of the south.',
    image: asset('/images/imigongo.jpg'),
    tourSlug: 'canopy-and-kingdom',
  },
]

export const memberships: MembershipPlan[] = [
  {
    id: 'mem-month',
    slug: 'circle-month',
    name: 'Circle month',
    period: 'month',
    priceUsd: fareFromRwf(15000),
    tagline: 'One month of first look at seats, activity rates, and the host table in Kigali.',
    perks: ['Activity seats at member fare', 'WhatsApp circle board', 'One long-table supper'],
  },
  {
    id: 'mem-year',
    slug: 'circle-year',
    name: 'Circle year',
    period: 'year',
    priceUsd: fareFromRwf(55000),
    tagline: 'A year of Hamwe. Tours still cost a ticket. The extras and the first seats are yours.',
    perks: [
      'Early boarding on every departure',
      '15% off together extras',
      'Four hosted Kigali tables',
      'Airport welcome even when you are not on a tour',
    ],
    highlighted: true,
  },
  {
    id: 'mem-host',
    slug: 'host-table',
    name: 'Host table',
    period: 'year',
    priceUsd: fareFromRwf(LUXURY_PACKAGE_RWF),
    tagline: 'Luxury package. A year of the circle plus a named seat at every Kigali supper. FRw 80,000 — the site maximum.',
    perks: ['Everything in Circle year', 'Named supper seat', 'A host call before each trip', 'Guest pass for one friend, once'],
    luxury: true,
  },
]

export const faqs: FaqItem[] = [
  {
    q: 'How much do day tickets cost?',
    a: 'Hamwe Tourism day tickets (activities and budget traveler passes) are FRw 8,000–20,000. Hosted tours are FRw 32,000–80,000. Luxury packages are FRw 80,000 — nothing on this site costs more.',
  },
  {
    q: 'What is a luxury package?',
    a: 'Luxury packages are the highest Hamwe Tourism fares: FRw 80,000. That is The Full Gathering, Virunga Dawn Circle, and the Luxury package day. No listed price is higher.',
  },
  {
    q: 'What does a budget traveler spend per day?',
    a: 'Excluding a hotel: transport FRw 8,000–10,000, food FRw 5,000–10,000, total about FRw 10,000–20,000 a day. Buy the Budget traveler day ticket (FRw 15,000) or split transport (FRw 9,000) and meals (FRw 8,000).',
  },
  {
    q: 'What does a comfortable traveler spend per day?',
    a: 'Excluding a hotel: transport FRw 10,000–25,000, food FRw 10,000–20,000, total about FRw 20,000–45,000 a day. Hamwe’s Comfortable traveler day ticket is FRw 20,000 — the top of our day-ticket range.',
  },
  {
    q: 'How much are taxis and private cars?',
    a: 'Using taxis or private cars frequently is often FRw 20,000–50,000 per day for transport alone. The Taxi / private car day ticket is FRw 20,000 for a set daytime block. A Luxury package is FRw 80,000, the highest fare on this site.',
  },
  {
    q: 'Do I pay in Rwandan francs?',
    a: 'Yes. Fares are shown in FRw first, with a locked USD line underneath (FRw 1,450 = $1 on this demo). MoMo and QR settle in RWF. Cards and PayPal can still pay the same franc total.',
  },
  {
    q: 'Is the gorilla permit included?',
    a: 'When a trek is listed on the tour, the permit is already in the fare. You do not buy it at midnight on a third-party site.',
  },
  {
    q: 'Can I pay with MTN MoMo?',
    a: 'Yes. Choose MoMo at checkout, enter a Rwanda number (07…), and approve the prompt on the phone. This build is a demo — no live debit until a merchant account is connected.',
  },
  {
    q: 'How do Apple Wallet and Calendar work?',
    a: 'After payment you get a QR boarding pass. Add to Calendar downloads an .ics file iPhone Calendar understands. Add to Apple Wallet downloads a pass file — a signed .pkpass needs Apple certificates in production.',
  },
  {
    q: 'Do you sell a membership?',
    a: 'No. Hamwe Tourism sells dated tour seats and day tickets only. Book a departure or write the house for a custom trip. Older membership passes already on a device still open as tickets.',
  },
  {
    q: 'Are flights to Kigali included?',
    a: 'No. You fly to KGL. Airport welcome, the vehicle, lodges, and named meals are in the ticket.',
  },
  {
    q: 'Can I cancel?',
    a: 'More than 30 days out, we move you to another circle or refund minus permit costs already bought. Inside 30 days, the seat is harder to refill — write to circle@hamwe.rw.',
  },
  {
    q: 'Who is this for?',
    a: 'Adults who will sit at a long table and walk at the group’s pace. You do not need to know anyone when you buy the seat.',
  },
  {
    q: 'When is the Kigali office open?',
    a: 'Every day, 08:00 - 12:00 ¦ 13:30 - 18:00 CAT.',
  },
  {
    q: 'Where is the Hamwe office?',
    a: 'Ikaze House, KG 11 Ave, Kisimenti, Kigali. Email circle@hamwe.rw. Phone +250 794 607 518.',
  },
  {
    q: 'What should I plan before I fly?',
    a: 'Check visa rules on Irembo, pack without plastic bags, buy travel insurance, and book your own flight to KGL. Hamwe Tourism’s Plan page covers season, packing, money, and health. Airport welcome is in every hosted tour ticket.',
  },
  {
    q: 'What is included in a Hamwe tour?',
    a: 'A Kigali host, airport welcome, the vehicle, lodges named in the journal, park fees when listed (including gorilla permits on treks that list them), named meals, and a pre-trip call. International flights, visas, insurance, unnamed drinks, tips, and optional day tickets are not included.',
  },
]

export const letters: Array<{ name: string; tour: string; text: string }> = []

export { album, albumTopics, rwandaAlbum } from './data/album'

export function getTour(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug)
}

export function getActivity(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug)
}

export function getTourById(id: string): Tour | undefined {
  return tours.find((tour) => tour.id === id)
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}

export function getMembership(slug: string): MembershipPlan | undefined {
  return memberships.find((plan) => plan.slug === slug)
}

export function getMembershipById(id: string): MembershipPlan | undefined {
  return memberships.find((plan) => plan.id === id)
}

export function getCatalogName(kind: 'tour' | 'activity' | 'membership', id: string): string | undefined {
  if (kind === 'tour') return getTourById(id)?.name
  if (kind === 'activity') return getActivityById(id)?.name
  return getMembershipById(id)?.name
}

export function seatsLeft(tour: Tour): number {
  return Math.max(0, tour.seatsTotal - tour.seatsTaken)
}

export function circleForTour(tour: Tour): TravelerPreview[] {
  const count = Math.min(tour.seatsTaken, travelers.length)
  const host = travelers.find((person) => person.role === 'host')
  const guests = travelers.filter((person) => person.role === 'guest').slice(0, count - 1)
  return host ? [host, ...guests] : guests
}
