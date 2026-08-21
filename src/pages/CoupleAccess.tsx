import type { CSSProperties } from 'react'
import { useState, type FormEvent } from 'react'
import { venueConfigById } from '../data'
import type { WeddingWorkspace } from '../types'

type CoupleAccessProps = {
  venueId: string
  wedding: WeddingWorkspace
  onSubmitCode: (code: string) => boolean
  onBackHome: () => void
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function CoupleAccess({ venueId, wedding, onSubmitCode, onBackHome }: CoupleAccessProps) {
  const venue = venueConfigById(venueId).profile
  const [code, setCode] = useState(wedding.accessCode)
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!onSubmitCode(code)) { setError('That preview access code is not correct for this wedding.'); return }
    setError('')
  }

  return (
    <main className="page-main shell couple-access-page">
      <section className="panel couple-access-card" aria-labelledby="couple-access-title" style={{ '--venue-primary': venue.brandPrimary, '--venue-accent': venue.brandAccent } as CSSProperties}>
        <div className="couple-access-mark" style={{ background: venue.brandPrimary, color: venue.brandAccent }} aria-hidden="true">{venue.logoText}</div>
        <p className="eyebrow">{venue.shortName.toUpperCase()} · PRIVATE WEDDING WORKSPACE</p>
        <h1 id="couple-access-title">{wedding.profile.couple}</h1>
        <p className="couple-access-date">{formatDate(wedding.profile.date)}</p>
        <p className="couple-access-lead">This wedding belongs to {venue.shortName}. The direct link and access code can only open this venue and this couple's workspace.</p>

        <form className="owner-access-form" onSubmit={submit}>
          <label htmlFor="couple-preview-code">Wedding access code</label>
          <input id="couple-preview-code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(event) => { setCode(event.target.value); setError('') }} />
          <small>Prefilled for this preview: <strong>{wedding.accessCode}</strong></small>
          {error && <div className="owner-access-error" role="alert">{error}</div>}
          <button className="button button--primary full-width" type="submit">Enter {venue.shortName} wedding</button>
        </form>

        <div className="owner-access-note"><strong>Preview access.</strong> Production would use secure email sign-in or one-time codes and would not expose recoverable passwords.</div>
        <button className="text-link owner-access-back" type="button" onClick={onBackHome}>← Back to {venue.shortName}</button>
      </section>
    </main>
  )
}
