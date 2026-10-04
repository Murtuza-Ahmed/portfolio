# Murtuza Ahmed — Portfolio

My personal portfolio website — a full-stack Next.js application with a public
portfolio site and a complete admin panel to manage every piece of content.
Built with Next.js 14, TypeScript, MongoDB, and styled with a custom
"Midnight Forge" design system (deep black `#050505` + amber `#FFB238`).

**Repository:** https://github.com/Murtuza-Ahmed/portfolio

---

## ✨ Features

### Public site

- **Home** — centered hero with animated role ticker, rotating tech-stack
  groups, featured projects, experience timeline, and stats
- **About** — profile, tabbed skills browser (Technical + Development /
  Engineering skills) with hover-reveal proficiency bars, values, interests
- **Projects** — cinematic full-bleed project cards with hover detail sheets,
  All / Featured filter, sorting, and Load More pagination
- **Resume** — downloadable PDF, experience timeline, grouped skills,
  education, and certifications
- **Contact** — validated contact form; messages are saved to MongoDB and
  trigger an instant email notification via Resend
- Dark-first design, fully responsive, reduced-motion friendly

### Admin panel (`/admin`)

Full content management — no code changes needed to update the site:

- **Dashboard** — content statistics at a glance
- **Projects** — CRUD with image uploads (Cloudinary), featured flag, status
- **Skills** — CRUD with proficiency levels, categories
  (Frontend / Backend / Database / DevOps / Tools / Other), and skill types
  (**Technical** vs **Engineering**)
- **Experience, Education, Certifications** — complete CRUD
- **About / Home content** — edit profile, bio, hero text, social links
- **Resume** — manage resume data + upload PDF
- **Messages** — read and manage contact-form submissions
- **Users** — user account management (registration never grants admin)
- **Settings** — site-wide settings (contact email, socials, toggles)

### Backend

- RESTful JSON APIs for every resource (public + admin namespaces)
- JWT authentication via HTTP-only cookies, role-based access control
- Request validation with Yup, ObjectId checks, mass-assignment protection
- Rate limiting on auth and contact endpoints
- Contact flow: persist first, fire-and-forget Resend email notification

---

## 🛠️ Tech stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js 14 (App Router), React 19, TypeScript                |
| Styling    | Tailwind CSS v4, custom "Midnight Forge" design tokens       |
| Fonts      | Space Grotesk, JetBrains Mono, Hanken Grotesk (`next/font`)  |
| Database   | MongoDB + Mongoose                                           |
| Auth       | JWT (HTTP-only cookies), bcryptjs                            |
| Validation | Yup                                                          |
| Email      | Resend (contact-form notifications)                          |
| Uploads    | Cloudinary (project images, profile/hero images, resume PDF) |
| Icons/UI   | Lucide React, Radix UI primitives                            |
| Deploy     | Vercel                                                       |

---

## 🚀 Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone and install

```bash
git clone https://github.com/Murtuza-Ahmed/portfolio.git
cd portfolio
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```env
# Required
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio
JWT_SECRET=<a-long-random-string>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<at-least-12-characters>

# Contact-form email notifications (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=you@example.com
# CONTACT_FROM_EMAIL=Portfolio <noreply@yourdomain.com>  # optional

# Image / file uploads (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

> `.env*` files are gitignored — never commit secrets.

### 3. Seed the admin user

```bash
npm run admin
```

This creates the admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
(or prints a generated secure password if `ADMIN_PASSWORD` is not set).

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 — the admin panel lives at
http://localhost:3000/admin.

---

## 📁 Project structure

```
app/
  (site)/            # public pages: home, about, projects, resume, contact
  (admin)/           # admin panel pages (login, dashboard, skills, …)
  api/
    projects/        # public project listing (active + completed)
    skills/          # public skills (filterable by skillType)
    contact/         # contact submissions + Resend notification
    admin/           # protected CRUD for every resource
    auth/            # login / logout / me
components/          # navigation, footer, forge design-system helpers, ui/
views/
  home|about|projects|resume|contact/   # public page views
  admin/             # admin page views
models/              # Mongoose models (Project, Skill, Experience, …)
lib/
  validations/       # Yup schemas
  utils/api.ts       # pagination / filter / response helpers
scripts/seed.ts      # admin seeding (npm run admin)
```

### Key API routes

| Method | Route                                           | Access |
| ------ | ----------------------------------------------- | ------ |
| GET    | `/api/projects?featured=true`                   | public |
| GET    | `/api/skills?skillType=engineering`             | public |
| POST   | `/api/contact`                                  | public |
| POST   | `/api/auth/login`                               | public |
| GET    | `/api/admin/dashboard`                          | admin  |
| CRUD   | `/api/admin/{projects,skills,users,messages,…}` | admin  |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add **all** environment variables from `.env.local` in the Vercel
   project settings.
3. Deploy — Vercel builds with `npm run build` automatically.
4. Run the seed once against the production database to create the admin
   user (e.g. `MONGODB_URI=<prod-uri> npm run admin` locally, then unset).

---

## 📝 Notes

- New registrations are created with the `user` role — admin access is only
  granted via the seeded account or by an existing admin.
- Projects with status `archived` are hidden from the public site;
  `active` and `completed` projects are shown.
- The contact endpoint stores the message **before** sending the email, so a
  mail-provider outage never loses a submission.

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.
