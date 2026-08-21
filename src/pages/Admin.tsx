import { useMemo, useState, type FormEvent } from 'react'
import type { PageKey } from '../components/Header'
import { chandelierOaks, inventory, packageById, packages } from '../data'
import type { WeddingWorkspace } from '../types'

const DEMO_OWNER_CODE = '123456'

type AdminProps = {
  weddings: WeddingWorkspace[]
  activeWeddingId: string
  onSelectWedding: (id: string) => void
  onOpenWedding: (id: string, destination?: PageKey) => void
  onAddWedding: (input: { couple: string; date: string; guests: number; packageId: string; primaryEmail: string }) => string | null
  authenticated: boolean
  onAuthenticate: (code: string) => boolean
  onExitDemo: () => void
  onLogout: () => void
  onNavigate: (page: PageKey) => void
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function venueUnread(wedding: WeddingWorkspace) {
  return wedding.messages.filter((message) => message.senderRole !== 'venue' && !message.readByVenue).length
}

export default function Admin({ weddings, activeWeddingId, onSelectWedding, onOpenWedding, onAddWedding, authenticated, onAuthenticate, onExitDemo, onLogout, onNavigate }: AdminProps) {
  const [accessCode, setAccessCode] = useState(DEMO_OWNER_CODE)
  const [accessError, setAccessError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [couple, setCouple] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(100)
  const [packageId, setPackageId] = useState('classic')
  const [primaryEmail, setPrimaryEmail] = useState('')
  const [formError, setFormError] = useState('')
  const [accessWeddingId, setAccessWeddingId] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState('')

  const sortedWeddings = useMemo(() => [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date)), [weddings])
  const activeWedding = weddings.find((wedding) => wedding.id === activeWeddingId) ?? weddings[0]
  const totalSelected = weddings.reduce((sum, wedding) => sum + wedding.selections.reduce((sub, selection) => sub + selection.quantity, 0), 0)
  const totalUnread = weddings.reduce((sum, wedding) => sum + venueUnread(wedding), 0)

  if (!authenticated) {
    return (
      <main className="owner-access-page shell">
        <section className="panel owner-access-card chandelier-owner-access">
          <div className="venue-brand-mark owner-access-venue-mark">CO</div>
          <p className="eyebrow">CHANDELIER OAKS · OWNER DEMO ACCESS</p>
          <h1>Venue owner dashboard.</h1>
          <p className="owner-access-lead">This demo gate represents the private Chandelier Oaks admin area. Production would use secure authentication, not an embedded password.</p>
          <form className="owner-access-form" onSubmit={(event) => { event.preventDefault(); if (!onAuthenticate(accessCode)) setAccessError('Incorrect demo password.'); else setAccessError('') }}>
            <label htmlFor="ownerAccess">Temporary demo password</label>
            <input id="ownerAccess" value={accessCode} onChange={(event) => { setAccessCode(event.target.value); setAccessError('') }} autoFocus />
            <small>Prefilled for the demo: <strong>{DEMO_OWNER_CODE}</strong></small>
            {accessError && <div className="owner-access-error" role="alert">{accessError}</div>}
            <button className="button button--primary full-width" type="submit">Enter Chandelier Oaks Owner View</button>
          </form>
          <div className="owner-access-note"><strong>Demo only.</strong> No real customer, contract or payment information should be entered here.</div>
          <button className="text-link owner-access-back" onClick={onExitDemo}>← Back to venue portal</button>
        </section>
      </main>
    )
  }

  const submitWedding = (event: FormEvent) => {
    event.preventDefault()
    const result = onAddWedding({ couple, date, guests, packageId, primaryEmail })
    if (result) { setFormError(result); return }
    setShowAdd(false); setCouple(''); setDate(''); setGuests(100); setPackageId('classic'); setPrimaryEmail(''); setFormError('')
  }

  const coupleLink = (wedding: WeddingWorkspace) => `${window.location.origin}${window.location.pathname}#/couple/${encodeURIComponent(wedding.accessSlug)}`
  const copyText = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); setCopyStatus(`${label} copied.`) }
    catch { setCopyStatus(`${label}: ${text}`) }
    window.setTimeout(() => setCopyStatus(''), 2200)
  }
  const copyInvite = (wedding: WeddingWorkspace) => copyText(`Chandelier Oaks wedding portal: ${coupleLink(wedding)}  Demo access code: ${wedding.accessCode}`, 'Demo invite')

  return (
    <main className="page-main shell admin-page chandelier-admin">
      <section className="page-intro page-intro--split admin-intro">
        <div><p className="eyebrow">CHANDELIER OAKS · OWNER DASHBOARD</p><h1>Every couple. One venue command center.</h1><p>Switch weddings, watch booked dates, see package status, manage the Pinrose Prop Shop and keep each couple's private workspace separate.</p></div>
        <div className="owner-session-actions"><span className="prototype-badge prototype-badge--large">Owner demo signed in</span><button className="text-link" onClick={onLogout}>Sign out</button></div>
      </section>

      {activeWedding && (
        <section className="panel owner-active-wedding owner-active-wedding--chandelier">
          <div className="owner-active-wedding__copy"><p className="eyebrow">ACTIVE WEDDING</p><h2>{activeWedding.profile.couple}</h2><p>{formatDate(activeWedding.profile.date)} · {packageById(activeWedding.profile.packageId).name}</p></div>
          <div className="owner-active-wedding__controls"><label htmlFor="owner-active-wedding-select">Switch active couple</label><select id="owner-active-wedding-select" value={activeWeddingId} onChange={(event) => onSelectWedding(event.target.value)}>{sortedWeddings.map((wedding) => <option key={wedding.id} value={wedding.id}>{wedding.profile.couple} · {formatDate(wedding.profile.date)}</option>)}</select><div className="owner-active-wedding__buttons"><button className="button button--primary button--small" onClick={() => onOpenWedding(activeWedding.id, 'wedding')}>Open workspace</button><button className="button button--ghost button--small" onClick={() => onOpenWedding(activeWedding.id, 'messages')}>Messages</button></div></div>
        </section>
      )}

      <section className="admin-metrics metric-grid">
        <article><span>Upcoming weddings</span><strong>{weddings.length}</strong><small>one event per date</small></article>
        <article><span>Pinrose demo styles</span><strong>{inventory.length}</strong><small>sample inventory entries</small></article>
        <article><span>Selected pieces</span><strong>{totalSelected}</strong><small>across all weddings</small></article>
        <article><span>Unread messages</span><strong>{totalUnread}</strong><small>for venue team</small></article>
      </section>

      <section className="owner-quick-grid">
        <button className="owner-quick-card" onClick={() => onNavigate('calendar')}><span>CALENDAR + PAYMENTS</span><strong>See booked dates and milestones</strong><small>One wedding per day · payment timeline demo</small><b>→</b></button>
        <button className="owner-quick-card" onClick={() => onNavigate('catalog')}><span>PINROSE PROP SHOP</span><strong>Review décor and package access</strong><small>Sample counts and storage locations</small><b>→</b></button>
        <button className="owner-quick-card" onClick={() => onNavigate('media')}><span>MEDIA LIBRARY</span><strong>Upload photos, video and files</strong><small>Assign venue reference media to each property area</small><b>→</b></button>
        <button className="owner-quick-card" onClick={() => onNavigate('ai-preview')}><span>AI PREVIEW STUDIO</span><strong>Turn layouts into visual concepts</strong><small>Use real venue photos + the active wedding plan</small><b>→</b></button>
      </section>

      <section className="panel admin-weddings admin-weddings--cards">
        <div className="panel__heading admin-weddings__heading"><div><p className="eyebrow">UPCOMING</p><h2>Couples &amp; wedding workspaces</h2><p className="booking-rule">Chandelier Oaks publicly states that it hosts one wedding each day. The demo prevents duplicate booked dates for this venue.</p></div><button className="button button--small button--primary" onClick={() => { setShowAdd((current) => !current); setFormError('') }}>{showAdd ? 'Cancel' : '+ Add wedding'}</button></div>

        {showAdd && (
          <form className="add-wedding-form add-wedding-form--expanded" onSubmit={submitWedding}>
            <label><span>Couple</span><input value={couple} onChange={(event) => setCouple(event.target.value)} placeholder="Taylor & Jordan" /></label>
            <label><span>Wedding date</span><input type="date" value={date} onChange={(event) => { setDate(event.target.value); setFormError('') }} /></label>
            <label><span>Guests</span><input type="number" min="1" max="250" value={guests} onChange={(event) => setGuests(Number(event.target.value) || 1)} /></label>
            <label><span>Package</span><select value={packageId} onChange={(event) => setPackageId(event.target.value)}>{packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name}</option>)}</select></label>
            <label><span>Primary email</span><input type="email" value={primaryEmail} onChange={(event) => setPrimaryEmail(event.target.value)} placeholder="couple@example.com" /></label>
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
            const pkg = packageById(wedding.profile.packageId)
            return (
              <article className={`wedding-workspace-card ${active ? 'wedding-workspace-card--active' : ''}`} key={wedding.id}>
                <div className="wedding-workspace-card__top"><div><span className="mini-label">{active ? 'ACTIVE OWNER WORKSPACE' : 'WEDDING WORKSPACE'}</span><h3>{wedding.profile.couple}</h3><strong className="workspace-date">{formatDate(wedding.profile.date)}</strong></div><span className={`status-pill status-pill--${wedding.status.toLowerCase().replace(' ', '-')}`}>{wedding.status}</span></div>
                <div className="workspace-package"><span>PACKAGE</span><strong>{pkg.name}</strong><small>${pkg.price.toLocaleString()} · {pkg.maxGuests === null ? 'guest cap to confirm' : `up to ${pkg.maxGuests} guests`}</small></div>
                <div className="workspace-stats"><div><span>Guests</span><strong>{wedding.profile.guests}</strong></div><div><span>Décor</span><strong>{selectedPieces}</strong></div><div><span>Plan</span><strong>{wedding.placedItems.length ? `${wedding.placedItems.length} pcs` : '—'}</strong></div><div><span>Messages</span><strong>{unread ? `${unread} new` : wedding.messages.length}</strong></div></div>
                <div className="workspace-actions workspace-actions--three"><button className="button button--primary button--small" onClick={() => onOpenWedding(wedding.id, 'wedding')}>Open workspace</button><button className="button button--ghost button--small" onClick={() => onOpenWedding(wedding.id, 'messages')}>Messages</button><button className="button button--ghost button--small" onClick={() => { setAccessWeddingId(showAccess ? null : wedding.id); setCopyStatus('') }}>Access details</button></div>
                {showAccess && <div className="couple-access-details"><div className="couple-access-details__heading"><div><span className="mini-label">COUPLE ACCESS · DEMO</span><strong>Private wedding link</strong></div><span className="access-code-pill">Code {wedding.accessCode}</span></div><code className="couple-access-url">{coupleLink(wedding)}</code><div className="couple-access-details__actions"><button className="button button--small button--ghost" onClick={() => copyText(coupleLink(wedding), 'Wedding link')}>Copy link</button><button className="button button--small button--ghost" onClick={() => copyText(wedding.accessCode, 'Access code')}>Copy code</button><button className="button button--small button--primary" onClick={() => copyInvite(wedding)}>Resend access</button></div><small>Production would email a secure sign-in or one-time code. Password recovery would be replaced by resend access.</small></div>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="panel package-admin-panel">
        <div className="panel__heading"><div><p className="eyebrow">PACKAGES</p><h2>Package-aware planning</h2><p>Public package details are represented here so the couple portal can understand guest limits, timing and demo décor tiers.</p></div></div>
        <div className="owner-package-grid">{packages.map((pkg) => <article key={pkg.id}><span>{pkg.duration}</span><strong>{pkg.name}</strong><b>${pkg.price.toLocaleString()}</b><small>{pkg.maxGuests === null ? 'Guest cap to confirm' : `Up to ${pkg.maxGuests} guests`} · demo décor tier {pkg.tier}</small></article>)}</div>
      </section>

      <section className="panel inventory-admin">
        <div className="panel__heading"><div><p className="eyebrow">PINROSE PROP SHOP · DEMO INVENTORY</p><h2>Storage &amp; availability</h2><p>Item types reflect public Pinrose Prop Shop categories. Counts, dimensions and storage locations are sample data until the venue catalogs the real collection.</p></div><button className="button button--small button--primary">+ Add décor item</button></div>
        <div className="admin-table-wrap"><table className="admin-table admin-table--inventory"><thead><tr><th>Item</th><th>Category</th><th>Demo tier</th><th>Available</th><th>Storage location</th></tr></thead><tbody>{inventory.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td>{item.accessTier}</td><td>{item.quantity}</td><td><code>{item.storage}</code></td></tr>)}</tbody></table></div>
      </section>
    </main>
  )
}
