# Digital Restaurant Menu Platform

A multilingual digital menu for a confectionery store. Customers browse items via phone; the owner manages content through Strapi CMS.

## Supported Languages
- Arabic (ar) — default, RTL
- English (en) — LTR
- Kurdish Sorani (ckb) — RTL

## Architecture
| Service | Tech | Host |
|---|---|---|
| Customer frontend | Next.js 16 | Vercel (free) |
| CMS & Admin panel | Strapi | Render Starter ($7/mo) |
| Database | PostgreSQL | Supabase (free) |
| Image storage | Cloudflare R2 | Cloudflare (free) |

## Local Development

### 1. Start the CMS (Strapi)
```bash
cd cms
cp .env.example .env   # fill in your values
npm install
npm run develop
```
Strapi admin: http://localhost:1337/admin

### 2. Start the Frontend (Next.js)
```bash
cd web
cp .env.local.example .env.local   # fill in your values
npm install
npm run dev
```
Frontend: http://localhost:3000 → redirects to http://localhost:3000/ar

## Deployment

### Strapi → Render
1. Push `cms/` to a Git repo
2. Create a new **Web Service** on Render, connect the repo
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add all environment variables from `cms/.env.example`

### Next.js → Vercel
1. Push `Client/` to a Git repo
2. Import project on Vercel
3. Add `NEXT_PUBLIC_STRAPI_URL` environment variable pointing to your Render URL

## Environment Variables

### web/.env.local
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.onrender.com
```

### cms/.env
```
DATABASE_CLIENT=postgres
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=true

CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET=
CLOUDFLARE_R2_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
CLOUDFLARE_R2_PUBLIC_URL=https://pub-XXXX.r2.dev

APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
```

## Strapi Setup After First Deploy
1. Open `/admin` and create your owner account
2. Go to **Settings → Roles → Public**
3. Enable `find` and `findOne` for both `Category` and `MenuItem`
4. Go to **Settings → Internationalization** and add: `ar`, `en`, `ckb`
5. Set `ar` as the default locale

## Content Entry Workflow
1. Create categories (Sweets, Grills, Drinks…) in all 3 locales
2. Add menu items — fill name, description, price, upload image, select category
3. Switch locale in the content manager to add Arabic/Kurdish translations
4. Toggle `isAvailable` to false to hide an item from customers instantly (within 1 min)
