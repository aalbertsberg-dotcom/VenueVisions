import { useEffect, useMemo, useState } from 'react'
import Header, { type PageKey } from './components/Header'
import Home from './pages/Home'
import ForVenues from './pages/ForVenues'
import VenuePortal from './pages/VenuePortal'
import Catalog from './pages/Catalog'
import Wedding from './pages/Wedding'
import Planner from './pages/Planner'
import Messages from './pages/Messages'
import Calendar from './pages/Calendar'
import SetupSheet from './pages/SetupSheet'
import Admin from './pages/Admin'
import PlatformAdmin from './pages/PlatformAdmin'
import CoupleAccess from './pages/CoupleAccess'
import { chandelierOaks, inventory, itemAllowedForTier, packageById } from './data'
import type { MessageContext, MessageRole, PlacedItem, Selection, VenueLead, WeddingMessage, WeddingProfile, WeddingStatus, WeddingWorkspace } from './types'

const DEMO_VENUE_ID = chandelierOaks.id
const OWNER_DEMO_CODE = '123456'
const ADMIN_POC_CODE = '654321'

const starterMessages: WeddingMessage[] = [
  {
    id: 'sample-msg-1', senderRole: 'bride', senderName: 'Sarah & John',
    body: 'Hi! We started looking through the Pinrose Prop Shop. Could we use the gold lanterns with the greenery around the guest tables?',
    timestamp: '2026-08-18T14:22:00-05:00', attachments: [], context: { kind: 'inventory', id: 'gold-lantern', label: 'Gold Lantern Set' }, readByBride: true, readByVenue: true,
  },
  {
    id: 'sample-msg-2', senderRole: 'venue', senderName: 'Chandelier Oaks Team',
    body: 'Absolutely. Keep that combination in your selections and we can use the final setup sheet when the date gets closer.',
    timestamp: '2026-08-18T15:06:00-05:00', attachments: [], readByBride: true, readByVenue: true,
  },
  {
    id: 'sample-msg-3', senderRole: 'bride', senderName: 'Sarah & John',
    body: 'Perfect. We also started a layout for the Pecan Pavilion so you can see the general table and dance-floor placement.',
    timestamp: '2026-08-19T10:41:00-05:00', attachments: [], context: { kind: 'area', id: 'pecan-pavilion', label: 'Pecan Pavilion' }, readByBride: true, readByVenue: true,
  },
  {
    id: 'sample-msg-4', senderRole: 'venue', senderName: 'Chandelier Oaks Team',
    body: 'I see it. Keep using the designer and this thread for changes so everything stays attached to your wedding workspace.',
    timestamp: '2026-08-20T09:18:00-05:00', attachments: [], context: { kind: 'area', id: 'pecan-pavilion', label: 'Pecan Pavilion' }, readByBride: false, readByVenue: true,
  },
]

