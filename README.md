# BenNotes (MERN) — In Progress

Lightweight personal productivity notes application built with the MERN stack.

Designed as a SaaS-style learning project to practice full-stack architecture, deployment workflows, and production-oriented application patterns.

**Status:** Work in progress. Not a finished product.

Current version is an MVP CRUD notes app with infrastructure and deployment foundations in place.  
Long-term goal is to evolve it into a more complete personal productivity platform.

**Live demo:** https://ben-notes-app.onrender.com/

---

## Product Vision

BenNotes is evolving from a simple CRUD learning project into a lightweight personal productivity SaaS application focused on helping users create, organize, and manage personal notes through a production-style MERN architecture.

---

## Stack

### Backend

- Node.js, Express
- MongoDB (Mongoose)
- Upstash Redis (rate limiting)
- CORS allowlist + environment-based config
- Health endpoints (API + Redis keep-alive)

### Frontend

- React (Vite)
- Tailwind CSS + DaisyUI
- Axios
- React Router
- Lucide React

---

## Current Features

- Create / Read / Update / Delete notes
- Note model fields:
  - `title`
  - `content`
  - `priority`
  - `timestamps`
- Upstash Redis rate limiting middleware (per IP)
- Rate limit UI feedback
- Environment-aware Axios API configuration
- Backend API health check endpoint
- Redis health / keep-alive endpoint
- Production CORS allowlist configuration

---

## Project Structure (Rough)

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

## API (Notes)

- `GET /api/notes` — list notes
- `GET /api/notes/:id` — get one note
- `POST /api/notes` — create note
- `PUT /api/notes/:id` — update note
- `DELETE /api/notes/:id` — delete note

Rate limiting is applied to API routes.  
Excessive requests return rate limit responses handled by the frontend UI.

---

## Deployment Notes

- Frontend API base URL:
  - Prefers `VITE_API_URL`
  - Falls back to localhost in development
  - Otherwise uses configured production API URL

- Backend CORS:
  - Uses allowlist for approved frontend origins
  - Supports local + deployed frontend environments

- Redis Keep-Alive:
  - `GET /api/health/ping-redis` available for uptime monitoring

---

## Planned Features

- Authentication + user accounts
- Per-user notes ownership
- Note detail pages
- Search / filter / sorting
- Tags / categories
- Pin / archive / trash states
- Dashboard statistics
- Public shareable note links
- Better validation / error handling
- Tests
- UI / UX polish

---

## Credits

Built by **Ben Nguyen**  
Learning / portfolio project
