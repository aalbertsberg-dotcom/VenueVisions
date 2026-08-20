import { useMemo, useState, type FormEvent } from 'react'
import type { PageKey } from '../components/Header'
import { inventory } from '../data'
import type { WeddingWorkspace } from '../types'

type AdminProps = {
  weddings: WeddingWorkspace[]
  activeWeddingId: string
  onSelectWedding: (id: string) => void
  onOpenWedding: (id: string, destination?: PageKey) => void
  onAddWedding: (couple: string, date: string, guests: number) => string | null
  authenticated: boolean
  onAuthenticate: (code: string) => boolean
  onExitDemo: () => void
  onLogout: () => void
}

const DEMO_OWNER_CODE = '123456'

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function venueUnread(wedding: WeddingWorkspace) {
  return wedding.messages.filter((message) => message.senderRole === 'bride' && !message.readByVenue).length
}

function coupleLink(wedding: WeddingWorkspace) {
  return `${window.location.origin}${window.location.pathname}#/couple/${encodeURIComponent(wedding.accessSlug)}`
}

export default function Admin({ weddings, activeWeddingId, onSelectWedding, onOpenWedding, onAddWedding, authenticated, onAuthenticate, onExitDemo, onLogout }: AdminProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [couple, setCouple] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(100)
  const [formError, setFormError] = useState('')
  const [accessCode, setAccessCode] = useState(DEMO_OWNER_CODE)
  const [accessError, setAccessError] = useState('')
  const [accessWeddingId, setAccessWeddingId] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState('')

  const sortedWeddings = useMemo(() => [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date)), [weddings])
  const activeWedding = weddings.find((wedding) => wedding.id === activeWeddingId) ?? sortedWeddings[0]
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
    if (!onAuthenticate(accessCode)) {
      setAccessError('That demo password is not correct.')
      return
    }
    setAccessError('')
  }

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(`${label} copied.`)
      window.setTimeout(() => setCopyStatus(''), 1800)
    } catch {
      window.prompt(`Copy ${label.toLowerCase()}:`, text)
    }
  }

  const copyInvite = async (wedding: WeddingWorkspace) => {
    const text = `Venue Visions wedding access\n${wedding.profile.couple}\n${coupleLink(wedding)}\nAccess code: ${wedding.accessCode}`
    await copyText(text, 'Wedding access')
  }

  if (!authenticated) {
    return (
      <main className="page-main shell owner-access-page">
        <section className="panel owner-access-card" aria-labelledby="owner-access-title">
          <div className="owner-access-lock" aria-hidden="true">⌾</div>
          <p className="eyebrow">OWNER VIEW · DEMO ACCESS</p>
          <h1 id="owner-access-title">Owner dashboard</h1>
          <p className="owner-access-lead">
            Sign into the owner side to manage every wedding, switch active couples, and view each couple's access details.
          </p>

          <form className="owner-access-form" onSubmit={submitAccess}>
            <label htmlFor="owner-demo-password">Temporary demo password</label>
            <input
              id="owner-demo-password"
              type="password"
              autoComplete="off"
              value={accessCode}
              onChange={(event) => { setAccessCode(event.target.value); setAccessError('') }}
              autoFocus
            />
            <small>Prefilled for this prototype: <strong>{DEMO_OWNER_CODE}</strong></small>
            {accessError && <div className="owner-access-error" role="alert">{accessError}</div>}
            <button className="button button--primary full-width" type="submit">Enter Owner View</button>
          </form>

          <div className="owner-access-note">
            <strong>Prototype only.</strong> This is a presentation gate, not real security. Production will use secure owner authentication and private customer data.
          </div>
          <button className="text-link owner-access-back" type="button" onClick={onExitDemo}>← Back to public demo</button>
        </section>
      </main>
    )
  }

  return (
    <main className="page-main shell admin-page">
      <section className="page-intro page-intro--split admin-intro">
        <div>
          <p className="eyebrow">OWNER VIEW</p>
          <h1>Manage every couple from one dashboard.</h1>
          <p>Inventory is shared by the venue. Décor, messages, notes, floor plans and access stay separated by wedding.</p>
        </div>
        <div className="owner-session-actions">
          <span className="prototype-badge prototype-badge--large">Owner signed in</span>
          <button className="text-link" type="button" onClick={onLogout}>Sign out</button>
        </div>
      </section>

      {activeWedding && (
        <section className="panel owner-active-wedding">
          <div className="owner-active-wedding__copy">
            <p className="eyebrow">ACTIVE WEDDING</p>
            <h2>Switch couples without leaving Owner View.</h2>
            <p>Choose a wedding here and it becomes the active workspace across décor, the designer, messages and My Wedding.</p>
          </div>
          <div className="owner-active-wedding__controls">
            <label htmlFor="owner-active-wedding-select">Active couple</label>
            <select id="owner-active-wedding-select" value={activeWeddingId} onChange={(event) => onSelectWedding(event.target.value)}>
              {sortedWeddings.map((wedding) => (
                <option key={wedding.id} value={wedding.id}>{wedding.profile.couple} · {formatDate(wedding.profile.date)}</option>
              ))}
            </select>
            <div className="owner-active-wedding__buttons">
              <button className="button button--primary button--small" onClick={() => onOpenWedding(activeWedding.id, 'wedding')}>Open workspace</button>
              <button className="button button--ghost button--small" onClick={() => onOpenWedding(activeWedding.id, 'messages')}>Messages</button>
            </div>
          </div>
        </section>
      )}

      <section className="admin-metrics metric-grid">
        <article><span>Inventory styles</span><strong>{inventory.length}</strong><small>cataloged items</small></article>
        <article><span>Wedding workspaces</span><strong>{weddings.length}</strong><small>kept separate</small></article>
        <article><span>Selected pieces</span><strong>{totalSelected}</strong><small>across all weddings</small></article>
        <article><span>Unread messages</span><strong>{totalUnread}</strong><small>for venue team</small></article>
      </section>

      <section className="panel admin-weddings admin-weddings--cards">
        <div className="panel__heading admin-weddings__heading">
          <div>
            <p className="eyebrow">UPCOMING</p>
            <h2>Couples &amp; wedding workspaces</h2>
            <p className="booking-rule">One wedding per calendar date for this venue. If that date is already used, the owner is warned before a duplicate workspace can be created.</p>
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

        {copyStatus && <div className="copy-toast" role="status">{copyStatus}</div>}

        <div className="wedding-workspace-grid">
          {sortedWeddings.map((wedding) => {
            const selectedPieces = wedding.selections.reduce((sum, selection) => sum + selection.quantity, 0)
            const unread = venueUnread(wedding)
            const active = wedding.id === activeWeddingId
            const showAccess = accessWeddingId === wedding.id
            return (
              <article className={`wedding-workspace-card ${active ? 'wedding-workspace-card--active' : ''}`} key={wedding.id}>
                <div className="wedding-workspace-card__top">
                  <div>
                    <span className="mini-label">{active ? 'ACTIVE OWNER WORKSPACE' : 'WEDDING WORKSPACE'}</span>
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
                <div className="workspace-actions workspace-actions--three">
                  <button className="button button--primary button--small" onClick={() => onOpenWedding(wedding.id, 'wedding')}>Open workspace</button>
                  <button className="button button--ghost button--small" onClick={() => onOpenWedding(wedding.id, 'messages')}>Messages</button>
                  <button className="button button--ghost button--small" onClick={() => { setAccessWeddingId(showAccess ? null : wedding.id); setCopyStatus('') }}>Access details</button>
                </div>

                {showAccess && (
                  <div className="couple-access-details">
                    <div className="couple-access-details__heading">
                      <div><span className="mini-label">COUPLE ACCESS</span><strong>Private demo link</strong></div>
                      <span className="access-code-pill">Code {wedding.accessCode}</span>
                    </div>
                    <code className="couple-access-url">{coupleLink(wedding)}</code>
                    <div className="couple-access-details__actions">
                      <button className="button button--small button--ghost" onClick={() => copyText(coupleLink(wedding), 'Wedding link')}>Copy link</button>
                      <button className="button button--small button--ghost" onClick={() => copyText(wedding.accessCode, 'Access code')}>Copy code</button>
                      <button className="button button--small button--primary" onClick={() => copyInvite(wedding)}>Resend access</button>
                    </div>
                    <small>Production would email a secure sign-in link or one-time code. The owner would resend access instead of recovering a stored password.</small>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="panel demo-scope-panel">
        <div>
          <p className="eyebrow">DEMO STRUCTURE</p>
          <h2>One venue, separate private wedding workspaces.</h2>
          <p>Each couple has its own demo link and access code. After signing into Owner View, the venue owner can switch between every wedding without signing in again.</p>
        </div>
        <div className="demo-scope-grid">
          <article><span>Venue</span><strong>1</strong><small>single venue setup</small></article>
          <article><span>Wedding workspaces</span><strong>{weddings.length}</strong><small>kept separate</small></article>
          <article><span>Date protection</span><strong>On</strong><small>duplicate dates warned</small></article>
          <article><span>Access</span><strong>Demo</strong><small>clearly labeled prototype access</small></article>
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
