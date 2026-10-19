# Crater Code Website — Development Context & Changelog

## Overview
This document captures the architecture, comprehensive design overhaul, theme system, and portfolio showcase implementations across the Crater Code web platform.

---

## 1. Crater Control Theme Engine

### 1.1 Curated Themes (6 Total)
The website features 6 dedicated, fully isolated color themes managed via CSS variables and localized theme state:

1. **Default (Sunset Orange)**
   - Dominant Accent: `#ff5500` / `#ff7733`
   - Background: `#08080a` (Deep Obsidian)
   - Surface: `#121216`
   - Custom Cursor: Precision crosshair with sunset glow.
2. **Ivory (High-Contrast Light Mode)**
   - Dominant Accent: `#111827` / `#e2e8f0` with gold/amber highlights
   - Background: `#f8fafc` / `#ffffff`
   - Surface: `#f1f5f9`
   - Custom Cursor: Dark ergonomic pointer.
3. **Midnight Blue**
   - Dominant Accent: `#3b82f6` / `#60a5fa`
   - Background: `#030712` (Cosmic Blue-Black)
   - Surface: `#0f172a`
   - Custom Cursor: Deep-space cyan-blue trail cursor.
4. **Crater**
   - Dominant Accent: `#f43f5e` / `#fb7185` (Crimson Asteroid)
   - Background: `#090507`
   - Surface: `#170b10`
   - Custom Cursor: Radiant ruby cursor.
5. **Purple Haze**
   - Dominant Accent: `#a855f7` / `#c084fc` (Neon Violet)
   - Background: `#06020e`
   - Surface: `#130924`
   - Custom Cursor: Ultraviolet glow cursor.
6. **Emerald (Dark Forest)**
   - Dominant Accent: `#10b981` / `#34d399` (Forest Mint)
   - Background: `#02140d` (Deep forest darkened green)
   - Surface: `#062518`
   - Custom Cursor: Luminescent emerald cursor.

### 1.2 Control Panel UI Updates
- **Theme Color Swatches**: Direct visual swatch preview circles beside each theme option.
- **Dynamic Control Panel Sync**: The control panel window and active indicators adapt dynamically to the selected theme's surface and accent tokens.
- **Removed Deprecated Options**:
  - Removed "Custom" theme builder.
  - Removed "Reduced Motion", "Minimize Animations", "High Contrast", and "Increase Element Visibility" toggles for a cleaner, unified UX.
- **Global Persistence**: Theme preference is synchronized across all sub-pages (`/`, `/about/`, `/services/`, `/projects/`, `/products/`, `/academy/`, `/contact/`).

---

## 2. Navigation & Footer Interactive Polish

### 2.1 Navigation & Section Links
- Dynamic theme hover effects across Work, Company, and Service menu links.
- Consistent scale transitions and active glowing underlines.

### 2.2 Brand-Authentic Social Hover Colors (`Connect` Footer)
- **WhatsApp**: Emerald Green (`#25D366`)
- **GitHub**: Clean Luminescent White (`#ffffff`)
- **Instagram**: Radiant Gradient Pink (`#E1306C`)
- **Email**: Corporate Sky Blue (`#38bdf8`)
- **YouTube**: Vibrant Crimson Red (`#FF0000`)

---

## 3. Projects Page Overhaul (`/projects/`)

### 3.1 Design & Card Aesthetics
- **Card Geometry**: Modern curved `rounded-2xl sm:rounded-3xl` cards with dark translucent glass surfaces (`color-mix(in srgb, var(--color-surface) 75%, var(--color-background))`).
- **Interactive Elevation**: Smooth `-translate-y-1.5` lift on hover with elevation shadow and subtle border highlights.
- **Borderless Tech Stack Tags**: Replaced hard, tight borders with soft, borderless pill tags (`rounded-full bg-white/[0.04]` / `bg-[var(--color-surface)]`) for languages and frameworks.
- **Removal of Card-Face "Code" Button**: Removed generic source buttons from the card faces.
- **Direct Live Links**: Clickable title headers and pulsing green `LIVE SITE ↗` badges for real-world deployments.

