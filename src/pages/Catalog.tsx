import { useEffect, useMemo, useState } from 'react'
import DecorVisual from '../components/DecorVisual'
import { inventory } from '../data'
import type { Category, Selection } from '../types'

const categories: Array<'All' | Category> = [
  'All',
  'Centerpieces',
  'Vases',
  'Candles',
  'Signs',
  'Arches',
  'Linens',
  'Florals',
  'Ceremony',
  'Miscellaneous',
]

type CatalogProps = {
  selections: Selection[]
  onSetQuantity: (itemId: string, quantity: number) => void
}

export default function Catalog({ selections, onSetQuantity }: CatalogProps) {
  const [category, setCategory] = useState<'All' | Category>('All')
  const [query, setQuery] = useState('')
  const [detailId, setDetailId] = useState<string | null>(null)

  useEffect(() => {
    const focused = localStorage.getItem('venueVisions.catalogFocus')
    if (!focused || !inventory.some((item) => item.id === focused)) return
    setCategory('All')
    setQuery('')
    setDetailId(focused)
    localStorage.removeItem('venueVisions.catalogFocus')
  }, [])

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category
      const q = query.trim().toLowerCase()
      const searchMatch = !q || [item.name, item.category, item.color, item.description].some((value) => value.toLowerCase().includes(q))
      return categoryMatch && searchMatch
    })
  }, [category, query])

  const selectedQuantity = (itemId: string) => selections.find((item) => item.itemId === itemId)?.quantity ?? 0
  const detail = inventory.find((item) => item.id === detailId)

  return (
    <main className="page-main shell">
      <section className="page-intro page-intro--split">
        <div>
          <p className="eyebrow">SAMPLE DÉCOR COLLECTION</p>
          <h1>Explore what the real catalog could look like.</h1>
          <p>These are example decorations, quantities and details only. A live version would replace them with the venue's photographed inventory.</p>
          <div className="sample-data-note"><strong>Sample data</strong><span>Nothing on this page represents the venue's actual inventory yet.</span></div>
        </div>
        <div className="selection-summary">
          <span className="mini-label">YOUR SELECTION</span>
          <strong>{selections.reduce((sum, item) => sum + item.quantity, 0)}</strong>
          <span>pieces selected</span>
        </div>
      </section>

      <section className="catalog-toolbar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search lanterns, sage, signs…" />
        </div>
        <div className="filter-row" aria-label="Decoration categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </section>

      <div className="catalog-grid">
        {filtered.map((item) => {
          const qty = selectedQuantity(item.id)
          return (
            <article className="catalog-card" key={item.id}>
              <button className="catalog-card__image-button" onClick={() => setDetailId(item.id)}>
                <DecorVisual styleName={item.imageStyle} name={item.name} />
              </button>
              <div className="catalog-card__body">
                <div className="catalog-card__meta"><span>{item.category}</span><span>{item.quantity} available</span></div>
                <h3><button onClick={() => setDetailId(item.id)}>{item.name}</button></h3>
                <p className="catalog-card__color">{item.color} · {item.dimensions}</p>
                {qty === 0 ? (
                  <button className="button button--small button--primary full-width" onClick={() => onSetQuantity(item.id, 1)}>Add to my wedding</button>
                ) : (
                  <div className="quantity-control">
                    <button aria-label={`Remove one ${item.name}`} onClick={() => onSetQuantity(item.id, qty - 1)}>−</button>
                    <span><strong>{qty}</strong><small>selected</small></span>
                    <button aria-label={`Add one ${item.name}`} disabled={qty >= item.quantity} onClick={() => onSetQuantity(item.id, qty + 1)}>+</button>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && <div className="empty-state"><h3>No décor matched that search.</h3><p>Try another category or search term.</p></div>}

      {detail && (
        <div className="modal-backdrop" onMouseDown={() => setDetailId(null)}>
          <section className="detail-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={detail.name}>
            <button className="modal-close" onClick={() => setDetailId(null)} aria-label="Close">×</button>
            <DecorVisual styleName={detail.imageStyle} name={detail.name} large />
            <div className="detail-modal__body">
              <p className="eyebrow">{detail.category}</p>
              <h2>{detail.name}</h2>
              <p>{detail.description}</p>
              <dl className="detail-list">
                <div><dt>Color</dt><dd>{detail.color}</dd></div>
                <div><dt>Dimensions</dt><dd>{detail.dimensions}</dd></div>
                <div><dt>Available</dt><dd>{detail.quantity}</dd></div>
              </dl>
              <p className="owner-only-note">Storage location is intentionally hidden from customer view.</p>
              <button className="button button--primary full-width" onClick={() => { onSetQuantity(detail.id, Math.max(1, selectedQuantity(detail.id))); setDetailId(null) }}>
                {selectedQuantity(detail.id) ? 'Keep in my wedding' : 'Add to my wedding'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
