type SignInProps = {
  onVenueOwner: () => void
  onCouple: () => void
  onBackHome: () => void
}

export default function SignIn({ onVenueOwner, onCouple, onBackHome }: SignInProps) {
  return (
    <main className="page-main shell signin-page">
      <section className="signin-intro">
        <p className="eyebrow">VENUE VISIONS · SIGN IN</p>
        <h1>Choose your workspace.</h1>
        <p>Venue owners manage their venue and all weddings. Couples enter only their private wedding workspace.</p>
      </section>

      <div className="signin-grid">
        <article className="panel signin-card">
          <div className="signin-card__icon">V</div>
          <span className="mini-label">VENUE TEAM</span>
          <h2>Venue owner</h2>
          <p>Manage weddings, inventory, packages, messages, calendar milestones and final setup sheets.</p>
          <button className="button button--primary full-width" onClick={onVenueOwner}>Open Venue Owner Demo</button>
          <small>Demo environment: Chandelier Oaks owner access is prefilled on the next screen.</small>
        </article>

        <article className="panel signin-card">
          <div className="signin-card__icon signin-card__icon--couple">♥</div>
          <span className="mini-label">COUPLE</span>
          <h2>My wedding</h2>
          <p>Open a private wedding workspace for décor, layouts, messages, package details and planning progress.</p>
          <button className="button button--ghost full-width" onClick={onCouple}>Open Couple Demo</button>
          <small>Demo environment: Sarah & John is used as the sample couple.</small>
        </article>
      </div>

      <section className="signin-production-note">
        <strong>Production access</strong>
        <span>Real Venue Visions accounts would use secure owner authentication and email-based couple access or one-time codes.</span>
      </section>
      <button className="text-link signin-back" onClick={onBackHome}>← Back to Venue Visions</button>
    </main>
  )
}
