import type { InventoryItem, PackageTier, VenueArea, VenueConfig, VenuePackage, VenueProfile } from './types'

export const chandelierOaks: VenueProfile = {
  id: 'venue-chandelier-oaks',
  slug: 'chandelier-oaks',
  name: 'Chandelier Oaks Wedding Venue',
  shortName: 'Chandelier Oaks',
  tagline: "The Mississippi Gulf Coast's most enchanting wedding destination.",
  website: 'https://chandelieroaks.com/',
  address: '25021 Loren Ladner Road, Kiln, Mississippi 39556',
  phone: '(228) 233-0645',
  email: 'chandelier.oaks@gmail.com',
  ownerName: 'Felia Georges',
  brandPrimary: '#34483b',
  brandAccent: '#b58a55',
  logoText: 'CO',
  brandSurface: '#eef2ed',
  brandText: '#23382d',
  locationLabel: 'Kiln, Mississippi',
  inventoryLabel: 'Pinrose Prop Shop',
  previewLabel: 'Chandelier Oaks Preview',
  links: [
    { label: 'Official website', url: 'https://chandelieroaks.com/', kind: 'website' },
    { label: 'Wedding packages', url: 'https://chandelieroaks.com/wedding-packages', kind: 'resource' },
    { label: 'FAQ', url: 'https://chandelieroaks.com/faq', kind: 'resource' },
    { label: 'Contact', url: 'https://chandelieroaks.com/contact', kind: 'resource' },
  ],
}

export const chandelierPackages: VenuePackage[] = [
  {
    id: 'micro',
    name: 'Intimate Elopements & Micro-Weddings',
    price: 2500,
    duration: '4 hours',
    maxGuests: null,
    tier: 1,
    description: 'A smaller outdoor-style celebration with time for vows, a simple cake moment, photos and an unhurried experience. Public pricing does not state a guest cap for this package.',
    highlights: ['Outdoor ceremony options', 'Patio cake moment', 'Property photo access', 'Décor access — tier dependent'],
  },
  {
    id: 'classic',
    name: 'The Classic Celebration',
    price: 4800,
    duration: '8 hours',
    maxGuests: 60,
    tier: 1,
    description: 'A traditional ceremony and reception experience without a full-weekend commitment.',
    highlights: ['Ceremony + reception access', 'Tables and chairs', 'Optional add-ons', 'Décor access — tier dependent'],
  },
  {
    id: 'overnight',
    name: 'An Overnight Event',
    price: 7200,
    duration: '11 AM – 8 AM',
    maxGuests: 100,
    tier: 2,
    description: 'Celebrate all day, stay overnight and add rehearsal, game-room and bridal-photo time.',
    highlights: ['Up to 8 overnight guests + couple', 'Loft game room', 'Pecan Pavilion', 'Weekday bridal photo session'],
  },
  {
    id: 'weekend',
    name: 'Wedding Weekend Experience',
    price: 10000,
    duration: 'Friday – Sunday',
    maxGuests: 175,
    tier: 2,
    description: 'A full weekend built around time to rehearse, celebrate, stay onsite and enjoy the property without rushing.',
    highlights: ['12 overnight guests + couple Friday', 'Rehearsal dinner for up to 35', 'Pecan Pavilion + Loft', 'Premium rental tiers'],
  },
  {
    id: 'luxury',
    name: 'Luxury Weekend Retreat',
    price: 12000,
    duration: 'Friday – Sunday',
    maxGuests: 250,
    tier: 3,
    description: 'The most inclusive Chandelier Oaks experience with full-property access and elevated service.',
    highlights: ['Up to 18 overnight guests + couple', 'Top-tier rentals + floral access', 'Linens, bartending and security', 'Concierge + day-of coordination'],
  },
]

export const chandelierAreas: VenueArea[] = [
  {
    id: 'pecan-pavilion',
    name: 'Pecan Pavilion',
    kind: 'Reception',
    description: 'Open-air pavilion for receptions, ceremonies, sweetheart tables and dancing.',
    plannerEnabled: true,
    visual: 'pavilion',
  },
  {
    id: 'under-the-oaks',
    name: 'Under the Live Oaks',
    kind: 'Ceremony',
    description: 'Ceremony setting beneath the oak canopy and chandeliers.',
    plannerEnabled: true,
    visual: 'oaks',
  },
  {
    id: 'hilltop-gazebo',
    name: 'Hilltop Gazebo',
    kind: 'Ceremony',
    description: 'Elevated ceremony option with a romantic garden feel.',
    plannerEnabled: true,
    visual: 'gazebo',
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    kind: 'Ceremony',
    description: 'Chapel-like greenhouse setting for intimate ceremonies, portraits and styled moments.',
    plannerEnabled: true,
    visual: 'greenhouse',
  },
  {
    id: 'lakeside',
    name: 'Lakeside',
    kind: 'Photos',
    description: 'Waterfront setting for portraits, quiet ceremony moments and golden-hour photos.',
    plannerEnabled: true,
    visual: 'lake',
  },
  {
    id: 'pool-patio',
    name: 'Pool & Patio',
    kind: 'Hospitality',
    description: 'Poolside and patio space for weekend gatherings, cocktail moments and relaxed events.',
    plannerEnabled: true,
    visual: 'pool',
  },
]

