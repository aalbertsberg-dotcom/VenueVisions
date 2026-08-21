import type { CSSProperties } from 'react'
import type { VenueConfig, WeddingWorkspace } from '../types'

export default function Venues({ venues, weddings, onOpenVenue, onOpenCouple }: {
  venues: VenueConfig[]
  weddings: WeddingWorkspace[]
  onOpenVenue: (slug: string) => void
  onOpenCouple: (venueSlug: string, coupleSlug: string) => void
}) {
  return (
    <main className="page-main shell venue-directory-page">
      <section className="page-intro venue-directory-intro">
        <p className="eyebrow">VENUE VISIONS · VENUES</p>
        <h1>See Venue Visions in action.</h1>
        <p>Explore how the same platform adapts to different venue brands, inventory, spaces, packages and workflows. Couples always enter through the venue their wedding belongs to.</p>
      </section>

      <section className="venue-directory-grid">
        {venues.map((config) => {
          const venueWeddings = weddings.filter((wedding) => wedding.venueId === config.profile.id)
          const firstWedding = venueWeddings[0]
          return (
            <article
              key={config.profile.id}
              className="venue-directory-card"
              style={{ '--card-primary': config.profile.brandPrimary, '--card-accent': config.profile.brandAccent, '--card-surface': config.profile.brandSurface ?? '#f4f4f4' } as CSSProperties}
            >
              <div className="venue-directory-card__brand">
                <span className="venue-directory-card__mark">{config.profile.logoText}</span>
                <div><span>VENUE PORTAL</span><h2>{config.profile.shortName}</h2><p>{config.profile.locationLabel}</p></div>
              </div>
              <p className="venue-directory-card__tagline">{config.profile.tagline}</p>
              <div className="venue-directory-card__stats">
                <span><strong>{config.areas.length}</strong>spaces</span>
                <span><strong>{config.inventory.length}</strong>inventory styles</span>
                <span><strong>{venueWeddings.length}</strong>couple workspaces</span>
              </div>
              <div className="venue-directory-card__actions">
                <button className="button button--primary" onClick={() => onOpenVenue(config.profile.slug)}>Explore {config.profile.shortName}</button>
                {firstWedding && <button className="button button--ghost" onClick={() => onOpenCouple(config.profile.slug, firstWedding.accessSlug)}>Open a couple workspace</button>}
              </div>
              <small className="venue-directory-card__note">{config.profile.isSample ? 'Juniper & Stone is a fictional showcase property used to demonstrate alternate branding and configuration.' : 'Chandelier Oaks is configured from publicly available venue information; wedding planning records are illustrative.'}</small>
            </article>
          )
        })}
      </section>
    </main>
  )
}
