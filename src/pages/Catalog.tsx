import { useEffect, useMemo, useState } from 'react'
import DecorVisual from '../components/DecorVisual'
import { inventory, itemAllowedForTier, tierLabel } from '../data'
import type { Category, PackageTier, Selection } from '../types'

const categories: Array<'All' | Category> = ['All', 'Furniture', 'Arches', 'Backdrops', 'Lighting', 'Florals', 'Linens', 'Centerpieces', 'Signs', 'Specialty', 'Ceremony', 'Miscellaneous']

type CatalogProps = {
  selections: Selection[]
  onSetQuantity: (itemId: string, quantity: number) => void
  canEdit: boolean
  onRequireAccess: () => void
  packageTier: PackageTier
  packageName: string
}

export default function Catalog({ selections, onSetQuantity, canEdit, onRequireAccess, packageTier, packageName }: CatalogProps) {
  const [category, setCategory] = useState<'All' | Category>('All')
  const [query, setQuery] = useState('')
  const [detailId, setDetailId] = useState<string | null>(null)
  const [showOnlyIncluded, setShowOnlyIncluded] = useState(false)

  useEffect(() => {
    const focused = localStorage.getItem('venueVisions.catalogFocus')
    if (!focused || !inventory.some((item) => item.id === focused)) return
    setCategory('All'); setQuery(''); setDetailId(focused); localStorage.removeItem('venueVisions.catalogFocus')
  }, [])

  const filtered = useMemo(() => inventory.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category
    const includedMatch = !showOnlyIncluded || itemAllowedForTier(item, packageTier)
    const q = query.trim().toLowerCase()
    const searchMatch = !q || [item.name, item.category, item.color, item.description].some((value) => value.toLowerCase().includes(q))
    return categoryMatch && includedMatch && searchMatch
  }), [category, query, showOnlyIncluded, packageTier])

  const selectedQuantity = (itemId: string) => selections.find((item) => item.itemId === itemId)?.quantity ?? 0
  const detail = inventory.find((item) => item.id === detailId)

  return (
    <main className="page-main shell catalog-page pinrose-page">
      <section className="page-intro page-intro--split">
        <div>
          <p className="eyebrow">CHANDELIER OAKS · PINROSE PROP SHOP</p>
          <h1>Browse the venue's décor before stepping into storage.</h1>
          <p>The public Chandelier Oaks site describes the Pinrose Prop Shop as a collection of antique furniture, arches, arbors, French doors, champagne walls, swing beds, chandeliers and more. This page demonstrates how that collection could work digitally.</p>
          <div className="sample-data-note"><strong>Demo inventory</strong><span>Item types reflect the public venue description; quantities, storage locations, dimensions and exact package-tier rules are sample data until the real collection is cataloged.</span></div>
          {!canEdit && <div className="catalog-access-note"><strong>Public browsing demo.</strong><span>Enter a wedding workspace to make selections.</span><button className="text-link" onClick={onRequireAccess}>Wedding access →</button></div>}
        </div>
        <div className="selection-summary pinrose-tier-summary"><span className="mini-label">ACTIVE PACKAGE</span><strong>{tierLabel[packageTier]}</strong><span>{packageName}</span><small>{selections.reduce((sum, item) => sum + item.quantity, 0)} pieces selected</small></div>
      </section>

      <section className="catalog-toolbar">
        <div className="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search arches, champagne wall, chandeliers…" /></div>
        <label className="included-toggle"><input type="checkbox" checked={showOnlyIncluded} onChange={(e) => setShowOnlyIncluded(e.target.checked)} /><span>Show only included in active demo package</span></label>
        <div className="filter-row" aria-label="Decoration categories">{categories.map((item) => <button key={item} className={category === item ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </section>

      <div className="catalog-grid">
        {filtered.map((item) => {
          const qty = selectedQuantity(item.id)
          const allowed = itemAllowedForTier(item, packageTier)
          return (
            <article className={allowed ? 'catalog-card' : 'catalog-card catalog-card--locked'} key={item.id}>
              <button className="catalog-card__image-button" onClick={() => setDetailId(item.id)}><DecorVisual styleName={item.imageStyle} name={item.name} /></button>
              <div className="catalog-card__body">
                <div className="catalog-card__meta"><span>{item.category}</span><span>{item.quantity} demo qty</span></div>
                <h3><button onClick={() => setDetailId(item.id)}>{item.name}</button></h3>
                <p className="catalog-card__color">{item.color} · {item.dimensions}</p>
                <div className={allowed ? 'tier-chip tier-chip--included' : 'tier-chip'}>{allowed ? '✓ Included in demo tier' : `Tier ${item.accessTier} demo access`}</div>
                {!canEdit ? <button className="button button--small button--ghost full-width" onClick={onRequireAccess}>Sign in to select</button> : !allowed ? <button className="button button--small button--ghost full-width" disabled>Not included in demo package</button> : qty === 0 ? <button className="button button--small button--primary full-width" onClick={() => onSetQuantity(item.id, 1)}>Add to my wedding</button> : <div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => onSetQuantity(item.id, qty - 1)}>−</button><span><strong>{qty}</strong><small>selected</small></span><button aria-label={`Add one ${item.name}`} disabled={qty >= item.quantity} onClick={() => onSetQuantity(item.id, qty + 1)}>+</button></div>}
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && <div className="empty-state"><h3>No props matched that filter.</h3><p>Try another category or turn off the package-only filter.</p></div>}

      {detail && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setDetailId(null)}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-label={detail.name} onMouseDown={(event) => event.stopPropagation()}>
            <button className="detail-modal__close" onClick={() => setDetailId(null)}>×</button>
            <DecorVisual styleName={detail.imageStyle} name={detail.name} large />
            <div className="detail-modal__body"><span className="mini-label">{detail.category}</span><h2>{detail.name}</h2><p>{detail.description}</p><dl><div><dt>Color</dt><dd>{detail.color}</dd></div><div><dt>Demo quantity</dt><dd>{detail.quantity}</dd></div><div><dt>Demo storage</dt><dd>{detail.storage}</dd></div><div><dt>Package access</dt><dd>{tierLabel[detail.accessTier]}</dd></div></dl><div className="sample-data-note"><strong>Needs venue confirmation</strong><span>{detail.packageNote}</span></div></div>
          </section>
        </div>
      )}
    </main>
  )
}
