# BoxOffice Owner — Deployment Ready

## Cloudflare Pages
- Repository: `Liu-Kai-Mojo/Mojo-owner`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root / blank

## API
The production frontend defaults to:
`https://boxoffice-platform-production.up.railway.app`

`bo_api` is only honored on localhost. A stale browser localStorage value cannot override the production API URL.

## Routing
Cloudflare Pages clean URLs serve matching `.html` files automatically. `_redirects` contains only the root redirect to `/login`; no unsupported 200 rewrite rules are used.

Important routes:
- `/login`
- `/dashboard`
- `/admins`
- `/clients`
- `/settings`
- `/support`