/**
 * DEMO INVENTORY ONLY.
 * Names are based on categories Chandelier Oaks publicly describes for the Pinrose Prop Shop.
 * Quantities, dimensions, storage locations and package-tier mapping are placeholders until the venue catalogs its real inventory.
 */
export const chandelierInventory: InventoryItem[] = [
  {
    id: 'champagne-wall',
    name: 'Champagne Wall',
    category: 'Backdrops',
    color: 'Warm white / gold',
    quantity: 1,
    dimensions: 'Demo dimensions · 7 ft × 4 ft',
    storage: 'Pinrose Prop Shop · Backdrop bay',
    description: 'Statement champagne display wall for cocktail hour or reception welcome moments.',
    imageStyle: 'champagne-wall',
    featured: true,
    accessTier: 2,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'french-doors',
    name: 'Vintage French Doors',
    category: 'Backdrops',
    color: 'Antique ivory',
    quantity: 2,
    dimensions: 'Demo dimensions · pair',
    storage: 'Pinrose Prop Shop · Wall rack A',
    description: 'Vintage-style French doors for ceremony entrances, portraits or styled backdrops.',
    imageStyle: 'french-doors',
    featured: true,
    accessTier: 1,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'antique-sofa',
    name: 'Antique Velvet Sofa',
    category: 'Furniture',
    color: 'Olive / walnut',
    quantity: 2,
    dimensions: 'Demo dimensions · 72 in wide',
    storage: 'Pinrose Prop Shop · Furniture row',
    description: 'Vintage seating piece for lounge areas, portraits and sweetheart-table styling.',
    imageStyle: 'antique-sofa',
    featured: true,
    accessTier: 2,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'circle-arch',
    name: 'Metal Circle Arch',
    category: 'Arches',
    color: 'Matte black',
    quantity: 1,
    dimensions: 'Demo dimensions · 7 ft round',
    storage: 'Pinrose Prop Shop · Arch rack',
    description: 'Round ceremony arch ready for greenery, fabric or floral installation.',
    imageStyle: 'circle-arch',
    accessTier: 1,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'wood-arbor',
    name: 'Natural Wood Arbor',
    category: 'Arches',
    color: 'Natural wood',
    quantity: 1,
    dimensions: 'Demo dimensions · 8 ft × 7 ft',
    storage: 'Pinrose Prop Shop · Arch rack',
    description: 'Warm wood ceremony arbor for outdoor ceremony settings.',
    imageStyle: 'wood-arbor',
    accessTier: 1,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'swing-bed',
    name: 'Styled Swing Bed',
    category: 'Furniture',
    color: 'Natural / ivory',
    quantity: 1,
    dimensions: 'Installed prop',
    storage: 'Property · Styled photo area',
    description: 'Photo-ready swing-bed setup for portraits and relaxed wedding-weekend moments.',
    imageStyle: 'swing-bed',
    accessTier: 2,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'crystal-chandelier',
    name: 'Hanging Crystal Chandelier',
    category: 'Lighting',
    color: 'Crystal / brass',
    quantity: 6,
    dimensions: 'Assorted',
    storage: 'Pinrose Prop Shop · Lighting rack',
    description: 'Decorative chandelier option for styled spaces and elevated reception moments.',
    imageStyle: 'chandelier',
    accessTier: 2,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'green-wall',
    name: 'Greenery Photo Wall',
    category: 'Backdrops',
    color: 'Green',
    quantity: 1,
    dimensions: 'Demo dimensions · 8 ft × 8 ft',
    storage: 'Pinrose Prop Shop · Backdrop bay',
    description: 'Styled greenery wall for portraits, photo moments or seating-chart placement.',
    imageStyle: 'green-wall',
    accessTier: 1,
    packageNote: 'Demo tier mapping — venue to confirm.',
  },
  {
    id: 'gold-lantern',
    name: 'Gold Lantern Set',
    category: 'Centerpieces',
    color: 'Antique gold',
    quantity: 24,
    dimensions: 'Assorted demo sizes',
    storage: 'Pinrose Prop Shop · Shelf B3',
    description: 'Warm metallic lanterns for tables, aisle styling and reception groupings. Use flameless candles only.',
    imageStyle: 'gold-lantern',
    accessTier: 1,
    packageNote: 'Demo inventory — venue to confirm quantity.',
  },
  {
    id: 'white-florals',
    name: 'White & Green Floral Collection',
    category: 'Florals',
    color: 'White / green',
    quantity: 12,
    dimensions: 'Assorted arrangements',
    storage: 'Floral storage · Demo',
    description: 'Sample premium floral inventory for centerpieces and styled focal areas.',
    imageStyle: 'white-florals',
    accessTier: 3,
    packageNote: 'Luxury-tier demo example — venue to confirm exact floral access.',
  },
  {
    id: 'ivory-linens',
    name: 'Ivory Table Linen Collection',
    category: 'Linens',
    color: 'Ivory',
    quantity: 30,
    dimensions: 'Assorted table sizes',
    storage: 'Linen storage · Demo',
    description: 'Sample linen collection shown as included for the top demo tier.',
    imageStyle: 'ivory-linens',
    accessTier: 3,
    packageNote: 'Luxury-tier demo example — venue to confirm exact linen inventory.',
  },
  {
    id: 'welcome-easel',
    name: 'Vintage Welcome Easel',
    category: 'Signs',
    color: 'Antique gold',
    quantity: 3,
    dimensions: 'Floor standing',
    storage: 'Pinrose Prop Shop · Sign row',
    description: 'Decorative easel for welcome signage, seating charts or portraits.',
    imageStyle: 'welcome-easel',
    accessTier: 1,
    packageNote: 'Demo inventory — venue to confirm quantity.',
  },
]

