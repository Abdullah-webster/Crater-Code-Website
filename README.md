<p align="center">
  <img src="./assets/images/brand/logo_in_black.jpeg" alt="CRATER CODE Logo" width="110" height="110" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);" />
</p>

<h1 align="center">CRATER CODE</h1>

<p align="center">
  <strong>Elite Software Engineering Studio & Digital Innovation Lab</strong>
</p>

<p align="center">
  <em>"We Build What Others Imagine."</em>
</p>

<p align="center">
  <a href="https://cratercode.com"><img src="https://img.shields.io/badge/Production%20Website-cratercode.com-ff5500?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Site" /></a>
  <a href="https://github.com/crater-code"><img src="https://img.shields.io/badge/GitHub-crater--code-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://linkedin.com/company/cratercode"><img src="https://img.shields.io/badge/LinkedIn-Crater%20Code-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://instagram.com/crater.code"><img src="https://img.shields.io/badge/Instagram-@crater.code-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
  <a href="mailto:info@cratercode.com"><img src="https://img.shields.io/badge/Inquiries-info@cratercode.com-38bdf8?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

---

## 🌌 Overview

**CRATER CODE** is a premier software engineering studio and digital innovation lab based in Pakistan, collaborating with startups, high-growth enterprises, and institutions worldwide. We architect and ship high-performance web applications, cross-platform mobile systems, 3D interactive WebGL experiences, cloud infrastructure, and custom AI/ML integrations.

