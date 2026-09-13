# BoxOffice Mojo — Owner

Standalone frontend repository for the Owner application.

## Cloudflare Pages
- Production branch: `main`
- Root directory: repository root
- Build command: `npm run build`
- Build output directory: `.`
- Environment variable: `BO_API_BASE=https://YOUR-BACKEND-DOMAIN/api`

The build writes `config.js` from `BO_API_BASE`. Never put secrets in this repository or browser code.

## Local
```powershell
npm run build
```
Without `BO_API_BASE`, the local default is `/api`.
