import { Link } from 'react-router-dom'
import { activities, destinations, tours } from '../data'
import { compactDate, money } from '../lib/format'
import { Constellation } from '../components/Constellation'
import { TourCard } from '../components/TourCard'
import { DailyBudget } from '../components/DailyBudget'
import { AlbumStrip } from '../components/AlbumStrip'
import { OfficeCountdown } from '../components/OfficeCountdown'

const featured = tours.slice(0, 3)
const next = [...tours].sort((a, b) => a.nextDeparture.localeCompare(b.nextDeparture))[0]

const trust = [
  {
    code: '01',
    title: 'Gorilla permits in the fare',
    copy: 'When a trek is listed, the permit is already bought. You do not assemble that at midnight.',
  },
  {
    code: '02',
    title: 'Bilingual Kigali host',
    copy: 'A host from the city walks every tour — days, tables, and the quiet after gorillas.',
  },
  {
    code: '03',
    title: 'Airport welcome',
    copy: 'Kigali pickup is in the ticket. You land. Someone is holding your name.',
  },
  {
    code: '04',
    title: 'Pre-trip call',
    copy: 'Two weeks out, faces on a call. Nerves, food rules, who is coming from where.',
  },
]

const house = [
  {
    to: '/plan',
    eyebrow: 'Plan',
    title: 'Visa, season, packing',
    copy: 'When to go, what Irembo asks, what to leave at the airport, and how the Kigali house works.',
  },
  {
    to: '/included',
    eyebrow: 'Included',
    title: 'What the ticket buys',
    copy: 'Host, lodges, park fees when listed, airport welcome, named meals. Flights stay yours.',
  },
  {
    to: '/responsible',
    eyebrow: 'Care',
    title: 'Travel with the country',
    copy: 'Memorials, parks, the plastic-bag ban, photography, Umuganda, and money at the table.',
  },
]