This repository houses the official production web platform for **[cratercode.com](https://cratercode.com/)**, engineered with pre-rendered static performance, seamless React client hydration, an advanced multi-theme engine, an interactive project catalog with contextual anchored popovers, and an integrated educational portal for **Crater Code Academy**.

---

## 👥 Studio Leadership & Founders

| Founder | Role | Core Specialization & Focus |
| :--- | :--- | :--- |
| **Muhammad Abdullah Wasim** | **Co-Founder & System Architect** | System Architecture, Full-Stack Development, High-Throughput APIs, Cloud Infrastructure & DevOps |
| **Muhammad Ali** | **Co-Founder & Creative Engineer** | Frontend Architecture, UI/UX Design Systems, Interactive Three.js/WebGL Experiences, Design Polish |
| **Muhammad Shaheer Tariq** | **Co-Founder & Mobile Architect** | Cross-Platform Mobile Engineering (Flutter & Dart), Hardware Telemetry, Real-time APIs & State Sync |

---

## ✨ Key Architectural Highlights & Features

### 1. 🎨 Crater Control Theme Engine (6 Curated Themes)
The website features an isolated, hardware-accelerated theme system managed via CSS custom properties and localized state persistence with zero-flash rendering:

* **Sunset Orange (Default)**: Deep Obsidian (`#0c0a09`) background with incandescent amber-orange primary accents (`#f97316` / `#ea580c`) and precision crosshair cursor with sunset glow.
* **Ivory (High-Contrast Light Mode)**: Pure alabaster surfaces (`#ffffff`) with warm stone tones (`#faf8f5`), bronze accents (`#b45309`), and ergonomic pointer cursor.
* **Midnight Blue**: Cosmic deep-space navy (`#030712` / `#0f172a`) with electric azure highlights (`#60a5fa` / `#3b82f6`) and celestial trail cursor.
* **Crater (Crimson Asteroid)**: Deep mineral dark surface (`#0a0a0a` / `#121212`) with monochrome silver and asteroid crimson accents (`#ffffff` / `#c4c4c4`).
* **Purple Haze**: Ultraviolet cyber aesthetic (`#09090b` / `#18181b`) paired with neon violet accents (`#a855f7` / `#c084fc`) and custom glow cursor.
* **Emerald (Dark Forest)**: Forest canopy black-green (`#01140e` / `#05241b`) with luminous mint emerald accents (`#10b981` / `#34d399`).

> **Zero-Flash Persistence**: An inline bootscript injected into the `<head>` of every page reads `localStorage.getItem("crater-theme")` before DOM paint, instantaneously mounting the exact CSS custom property palette (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`).

---

### 2. 🚀 Projects Page Overhaul & Anchored Popover System (`/projects/`)
* **Glassmorphism Geometry**: Curved `rounded-2xl sm:rounded-3xl` cards with translucent surfaces (`color-mix(in srgb, var(--color-surface) 75%, var(--color-background))`).
* **Interactive Elevation**: Dynamic `-translate-y-1.5` lift on hover with elevation shadow and subtle border highlights.
* **Borderless Tech Stack Pills**: Soft pill badges showcasing modern languages and frameworks without visual clutter.
* **Live Deployment Badges**: Real-time glowing `LIVE SITE ↗` status indicators for active production platforms.
* **Anchored Popover Briefing**: 1-tap `PROJECT OVERVIEW ↗` opens an anchored card modal right in context, detailing technical briefs, architectural bullet points, full technology stacks, and direct GitHub / Live site actions.

---

### 3. 🎓 Crater Code Academy (`/academy/`)
The educational wing of Crater Code provides intensive, industry-aligned training programs for aspiring engineers:
* **Curriculum Catalog (`/academy/courses/`)**:
  * *Web Development Fundamentals*
  * *Advanced React Architecture*
  * *Python for Data Science*
  * *Flutter Mobile Development*
  * *AI & Machine Learning Foundations*
  * *React Native Cross-Platform*
* **Application & Admissions Portal (`/academy/apply/`)**: Guided multi-step student enrollment system.
* **Administrative Suite (`/academy/admin/`)**: Comprehensive back-office dashboard for course governance and applicant triage.
* **Student Authentication (`/academy/login/`, `/academy/signup/`)**: Secure credential onboarding flow.
* **Admissions FAQ (`/academy/faq/`)**: Structured answers addressing admission criteria, schedules, and tuition.

---

### 4. 🕹️ Interactive Standalone Demos (`/demos/`)
Production-grade interactive sandboxes and proofs-of-concept accessible directly in the browser:
* **Console Hub (`/demos/console-hub/`)**: Retro console heritage laboratory with interactive hardware breakdown.
* **Crater Jobs (`/demos/crater-jobs/`)**: Modern job search and talent candidate aggregation portal.
* **Flood Alert (`/demos/flood-alert/`)**: Hydrological and seismic alert simulation dashboard with GIS mapping.
* **LMS Portal (`/demos/lms-portal/`)**: Academic student dashboard with progress metrics and course trackers.
* **Neon Nexus (`/demos/neon-nexus/`)**: Cyberpunk gaming and community portal interface.
* **PSL Fan Portal (`/demos/psl-fan/`)**: Pakistan Super League cricket tournament fan engagement showcase.

---

### 5. 🔍 SEO, Semantic Standards & AI Discoverability
* **Structured Data**: Complete Schema.org JSON-LD graphs (`Organization`, `WebSite`, `CollectionPage`, and educational schemas).
* **OpenGraph & Twitter Cards**: High-definition social cards configured across all routes with verified image dimensions (1200x630).
* **Machine Crawlers & LLM Context**:
  * [`sitemap.xml`](./sitemap.xml): Search engine indexing manifest with route prioritization.
  * [`robots.txt`](./robots.txt): Directives for major web crawlers.
  * [`llms.txt`](./llms.txt): Structured context specification curated specifically for Large Language Model indexing.
  * [`index.txt`](./index.txt): Text-based route overview and chunk references.
  * [`site.webmanifest`](./site.webmanifest): Progressive web application manifest with responsive icons.

---

## 🏆 Curated Showcase Catalog (13 Flagship Projects)

Below is the verified catalog of production platforms, enterprise applications, and systems engineered by Crater Code:

| # | Project Name | Category | Primary Tech Stack | Live Deployment / Repository |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Royal Swiss City** | Web Platform | React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Radix UI, PHP API | [Live Site ↗](https://royalswisscity.com/) \| [GitHub](https://github.com/Abdullah-webster/royal_swiss_city80.git) |
| **2** | **CRATER CODE • AQUASHINE** | Mobile Application | Flutter 3.47, Dart, Riverpod, Firebase, OSRM & OpenStreetMap | [Live Site ↗](https://aquashine.cratercode.com/) \| [GitHub](https://github.com/crater-code/AquaShine.git) |
| **3** | **Edenbridge Grammar School** | Web Platform | React 18, Three.js, React Three Fiber, Framer Motion, Tailwind, PHP/MySQL | [Live Site ↗](https://edenbridgegrammar.com/) \| [GitHub](https://github.com/crater-code/EdenBridge_Grammar) |
| **4** | **World Wide Rapid Express** | Enterprise & Cloud | PHP 8.x, MySQL, JavaScript ES6+, Carrier Telemetry (DHL, FedEx, UPS) | [Live Site ↗](https://www.worldwiderapidexpress.com/) \| [GitHub](https://github.com/crater-code/World-Wide-Rapid-Express.git) |
| **5** | **Everything At Work** | Enterprise & Cloud | .NET MAUI, Blazor Hybrid, C#, SQLite, Azure Cloud | Enterprise Suite |
| **6** | **Lumina — Bounded AI Tutor** | AI & EdTech | React 18, Vite, FastAPI (Python 3.12), Google Gemini 2.5 Flash, FAISS CPU | [GitHub](https://github.com/crater-code/lumina-tutor.git) |
| **7** | **Institutional LMS & CMS Hub** | Mobile Application | Flutter, Dart, Firebase Firestore, Cloud Functions, Node.js | Campus Platform |
| **8** | **FAES — Flood & Earthquake Alert** | Mobile Application | Flutter 3.47, Dart, Node.js / Express 5.x, Prisma ORM, PostgreSQL, OSM | [GitHub](https://github.com/crater-code/Flood_and_Earthquake_Alert_System-FAES.git) |
| **9** | **MediApp Healthcare Suite** | Mobile Application | Flutter, Dart, Node.js, WebRTC, Firebase, Express | Telehealth Platform |
| **10** | **Athletes Hub - Sports Community** | Mobile Application | Flutter, Dart, Google Maps API, Firebase Firestore, Push Telemetry | Sports Community |
| **11** | **NEON School - Cyber Academy** | AI & EdTech | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Monaco Editor | Cyber Academy |
| **12** | **Gaming Museum & Heritage Lab** | Gaming & Culture | HTML5 Canvas, WebGL, JavaScript, CSS3, WebAudio API | Interactive Lab |
| **13** | **Arwa Travels** | Web Platform | PHP 8.x, MySQL, JavaScript ES6+, WhatsApp API Gateway, Custom CMS | [GitHub](https://github.com/crater-code/Arwa_Travels_Website.git) |

---

## 📂 Project Directory Structure

```plaintext
01 - CC website/
├── index.html                     # Pre-rendered homepage with hero, services & philosophy
├── 404.html                       # Global 404 Not Found error page
├── CONTEXT.md                     # Development changelog, theme engine & portfolio specifications
├── README.md                      # Authentic repository & studio documentation
├── robots.txt                     # Crawler indexing rules
├── sitemap.xml                    # XML sitemap for search engines
├── llms.txt                       # Context-optimized plain text for LLM crawlers
├── index.txt                      # Chunk resolution mapping
├── site.webmanifest               # Progressive Web App manifest
├── favicon.ico                    # Standard website favicon
├── logo_in_black.jpeg             # Official Crater Code brand emblem
│
├── _next/                         # Compiled static assets & client chunks
│   └── static/
│       ├── css/
│       │   └── 0249afadf5e1e821.css   # Global theme variables, utility styles & animations
│       └── chunks/                    # Split JavaScript chunks for client hydration
│
├── about/                         # About Us: Studio history, engineering philosophy, founders
│   └── index.html
├── services/                      # Engineering Services: Web, Mobile, 3D, Cloud, AI, Blockchain
│   └── index.html
├── projects/                      # Portfolio: 13 production systems with anchored popover modals
│   └── index.html
├── products/                      # Proprietary Tools & SaaS products
│   └── index.html
├── contact/                       # Contact & consultation inquiry gateway
│   └── index.html
├── academy/                       # Crater Code Academy platform
│   ├── index.html                 # Academy home page
│   ├── apply/                     # Student course application portal
│   ├── courses/                   # Course catalog and syllabus explorer
│   ├── admin/                     # Administrative dashboard
│   ├── login/                     # User & student login
│   ├── signup/                    # Administrator registration
│   └── faq/                       # Frequently Asked Questions
├── demos/                         # Interactive standalone technology showcases
│   ├── console-hub/               # Retro Gaming Heritage Lab
│   ├── crater-jobs/               # Job aggregation platform demo
│   ├── flood-alert/               # GIS disaster warning telemetry
│   ├── lms-portal/                # Student LMS dashboard
│   ├── neon-nexus/                # Cyber gaming portal
│   ├── psl-fan/                   # Cricket sports fan platform
│   ├── wrapper.html               # Multi-device demo wrapper container
│   └── .htaccess                  # Apache server routing rules
├── privacy/                       # Studio & academy privacy policy
│   └── index.html
├── terms/                         # Terms of service & service agreements
│   └── index.html
└── assets/                        # Static imagery & brand media
    └── images/
        ├── brand/                 # Studio logo variations
        └── team/                  # Executive founder portraits
```

---

## 🛠️ Local Development & Preview

This web platform is structured as a static, pre-rendered production build that can be hosted on any web server or previewed locally with zero complex dependencies:

### Option 1: Using Node.js `serve`
```bash
# Run instantly with npx (no global install required)
npx serve . -p 3000
```
Then navigate to `http://localhost:3000`.

### Option 2: Using Python 3 Built-in HTTP Server
```bash
# Start server on port 8000
python -m http.server 8000
```
Open `http://localhost:8000` in any modern web browser.

### Option 3: Using VS Code / IDE Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🌐 Production Deployment

The platform is fully portable and ready to be deployed to any modern cloud host or traditional web server:

* **Vercel / Cloudflare Pages / Netlify**: Simply link the repository or upload the root folder. All pre-rendered HTML files map automatically to clean URLs (`/projects/`, `/services/`, etc.).
* **GitHub Pages**: Deploy the `main` branch directly in repository settings under **Pages -> Source -> Deploy from branch**.
* **Apache / Shared Hosting**: Upload the repository contents to `public_html`. A pre-configured [`.htaccess`](./demos/.htaccess) is included to handle URL rewrites, Gzip/Brotli compression, and cache headers for static chunks.
* **Nginx**: Configure standard `try_files $uri $uri/ $uri.html =404;` for clean directory routing.

---

## 📬 Contact & Connect

We welcome discussions regarding software engineering contracts, enterprise architecture, tech academy admissions, and strategic partnerships:

* **Official Website**: [https://cratercode.com](https://cratercode.com)
* **General Inquiries**: [info@cratercode.com](mailto:info@cratercode.com)
* **GitHub**: [@crater-code](https://github.com/crater-code)
* **LinkedIn**: [Crater Code](https://linkedin.com/company/cratercode)
* **Instagram**: [@crater.code](https://instagram.com/crater.code)
* **YouTube**: [@CraterCode](https://www.youtube.com/@CraterCode)
* **LinkTree**: [linktr.ee/CraterCode](https://linktr.ee/CraterCode)
* **Location**: Pakistan

---

<p align="center">
  <sub>© 2026 <strong>CRATER CODE</strong>. All rights reserved. Crafted with precision and vision.</sub>
</p>
