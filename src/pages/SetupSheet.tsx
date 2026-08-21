import { inventory, packageById, venueAreas } from '../data'
import type { WeddingWorkspace } from '../types'

type SetupSheetProps = { wedding: WeddingWorkspace }

function formatDate(value: string) { return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) }

export default function SetupSheet({ wedding }: SetupSheetProps) {
  const pkg = packageById(wedding.profile.packageId)
  const selections = wedding.selections.map((selection) => ({ ...selection, item: inventory.find((item) => item.id === selection.itemId) })).filter((entry) => entry.item)
  const storage = selections.reduce<Record<string, typeof selections>>((groups, entry) => { const key = entry.item!.storage; (groups[key] ||= []).push(entry); return groups }, {})
  const areaCounts = venueAreas.map((area) => ({ area, count: wedding.placedItems.filter((item) => (item.areaId || 'pecan-pavilion') === area.id).length })).filter((entry) => entry.count > 0)
  return (
    <main className="page-main shell setup-sheet-page">
      <section className="setup-sheet-toolbar no-print"><div><p className="eyebrow">CHANDELIER OAKS · SETUP SHEET</p><h1>Final handoff preview.</h1><p>Print or save this demo summary after the couple's selections and layouts are finalized.</p></div><button className="button button--primary" onClick={() => window.print()}>Print / Save PDF</button></section>
      <section className="setup-sheet paper-sheet">
        <header className="paper-sheet__header"><div className="venue-brand-mark venue-brand-mark--paper">CO</div><div><span>CHANDELIER OAKS · POWERED BY VENUE VISIONS</span><h2>{wedding.profile.couple}</h2><p>{formatDate(wedding.profile.date)} · {pkg.name} · {wedding.profile.guests} guests</p></div></header>
        <div className="paper-summary-grid"><article><span>Ceremony</span><strong>{venueAreas.find((a) => a.id === wedding.profile.ceremonyArea)?.name || 'Not selected'}</strong></article><article><span>Reception</span><strong>{venueAreas.find((a) => a.id === wedding.profile.receptionArea)?.name || 'Not selected'}</strong></article><article><span>Décor pieces</span><strong>{wedding.selections.reduce((sum, item) => sum + item.quantity, 0)}</strong></article><article><span>Planning status</span><strong>{wedding.status}</strong></article></div>
        <section className="paper-block"><h3>Pinrose Prop Shop pull list</h3>{selections.length ? <table><thead><tr><th>Item</th><th>Qty</th><th>Storage</th></tr></thead><tbody>{selections.map((entry) => <tr key={entry.itemId}><td>{entry.item!.name}</td><td>{entry.quantity}</td><td>{entry.item!.storage}</td></tr>)}</tbody></table> : <p>No décor selected.</p>}</section>
        <section className="paper-block"><h3>Pull by storage location</h3>{Object.entries(storage).map(([location, entries]) => <div className="storage-pull-group" key={location}><strong>{location}</strong><span>{entries.map((entry) => `${entry.quantity} × ${entry.item!.name}`).join(' · ')}</span></div>)}</section>
        <section className="paper-block"><h3>Venue layouts</h3>{areaCounts.length ? <div className="paper-area-grid">{areaCounts.map(({ area, count }) => <article key={area.id}><strong>{area.name}</strong><span>{count} placed objects</span></article>)}</div> : <p>No floor-plan objects placed yet.</p>}</section>
        <section className="paper-block"><h3>Couple notes</h3><p>{wedding.profile.notes || 'No notes added.'}</p></section>
        <footer className="paper-sheet__footer"><span>Generated from the Venue Visions demo.</span><span>Sample inventory and planning data only.</span></footer>
      </section>
    </main>
  )
}
