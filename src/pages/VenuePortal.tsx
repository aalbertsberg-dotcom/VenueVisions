import type { CSSProperties } from 'react'
import type { PageKey } from '../components/Header'
import { venueConfigById } from '../data'
import type { WeddingWorkspace } from '../types'

type VenuePortalProps = {
  venueId: string
  weddings: WeddingWorkspace[]
  onNavigate: (page: PageKey) => void
  onOpenCouple: (weddingId: string) => void
}

export default function VenuePortal({ venueId, weddings, onNavigate, onOpenCouple }: VenuePortalProps) {
  const config = venueConfigById(venueId)
  const { profile: venue, packages, areas } = config
  const firstWedding = weddings[0]
  const isChandelier = venue.id === 'venue-chandelier-oaks'

  return (
    <main className="venue-portal" style={{ '--venue-primary': venue.brandPrimary, '--venue-accent': venue.brandAccent, '--venue-surface': venue.brandSurface ?? '#eef2ed', '--venue-text': venue.brandText ?? venue.brandPrimary } as CSSProperties}>
      <section className="venue-brand-hero venue-brand-hero--dynamic">
        <div className="venue-brand-hero__wash" />
        <div className="shell venue-brand-hero__inner">
          <div className="venue-brand-lockup">
            <div className="venue-brand-mark">{venue.logoText}</div>
            <div><span>{venue.shortName.toUpperCase()}</span><small>{venue.isSample ? 'Sample wedding venue' : `Wedding Venue · ${venue.locationLabel}`}</small></div>
          </div>
          <div className="venue-brand-hero__copy">
            <span className="venue-powered">{venue.previewLabel} · Powered by Venue Visions</span>
            <h1>{isChandelier ? 'Your Chandelier Oaks wedding, organized from first selection to final setup.' : 'A modern venue portal, configured around a completely different brand.'}</h1>
            <p>{isChandelier ? 'Browse the Pinrose Prop Shop, review your package, design venue spaces and keep every question attached to your wedding plan.' : 'Explore the Design Library, plan modern venue spaces, build the 2D layout and keep every wedding workspace separate.'}</p>
            <div className="hero__actions">
              {firstWedding && <button className="button button--venue" onClick={() => onOpenCouple(firstWedding.id)}>Enter a couple workspace</button>}
              <button className="button button--venue-ghost" onClick={() => onNavigate('admin')}>Venue owner preview</button>
            </div>
            <div className="venue-preview-credentials"><span>Owner access is prefilled on the next screen.</span><span>{weddings.length} private couple workspaces configured.</span></div>
          </div>
        </div>
      </section>

      <section className="section shell venue-overview">
        <div className="venue-overview__intro">
          <p className="eyebrow">{venue.previewLabel?.toUpperCase()}</p>
          <h2>{venue.isSample ? 'A second venue proving Venue Visions can change with the customer.' : 'Chandelier Oaks, configured as the first Venue Visions venue preview.'}</h2>
          <p>{venue.isSample ? 'Juniper & Stone is fictional and intentionally uses a different visual identity, package structure, spaces and inventory language.' : 'Public venue details are brought into the preview while operational details such as inventory counts and storage locations remain clearly marked as sample data until the venue confirms them.'}</p>
          {venue.links && venue.links.length > 0 && <div className="venue-external-links">{venue.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>}
        </div>
        <div className="venue-facts">
          {isChandelier ? <><article><strong>32</strong><span>acre property</span></article><article><strong>250</strong><span>guest outdoor capacity</span></article><article><strong>1</strong><span>wedding hosted per day</span></article><article><strong>{packages.length}</strong><span>package options shown</span></article></> : <><article><strong>{areas.length}</strong><span>designable spaces</span></article><article><strong>200</strong><span>sample max guests</span></article><article><strong>{config.inventory.length}</strong><span>sample design styles</span></article><article><strong>{packages.length}</strong><span>sample packages</span></article></>}
        </div>
      </section>

      <section className="section venue-spaces-section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">DESIGNABLE VENUE AREAS</p><h2>Choose the place, then build the plan.</h2><p className="section-lead">Each venue defines its own spaces instead of forcing every customer into one generic reception-room template.</p></div></div>
          <div className="venue-area-grid">
            {areas.map((area) => (
              <article className={`venue-area-card venue-area-card--${area.visual}`} key={area.id}>
                <div className="venue-area-card__art"><span/><i/><b/></div>
                <div className="venue-area-card__body"><span>{area.kind}</span><h3>{area.name}</h3><p>{area.description}</p>{firstWedding && <button className="text-link" onClick={() => onOpenCouple(firstWedding.id)}>Open wedding tools →</button>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell package-preview-section">
        <div className="section-heading"><div><p className="eyebrow">PACKAGE-AWARE PLANNING</p><h2>The portal knows what kind of wedding is being planned.</h2><p className="section-lead">Package details can control guest limits, planning milestones and which inventory tiers are available to the couple.</p></div></div>
        <div className="package-preview-grid">
          {packages.map((pkg) => (
            <article className={pkg.tier === 2 ? 'package-card package-card--featured' : 'package-card'} key={pkg.id}>
              <div className="package-card__top"><span>{pkg.duration}</span>{pkg.tier === 2 && <b>POPULAR PREVIEW</b>}</div>
              <h3>{pkg.name}</h3><strong className="package-price">${pkg.price.toLocaleString()}</strong><p>{pkg.description}</p><ul>{pkg.highlights.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell venue-couple-preview-section">
        <div className="section-heading"><div><p className="eyebrow">PRIVATE WEDDING WORKSPACES</p><h2>Every couple stays inside {venue.shortName}.</h2><p className="section-lead">These workspaces are separate from every other venue in Venue Visions.</p></div></div>
        <div className="venue-couple-preview-grid">{weddings.map((wedding) => <button key={wedding.id} onClick={() => onOpenCouple(wedding.id)}><span>{wedding.status}</span><strong>{wedding.profile.couple}</strong><small>{new Date(`${wedding.profile.date}T12:00:00`).toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'})}</small><b>Open workspace →</b></button>)}</div>
      </section>

      <section className="venue-contact-strip venue-contact-strip--dynamic">
        <div className="shell venue-contact-strip__inner">
          <div><span>{venue.shortName.toUpperCase()}</span><strong>{venue.address}</strong></div>
          <div><span>{venue.isSample ? 'SAMPLE CONTACT' : 'VENUE CONTACT'}</span><strong>{venue.phone} · {venue.email}</strong></div>
          <div><span>VENUE VISIONS</span><strong>{venue.isSample ? 'Fictional venue configuration' : 'Public venue facts + sample operational data'}</strong></div>
        </div>
      </section>
    </main>
  )
}
