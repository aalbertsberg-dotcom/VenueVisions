# Venue Visions

Prototype wedding venue planning experience built with React, TypeScript, and Vite.

## What is included

- Venue Visions logo and favicon (SVG, no external image files required)
- Customer landing page
- Searchable/filterable décor catalog
- Adjustable decoration quantities
- My Wedding workspace with names, date, guest count, notes, and selected inventory
- 2D venue designer with draggable furniture/decor objects, rotation, duplication, and removal
- Owner/admin prototype with upcoming weddings and storage-location inventory table
- Browser `localStorage` persistence for the prototype
- Hash-based navigation that works on static GitHub Pages hosting

## Run locally

Open PowerShell in the project folder and run:

```powershell
npm install
npm run dev
```

Then open the local address Vite prints, normally `http://localhost:5173`.

## Build for GitHub Pages

```powershell
npm install
npm run build
```

The production files will be written to `dist`.

This project uses a relative Vite base (`./`), so the compiled site can be hosted from a GitHub Pages project path without changing the code.

## Prototype limitations

This version intentionally has no real authentication or cloud database. Wedding details, selections, and planner layout are stored only in the current browser. The next architecture phase would add a hosted database, image storage, bride/owner accounts, wedding invitations, and true multi-device persistence.

## Intended local folder

```text
C:\Users\aalbe\Documents\Dev\VenueVisions
```

You can also launch the development site by right-clicking `Start-VenueVisions.ps1` and running it with PowerShell. The script installs dependencies the first time and then starts Vite.

## Planner revision (Aug 20)
- Tables start as tables only; chairs are not hard-coded into the table graphic.
- Selecting a round or banquet table exposes a Chairs slider. Those chairs are created as separate planner objects and move with the table until dragged away.
- Every selected object now has a Size slider plus Rotation.
- The planner now includes an All Inventory search so décor can be added directly from inventory. If needed, that item is also added to My Wedding automatically.

## v0.3 demo-review polish

This build is intended to be safe to share as a concept before real venue data is collected. It now includes:

- An always-visible **Demo Prototype** banner.
- Explicit **sample data** messaging in the décor catalog.
- A **Reset Demo** control in the navigation that restores the original sample wedding, selections and floor plan.
- A more obvious venue-designer tip explaining table chair controls, resizing and rotation.
- Responsive phone/tablet layout rules for the main pages and designer.
- A GitHub Actions workflow at `.github/workflows/deploy-pages.yml` for GitHub Pages.

### Publish with GitHub Pages

1. Push this project to a GitHub repository using the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main` (or manually run the **Deploy Venue Visions to GitHub Pages** action).
5. GitHub will publish the `dist` output and show the public Pages URL in the deployment.

The Vite `base` setting is relative (`./`), so this build works from a project Pages path such as `https://username.github.io/VenueVisions/` without hard-coding the repository name.
