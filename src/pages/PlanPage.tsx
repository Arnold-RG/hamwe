import { Link } from 'react-router-dom'
import { OFFICE_ADDRESS, OFFICE_HOURS, OFFICE_PHONE } from '../lib/hours'

const guides = [
  {
    code: '01',
    title: 'When to go',
    copy: 'The long dry season (June–September) is the classic window for gorilla treks, Akagera, and hill walking. December–February is a shorter dry spell. March–May and October–November are wetter — still walkable, with more mud and greener terraces. The last Saturday morning of each month is Umuganda until about midday; plan a later start in town.',
  },
  {
    code: '02',
    title: 'Visa and entry',
    copy: 'Hamwe does not issue visas. Check Irembo and Rwanda Directorate General of Immigration and Emigration for your passport. Many visitors enter visa-free or with an e-visa / visa on arrival. Your passport should be valid at least six months. Yellow-fever proof is asked if you arrive from an endemic country.',
  },
  {
    code: '03',
    title: 'What to pack',
    copy: 'Layers, a rain shell, broken-in walking shoes, and modest clothes for memorials and churches. Leave single-use plastic bags at home — Rwanda bans them at the airport. A headlamp, spare battery, and a small daypack cover most days. Gorilla treks want gaiters and gardening gloves if you have them.',
  },
  {
    code: '04',
    title: 'Money and payments',
    copy: 'Daily life runs on Rwandan francs. Cards work in Kigali hotels; cash and MTN MoMo cover markets and taxis. Hamwe fares are shown in FRw first (FRw 8,000–80,000 on this site). Checkout here is a demo until a live merchant account is connected.',
  },
  {
    code: '05',
    title: 'Health and insurance',
    copy: 'Buy travel insurance that covers trekking and evacuation. Ask a clinician about malaria prevention if you will sleep near Akagera or the lake. Drink bottled or treated water. Altitude in Musanze is cooler than Kigali — pack for both.',
  },
  {
    code: '06',
    title: 'Getting here',
    copy: 'Fly into Kigali International Airport (KGL). International flights are yours. Airport welcome is in every hosted tour ticket. The house is at Ikaze House, KG 11 Ave, Kisimenti — a short ride from the airport and from town.',
  },
]

export function PlanPage() {
  return (
    <div className="page-pad">
      <header className="page-hero">
        <p className="eyebrow">Plan · Hamwe Tourism</p>
        <h1>Arrive ready. Walk without assembling the country at midnight.</h1>
        <p className="lede">
          Visa, season, packing, money, and the Kigali house — the practical sheet for a Hamwe trip.
          Book a dated tour when you are ready, or request a custom itinerary.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/tours">
            See tours
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            Request a trip
          </Link>
        </div>
      </header>

      <div className="about-grid">
        {guides.map((item) => (
          <section key={item.code}>
            <p className="eyebrow">{item.code}</p>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </section>
        ))}
      </div>

      <aside className="house-note">
        <p className="eyebrow">On the ground</p>
        <h2>Ikaze House</h2>
        <p>
          {OFFICE_ADDRESS.full}. Phone {OFFICE_PHONE.display}. Hours {OFFICE_HOURS.label} CAT, every
          day.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/included">
            What the ticket includes
          </Link>
          <Link className="btn btn-ghost" to="/responsible">
            Travel with care
          </Link>
        </div>
      </aside>
    </div>
  )
}
