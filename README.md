# Venue Visions v0.5

Share-ready client-side prototype for a wedding venue planning portal.

## v0.5 additions

- Multiple fully interactive wedding workspaces in the demo.
- Owner View separates each couple into its own workspace card.
- Switching couples changes that wedding's décor selections, planner, notes, and messages.
- Functional Add Wedding form.
- Duplicate wedding dates are blocked in the owner form and when editing a wedding date.
- Current active wedding is shown in the navigation while working inside a workspace.
- Multi-venue direction is shown as **Coming soon** while the demo remains one venue.
- Owner View still displays the demo-access warning because GitHub Pages is not real authentication.

## Run locally

```powershell
cd C:\Users\aalbe\Documents\Dev\VenueVisions
npm install
npm run dev
```

## Publish changes

```powershell
npm run build
git add .
git commit -m "Add multiple wedding workspaces"
git push
```

GitHub Actions will redeploy the Pages site after the push.

## Prototype data

All names, inventory, messages, dates and floor plans are sample data. The demo uses browser localStorage. Production should use a backend database and real authentication/authorization before storing customer information.
