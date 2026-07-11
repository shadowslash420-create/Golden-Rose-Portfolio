# Golden Rose Bakes

A bespoke cake & gâteau portfolio for @golden_rose_bakes — lets visitors browse floral cake work and submit custom order inquiries that are emailed directly to the admin.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `ADMIN_EMAIL` — Gmail address that receives inquiry notifications
- Required env: `EMAIL_PASSWORD` — Gmail App Password for sending emails

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- API: Express 5 + nodemailer (email delivery)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/golden-rose-portfolio/` — React frontend (portfolio + inquiry form)
- `artifacts/golden-rose-portfolio/public/gallery/` — AI-generated cake images (6 photos)
- `artifacts/api-server/src/routes/inquire.ts` — POST /api/inquire → sends email via nodemailer
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/api-client-react/src/generated/` — generated React Query hooks

## Architecture decisions

- No database needed — inquiry form sends email directly to admin via Gmail/nodemailer
- OpenAPI-first: spec defines the /api/inquire contract, codegen produces typed hooks
- Single-page portfolio (no client-side routing needed beyond base route)
- Cake gallery images are AI-generated and stored in the public/ folder as static assets

## Product

Visitors can browse a gallery of bespoke floral cakes and gâteaux, then fill out an inquiry form specifying their event date, guest count, occasion type, and design notes. On submit, the admin receives a formatted HTML email at ADMIN_EMAIL with all inquiry details and a reply-to pointing at the client.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- EMAIL_PASSWORD must be a Gmail App Password, not the regular account password. Create one at: myaccount.google.com → Security → 2-Step Verification → App passwords
- Google Fonts @import must be the FIRST line in index.css (before tailwindcss import) to avoid PostCSS warnings

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
