import { useState, type FormEvent } from 'react'
import type { WeddingWorkspace } from '../types'

type CoupleAccessProps = {
  wedding: WeddingWorkspace
  onSubmitCode: (code: string) => boolean
  onBackHome: () => void
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function CoupleAccess({ wedding, onSubmitCode, onBackHome }: CoupleAccessProps) {
  const [code, setCode] = useState(wedding.accessCode)
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!onSubmitCode(code)) {
      setError('That demo access code is not correct for this wedding.')
      return
    }
    setError('')
  }

  return (
    <main className="page-main shell couple-access-page">
      <section className="panel couple-access-card" aria-labelledby="couple-access-title">
        <div className="couple-access-mark" aria-hidden="true">VV</div>
        <p className="eyebrow">PRIVATE WEDDING WORKSPACE · DEMO</p>
        <h1 id="couple-access-title">{wedding.profile.couple}</h1>
        <p className="couple-access-date">{formatDate(wedding.profile.date)}</p>
        <p className="couple-access-lead">
          This wedding has its own link and access code. In production, each couple would only be able to open their own workspace.
        </p>

        <form className="owner-access-form" onSubmit={submit}>
          <label htmlFor="couple-demo-code">Wedding access code</label>
          <input
            id="couple-demo-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => { setCode(event.target.value); setError('') }}
          />
          <small>Prefilled for the demo: <strong>{wedding.accessCode}</strong></small>
          {error && <div className="owner-access-error" role="alert">{error}</div>}
          <button className="button button--primary full-width" type="submit">Enter wedding workspace</button>
        </form>

        <div className="owner-access-note">
          <strong>Prototype only.</strong> The code is visible in the demo on purpose. Production access would use secure email sign-in or one-time codes and would not expose recoverable passwords.
        </div>
        <button className="text-link owner-access-back" type="button" onClick={onBackHome}>← Back to public demo</button>
      </section>
    </main>
  )
}
