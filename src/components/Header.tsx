import Logo from './Logo'

export type PageKey = 'home' | 'catalog' | 'wedding' | 'planner' | 'admin'

type HeaderProps = {
  page: PageKey
  onNavigate: (page: PageKey) => void
  selectionCount: number
  onResetDemo: () => void
}

const navItems: Array<{ key: PageKey; label: string }> = [
  { key: 'catalog', label: 'Décor Catalog' },
  { key: 'planner', label: 'Venue Designer' },
  { key: 'wedding', label: 'My Wedding' },
]

export default function Header({ page, onNavigate, selectionCount, onResetDemo }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand-button" onClick={() => onNavigate('home')} aria-label="Venue Visions home">
        <Logo />
      </button>
      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={page === item.key ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
            {item.key === 'wedding' && selectionCount > 0 && <span className="nav-badge">{selectionCount}</span>}
          </button>
        ))}
        <button className="nav-link reset-link" onClick={onResetDemo}>Reset Demo</button>
        <button
          className={page === 'admin' ? 'nav-link admin-link active' : 'nav-link admin-link'}
          onClick={() => onNavigate('admin')}
        >
          Owner View
        </button>
      </nav>
    </header>
  )
}
