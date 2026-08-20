import { useEffect, useState } from 'react'
import Logo from './Logo'

export type PageKey = 'home' | 'catalog' | 'wedding' | 'planner' | 'messages' | 'admin'

type HeaderProps = {
  page: PageKey
  onNavigate: (page: PageKey) => void
  selectionCount: number
  unreadMessages: number
  activeWeddingName: string
  onResetDemo: () => void
}

const navItems: Array<{ key: PageKey; label: string; description: string }> = [
  { key: 'catalog', label: 'Décor Catalog', description: 'Browse venue inventory' },
  { key: 'planner', label: 'Venue Designer', description: 'Build the floor plan' },
  { key: 'wedding', label: 'My Wedding', description: 'Selections, notes and details' },
  { key: 'messages', label: 'Messages', description: 'Bride and venue conversation' },
]

export default function Header({ page, onNavigate, selectionCount, unreadMessages, activeWeddingName, onResetDemo }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [page])

  const go = (next: PageKey) => {
    setMenuOpen(false)
    onNavigate(next)
  }

  return (
    <>
      <header className="site-header">
        <button className="brand-button" onClick={() => go('home')} aria-label="Venue Visions home">
          <Logo />
        </button>

        <div className="header-controls">
          {page !== 'home' && page !== 'admin' && (
            <span className="header-wedding-chip" title="Currently selected demo wedding">
              {activeWeddingName || 'Active wedding'}
            </span>
          )}
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
            {(selectionCount > 0 || unreadMessages > 0) && (
              <span className="menu-toggle__badge" aria-label={`${unreadMessages} unread messages`}>{unreadMessages > 0 ? unreadMessages : selectionCount}</span>
            )}
          </button>
        </div>
      </header>

      {menuOpen && <button className="nav-menu-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <nav id="venue-visions-menu" className={menuOpen ? 'nav-drawer nav-drawer--open' : 'nav-drawer'} aria-label="Primary navigation">
        <div className="nav-drawer__heading">
          <div>
            <span className="mini-label">VENUE VISIONS</span>
            <strong>Navigation</strong>
          </div>
          <button className="nav-drawer__close" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        {page !== 'home' && page !== 'admin' && (
          <div className="nav-drawer__wedding">
            <span>Active wedding</span>
            <strong>{activeWeddingName || 'Active wedding'}</strong>
          </div>
        )}

        <div className="nav-drawer__links">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={page === item.key ? 'nav-drawer__link active' : 'nav-drawer__link'}
              onClick={() => go(item.key)}
            >
              <span className="nav-drawer__link-copy">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              <span className="nav-drawer__link-meta">
                {item.key === 'wedding' && selectionCount > 0 && <span className="nav-drawer__badge">{selectionCount}</span>}
                {item.key === 'messages' && unreadMessages > 0 && <span className="nav-drawer__badge nav-drawer__badge--message">{unreadMessages}</span>}
                <span aria-hidden="true">›</span>
              </span>
            </button>
          ))}
        </div>

        <div className="nav-drawer__footer">
          <button className="nav-drawer__owner" onClick={() => go('admin')}>
            <span><strong>Owner View</strong><small>Venue dashboard & wedding workspaces</small></span>
            <span aria-hidden="true">›</span>
          </button>
          <button className="nav-drawer__reset" onClick={() => { setMenuOpen(false); onResetDemo() }}>Reset demo data</button>
        </div>
      </nav>
    </>
  )
}
