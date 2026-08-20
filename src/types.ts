export type Category =
  | 'Centerpieces'
  | 'Vases'
  | 'Candles'
  | 'Signs'
  | 'Arches'
  | 'Linens'
  | 'Florals'
  | 'Ceremony'
  | 'Miscellaneous'

export type InventoryItem = {
  id: string
  name: string
  category: Category
  color: string
  quantity: number
  dimensions: string
  storage: string
  description: string
  imageStyle: string
  featured?: boolean
}

export type Selection = {
  itemId: string
  quantity: number
}

export type PlannerObjectType =
  | 'round-table'
  | 'banquet-table'
  | 'chair'
  | 'dance-floor'
  | 'bar'
  | 'cake-table'
  | 'arch'
  | 'decor'

export type PlacedItem = {
  id: string
  type: PlannerObjectType
  x: number
  y: number
  rotation: number
  scale?: number
  label: string
  inventoryItemId?: string
  /** Chairs created by a table's chair slider remain separate objects, but move with this table. */
  parentTableId?: string
}

export type WeddingProfile = {
  couple: string
  date: string
  guests: number
  notes: string
}
