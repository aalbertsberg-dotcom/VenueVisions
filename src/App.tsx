import { useEffect, useMemo, useState } from 'react'
import Header, { type PageKey } from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Wedding from './pages/Wedding'
import Planner from './pages/Planner'
import Admin from './pages/Admin'
import { inventory } from './data'
import type { PlacedItem, Selection, WeddingProfile } from './types'

const defaultProfile: WeddingProfile = {
  couple: 'Sarah & John',
  date: '2026-10-17',
  guests: 125,
  notes: 'Use lanterns on the guest tables and keep the entrance simple. Place the welcome sign just inside the main doors.',
}

const starterSelections: Selection[] = [
  { itemId: 'lantern-gold', quantity: 12 },
  { itemId: 'greenery-ring', quantity: 12 },
  { itemId: 'welcome-wood', quantity: 1 },
]

const starterPlan: PlacedItem[] = [
  { id: 'starter-1', type: 'round-table', x: 140, y: 115, rotation: 0, scale: 1, label: 'Round table' },
  { id: 'starter-2', type: 'round-table', x: 315, y: 115, rotation: 0, scale: 1, label: 'Round table' },
  { id: 'starter-3', type: 'round-table', x: 140, y: 275, rotation: 0, scale: 1, label: 'Round table' },
  { id: 'starter-4', type: 'round-table', x: 315, y: 275, rotation: 0, scale: 1, label: 'Round table' },
  { id: 'starter-5', type: 'dance-floor', x: 500, y: 175, rotation: 0, scale: 1, label: 'Dance floor' },
  { id: 'starter-6', type: 'bar', x: 600, y: 350, rotation: 0, scale: 1, label: 'Bar' },
]

function parseHash(): PageKey {
  const value = window.location.hash.replace('#/', '').replace('#', '')
  return ['catalog', 'wedding', 'planner', 'admin'].includes(value) ? value as PageKey : 'home'
}

function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [page, setPage] = useState<PageKey>(() => parseHash())
  const [selections, setSelections] = useState<Selection[]>(() => readLocal('venueVisions.selections', starterSelections))
  const [profile, setProfile] = useState<WeddingProfile>(() => readLocal('venueVisions.profile', defaultProfile))
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>(() => readLocal('venueVisions.plan', starterPlan))

  useEffect(() => {
    const onHashChange = () => setPage(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => localStorage.setItem('venueVisions.selections', JSON.stringify(selections)), [selections])
  useEffect(() => localStorage.setItem('venueVisions.profile', JSON.stringify(profile)), [profile])
  useEffect(() => localStorage.setItem('venueVisions.plan', JSON.stringify(placedItems)), [placedItems])

  const navigate = (next: PageKey) => {
    window.location.hash = next === 'home' ? '#/' : `#/${next}`
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setQuantity = (itemId: string, requested: number) => {
    const available = inventory.find((item) => item.id === itemId)?.quantity ?? 0
    const quantity = Math.max(0, Math.min(requested, available))
    setSelections((current) => {
      if (quantity === 0) return current.filter((entry) => entry.itemId !== itemId)
      const exists = current.some((entry) => entry.itemId === itemId)
      return exists ? current.map((entry) => entry.itemId === itemId ? { ...entry, quantity } : entry) : [...current, { itemId, quantity }]
    })
  }

  const selectionCount = useMemo(() => selections.reduce((sum, item) => sum + item.quantity, 0), [selections])

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} selectionCount={selectionCount} onResetDemo={() => {
        if (!window.confirm('Reset the Venue Visions demo back to its original sample data?')) return
        setSelections(starterSelections)
        setProfile(defaultProfile)
        setPlacedItems(starterPlan)
      }} />
      <div className="prototype-banner" role="note">
        <div className="shell prototype-banner__inner">
          <strong>DEMO PROTOTYPE</strong>
          <span>All names, décor, quantities and floor plans shown here are sample data for concept review.</span>
        </div>
      </div>
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'catalog' && <Catalog selections={selections} onSetQuantity={setQuantity} />}
      {page === 'wedding' && <Wedding profile={profile} selections={selections} onProfileChange={setProfile} onSetQuantity={setQuantity} onNavigate={navigate} />}
      {page === 'planner' && <Planner selections={selections} placedItems={placedItems} setPlacedItems={setPlacedItems} onSetQuantity={setQuantity} />}
      {page === 'admin' && <Admin selections={selections} />}
      <footer className="site-footer">
        <div className="shell"><span>Venue Visions</span><span>Demo prototype · Sample data · Local browser storage only</span></div>
      </footer>
    </div>
  )
}
