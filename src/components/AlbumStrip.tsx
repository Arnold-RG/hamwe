import { Link } from 'react-router-dom'
import { album } from '../data/album'

export function AlbumStrip() {
  if (!album.length) return null

  const loop = [...album, ...album]

  return (
    <section className="album-reel" data-reveal>
      <header className="section-head split">
        <div>
          <p className="eyebrow">Photo album</p>
          <h2>Rwanda, still moving.</h2>
        </div>
        <Link className="text-link" to="/album">
          Open the album
        </Link>
      </header>
      <div className="album-reel-mask">
        <ul className="album-reel-track">
          {loop.map((photo, index) => (
            <li key={`${photo.id}-${index}`}>
              <Link to="/album">
                <img src={photo.src} alt="" />
                <span>{photo.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
