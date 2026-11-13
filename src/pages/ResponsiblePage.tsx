import { Link } from 'react-router-dom'

const rules = [
  {
    title: 'Memorials',
    copy: 'The Kigali Genocide Memorial, Nyamata, Ntarama, and Murambi are places of burial and testimony. Dress modestly, speak quietly, follow photography rules, and do not photograph remains. Only go if you are prepared.',
  },
  {
    title: 'Parks and gorillas',
    copy: 'Stay on the path the ranger sets. No flash on gorillas or chimps. Seven visitors per gorilla group, one hour. Ages 15 and up for gorilla treks. Do not go if you are ill — great apes share our diseases.',
  },
  {
    title: 'Plastic bags',
    copy: 'Rwanda bans non-biodegradable plastic bags. Airport officers can confiscate them. Pack in fabric or paper. Leave the supermarket roll at home.',
  },
  {
    title: 'Photography',
    copy: 'Ask before portraits in markets. No drones over parks, memorials, or government buildings without written permission. A muraho and a yes matter more than a long lens.',
  },
  {
    title: 'Umuganda',
    copy: 'The last Saturday morning of each month is community work until about midday. Many shops open later. It is a civic morning, not a tourist show — walk around it with respect.',
  },
  {
    title: 'Money at the table',
    copy: 'Tip park guides, drivers, and lodge staff in francs when the service was real. Buy crafts from named cooperatives when you can. Hamwe does not add a hidden service charge on this demo checkout.',
  },
]

export function ResponsiblePage() {
  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Care · Hamwe Tourism</p>
        <h1>Walk the country the way it asks to be walked.</h1>
        <p className="lede">
          Hamwe Tourism is a private Kigali house, not the Rwanda Development Board. Parks,
          immigration, and memorials belong to Rwandan authorities. We follow their rules, then add
          our own table manners.
        </p>
      </header>

      <div className="about-grid">
        {rules.map((item) => (
          <section key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </section>
        ))}
      </div>

      <section className="about-cta">
        <h2>Ready when the circle is.</h2>
        <Link className="btn btn-primary" to="/tours">
          See tours
        </Link>
      </section>
    </div>
  )
}
