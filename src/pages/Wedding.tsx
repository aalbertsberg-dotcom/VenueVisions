import { packageById, packages, tierLabel, venueAreas } from '../data'
import type { PageKey } from '../components/Header'
import type { Selection, WeddingProfile } from '../types'

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

type WeddingProps = {
  profile: WeddingProfile
  selections: Selection[]
  unreadMessages: number
  paymentStepsCompleted: number
  onProfileChange: (profile: WeddingProfile) => void
  onSetQuantity: (itemId: string, quantity: number) => void
  onNavigate: (page: PageKey) => void
  ownerMode: boolean
}

export default function Wedding({ profile, selections, unreadMessages, paymentStepsCompleted, onProfileChange, onNavigate, ownerMode }: WeddingProps) {
  const pkg = packageById(profile.packageId)
  const selectedPieces = selections.reduce((sum, item) => sum + item.quantity, 0)
  const ceremonyAreas = venueAreas.filter((area) => area.kind === 'Ceremony')
  const receptionAreas = venueAreas.filter((area) => area.kind === 'Reception' || area.kind === 'Hospitality')
  const progressItems = [profile.contractSigned, profile.reservationPaid, Boolean(profile.ceremonyArea), Boolean(profile.receptionArea), selectedPieces > 0]
  const progress = Math.round(progressItems.filter(Boolean).length / progressItems.length * 100)

  const patch = (key: keyof WeddingProfile, value: string | number | boolean) => onProfileChange({ ...profile, [key]: value })

  return (
    <main className="page-main shell wedding-page chandelier-wedding-page">
      <section className="wedding-dashboard-hero">
        <div>
          <p className="eyebrow">{ownerMode ? 'ACTIVE WEDDING · OWNER MODE' : 'CHANDELIER OAKS · PRIVATE WEDDING PORTAL'}</p>
          <h1>{profile.couple}</h1>
          <p className="wedding-date-large">{formatDate(profile.date)}</p>
          <div className="wedding-package-badge"><span>PACKAGE</span><strong>{pkg.name}</strong><small>${pkg.price.toLocaleString()} · {pkg.duration} · {pkg.maxGuests === null ? 'guest cap to confirm' : `up to ${pkg.maxGuests} guests`}</small></div>
        </div>
        <div className="planning-progress-card"><span>PLANNING PROGRESS</span><strong>{progress}%</strong><div><i style={{ width: `${progress}%` }} /></div><small>{selectedPieces} décor pieces selected · {unreadMessages} unread messages</small></div>
      </section>

      <section className="wedding-action-grid">
        <button onClick={() => onNavigate('catalog')}><span>PINROSE PROP SHOP</span><strong>{selectedPieces} pieces selected</strong><small>Browse décor included in your demo package tier.</small><b>→</b></button>
        <button onClick={() => onNavigate('planner')}><span>VENUE DESIGNER</span><strong>Design multiple property areas</strong><small>Pavilion, live oaks, gazebo, greenhouse, lakeside and pool/patio.</small><b>→</b></button>
        <button onClick={() => onNavigate('media')}><span>MEDIA & INSPIRATION</span><strong>Photos, videos and planning files</strong><small>Keep venue references and wedding inspiration in one place.</small><b>→</b></button>
        <button onClick={() => onNavigate('ai-preview')}><span>AI PREVIEW</span><strong>Visualize your 2D layout</strong><small>Combine venue photos, décor and the overhead plan into a concept preview.</small><b>→</b></button>
        <button onClick={() => onNavigate('messages')}><span>MESSAGES</span><strong>{unreadMessages ? `${unreadMessages} unread` : 'Conversation up to date'}</strong><small>Questions, files and linked décor stay with this wedding.</small><b>→</b></button>
      </section>

      <div className="wedding-content-grid">
        <section className="panel wedding-details-panel">
          <div className="panel__heading"><div><p className="eyebrow">WEDDING DETAILS</p><h2>Plan the day</h2><p>Changes save automatically in this browser-only demo.</p></div></div>
          <div className="form-grid two-col wedding-detail-fields">
            <label><span>Couple</span><input value={profile.couple} onChange={(e) => patch('couple', e.target.value)} /></label>
            <label><span>Wedding date</span><input type="date" value={profile.date} onChange={(e) => patch('date', e.target.value)} /></label>
            <label><span>Guest count</span><input type="number" min="1" max="250" value={profile.guests} onChange={(e) => patch('guests', Number(e.target.value) || 1)} /></label>
            <label><span>Package {ownerMode ? '' : '(venue controlled)'}</span><select value={profile.packageId} onChange={(e) => ownerMode && patch('packageId', e.target.value)} disabled={!ownerMode}>{packages.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label><span>Primary email</span><input type="email" value={profile.primaryEmail} onChange={(e) => patch('primaryEmail', e.target.value)} /></label>
            <label><span>Partner email</span><input type="email" value={profile.partnerEmail} onChange={(e) => patch('partnerEmail', e.target.value)} /></label>
            <label><span>Ceremony area</span><select value={profile.ceremonyArea} onChange={(e) => patch('ceremonyArea', e.target.value)}><option value="">Choose an area</option>{ceremonyAreas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></label>
            <label><span>Reception / gathering area</span><select value={profile.receptionArea} onChange={(e) => patch('receptionArea', e.target.value)}><option value="">Choose an area</option>{receptionAreas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></label>
          </div>
          <label className="notes-field"><span>Notes for Chandelier Oaks</span><textarea value={profile.notes} onChange={(e) => patch('notes', e.target.value)} placeholder="Placement requests, questions, must-haves, vendor notes…" /></label>
        </section>

        <aside className="wedding-side-stack">
          <section className="panel package-entitlement-card"><p className="eyebrow">YOUR PACKAGE</p><h2>{pkg.name}</h2><strong className="package-price">${pkg.price.toLocaleString()}</strong><p>{pkg.description}</p><div className="tier-access"><span>DEMO PROP ACCESS</span><strong>{tierLabel[pkg.tier]}</strong><small>Exact Chandelier Oaks rental tiers still need venue confirmation.</small></div><ul>{pkg.highlights.map((item) => <li key={item}>{item}</li>)}</ul></section>

          <section className="panel wedding-readiness-card"><p className="eyebrow">BOOKING READINESS</p><h2>Milestones</h2><div className="readiness-list"><label><input type="checkbox" checked={profile.contractSigned} onChange={(e) => ownerMode && patch('contractSigned', e.target.checked)} disabled={!ownerMode} /><span><strong>Contract signed</strong><small>Owner managed</small></span></label><label><input type="checkbox" checked={profile.reservationPaid} onChange={(e) => ownerMode && patch('reservationPaid', e.target.checked)} disabled={!ownerMode} /><span><strong>Reservation payment</strong><small>Owner managed</small></span></label><label className={profile.ceremonyArea ? 'done' : ''}><i>{profile.ceremonyArea ? '✓' : '○'}</i><span><strong>Ceremony area selected</strong><small>{profile.ceremonyArea || 'Not chosen'}</small></span></label><label className={selectedPieces ? 'done' : ''}><i>{selectedPieces ? '✓' : '○'}</i><span><strong>Décor started</strong><small>{selectedPieces} pieces selected</small></span></label><label className={paymentStepsCompleted >= 4 ? 'done' : ''}><i>{paymentStepsCompleted >= 4 ? '✓' : '○'}</i><span><strong>Payment milestones</strong><small>{paymentStepsCompleted}/4 marked complete in demo</small></span></label></div></section>
        </aside>
      </div>
    </main>
  )
}
