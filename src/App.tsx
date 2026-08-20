import { useEffect, useMemo, useState } from 'react'
import Header, { type PageKey } from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Wedding from './pages/Wedding'
import Planner from './pages/Planner'
import Messages from './pages/Messages'
import Admin from './pages/Admin'
import { inventory } from './data'
import type { MessageContext, MessageRole, PlacedItem, Selection, WeddingMessage, WeddingProfile, WeddingStatus, WeddingWorkspace } from './types'

const DEMO_VENUE_ID = 'demo-venue-1'

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

const demoWeddings: WeddingWorkspace[] = [
  {
    id: 'wedding-sarah-john',
    venueId: DEMO_VENUE_ID,
    status: 'Ready',
    profile: defaultProfile,
    selections: starterSelections,
    placedItems: starterPlan,
    messages: starterMessages,
  },
  {
    id: 'wedding-ashley-mark',
    venueId: DEMO_VENUE_ID,
    status: 'Designing',
    profile: {
      couple: 'Ashley & Mark',
      date: '2026-10-24',
      guests: 90,
      notes: 'Keep the room warm and simple. We like the brass candle holders with white bud vases.',
    },
    selections: [
      { itemId: 'candle-brass', quantity: 8 },
      { itemId: 'vase-white', quantity: 8 },
      { itemId: 'table-number', quantity: 10 },
    ],
    placedItems: [
      { id: 'ashley-table-1', type: 'round-table', x: 175, y: 145, rotation: 0, scale: 1, label: 'Round table' },
      { id: 'ashley-table-2', type: 'round-table', x: 355, y: 145, rotation: 0, scale: 1, label: 'Round table' },
      { id: 'ashley-dance', type: 'dance-floor', x: 520, y: 220, rotation: 0, scale: .9, label: 'Dance floor' },
    ],
    messages: [
      {
        id: 'ashley-msg-1', senderRole: 'bride', senderName: 'Ashley & Mark',
        body: 'Could we use the brass candle holders with the white vases on alternating tables?',
        timestamp: '2026-08-19T16:10:00-05:00', attachments: [],
        context: { kind: 'inventory', id: 'candle-brass', label: 'Brass Taper Candle Holder' },
        readByBride: true, readByVenue: false,
      },
    ],
  },
  {
    id: 'wedding-jennifer-matt',
    venueId: DEMO_VENUE_ID,
    status: 'Not started',
    profile: {
      couple: 'Jennifer & Matt',
      date: '2026-11-07',
      guests: 150,
      notes: '',
    },
    selections: [],
    placedItems: [],
    messages: [],
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

function initialWeddings(): WeddingWorkspace[] {
  const current = readLocal<WeddingWorkspace[] | null>('venueVisions.weddings.v1', null)
  if (current?.length) return current

  // Migrate the original single-wedding demo into Sarah & John's workspace if it exists.
  const oldProfile = readLocal<WeddingProfile>('venueVisions.profile', defaultProfile)
  const oldSelections = readLocal<Selection[]>('venueVisions.selections', starterSelections)
  const oldPlan = readLocal<PlacedItem[]>('venueVisions.plan', starterPlan)
  const oldMessages = readLocal<WeddingMessage[]>('venueVisions.messages', starterMessages)
  return demoWeddings.map((wedding, index) => index === 0
    ? { ...wedding, profile: oldProfile, selections: oldSelections, placedItems: oldPlan, messages: oldMessages }
    : wedding)
}

export default function App() {
  const [page, setPage] = useState<PageKey>(() => parseHash())
  const [weddings, setWeddings] = useState<WeddingWorkspace[]>(() => initialWeddings())
  const [activeWeddingId, setActiveWeddingId] = useState<string>(() => readLocal('venueVisions.activeWeddingId', 'wedding-sarah-john'))
  const [messageRole, setMessageRole] = useState<MessageRole>(() => readLocal('venueVisions.messageRole', 'bride'))
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => readLocal('venueVisions.notifications', false))
  const [adminDemoAcknowledged, setAdminDemoAcknowledged] = useState<boolean>(() => sessionStorage.getItem('venueVisions.adminDemoAcknowledged') === 'true')

  const activeWedding = weddings.find((wedding) => wedding.id === activeWeddingId) ?? weddings[0]
  const selections = activeWedding?.selections ?? []
  const profile = activeWedding?.profile ?? defaultProfile
  const placedItems = activeWedding?.placedItems ?? []
  const messages = activeWedding?.messages ?? []

  useEffect(() => {
    const onHashChange = () => setPage(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => localStorage.setItem('venueVisions.weddings.v1', JSON.stringify(weddings)), [weddings])
  useEffect(() => localStorage.setItem('venueVisions.activeWeddingId', JSON.stringify(activeWeddingId)), [activeWeddingId])
  useEffect(() => localStorage.setItem('venueVisions.messageRole', JSON.stringify(messageRole)), [messageRole])
  useEffect(() => localStorage.setItem('venueVisions.notifications', JSON.stringify(notificationsEnabled)), [notificationsEnabled])

  const updateActiveWedding = (updater: (current: WeddingWorkspace) => WeddingWorkspace) => {
    setWeddings((current) => current.map((wedding) => wedding.id === activeWeddingId ? updater(wedding) : wedding))
  }

  useEffect(() => {
    if (page !== 'messages' || !activeWedding) return
    const nextMessages = activeWedding.messages.map((message) => {
      if (message.senderRole === messageRole) return message
      if (messageRole === 'bride' && !message.readByBride) return { ...message, readByBride: true }
      if (messageRole === 'venue' && !message.readByVenue) return { ...message, readByVenue: true }
      return message
    })
    if (nextMessages.some((message, index) => message !== activeWedding.messages[index])) {
      updateActiveWedding((wedding) => ({ ...wedding, messages: nextMessages }))
    }
  }, [page, messageRole, activeWeddingId])

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
    updateActiveWedding((wedding) => {
      const current = wedding.selections
      const next = quantity === 0
        ? current.filter((entry) => entry.itemId !== itemId)
        : current.some((entry) => entry.itemId === itemId)
          ? current.map((entry) => entry.itemId === itemId ? { ...entry, quantity } : entry)
          : [...current, { itemId, quantity }]
      return { ...wedding, selections: next, status: next.length ? 'Designing' : wedding.status }
    })
  }

  const updateProfile = (next: WeddingProfile) => {
    if (next.date && weddings.some((wedding) => wedding.id !== activeWeddingId && wedding.profile.date === next.date)) {
      const conflict = weddings.find((wedding) => wedding.id !== activeWeddingId && wedding.profile.date === next.date)
      window.alert(`${next.date} is already booked for ${conflict?.profile.couple}. This demo allows one wedding per calendar date.`)
      return
    }
    updateActiveWedding((wedding) => ({ ...wedding, profile: next }))
  }

  const setPlacedItems = (next: PlacedItem[] | ((current: PlacedItem[]) => PlacedItem[])) => {
    updateActiveWedding((wedding) => ({
      ...wedding,
      placedItems: typeof next === 'function' ? next(wedding.placedItems) : next,
      status: 'Designing',
    }))
  }

  const setMessages = (next: WeddingMessage[] | ((current: WeddingMessage[]) => WeddingMessage[])) => {
    updateActiveWedding((wedding) => ({
      ...wedding,
      messages: typeof next === 'function' ? next(wedding.messages) : next,
    }))
  }

  const openWedding = (id: string, destination: PageKey = 'wedding') => {
    setActiveWeddingId(id)
    setMessageRole('venue')
    navigate(destination)
  }

  const addWedding = (couple: string, date: string, guests: number): string | null => {
    const cleanCouple = couple.trim()
    if (!cleanCouple) return 'Enter the couple names.'
    if (!date) return 'Choose a wedding date.'
    const conflict = weddings.find((wedding) => wedding.profile.date === date)
    if (conflict) return `${date} is already booked for ${conflict.profile.couple}. Choose another date.`

    const id = `wedding-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const newWedding: WeddingWorkspace = {
      id,
      venueId: DEMO_VENUE_ID,
      status: 'Not started' as WeddingStatus,
      profile: { couple: cleanCouple, date, guests: Math.max(1, guests || 1), notes: '' },
      selections: [],
      placedItems: [],
      messages: [],
    }
    setWeddings((current) => [...current, newWedding])
    setActiveWeddingId(id)
    return null
  }

  const selectionCount = useMemo(() => selections.reduce((sum, item) => sum + item.quantity, 0), [selections])
  const unreadMessages = useMemo(() => messages.filter((message) => {
    if (message.senderRole === messageRole) return false
    return messageRole === 'bride' ? !message.readByBride : !message.readByVenue
  }).length, [messages, messageRole])

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} selectionCount={selectionCount} unreadMessages={unreadMessages} activeWeddingName={profile.couple} onResetDemo={() => {
        if (!window.confirm('Reset the Venue Visions demo back to its original sample data?')) return
        setWeddings(demoWeddings)
        setActiveWeddingId('wedding-sarah-john')
        setMessageRole('bride')
        setNotificationsEnabled(false)
      }} />
      <div className="prototype-banner" role="note">
        <div className="shell prototype-banner__inner">
          <strong>DEMO PROTOTYPE</strong>
          <span>Sample data only · Multiple wedding workspaces are separated in this browser · Production will use secure accounts and a database.</span>
        </div>
      </div>
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'catalog' && <Catalog selections={selections} onSetQuantity={setQuantity} />}
      {page === 'wedding' && <Wedding profile={profile} selections={selections} unreadMessages={unreadMessages} onProfileChange={updateProfile} onSetQuantity={setQuantity} onNavigate={navigate} />}
      {page === 'planner' && <Planner selections={selections} placedItems={placedItems} setPlacedItems={setPlacedItems} onSetQuantity={setQuantity} />}
      {page === 'messages' && <Messages profile={profile} selections={selections} placedItems={placedItems} messages={messages} setMessages={setMessages} currentRole={messageRole} setCurrentRole={setMessageRole} notificationsEnabled={notificationsEnabled} setNotificationsEnabled={setNotificationsEnabled} onOpenContext={openMessageContext} />}
      {page === 'admin' && <Admin weddings={weddings} activeWeddingId={activeWeddingId} onOpenWedding={openWedding} onAddWedding={addWedding} demoAcknowledged={adminDemoAcknowledged} onAcknowledgeDemo={() => { sessionStorage.setItem('venueVisions.adminDemoAcknowledged', 'true'); setAdminDemoAcknowledged(true) }} onExitDemo={() => navigate('home')} />}
      <footer className="site-footer">
        <div className="shell"><span>Venue Visions</span><span>Demo prototype · Sample data · Local browser storage only</span></div>
      </footer>
    </div>
  )
}
