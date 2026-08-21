# Venue Visions v1.1.1 — Company Prototype + Venue Demo

Venue Visions is structured as the product/company, with Chandelier Oaks used as the first **Venue Demo** showing how a customer venue experience can be configured.

This version intentionally separates three experiences:

1. **Venue Visions company site** — public product overview and For Venues demo-request flow.
2. **Venue Visions Admin · Proof of Concept** — an internal founder review area for deciding what the VV company back office should eventually include.
3. **Chandelier Oaks Venue Demo** — the example venue experience, including owner and couple workflows.

## Demo / POC access

- **VV Admin · Proof of Concept:** `654321` (prefilled)
- **Chandelier Oaks Owner Demo:** `123456` (prefilled)
- **Sarah & John Couple Demo:** `111111`
- **Ashley & Mark Couple Demo:** `222222`
- **Jennifer & Matt Couple Demo:** `333333`

These are presentation-only browser gates. They are not production authentication.

## What changed in v1.1

### Venue Visions company site
- Public language now presents Venue Visions as the company/product rather than calling the entire site a SaaS demo.
- Main CTA is **View Venue Demo**.
- Chandelier Oaks is described as the example Venue Demo, not as an actual customer or finalized tenant.
- **For Venues** now reads as a **Request Venue Demo** flow for future venue prospects.

### VV Admin · Proof of Concept
- Renamed the old founder-demo language to **Venue Visions Admin · Proof of Concept**.
- Added a founder review board with toggleable company-admin concepts:
  - Venue accounts
  - Demo requests + sales
  - Plans + billing
  - Venue support
  - Brand + portal setup
  - Platform settings
- Added browser-saved founder notes so the company-side workflow can be reviewed before real development.
- Chandelier Oaks appears here only as a **Venue Demo Profile**.
- Public venue demo requests feed a browser-only proof-of-concept pipeline.

### Chandelier Oaks Venue Demo
The venue experience remains the working example of what a venue could receive from Venue Visions:
- Chandelier Oaks branded portal
- Owner demo dashboard
- Multiple separate wedding workspaces
- Unique couple URLs + demo access codes
- Active-wedding switching for the owner
- Pinrose Prop Shop sample inventory
- Package-aware planning
- Calendar and one-wedding-per-date protection
- Payment milestone concepts
- Venue-area visual designer
- Décor selection and setup/pull sheets
- Venue/couple messaging and attachments

## Run locally

```powershell
cd C:\Users\aalbe\Documents\Dev\VenueVisions
npm install
npm run dev
```

Or use:

```powershell
.\Start-VenueVisions.ps1
```

## Production direction

The current GitHub Pages version is intentionally browser-only. A real release still needs backend services for:

- real owner, staff, and couple authentication
- passwordless / one-time-code account recovery
- database tenant separation
- persistent venue/customer records
- real image/file storage
- email notifications and invites
- real venue onboarding
- company billing/subscriptions if desired
- production audit/security controls

The purpose of the current version is to validate **what Venue Visions should be as a company** and **what a venue receives as a customer** before committing to those backend decisions.


## v1.1.1
- Makes the homepage platform diagram interactive.
- Chandelier Oaks opens the venue demo.
- Each sample couple opens its own private wedding access page.
- “Your Venue” opens the venue demo request/onboarding page.
- Adds hover, keyboard focus, and clear interaction cues.
