# Venue Visions v1.0 — SaaS Demo

Venue Visions is now structured as a multi-tenant wedding-venue planning platform rather than a one-off venue website. **Chandelier Oaks** is configured as the first demo customer tenant.

## Demo structure

```text
Venue Visions (founder/platform level)
└── Chandelier Oaks (venue tenant)
    ├── Owner dashboard
    ├── Calendar & payment milestones
    ├── Pinrose Prop Shop catalog
    ├── Packages & venue areas
    └── Separate couple workspaces
        ├── My Wedding
        ├── Venue Designer
        ├── Messages
        └── Setup / pull sheet
```

The platform-level founder console is intentionally separate from the Chandelier Oaks owner console. Additional venues would become sibling tenants under Venue Visions, each with separate branding, inventory, packages, weddings and users.

## Demo access

### Venue Visions founder console
- Route: `#/platform`
- Demo code: `654321`
- Code is prefilled because this is a public prototype.

### Chandelier Oaks owner
- Route: `#/admin`
- Demo code: `123456`
- Owner can switch the active wedding without signing in again during the browser session.

### Couple workspaces
- Sarah & John: `#/couple/sarah-john` — `111111`
- Ashley & Mark: `#/couple/ashley-mark` — `222222`
- Jennifer & Matt: `#/couple/jennifer-matt` — `333333`

These access codes are **presentation gates only**, not real security. Production requires a backend identity provider, server-side tenant authorization, secure passwordless/email access or one-time codes, and private persistent storage.

## What v1.0 demonstrates

- Venue Visions public SaaS landing page.
- **For Venues** onboarding/signup form with venue details, logo upload, colors and a live branded portal preview.
- Founder-only onboarding pipeline and tenant dashboard.
- Chandelier Oaks branded customer portal, powered by Venue Visions.
- Five publicly advertised Chandelier Oaks package options.
- Package-aware demo décor access tiers.
- Pinrose Prop Shop inventory catalog with sample quantities/storage locations.
- Multiple separate couples and unique access links/codes.
- Owner active-wedding switcher.
- One-wedding-per-day conflict protection.
- Owner calendar and contract/payment milestone dates.
- Multiple design areas for the property.
- Visual floor planner with tables, separate chairs, chair-count slider, resize, rotation, duplicate/remove and direct inventory placement.
- Bride/couple ↔ venue messaging with unread counts, attachments and links to inventory/venue areas.
- Printable setup/pull sheet grouped by storage location and venue area.
- Browser-local demo persistence and Reset Demo.
- Responsive hamburger navigation.

## Chandelier Oaks source vs sample data

Public venue facts used in the demo come from Chandelier Oaks' own website, including package names/pricing, published guest limits where stated, ceremony options, Pinrose Prop Shop categories, the one-wedding-per-day policy, and installment timing.

**Sample/demo only until the venue confirms it:**
- Exact prop quantities
- Storage locations
- Dimensions
- Package-to-prop tier mapping
- Couple names/contact information
- Payment completion statuses
- Exact room/floor-plan measurements
- The micro-wedding guest cap (the public package page does not state one, so the demo labels it as "to confirm")

No real customer or payment data should be entered into this GitHub Pages prototype.

## Run locally

```powershell
cd C:\Users\aalbe\Documents\Dev\VenueVisions
npm install
npm run dev
```

## Build and publish

```powershell
npm run build
git add .
git commit -m "Restructure Venue Visions as SaaS with Chandelier Oaks"
git push
```

The included GitHub Actions workflow deploys the Vite `dist` output to GitHub Pages after a push to `main`.
