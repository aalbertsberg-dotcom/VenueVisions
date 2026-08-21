import { useState } from 'react'
import type { PageKey } from '../components/Header'
import { chandelierOaks, inventory, packages } from '../data'
import type { VenueLead, WeddingWorkspace } from '../types'

const FOUNDER_DEMO_CODE = '654321'

type PlatformAdminProps = {
  authenticated: boolean
  onAuthenticate: (code: string) => boolean
  onLogout: () => void
  onNavigate: (page: PageKey) => void
  leads: VenueLead[]
  weddings: WeddingWorkspace[]
}

export default function PlatformAdmin({ authenticated, onAuthenticate, onLogout, onNavigate, leads, weddings }: PlatformAdminProps) {
  const [code, setCode] = useState(FOUNDER_DEMO_CODE)
  const [error, setError] = useState('')

  if (!authenticated) {
    return (
      <main className="owner-access-page shell">
        <section className="panel owner-access-card platform-access-card">
          <div className="owner-access-lock">VV</div>
          <p className="eyebrow">VENUE VISIONS · FOUNDER DEMO</p>
          <h1>Platform administration.</h1>
          <p className="owner-access-lead">This is the SaaS-level view above individual venue customers. It is separate from Chandelier Oaks' owner dashboard.</p>
          <form className="owner-access-form" onSubmit={(event) => { event.preventDefault(); if (!onAuthenticate(code)) setError('Incorrect demo code.'); else setError('') }}>
            <label htmlFor="founder-code">Temporary demo code</label>
            <input id="founder-code" value={code} onChange={(event) => { setCode(event.target.value); setError('') }} />
            <small>Prefilled demo code: <strong>{FOUNDER_DEMO_CODE}</strong></small>
            {error && <div className="owner-access-error">{error}</div>}
            <button className="button button--primary full-width" type="submit">Enter Founder Dashboard</button>
          </form>
          <div className="owner-access-note"><strong>Prototype only.</strong> A production platform console would use real founder/admin authentication and tenant-level permissions.</div>
        </section>
      </main>
    )
  }

  const totalSelected = weddings.reduce((sum, wedding) => sum + wedding.selections.reduce((sub, item) => sub + item.quantity, 0), 0)
  return (
    <main className="page-main shell platform-page">
      <section className="page-intro page-intro--split admin-intro">
        <div><p className="eyebrow">VENUE VISIONS · FOUNDER DASHBOARD</p><h1>The platform above every venue.</h1><p>This is where Venue Visions manages customer venues, onboarding leads and the SaaS structure. Venue owners never see this level.</p></div>
        <div className="owner-session-actions"><span className="prototype-badge prototype-badge--large">Founder demo signed in</span><button className="text-link" onClick={onLogout}>Sign out</button></div>
      </section>

      <section className="metric-grid platform-metrics">
        <article><span>Active demo venues</span><strong>1</strong><small>Chandelier Oaks</small></article>
        <article><span>Wedding workspaces</span><strong>{weddings.length}</strong><small>across active venues</small></article>
        <article><span>Onboarding leads</span><strong>{leads.length}</strong><small>saved in this browser</small></article>
        <article><span>Selections managed</span><strong>{totalSelected}</strong><small>sample décor pieces</small></article>
      </section>

      <section className="panel platform-tenant-panel">
        <div className="panel__heading"><div><p className="eyebrow">CUSTOMER VENUES</p><h2>Venue tenants</h2><p>Each venue gets separate branding, owner access, inventory, packages, couples and data.</p></div><button className="button button--primary button--small" onClick={() => onNavigate('for-venues')}>+ Onboard venue</button></div>
        <article className="platform-venue-card">
          <div className="platform-venue-card__brand"><div className="venue-brand-mark venue-brand-mark--small">CO</div><div><span>ACTIVE DEMO TENANT</span><h3>{chandelierOaks.shortName}</h3><p>{chandelierOaks.address}</p></div></div>
          <div className="platform-venue-card__stats"><span><strong>{weddings.length}</strong>weddings</span><span><strong>{inventory.length}</strong>demo inventory styles</span><span><strong>{packages.length}</strong>packages</span><span><strong>{chandelierOaks.ownerName}</strong>venue contact</span></div>
          <div className="platform-venue-card__actions"><button className="button button--primary button--small" onClick={() => onNavigate('venue')}>Open venue portal</button><button className="button button--ghost button--small" onClick={() => onNavigate('admin')}>Owner dashboard</button></div>
        </article>
      </section>

      <section className="panel platform-leads-panel">
        <div className="panel__heading"><div><p className="eyebrow">ONBOARDING PIPELINE</p><h2>Venue signup submissions</h2><p>The public For Venues form feeds this founder-only queue in the demo.</p></div></div>
        {leads.length === 0 ? <div className="empty-state"><h3>No demo venue leads yet.</h3><p>Submit the For Venues form to see how a new venue enters the platform pipeline.</p><button className="button button--ghost" onClick={() => onNavigate('for-venues')}>Open onboarding form</button></div> : (
          <div className="lead-list">{leads.map((lead) => <article key={lead.id} className="lead-card"><div className="lead-card__brand" style={{ background: lead.brandPrimary, color: '#fff' }}>{lead.logoDataUrl ? <img src={lead.logoDataUrl} alt="" /> : lead.venueName.slice(0, 2).toUpperCase()}</div><div className="lead-card__main"><span>{new Date(lead.submittedAt).toLocaleString()}</span><h3>{lead.venueName}</h3><p>{lead.contactName} · {lead.email}</p><div>{lead.needs.map((need) => <b key={need}>{need}</b>)}</div></div><div className="lead-card__meta"><span>{lead.eventSpaces} spaces</span><span>{lead.weddingsPerMonth}/mo</span><span>{lead.inventorySize}</span></div></article>)}</div>
        )}
      </section>

      <section className="panel platform-architecture">
        <div><p className="eyebrow">SAAS OWNERSHIP MODEL</p><h2>Venue Visions remains the product.</h2><p>Chandelier Oaks is configured as a customer tenant. Additional venues would be added beside it, not copied into a separate codebase.</p></div>
        <div className="architecture-tree"><strong>Venue Visions</strong><span>Founder-owned platform · 2 founder seats</span><i>↓</i><strong>Chandelier Oaks</strong><span>Venue tenant / owner</span><i>↓</i><div><b>Couple A</b><b>Couple B</b><b>Couple C</b></div></div>
      </section>
    </main>
  )
}
