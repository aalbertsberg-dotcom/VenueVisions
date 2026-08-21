import { useState } from 'react'
import type { PageKey } from '../components/Header'
import { chandelierOaks, inventory, packages } from '../data'
import type { VenueLead, WeddingWorkspace } from '../types'

const ADMIN_POC_CODE = '654321'

const companyModules = [
  { id: 'venues', title: 'Venue accounts', copy: 'Create, configure, suspend and review each venue using Venue Visions.', defaultOn: true },
  { id: 'sales', title: 'Demo requests + sales', copy: 'Track venue inquiries, requested demos, follow-ups and onboarding status.', defaultOn: true },
  { id: 'billing', title: 'Plans + billing', copy: 'Future subscription plans, billing status, trials and account terms.', defaultOn: false },
  { id: 'support', title: 'Venue support', copy: 'See support requests, onboarding questions and venue account issues.', defaultOn: true },
  { id: 'branding', title: 'Brand + portal setup', copy: 'Manage venue logos, colors, portal settings, property spaces and templates.', defaultOn: true },
  { id: 'platform', title: 'Platform settings', copy: 'Company-level defaults, features, permissions and future integrations.', defaultOn: false },
]

type PlatformAdminProps = {
  authenticated: boolean
  onAuthenticate: (code: string) => boolean
  onLogout: () => void
  onNavigate: (page: PageKey) => void
  leads: VenueLead[]
  weddings: WeddingWorkspace[]
}

