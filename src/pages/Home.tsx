import type { PageKey } from '../components/Header'
import Logo from '../components/Logo'

export default function Home({ onNavigate, onOpenCouple }: { onNavigate: (page: PageKey) => void; onOpenCouple: (slug: string) => void }) {
  return (
    <main className="saas-home">
      <section className="saas-hero shell">
        <div className="saas-hero__copy">
          <span className="saas-pill">VENUE VISIONS · WEDDING VENUE SOFTWARE</span>
          <h1>One platform for the venue. One private workspace for every couple.</h1>
          <p>Venue Visions gives wedding venues a branded planning system for décor, spaces, packages, couples, communication and final setup — while each couple gets a private workspace for their own wedding.</p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={() => onNavigate('venue')}>View Venue Demo</button>
            <button className="button button--ghost" onClick={() => onNavigate('for-venues')}>For Venues</button>
            <button className="text-link home-signin-link" onClick={() => onNavigate('signin')}>Sign In</button>
          </div>
          <div className="saas-proof-row">
            <div><strong>Your venue, your workflow</strong><span>Inventory, packages, spaces and weddings</span></div>
            <div><strong>Private couple portals</strong><span>Only their wedding, plans and messages</span></div>
            <div><strong>Venue Visions platform</strong><span>One product configured for each venue</span></div>
          </div>
        </div>
        <div className="saas-hero__visual">
          <div className="platform-stack" aria-label="Interactive Venue Visions product example">
            <div className="platform-stack__explore">Explore a working Venue Visions example</div>
            <div className="platform-stack__top"><Logo compact /><div><span>VENUE VISIONS</span><strong>Platform</strong></div></div>
            <div className="platform-stack__line" />
            <button className="tenant-card tenant-card--featured tenant-card--interactive" type="button" onClick={() => onNavigate('venue')}>
              <div className="tenant-mark">CO</div>
              <div><span>VENUE DEMO</span><strong>Chandelier Oaks</strong><small>Example owner dashboard · packages · Pinrose Prop Shop · weddings</small></div>
              <span className="platform-link-arrow" aria-hidden="true">›</span>
            </button>
            <div className="tenant-couples" aria-label="Open a private couple demo">
              <button type="button" onClick={() => onOpenCouple('sarah-john')}><span>Sarah & John</span><small>Open wedding</small></button>
              <button type="button" onClick={() => onOpenCouple('ashley-mark')}><span>Ashley & Mark</span><small>Open wedding</small></button>
              <button type="button" onClick={() => onOpenCouple('jennifer-matt')}><span>Jennifer & Matt</span><small>Open wedding</small></button>
            </div>
            <button className="tenant-card tenant-card--future tenant-card--interactive" type="button" onClick={() => onNavigate('for-venues')}>
              <div className="tenant-mark">+</div>
              <div><span>YOUR VENUE</span><strong>Configured next</strong><small>Your branding · your spaces · your inventory · your couples</small></div>
              <span className="platform-link-arrow" aria-hidden="true">›</span>
            </button>
            <div className="platform-stack__hint">Select any card to explore the experience.</div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">WHAT THE PRODUCT DOES</p><h2>Replace scattered planning with a system the venue controls.</h2></div></div>
          <div className="feature-six-grid">
            <article><span>01</span><h3>Venue dashboard</h3><p>See upcoming couples, packages, dates, messages, selections and planning progress.</p></article>
            <article><span>02</span><h3>Digital inventory</h3><p>Turn the décor shed or prop shop into a searchable catalog with quantities and storage locations.</p></article>
            <article><span>03</span><h3>Visual designer</h3><p>Let couples arrange tables, chairs, décor and focal areas before setup day.</p></article>
            <article><span>04</span><h3>Private wedding portals</h3><p>Each couple gets its own access, timeline, package, messages and saved plan.</p></article>
            <article><span>05</span><h3>Calendar + milestones</h3><p>Protect booked dates and surface contract and payment milestones without replacing accounting software.</p></article>
            <article><span>06</span><h3>Venue-branded experience</h3><p>Each venue keeps its own name, logo, colors, website information and customer-facing portal.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell case-study-section">
        <div className="case-study-copy">
          <p className="eyebrow">VENUE DEMO · CHANDELIER OAKS</p>
          <h2>See what Venue Visions can look like for a real venue.</h2>
          <p>Chandelier Oaks is the example venue in this working demo. Its public package structure, property areas and Pinrose Prop Shop concept show how Venue Visions can be configured around a venue instead of forcing every venue into the same template.</p>
          <button className="button button--primary" onClick={() => onNavigate('venue')}>Open Venue Demo</button>
        </div>
        <div className="case-study-map">
          <div className="oak-illustration"><span className="oak-trunk"/><span className="oak-canopy oak-canopy--1"/><span className="oak-canopy oak-canopy--2"/><span className="oak-canopy oak-canopy--3"/><i className="oak-light oak-light--1"/><i className="oak-light oak-light--2"/></div>
          <div className="case-study-label"><strong>Chandelier Oaks</strong><span>Kiln, Mississippi · venue demo</span></div>
        </div>
      </section>

      <section className="cta-section shell saas-cta">
        <div><p className="eyebrow">FOR VENUES</p><h2>Build the portal around your property.</h2><p>Tell us about your venue, branding, website, spaces, inventory and workflow. The proof-of-concept request form shows what Venue Visions would collect to build your venue demo.</p></div>
        <button className="button button--light" onClick={() => onNavigate('for-venues')}>Request a Venue Demo</button>
      </section>
    </main>
  )
}
