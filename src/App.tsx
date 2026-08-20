import { useEffect, useMemo, useState } from 'react'
import Header, { type PageKey } from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Wedding from './pages/Wedding'
import Planner from './pages/Planner'
import Messages from './pages/Messages'
import Admin from './pages/Admin'
import { inventory } from './data'
import type { MessageContext, MessageRole, PlacedItem, Selection, WeddingMessage, WeddingProfile } from './types'

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

const starterMessages: WeddingMessage[] = [
  {
    id: 'sample-msg-1',
    senderRole: 'bride',
    senderName: 'Sarah & John',
    body: 'Hi! We started choosing décor. We really like the gold lanterns and greenery rings. Can those be used together on the round tables?',
    timestamp: '2026-08-18T14:22:00-05:00',
    attachments: [],
    context: { kind: 'inventory', id: 'lantern-gold', label: 'Gold Lantern — Large' },
    readByBride: true,
    readByVenue: true,
  },
  {
    id: 'sample-msg-2',
    senderRole: 'venue',
    senderName: 'Venue Team',
    body: 'Absolutely. That combination works well. I would suggest one lantern and one greenery ring per guest table.',
    timestamp: '2026-08-18T15:06:00-05:00',
    attachments: [],
    readByBride: true,
    readByVenue: true,
  },
  {
    id: 'sample-msg-3',
    senderRole: 'bride',
    senderName: 'Sarah & John',
    body: 'Perfect. I moved the dance floor and tables around. This is roughly the layout we are thinking about.',
    timestamp: '2026-08-19T10:41:00-05:00',
    attachments: [],
    context: { kind: 'area', id: 'Reception Hall', label: 'Reception Hall floor plan' },
    readByBride: true,
    readByVenue: true,
  },
  {
    id: 'sample-msg-4',
    senderRole: 'venue',
    senderName: 'Venue Team',
    body: 'I see it. This layout gives the dance floor a good amount of room. We can keep using this thread for any changes so the final setup stays with your wedding plan.',
    timestamp: '2026-08-20T09:18:00-05:00',
    attachments: [],
    context: { kind: 'area', id: 'Reception Hall', label: 'Reception Hall floor plan' },
    readByBride: false,
    readByVenue: true,
  },
]

function parseHash(): PageKey {
  const value = window.location.hash.replace('#/', '').replace('#', '')
  return ['catalog', 'wedding', 'planner', 'messages', 'admin'].includes(value) ? value as PageKey : 'home'
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
  const [messages, setMessages] = useState<WeddingMessage[]>(() => readLocal('venueVisions.messages', starterMessages))
  const [messageRole, setMessageRole] = useState<MessageRole>(() => readLocal('venueVisions.messageRole', 'bride'))
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => readLocal('venueVisions.notifications', false))

  useEffect(() => {
    const onHashChange = () => setPage(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => localStorage.setItem('venueVisions.selections', JSON.stringify(selections)), [selections])
  useEffect(() => localStorage.setItem('venueVisions.profile', JSON.stringify(profile)), [profile])
  useEffect(() => localStorage.setItem('venueVisions.plan', JSON.stringify(placedItems)), [placedItems])
  useEffect(() => localStorage.setItem('venueVisions.messages', JSON.stringify(messages)), [messages])
  useEffect(() => localStorage.setItem('venueVisions.messageRole', JSON.stringify(messageRole)), [messageRole])
  useEffect(() => localStorage.setItem('venueVisions.notifications', JSON.stringify(notificationsEnabled)), [notificationsEnabled])

  useEffect(() => {
    if (page !== 'messages') return
    setMessages((current) => {
      let changed = false
      const next = current.map((message) => {
        if (message.senderRole === messageRole) return message
        if (messageRole === 'bride' && !message.readByBride) {
          changed = true
          return { ...message, readByBride: true }
        }
        if (messageRole === 'venue' && !message.readByVenue) {
          changed = true
          return { ...message, readByVenue: true }
        }
        return message
      })
      return changed ? next : current
    })
  }, [page, messageRole, messages])

  const navigate = (next: PageKey) => {
    window.location.hash = next === 'home' ? '#/' : `#/${next}`
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openMessageContext = (context: MessageContext) => {
    if (context.kind === 'inventory') {
      localStorage.setItem('venueVisions.catalogFocus', context.id)
      navigate('catalog')
      return
    }
    localStorage.setItem('venueVisions.plannerArea', context.id)
    navigate('planner')
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
  const unreadMessages = useMemo(() => messages.filter((message) => {
    if (message.senderRole === messageRole) return false
    return messageRole === 'bride' ? !message.readByBride : !message.readByVenue
  }).length, [messages, messageRole])

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} selectionCount={selectionCount} unreadMessages={unreadMessages} onResetDemo={() => {
        if (!window.confirm('Reset the Venue Visions demo back to its original sample data?')) return
        setSelections(starterSelections)
        setProfile(defaultProfile)
        setPlacedItems(starterPlan)
        setMessages(starterMessages)
        setMessageRole('bride')
        setNotificationsEnabled(false)
      }} />
      <div className="prototype-banner" role="note">
        <div className="shell prototype-banner__inner">
          <strong>DEMO PROTOTYPE</strong>
          <span>All names, décor, quantities, messages and floor plans shown here are sample data for concept review.</span>
        </div>
      </div>
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'catalog' && <Catalog selections={selections} onSetQuantity={setQuantity} />}
      {page === 'wedding' && <Wedding profile={profile} selections={selections} unreadMessages={unreadMessages} onProfileChange={setProfile} onSetQuantity={setQuantity} onNavigate={navigate} />}
      {page === 'planner' && <Planner selections={selections} placedItems={placedItems} setPlacedItems={setPlacedItems} onSetQuantity={setQuantity} />}
      {page === 'messages' && <Messages profile={profile} selections={selections} placedItems={placedItems} messages={messages} setMessages={setMessages} currentRole={messageRole} setCurrentRole={setMessageRole} notificationsEnabled={notificationsEnabled} setNotificationsEnabled={setNotificationsEnabled} onOpenContext={openMessageContext} />}
      {page === 'admin' && <Admin selections={selections} unreadMessages={unreadMessages} onNavigate={navigate} />}
      <footer className="site-footer">
        <div className="shell"><span>Venue Visions</span><span>Demo prototype · Sample data · Local browser storage only</span></div>
      </footer>
    </div>
  )
}
