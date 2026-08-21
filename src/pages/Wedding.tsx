import type { CSSProperties } from 'react'
import { packageById, tierLabel, venueConfigById } from '../data'
import type { PageKey } from '../components/Header'
import type { Selection, WeddingProfile } from '../types'

function formatDate(value: string) { return new Date(`${value}T12:00:00`).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}) }

type WeddingProps = {
  venueId: string
  profile: WeddingProfile
  selections: Selection[]
  unreadMessages: number
  paymentStepsCompleted: number
  onProfileChange: (profile: WeddingProfile) => void
  onSetQuantity: (itemId: string, quantity: number) => void
  onNavigate: (page: PageKey) => void
  ownerMode: boolean
}

export default function Wedding({ venueId, profile, selections, unreadMessages, paymentStepsCompleted, onProfileChange, onNavigate, ownerMode }: WeddingProps) {
  const config=venueConfigById(venueId); const venue=config.profile; const pkg=packageById(profile.packageId,venueId)
  const selectedPieces=selections.reduce((sum,item)=>sum+item.quantity,0)
  const ceremonyAreas=config.areas.filter((area)=>area.kind==='Ceremony')
  const receptionAreas=config.areas.filter((area)=>area.kind==='Reception'||area.kind==='Hospitality')
  const progressItems=[profile.contractSigned,profile.reservationPaid,Boolean(profile.ceremonyArea),Boolean(profile.receptionArea),selectedPieces>0]
  const progress=Math.round(progressItems.filter(Boolean).length/progressItems.length*100)
  const patch=(key:keyof WeddingProfile,value:string|number|boolean)=>onProfileChange({...profile,[key]:value})
  const inventoryTitle=venue.inventoryLabel ?? 'Décor Collection'

  return <main className="page-main shell wedding-page venue-wedding-page">
    <section className="wedding-dashboard-hero" style={{ '--venue-primary': venue.brandPrimary, '--venue-accent': venue.brandAccent } as CSSProperties}>
      <div><p className="eyebrow">{ownerMode?'ACTIVE WEDDING · OWNER MODE':`${venue.shortName.toUpperCase()} · PRIVATE WEDDING PORTAL`}</p><h1>{profile.couple}</h1><p className="wedding-date-large">{formatDate(profile.date)}</p><div className="wedding-package-badge"><span>PACKAGE</span><strong>{pkg.name}</strong><small>${pkg.price.toLocaleString()} · {pkg.duration} · {pkg.maxGuests===null?'guest cap to confirm':`up to ${pkg.maxGuests} guests`}</small></div></div>
      <div className="planning-progress-card"><span>PLANNING PROGRESS</span><strong>{progress}%</strong><div><i style={{width:`${progress}%`,background:venue.brandAccent}} /></div><small>{selectedPieces} décor pieces selected · {unreadMessages} unread messages</small></div>
    </section>

    <section className="wedding-action-grid">
      <button onClick={()=>onNavigate('catalog')}><span>{inventoryTitle.toUpperCase()}</span><strong>{selectedPieces} pieces selected</strong><small>Browse décor included in your package tier.</small><b>→</b></button>
      <button onClick={()=>onNavigate('planner')}><span>2D VENUE DESIGNER</span><strong>Build the layout first</strong><small>{config.areas.map((a)=>a.name).slice(0,4).join(', ')}. AI Preview follows the finished 2D plan.</small><b>→</b></button>
      <button onClick={()=>onNavigate('media')}><span>MEDIA & INSPIRATION</span><strong>Photos, videos and planning files</strong><small>Keep venue references and wedding inspiration in one place.</small><b>→</b></button>
      <button onClick={()=>onNavigate('messages')}><span>MESSAGES</span><strong>{unreadMessages?`${unreadMessages} unread`:'Conversation up to date'}</strong><small>Questions, files and linked décor stay with this wedding.</small><b>→</b></button>
    </section>

    <div className="wedding-content-grid">
      <section className="panel wedding-details-panel"><div className="panel__heading"><div><p className="eyebrow">WEDDING DETAILS</p><h2>Plan the day</h2><p>Changes save automatically in this browser preview.</p></div></div><div className="form-grid two-col wedding-detail-fields">
        <label><span>Couple</span><input value={profile.couple} onChange={(e)=>patch('couple',e.target.value)} /></label>
        <label><span>Wedding date</span><input type="date" value={profile.date} onChange={(e)=>patch('date',e.target.value)} /></label>
        <label><span>Guest count</span><input type="number" min="1" max="300" value={profile.guests} onChange={(e)=>patch('guests',Number(e.target.value)||1)} /></label>
        <label><span>Package {ownerMode?'':'(venue controlled)'}</span><select value={profile.packageId} onChange={(e)=>ownerMode&&patch('packageId',e.target.value)} disabled={!ownerMode}>{config.packages.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label><span>Primary email</span><input type="email" value={profile.primaryEmail} onChange={(e)=>patch('primaryEmail',e.target.value)} /></label>
        <label><span>Partner email</span><input type="email" value={profile.partnerEmail} onChange={(e)=>patch('partnerEmail',e.target.value)} /></label>
        <label><span>Ceremony area</span><select value={profile.ceremonyArea} onChange={(e)=>patch('ceremonyArea',e.target.value)}><option value="">Choose an area</option>{ceremonyAreas.map((area)=><option key={area.id} value={area.id}>{area.name}</option>)}</select></label>
        <label><span>Reception / gathering area</span><select value={profile.receptionArea} onChange={(e)=>patch('receptionArea',e.target.value)}><option value="">Choose an area</option>{receptionAreas.map((area)=><option key={area.id} value={area.id}>{area.name}</option>)}</select></label>
      </div><label className="notes-field"><span>Notes for {venue.shortName}</span><textarea value={profile.notes} onChange={(e)=>patch('notes',e.target.value)} placeholder="Placement requests, questions, must-haves, vendor notes…" /></label></section>

      <aside className="wedding-side-stack">
        <section className="panel package-entitlement-card"><p className="eyebrow">YOUR PACKAGE</p><h2>{pkg.name}</h2><strong className="package-price">${pkg.price.toLocaleString()}</strong><p>{pkg.description}</p><div className="tier-access"><span>DÉCOR ACCESS</span><strong>{tierLabel[pkg.tier]}</strong><small>{venue.isSample?'Sample venue tier rules are fictional.':'Exact Chandelier Oaks inventory-to-tier mapping still needs venue confirmation.'}</small></div><ul>{pkg.highlights.map((item)=><li key={item}>{item}</li>)}</ul></section>
        <section className="panel wedding-readiness-card"><p className="eyebrow">BOOKING READINESS</p><h2>Milestones</h2><div className="readiness-list"><label><input type="checkbox" checked={profile.contractSigned} onChange={(e)=>ownerMode&&patch('contractSigned',e.target.checked)} disabled={!ownerMode}/><span><strong>Contract signed</strong><small>Owner managed</small></span></label><label><input type="checkbox" checked={profile.reservationPaid} onChange={(e)=>ownerMode&&patch('reservationPaid',e.target.checked)} disabled={!ownerMode}/><span><strong>Reservation payment</strong><small>Owner managed</small></span></label><label className={profile.ceremonyArea?'done':''}><i>{profile.ceremonyArea?'✓':'○'}</i><span><strong>Ceremony area selected</strong><small>{profile.ceremonyArea||'Not chosen'}</small></span></label><label className={selectedPieces?'done':''}><i>{selectedPieces?'✓':'○'}</i><span><strong>Décor started</strong><small>{selectedPieces} pieces selected</small></span></label><label className={paymentStepsCompleted>=4?'done':''}><i>{paymentStepsCompleted>=4?'✓':'○'}</i><span><strong>Payment milestones</strong><small>{paymentStepsCompleted}/4 marked complete in preview</small></span></label></div></section>
      </aside>
    </div>
  </main>
}
