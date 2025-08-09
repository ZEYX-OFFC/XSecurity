# Ovalium XSecu — Vercel (Serverless API + Next.js Admin)

Satu repo untuk:
- **License API (NestJS)** berjalan sebagai **Vercel Serverless Function** di `/api/xsecu`
- **Admin Dashboard (Next.js)** di root (pages: `/`, `/admin/*`)
- **Telegram Webhook** opsional di `/api/telegram`

## Deploy
1) Set env di Vercel Project:
   - `DATABASE_URL` (Postgres serverless)
   - `LIC_PRIVATE_KEY_PEM`, `LIC_PUBLIC_KEY_PEM`
   - `PEPPER`
   - `ADMIN_SECRET` (wajib untuk admin endpoints)
   - (opsional) `NEXT_PUBLIC_XSECU_BASE` untuk override base API (default relatif)
   - (opsional) `NEXT_PUBLIC_ADMIN_SECRET` untuk isi otomatis secret di UI (hindari di produksi)
   - (opsional) `BOT_TOKEN` bila pakai webhook
2) Deploy → build akan:
   - Build `server/` (NestJS) → `dist/`
   - Build `web/` (Next.js)
3) Akses:
   - API: `https://<app>.vercel.app/api/xsecu/v1/health`
   - Admin UI: `https://<app>.vercel.app/`
   - JWKS: `https://<app>.vercel.app/api/xsecu/.well-known/jwks.json`
   - Webhook: `https://<app>.vercel.app/api/telegram`

## Catatan
- Admin endpoints dijaga oleh header `x-admin-secret`. Set `ADMIN_SECRET` yang kuat di Vercel.
- Jangan kirim BOT_TOKEN ke server lisensi — kirim **hash** (client hashing).
- Untuk migrasi schema Prisma gunakan pipeline/CI atau jalankan `prisma migrate deploy` dari environment yang memiliki akses DB.
