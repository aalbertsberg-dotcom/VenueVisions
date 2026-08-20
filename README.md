# Venue Visions v0.7

Demo prototype for a wedding venue décor catalog, couple workspace, visual venue planner, messaging, and owner dashboard.

## Demo access

### Owner
- Password: `123456`
- Owner sign-in lasts for the current browser tab/session.
- Once signed in, use the **Active Wedding** selector in Owner View or the hamburger menu to switch couples without signing in again.

### Couple demo links
Each sample couple has a unique demo URL and access code:
- Sarah & John: `#/couple/sarah-john` — code `111111`
- Ashley & Mark: `#/couple/ashley-mark` — code `222222`
- Jennifer & Matt: `#/couple/jennifer-matt` — code `333333`

The owner dashboard includes **Access details** for each couple with Copy Link, Copy Code, and Resend Access demo controls.

> These codes are intentionally visible/prefilled because this is a static GitHub Pages prototype. They are not real security. Production should use a backend authentication provider, email magic links or one-time codes, role-based authorization, and server-side data isolation.

## v0.7 additions
- Persistent owner session within the browser tab.
- Owner can switch the active wedding from Owner View or the hamburger menu.
- Separate couple access gate for every wedding.
- Unique couple URLs.
- Different demo access code per couple.
- Owner access/recovery controls for each couple.
- Couple/venue message role now follows the authenticated demo role instead of a manual role toggle.
- Public décor browsing remains available, but changing a wedding requires wedding or owner access.
- Duplicate wedding dates remain blocked for the current venue.
- Multiple venues remain marked **Coming soon**.

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
git commit -m "Add owner wedding switcher and couple access"
git push
```

GitHub Actions will redeploy the GitHub Pages site after the push.
