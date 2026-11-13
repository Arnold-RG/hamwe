export interface QAItem {
  q: string
  a: string
  tags: string[]
}

const STOP = new Set([
  'the', 'and', 'for', 'with', 'what', 'when', 'where', 'how', 'who', 'why',
  'is', 'are', 'a', 'an', 'to', 'of', 'in', 'on', 'do', 'i', 'me', 'my', 'we',
  'can', 'you', 'please', 'tell', 'about', 'some', 'any', 'does', 'did', 'should',
  'would', 'could', 'there', 'this', 'that', 'they', 'them', 'from', 'into',
  'need', 'want', 'give', 'more', 'know', 'your', 'our', 'also', 'just', 'few',
])

function norm(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function words(text: string): string[] {
  return norm(text)
    .split(' ')
    .filter((word) => word.length > 2 && !STOP.has(word))
}

/** Curated English Q&A. Gisubizo returns these verbatim when the question matches. */
export const QA_BANK: QAItem[] = [
  {
    q: 'What is Rwanda?',
    tags: ['rwanda', 'country', 'about'],
    a: 'Rwanda is a landlocked East African country, officially the Republic of Rwanda. The capital is Kigali. It is often called the Land of a Thousand Hills. It borders Uganda, Tanzania, Burundi, and the Democratic Republic of the Congo.',
  },
  {
    q: 'What is Rwanda known for?',
    tags: ['rwanda', 'known', 'gorillas'],
    a: 'Rwanda is known for mountain gorillas in Volcanoes National Park, a clean and ordered capital in Kigali, Nyungwe rainforest, Akagera savannah, and Lake Kivu. It is also known for recovery and remembrance after the 1994 Genocide against the Tutsi.',
  },
  {
    q: 'Where is Rwanda located?',
    tags: ['rwanda', 'africa', 'location'],
    a: 'Rwanda is in East-Central Africa, in the Great Lakes region. It sits south of Uganda, west of Tanzania, north of Burundi, and east of the Democratic Republic of the Congo.',
  },
  {
    q: 'What is the capital of Rwanda?',
    tags: ['kigali', 'capital'],
    a: 'The capital is Kigali. International flights arrive at Kigali International Airport (KGL). Hamwe’s desk is at Ikaze House on KG 11 Ave in Kisimenti.',
  },
  {
    q: 'How big is Rwanda?',
    tags: ['size', 'area'],
    a: 'Rwanda covers about 26,338 square kilometres. It is one of Africa’s smaller countries, which is why a well-planned week can cover more than one region.',
  },
  {
    q: 'What is the population of Rwanda?',
    tags: ['population', 'people'],
    a: 'Rwanda’s population is about 14 million. Most people live in rural hills; Kigali is the main city.',
  },
  {
    q: 'What languages are spoken in Rwanda?',
    tags: ['language', 'english', 'kinyarwanda'],
    a: 'The official languages are Kinyarwanda, English, French, and Kiswahili. English is widely used in Kigali, tourism, and government. Gisubizo answers in English only.',
  },
  {
    q: 'What currency does Rwanda use?',
    tags: ['money', 'franc', 'rwf'],
    a: 'The currency is the Rwandan franc (RWF). ATMs in Kigali commonly take Visa. Hamwe shows fares in francs first. On this website the display rate is locked at FRw 1,450 = US$1 for the demo.',
  },
  {
    q: 'What time zone is Rwanda in?',
    tags: ['time', 'cat'],
    a: 'Rwanda uses Central Africa Time (CAT), which is UTC+2 all year. There is no daylight-saving change.',
  },
  {
    q: 'What is Rwanda’s country calling code?',
    tags: ['phone', 'dial'],
    a: 'The calling code is +250. Hamwe’s desk number on this site is +250 794 607 518.',
  },
  {
    q: 'When did Rwanda become independent?',
    tags: ['independence', 'history', '1962'],
    a: 'Rwanda became independent from Belgium on 1 July 1962. Independence Day is a national public holiday.',
  },
  {
    q: 'What is the official name of the country?',
    tags: ['republic', 'name'],
    a: 'The official name is the Republic of Rwanda.',
  },
  {
    q: 'Does Rwanda have a coastline?',
    tags: ['coast', 'sea', 'landlocked'],
    a: 'No. Rwanda is landlocked. The closest large water body for visitors is Lake Kivu on the western border, not an ocean.',
  },
  {
    q: 'Which countries border Rwanda?',
    tags: ['border', 'neighbours'],
    a: 'Uganda to the north, Tanzania to the east, Burundi to the south, and the Democratic Republic of the Congo to the west.',
  },
  {
    q: 'What are Rwanda’s provinces?',
    tags: ['provinces', 'regions'],
    a: 'Rwanda has four provinces — Northern, Southern, Eastern, and Western — plus the City of Kigali as a separate administrative area.',
  },
  {
    q: 'What is the 1994 genocide?',
    tags: ['genocide', '1994', 'history', 'tutsi'],
    a: 'From 7 April to mid-July 1994, the Genocide against the Tutsi killed about one million people in around 100 days. Visitors usually begin at the Kigali Genocide Memorial. Dress modestly, follow site rules, and do not photograph remains or forbidden interiors.',
  },
  {
    q: 'How should I visit the memorial?',
    tags: ['memorial', 'kigali', 'genocide'],
    a: 'Go in the morning with time, not between other errands. The Kigali Genocide Memorial is the usual first site. Stay quiet, cover shoulders, and do not treat it as a photo stop. Hamwe places this on a Kigali morning so the group holds it together.',
  },
  {
    q: 'What is Kwibuka?',
    tags: ['kwibuka', 'april', 'memorial'],
    a: 'Kwibuka is the annual commemoration of the Genocide against the Tutsi, held each April, starting on 7 April. Expect a more solemn public mood that month.',
  },
  {
    q: 'Who is the president of Rwanda?',
    tags: ['president', 'kagame', 'government'],
    a: 'The President of Rwanda is Paul Kagame. Rwanda is a presidential republic. Hamwe is a private travel company on this site, not a government office.',
  },
  {
    q: 'Is Visit Rwanda the same as Hamwe?',
    tags: ['visitrwanda', 'rdb', 'hamwe'],
    a: 'No. Visit Rwanda is the national tourism brand associated with the Rwanda Development Board. Hamwe Tourism is this private Kigali travel company: hosted tours, dated seats, and this website. They are not the same organisation.',
  },
  {
    q: 'What is Hamwe?',
    tags: ['hamwe', 'company', 'about'],
    a: 'Hamwe Tourism is a Kigali travel company that sells dated seats on small hosted Rwanda itineraries. The word hamwe means “together.” Groups are 10–14 people. You buy a seat, meet on a call two weeks before departure, and walk with a bilingual host.',
  },
  {
    q: 'What does Hamwe mean?',
    tags: ['hamwe', 'name', 'together'],
    a: 'Hamwe means “together.” The company name is the product idea: strangers who share one road, one table, and one date.',
  },
  {
    q: 'What is the history of Hamwe?',
    tags: ['hamwe', 'history', 'company'],
    a: 'Hamwe Tourism is the Kigali company behind this website. It is built to sell hosted tours rather than a menu of unbundled days. The public house is Ikaze House, KG 11 Ave, Kisimenti. Payments on this site are a demo until a live merchant account is connected.',
  },
  {
    q: 'Who owns Hamwe?',
    tags: ['hamwe', 'company', 'owner'],
    a: 'On this website Hamwe is presented as Hamwe Tourism, a Kigali travel house. For bookings and questions write circle@hamwe.rw or call +250 794 607 518 during office hours.',
  },
  {
    q: 'How does a Hamwe circle work?',
    tags: ['hamwe', 'circle', 'tour'],
    a: 'You pick a dated departure, buy a ticket, join a circle call two weeks out, then travel with a Kigali host. Group size is 10–14. Lodges, park fees, the vehicle, and named meals are in the fare. International flights to Kigali are not included.',
  },
  {
    q: 'Is the gorilla permit included?',
    tags: ['gorilla', 'permit', 'hamwe'],
    a: 'Yes — when the Hamwe tour lists a gorilla trek. The Full Gathering and Virunga Dawn Circle include the permit in the fare. Tours that do not list a trek (for example Kivu Shore or Kigali First Circle) do not include a gorilla permit.',
  },
  {
    q: 'Which Hamwe tour includes gorillas?',
    tags: ['gorilla', 'tour', 'hamwe'],
    a: 'The Full Gathering (12 days) and Virunga Dawn Circle (8 days) include a gorilla trek and the permit. Other Hamwe tours focus on Kigali, Lake Kivu, Nyungwe, or Akagera and do not include that permit unless a trek is listed.',
  },
  {
    q: 'Where is the Hamwe office?',
    tags: ['office', 'kisimenti', 'ikaze', 'contact', 'address'],
    a: 'Ikaze House, KG 11 Ave, Kisimenti, Kigali. Email circle@hamwe.rw. Phone +250 794 607 518. Hours are 08:00 - 12:00 ¦ 13:30 - 18:00 CAT, every day.',
  },
  {
    q: 'When is the Kigali office open?',
    tags: ['hours', 'office', 'open'],
    a: 'Every day, 08:00 - 12:00 ¦ 13:30 - 18:00 Central Africa Time. A tour can still have seats when the office is closed.',
  },
  {
    q: 'Are flights to Kigali included?',
    tags: ['flights', 'kgl', 'included'],
    a: 'No. You book your own flight to Kigali International Airport (KGL). Airport welcome is included on hosted Hamwe tours.',
  },
  {
    q: 'Can I pay with MoMo?',
    tags: ['momo', 'mtn', 'payment'],
    a: 'Yes, as a checkout option. Choose MTN MoMo, enter a Rwanda mobile number starting with 07, and approve the prompt. This website’s payments are a demo — no live debit until a merchant account is connected.',
  },
  {
    q: 'Do I pay in Rwandan francs?',
    tags: ['francs', 'rwf', 'payment'],
    a: 'Yes. Hamwe shows prices in Rwandan francs first, with a US dollar line underneath. On this demo the rate is FRw 1,450 = US$1. MoMo and QR settle in RWF.',
  },
  {
    q: 'What is a Circle membership?',
    tags: ['membership', 'circle'],
    a: 'Hamwe Tourism no longer sells memberships. Book a dated tour seat or a day ticket. Fares are FRw 8,000–80,000. Older membership passes already on a device still open as tickets.',
  },
  {
    q: 'Can I cancel a Hamwe ticket?',
    tags: ['cancel', 'refund'],
    a: 'More than 30 days before departure, Hamwe can usually move you to another circle or refund minus permits already bought. Inside 30 days the seat is harder to refill. Write circle@hamwe.rw. Gorilla permits are named and dated, so they are the costly part of a late change.',
  },
  {
    q: 'Who is Hamwe for?',
    tags: ['who', 'adults', 'strangers'],
    a: 'Adults who will sit at a shared table and walk at the group’s pace. You do not need to know anyone when you buy a seat. Gorilla trekking is for ages 15 and up.',
  },
  {
    q: 'Who hosts a Hamwe circle?',
    tags: ['host', 'circle'],
    a: 'A bilingual Kigali host walks every Hamwe circle. You meet the host after you book, on the pre-trip call and on the ground.',
  },
  {
    q: 'What is Gisubizo?',
    tags: ['gisubizo', 'ai'],
    a: 'Gisubizo is Hamwe’s English-language Rwanda assistant on this website. It answers questions about the country and about Hamwe circles. The name comes from a Kinyarwanda word meaning “the answer,” but Gisubizo replies in English only.',
  },
  {
    q: 'How do gorilla treks work?',
    tags: ['gorilla', 'trek', 'volcanoes'],
    a: 'You trek in Volcanoes National Park near Kinigi, Musanze District, with park rangers to one habituated mountain-gorilla family. You stay with the family for one hour. Groups are small (commonly up to eight visitors). You do not choose which family. A permit is required. Minimum age is 15.',
  },
  {
    q: 'Where do mountain gorillas live in Rwanda?',
    tags: ['gorilla', 'volcanoes', 'virunga'],
    a: 'In Volcanoes National Park in northern Rwanda, part of the Virunga massif shared with Uganda and the Democratic Republic of the Congo. The park headquarters area is Kinigi, near Musanze.',
  },
  {
    q: 'How old must you be for gorilla trekking?',
    tags: ['gorilla', 'age', '15'],
    a: 'The usual minimum age in Rwanda is 15. Children younger than 15 do not join the gorilla trek.',
  },
  {
    q: 'How far must I stay from gorillas?',
    tags: ['gorilla', 'distance', 'rules'],
    a: 'Keep about 7 metres (about 23 feet) from the animals, follow the ranger, use no flash, do not eat in front of them, and do not trek if you have a contagious illness. Time with the family is limited to one hour.',
  },
  {
    q: 'How long is a gorilla trek?',
    tags: ['gorilla', 'hours', 'fitness'],
    a: 'Walking to the family often takes 1 to 6 hours depending on where they ranged that morning, then one hour with them. Trails can be steep and muddy. Fitness is moderate, not a technical climb.',
  },
  {
    q: 'What is golden-monkey trekking?',
    tags: ['golden', 'monkey', 'volcanoes'],
    a: 'Golden monkeys live in Volcanoes National Park, often in bamboo. It is a separate activity and permit from gorillas. The walk is usually shorter than a gorilla day. Confirm current age rules with the Hamwe desk or the park.',
  },
  {
    q: 'What is Nyungwe?',
    tags: ['nyungwe', 'forest'],
    a: 'Nyungwe National Park is a montane rainforest in south-west Rwanda. It is known for chimpanzee tracking, a canopy walkway, colobus monkeys, birds, and tea estates on the approach roads. It is not a day trip from Kigali if you want it properly.',
  },
  {
    q: 'What is the Nyungwe canopy walk like?',
    tags: ['canopy', 'walkway', 'nyungwe'],
    a: 'It is a guided hanging walkway in the forest canopy, commonly described as about 50 metres high and about 160 metres long. You go with a park guide. Mist is normal. It is a walk, not a thrill ride.',
  },
  {
    q: 'How is chimpanzee trekking different from gorillas?',
    tags: ['chimp', 'gorilla', 'compare'],
    a: 'Gorillas are in Volcanoes National Park in the north: a slower hour with a habituated family, minimum age 15, expensive permit. Chimpanzees are in Nyungwe in the south-west: an earlier, faster forest search, a separate permit, and less time standing still. Do not book both on the same day.',
  },
  {
    q: 'Which animals live in Akagera?',
    tags: ['akagera', 'animals', 'safari'],
    a: 'Akagera National Park in eastern Rwanda holds the Big Five story again: lion, leopard, elephant, buffalo, and rhino, plus giraffe, zebra, hippo, crocodile, antelope, and many waterbirds. Lions were reintroduced in 2015 and eastern black rhinos in 2017. A boat on Lake Ihema is the usual water outing.',
  },
  {
    q: 'What is Akagera?',
    tags: ['akagera', 'safari', 'east'],
    a: 'Akagera is Rwanda’s savannah and wetland park on the eastern border with Tanzania. It is smaller than the great East African plains parks. Game drives and Lake Ihema are the core activities. African Parks co-manages it with the Rwanda Development Board.',
  },
  {
    q: 'Tell me about Lake Kivu',
    tags: ['kivu', 'lake', 'rubavu'],
    a: 'Lake Kivu is one of Africa’s Great Lakes, on Rwanda’s western border with the DRC. Main Rwandan shores for visitors are Rubavu (also called Gisenyi) in the north and Karongi (Kibuye) further south. People go for swimming, coffee cooperatives, and slower evenings — not for gorilla trekking.',
  },
  {
    q: 'What is Kigali like?',
    tags: ['kigali', 'city'],
    a: 'Kigali is a hilly capital, known for order and cleanliness compared with many regional cities. Elevation is about 1,500 metres, so days are mild and nights are cool. Typical visitor days include the Genocide Memorial, Nyamirambo, Kimironko market, and a sunset ridge such as Rebero or Mount Kigali.',
  },
  {
    q: 'What should I do on day one?',
    tags: ['day', 'arrive', 'kigali'],
    a: 'Land, rest, eat, and see a hill view. Do not gorilla-trek the morning after a late flight. Save the Genocide Memorial for a morning when you have slept. Hamwe’s Kigali-start tours follow that order.',
  },
  {
    q: 'When is the best time to visit?',
    tags: ['when', 'weather', 'dry'],
    a: 'The drier windows are roughly June to September and December to February. The long rains are roughly March to May; shorter rains often fall in October and November. Gorilla trekking runs all year. Dry months mean firmer trails and more visitors; wet months mean mud and fewer crowds.',
  },
  {
    q: 'What should I pack?',
    tags: ['pack', 'clothes', 'boots'],
    a: 'Layers, a rain jacket, broken-in walking shoes, long sleeves for forest nettles, garden gloves for gorilla vegetation, sun protection, and a small daypack. Plug type is C or J, 230V. Do not pack plastic shopping bags — they are banned and removed at the airport.',
  },
  {
    q: 'Are plastic bags banned in Rwanda?',
    tags: ['plastic', 'bags', 'ban'],
    a: 'Yes. Non-biodegradable plastic bags are banned. Airport officers take them on arrival. Use a reusable bottle and packing cubes instead.',
  },
  {
    q: 'Do I need a visa?',
    tags: ['visa', 'entry', 'passport'],
    a: 'Many visitors use a tourist visa on arrival or an e-visa. African Union passport holders are generally allowed visa-free entry, but you must still check the current rule for your nationality on Rwanda’s immigration / Irembo site. Passports should normally be valid at least six months.',
  },
  {
    q: 'Do I need a yellow fever vaccine?',
    tags: ['yellow', 'fever', 'vaccine'],
    a: 'Proof of yellow-fever vaccination is required if you arrive from a country with yellow-fever risk. It is not a blanket requirement for every nationality. Ask a travel clinic.',
  },
  {
    q: 'Do I need malaria tablets?',
    tags: ['malaria', 'health'],
    a: 'Kigali is lower risk than many African capitals, but Rwanda is not malaria-free. Risk is higher in the east (Akagera) and some lower western areas. Speak to a clinician. This assistant does not prescribe medicine.',
  },
  {
    q: 'Is Rwanda safe for solo travellers?',
    tags: ['safe', 'safety', 'solo'],
    a: 'Rwanda is widely regarded as one of the more orderly and lower-street-crime countries in the region. Solo travellers, including women, visit routinely. Still use registered taxis at night, keep phones tucked in crowds, and take memorial visits seriously. Rural roads after heavy rain need care.',
  },
  {
    q: 'What is Umuganda?',
    tags: ['umuganda', 'saturday', 'community'],
    a: 'Umuganda is mandatory community work on the last Saturday morning of each month. Some roads and businesses are quieter or open late. Visitors are not usually required to join, but you should respect the pause.',
  },
  {
    q: 'What is there to eat?',
    tags: ['food', 'eat', 'brochette'],
    a: 'Common plates include brochettes (grilled meat), isombe (cassava leaves), beans, plantain, and tilapia. Rwanda grows coffee and tea. Primus is a local beer. Tell Hamwe dietary needs on the circle call. Vegetarian food is easier if lodges know in advance.',
  },
  {
    q: 'What is Imigongo?',
    tags: ['imigongo', 'art'],
    a: 'Imigongo is a Rwandan art of raised geometric patterns, traditionally using cow dung and natural pigments in black, white, and red. Hamwe lists an Imigongo studio as a paid extra.',
  },
  {
    q: 'What is Nyanza?',
    tags: ['nyanza', 'palace', 'king'],
    a: 'Nyanza in the south is known for the King’s Palace and the long-horned Inyambo cattle of the old royal court. Hamwe’s Canopy & Kingdom tour uses this southern road with Nyungwe.',
  },
  {
    q: 'How do I get around without a car?',
    tags: ['transport', 'moto', 'bus'],
    a: 'In Kigali, helmeted moto-taxis are common for short trips; agree the fare or use a ride app. Coaches link Kigali to Musanze, Huye, and Rubavu. On a Hamwe circle the vehicle is included. Driving is on the right.',
  },
  {
    q: 'How many days do I need?',
    tags: ['days', 'itinerary'],
    a: 'Three days is Kigali only. Four to five days can add one gorilla morning if the permit exists and you sleep in Musanze. Six to eight days add Lake Kivu. Nine to twelve days can add Nyungwe or Akagera. The Full Gathering is 12 days.',
  },
  {
    q: 'Plan 5 days in Rwanda',
    tags: ['plan', 'days', 'five'],
    a: 'Day 1: Kigali, rest, hill sunset. Day 2: Genocide Memorial in the morning, then drive to Musanze. Day 3: gorilla trek if you hold a permit; quiet afternoon. Days 4–5: a north-park extra or return to Kigali. Do not add Nyungwe on this length. Hamwe’s Kigali First Circle is 4 days; Akagera Wild Circle is 5 days if you want savannah instead of gorillas.',
  },
  {
    q: 'Plan 8 days in Rwanda',
    tags: ['plan', 'days', 'eight'],
    a: 'Kigali (2 days, memorial on a morning with sleep) then Volcanoes National Park and a gorilla trek, then Lake Kivu to rest. That is the shape of Hamwe’s Virunga Dawn Circle (8 days), which includes the gorilla permit.',
  },
  {
    q: 'Plan 12 days in Rwanda',
    tags: ['plan', 'days', 'twelve'],
    a: 'Kigali, Volcanoes (gorillas), Lake Kivu, Nyungwe, then Akagera, back to Kigali. That is Hamwe’s Full Gathering: 12 days, gorilla permit included, next listed departure 14 October 2026.',
  },
  {
    q: 'Is Rwanda expensive?',
    tags: ['expensive', 'cost', 'budget'],
    a: 'A budget traveler, excluding a hotel, spends about FRw 10,000–20,000 a day: transport FRw 8,000–10,000 and food FRw 5,000–10,000. A comfortable traveler often spends FRw 20,000–45,000 a day excluding a hotel. Frequent taxis or a private car can be FRw 20,000–50,000 for transport alone. Hamwe day tickets are FRw 8,000–20,000. Luxury packages are FRw 80,000 — nothing on this site costs more.',
  },
  {
    q: 'How much do day tickets cost?',
    tags: ['ticket', 'price', 'activity'],
    a: 'Every Hamwe day ticket is FRw 8,000–20,000. Luxury packages are FRw 80,000. Examples: Budget meals FRw 8,000, budget transport FRw 9,000, Budget traveler day FRw 15,000, Comfortable traveler day FRw 20,000, Taxi / private car day FRw 20,000, Luxury package day FRw 80,000.',
  },
  {
    q: 'What is a luxury package?',
    tags: ['luxury', 'package', 'maximum', '80'],
    a: 'Luxury packages are FRw 80,000 — the highest fare on this site. That is The Full Gathering, Virunga Dawn Circle, and the Luxury package day. No listed price is higher than FRw 80,000. The lowest fare is FRw 8,000.',
  },
  {
    q: 'What does a budget traveler spend per day?',
    tags: ['budget', 'daily', 'food', 'transport'],
    a: 'Excluding accommodation: transport FRw 8,000–10,000 a day, food FRw 5,000–10,000 a day, total FRw 10,000–20,000 a day. The Budget traveler day ticket is FRw 15,000.',
  },
  {
    q: 'What does a comfortable traveler spend per day?',
    tags: ['comfort', 'daily', 'taxi'],
    a: 'Excluding accommodation: transport FRw 10,000–25,000 a day, food FRw 10,000–20,000 a day, total FRw 20,000–45,000 a day. Hamwe’s Comfortable traveler day ticket is FRw 20,000. Luxury packages are FRw 80,000.',
  },
  {
    q: 'How much are taxis and private cars per day?',
    tags: ['taxi', 'private', 'car', 'transport'],
    a: 'Using taxis or private cars frequently is often FRw 20,000–50,000 per day for transport alone. The Taxi / private car day ticket is FRw 20,000 for a set daytime block. The Luxury package day is FRw 80,000, the highest fare on this site.',
  },
  {
    q: 'How much is The Full Gathering?',
    tags: ['gathering', 'price', 'tour'],
    a: 'The Full Gathering is a 12-day luxury package at FRw 80,000 — the highest fare on this site. Next listed departure is 14 October 2026. The gorilla permit is included. Seats are capped at 14.',
  },
  {
    q: 'How much is Virunga Dawn Circle?',
    tags: ['virunga', 'price', 'tour'],
    a: 'Virunga Dawn Circle is an 8-day luxury package at FRw 80,000, gorilla permit included. Next listed departure is 2 November 2026. Seats are capped at 12. Nothing on this site costs more than FRw 80,000.',
  },
  {
    q: 'How much is Kivu Shore Cohort?',
    tags: ['kivu', 'price', 'tour'],
    a: 'Kivu Shore Cohort is 6 days on Lake Kivu, listed at FRw 56,000. Next listed departure is 22 October 2026. It does not include a gorilla permit.',
  },
  {
    q: 'How much is Canopy and Kingdom?',
    tags: ['canopy', 'nyungwe', 'price'],
    a: 'Canopy & Kingdom is 9 days in the south (Nyungwe and royal-road Nyanza), listed at FRw 72,000. Next listed departure is 18 November 2026. It is a forest and kingdom trip, not a gorilla trek.',
  },
  {
    q: 'How much is Akagera Wild Circle?',
    tags: ['akagera', 'price', 'tour'],
    a: 'Akagera Wild Circle is 5 days, listed at FRw 48,000. Next listed departure is 29 October 2026. It is a savannah and lake itinerary, not a gorilla trek.',
  },
  {
    q: 'How much is Kigali First Circle?',
    tags: ['kigali', 'price', 'tour'],
    a: 'Kigali First Circle is 4 days in the capital, listed at FRw 32,000. Next listed departure is 17 October 2026. It does not include a gorilla permit.',
  },
  {
    q: 'What should families know?',
    tags: ['family', 'kids', 'children'],
    a: 'Gorilla trekking minimum age is 15. Kigali, Lake Kivu, and Akagera are more flexible for families. Hamwe circles are paced for adults. Write the desk before placing a child on a full gathering.',
  },
  {
    q: 'Any cultural rules I should know?',
    tags: ['culture', 'etiquette', 'rules'],
    a: 'Greet people. Dress modestly at memorials and churches. Plastic bags are banned. The last Saturday morning of the month is Umuganda. Receive items with the right hand or both hands. Public life is relatively conservative.',
  },
  {
    q: 'What is the phone and internet situation?',
    tags: ['sim', 'mtn', 'internet'],
    a: 'Buy an MTN or Airtel SIM with an unlocked phone; a passport is often required. Data is widely available in towns. Nyungwe and parts of Akagera can drop signal. Download maps offline. Hamwe circles use a WhatsApp board.',
  },
  {
    q: 'What plugs does Rwanda use?',
    tags: ['plug', 'adapter', 'electricity'],
    a: 'Electricity is 230V. Plug types are Type C and Type J. Bring a universal adaptor.',
  },
  {
    q: 'Which airport do I fly into?',
    tags: ['airport', 'kgl', 'flight'],
    a: 'Kigali International Airport, airport code KGL. Hamwe hosted tours include airport welcome. Do not plan a gorilla dawn the same night you land late.',
  },
  {
    q: 'What is Musanze?',
    tags: ['musanze', 'ruhengeri', 'north'],
    a: 'Musanze (formerly Ruhengeri) is the main northern town for Volcanoes National Park. Gorilla briefing and overnight stays before the trek are based around here and Kinigi.',
  },
  {
    q: 'What volcanoes are in Volcanoes National Park?',
    tags: ['volcanoes', 'karisimbi', 'bisoke'],
    a: 'The park covers the Rwandan side of the Virunga volcanoes, including Karisimbi, Bisoke, Sabyinyo, Gahinga, and Muhabura. Gorilla trekking uses forested slopes, not a summit climb. Bisoke crater and Karisimbi are separate, harder hikes with their own permits.',
  },
  {
    q: 'Is Nyungwe a UNESCO site?',
    tags: ['nyungwe', 'unesco'],
    a: 'Yes. Nyungwe National Park is a UNESCO World Heritage Site (inscribed in 2023).',
  },
  {
    q: 'What is Huye?',
    tags: ['huye', 'butare', 'museum'],
    a: 'Huye (formerly Butare) in the south is known for the Ethnographic Museum and a university town atmosphere. It sits on the road toward Nyanza and Nyungwe.',
  },
  {
    q: 'What is Rubavu?',
    tags: ['rubavu', 'gisenyi', 'kivu'],
    a: 'Rubavu is the northern Lake Kivu city, still often called Gisenyi. It is the livelier Kivu shore, near the DRC border crossing to Goma.',
  },
  {
    q: 'What is Karongi?',
    tags: ['karongi', 'kibuye', 'kivu'],
    a: 'Karongi (Kibuye) is a quieter Lake Kivu town with islands and inlets, used for slower lake days.',
  },
  {
    q: 'Can I drink tap water?',
    tags: ['water', 'tap'],
    a: 'Kigali tap water is treated, but most visitors still use bottled or filtered water, especially outside the capital. Amazi is the Kinyarwanda word for water; Gisubizo still answers you in English.',
  },
  {
    q: 'What is there to do at night?',
    tags: ['night', 'jazz', 'kigali'],
    a: 'Kigali has live music, hotel terraces, and restaurant courtyards. It is not a late club capital. On gorilla or Nyungwe mornings, sleep is the plan. Hamwe lists a long-table supper and a jazz night as extras.',
  },
  {
    q: 'How do Apple Wallet and Calendar work?',
    tags: ['wallet', 'calendar', 'ticket'],
    a: 'After the demo checkout you get a QR boarding pass. Add to Calendar downloads an .ics file. Add to Apple Wallet downloads a pass file. A fully signed Apple pass needs Apple certificates in production.',
  },
  {
    q: 'Are payments on this website live?',
    tags: ['demo', 'payment', 'live'],
    a: 'No. Checkout on this site is a demonstration. MoMo, QR, card, and PayPal screens do not take real money until a merchant account is connected.',
  },
  {
    q: 'What extras can I book?',
    tags: ['activities', 'extras'],
    a: 'Hamwe day tickets are FRw 8,000–20,000. Luxury packages are FRw 80,000. That includes Budget traveler day (FRw 15,000), budget transport (FRw 9,000), budget meals (FRw 8,000), Luxury package day (FRw 80,000), Imigongo studio, coffee, long table, canopy hour, boats, walks, memorial morning, market, caves, and jazz. Hosted tours are FRw 32,000–80,000 on Tours.',
  },
  {
    q: 'What is the Full Gathering itinerary?',
    tags: ['gathering', 'itinerary'],
    a: 'Twelve days, Kigali to Kigali: capital and memorial, Volcanoes gorilla trek, Lake Kivu, Nyungwe canopy and chimps, Akagera game drive and Lake Ihema, then a farewell table. Gorilla permit is included.',
  },
  {
    q: 'Does Hamwe include park fees?',
    tags: ['park', 'fees', 'includes'],
    a: 'Yes for the parks on that tour. Gorilla permits are included only when a trek is listed. International flights are never included.',
  },
  {
    q: 'What is the circle call?',
    tags: ['call', 'predeparture'],
    a: 'Two weeks before departure the host holds a group call so the circle learns names, diet, and pace before the airport.',
  },
  {
    q: 'How many people are in a circle?',
    tags: ['seats', 'group', 'size'],
    a: 'Hamwe circles are 10 to 14 people, including the hosted table. Individual tours show remaining seats on the Departures page.',
  },
  {
    q: 'What is the Hamwe email and phone?',
    tags: ['email', 'phone', 'contact'],
    a: 'circle@hamwe.rw and +250 794 607 518. Office: Ikaze House, KG 11 Ave, Kisimenti, Kigali. Hours 08:00 - 12:00 ¦ 13:30 - 18:00 CAT.',
  },
  {
    q: 'Is English enough in Rwanda?',
    tags: ['english', 'language'],
    a: 'Yes for Hamwe tours, Kigali hotels, and most visitor services. Kinyarwanda is the national language. Gisubizo answers in English only. If you want Kinyarwanda words, ask for a translation list and you will still get the explanation in English.',
  },
  {
    q: 'Teach me a few Kinyarwanda words',
    tags: ['kinyarwanda', 'words', 'hello'],
    a: 'Here are common words, explained in English: Muraho means hello. Bite se? means how are you? Ni meza means I am fine. Murakoze means thank you. Yego means yes. Oya means no. Amazi means water. Mwaramutse means good morning. Mwiriwe means good afternoon or evening.',
  },
  {
    q: 'How do you say hello in Kinyarwanda?',
    tags: ['kinyarwanda', 'hello', 'muraho'],
    a: 'Hello is Muraho. Good morning is Mwaramutse. Good afternoon or evening is Mwiriwe. Gisubizo still replies to you in English.',
  },
  {
    q: 'How do you say thank you in Kinyarwanda?',
    tags: ['kinyarwanda', 'thank', 'murakoze'],
    a: 'Thank you is Murakoze. Thank you very much is Murakoze cyane.',
  },
  {
    q: 'What does Gisubizo mean?',
    tags: ['gisubizo', 'meaning'],
    a: 'It comes from a Kinyarwanda word for “the answer.” On this website Gisubizo is the English-language assistant for Rwanda facts and Hamwe bookings.',
  },
  {
    q: 'Is this the official Visit Rwanda website?',
    tags: ['official', 'rdb', 'visitrwanda'],
    a: 'No. The national tourism site is visitrwanda.com, linked to the Rwanda Development Board. This site is Hamwe Tourism — a private Kigali travel company. They are not the same organisation.',
  },
  {
    q: 'What is the website address?',
    tags: ['website', 'domain', 'url'],
    a: 'The public site is published at https://arnold-rg.github.io/hamwe/. The browser tab is labelled Hamwe Tourism.',
  },
  {
    q: 'On which side of the road do they drive?',
    tags: ['drive', 'right', 'road'],
    a: 'Rwanda drives on the right-hand side of the road.',
  },
  {
    q: 'What is Iby Iwacu?',
    tags: ['iby', 'iwacu', 'community'],
    a: 'Iby’Iwacu is a community cultural village near Volcanoes National Park. Virunga Dawn Circle lists a community visit of this kind. It is a cultural stop, not a gorilla trek.',
  },
  {
    q: 'Can I see both gorillas and chimps?',
    tags: ['gorilla', 'chimp', 'both'],
    a: 'Yes on a long itinerary, not on the same day. Put travel time — often Lake Kivu — between Volcanoes National Park and Nyungwe. The Full Gathering is built for that sequence.',
  },
  {
    q: 'What is Lake Ihema?',
    tags: ['ihema', 'akagera', 'boat'],
    a: 'Lake Ihema is the main visitor lake in Akagera National Park. Boat trips are used for hippos, crocodiles, and birds, usually paired with a game drive.',
  },
  {
    q: 'Is Rwanda in the Southern African Development Community?',
    tags: ['sadc', 'eac', 'region'],
    a: 'Rwanda is a member of the East African Community (EAC). It is not a substitute for checking visa rules. Use Irembo / immigration for entry.',
  },
  {
    q: 'What is the flag of Rwanda?',
    tags: ['flag', 'colours'],
    a: 'The flag has horizontal bands of blue, yellow, and green, with a golden sun in the upper fly. Blue stands for peace and happiness, yellow for economic development, green for prosperity, and the sun for enlightenment.',
  },
  {
    q: 'What is the national park list in Rwanda?',
    tags: ['parks', 'national'],
    a: 'The main national parks visitors use are Volcanoes, Nyungwe, Akagera, and Gishwati-Mukura. Hamwe’s published tours use Volcanoes, Nyungwe, and Akagera plus Lake Kivu and Kigali.',
  },
  {
    q: 'What is Gishwati-Mukura?',
    tags: ['gishwati', 'mukura', 'forest'],
    a: 'Gishwati-Mukura is a smaller western forest national park, a landscape of restored forest between the volcanoes and Nyungwe. Nyungwe remains Hamwe’s main chimpanzee and canopy park.',
  },
  {
    q: 'What coffee is Rwanda known for?',
    tags: ['coffee', 'tea'],
    a: 'Rwanda grows high-altitude Arabica coffee, especially on the shores of Lake Kivu, and tea in the south-west near Nyungwe. Hamwe lists a cooperative “cherry to cup” extra at the lake.',
  },
  {
    q: 'What is Intore?',
    tags: ['intore', 'dance'],
    a: 'Intore is a traditional Rwandan warrior dance, still performed at cultural events. It is dance and drumming, not a park activity.',
  },
  {
    q: 'What is an agaseke?',
    tags: ['basket', 'agaseke'],
    a: 'Agaseke are traditional woven peace baskets, a common craft souvenir. Buy from a named cooperative or studio when you can.',
  },
  {
    q: 'What religion is common in Rwanda?',
    tags: ['religion', 'church'],
    a: 'Christianity is the majority faith, with Catholic and Protestant churches common. There is also a Muslim community. Dress modestly in churches and at memorials.',
  },
  {
    q: 'What is the Kigali Genocide Memorial?',
    tags: ['memorial', 'kgm', 'gisozi'],
    a: 'It is the principal memorial and museum in Gisozi, Kigali, documenting the 1994 Genocide against the Tutsi and burying more than 250,000 victims. Allow a quiet morning. Photography rules inside must be followed.',
  },
  {
    q: 'What are Nyamata and Murambi?',
    tags: ['nyamata', 'murambi', 'memorial'],
    a: 'They are genocide memorial sites outside Kigali. Nyamata and Ntarama are former churches; Murambi is a former school. They are more raw than the Kigali museum. Only go if you are prepared, and follow every photography and dress rule.',
  },
  {
    q: 'Is Hamwe a government agency?',
    tags: ['government', 'private', 'rdb'],
    a: 'No. Hamwe Tourism is a private travel company on this website. Park permits and immigration remain with Rwandan authorities (RDB and immigration).',
  },
  {
    q: 'What is this website built for?',
    tags: ['website', 'project', 'hamwe'],
    a: 'This website is the Hamwe Tourism product: browse tours, extras, and day tickets, pay on a demo checkout, request a trip, and ask Gisubizo in English about Rwanda and the company. Source is public on GitHub at Arnold-RG/hamwe.',
  },
  {
    q: 'Can the public view the source code?',
    tags: ['github', 'public', 'git'],
    a: 'Yes. The project is a public GitHub repository: https://github.com/Arnold-RG/hamwe. Anyone can view it. The live site is https://arnold-rg.github.io/hamwe/.',
  },
  {
    q: 'What meals are included?',
    tags: ['meals', 'includes'],
    a: 'Each tour lists meals by day. Hosted tours include lodges and the meals named in the journal — typically breakfasts, many lunches, and several communal dinners. Exact meal counts are on that tour’s page.',
  },
  {
    q: 'What is the next Hamwe departure?',
    tags: ['next', 'departure', 'october'],
    a: 'On this site the nearest listed Full Gathering departure is 14 October 2026. Other tours follow in October and November 2026. Check Tours for live seat counts.',
  },
  {
    q: 'How do I request a custom trip?',
    tags: ['request', 'custom', 'contact'],
    a: 'Open Request a trip on this website, or write circle@hamwe.rw / call +250 794 607 518. Send your travel window, party size, and the parks you care about. Hamwe Tourism will point you to a published departure or sketch a hosted itinerary.',
  },
  {
    q: 'What is Hamwe Tourism?',
    tags: ['hamwe', 'tourism', 'brand', 'name'],
    a: 'Hamwe Tourism is the name of this Kigali travel company. Hamwe means “together.” It is not Visit Rwanda, the national tourism brand. The live site is https://arnold-rg.github.io/hamwe/.',
  },
]

export const GISUBIZO_PROMPTS = QA_BANK.map((item) => item.q)

export function shufflePrompts(count = 6): string[] {
  const copy = [...GISUBIZO_PROMPTS]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

export function relatedQuestions(item: QAItem, asked: string, count = 4): string[] {
  const askedN = norm(asked)
  const tagged = QA_BANK.filter((row) => row.q !== item.q && row.tags.some((tag) => item.tags.includes(tag)))
  const pool = (tagged.length ? tagged : QA_BANK.filter((row) => row.q !== item.q)).filter(
    (row) => norm(row.q) !== askedN,
  )
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count).map((row) => row.q)
}

export function matchQA(query: string): QAItem | null {
  const q = norm(query)
  if (!q) return null

  let best: { item: QAItem; score: number } | null = null
  const qWords = words(q)

  for (const item of QA_BANK) {
    const nq = norm(item.q)
    if (q === nq) return item

    const iWords = new Set(words(nq))
    const overlap = qWords.filter((word) => iWords.has(word)).length
    const tagHits = item.tags.filter((tag) => q.split(' ').includes(tag) || q.includes(tag)).length
    let score = overlap * 5 + tagHits * 3
    if (nq.includes(q) || q.includes(nq)) score += 22
    if (overlap >= 3) score += 8

    if (!best || score > best.score) best = { item, score }
  }

  if (!best) return null
  const min = qWords.length <= 2 ? 10 : 12
  if (best.score < min) return null
  return best.item
}
