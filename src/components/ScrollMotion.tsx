import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const REVEAL =
  '[data-reveal], .page-hero, .circle-card, .plan-card, .land-plate, .faq-item, .tour-card, .activity-card, .steps li, .trust-chips li, .album-tile'

export function ScrollMotion() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const root = document.getElementById('content') ?? document.body
    const reduceMotion = document.documentElement.hasAttribute('data-reduced-motion')

    const mark = (node: Element) => node.classList.add('is-in')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          mark(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px 12% 0px' },
    )

    const scan = () => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(REVEAL))
      nodes.forEach((node) => {
        if (node.classList.contains('is-in')) return
        if (reduceMotion) {
          mark(node)
          return
        }
        const rect = node.getBoundingClientRect()
        const onScreen = rect.top < window.innerHeight * 0.98 && rect.bottom > 0
        if (onScreen) mark(node)
        else observer.observe(node)
      })
    }

    scan()

    const mutations = new MutationObserver(() => scan())
    mutations.observe(root, { childList: true, subtree: true })

    const fallback = window.setTimeout(() => {
      root.querySelectorAll(REVEAL).forEach(mark)
    }, 700)

    const hero = document.querySelector<HTMLElement>('.hero-bg')
    const bar = document.querySelector<HTMLElement>('.scroll-progress > span')

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar) bar.style.transform = `scaleX(${progress})`
      if (hero && !reduceMotion) {
        hero.style.transform = `translate3d(0, ${window.scrollY * 0.28}px, 0) scale(1.08)`
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(fallback)
      mutations.disconnect()
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [location.pathname])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span />
    </div>
  )
}