export const juniperStone: VenueProfile = {
  id: 'venue-juniper-stone',
  slug: 'juniper-stone-estate',
  name: 'Juniper & Stone Estate',
  shortName: 'Juniper & Stone',
  tagline: 'Modern garden celebrations with a quiet architectural edge.',
  website: '',
  address: 'Sample venue · Asheville, North Carolina',
  phone: '(555) 014-0274',
  email: 'hello@juniperstone.example',
  ownerName: 'Morgan Reed',
  brandPrimary: '#18384a',
  brandAccent: '#c8795b',
  brandSurface: '#edf3f6',
  brandText: '#142f3d',
  logoText: 'JS',
  locationLabel: 'Asheville, North Carolina',
  inventoryLabel: 'Design Library',
  previewLabel: 'Sample Venue',
  isSample: true,
  links: [],
}

export const juniperPackages: VenuePackage[] = [
  { id: 'js-essential', name: 'Essential Celebration', price: 3900, duration: '8 hours', maxGuests: 80, tier: 1, description: 'A streamlined ceremony and reception package for intimate-to-mid-size celebrations.', highlights: ['Glass Hall reception', 'Courtyard ceremony option', 'Tables + chairs', 'Core design collection'] },
  { id: 'js-signature', name: 'Signature Estate', price: 6500, duration: '12 hours', maxGuests: 150, tier: 2, description: 'A full-day estate experience with expanded design inventory and multiple property spaces.', highlights: ['Choice of ceremony areas', 'Glass Hall + Terrace', 'Premium design collection', 'Getting-ready suites'] },
  { id: 'js-weekend', name: 'Estate Weekend', price: 8900, duration: 'Friday – Sunday', maxGuests: 200, tier: 3, description: 'A weekend-style celebration with extended access, rehearsal time and the complete design library.', highlights: ['Weekend property access', 'Rehearsal gathering', 'Full design library', 'Extended photo access'] },
]

export const juniperAreas: VenueArea[] = [
  { id: 'glass-hall', name: 'Glass Hall', kind: 'Reception', description: 'Light-filled modern hall for dinner, dancing and reception layouts.', plannerEnabled: true, visual: 'greenhouse' },
  { id: 'stone-courtyard', name: 'Stone Courtyard', kind: 'Ceremony', description: 'Architectural courtyard with warm stone, greenery and clean sight lines.', plannerEnabled: true, visual: 'gazebo' },
  { id: 'orchard-lawn', name: 'Orchard Lawn', kind: 'Ceremony', description: 'Open lawn framed by trees for outdoor ceremonies and cocktail hour.', plannerEnabled: true, visual: 'oaks' },
  { id: 'copper-terrace', name: 'Copper Terrace', kind: 'Hospitality', description: 'Covered terrace for cocktails, lounge seating and sunset moments.', plannerEnabled: true, visual: 'pavilion' },
  { id: 'reflection-garden', name: 'Reflection Garden', kind: 'Photos', description: 'Landscape-focused portrait area with water, stone and seasonal plantings.', plannerEnabled: true, visual: 'lake' },
]

