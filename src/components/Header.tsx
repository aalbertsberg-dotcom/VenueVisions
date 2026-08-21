import { useEffect, useMemo, useState } from 'react'
import Logo from './Logo'
import type { WeddingWorkspace } from '../types'

export type PageKey = 'home' | 'for-venues' | 'venue' | 'catalog' | 'wedding' | 'planner' | 'messages' | 'calendar' | 'summary' | 'admin' | 'platform'

type HeaderProps = {
  page: PageKey
  onNavigate: (page: PageKey) => void
  selectionCount: number
  unreadMessages: number
  activeWeddingName: string
  weddings: WeddingWorkspace[]
  activeWeddingId: string
  ownerAuthenticated: boolean
  coupleAuthenticated: boolean
  platformAuthenticated: boolean
  onSelectWedding: (id: string) => void
  onOwnerLogout: () => void
  onCoupleLogout: () => void
  onPlatformLogout: () => void
  onResetDemo: () => void
}

type NavItem = { key: PageKey; label: string; description: string }

export default function Header({
  page,
  onNavigate,
  selectionCount,
  unreadMessages,
  activeWeddingName,
  weddings,
  activeWeddingId,
  ownerAuthenticated,
  coupleAuthenticated,
  platformAuthenticated,
  onSelectWedding,
  onOwnerLogout,
  onCoupleLogout,
  onPlatformLogout,
  onResetDemo,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => setMenuOpen(false), [page])

  const sortedWeddings = useMemo(() => [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date)), [weddings])

  const navItems: NavItem[] = ownerAuthenticated
    ? [
        { key: 'admin', label: 'Owner Dashboard', description: 'Weddings, access and venue operations' },
        { key: 'calendar', label: 'Calendar & Payments', description: 'Booked dates and payment milestones' },
        { key: 'catalog', label: 'Pinrose Prop Shop', description: 'Inventory and package access' },
        { key: 'wedding', label: 'Active Wedding', description: 'Couple details, package and checklist' },
        { key: 'planner', label: 'Venue Designer', description: 'Design each Chandelier Oaks area' },
        { key: 'messages', label: 'Messages', description: 'Venue and couple conversation' },
        { key: 'summary', label: 'Setup Sheet', description: 'Printable pull list and final handoff' },
      ]
    : coupleAuthenticated
      ? [
          { key: 'venue', label: 'Chandelier Oaks', description: 'Your venue portal' },
          { key: 'wedding', label: 'My Wedding', description: 'Package, timeline and details' },
          { key: 'catalog', label: 'Pinrose Prop Shop', description: 'Browse the décor available to you' },
          { key: 'planner', label: 'Venue Designer', description: 'Build your ceremony and reception plan' },
          { key: 'messages', label: 'Messages', description: 'Keep questions with your wedding' },
          { key: 'summary', label: 'Setup Sheet', description: 'Preview the final venue handoff' },
        ]
      : platformAuthenticated
        ? [
            { key: 'platform', label: 'Founder Dashboard', description: 'Venue Visions SaaS administration' },
            { key: 'for-venues', label: 'Venue Onboarding', description: 'See the signup and branding flow' },
            { key: 'venue', label: 'Chandelier Oaks Demo', description: 'Open the first venue experience' },
          ]
        : [
            { key: 'home', label: 'Venue Visions', description: 'SaaS platform overview' },
            { key: 'venue', label: 'Chandelier Oaks Demo', description: 'See the first venue portal' },
            { key: 'for-venues', label: 'For Venues', description: 'Apply, brand and launch a venue portal' },
          ]

  const go = (next: PageKey) => {
    setMenuOpen(false)
    onNavigate(next)
  }

  const sessionLabel = ownerAuthenticated ? `Owner · ${activeWeddingName}` : coupleAuthenticated ? activeWeddingName : platformAuthenticated ? 'Founder demo' : 'Public demo'

  return (
    <>
      <header className="site-header vv-header">
        <button className="brand-button" onClick={() => go('home')} aria-label="Venue Visions home"><Logo /></button>
        <div className="header-controls">
          <span className="header-context-chip" title="Current demo context">{sessionLabel}</span>
          <button
            className={menuOpen ? 'menu-toggle menu-toggle--open' : 'menu-toggle'}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="venue-visions-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="menu-toggle__bars" aria-hidden="true"><i /><i /><i /></span>
            <span className="menu-toggle__label">Menu</span>
            {(selectionCount > 0 || unreadMessages > 0) && <span className="menu-toggle__badge">{unreadMessages > 0 ? unreadMessages : selectionCount}</span>}
          </button>
        </div>
      </header>

      {menuOpen && <button className="nav-menu-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <nav id="venue-visions-menu" className={menuOpen ? 'nav-drawer nav-drawer--open' : 'nav-drawer'} aria-label="Primary navigation">
        <div className="nav-drawer__heading">
          <div><span className="mini-label">VENUE VISIONS</span><strong>{ownerAuthenticated ? 'Chandelier Oaks Owner' : coupleAuthenticated ? 'Wedding Portal' : platformAuthenticated ? 'Founder Console' : 'Platform Demo'}</strong></div>
          <button className="nav-drawer__close" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        {ownerAuthenticated && (
          <div className="nav-owner-switcher">
            <div className="nav-owner-switcher__heading"><span>Owner session</span><button type="button" onClick={() => { setMenuOpen(false); onOwnerLogout() }}>Sign out</button></div>
            <label htmlFor="nav-active-wedding">Active wedding</label>
            <select id="nav-active-wedding" value={activeWeddingId} onChange={(event) => onSelectWedding(event.target.value)}>
              {sortedWeddings.map((wedding) => <option value={wedding.id} key={wedding.id}>{wedding.profile.couple} · {wedding.profile.date}</option>)}
            </select>
            <small>Switch once here; every owner tool follows the selected wedding.</small>
          </div>
        )}

        {coupleAuthenticated && !ownerAuthenticated && (
          <div className="nav-drawer__wedding"><span>Signed into wedding</span><strong>{activeWeddingName}</strong><button className="nav-inline-signout" type="button" onClick={() => { setMenuOpen(false); onCoupleLogout() }}>Sign out</button></div>
        )}

        {platformAuthenticated && !ownerAuthenticated && !coupleAuthenticated && (
          <div className="nav-drawer__wedding"><span>Venue Visions</span><strong>Founder demo session</strong><button className="nav-inline-signout" type="button" onClick={() => { setMenuOpen(false); onPlatformLogout() }}>Sign out</button></div>
        )}

        {!ownerAuthenticated && !coupleAuthenticated && !platformAuthenticated && (
          <div className="nav-drawer__wedding nav-drawer__wedding--public"><span>SaaS demo</span><strong>Venue Visions owns the platform. Venues subscribe to use it.</strong></div>
        )}

        <div className="nav-drawer__links">
          {navItems.map((item) => (
            <button key={item.key} className={page === item.key ? 'nav-drawer__link active' : 'nav-drawer__link'} onClick={() => go(item.key)}>
              <span className="nav-drawer__link-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
              <span className="nav-drawer__link-meta">
                {item.key === 'wedding' && selectionCount > 0 && <span className="nav-drawer__badge">{selectionCount}</span>}
                {item.key === 'messages' && unreadMessages > 0 && <span className="nav-drawer__badge nav-drawer__badge--message">{unreadMessages}</span>}
                <span aria-hidden="true">›</span>
              </span>
            </button>
          ))}
        </div>

        <div className="nav-drawer__footer">
          {!ownerAuthenticated && <button className="nav-drawer__owner" onClick={() => go('admin')}><span><strong>Chandelier Oaks Owner Login</strong><small>Demo password 123456</small></span><span>›</span></button>}
          {!platformAuthenticated && <button className="nav-drawer__owner nav-drawer__owner--platform" onClick={() => go('platform')}><span><strong>Venue Visions Founder Login</strong><small>SaaS-level administration</small></span><span>›</span></button>}
          <button className="nav-drawer__reset" onClick={() => { setMenuOpen(false); onResetDemo() }}>Reset all demo data</button>
        </div>
      </nav>
    </>
  )
}
