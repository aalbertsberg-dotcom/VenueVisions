import type { PageKey } from '../components/Header'
import Logo from '../components/Logo'

export default function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <main className="saas-home">
      <section className="saas-hero shell">
        <div className="saas-hero__copy">
          <span className="saas-pill">VENUE MANAGEMENT + COUPLE PLANNING</span>
          <h1>One platform for the venue. One private workspace for every couple.</h1>
          <p>Venue Visions turns a venue's décor, spaces, packages, wedding calendar, couple communication and setup plans into one organized customer experience.</p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={() => onNavigate('venue')}>Explore Chandelier Oaks demo</button>
            <button className="button button--ghost" onClick={() => onNavigate('for-venues')}>Bring Venue Visions to a venue</button>
          </div>
          <div className="saas-proof-row">
            <div><strong>Venue-owned data</strong><span>Inventory, packages, spaces and weddings</span></div>
            <div><strong>Private couple portals</strong><span>Only their wedding, plans and messages</span></div>
            <div><strong>Venue Visions platform</strong><span>Reusable across future venue customers</span></div>
          </div>
        </div>
        <div className="saas-hero__visual">
          <div className="platform-stack">
            <div className="platform-stack__top"><Logo compact /><div><span>VENUE VISIONS</span><strong>Platform</strong></div></div>
            <div className="platform-stack__line" />
            <article className="tenant-card tenant-card--featured">
              <div className="tenant-mark">CO</div>
              <div><span>FIRST DEMO VENUE</span><strong>Chandelier Oaks</strong><small>Owner dashboard · packages · Pinrose Prop Shop · weddings</small></div>
            </article>
            <div className="tenant-couples">
              <span>Sarah & John</span><span>Ashley & Mark</span><span>Jennifer & Matt</span>
            </div>
            <article className="tenant-card tenant-card--future"><div className="tenant-mark">+</div><div><span>NEXT CUSTOMER</span><strong>Another venue</strong><small>Same platform · separate branding and data</small></div></article>
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
          <p className="eyebrow">FIRST STRUCTURE · CHANDELIER OAKS</p>
          <h2>A real venue workflow, built into the demo now.</h2>
          <p>The demo uses Chandelier Oaks as the first venue tenant, with its public package structure, property areas and Pinrose Prop Shop concept represented inside Venue Visions.</p>
          <button className="button button--primary" onClick={() => onNavigate('venue')}>Open the venue portal</button>
        </div>
        <div className="case-study-map">
          <div className="oak-illustration"><span className="oak-trunk"/><span className="oak-canopy oak-canopy--1"/><span className="oak-canopy oak-canopy--2"/><span className="oak-canopy oak-canopy--3"/><i className="oak-light oak-light--1"/><i className="oak-light oak-light--2"/></div>
          <div className="case-study-label"><strong>Chandelier Oaks</strong><span>Kiln, Mississippi · venue demo</span></div>
        </div>
      </section>

      <section className="cta-section shell saas-cta">
        <div><p className="eyebrow">FOR VENUES</p><h2>Build the portal around your property.</h2><p>Submit venue details, branding, website, spaces, inventory and package information in the demo onboarding flow.</p></div>
        <button className="button button--light" onClick={() => onNavigate('for-venues')}>Open venue signup</button>
      </section>
    </main>
  )
}
