import { useMemo, useState } from 'react'
import { packageById } from '../data'
import type { WeddingWorkspace } from '../types'

type CalendarProps = {
  weddings: WeddingWorkspace[]
  activeWeddingId: string
  onSelectWedding: (id: string) => void
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function dateOnly(value: string) { return new Date(`${value}T12:00:00`) }
function isoDate(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` }
function fmt(date: Date) { return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }

function paymentMilestones(wedding: WeddingWorkspace) {
  const event = dateOnly(wedding.profile.date)
  return [
    { label: 'Reservation / signing', date: null, detail: '25% due at signing' },
    { label: 'Second installment', date: addDays(event, -270), detail: 'Amount per venue contract' },
    { label: 'Third installment', date: addDays(event, -180), detail: 'Amount per venue contract' },
    { label: 'Final installment', date: addDays(event, -60), detail: 'Amount per venue contract' },
  ]
}

export default function Calendar({ weddings, activeWeddingId, onSelectWedding }: CalendarProps) {
  const firstWedding = weddings.find((w) => w.id === activeWeddingId) ?? weddings[0]
  const startDate = firstWedding ? dateOnly(firstWedding.profile.date) : new Date()
  const [monthOffset, setMonthOffset] = useState(0)
  const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1)
  const monthStartWeekday = monthDate.getDay()
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()

  const cells = useMemo(() => {
    const result: Array<{ date: Date | null; wedding?: WeddingWorkspace }> = []
    for (let i = 0; i < monthStartWeekday; i++) result.push({ date: null })
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day, 12)
      result.push({ date, wedding: weddings.find((w) => w.profile.date === isoDate(date)) })
    }
    while (result.length % 7) result.push({ date: null })
    return result
  }, [monthDate.getFullYear(), monthDate.getMonth(), monthStartWeekday, daysInMonth, weddings])

  const sorted = [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date))
  return (
    <main className="page-main shell calendar-page">
      <section className="page-intro page-intro--split">
        <div><p className="eyebrow">CHANDELIER OAKS · OWNER TOOL</p><h1>Calendar &amp; payment milestones.</h1><p>The venue can see booked dates at a glance and track the timing of contract installments without turning Venue Visions into accounting software.</p></div>
        <div className="calendar-rule-card"><span>BOOKING RULE</span><strong>One wedding per calendar date</strong><small>The demo blocks a second wedding from using an already-booked date.</small></div>
      </section>

      <div className="calendar-layout">
        <section className="panel month-panel">
          <div className="month-panel__heading"><button onClick={() => setMonthOffset((v) => v - 1)}>←</button><div><span>VENUE CALENDAR</span><strong>{monthDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</strong></div><button onClick={() => setMonthOffset((v) => v + 1)}>→</button></div>
          <div className="calendar-weekdays">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <span key={d}>{d}</span>)}</div>
          <div className="calendar-grid">{cells.map((cell, index) => cell.date ? <button key={isoDate(cell.date)} className={cell.wedding ? 'calendar-day calendar-day--booked' : 'calendar-day'} onClick={() => cell.wedding && onSelectWedding(cell.wedding.id)}><span>{cell.date.getDate()}</span>{cell.wedding ? <><b>BOOKED</b><small>{cell.wedding.profile.couple}</small></> : <small>Available</small>}</button> : <div className="calendar-day calendar-day--empty" key={`empty-${index}`} />)}</div>
        </section>

        <aside className="panel milestone-panel">
          <div className="panel__heading"><div><p className="eyebrow">UPCOMING WEDDINGS</p><h2>Milestone tracker</h2></div></div>
          <div className="milestone-wedding-list">{sorted.map((wedding) => {
            const pkg = packageById(wedding.profile.packageId)
            const milestones = paymentMilestones(wedding)
            return <article key={wedding.id} className={wedding.id === activeWeddingId ? 'milestone-wedding milestone-wedding--active' : 'milestone-wedding'} onClick={() => onSelectWedding(wedding.id)}><div className="milestone-wedding__heading"><div><strong>{wedding.profile.couple}</strong><span>{fmt(dateOnly(wedding.profile.date))}</span></div><b>${pkg.price.toLocaleString()}</b></div><span className="milestone-package">{pkg.name}</span><div className="milestone-steps">{milestones.map((m, i) => <div className={i < wedding.paymentStepsCompleted ? 'milestone-step milestone-step--done' : 'milestone-step'} key={m.label}><i>{i < wedding.paymentStepsCompleted ? '✓' : i + 1}</i><span><strong>{m.label}</strong><small>{m.date ? fmt(m.date) : 'At contract signing'} · {m.detail}</small></span></div>)}</div></article>
          })}</div>
          <div className="calendar-demo-note"><strong>Demo rule:</strong> timing follows the public Chandelier Oaks FAQ: 25% at signing, then installments due 270 days, 180 days and 60 days before the event. The later installment amounts and paid/unpaid statuses are not public, so this demo does not invent them.</div>
        </aside>
      </div>
    </main>
  )
}
