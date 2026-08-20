import { useMemo, useState, type FormEvent } from 'react'
import type { PageKey } from '../components/Header'
import { inventory } from '../data'
import type { WeddingWorkspace } from '../types'

type AdminProps = {
  weddings: WeddingWorkspace[]
  activeWeddingId: string
  onOpenWedding: (id: string, destination?: PageKey) => void
  onAddWedding: (couple: string, date: string, guests: number) => string | null
  demoAcknowledged: boolean
  onAcknowledgeDemo: () => void
  onExitDemo: () => void
}

const DEMO_OWNER_CODE = 'VENUE2026'

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function venueUnread(wedding: WeddingWorkspace) {
  return wedding.messages.filter((message) => message.senderRole === 'bride' && !message.readByVenue).length
}

export default function Admin({ weddings, activeWeddingId, onOpenWedding, onAddWedding, demoAcknowledged, onAcknowledgeDemo, onExitDemo }: AdminProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [couple, setCouple] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(100)
  const [formError, setFormError] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [accessError, setAccessError] = useState('')

  const sortedWeddings = useMemo(() => [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date)), [weddings])
  const totalSelected = weddings.reduce((sum, wedding) => sum + wedding.selections.reduce((sub, selection) => sub + selection.quantity, 0), 0)
  const totalUnread = weddings.reduce((sum, wedding) => sum + venueUnread(wedding), 0)

  const submitWedding = (event: FormEvent) => {
    event.preventDefault()
    const error = onAddWedding(couple, date, guests)
    if (error) {
      setFormError(error)
      return
    }
    setFormError('')
    setCouple('')
    setDate('')
    setGuests(100)
    setShowAdd(false)
  }

  const submitAccess = (event: FormEvent) => {
    event.preventDefault()
    if (accessCode.trim().toUpperCase() !== DEMO_OWNER_CODE) {
      setAccessError('That demo password is not correct.')
      return
    }
    setAccessError('')
    onAcknowledgeDemo()
  }

  if (!demoAcknowledged) {
    return (
      <main className="page-main shell owner-access-page">
        <section className="panel owner-access-card" aria-labelledby="owner-access-title">
          <div className="owner-access-lock" aria-hidden="true">⌾</div>
          <p className="eyebrow">OWNER VIEW · DEMO ACCESS</p>
          <h1 id="owner-access-title">Owner dashboard</h1>
          <p className="owner-access-lead">
            This prototype uses a temporary demo password so the owner flow feels separate from the bride experience.
          </p>

          <form className="owner-access-form" onSubmit={submitAccess}>
            <label htmlFor="owner-demo-password">Temporary demo password</label>
            <input
              id="owner-demo-password"
              type="password"
              autoComplete="off"
              value={accessCode}
              onChange={(event) => { setAccessCode(event.target.value); setAccessError('') }}
              placeholder="Enter demo password"
              autoFocus
            />
            <small>Demo password: <strong>{DEMO_OWNER_CODE}</strong></small>
            {accessError && <div className="owner-access-error" role="alert">{accessError}</div>}
            <button className="button button--primary full-width" type="submit">Enter Owner View</button>
          </form>

          <div className="owner-access-note">
            <strong>Prototype only.</strong> This is a presentation gate, not real security. The production version will use secure authentication, role-based access, and private customer data.
          </div>
          <button className="text-link owner-access-back" type="button" onClick={onExitDemo}>← Back to public demo</button>
        </section>
      </main>
    )
  }

  return (
    <main className="page-main shell admin-page">
      <section className="page-intro page-intro--split">
        <div>
          <p className="eyebrow">OWNER VIEW</p>
          <h1>Each couple gets their own workspace.</h1>
          <p>Inventory is shared by the venue, while décor selections, messages, notes and floor plans stay separated by wedding.</p>
        </div>
        <span className="prototype-badge prototype-badge--large">Prototype admin</span>
      </section>

      <section className="panel venue-switcher-demo">
        <div>
          <p className="eyebrow">VENUE</p>
          <h2>Demo Venue</h2>
          <p>This build is configured for one venue. The data model already keeps a venue ID on every wedding so multi-venue support can be added later.</p>
        </div>
        <button className="button button--ghost venue-coming-soon" disabled>＋ Add another venue · Coming soon</button>
      </section>

      <section className="admin-metrics metric-grid">
        <article><span>Inventory styles</span><strong>{inventory.length}</strong><small>cataloged items</small></article>
        <article><span>Wedding workspaces</span><strong>{weddings.length}</strong><small>kept separate</small></article>
        <article><span>Selected pieces</span><strong>{totalSelected}</strong><small>across all weddings</small></article>
        <article><span>Unread messages</span><strong>{totalUnread}</strong><small>for venue team</small></article>
      </section>

      <section className="panel admin-weddings admin-weddings--cards">
        <div className="panel__heading">
          <div>
            <p className="eyebrow">UPCOMING</p>
            <h2>Couples &amp; wedding workspaces</h2>
            <p className="booking-rule">One wedding per calendar date for this venue. The demo prevents accidental double-booking.</p>
          </div>
          <button className="button button--small button--primary" onClick={() => { setShowAdd((current) => !current); setFormError('') }}>{showAdd ? 'Cancel' : '+ Add wedding'}</button>
        </div>

        {showAdd && (
          <form className="add-wedding-form" onSubmit={submitWedding}>
            <label><span>Couple</span><input value={couple} onChange={(event) => setCouple(event.target.value)} placeholder="Taylor & Jordan" /></label>
            <label><span>Wedding date</span><input type="date" value={date} onChange={(event) => { setDate(event.target.value); setFormError('') }} /></label>
            <label><span>Guests</span><input type="number" min="1" value={guests} onChange={(event) => setGuests(Number(event.target.value) || 1)} /></label>
            <button className="button button--primary" type="submit">Create workspace</button>
            {formError && <div className="add-wedding-error">{formError}</div>}
          </form>
        )}

        <div className="wedding-workspace-grid">
          {sortedWeddings.map((wedding) => {
            const selectedPieces = wedding.selections.reduce((sum, selection) => sum + selection.quantity, 0)
            const unread = venueUnread(wedding)
            const active = wedding.id === activeWeddingId
            return (
              <article className={`wedding-workspace-card ${active ? 'wedding-workspace-card--active' : ''}`} key={wedding.id}>
                <div className="wedding-workspace-card__top">
                  <div>
                    <span className="mini-label">{active ? 'ACTIVE DEMO WORKSPACE' : 'WEDDING WORKSPACE'}</span>
                    <h3>{wedding.profile.couple}</h3>
                    <strong className="workspace-date">{formatDate(wedding.profile.date)}</strong>
                  </div>
                  <span className={`status-pill status-pill--${wedding.status.toLowerCase().replace(' ', '-')}`}>{wedding.status}</span>
                </div>
                <div className="workspace-stats">
                  <div><span>Guests</span><strong>{wedding.profile.guests}</strong></div>
                  <div><span>Décor</span><strong>{selectedPieces}</strong></div>
                  <div><span>Plan</span><strong>{wedding.placedItems.length ? `${wedding.placedItems.length} pcs` : '—'}</strong></div>
                  <div><span>Messages</span><strong>{unread ? `${unread} new` : wedding.messages.length}</strong></div>
                </div>
                <div className="workspace-actions">
                  <button className="button button--primary button--small" onClick={() => onOpenWedding(wedding.id, 'wedding')}>Open workspace</button>
                  <button className="button button--ghost button--small" onClick={() => onOpenWedding(wedding.id, 'messages')}>Messages</button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="panel demo-scope-panel">
        <div>
          <p className="eyebrow">PRODUCTION DIRECTION</p>
          <h2>One venue now. Multi-venue later.</h2>
          <p>For a live venue, each couple would sign into only their own wedding. The owner would see all weddings for that venue. A future multi-venue version would add a venue selector above this dashboard.</p>
        </div>
        <div className="demo-scope-grid">
          <article><span>Current venue</span><strong>1</strong><small>Demo Venue</small></article>
          <article><span>Separate weddings</span><strong>{weddings.length}</strong><small>fully interactive locally</small></article>
          <article><span>Double-booking protection</span><strong>On</strong><small>same date can’t be reused</small></article>
          <article><span>Multiple venues</span><strong>Soon</strong><small>planned, not active</small></article>
        </div>
      </section>

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
  )
}
