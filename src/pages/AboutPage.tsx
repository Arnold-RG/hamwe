import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="about">
      <header className="page-hero">
        <p className="eyebrow">How Hamwe Tourism works</p>
        <h1>We plan the tour. You bring a stranger’s courage.</h1>
        <p className="lede">
          Hamwe — “together” — is a Kigali tourism house that sells seats on small, hosted Rwanda
          itineraries. The point is not more options. The point is a group that already has a
          road, a table, and a date.
        </p>
      </header>

      <figure className="about-plate">
        <img className="about-hero-img" src={`${import.meta.env.BASE_URL}images/imigongo.jpg`} alt="Imigongo geometric artwork" />
        <figcaption className="mono-meta">Imigongo · studio geometry</figcaption>
      </figure>

      <div className="about-grid">
        <section>
          <p className="eyebrow">01</p>
          <h2>Why strangers</h2>
          <p>
            Solo travelers over-plan. Friend groups under-commit. A circle of ten to fourteen
            people, introduced before the airport, is the size Rwanda’s lodges and gorilla groups
            already prefer. We lean into that.
          </p>
        </section>
        <section>
          <p className="eyebrow">02</p>
          <h2>What you buy</h2>
          <p>
            A dated seat. Park fees (including gorilla permits on the tours that list them),
            lodges, a bilingual host, the vehicle, and the meals named in the journal. Flights to
            Kigali are yours.
          </p>
        </section>
        <section>
          <p className="eyebrow">03</p>
          <h2>What happens after pay</h2>
          <p>
            You get a ticket. Two weeks out, a circle call. On the ground, a Kigali host keeps the
            days honest. Optional extras — supper, studio, boat — keep mixing the table.
          </p>
        </section>
        <section>
          <p className="eyebrow">04</p>
          <h2>Who this is for</h2>
          <p>
            Adults who want Rwanda whole, not a weekend of checkboxes. You do not need to know
            anyone. You do need to sit at a long table and walk at the group’s pace.
          </p>
        </section>
      </div>

      <section className="about-cta">
        <h2>The next departure leaves in October.</h2>
        <Link className="btn btn-primary" to="/tours">
          See departures
        </Link>
      </section>
    </div>
  )
}
