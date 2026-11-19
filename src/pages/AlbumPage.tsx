import { useState } from 'react'
import { rwandaAlbum } from '../data/album'

export function AlbumPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = rwandaAlbum.find((photo) => photo.id === openId)

  return (
    <div className="page-pad album-page">
      <header className="page-hero">
        <p className="eyebrow">Film · Rwanda</p>
        <h1>Photo album</h1>
        <p className="lede">
          {rwandaAlbum.length
            ? `${rwandaAlbum.length} photographs of the country — one frame for each subject.`
            : 'The album has no photographs yet.'}
        </p>
      </header>

      {rwandaAlbum.length ? (
        <div className="album-grid">
          {rwandaAlbum.map((photo) => (
            <button
              key={photo.id}
              className="album-tile"
              type="button"
              onClick={() => setOpenId(photo.id)}
            >
              <img src={photo.src} alt="" loading="lazy" />
              <span>
                <strong>{photo.title}</strong>
                <em>{photo.place}</em>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {open ? (
        <button className="album-lightbox" type="button" onClick={() => setOpenId(null)}>
          <figure>
            <img src={open.full || open.src} alt={`${open.title} — ${open.place}`} />
            <figcaption>
              <strong>{open.title}</strong>
              <em>{open.place}</em>
            </figcaption>
          </figure>
        </button>
      ) : null}
    </div>
  )
}
