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
        <p>Explore how the same platform adapts to wedding venues, corporate event spaces and private-event properties. Clients always enter through the venue where their event is booked.</p>
      </section>

      <section className="venue-directory-grid">
        {venues.map((config) => {
          const venueEvents = weddings.filter((event) => event.venueId === config.profile.id)
          const firstEvent = venueEvents[0]
          const clientPlural = config.profile.clientPluralLabel ?? 'clients'
          const clientSingular = config.profile.clientLabel ?? 'client'
          return (
            <article
              key={config.profile.id}
              className="venue-directory-card"
              style={{ '--card-primary': config.profile.brandPrimary, '--card-accent': config.profile.brandAccent, '--card-surface': config.profile.brandSurface ?? '#f4f4f4' } as CSSProperties}
            >
              <div className="venue-directory-card__brand">
                <span className="venue-directory-card__mark">{config.profile.logoText}</span>
                <div><span>{(config.profile.venueTypeLabel ?? 'Venue portal').toUpperCase()}</span><h2>{config.profile.shortName}</h2><p>{config.profile.locationLabel}</p></div>
              </div>
              <p className="venue-directory-card__tagline">{config.profile.tagline}</p>
              <div className="venue-directory-card__stats">
                <span><strong>{config.areas.length}</strong>spaces</span>
                <span><strong>{config.inventory.length}</strong>resource styles</span>
                <span><strong>{venueEvents.length}</strong>{clientPlural} workspaces</span>
              </div>
              <div className="venue-directory-card__actions">
                <button className="button button--primary" onClick={() => onOpenVenue(config.profile.slug)}>Explore {config.profile.shortName}</button>
                {firstEvent && <button className="button button--ghost" onClick={() => onOpenCouple(config.profile.slug, firstEvent.accessSlug)}>Open a {clientSingular} workspace</button>}
              </div>
              <small className="venue-directory-card__note">{config.profile.id === 'venue-chandelier-oaks' ? 'Chandelier Oaks is configured from publicly available venue information; planning records and unverified operational details are illustrative.' : `${config.profile.shortName} is a fictional showcase property used to demonstrate another Venue Visions configuration.`}</small>
            </article>
          )
        })}
      </section>
    </main>
  )
}
