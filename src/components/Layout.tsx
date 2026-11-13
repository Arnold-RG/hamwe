import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { applyPageMeta } from '../lib/meta'
import { Footer } from './Footer'
import { IntroSplash } from './IntroSplash'
import { Navbar } from './Navbar'
import { ScrollMotion } from './ScrollMotion'
import { GisubizoDock } from './GisubizoDock'

function introAlreadySeen() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('skip-intro')
}

export function Layout() {
  const location = useLocation()
  const [introDone, setIntroDone] = useState(introAlreadySeen)
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('hamwe-intro', 'seen')
    } catch {
      /* private mode */
    }
    document.documentElement.classList.add('skip-intro')
    setIntroDone(true)
  }, [])

  useEffect(() => {
    applyPageMeta(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (introDone) document.getElementById('boot-intro')?.remove()
  }, [introDone])

  return (
    <div className={`shell ${introDone ? 'is-live' : 'is-waiting'}`}>
      {introDone ? null : <IntroSplash onDone={finishIntro} />}
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="atmosphere" aria-hidden="true" />
      {introDone ? <ScrollMotion /> : null}
      <div className="site-stage" aria-hidden={introDone ? undefined : true}>
        <Navbar />
        <main id="content">
          <Outlet />
        </main>
        <Footer />
      </div>
      {introDone ? <GisubizoDock /> : null}
    </div>
  )
}