export default function PlatformAdmin({ authenticated, onAuthenticate, onLogout, onNavigate, leads, weddings }: PlatformAdminProps) {
  const [code, setCode] = useState(ADMIN_POC_CODE)
  const [error, setError] = useState('')
  const [moduleChoices, setModuleChoices] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('venueVisions.poc.adminModules')
      if (saved) return JSON.parse(saved) as Record<string, boolean>
    } catch { /* browser-only POC */ }
    return Object.fromEntries(companyModules.map((item) => [item.id, item.defaultOn]))
  })
  const [founderNotes, setFounderNotes] = useState(() => {
    try { return localStorage.getItem('venueVisions.poc.adminNotes') ?? '' } catch { return '' }
  })

  const toggleModule = (id: string) => {
    setModuleChoices((current) => {
      const next = { ...current, [id]: !current[id] }
      try { localStorage.setItem('venueVisions.poc.adminModules', JSON.stringify(next)) } catch { /* POC only */ }
      return next
    })
  }

  const saveNotes = (value: string) => {
    setFounderNotes(value)
    try { localStorage.setItem('venueVisions.poc.adminNotes', value) } catch { /* POC only */ }
  }

  if (!authenticated) {
    return (
      <main className="owner-access-page shell">
        <section className="panel owner-access-card platform-access-card">
          <div className="owner-access-lock">VV</div>
          <p className="eyebrow">VENUE VISIONS ADMIN · PROOF OF CONCEPT</p>
          <h1>Shape the company side of Venue Visions.</h1>
          <p className="owner-access-lead">This internal proof of concept is for reviewing what Venue Visions should need as a company: venue accounts, demo requests, onboarding, support, billing and platform settings. Venue customers would never see this area.</p>
          <form className="owner-access-form" onSubmit={(event) => { event.preventDefault(); if (!onAuthenticate(code)) setError('Incorrect proof-of-concept code.'); else setError('') }}>
            <label htmlFor="admin-poc-code">Temporary POC code</label>
            <input id="admin-poc-code" value={code} onChange={(event) => { setCode(event.target.value); setError('') }} />
            <small>Prefilled for review: <strong>{ADMIN_POC_CODE}</strong></small>
            {error && <div className="owner-access-error">{error}</div>}
            <button className="button button--primary full-width" type="submit">Enter VV Admin POC</button>
          </form>
          <div className="owner-access-note"><strong>Proof of concept only.</strong> Nothing on this page represents a finalized company workflow, pricing model, security design or billing system.</div>
        </section>
      </main>
    )
  }

  const totalSelected = weddings.reduce((sum, wedding) => sum + wedding.selections.reduce((sub, item) => sub + item.quantity, 0), 0)
  const enabledCount = companyModules.filter((item) => moduleChoices[item.id]).length

  return (
    <main className="page-main shell platform-page">
      <section className="page-intro page-intro--split admin-intro">
        <div><p className="eyebrow">VENUE VISIONS ADMIN · PROOF OF CONCEPT</p><h1>What should Venue Visions need to run the company?</h1><p>This is an internal concept for the founders to review. The goal is to decide what belongs in the Venue Visions company admin before building a real back office.</p></div>
        <div className="owner-session-actions"><span className="prototype-badge prototype-badge--large">Admin POC</span><button className="text-link" onClick={onLogout}>Exit POC</button></div>
      </section>

      <section className="panel poc-decision-panel">
        <div className="panel__heading"><div><p className="eyebrow">FOUNDER REVIEW BOARD</p><h2>Choose what belongs in the company admin.</h2><p>Toggle the concepts that feel useful. These choices and notes save only in this browser and are here to help shape the future VV admin.</p></div><span className="poc-count">{enabledCount}/{companyModules.length} selected</span></div>
        <div className="poc-module-grid">
          {companyModules.map((item) => {
            const enabled = Boolean(moduleChoices[item.id])
            return (
              <button type="button" key={item.id} className={enabled ? 'poc-module-card poc-module-card--selected' : 'poc-module-card'} onClick={() => toggleModule(item.id)}>
                <span className="poc-module-card__state">{enabled ? 'KEEP IN POC' : 'CONSIDER LATER'}</span>
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
                <b>{enabled ? '✓ Included' : '+ Add concept'}</b>
              </button>
            )
          })}
        </div>
        <label className="poc-notes"><span>Founder notes</span><textarea value={founderNotes} onChange={(event) => saveNotes(event.target.value)} placeholder="What should VV add, remove or change on the company side?" /></label>
      </section>

      <section className="metric-grid platform-metrics">
        <article><span>Venue demo profiles</span><strong>1</strong><small>Chandelier Oaks example</small></article>
        <article><span>Wedding workspaces</span><strong>{weddings.length}</strong><small>inside the venue demo</small></article>
        <article><span>Venue demo requests</span><strong>{leads.length}</strong><small>saved in this browser</small></article>
        <article><span>Selections represented</span><strong>{totalSelected}</strong><small>sample décor pieces</small></article>
      </section>

      <section className="panel platform-tenant-panel">
        <div className="panel__heading"><div><p className="eyebrow">VENUE ACCOUNTS · PROOF OF CONCEPT</p><h2>How VV could manage customer venues.</h2><p>A real company admin could create and manage separate venue accounts while each venue receives its own branded customer experience.</p></div><button className="button button--primary button--small" onClick={() => onNavigate('for-venues')}>Open venue request form</button></div>
        <article className="platform-venue-card">
          <div className="platform-venue-card__brand"><div className="venue-brand-mark venue-brand-mark--small">CO</div><div><span>VENUE DEMO PROFILE</span><h3>{chandelierOaks.shortName}</h3><p>{chandelierOaks.address}</p></div></div>
          <div className="platform-venue-card__stats"><span><strong>{weddings.length}</strong>weddings</span><span><strong>{inventory.length}</strong>sample inventory styles</span><span><strong>{packages.length}</strong>packages</span><span><strong>{chandelierOaks.ownerName}</strong>sample venue contact</span></div>
          <div className="platform-venue-card__actions"><button className="button button--primary button--small" onClick={() => onNavigate('venue')}>Open Venue Demo</button><button className="button button--ghost button--small" onClick={() => onNavigate('admin')}>Open Owner Demo</button></div>
        </article>
      </section>

      <section className="panel platform-leads-panel">
        <div className="panel__heading"><div><p className="eyebrow">DEMO REQUESTS · PROOF OF CONCEPT</p><h2>How new venues could enter the VV pipeline.</h2><p>The public For Venues form feeds this browser-only queue so the founders can review what information would be useful before contacting or configuring a venue.</p></div></div>
        {leads.length === 0 ? <div className="empty-state"><h3>No venue demo requests yet.</h3><p>Submit the For Venues form to see how a new venue request could appear inside the company admin.</p><button className="button button--ghost" onClick={() => onNavigate('for-venues')}>Open venue request form</button></div> : (
          <div className="lead-list">{leads.map((lead) => <article key={lead.id} className="lead-card"><div className="lead-card__brand" style={{ background: lead.brandPrimary, color: '#fff' }}>{lead.logoDataUrl ? <img src={lead.logoDataUrl} alt="" /> : lead.venueName.slice(0, 2).toUpperCase()}</div><div className="lead-card__main"><span>{new Date(lead.submittedAt).toLocaleString()}</span><h3>{lead.venueName}</h3><p>{lead.contactName} · {lead.email}</p><div>{lead.needs.map((need) => <b key={need}>{need}</b>)}</div></div><div className="lead-card__meta"><span>{lead.eventSpaces} spaces</span><span>{lead.weddingsPerMonth}/mo</span><span>{lead.inventorySize}</span></div></article>)}</div>
        )}
      </section>

      <section className="panel platform-architecture">
        <div><p className="eyebrow">COMPANY MODEL · PROOF OF CONCEPT</p><h2>Venue Visions remains the product.</h2><p>The company owns and operates Venue Visions. A venue receives a configured account and branded portal; its couples receive private wedding workspaces inside that venue.</p></div>
        <div className="architecture-tree"><strong>Venue Visions</strong><span>Company-owned platform</span><i>↓</i><strong>Venue account</strong><span>Chandelier Oaks shown as the venue demo</span><i>↓</i><div><b>Couple A</b><b>Couple B</b><b>Couple C</b></div></div>
      </section>
    </main>
  )
}
