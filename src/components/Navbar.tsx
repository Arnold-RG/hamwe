import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { Logo } from './Logo'

const links = [
  { to: '/tours', label: 'Tours' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/activities', label: 'Activities' },
  { to: '/album', label: 'Album' },
  { to: '/plan', label: 'Plan' },
  { to: '/about', label: 'About' },
  { to: '/tickets', label: 'Tickets' },
]

export function Navbar() {
  const { cart, tickets } = useBooking()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    linksRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-solid' : ''} ${open ? 'nav-open' : ''}`}>
      <Logo />

      <nav id="site-nav" ref={linksRef} className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={`nav-link${link.to === '/tickets' ? ' nav-link-mobile' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-end">
        <NavLink to="/tickets" className="ghost-link">
          Tickets{tickets.length ? ` (${tickets.length})` : ''}
        </NavLink>
        <NavLink to={cart ? '/checkout' : '/tours'} className="nav-cta">
          {cart ? 'Checkout' : 'Book a trip'}
        </NavLink>
        <button
          ref={menuRef}
          className={`menu-btn ${open ? 'open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
