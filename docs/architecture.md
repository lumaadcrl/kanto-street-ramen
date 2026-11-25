# System Design

## High-Level Design

The site is a static React single-page application. Vite builds the browser bundle; the browser renders route content and requests map tiles directly from OpenStreetMap. There is no application server, database, authentication, or form submission API in this version.

```mermaid
flowchart LR
  Visitor[Visitor browser] -->|HTTP document and assets| Host[Static web host / Vite]
  Host -->|index.html, JS, CSS, images| React[React application]
  React --> Router[React Router]
  Router --> Pages[Page views]
  Pages --> Data[Static branch and menu data]
  Pages --> Map[Leaflet map component]
  Map -->|Tile requests and attribution| OSM[OpenStreetMap tile service]
  Visitor -->|External directions link| OSM
  Pages -->|mailto link| Email[Visitor email application]
```

## Low-Level Design

```mermaid
flowchart TB
  Entry[index.html] --> Bootstrap[src/main.jsx]
  Bootstrap --> Router[BrowserRouter]
  Router --> App[src/App.jsx]
  App --> Scroll[ScrollToTop and document title]
  App --> Header[Header and responsive navigation]
  App --> RouteView{Route match}
  RouteView --> Home[HomePage]
  RouteView --> About[AboutPage]
  RouteView --> Menu[MenuPage]
  RouteView --> Locations[LocationsPage]
  RouteView --> Services[ServicesPage]
  RouteView --> Contact[ContactPage]
  RouteView --> Fallback[NotFoundPage]
  App --> Footer[Shared Footer]
  Locations --> BranchList[Branch cards and directions]
  Locations --> BranchMap[BranchMap.jsx]
  BranchMap --> Branches[src/data.js: branches]
  BranchMap --> Leaflet[React Leaflet]
  Leaflet --> Tiles[OpenStreetMap raster tiles]
  Menu --> MenuData[src/data.js: menuItems]
  Contact --> Mailto[Browser mailto handler]
```

`src/data.js` is the canonical source for branch coordinates and public opening hours. `BranchMap` consumes these records to render map markers and popup directions, while `LocationsPage` uses the same records for readable branch information. The map is initialized to all branch coordinates, disables scroll-wheel zoom by default, and retains Leaflet's native pan/zoom controls and attribution.

## Route and Navigation Flow

```mermaid
flowchart TD
  Start[Open app URL] --> Resolve{Path recognized?}
  Resolve -->|Yes| Render[Render matching React page]
  Resolve -->|Legacy /pages/*.html path| Redirect[Replace with canonical route]
  Redirect --> Render
  Resolve -->|No| NotFound[Render not-found view]
  Render --> Nav[Choose navigation link]
  Nav --> RouteChange[React Router changes route]
  RouteChange --> Title[Update document title and scroll to top]
  Title --> Render
```

## Location and Contact Flows

```mermaid
flowchart TD
  Open[Open Locations] --> Read[Read branch cards]
  Open --> MapLoad[Create Leaflet map]
  MapLoad --> Fetch[Fetch visible OpenStreetMap tiles]
  Fetch --> Markers[Render markers from branch coordinates]
  Markers --> Select[Select a marker]
  Select --> Popup[Show branch name, area, hours, directions]
  Popup --> Directions[Open OpenStreetMap directions]
  Read --> Directions
```

```mermaid
flowchart TD
  Contact[Open Contact] --> Fill[Enter name, email, topic, message]
  Fill --> Validate{Browser validation passes?}
  Validate -->|No| Correct[Show native field validation]
  Correct --> Fill
  Validate -->|Yes| Compose[Build encoded mailto URL]
  Compose --> Email[Open visitor email application]
```

## Operational Notes

- Use a static host configured to serve `index.html` for unknown paths so direct route loads and legacy aliases reach React Router.
- The OpenStreetMap standard tile endpoint is public infrastructure with a usage policy, not a dedicated application API SLA. For substantial production traffic, use a hosted tile provider and follow its key, attribution, and caching requirements.
- Coordinates originate from the previous location-page map embeds. Verify each pin against the actual storefront before publishing navigation-critical directions.
- The contact flow is client-only and does not deliver messages unless the visitor has a configured email application. Add a backend or managed form provider if guaranteed receipt is required.