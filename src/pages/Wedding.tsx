import type { PageKey } from '../components/Header'
import DecorVisual from '../components/DecorVisual'
import { inventory } from '../data'
import type { Selection, WeddingProfile } from '../types'

type WeddingProps = {
  profile: WeddingProfile
  selections: Selection[]
  onProfileChange: (profile: WeddingProfile) => void
  onSetQuantity: (itemId: string, quantity: number) => void
  onNavigate: (page: PageKey) => void
}

export default function Wedding({ profile, selections, onProfileChange, onSetQuantity, onNavigate }: WeddingProps) {
  const selectedItems = selections
    .map((selection) => ({ ...selection, item: inventory.find((item) => item.id === selection.itemId) }))
    .filter((entry) => entry.item)

  return (
    <main className="page-main shell">
      <section className="wedding-hero">
        <div>
          <p className="eyebrow">MY WEDDING</p>
          <input className="inline-title-input" value={profile.couple} onChange={(e) => onProfileChange({ ...profile, couple: e.target.value })} aria-label="Couple names" />
          <div className="wedding-meta-edit">
            <label><span>Date</span><input type="date" value={profile.date} onChange={(e) => onProfileChange({ ...profile, date: e.target.value })} /></label>
            <label><span>Guests</span><input type="number" min="1" value={profile.guests} onChange={(e) => onProfileChange({ ...profile, guests: Number(e.target.value) || 0 })} /></label>
          </div>
        </div>
        <div className="wedding-status-card">
          <span className="status-dot" />
          <div><span className="mini-label">PLAN STATUS</span><strong>In progress</strong></div>
        </div>
      </section>

      <section className="metric-grid">
        <article><span>Selected décor</span><strong>{selections.reduce((sum, s) => sum + s.quantity, 0)}</strong><small>total pieces</small></article>
        <article><span>Unique items</span><strong>{selections.length}</strong><small>styles selected</small></article>
        <article><span>Guest count</span><strong>{profile.guests}</strong><small>planning estimate</small></article>
        <article className="metric-grid__action"><span>Floor plan</span><strong>Ready</strong><button onClick={() => onNavigate('planner')}>Open designer →</button></article>
      </section>

      <div className="wedding-layout">
        <section className="panel">
          <div className="panel__heading">
            <div><p className="eyebrow">SELECTED DÉCOR</p><h2>Your collection</h2></div>
            <button className="text-link" onClick={() => onNavigate('catalog')}>Add more →</button>
          </div>
          {selectedItems.length ? (
            <div className="selection-list">
              {selectedItems.map(({ item, quantity }) => item && (
                <div className="selection-row" key={item.id}>
                  <DecorVisual styleName={item.imageStyle} name={item.name} />
                  <div className="selection-row__copy"><strong>{item.name}</strong><span>{item.category} · {item.color}</span></div>
                  <div className="quantity-control quantity-control--compact">
                    <button onClick={() => onSetQuantity(item.id, quantity - 1)}>−</button>
                    <span><strong>{quantity}</strong></span>
                    <button disabled={quantity >= item.quantity} onClick={() => onSetQuantity(item.id, quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state compact"><h3>No decorations selected yet.</h3><p>Browse the catalog to start building your wedding.</p><button className="button button--primary" onClick={() => onNavigate('catalog')}>Browse décor</button></div>
          )}
        </section>

        <aside className="panel notes-panel">
          <p className="eyebrow">VENUE NOTES</p>
          <h2>Setup instructions</h2>
          <p>Add anything the venue team should know when they prepare your spaces.</p>
          <textarea value={profile.notes} onChange={(e) => onProfileChange({ ...profile, notes: e.target.value })} placeholder="Example: Put the wooden welcome sign beside the main entrance…" />
          <div className="save-note"><span>✓</span> Saved automatically in this browser</div>
        </aside>
      </div>

      <section className="summary-strip">
        <div><span className="mini-label">NEXT STEP</span><h2>Build the room around your selections.</h2><p>Use the venue designer to place tables, key areas and décor where you want them.</p></div>
        <button className="button button--light" onClick={() => onNavigate('planner')}>Open venue designer</button>
      </section>
    </main>
  )
}