export const juniperInventory: InventoryItem[] = [
  { id: 'js-oak-arch', name: 'White Oak Ceremony Frame', category: 'Arches', color: 'White oak', quantity: 1, dimensions: '8 ft × 7 ft', storage: 'Design Library · Bay A', description: 'Minimal wood ceremony frame for florals, fabric or standalone use.', imageStyle: 'wood-arbor', featured: true, accessTier: 1 },
  { id: 'js-smoked-vases', name: 'Smoked Glass Bud Vase Set', category: 'Centerpieces', color: 'Smoke / clear', quantity: 40, dimensions: 'Assorted', storage: 'Design Library · Shelf C2', description: 'Mixed-height bud vases for modern table styling.', imageStyle: 'gold-lantern', featured: true, accessTier: 1 },
  { id: 'js-copper-stands', name: 'Copper Floral Stands', category: 'Centerpieces', color: 'Copper', quantity: 16, dimensions: '28 in tall', storage: 'Design Library · Rack B', description: 'Elevated floral stands for guest tables or aisle accents.', imageStyle: 'welcome-easel', accessTier: 2 },
  { id: 'js-lounge', name: 'Slate Lounge Collection', category: 'Furniture', color: 'Slate / oak', quantity: 3, dimensions: 'Modular sets', storage: 'Design Library · Furniture Bay', description: 'Modern lounge seating for cocktail hour and reception zones.', imageStyle: 'antique-sofa', featured: true, accessTier: 2 },
  { id: 'js-ribbed-wall', name: 'Ribbed Ivory Backdrop', category: 'Backdrops', color: 'Ivory', quantity: 1, dimensions: '8 ft × 10 ft', storage: 'Design Library · Backdrop Bay', description: 'Architectural backdrop for sweetheart table, escort display or photo area.', imageStyle: 'green-wall', accessTier: 2 },
  { id: 'js-hurricanes', name: 'Glass Hurricane Collection', category: 'Lighting', color: 'Clear / ivory', quantity: 36, dimensions: 'Assorted', storage: 'Design Library · Shelf D1', description: 'Battery-candle hurricane vessels for tables and aisle styling.', imageStyle: 'chandelier', accessTier: 1 },
  { id: 'js-linen', name: 'Stone Linen Collection', category: 'Linens', color: 'Stone / sand', quantity: 30, dimensions: 'Assorted tables', storage: 'Textile Room · Rack 2', description: 'Soft neutral linen collection included with the full design tier.', imageStyle: 'ivory-linens', accessTier: 3 },
  { id: 'js-floral', name: 'Seasonal Neutral Floral Set', category: 'Florals', color: 'Ivory / sage', quantity: 14, dimensions: 'Assorted', storage: 'Design Library · Floral Room', description: 'Sample floral collection for previewing premium styling.', imageStyle: 'white-florals', accessTier: 3 },
]

export const chandelierConfig: VenueConfig = {
  profile: chandelierOaks,
  packages: chandelierPackages,
  areas: chandelierAreas,
  inventory: chandelierInventory,
  ownerAccessCode: '123456',
  oneEventPerDate: true,
  ownerDashboardNote: 'Chandelier Oaks publicly states that it hosts one wedding each day.',
}

export const juniperConfig: VenueConfig = {
  profile: juniperStone,
  packages: juniperPackages,
  areas: juniperAreas,
  inventory: juniperInventory,
  ownerAccessCode: '246810',
  oneEventPerDate: true,
  ownerDashboardNote: 'Sample venue rule: one wedding per calendar date.',
}

export const venueConfigs: VenueConfig[] = [chandelierConfig, juniperConfig]
export const venueProfiles = venueConfigs.map((item) => item.profile)

export const tierLabel: Record<PackageTier, string> = {
  1: 'Core collection',
  2: 'Premium collection',
  3: 'Top-tier collection',
}

export function venueConfigById(id: string) {
  return venueConfigs.find((item) => item.profile.id === id) ?? venueConfigs[0]
}

export function venueConfigBySlug(slug: string) {
  return venueConfigs.find((item) => item.profile.slug === slug) ?? venueConfigs[0]
}

export function packageById(id: string, venueId = chandelierOaks.id) {
  const config = venueConfigById(venueId)
  return config.packages.find((item) => item.id === id) ?? config.packages[0]
}

export function areaById(id: string, venueId = chandelierOaks.id) {
  const config = venueConfigById(venueId)
  return config.areas.find((item) => item.id === id) ?? config.areas[0]
}

export function itemAllowedForTier(item: InventoryItem, tier: PackageTier) {
  return item.accessTier <= tier
}

// Legacy aliases kept for Chandelier Oaks-specific components while v1.5 moves the app to multi-venue data.
export const packages = chandelierPackages
export const venueAreas = chandelierAreas
export const inventory = chandelierInventory
