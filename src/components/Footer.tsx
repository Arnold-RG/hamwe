import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { DeskHours } from './DeskHours'
import { OFFICE_ADDRESS, OFFICE_PHONE } from '../lib/hours'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-mark">
            <Logo />
          </div>
          <p className="footer-lede">
            Hamwe Rwanda, walked with people you have not met yet. Kigali-born. Circle-sized.
          </p>
        </div>
        <div>
          <p className="footer-label">Walk</p>
          <Link to="/tours">Tours</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/album">Photo album</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/plan">Plan your trip</Link>
        </div>
        <div>
          <p className="footer-label">House</p>
          <Link to="/included">What’s included</Link>
          <Link to="/responsible">Travel with care</Link>
          <Link to="/about">How it works</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/gisubizo">Gisubizo</Link>
          <Link to="/contact">Request a trip</Link>
          <Link to="/tickets">Your tickets</Link>
          <a href="mailto:circle@hamwe.rw">circle@hamwe.rw</a>
        </div>
        <div>
          <p className="footer-label">On the ground</p>
          <p>{OFFICE_ADDRESS.building}</p>
          <p>
            {OFFICE_ADDRESS.street}, {OFFICE_ADDRESS.area}
          </p>
          <p>{OFFICE_ADDRESS.city}</p>
          <p>
            <a href={`tel:${OFFICE_PHONE.tel}`}>{OFFICE_PHONE.display}</a>
          </p>
          <DeskHours compact />
        </div>
      </div>
      <div className="footer-bar">
        <span>© {new Date().getFullYear()} Hamwe Tourism</span>
        <span>Fares in FRw. Demo payments — no live MoMo or card charge.</span>
      </div>
    </footer>
  )
}
