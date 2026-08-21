import type { CSSProperties } from 'react'
import type { VenueConfig } from '../types'

type SignInProps = {
  venues: VenueConfig[]
  activeVenueId: string
  onSelectVenue: (venueId: string) => void
  onVenueOwner: () => void
  onCouple: () => void
  onBackHome: () => void
}

export default function SignIn({ venues, activeVenueId, onSelectVenue, onVenueOwner, onCouple, onBackHome }: SignInProps) {
  const active = venues.find((item) => item.profile.id === activeVenueId) ?? venues[0]
  return (
    <main className="page-main shell signin-page">
      <section className="signin-intro">
        <p className="eyebrow">VENUE VISIONS · SIGN IN</p>
        <h1>Find your venue first.</h1>
        <p>Owner and couple access always belongs to a venue. Choose the venue, then enter the workspace assigned to you.</p>
      </section>

      <section className="panel signin-venue-picker" style={{ '--venue-primary': active.profile.brandPrimary, '--venue-accent': active.profile.brandAccent } as CSSProperties}>
        <label htmlFor="signinVenue"><span>VENUE</span><select id="signinVenue" value={activeVenueId} onChange={(event) => onSelectVenue(event.target.value)}>{venues.map((config) => <option value={config.profile.id} key={config.profile.id}>{config.profile.shortName}{config.profile.isSample ? ' · Sample venue' : ''}</option>)}</select></label>
        <div className="signin-selected-venue"><span>{active.profile.logoText}</span><div><strong>{active.profile.shortName}</strong><small>{active.profile.locationLabel}</small></div></div>
      </section>

      <div className="signin-grid">
        <article className="panel signin-card"><div className="signin-card__icon">V</div><span className="mini-label">VENUE TEAM</span><h2>{active.profile.shortName} owner</h2><p>Manage weddings, inventory, packages, messages, calendar milestones and final setup sheets for this venue only.</p><button className="button button--primary full-width" onClick={onVenueOwner}>Open Venue Owner Preview</button><small>Preview access is prefilled on the next screen.</small></article>
        <article className="panel signin-card"><div className="signin-card__icon signin-card__icon--couple">♥</div><span className="mini-label">COUPLE</span><h2>My {active.profile.shortName} wedding</h2><p>Enter the private wedding workspace that belongs to this venue.</p><button className="button button--ghost full-width" onClick={onCouple}>Open Couple Workspace</button><small>The preview opens the first configured couple for the selected venue.</small></article>
      </div>

      <section className="signin-production-note"><strong>Production access</strong><span>Real accounts would use secure owner authentication and email-based couple invitations or one-time codes, while still preserving the venue-first path.</span></section>
      <button className="text-link signin-back" onClick={onBackHome}>← Back to Venue Visions</button>
    </main>
  )
}