export function HomePage() {
  return (
    <div className="page-home">
      <section className="hero hero-brand arn-hero">
        <div className="hero-bg">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-hills.jpg`}
            alt="Terraced green hills of Rwanda in morning mist"
          />
          <div className="hero-filaments" aria-hidden="true" />
          <div className="hero-scanlines" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
        </div>

        <div className="hero-hud hero-hud-solo">
          <div className="hero-copy">
            <p className="eyebrow brand-signal">Hamwe Tourism</p>
            <h1>
              Rwanda, walked
              <em> together.</em>
            </h1>
            <p className="lede">
              Hosted tours from Kigali — gorillas, Kivu, Nyungwe, Akagera — for small groups who
              buy a seat and meet at the table.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/tours">
                See tours
              </Link>
              <Link className="btn btn-ghost" to="/plan">
                Plan your trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <p key={index}>
              Kigali · Volcanoes · Lake Kivu · Nyungwe · Akagera · Nyanza · Musanze · Huye ·
              Rubavu · Kimironko ·
            </p>
          ))}
        </div>
      </div>

      <section className="boarding-band" data-reveal>
        <OfficeCountdown />
        <div className="boarding-band-inner">
          <div className="boarding-band-copy">
            <p className="eyebrow">Next departure</p>
            <h2>A dated seat. A shared table.</h2>
            <p className="lede">
              Every tour is capped, hosted, and already written. You choose a departure — not a
              buffet of options.
            </p>
            {next ? (
              <dl className="hero-stats compact-stats">
                <div>
                  <dt>Group size</dt>
                  <dd>10–14</dd>
                </div>
                <div>
                  <dt>Next seat</dt>
                  <dd>{compactDate(next.nextDeparture)}</dd>
                </div>
                <div>
                  <dt>Host</dt>
                  <dd>Kigali-based</dd>
                </div>
              </dl>
            ) : null}
          </div>
          <div className="hero-stage">
            <Constellation />
            {next ? (
              <aside className="boarding-pass">
                <header>
                  <span>
                    <i className="live-pip" /> Next boarding
                  </span>
                  <span className="mono-meta">HMW · KGL</span>
                </header>
                <p className="boarding-route">Kigali → hills → table</p>
                <strong>{next.name}</strong>
                <dl>
                  <div>
                    <dt>Departs</dt>
                    <dd>{compactDate(next.nextDeparture)}</dd>
                  </div>
                  <div>
                    <dt>Length</dt>
                    <dd>{next.durationDays} days</dd>
                  </div>
                  <div>
                    <dt>Region</dt>
                    <dd>{next.region}</dd>
                  </div>
                  <div>
                    <dt>Fare</dt>
                    <dd>{money(next.priceUsd)}</dd>
                  </div>
                </dl>
                <Link className="btn btn-primary btn-block" to={`/tours/${next.slug}`}>
                  Claim a seat
                </Link>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <AlbumStrip />

      <section className="section unsection" data-reveal>
        <header className="section-head">
          <p className="eyebrow">The method</p>
          <h2>Not a bus. A planned trip.</h2>
        </header>
        <ol className="steps">
          <li data-reveal style={{ '--reveal-delay': '0ms' } as object}>
            <span>01</span>
            <h3>Pick a departure</h3>
            <p>Every tour is dated, hosted, and capped. The itinerary is already written. You choose a trip, not a buffet of options.</p>
          </li>
          <li data-reveal style={{ '--reveal-delay': '90ms' } as object}>
            <span>02</span>
            <h3>Buy the ticket</h3>
            <p>One seat. Or two. Gorilla permits, lodges, and the road are in the price. You are not assembling a trip at midnight.</p>
          </li>
          <li data-reveal style={{ '--reveal-delay': '180ms' } as object}>
            <span>03</span>
            <h3>Meet before you fly</h3>
            <p>Two weeks out, the group meets on a call. Faces, food rules, nerves. Strangers become a table.</p>
          </li>
          <li data-reveal style={{ '--reveal-delay': '270ms' } as object}>
            <span>04</span>
            <h3>Walk Rwanda</h3>
            <p>Then do the country — and the extras — together. Coffee, long tables, canopy hours, lamp boats.</p>
          </li>
        </ol>
      </section>

      <section className="trust-strip" data-reveal>
        <header className="section-head">
          <p className="eyebrow">Already in the fare</p>
          <h2>Visit with no problem.</h2>
        </header>
        <ul className="trust-chips">
          {trust.map((item, index) => (
            <li key={item.code} data-reveal style={{ '--reveal-delay': `${index * 90}ms` } as object}>
              <span className="trust-code">{item.code}</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" data-reveal>
        <header className="section-head split">
          <div>
            <p className="eyebrow">Tours</p>
            <h2>Upcoming departures</h2>
          </div>
          <Link className="text-link" to="/tours">
            All tours
          </Link>
        </header>
        <div className="card-grid featured">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="section unsection land-bleed" data-reveal>
        <header className="section-head split">
          <div>
            <p className="eyebrow">Destinations</p>
            <h2>The country, walked as a map.</h2>
          </div>
          <Link className="text-link" to="/destinations">
            All land
          </Link>
        </header>
        <div className="land-grid home-land">
          {destinations.slice(0, 3).map((place) => (
            <article key={place.id} className="land-plate">
              <Link to={`/tours/${place.tourSlug}`}>
                <img src={place.image} alt={place.name} />
                <div>
                  <p className="mono-meta">{place.region}</p>
                  <h2>{place.name}</h2>
                  <p>{place.blurb}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="together-band" data-reveal>
        <div className="together-copy">
          <p className="eyebrow">Activities</p>
          <h2>The tour is the spine. Day tickets are how the table actually happens.</h2>
          <p>
            Day tickets are FRw 8,000–20,000. Luxury packages are FRw 80,000 — nothing on this site
            costs more.
          </p>
          <Link className="btn btn-light" to="/activities">
            Browse activities
          </Link>
        </div>
        <ul className="together-list">
          {activities.slice(0, 4).map((activity) => (
            <li key={activity.id}>
              <Link to={`/activities/${activity.slug}`}>
                <img src={activity.image} alt="" />
                <div>
                  <strong>{activity.name}</strong>
                  <span>
                    {activity.city} · {money(activity.priceUsd)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <DailyBudget />

      <section className="section" data-reveal>
        <header className="section-head">
          <p className="eyebrow">The house</p>
          <h2>What a tourism desk should already have.</h2>
        </header>
        <div className="plan-grid">
          {house.map((item) => (
            <article key={item.to} className="plan-card">
              <p className="eyebrow">{item.eyebrow}</p>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <Link className="text-link" to={item.to}>
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="live-circles" data-reveal>
        <div className="live-copy">
          <p className="eyebrow">Request a trip</p>
          <h2>Need dates we have not published?</h2>
          <p>
            Write the Kigali house with your window, group size, and the parks you care about. We
            will sketch a hosted itinerary or point you to a departure that already exists.
          </p>
          <Link className="text-link" to="/contact">
            Request a trip
          </Link>
        </div>
        <Constellation compact />
      </section>

      <section className="closing-cta" data-reveal>
        <img src={`${import.meta.env.BASE_URL}images/cohort.jpg`} alt="Rwandans on the Congo Nile Trail" />
        <div>
          <p className="eyebrow">Next departure</p>
          <h2>Come for the hills. Stay for the table.</h2>
          <p>A host from Kigali. A country in a sensible order.</p>
          <Link className="btn btn-primary" to="/tours">
            Book a trip
          </Link>
        </div>
      </section>
    </div>
  )
}
