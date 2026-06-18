# Nova Studio

Fullstack web app for a digital agency. Server-rendered landing page with hero, services, portfolio (filterable), stats, and contact sections — backed by Postgres and MongoDB. Includes a protected admin panel for managing contact submissions and portfolio projects.

## Setup

```bash
git clone https://github.com/abhiraj75/NovaStudio.git
cd NovaStudio
npm install
```

Create `.env.local` in the project root:

```
DATABASE_URL=<postgres connection string>
MONGODB_URI=<mongodb connection string>
ADMIN_USERNAME=<admin username>
ADMIN_PASSWORD=<admin password>
SESSION_SECRET=<random 32+ char string>
```

Run the database migration and seed:

```bash
npx prisma migrate dev
npx prisma db seed
```

Start the dev server:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- MUI v9 + CSS Modules
- Postgres via Prisma (projects, contacts, stats, services)
- MongoDB via native driver (analytics events)
- Auth: env credentials + HMAC-signed httpOnly session cookie + middleware guard
- Typography: Cormorant Garamond (headlines) + Plus Jakarta Sans (body/UI)
- Palette: midnight navy, champagne gold, ivory, silver slate

## API

| Method | Route | Auth | Request Body | Success | Errors |
|--------|-------|------|-------------|---------|--------|
| GET | /api/services | none | -- | 200 `[{title, description}]` | 500 |
| GET | /api/projects | none | -- | 200 `[{id, title, category, imageUrl, createdAt}]` | 500 |
| POST | /api/projects | admin | `{title, category, imageUrl}` | 201 `{...project}` | 400, 401 |
| DELETE | /api/projects/:id | admin | -- | 204 | 401, 404 |
| GET | /api/stats | none | -- | 200 `[{label, value, suffix}]` | 500 |
| POST | /api/contact | none | `{name, email, message}` | 201 `{id}` | 400 |
| GET | /api/contacts | admin | -- | 200 `[{id, name, email, message, createdAt}]` | 401 |
| POST | /api/admin/login | none | `{username, password}` | 200 + session cookie | 401 |
| DELETE | /api/admin/login | none | -- | 200 (clears cookie) | -- |
| POST | /api/analytics | none | `{type, path}` | 204 | 400 |

Validation: title/category max 120 chars, name max 100, email format check, message max 1000, imageUrl must be a path or http(s) URL, analytics type must be `cta_click` or `page_visit`.

## Design Decisions

**Server-side rendering with shared data layer.** The landing page is an async server component that fetches services, projects, and stats in parallel via `lib/data.ts`. The same data-access functions are used by the API route handlers, so there is one source of truth for queries. Client components that need browser APIs (IntersectionObserver, count-up animation) receive data as props rather than fetching from the API.

**Two-font typography system.** Cormorant Garamond (serif, weight 300-400) for all headlines and display text. Plus Jakarta Sans (sans-serif, weight 400-500) for body, nav, buttons, and captions. The contrast between light serif headlines and clean sans UI creates an editorial feel without homogenising the two.

**Auth without NextAuth.** The spec calls for a single admin credential, so a full auth library adds complexity without benefit. Instead: env-stored credentials, HMAC-SHA256 signed cookie payload with expiry, and edge middleware that verifies the signature on every admin request. The same HMAC logic runs in both the Node runtime (crypto module for cookie creation) and the edge runtime (Web Crypto API for middleware verification).

**Shared validation.** `lib/validation.ts` is imported by both client components and server route handlers. Client-side validation gives instant feedback; server-side validation is the real gate. One module, two consumers, no drift.

**Prisma 7 adapter pattern.** Prisma 7 removed the `url` field from `schema.prisma` and requires a driver adapter passed to the PrismaClient constructor. We use `@prisma/adapter-pg` with a `pg.Pool` for the Postgres connection instead of Prisma's built-in connection handling.

**MongoDB for analytics only.** Postgres handles all structured data. MongoDB stores fire-and-forget analytics events (page visits, CTA clicks) via the native driver. The write is async and never blocks the UI.

**Portfolio filtering.** Category filter pills are derived dynamically from project data. A search box filters by title and category. Both run client-side over server-provided data — instant, no API round-trips. Cards re-observe on filter change for scroll-reveal animation.

**MUI + CSS Modules split.** MUI handles component-level styling (buttons, text fields) and theming. CSS Modules handle layout, animations, and section-specific responsive rules. The `sx` prop is used sparingly where Emotion specificity needs to beat CSS Modules (e.g. heading font-weight).

**Scroll-triggered animations.** Portfolio cards and stats use IntersectionObserver to trigger entrance animations once per element. The observer disconnects after firing to avoid re-triggers on scroll-back.
