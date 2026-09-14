# Mojo Owner — Responsive/Deployment Repair

Implemented:
- Viewport-centered Box Office Mojo logo using fixed `left: 50%` + `translateX(-50%)`.
- Fluid logo sizing with `clamp()`/`min()` and safe viewport width.
- Height/orientation-aware logo placement without coupling to the login card.
- Fixed published login asset paths that caused 404/MIME errors.
- Cloudflare `_redirects` and `_headers` are copied into `dist` by the build.
- Removed Customer Service/password-support UI from Owner Login.
- Added Owner Orders & Commissions page backed by the existing `/owner/overview` data.
- Added compact mobile SVG navigation for Overview/Admins/Clients/Orders/Settings.
- Existing Owner authentication/API calls remain unchanged.

Build command: `npm run build owner`
Publish directory: `dist`
