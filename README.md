# BenNotes (MERN) — In Progress

Simple notes app for practicing MERN + rate limiting.

**Status:** Work in progress. Not a finished product.

- No auth
- No user accounts
- UI is basic
- Goal is CRUD + deployment config + rate limit handling

**Live demo:** https://ben-notes-app.onrender.com/

---

## Stack

### Backend

- Node.js, Express
- MongoDB (Mongoose)
- Upstash Redis (rate limiting)
- CORS allowlist + env-based config
- Health endpoints (API + Redis keep-alive)

### Frontend

- React (Vite)
- Tailwind CSS + DaisyUI
- Axios
- React Router
- Lucide React

---

## What works now

- Create / Read / Update / Delete notes
- Note model fields:
  - `title`
  - `content`
  - `priority`
  - `timestamps`
- Upstash rate limiting middleware (per IP)
- Rate limit UI feedback (frontend)
- Axios base URL logic:
  - uses `VITE_API_URL` first
  - falls back to localhost in dev
  - otherwise uses production API URL
- Health checks

---

## Project structure (rough)

backend/
controllers/
middleware/
models/
routes/
config/
server.js

frontend/
src/
api/
components/
pages/
App.jsx
index.html

---

## API (notes)

Exact paths depend on your `noteRoutes.js`, but the intent is standard CRUD.

- `GET /api/notes` — list notes
- `GET /api/notes/:id` — get one
- `POST /api/notes` — create
- `PUT /api/notes/:id` — update
- `DELETE /api/notes/:id` — delete

Rate limiting is applied to API routes. If you spam requests, you will get a rate limit response and the UI should show it.

---

## Deployment notes

- Frontend API base URL:
  - prefers `VITE_API_URL`
  - otherwise uses localhost in dev
  - otherwise uses the configured production URL (moved to Koyeb in later commits)
- Backend CORS:
  - uses an allowlist with localhost + deployed frontend origin
  - trailing slash was removed later to fix matching issues
- Redis keep-alive:
  - `GET /api/health/ping-redis` exists for external pings

---

## Missing / TODO

- Authentication + accounts
- Per-user notes
- Better validation
- Search / filter / sorting UI
- Pagination
- Tests
- Cleaner error UX

---

## Credits

Built by **Ben Nguyen**.
Learning project.