### 3.2 "PROJECT OVERVIEW" Anchored Popover System
Each project card features a dedicated **`PROJECT OVERVIEW ↗`** action that opens a targeted floating popover anchored directly over that specific card:
- **Anchored in Context**: Renders directly on the clicked card right where the button is tapped, eliminating awkward viewport jumps on desktop screens.
- **Toggle & Close**: 1-tap toggles between `PROJECT OVERVIEW` and `CLOSE OVERVIEW ✕`, with a dedicated top-right close `✕` button and `Escape` key dismissal.
- **Comprehensive Project Briefing**: Deep technical background and business context.
- **System Architecture & Key Capabilities**: Detailed bullet points explaining core modules.
- **Complete Tech Stack**: Borderless pill tags showcasing all frontend, backend, database, and cloud technologies.
- **Direct Action Links**: Live site link and GitHub repository button right inside the popover.
- **Refined GitHub Action Button (`.project-github-btn`)**:
  - Re-proportioned typography: sized to `text-[10.5px]` with `font-semibold` and `tracking-wider` inside `px-3 py-1.5 rounded-xl` for optimal breathing room and geometry.
  - Official GitHub SVG logo mark positioned beside the text.
  - Interactive hover state: theme-adaptive border glow (`var(--color-primary)`), illuminated translucent surface, subtle button lift (`scale(1.04)`), GitHub icon micro-rotation/scale (`scale(1.15)`), and animated diagonal arrow displacement.

---

## 4. Curated Project Catalog (13 Repositories)

### Priority 1: Live Deployments
1. **Royal Swiss City** (Live: `https://royalswisscity.com/`, Repo: `https://github.com/Abdullah-webster/royal_swiss_city80.git`)
   - **Category**: Web Platform
   - **Stack**: React, TypeScript, Tailwind CSS, GSAP (ScrollTrigger), Radix UI, PHP API
   - **Key Features**: Hero Capsule GSAP animation, multi-page community tour (The City, Amenities, Developer, FAQ), interactive Google Maps (Lahore Ravi Riverfront zone), PHP lead capture & enquiry system.
2. **CRATER CODE • AQUASHINE** (Live: `https://aquashine.cratercode.com/`, Repo: `https://github.com/crater-code/AquaShine.git`)
   - **Category**: Mobile Application
   - **Stack**: Flutter 3.47, Dart, Riverpod 2.4, Firebase (Firestore, Auth, Functions), OSRM & OpenStreetMap, Cloud Functions
   - **Key Features**: Zero-cost OSRM turn-by-turn GPS with TTS voice prompts, 4-role architecture (Customer, Specialist, Studio Owner, Super Admin with 8% revenue ledger), doorstep detailing mobile fleet dispatcher with photographic machinery audits, live bay rush coordinator, and 4-way group inquiry gateway.
3. **Edenbridge Grammar School** (Live: `https://edenbridgegrammar.com/`, Repo: `https://github.com/crater-code/EdenBridge_Grammar`)
   - **Category**: Web Platform
   - **Stack**: React 18, Three.js, React Three Fiber, Framer Motion, Tailwind CSS, PHP 8.x / MySQL API
   - **Key Features**: 3D interactive core values orbit (Three.js/R3F), Exel Integrated Curriculum explorer across 4 phases, AI cognitive diagrams, asynchronous PHP/MySQL admission pipeline with IP rate limiting, and 4K LED display responsive rendering.
4. **World Wide Rapid Express** (Live: `https://www.worldwiderapidexpress.com/`, Repo: `https://github.com/crater-code/World-Wide-Rapid-Express.git`)
   - **Category**: Enterprise & Cloud
   - **Stack**: PHP 8.x, MySQL, JavaScript ES6+, Carrier Telemetry (DHL, FedEx, UPS, SkyNET, DPD), CSS3, REST API
   - **Key Features**: Multi-carrier telemetry routing, automated IATA volumetric weight pricing (L × B × H / 5000), async real-time tracking API, daily dispatch manifests, and staff role security with CNIC verification.

### Priority 2: Enterprise & Application Suites
5. **Everything At Work**
   - **Category**: Enterprise & Cloud
   - **Stack**: .NET MAUI, Blazor Hybrid, C#, SQLite, Azure Cloud
   - **Key Features**: Cross-platform workforce suite, geofenced GPS clock-in, shift conflict resolution, offline-first SQLite sync.
6. **TaskMaster Pro**
   - **Category**: Enterprise & Cloud
   - **Stack**: React, Redux Toolkit, Node.js, Express, MongoDB, Tailwind CSS
   - **Key Features**: Kanban agile board, sprint burndown telemetry, role-based access control (RBAC), WebSocket notifications.
7. **Zenith Expense Manager**
   - **Category**: Mobile Application
   - **Stack**: Flutter, Dart, Firebase Auth, Cloud Firestore, Provider
   - **Key Features**: Real-time receipt scanning OCR, multi-currency ledger, monthly cashflow analytics, automated budgeting alerts.
