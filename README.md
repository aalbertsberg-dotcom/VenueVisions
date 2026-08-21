# Venue Visions v1.5.1 — Multi-Venue SaaS Preview

Venue Visions is the company/product. v1.5.1 proves that one SaaS platform can host separate venue brands, operations, inventories and private couple workspaces without mixing venue data.

## Venue profiles

### Chandelier Oaks — configured preview
- Kiln, Mississippi
- Owner preview code: `123456`
- 3 private wedding workspaces:
  - Sarah & John — `111111`
  - Ashley & Mark — `222222`
  - Jennifer & Matt — `333333`
- Uses current public Chandelier Oaks website facts for contact, packages, capacity, property features and Pinrose Prop Shop categories.
- Inventory quantities, storage locations and tier-to-item mapping remain sample planning data until confirmed by the venue.
- Official website, Packages, FAQ and Contact links are included.
- No official social-media URL was added because one could not be reliably verified from the public site/search results.

### Juniper & Stone Estate — sample venue
- Asheville, North Carolina
- Fictional venue used only to prove tenant separation and different branding.
- Owner preview code: `246810`
- 2 private wedding workspaces:
  - Olivia & James — `444444`
  - Maya & Theo — `555555`
- Deep navy + copper visual identity, separate packages, spaces and Design Library inventory.

## Multi-venue behavior
- Public Venue Visions site includes a Venue Examples directory.
- Sign In requires selecting the venue first.
- Couple routes stay under the venue: `#/venue/<venue>/couple/<couple>`.
- Owner dashboards only show weddings assigned to that venue.
- Date conflict checks run within the selected venue, not across unrelated venues.
- Inventory, packages, areas, media and wedding data use the active venue configuration.
- 2D layout remains the source-of-truth design; AI Preview is step two.

## Internal VV Admin proof of concept
Direct route: `#/platform`

Code: `654321`

The internal POC now shows both venue profiles to help review future company-side tenant management.

## Browser-preview limitations
Authentication gates, messages, uploads and some state are browser-local presentation behavior. Production still needs a backend for real authentication, tenant authorization, cloud file storage, notifications, database persistence, AI calls and billing.

## Run locally
```powershell
cd C:\Users\aalbe\Documents\Dev\VenueVisions
npm install
npm run dev
```

## Publish update
```powershell
npm run build
git add .
git commit -m "Add second venue and multi-tenant venue structure"
git push
```


## v1.5.1 public-site polish
- Public navigation now uses **Venues** instead of **Venue Examples**.
- The homepage venue selector is presented as a real product preview rather than a concept graphic.
- Removed the oversized decorative background shape that could cover the venue selector.
- Reduced prototype/sample language on public pages while retaining small truthful disclosures where needed.
