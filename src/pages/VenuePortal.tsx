import type { PageKey } from '../components/Header'
import { chandelierOaks, packages, venueAreas } from '../data'

type VenuePortalProps = {
  onNavigate: (page: PageKey) => void
  onOpenCoupleDemo: () => void
}

export default function VenuePortal({ onNavigate, onOpenCoupleDemo }: VenuePortalProps) {
  return (
    <main className="venue-portal">
      <section className="venue-brand-hero">
        <div className="venue-brand-hero__wash" />
        <div className="shell venue-brand-hero__inner">
          <div className="venue-brand-lockup">
            <div className="venue-brand-mark">CO</div>
            <div><span>CHANDELIER OAKS</span><small>Wedding Venue · Kiln, Mississippi</small></div>
          </div>
          <div className="venue-brand-hero__copy">
            <span className="venue-powered">Powered by Venue Visions</span>
            <h1>Your Chandelier Oaks wedding, organized from first selection to final setup.</h1>
            <p>Browse the Pinrose Prop Shop, review your package, design venue spaces and keep every question attached to your wedding plan.</p>
            <div className="hero__actions">
              <button className="button button--venue" onClick={onOpenCoupleDemo}>Enter couple demo</button>
              <button className="button button--venue-ghost" onClick={() => onNavigate('admin')}>Owner demo</button>
            </div>
            <div className="venue-demo-credentials"><span>Couple demo: Sarah &amp; John · code 111111</span><span>Owner demo: code 123456</span></div>
          </div>
        </div>
      </section>

      <section className="section shell venue-overview">
        <div className="venue-overview__intro">
          <p className="eyebrow">CHANDELIER OAKS · VENUE VISIONS DEMO</p>
          <h2>A venue-specific portal without giving away the platform.</h2>
          <p>{chandelierOaks.shortName} is the first demo tenant. The customer-facing experience carries the venue identity while the underlying software remains Venue Visions.</p>
        </div>
        <div className="venue-facts">
          <article><strong>32</strong><span>acre property</span></article>
          <article><strong>250</strong><span>guest outdoor capacity</span></article>
          <article><strong>1</strong><span>wedding hosted per day</span></article>
          <article><strong>5</strong><span>package options shown</span></article>
        </div>
      </section>

      <section className="section venue-spaces-section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">DESIGNABLE PROPERTY AREAS</p><h2>Choose the place, then build the plan.</h2><p className="section-lead">The demo now lets couples switch between real Chandelier Oaks area concepts instead of a generic reception hall.</p></div></div>
          <div className="venue-area-grid">
            {venueAreas.map((area) => (
              <article className={`venue-area-card venue-area-card--${area.visual}`} key={area.id}>
                <div className="venue-area-card__art"><span/><i/><b/></div>
                <div className="venue-area-card__body"><span>{area.kind}</span><h3>{area.name}</h3><p>{area.description}</p><button className="text-link" onClick={onOpenCoupleDemo}>Design this area →</button></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell package-preview-section">
        <div className="section-heading"><div><p className="eyebrow">PACKAGE-AWARE PLANNING</p><h2>The portal knows what kind of wedding is being planned.</h2><p className="section-lead">Public package information is represented in the demo. Exact décor-tier rules remain marked as demo logic until the venue confirms them.</p></div></div>
        <div className="package-preview-grid">
          {packages.map((pkg) => (
            <article className={pkg.id === 'weekend' ? 'package-card package-card--featured' : 'package-card'} key={pkg.id}>
              <div className="package-card__top"><span>{pkg.duration}</span>{pkg.id === 'weekend' && <b>DEMO WEDDING</b>}</div>
              <h3>{pkg.name}</h3>
              <strong className="package-price">${pkg.price.toLocaleString()}</strong>
              <p>{pkg.description}</p>
              <ul>{pkg.highlights.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="venue-contact-strip">
        <div className="shell venue-contact-strip__inner">
          <div><span>CHANDELIER OAKS</span><strong>{chandelierOaks.address}</strong></div>
          <div><span>VENUE CONTACT</span><strong>{chandelierOaks.phone} · {chandelierOaks.email}</strong></div>
          <div><span>DEMO NOTE</span><strong>Public venue facts + sample planning data</strong></div>
        </div>
      </section>
    </main>
  )
}
