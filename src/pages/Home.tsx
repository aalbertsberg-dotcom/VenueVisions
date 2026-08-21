import type { CSSProperties } from 'react'
import type { PageKey } from '../components/Header'
import Logo from '../components/Logo'
import type { VenueConfig } from '../types'

export default function Home({ onNavigate, onOpenVenue, venues }: {
  onNavigate: (page: PageKey) => void
  onOpenVenue: (slug: string) => void
  venues: VenueConfig[]
}) {
  return (
    <main className="saas-home">
      <section className="saas-hero shell">
        <div className="saas-hero__copy">
          <span className="saas-pill">VENUE VISIONS · WEDDING VENUE SOFTWARE</span>
          <h1>One platform. Every venue still feels like itself.</h1>
          <p>Venue Visions gives wedding venues a branded planning system for inventory, spaces, packages, couples, communication and final setup — while every couple gets a private workspace inside the venue they booked.</p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={() => onNavigate('venues')}>Explore Venue Examples</button>
            <button className="button button--ghost" onClick={() => onNavigate('for-venues')}>For Venues</button>
            <button className="text-link home-signin-link" onClick={() => onNavigate('signin')}>Sign In</button>
          </div>
          <div className="saas-proof-row">
            <div><strong>Venue-owned workflow</strong><span>Inventory, packages, spaces and weddings</span></div>
            <div><strong>Venue-based couple portals</strong><span>Each wedding lives inside its booked venue</span></div>
            <div><strong>Reusable SaaS platform</strong><span>One product configured differently for every venue</span></div>
          </div>
        </div>

        <div className="saas-hero__visual">
          <div className="multi-venue-stack">
            <div className="platform-stack__top"><Logo compact /><div><span>VENUE VISIONS</span><strong>Platform</strong></div></div>
            <p>Choose a venue to see how the same platform changes brand and workflow.</p>
            <div className="multi-venue-stack__cards">
              {venues.map((config) => (
                <button
                  key={config.profile.id}
                  className="multi-venue-mini"
                  style={{ '--mini-primary': config.profile.brandPrimary, '--mini-accent': config.profile.brandAccent, '--mini-surface': config.profile.brandSurface ?? '#f4f4f4' } as CSSProperties}
                  onClick={() => onOpenVenue(config.profile.slug)}
                >
                  <span>{config.profile.logoText}</span>
                  <div><small>{config.profile.isSample ? 'SAMPLE VENUE' : 'CONFIGURED PREVIEW'}</small><strong>{config.profile.shortName}</strong><em>{config.profile.locationLabel}</em></div>
                  <b>›</b>
                </button>
              ))}
            </div>
            <button className="multi-venue-stack__next" onClick={() => onNavigate('for-venues')}><span>+</span><div><small>YOUR VENUE</small><strong>Configured next</strong><em>Your logo · colors · spaces · inventory · couples</em></div><b>›</b></button>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">WHAT THE PRODUCT DOES</p><h2>Replace scattered planning with a system the venue controls.</h2></div></div>
          <div className="feature-six-grid">
            <article><span>01</span><h3>Venue dashboard</h3><p>See upcoming couples, packages, dates, messages, selections and planning progress.</p></article>
            <article><span>02</span><h3>Digital inventory</h3><p>Turn the décor shed or prop shop into a searchable catalog with quantities and storage locations.</p></article>
            <article><span>03</span><h3>2D + AI visualization</h3><p>Build the overhead layout first, then use venue photos and the structured plan to create a realistic preview.</p></article>
            <article><span>04</span><h3>Private wedding portals</h3><p>Every couple gets access only to their venue and their wedding workspace.</p></article>
            <article><span>05</span><h3>Calendar + milestones</h3><p>Protect booked dates and surface contract or payment milestones without replacing accounting software.</p></article>
            <article><span>06</span><h3>Venue-specific branding</h3><p>Each venue keeps its own identity, colors, website information, inventory names and customer-facing experience.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell venue-comparison-section">
        <div className="section-heading"><div><p className="eyebrow">TWO VENUES · ONE PLATFORM</p><h2>Built to look like the venue, not like Venue Visions.</h2><p className="section-lead">Chandelier Oaks shows a real venue configuration using public information. Juniper & Stone shows the same system with a fictional modern venue and a completely different palette.</p></div></div>
        <div className="venue-comparison-grid">
          {venues.map((config) => <button key={config.profile.id} className="venue-comparison-card" style={{ '--card-primary': config.profile.brandPrimary, '--card-accent': config.profile.brandAccent } as CSSProperties} onClick={() => onOpenVenue(config.profile.slug)}><span>{config.profile.logoText}</span><div><small>{config.profile.previewLabel}</small><strong>{config.profile.shortName}</strong><p>{config.profile.tagline}</p></div><b>Explore →</b></button>)}
        </div>
      </section>

      <section className="cta-section shell saas-cta">
        <div><p className="eyebrow">FOR VENUES</p><h2>Build the portal around your property.</h2><p>Tell us about your branding, website, spaces, inventory, packages and workflow. Venue Visions can configure a venue experience around the way you already operate.</p></div>
        <button className="button button--light" onClick={() => onNavigate('for-venues')}>Request a Venue Preview</button>
      </section>
    </main>
  )
}
