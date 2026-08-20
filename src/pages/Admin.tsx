import type { PageKey } from '../components/Header'
import { inventory, sampleWeddings } from '../data'
import type { Selection } from '../types'

type AdminProps = {
  selections: Selection[]
  unreadMessages: number
  onNavigate: (page: PageKey) => void
  demoAcknowledged: boolean
  onAcknowledgeDemo: () => void
  onExitDemo: () => void
}

export default function Admin({ selections, unreadMessages, onNavigate, demoAcknowledged, onAcknowledgeDemo, onExitDemo }: AdminProps) {
  return (
    <>
      {!demoAcknowledged && (
        <div className="modal-backdrop admin-demo-gate" role="dialog" aria-modal="true" aria-labelledby="admin-demo-title">
          <section className="admin-demo-gate__card">
            <span className="admin-demo-gate__icon">🔒</span>
            <p className="eyebrow">OWNER VIEW · DEMO ACCESS</p>
            <h2 id="admin-demo-title">This demo is not password protected.</h2>
            <p>
              The public prototype contains sample data only. A production version would require secure owner sign-in,
              role-based access, and separate private workspaces for each wedding.
            </p>
            <div className="admin-demo-gate__warning">
              Do not enter real customer, payment, venue-security, or other private information into this demo.
            </div>
            <div className="admin-demo-gate__actions">
              <button className="button button--ghost" onClick={onExitDemo}>Back to site</button>
              <button className="button button--primary" onClick={onAcknowledgeDemo}>OK, continue to Owner Demo</button>
            </div>
          </section>
        </div>
      )}

      <main className="page-main shell admin-page">
        <section className="page-intro page-intro--split">
          <div><p className="eyebrow">OWNER VIEW</p><h1>Venue operations at a glance.</h1><p>This side is intentionally separate from the customer experience. Inventory locations, wedding status, messages and setup details live here.</p></div>
          <span className="prototype-badge prototype-badge--large">Prototype admin</span>
        </section>

        <section className="panel demo-scope-panel">
          <div>
            <p className="eyebrow">WHAT THIS DEMO REPRESENTS</p>
            <h2>One venue, multiple wedding workspaces.</h2>
            <p>The owner dashboard shows several upcoming weddings to demonstrate the intended workflow. Right now, only <strong>Sarah &amp; John</strong> is a fully interactive workspace; the other couples are sample records.</p>
          </div>
          <div className="demo-scope-grid">
            <article><span>Venue</span><strong>1</strong><small>sample venue in this prototype</small></article>
            <article><span>Weddings shown</span><strong>{sampleWeddings.length}</strong><small>owner sees all upcoming couples</small></article>
            <article><span>Interactive workspace</span><strong>1</strong><small>Sarah &amp; John for the demo</small></article>
            <article><span>Production</span><strong>Secure</strong><small>separate bride + owner accounts</small></article>
          </div>
          <p className="demo-scope-note"><strong>Future-ready:</strong> the production database should include a Venue ID from day one. That keeps this focused on one venue now while allowing Venue Visions to support multiple venues later if it becomes a product.</p>
        </section>

        <section className="admin-metrics metric-grid">
          <article><span>Inventory styles</span><strong>{inventory.length}</strong><small>cataloged items</small></article>
          <article><span>Total pieces</span><strong>{inventory.reduce((sum, item) => sum + item.quantity, 0)}</strong><small>sample inventory</small></article>
          <article><span>Upcoming weddings</span><strong>{sampleWeddings.length}</strong><small>next 90 days</small></article>
          <article><span>Current prototype</span><strong>{selections.reduce((sum, s) => sum + s.quantity, 0)}</strong><small>pieces selected</small></article>
        </section>

        <div className="admin-grid">
          <section className="panel admin-weddings">
            <div className="panel__heading"><div><p className="eyebrow">UPCOMING</p><h2>Wedding workspaces</h2></div><button className="button button--small button--ghost">+ Add wedding</button></div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Couple</th><th>Date</th><th>Guests</th><th>Selections</th><th>Status</th><th>Workspace</th></tr></thead>
                <tbody>{sampleWeddings.map((wedding, index) => <tr key={wedding.couple}>
                  <td><strong>{wedding.couple}</strong></td>
                  <td>{new Date(`${wedding.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>{wedding.guests}</td>
                  <td>{wedding.selections}</td>
                  <td><span className={`status-pill status-pill--${wedding.status.toLowerCase().replace(' ', '-')}`}>{wedding.status}</span></td>
                  <td>{index === 0
                    ? <button className="workspace-link" onClick={() => onNavigate('wedding')}>Open demo →</button>
                    : <span className="sample-record-label">Sample record</span>}
                  </td>
                </tr>)}</tbody>
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
          <div className="panel__heading"><div><p className="eyebrow">INVENTORY</p><h2>Storage &amp; availability</h2></div><button className="button button--small button--primary">+ Add décor item</button></div>
          <div className="admin-table-wrap">
            <table className="admin-table admin-table--inventory">
              <thead><tr><th>Item</th><th>Category</th><th>Color</th><th>Available</th><th>Storage location</th></tr></thead>
              <tbody>{inventory.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td>{item.color}</td><td>{item.quantity}</td><td><code>{item.storage}</code></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}
