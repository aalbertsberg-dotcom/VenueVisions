# Venue Visions v1.6

Venue Visions is now presented as a broader **event venue management & planning SaaS**, not wedding-only software.

## Public Venue Visions
- Home
- Venues
- For Venues
- Sign In
- Public language uses events, clients and venue resources while each venue can use its own terminology.

## Configured venues

### Chandelier Oaks
- Wedding venue · Kiln, Mississippi
- Owner preview code: `123456`
- Sarah & John — `111111`
- Ashley & Mark — `222222`
- Jennifer & Matt — `333333`
- Public Chandelier Oaks details remain integrated; unconfirmed operational values remain illustrative.

### Juniper & Stone Estate
- Fictional wedding venue · Asheville, North Carolina
- Owner preview code: `246810`
- Olivia & James — `444444`
- Maya & Theo — `555555`
- Navy/copper branding, separate packages, spaces and Design Library.

### The Foundry at Rivergate
- Fictional multi-purpose event venue · Louisville, Kentucky
- Owner preview code: `975310`
- Northstar Health Leadership Summit — `666666`
- River City Foundation Gala — `777777`
- Charcoal/teal branding with corporate-event packages, spaces, AV/staging inventory and client terminology.

## Platform behavior
- Homepage Venue Portals panel now contains three venue choices plus **See Venue Visions for your property**.
- Venue data remains isolated by venue.
- Wedding venues can use **wedding/couple** terminology.
- Multi-purpose venues can use **event/client** terminology.
- Client access stays under the venue URL.
- 2D layout remains the planning source of truth; AI Preview follows the structured 2D plan.
- Internal Venue Visions Admin remains a proof of concept at `#/platform` with code `654321`.

## Browser-preview limitations
Authentication gates, uploads, messages and saved state are browser-local preview behavior. Production still needs secure backend authentication, tenant authorization, cloud storage, database persistence, notifications, AI calls and billing.

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
git commit -m "Broaden Venue Visions for event venues and add third venue"
git push
```
