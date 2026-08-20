import type { PageKey } from '../components/Header'
import { inventory, sampleWeddings } from '../data'
import type { Selection } from '../types'

type AdminProps = {
  selections: Selection[]
  unreadMessages: number
  onNavigate: (page: PageKey) => void
}

export default function Admin({ selections, unreadMessages, onNavigate }: AdminProps) {
  return (
    <main className="page-main shell admin-page">
      <section className="page-intro page-intro--split">
        <div><p className="eyebrow">OWNER VIEW</p><h1>Venue operations at a glance.</h1><p>This side is intentionally separate from the customer experience. Inventory locations, wedding status, messages and setup details live here.</p></div>
        <span className="prototype-badge prototype-badge--large">Prototype admin</span>
      </section>

      <section className="admin-metrics metric-grid">
        <article><span>Inventory styles</span><strong>{inventory.length}</strong><small>cataloged items</small></article>
        <article><span>Total pieces</span><strong>{inventory.reduce((sum, item) => sum + item.quantity, 0)}</strong><small>sample inventory</small></article>
        <article><span>Upcoming weddings</span><strong>{sampleWeddings.length}</strong><small>next 90 days</small></article>
        <article><span>Current prototype</span><strong>{selections.reduce((sum, s) => sum + s.quantity, 0)}</strong><small>pieces selected</small></article>
      </section>

      <div className="admin-grid">
        <section className="panel admin-weddings">
          <div className="panel__heading"><div><p className="eyebrow">UPCOMING</p><h2>Weddings</h2></div><button className="button button--small button--ghost">+ Add wedding</button></div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Couple</th><th>Date</th><th>Guests</th><th>Selections</th><th>Status</th></tr></thead>
              <tbody>{sampleWeddings.map((wedding) => <tr key={wedding.couple}><td><strong>{wedding.couple}</strong></td><td>{new Date(`${wedding.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td><td>{wedding.guests}</td><td>{wedding.selections}</td><td><span className={`status-pill status-pill--${wedding.status.toLowerCase().replace(' ', '-')}`}>{wedding.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="panel admin-actions">
          <p className="eyebrow">QUICK ACTIONS</p><h2>Manage venue</h2>
          <button><span>▦</span><div><strong>Inventory</strong><small>Add photos, quantities and storage locations</small></div><b>→</b></button>
          <button><span>⌖</span><div><strong>Venue areas</strong><small>Manage reception, ceremony and outdoor spaces</small></div><b>→</b></button>
          <button onClick={() => onNavigate('messages')}><span>✉</span><div><strong>Wedding messages {unreadMessages > 0 && <em className="inline-unread">{unreadMessages}</em>}</strong><small>Questions, attachments and layout discussions</small></div><b>→</b></button>
          <button><span>☰</span><div><strong>Setup sheets</strong><small>Generate staff pull and placement lists</small></div><b>→</b></button>
        </section>
      </div>

      <section className="panel inventory-admin">
        <div className="panel__heading"><div><p className="eyebrow">INVENTORY</p><h2>Storage & availability</h2></div><button className="button button--small button--primary">+ Add décor item</button></div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--inventory">
            <thead><tr><th>Item</th><th>Category</th><th>Color</th><th>Available</th><th>Storage location</th></tr></thead>
            <tbody>{inventory.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td>{item.color}</td><td>{item.quantity}</td><td><code>{item.storage}</code></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
