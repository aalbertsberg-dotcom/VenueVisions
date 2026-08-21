import { useEffect, useMemo, useState } from 'react'
import Logo from './Logo'
import type { WeddingWorkspace } from '../types'

export type PageKey = 'home' | 'for-venues' | 'signin' | 'venue' | 'catalog' | 'wedding' | 'planner' | 'media' | 'ai-preview' | 'messages' | 'calendar' | 'summary' | 'admin' | 'platform'

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

type NavItem = { key: PageKey; label: string; description?: string }

function ChandelierBrand({ onClick, subtitle }: { onClick: () => void; subtitle: string }) {
  return (
    <button className="tenant-brand" type="button" onClick={onClick} aria-label="Chandelier Oaks home">
      <span className="tenant-brand__mark">CO</span>
      <span className="tenant-brand__words">
        <strong>Chandelier Oaks</strong>
        <small>{subtitle}</small>
      </span>
    </button>
  )
}

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
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [page])

  const sortedWeddings = useMemo(() => [...weddings].sort((a, b) => a.profile.date.localeCompare(b.profile.date)), [weddings])
  const mode = ownerAuthenticated ? 'owner' : coupleAuthenticated ? 'couple' : platformAuthenticated ? 'platform' : 'public'

  const publicNav: NavItem[] = [
    { key: 'home', label: 'Home' },
    { key: 'venue', label: 'Venue Demo' },
    { key: 'for-venues', label: 'For Venues' },
    { key: 'signin', label: 'Sign In' },
  ]

  const ownerNav: NavItem[] = [
    { key: 'admin', label: 'Dashboard' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'catalog', label: 'Inventory' },
    { key: 'messages', label: 'Messages' },
  ]

  const ownerMore: NavItem[] = [
    { key: 'wedding', label: 'Active wedding', description: 'Details, package and planning checklist' },
    { key: 'planner', label: '2D Designer', description: 'Build the source-of-truth floor plan first' },
    { key: 'media', label: 'Media Library', description: 'Venue photos, video, files and AI references' },
    { key: 'summary', label: 'Setup Sheet', description: 'Final pull list and venue handoff' },
  ]

  const coupleNav: NavItem[] = [
    { key: 'wedding', label: 'Home' },
    { key: 'catalog', label: 'Décor' },
    { key: 'planner', label: 'Design' },
    { key: 'messages', label: 'Messages' },
  ]

  const coupleMore: NavItem[] = [
    { key: 'media', label: 'Media & Inspiration', description: 'Photos, videos and planning files' },
    { key: 'summary', label: 'Setup Summary', description: 'Review the venue handoff' },
    { key: 'venue', label: 'Chandelier Oaks Demo', description: 'Return to the venue demo landing page' },
  ]

  const platformNav: NavItem[] = [
    { key: 'platform', label: 'Admin POC' },
    { key: 'for-venues', label: 'Demo Requests' },
    { key: 'venue', label: 'Venue Demo' },
  ]

  const go = (next: PageKey) => {
    setMenuOpen(false)
    setProfileOpen(false)
    onNavigate(next)
  }

  const desktopItems = mode === 'owner' ? ownerNav : mode === 'couple' ? coupleNav : mode === 'platform' ? platformNav : publicNav
  const drawerItems = mode === 'owner' ? [...ownerNav, ...ownerMore] : mode === 'couple' ? [...coupleNav, ...coupleMore] : mode === 'platform' ? platformNav : publicNav

  return (
    <>
      <header className={`site-header app-header app-header--${mode}`}>
        <div className="app-header__brand">
          {mode === 'public' && <button className="brand-button" onClick={() => go('home')} aria-label="Venue Visions home"><Logo /></button>}
          {mode === 'platform' && (
            <button className="platform-brand" type="button" onClick={() => go('platform')}>
              <Logo compact />
              <span><strong>Venue Visions Admin</strong><small>Proof of Concept</small></span>
            </button>
          )}
          {mode === 'owner' && <ChandelierBrand onClick={() => go('admin')} subtitle="Owner Portal · Powered by Venue Visions" />}
          {mode === 'couple' && <ChandelierBrand onClick={() => go('wedding')} subtitle="Wedding Portal · Powered by Venue Visions" />}
        </div>

        <nav className="app-header__desktop-nav" aria-label="Primary navigation">
          {desktopItems.map((item) => (
            <button key={item.key} className={page === item.key ? 'app-nav-link active' : 'app-nav-link'} onClick={() => go(item.key)}>
              {item.label}
              {item.key === 'messages' && unreadMessages > 0 && <span className="app-nav-badge">{unreadMessages}</span>}
            </button>
          ))}
        </nav>

        <div className="app-header__actions">
          {mode === 'owner' && (
            <label className="owner-wedding-switcher" title="Switch the active wedding across all owner tools">
              <span>Active wedding</span>
              <select value={activeWeddingId} onChange={(event) => onSelectWedding(event.target.value)}>
                {sortedWeddings.map((wedding) => <option value={wedding.id} key={wedding.id}>{wedding.profile.couple} · {wedding.profile.date}</option>)}
              </select>
            </label>
          )}

          {mode === 'couple' && (
            <div className="profile-menu-wrap">
              <button className="couple-profile-button" type="button" aria-expanded={profileOpen} onClick={() => setProfileOpen((current) => !current)}>
                <span>{activeWeddingName}</span><b aria-hidden="true">⌄</b>
              </button>
              {profileOpen && (
                <div className="couple-profile-popover">
                  <span className="mini-label">YOUR WEDDING</span>
                  <strong>{activeWeddingName}</strong>
                  <button onClick={() => go('wedding')}>Wedding home</button>
                  <button onClick={() => go('media')}>Media & inspiration</button>
                  <button onClick={() => go('summary')}>Setup summary</button>
                  <button onClick={() => { setProfileOpen(false); onCoupleLogout() }}>Sign out</button>
                </div>
              )}
            </div>
          )}

          {mode === 'public' && <button className="button button--primary header-demo-cta" onClick={() => go('venue')}>View Demo</button>}
          {mode === 'platform' && <button className="button button--ghost button--small" onClick={onPlatformLogout}>Sign out</button>}

          {(mode === 'owner' || mode === 'platform' || mode === 'public') && (
            <button className="compact-menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
              <span className="compact-menu-button__bars" aria-hidden="true"><i /><i /><i /></span>
              <span>Menu</span>
              {mode === 'owner' && unreadMessages > 0 && <b>{unreadMessages}</b>}
            </button>
          )}
        </div>
      </header>

      {menuOpen && <button className="nav-menu-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <aside className={menuOpen ? 'clean-drawer clean-drawer--open' : 'clean-drawer'} aria-label="Application menu">
        <div className="clean-drawer__heading">
          <div>
            <span className="mini-label">{mode === 'owner' || mode === 'couple' ? 'CHANDELIER OAKS' : 'VENUE VISIONS'}</span>
            <strong>{mode === 'owner' ? 'Owner Portal' : mode === 'couple' ? activeWeddingName : mode === 'platform' ? 'Admin · Proof of Concept' : 'Venue Visions'}</strong>
          </div>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
        </div>

        {mode === 'owner' && (
          <div className="clean-drawer__switcher">
            <label htmlFor="drawer-active-wedding">Active wedding</label>
            <select id="drawer-active-wedding" value={activeWeddingId} onChange={(event) => onSelectWedding(event.target.value)}>
              {sortedWeddings.map((wedding) => <option value={wedding.id} key={wedding.id}>{wedding.profile.couple} · {wedding.profile.date}</option>)}
            </select>
            <small>All wedding-specific tools follow this selection.</small>
          </div>
        )}

        <div className="clean-drawer__links">
          {drawerItems.map((item) => (
            <button key={`${item.key}-${item.label}`} className={page === item.key ? 'clean-drawer__link active' : 'clean-drawer__link'} onClick={() => go(item.key)}>
              <span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>
              <span className="clean-drawer__meta">
                {item.key === 'wedding' && selectionCount > 0 && <b>{selectionCount}</b>}
                {item.key === 'messages' && unreadMessages > 0 && <b>{unreadMessages}</b>}
                <i aria-hidden="true">›</i>
              </span>
            </button>
          ))}
        </div>

        <div className="clean-drawer__footer">
          {mode === 'owner' && <button onClick={() => { setMenuOpen(false); onOwnerLogout() }}>Sign out of owner demo</button>}
          {mode === 'couple' && <button onClick={() => { setMenuOpen(false); onCoupleLogout() }}>Sign out of wedding</button>}
          {mode === 'platform' && <button onClick={() => { setMenuOpen(false); onPlatformLogout() }}>Sign out of admin POC</button>}
          {(mode === 'owner' || mode === 'couple' || mode === 'platform') && <button className="clean-drawer__reset" onClick={() => { setMenuOpen(false); onResetDemo() }}>Reset demo data</button>}
        </div>
      </aside>

      {mode === 'couple' && (
        <nav className="couple-bottom-nav" aria-label="Wedding navigation">
          {coupleNav.map((item) => (
            <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => go(item.key)}>
              <span aria-hidden="true">{item.key === 'wedding' ? '⌂' : item.key === 'catalog' ? '✿' : item.key === 'planner' ? '▦' : '✉'}</span>
              <small>{item.label}</small>
              {item.key === 'messages' && unreadMessages > 0 && <b>{unreadMessages}</b>}
            </button>
          ))}
          <button className={menuOpen ? 'active' : ''} onClick={() => setMenuOpen(true)}><span aria-hidden="true">☰</span><small>More</small></button>
        </nav>
      )}
    </>
  )
}
