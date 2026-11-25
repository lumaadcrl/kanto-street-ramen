# Kanto Street Ramen

A responsive React website for Kanto Street Ramen in Cebu, Philippines. The site brings the home, story, menu, services, contact, and branch-location experiences into one client-side app.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite prints the local URL after startup. Create a production bundle with `npm run build`; inspect it locally with `npm run preview`.

## Pages

- `/` Home
- `/about` Our story
- `/menu` Menu
- `/locations` Interactive branch map and opening hours
- `/services` Dining and group-meal information
- `/contact` Email inquiry form

The previous `/pages/*.html` URLs redirect to their React route while the app is served with Vite or another SPA-compatible host.

## Map

The locations page uses Leaflet with the OpenStreetMap standard tile service. Branch markers use the coordinates in `src/data.js`; selecting a marker shows branch details and an OpenStreetMap directions link. No API key or backend is needed for local development. The public OpenStreetMap tile service has a usage policy and is not a guaranteed high-volume production API; choose a hosted tile provider and configure attribution/usage limits before scaling traffic.

## Contact form

The contact form validates fields in the browser and builds a `mailto:` link for the visitor's default email application. It does not submit personal information to a server. A backend or hosted form service is required for server-side delivery and storage.

## Project structure

```text
index.html                 Vite document and React mount point
docs/architecture.md       System designs and Mermaid flowcharts
src/main.jsx                React bootstrap, router, global styles
src/App.jsx                 Shared shell and page routes
src/data.js                 Navigation, branch, schedule, and menu data
src/components/BranchMap.jsx Leaflet map integration
src/styles.css              Responsive visual system
docs/architecture.md        System designs and Mermaid flowcharts
public/img/                 Local brand, food, and branch photography
```

See [docs/architecture.md](docs/architecture.md) for high-level and low-level designs and user-flow diagrams.