8. **FAES — Flood & Earthquake Alert System** (Repo: `https://github.com/crater-code/Flood_and_Earthquake_Alert_System-FAES.git`)
   - **Category**: Mobile Application
   - **Stack**: Flutter 3.47, Dart, Node.js / Express 5.x, Prisma 7.x ORM, PostgreSQL, OpenStreetMap
   - **Key Features**: Hydrological & seismic telemetry, two-way crowdsourced GPS disaster reporting with severity triage and photo verification, OpenStreetMap GIS hazard heatmaps with safe evacuation corridors, AI disaster safety assistant, NGO relief supply inventory ledger, and zero-network offline survival guides with emergency speed-dial directories (1122, NDMA, PDMA, Edhi).
9. **Athletes Hub - Sports Community** *(formerly Sprint Index)*
   - **Category**: Mobile Application
   - **Stack**: Flutter, Dart, Google Maps API, Firebase Firestore, Push Notifications
   - **Key Features**: Athletic performance telemetry, pickup match discovery, tournament bracket builder, and locker-room chat.
10. **Lumina — Bounded Educational AI Tutor** (Repo: `https://github.com/crater-code/lumina-tutor.git`)
    - **Category**: AI & EdTech
    - **Stack**: React 18, Vite, FastAPI (Python 3.12), Google Gemini 2.5 Flash, FAISS CPU, Sentence-Transformers
    - **Key Features**: High-throughput structure-aware PDF ingestion (450+ pages), 3-stage hybrid retrieval (FAISS dense vector + MiniLM embeddings + lexical filter), dual synthesis with Gemini 2.5 Flash, strict anti-hallucination grounding validator, domain-bounded query classifier, and explicit page & chunk citation overlays.
11. **Institutional LMS & CMS Hub**
    - **Category**: Mobile Application
    - **Stack**: Flutter, Dart, Firebase Firestore, Cloud Functions, Node.js
    - **Key Features**: Campus learning ecosystem with role-based gradebooks, QR attendance, and assignment workflows.
12. **NEON School - Cyber Academy**
    - **Category**: AI & EdTech
    - **Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Monaco Editor
    - **Key Features**: In-browser code execution sandbox with real-time linting, gamified progression trees, and interactive 3D paths.
13. **Gaming Museum & Heritage Lab**
    - **Category**: Gaming & Culture
    - **Stack**: HTML5 Canvas, WebGL, JavaScript, CSS3, WebAudio API
    - **Key Features**: Curated 5-decade console evolution timeline, in-browser retro canvas emulators, and 3D teardown exhibits.
13. **Arwa Travels** (Repo: `https://github.com/crater-code/Arwa_Travels_Website.git`)
    - **Category**: Web Platform
    - **Stack**: PHP 8.x, MySQL, JavaScript ES6+, Responsive CSS3, WhatsApp API, Custom CMS
    - **Key Features**: 6-tier categorical tour discovery (International, Adventure, Local, Leisure, Honeymoon, Trekking), multi-currency pricing matrix (PKR, USD, EUR, GBP, AUD, CAD), comprehensive package dossiers with accommodation & visa guides, 1-click WhatsApp reservation gateway with formatted inquiry context (+92 333 55 111 00), and administrative CMS portal (`i-the-detail-portal.php`) for package publishing.

---

## 5. File Architecture & Bundle Map

| Component / Feature | File Path | Notes |
| :--- | :--- | :--- |
| **Projects React Chunk** | `_next/static/chunks/app/projects/page-0afbefd3ca021359.js` | Contains project catalog, modal state, filter tabs, and card components. |
| **Projects Pre-rendered HTML** | `projects/index.html` | Static HTML pre-render for SEO and instant initial paint. |
| **Global Theme Styles** | `_next/static/css/0249afadf5e1e821.css` | Theme tokens, custom cursors, animations, and Tailwind base layers. |
| **Theme Persistence Script** | Injected in `<head>` of all HTML pages | Prevents theme flash on page load by reading `localStorage`. |
| **Documentation Artifact** | `project_readmes.md` | Full production-grade README specifications for all 13 GitHub repositories. |

---

## 6. Maintenance & Development Guidelines
1. **Hydration Sync**: When modifying `/projects/` markup, always update both `projects/index.html` and `_next/static/chunks/app/projects/page-0afbefd3ca021359.js` to ensure static SEO markup and React client-side hydration match seamlessly.
2. **Naming Constraints**: Never reference the phrase "SPRINT INDEX" in customer-facing builds; use the approved alias **"Athletes Hub - Sports Community"**.
3. **Theme Variables**: Use CSS variable tokens (`var(--color-primary)`, `var(--color-secondary)`, `var(--color-surface)`, `var(--color-background)`, `var(--color-text)`, `var(--color-text-muted)`) and `color-mix()` for any new components to ensure compatibility with all 6 themes.
