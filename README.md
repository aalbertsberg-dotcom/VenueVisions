# Venue Visions v0.6

Demo polish update.

## Changes
- Replaced the full-width navigation with a hamburger menu on desktop and mobile.
- Added a dedicated Owner View demo login screen.
- Owner View now asks for the temporary demo password every time it is entered.
- Temporary demo password: `VENUE2026`.
- The password is a presentation gate only; real production security requires backend authentication.
- Increased desktop spacing/padding around Couples & wedding workspaces and owner dashboard sections.
- Preserved separate wedding workspaces and date-conflict prevention.

## Apply update
Extract the update ZIP over your existing VenueVisions project and replace files, then run:

```powershell
npm run build
git add .
git commit -m "Add hamburger navigation and owner demo login"
git push
```


## v0.6.1
- Owner View demo password changed to `123456`.
- Password field is prefilled for easier demo access.
