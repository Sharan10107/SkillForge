# SkillForge

A student portfolio & project showcase platform — students draft their
profile, publish real projects, collect feedback, and share a public
portfolio link with recruiters.

**Design concept:** "the blueprint and the forge." A subtle engineering
blueprint grid grounds the interface, and a hot ember-orange gradient marks
every primary action — the moment a draft becomes something forged and
finished. The signature clipped-corner shape (used on cards, buttons, and
badges) echoes a stamped metal nameplate. Typefaces: Space Grotesk
(headings), IBM Plex Sans (body), IBM Plex Mono (data/labels).

## Tech stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React
  Hook Form, Framer Motion, React Icons, Recharts, Context API
- **Backend:** Node.js, Express.js, MVC architecture
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT + bcrypt
- **Uploads:** Cloudinary
- **Deployment:** Vercel (frontend), Render (backend)

## Project structure

See `PROJECT_STRUCTURE.md` (if present) or browse `backend/src` and
`frontend/src` directly — both follow the folder layout described in the
Installation guide below.

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, Cloudinary + SMTP creds
npm install
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # set VITE_API_BASE_URL if not using localhost:5000
npm install
npm run dev              # starts on http://localhost:5173
```

Open `http://localhost:5173` — sign up, publish a project, and it should
appear on `/explore` and your public portfolio at `/u/your-slug`.

### 3. Make yourself an admin (optional)

Admin accounts aren't created through the UI. After signing up, open your
user document in MongoDB Atlas (or via `mongosh`) and set:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

Then visit `/admin` while logged in.

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for the full list.
At minimum you need:

- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
- `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` — for verification & reset emails
  (the app still runs without these; emails just won't send)

## Deployment

**Backend → Render**
1. New Web Service → connect the repo → root directory `backend`
2. Build command: `npm install` · Start command: `npm start`
3. Add all backend env vars in Render's dashboard
4. Set `CLIENT_URL` to your deployed Vercel URL (needed for CORS)

**Frontend → Vercel**
1. New Project → root directory `frontend`
2. Framework preset: Vite
3. Add `VITE_API_BASE_URL` pointing to your Render backend's `/api`

## API overview

All routes are prefixed with `/api`. Key groups:

| Group | Base path | Notes |
|---|---|---|
| Auth | `/api/auth` | signup, login, verify-email, forgot/reset password |
| Users | `/api/users` | update own profile, public profile by slug, search |
| Projects | `/api/projects` | CRUD, like, featured, explore feed w/ search+filter+sort+pagination |
| Comments | `/api/projects/:id/comments`, `/api/comments/:id` | nested under projects for reads/creates |
| Bookmarks | `/api/bookmarks` | toggle + list mine |
| Notifications | `/api/notifications` | list, mark read |
| Uploads | `/api/uploads` | avatar, banner, resume, project images (Cloudinary) |
| Admin | `/api/admin` | analytics, user/project moderation, reports (admin role only) |
| Contact | `/api/contact` | public contact form |

Every response follows `{ success, message, data }`. Paginated list
endpoints also return `meta: { page, limit, totalItems, totalPages, hasNextPage, hasPrevPage }`.

## Production checklist

- [ ] Set `NODE_ENV=production` on the backend
- [ ] Rotate `JWT_SECRET` to a strong, unique value
- [ ] Restrict MongoDB Atlas network access to Render's IPs (or use a VPC peering / private endpoint)
- [ ] Confirm CORS `CLIENT_URL` matches your production frontend domain exactly
- [ ] Verify rate limiting thresholds fit expected traffic
- [ ] Add real SMTP credentials so verification/reset emails send
- [ ] Set up Cloudinary upload presets/limits appropriate for production
- [ ] Enable MongoDB Atlas automated backups
- [ ] Add uptime monitoring against `/api/health`
- [ ] Review and tighten Helmet CSP if serving any inline scripts

## Notes on scope

This build implements the full data model, auth flow, and core CRUD +
social features (likes, comments, bookmarks, notifications) end-to-end,
plus an admin panel with analytics, moderation, and reports. It's meant
as a strong, working foundation you can extend — e.g. wiring up
role-based email digests, a richer rich-text editor for project
descriptions, or websocket-based live notifications.
