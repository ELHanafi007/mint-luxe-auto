# Mint0lux Admin Dashboard

This is the fresh, professional admin dashboard for Mint0lux. It is built using Next.js App Router, CSS Modules, and Lucide icons.

## Getting Started

### Access
- URL: `/admin/login`
- Default Email: `admin@mint0lux.com`
- Default Password: `mint0lux-default-pass` (Can be changed via `ADMIN_PASSWORD_HASH` env var)

### Features
1. **Dashboard**: High-level overview of inventory and system health.
2. **Inventory Management**: Full CRUD for vehicles with image gallery and technical specs.
3. **Content Management (CMS)**: Edit static pages (About, Services, etc.) with markdown support.
4. **Site Settings**: Manage site metadata, contact info, and social links.
5. **Activity Logs**: Track all administrative actions.

## Technical Details

### Architecture
- **Routes**: Located in `src/app/admin/` and `src/app/api/admin/`.
- **Authentication**: JWT-based with `jose`, stored in `httpOnly` cookies.
- **Data Storage**: File-based JSON storage in `src/data/admin/` (easy migration to DB later).
- **Security**: Route protection via Next.js Middleware and API token verification.

### File Structure
- `src/app/admin/`: Admin pages and layouts.
- `src/app/api/admin/`: Backend API routes for admin functions.
- `src/components/admin/`: Reusable admin UI components.
- `src/data/admin/`: JSON data files (Vehicles, Settings, Pages, Logs).

## Maintenance
To add new features, ensure that new API routes verify the admin session using the `verifyToken` utility in `@/lib/admin/jwt`.
