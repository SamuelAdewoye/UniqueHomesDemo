# Unique Homes & Properties

A premium real estate showcase built with React, TypeScript, Vite, and Tailwind CSS. This project presents Abuja luxury homes, commercial properties, testimonials, FAQs, and an admin-style CMS powered by browser storage.

## Overview

The app is a landing page / property portal for Unique Homes & Properties in Abuja. It includes:

- A rich hero section with property highlights
- Featured property listings and gallery
- Testimonials, services, FAQ section, and contact form
- A built-in browser-based CMS for managing properties and inquiries
- LocalStorage persistence for properties, favorites, and contact inquiries

## Project Structure

- `index.html` — application entry point and root `#root` container
- `vite.config.ts` — Vite configuration with React and Tailwind CSS plugins
- `tsconfig.json` — TypeScript compiler settings and path alias `@/*`
- `src/main.tsx` — React app bootstrap
- `src/App.tsx` — root application container and state orchestration
- `src/data.ts` — seeded property listings, testimonials, and FAQ content
- `src/types.ts` — shared TypeScript models for `Property`, `Inquiry`, `Testimonial`, and `FAQ`
- `src/index.css` — Tailwind CSS import, custom theme tokens, typography, and global base styles
- `src/components/` — reusable UI sections:
  - `Navigation.tsx`
  - `Hero.tsx`
  - `VideoTour.tsx`
  - `About.tsx`
  - `Services.tsx`
  - `Properties.tsx`
  - `Gallery.tsx`
  - `Stats.tsx`
  - `Testimonials.tsx`
  - `FAQs.tsx`
  - `Contact.tsx`
  - `CMS.tsx`
  - `Footer.tsx`
- `src/assets/images/` — property imagery used by the listings data
- `metadata.json` — AI Studio app metadata and capabilities descriptor

## Setup Instructions

### Prerequisites

- Node.js installed locally (Node 18+ recommended)
- npm available in your PATH

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open the local URL shown in the terminal (default Vite port `3000`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Check TypeScript types

```bash
npm run lint
```

## Architecture Overview

### Frontend-first design

This repository is primarily a frontend SPA. The app is rendered through React and does not require a dedicated backend to run locally.

### Component hierarchy

- `App.tsx` manages application state, localStorage sync, and section navigation
- `Navigation.tsx` renders the top nav and highlights active sections while scrolling
- Section components render structured content and support property search, filtering, and admin actions
- `CMS.tsx` exposes property and inquiry management features within the same client app

### Data flow

- `src/data.ts` provides initial fixtures for properties, testimonials, and FAQs
- `App.tsx` loads `INITIAL_PROPERTIES` and inquiry seed data from localStorage or fallback fixtures
- CRUD functions in `App.tsx` update state and persist changes back to `localStorage`
- User inquiry submissions are stored client-side and can be reviewed/updated through the CMS view

### Styling

- Tailwind CSS v4 is enabled through `@tailwindcss/vite`
- Global theme variables are defined in `src/index.css`
- Google fonts are imported for `Inter`, `Space Grotesk`, and `JetBrains Mono`
- Custom utilities include scrollbar hide styles and smooth scrolling

### Build tooling

- Vite is used for fast development, HMR support, and production bundling
- React plugin supports JSX and `.tsx` components
- Path alias `@/*` resolves to the repository root for easier imports

## Design Documentation

### Visual style

- Brand palette: navy, ivory, and gold
- Typography:
  - `Inter` for body and UI text
  - `Space Grotesk` for display headings
  - `JetBrains Mono` for fine-print or code-style text
- Layout pattern: anchored hero at top, followed by service cards, featured properties, gallery, and trust sections
- The page is designed for a luxury real estate audience, prioritizing clarity, trust, and premium imagery

### Content sections

- Hero with primary CTA and featured property
- About section describing company value and differentiators
- Services overview for real estate sales, rentals, construction, and project management
- Property listings with filtering and favorite toggles
- Visual gallery of completed or high-value properties
- Stats and business performance highlights
- Testimonials showcasing client credibility
- FAQ section addressing booking, sales, rentals, and project delivery
- Contact form for inquiries and custom quote requests
- Admin CMS panel for property management and inquiry status updates

### UX details

- Sticky navigation changes active state based on scroll position
- Smooth scrolling is implemented for anchor navigation
- LocalStorage persistence means data survives page reloads in the same browser
- The app includes a quote modal and inquiry workflow to simulate enterprise lead capture

## Known Repository Notes

- `package.json` includes dependencies for React, Tailwind CSS, Lucide icons, Vite, Express, `dotenv`, and `@google/genai`
- Source code currently does not contain an Express server implementation or `.env` usage in the frontend build
- The app is deployable as a static site using Vite build output
- `metadata.json` signals AI Studio app capabilities but is not required for standard local development

## Review History

This README is based on a workspace scan of the current repository state.

### Current snapshot

- Initial React + TypeScript + Vite landing page for luxury Abuja real estate
- Data-driven property catalog and admin-style browser CMS
- Tailwind CSS theming and responsive section-based layout
- LocalStorage persistence for properties, inquiries, and favorites

### Future improvements

- Add a backend API for real inquiry storage and admin authentication
- Convert `express`/`dotenv` dependencies into a real server when needed
- Expand the CMS into a separate authenticated dashboard
- Add unit tests and end-to-end tests for page behavior and form workflows

## Contact

If you want to extend this project, start by editing `src/App.tsx`, `src/data.ts`, and the component files in `src/components/`.
