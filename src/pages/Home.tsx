import type { PageKey } from '../components/Header'
import DecorVisual from '../components/DecorVisual'
import { inventory } from '../data'

export default function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const featured = inventory.filter((item) => item.featured).slice(0, 3)

  return (
    <main>
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow">YOUR VENUE, YOUR VISION</p>
          <h1>Design the day before the day arrives.</h1>
          <p className="hero__lead">
            Browse the venue's décor collection, choose your pieces, and build a visual reception plan from home.
          </p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={() => onNavigate('catalog')}>Explore the décor</button>
            <button className="button button--ghost" onClick={() => onNavigate('planner')}>Open venue designer</button>
          </div>
          <div className="hero__proof">
            <div><strong>01</strong><span>Choose your décor</span></div>
            <div><strong>02</strong><span>Build your layout</span></div>
            <div><strong>03</strong><span>Share the setup</span></div>
          </div>
        </div>
        <div className="hero__visual" aria-label="Wedding reception illustration">
          <div className="hero-card hero-card--main">
            <div className="hero-room">
              <div className="hero-room__arch"><span /></div>
              <div className="hero-room__table hero-room__table--1"><i /><i /><i /><i /></div>
              <div className="hero-room__table hero-room__table--2"><i /><i /><i /><i /></div>
              <div className="hero-room__table hero-room__table--3"><i /><i /><i /><i /></div>
              <div className="hero-room__dance">DANCE<br/>FLOOR</div>
              <div className="hero-room__greenery hero-room__greenery--left" />
              <div className="hero-room__greenery hero-room__greenery--right" />
            </div>
          </div>
          <div className="hero-card hero-card--note">
            <span className="mini-label">WEDDING PLAN</span>
            <strong>October 17, 2026</strong>
            <span>125 guests · 16 tables</span>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FROM THE COLLECTION</p>
              <h2>See what is already waiting at the venue.</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('catalog')}>View full catalog →</button>
          </div>
          <div className="featured-grid">
            {featured.map((item) => (
              <article className="featured-card" key={item.id}>
                <DecorVisual styleName={item.imageStyle} name={item.name} />
                <div className="featured-card__body">
                  <span className="mini-label">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="availability">{item.quantity} available</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell process-section">
        <div className="section-heading section-heading--center">
          <div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>One shared plan from inspiration to setup.</h2>
          </div>
        </div>
        <div className="process-grid">
          <article><span>1</span><h3>Browse</h3><p>See photos, quantities, colors and dimensions without scheduling a shed visit.</p></article>
          <article><span>2</span><h3>Design</h3><p>Lay out tables, important areas and selected decorations on the venue floor plan.</p></article>
          <article><span>3</span><h3>Finalize</h3><p>Save notes and selections so the venue knows exactly what needs to be pulled and placed.</p></article>
        </div>
      </section>

      <section className="cta-section shell">
        <div>
          <p className="eyebrow">START WITH A BLANK CANVAS</p>
          <h2>See the reception take shape.</h2>
          <p>This prototype lets you place and move objects around a sample reception hall right now.</p>
        </div>
        <button className="button button--light" onClick={() => onNavigate('planner')}>Launch designer</button>
      </section>
    </main>
  )
}