const starterPlan: PlacedItem[] = [
  { id: 'starter-1', type: 'round-table', x: 140, y: 115, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' },
  { id: 'starter-2', type: 'round-table', x: 315, y: 115, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' },
  { id: 'starter-3', type: 'round-table', x: 140, y: 275, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' },
  { id: 'starter-4', type: 'round-table', x: 315, y: 275, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' },
  { id: 'starter-5', type: 'dance-floor', x: 500, y: 175, rotation: 0, scale: 1, label: 'Dance floor', areaId: 'pecan-pavilion' },
  { id: 'starter-6', type: 'bar', x: 600, y: 350, rotation: 0, scale: 1, label: 'Bar', areaId: 'pecan-pavilion' },
  { id: 'starter-7', type: 'arch', x: 330, y: 90, rotation: 0, scale: 1, label: 'Ceremony arch', areaId: 'under-the-oaks' },
]

const demoWeddings: WeddingWorkspace[] = [
  {
    id: 'wedding-sarah-john', venueId: DEMO_VENUE_ID, accessSlug: 'sarah-john', accessCode: '111111', status: 'Designing', paymentStepsCompleted: 2,
    profile: {
      couple: 'Sarah & John', date: '2026-10-17', guests: 125, packageId: 'weekend', ceremonyArea: 'under-the-oaks', receptionArea: 'pecan-pavilion',
      primaryEmail: 'sarah@example.com', partnerEmail: 'john@example.com', contractSigned: true, reservationPaid: true,
      notes: 'Use warm lanterns and greenery on guest tables. Keep the pavilion entrance simple and leave plenty of dance-floor space.',
    },
    selections: [{ itemId: 'gold-lantern', quantity: 12 }, { itemId: 'french-doors', quantity: 1 }, { itemId: 'green-wall', quantity: 1 }], placedItems: starterPlan, messages: starterMessages,
  },
  {
    id: 'wedding-ashley-mark', venueId: DEMO_VENUE_ID, accessSlug: 'ashley-mark', accessCode: '222222', status: 'Designing', paymentStepsCompleted: 1,
    profile: {
      couple: 'Ashley & Mark', date: '2026-10-24', guests: 58, packageId: 'classic', ceremonyArea: 'hilltop-gazebo', receptionArea: 'pecan-pavilion',
      primaryEmail: 'ashley@example.com', partnerEmail: 'mark@example.com', contractSigned: true, reservationPaid: true,
      notes: 'Simple ceremony at the gazebo and a traditional reception in the pavilion.',
    },
    selections: [{ itemId: 'gold-lantern', quantity: 8 }, { itemId: 'welcome-easel', quantity: 1 }],
    placedItems: [{ id: 'ashley-table-1', type: 'round-table', x: 175, y: 145, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' }, { id: 'ashley-table-2', type: 'round-table', x: 355, y: 145, rotation: 0, scale: 1, label: 'Round table', areaId: 'pecan-pavilion' }, { id: 'ashley-dance', type: 'dance-floor', x: 520, y: 220, rotation: 0, scale: .9, label: 'Dance floor', areaId: 'pecan-pavilion' }],
    messages: [{ id: 'ashley-msg-1', senderRole: 'bride', senderName: 'Ashley & Mark', body: 'Can we keep the gazebo ceremony very simple and move most of the décor to the pavilion?', timestamp: '2026-08-19T16:10:00-05:00', attachments: [], context: { kind: 'area', id: 'hilltop-gazebo', label: 'Hilltop Gazebo' }, readByBride: true, readByVenue: false }],
  },
  {
    id: 'wedding-jennifer-matt', venueId: DEMO_VENUE_ID, accessSlug: 'jennifer-matt', accessCode: '333333', status: 'Not started', paymentStepsCompleted: 1,
    profile: {
      couple: 'Jennifer & Matt', date: '2026-11-07', guests: 210, packageId: 'luxury', ceremonyArea: 'under-the-oaks', receptionArea: 'pecan-pavilion',
      primaryEmail: 'jennifer@example.com', partnerEmail: 'matt@example.com', contractSigned: true, reservationPaid: true, notes: '',
    }, selections: [], placedItems: [], messages: [],
  },
]

type RouteState = { page: PageKey; coupleSlug: string | null }

function parseRoute(): RouteState {
  const value = window.location.hash.replace(/^#\/?/, '')
  if (value.startsWith('couple/')) return { page: 'wedding', coupleSlug: decodeURIComponent(value.slice('couple/'.length)) }
  if (value.startsWith('venue/')) return { page: 'venue', coupleSlug: null }
  const allowed: PageKey[] = ['home', 'for-venues', 'venue', 'catalog', 'wedding', 'planner', 'messages', 'calendar', 'summary', 'admin', 'platform']
  return { page: allowed.includes(value as PageKey) ? value as PageKey : 'home', coupleSlug: null }
}

function readLocal<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }
function readSession<T>(key: string, fallback: T): T { try { const value = sessionStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }
function slugify(value: string) { return value.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'wedding' }

export default function App() {
  const initialRoute = parseRoute()
  const [page, setPage] = useState<PageKey>(initialRoute.page)
  const [requestedCoupleSlug, setRequestedCoupleSlug] = useState<string | null>(initialRoute.coupleSlug)
  const [weddings, setWeddings] = useState<WeddingWorkspace[]>(() => readLocal('venueVisions.saas.weddings.v2', demoWeddings))
  const [activeWeddingId, setActiveWeddingId] = useState<string>(() => readLocal('venueVisions.saas.activeWeddingId', 'wedding-sarah-john'))
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => readLocal('venueVisions.saas.notifications', false))
  const [ownerAuthenticated, setOwnerAuthenticated] = useState<boolean>(() => readSession('venueVisions.saas.ownerSession', false))
  const [platformAuthenticated, setPlatformAuthenticated] = useState<boolean>(() => readSession('venueVisions.saas.platformSession', false))
  const [coupleAuthenticatedWeddingId, setCoupleAuthenticatedWeddingId] = useState<string | null>(() => readSession('venueVisions.saas.coupleSessionWeddingId', null))
  const [venueLeads, setVenueLeads] = useState<VenueLead[]>(() => readLocal('venueVisions.saas.leads.v1', []))

  const activeWedding = weddings.find((wedding) => wedding.id === activeWeddingId) ?? weddings[0]
  const selections = activeWedding?.selections ?? []
  const profile = activeWedding?.profile
  const placedItems = activeWedding?.placedItems ?? []
  const messages = activeWedding?.messages ?? []
  const packageInfo = profile ? packageById(profile.packageId) : packageById('classic')
  const hasWorkspaceAccess = Boolean(activeWedding && (ownerAuthenticated || coupleAuthenticatedWeddingId === activeWedding.id))

  useEffect(() => {
    const onHashChange = () => { const next = parseRoute(); setPage(next.page); setRequestedCoupleSlug(next.coupleSlug) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!requestedCoupleSlug) return
    const wedding = weddings.find((item) => item.accessSlug === requestedCoupleSlug)
    if (wedding) setActiveWeddingId(wedding.id)
  }, [requestedCoupleSlug, weddings])

  useEffect(() => localStorage.setItem('venueVisions.saas.weddings.v2', JSON.stringify(weddings)), [weddings])
  useEffect(() => localStorage.setItem('venueVisions.saas.activeWeddingId', JSON.stringify(activeWeddingId)), [activeWeddingId])
  useEffect(() => localStorage.setItem('venueVisions.saas.notifications', JSON.stringify(notificationsEnabled)), [notificationsEnabled])
  useEffect(() => localStorage.setItem('venueVisions.saas.leads.v1', JSON.stringify(venueLeads)), [venueLeads])
  useEffect(() => sessionStorage.setItem('venueVisions.saas.ownerSession', JSON.stringify(ownerAuthenticated)), [ownerAuthenticated])
  useEffect(() => sessionStorage.setItem('venueVisions.saas.platformSession', JSON.stringify(platformAuthenticated)), [platformAuthenticated])
  useEffect(() => { if (coupleAuthenticatedWeddingId) sessionStorage.setItem('venueVisions.saas.coupleSessionWeddingId', JSON.stringify(coupleAuthenticatedWeddingId)); else sessionStorage.removeItem('venueVisions.saas.coupleSessionWeddingId') }, [coupleAuthenticatedWeddingId])

  const updateActiveWedding = (updater: (current: WeddingWorkspace) => WeddingWorkspace) => setWeddings((current) => current.map((wedding) => wedding.id === activeWeddingId ? updater(wedding) : wedding))

  useEffect(() => {
    if (page !== 'messages' || !activeWedding || !hasWorkspaceAccess) return
    const role: MessageRole = ownerAuthenticated ? 'venue' : 'bride'
    const nextMessages = activeWedding.messages.map((message) => {
      if (message.senderRole === role) return message
      if (role === 'bride' && !message.readByBride) return { ...message, readByBride: true }
      if (role === 'venue' && !message.readByVenue) return { ...message, readByVenue: true }
      return message
    })
    if (nextMessages.some((message, index) => message !== activeWedding.messages[index])) updateActiveWedding((wedding) => ({ ...wedding, messages: nextMessages }))
  }, [page, ownerAuthenticated, activeWeddingId, hasWorkspaceAccess])

  const navigate = (next: PageKey) => {
    let hash = next === 'home' ? '#/' : next === 'venue' ? '#/venue/chandelier-oaks' : `#/${next}`
    if (next === 'wedding' && !ownerAuthenticated && coupleAuthenticatedWeddingId === activeWedding?.id) hash = `#/couple/${encodeURIComponent(activeWedding.accessSlug)}`
    window.location.hash = hash; setPage(next); setRequestedCoupleSlug(hash.includes('/couple/') ? activeWedding?.accessSlug ?? null : null); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCoupleDemo = () => { const wedding = weddings[0]; setActiveWeddingId(wedding.id); setCoupleAuthenticatedWeddingId(null); setOwnerAuthenticated(false); window.location.hash = `#/couple/${wedding.accessSlug}`; setPage('wedding'); setRequestedCoupleSlug(wedding.accessSlug); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const openMessageContext = (context: MessageContext) => { if (context.kind === 'inventory') { localStorage.setItem('venueVisions.catalogFocus', context.id); navigate('catalog') } else { localStorage.setItem('venueVisions.plannerArea', context.id); navigate('planner') } }

  const setQuantity = (itemId: string, requested: number) => {
    if (!hasWorkspaceAccess) { navigate('wedding'); return }
    const item = inventory.find((entry) => entry.id === itemId)
    if (!item || !itemAllowedForTier(item, packageInfo.tier)) return
    const quantity = Math.max(0, Math.min(requested, item.quantity))
    updateActiveWedding((wedding) => {
      const current = wedding.selections
      const next = quantity === 0 ? current.filter((entry) => entry.itemId !== itemId) : current.some((entry) => entry.itemId === itemId) ? current.map((entry) => entry.itemId === itemId ? { ...entry, quantity } : entry) : [...current, { itemId, quantity }]
      return { ...wedding, selections: next, status: next.length ? 'Designing' : wedding.status }
    })
  }

  const updateProfile = (next: WeddingProfile) => {
    if (!hasWorkspaceAccess) return
    if (next.date && weddings.some((wedding) => wedding.id !== activeWeddingId && wedding.profile.date === next.date)) {
      const conflict = weddings.find((wedding) => wedding.id !== activeWeddingId && wedding.profile.date === next.date)
      window.alert(`${next.date} is already booked for ${conflict?.profile.couple}. Chandelier Oaks hosts one wedding per calendar date.`); return
    }
    const nextPackage = packageById(next.packageId)
    if (nextPackage.maxGuests !== null && next.guests > nextPackage.maxGuests) { window.alert(`${nextPackage.name} is publicly shown with a guest limit of ${nextPackage.maxGuests}. Choose another package or reduce the guest count.`); return }
    updateActiveWedding((wedding) => ({ ...wedding, profile: next }))
  }

  const setPlacedItems = (next: PlacedItem[] | ((current: PlacedItem[]) => PlacedItem[])) => { if (!hasWorkspaceAccess) return; updateActiveWedding((wedding) => ({ ...wedding, placedItems: typeof next === 'function' ? next(wedding.placedItems) : next, status: 'Designing' })) }
  const setMessages = (next: WeddingMessage[] | ((current: WeddingMessage[]) => WeddingMessage[])) => { if (!hasWorkspaceAccess) return; updateActiveWedding((wedding) => ({ ...wedding, messages: typeof next === 'function' ? next(wedding.messages) : next })) }
  const selectActiveWedding = (id: string) => { if (weddings.some((wedding) => wedding.id === id)) setActiveWeddingId(id) }
  const openWedding = (id: string, destination: PageKey = 'wedding') => { setActiveWeddingId(id); window.location.hash = `#/${destination}`; setPage(destination); setRequestedCoupleSlug(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const addWedding = (input: { couple: string; date: string; guests: number; packageId: string; primaryEmail: string }): string | null => {
    const cleanCouple = input.couple.trim(); if (!cleanCouple) return 'Enter the couple names.'; if (!input.date) return 'Choose a wedding date.'
    const conflict = weddings.find((wedding) => wedding.profile.date === input.date); if (conflict) return `${input.date} is already booked for ${conflict.profile.couple}. Choose another date.`
    const pkg = packageById(input.packageId); if (pkg.maxGuests !== null && input.guests > pkg.maxGuests) return `${pkg.name} is publicly shown with a maximum of ${pkg.maxGuests} guests.`
    const id = `wedding-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; const baseSlug = slugify(cleanCouple); let accessSlug = baseSlug; let suffix = 2; while (weddings.some((wedding) => wedding.accessSlug === accessSlug)) accessSlug = `${baseSlug}-${suffix++}`
    const newWedding: WeddingWorkspace = { id, venueId: DEMO_VENUE_ID, accessSlug, accessCode: String(Math.floor(100000 + Math.random() * 900000)), status: 'Not started' as WeddingStatus, paymentStepsCompleted: 1, profile: { couple: cleanCouple, date: input.date, guests: Math.max(1, input.guests || 1), packageId: input.packageId, ceremonyArea: '', receptionArea: 'pecan-pavilion', primaryEmail: input.primaryEmail.trim(), partnerEmail: '', contractSigned: true, reservationPaid: true, notes: '' }, selections: [], placedItems: [], messages: [] }
    setWeddings((current) => [...current, newWedding]); setActiveWeddingId(id); return null
  }

  const authenticateOwner = (code: string) => { if (code.trim() !== OWNER_DEMO_CODE) return false; setOwnerAuthenticated(true); setPlatformAuthenticated(false); setCoupleAuthenticatedWeddingId(null); return true }
  const authenticatePlatform = (code: string) => { if (code.trim() !== ADMIN_POC_CODE) return false; setPlatformAuthenticated(true); setOwnerAuthenticated(false); setCoupleAuthenticatedWeddingId(null); return true }
  const authenticateCouple = (code: string) => { if (!activeWedding || code.trim() !== activeWedding.accessCode) return false; setCoupleAuthenticatedWeddingId(activeWedding.id); setOwnerAuthenticated(false); setPlatformAuthenticated(false); return true }
  const logoutOwner = () => { setOwnerAuthenticated(false); sessionStorage.removeItem('venueVisions.saas.ownerSession'); navigate('venue') }
  const logoutPlatform = () => { setPlatformAuthenticated(false); sessionStorage.removeItem('venueVisions.saas.platformSession'); navigate('home') }
  const logoutCouple = () => { setCoupleAuthenticatedWeddingId(null); navigate('venue') }

  const selectionCount = useMemo(() => selections.reduce((sum, item) => sum + item.quantity, 0), [selections])
  const unreadMessages = useMemo(() => messages.filter((message) => { const role: MessageRole = ownerAuthenticated ? 'venue' : 'bride'; if (message.senderRole === role) return false; return role === 'bride' ? !message.readByBride : !message.readByVenue }).length, [messages, ownerAuthenticated])

  const protectedPage = page === 'wedding' || page === 'planner' || page === 'messages' || page === 'summary'
  const showCoupleGate = protectedPage && !hasWorkspaceAccess
  const showCalendarGate = page === 'calendar' && !ownerAuthenticated

  const resetDemo = () => {
    if (!window.confirm('Reset the Venue Visions prototype, Chandelier Oaks venue demo, wedding workspaces and venue requests?')) return
    setWeddings(demoWeddings); setActiveWeddingId('wedding-sarah-john'); setNotificationsEnabled(false); setOwnerAuthenticated(false); setPlatformAuthenticated(false); setCoupleAuthenticatedWeddingId(null); setVenueLeads([])
    Object.keys(localStorage).filter((key) => key.startsWith('venueVisions.saas.') || key.startsWith('venueVisions.poc.')).forEach((key) => localStorage.removeItem(key))
    Object.keys(sessionStorage).filter((key) => key.startsWith('venueVisions.saas.')).forEach((key) => sessionStorage.removeItem(key))
    navigate('home')
  }

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} selectionCount={selectionCount} unreadMessages={unreadMessages} activeWeddingName={profile?.couple ?? ''} weddings={weddings} activeWeddingId={activeWeddingId} ownerAuthenticated={ownerAuthenticated} coupleAuthenticated={coupleAuthenticatedWeddingId === activeWeddingId} platformAuthenticated={platformAuthenticated} onSelectWedding={selectActiveWedding} onOwnerLogout={logoutOwner} onCoupleLogout={logoutCouple} onPlatformLogout={logoutPlatform} onResetDemo={resetDemo} />
      <div className="prototype-banner" role="note"><div className="shell prototype-banner__inner"><strong>VENUE VISIONS PROTOTYPE</strong><span>Company site · VV Admin proof of concept · Chandelier Oaks venue demo · public venue facts + clearly marked sample operational data.</span></div></div>

      {showCoupleGate && activeWedding && <CoupleAccess wedding={activeWedding} onSubmitCode={authenticateCouple} onBackHome={() => navigate('venue')} />}
      {showCalendarGate && <Admin weddings={weddings} activeWeddingId={activeWeddingId} onSelectWedding={selectActiveWedding} onOpenWedding={openWedding} onAddWedding={addWedding} authenticated={ownerAuthenticated} onAuthenticate={authenticateOwner} onExitDemo={() => navigate('venue')} onLogout={logoutOwner} onNavigate={navigate} />}

      {!showCoupleGate && !showCalendarGate && page === 'home' && <Home onNavigate={navigate} />}
      {!showCoupleGate && !showCalendarGate && page === 'for-venues' && <ForVenues leads={venueLeads} setLeads={setVenueLeads} onOpenPlatform={() => navigate('platform')} />}
      {!showCoupleGate && !showCalendarGate && page === 'venue' && <VenuePortal onNavigate={navigate} onOpenCoupleDemo={openCoupleDemo} />}
      {!showCoupleGate && !showCalendarGate && page === 'catalog' && <Catalog selections={selections} onSetQuantity={setQuantity} canEdit={hasWorkspaceAccess} onRequireAccess={openCoupleDemo} packageTier={packageInfo.tier} packageName={packageInfo.name} />}
      {!showCoupleGate && !showCalendarGate && page === 'wedding' && profile && <Wedding profile={profile} selections={selections} unreadMessages={unreadMessages} paymentStepsCompleted={activeWedding.paymentStepsCompleted} onProfileChange={updateProfile} onSetQuantity={setQuantity} onNavigate={navigate} ownerMode={ownerAuthenticated} />}
      {!showCoupleGate && !showCalendarGate && page === 'planner' && profile && <Planner selections={selections} placedItems={placedItems} setPlacedItems={setPlacedItems} onSetQuantity={setQuantity} packageTier={packageInfo.tier} preferredAreaId={profile.receptionArea || 'pecan-pavilion'} />}
      {!showCoupleGate && !showCalendarGate && page === 'messages' && profile && <Messages profile={profile} selections={selections} placedItems={placedItems} messages={messages} setMessages={setMessages} currentRole={ownerAuthenticated ? 'venue' : 'bride'} notificationsEnabled={notificationsEnabled} setNotificationsEnabled={setNotificationsEnabled} onOpenContext={openMessageContext} />}
      {!showCoupleGate && !showCalendarGate && page === 'summary' && activeWedding && <SetupSheet wedding={activeWedding} />}
      {!showCoupleGate && !showCalendarGate && page === 'calendar' && ownerAuthenticated && <Calendar weddings={weddings} activeWeddingId={activeWeddingId} onSelectWedding={selectActiveWedding} />}
      {page === 'admin' && <Admin weddings={weddings} activeWeddingId={activeWeddingId} onSelectWedding={selectActiveWedding} onOpenWedding={openWedding} onAddWedding={addWedding} authenticated={ownerAuthenticated} onAuthenticate={authenticateOwner} onExitDemo={() => navigate('venue')} onLogout={logoutOwner} onNavigate={navigate} />}
      {page === 'platform' && <PlatformAdmin authenticated={platformAuthenticated} onAuthenticate={authenticatePlatform} onLogout={logoutPlatform} onNavigate={navigate} leads={venueLeads} weddings={weddings} />}

      <footer className="site-footer saas-footer"><div className="shell"><span>Venue Visions</span><span>Company prototype · Chandelier Oaks venue demo · VV Admin proof of concept · browser-only sample data</span></div></footer>
    </div>
  )
}
