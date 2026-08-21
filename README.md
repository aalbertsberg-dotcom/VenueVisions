# Venue Visions v1.2 — Public SaaS Site + Venue Demo + Internal POC

Venue Visions is presented as the company/product. Chandelier Oaks is the clearly labeled venue demo. The Venue Visions Admin area remains a separate internal **Proof of Concept** for founder review.

## Public structure

- **Venue Visions** — normal public product/marketing site
- **View Venue Demo** — Chandelier Oaks example showing what a venue receives
- **For Venues** — venue demo request/onboarding preview
- **Sign In** — routes venue owners and couples into their correct workspace

The public site no longer displays the old global prototype/development banner or exposes the internal VV Admin POC in normal public navigation.

## Internal proof of concept

Direct route: `#/platform`

- **VV Admin · Proof of Concept:** `654321` (prefilled)
- This area is for founder review of Venue Visions company operations and is intentionally separate from the venue prospect experience.

## Venue demo access

- **Chandelier Oaks Owner Demo:** `123456` (prefilled)
- **Sarah & John Couple Demo:** `111111`
- **Ashley & Mark Couple Demo:** `222222`
- **Jennifer & Matt Couple Demo:** `333333`

These are presentation-only browser gates, not production authentication.

## Important demo behavior

The public **For Venues** form is still browser-only and now says so only at the form itself, where that disclosure is relevant. It does not transmit data externally.

## Run locally

```powershell
cd C:\Users\aalbe\Documents\Dev\VenueVisions
npm install
npm run dev
```

Or:

```powershell
.\Start-VenueVisions.ps1
```

## Production direction

A production release still needs a real backend for secure authentication, tenant separation, persistent customer data, file storage, invitations/notifications, and billing if Venue Visions uses subscriptions.
