# DevstockHub — e-commerce store in Next.js

An online electronics store built as the project of the Devstock Next.js course, based on a provided Figma design.

**Live demo:** _coming soon (Vercel)_

## Features

- Registration and login (next-auth), with every route except login and register protected
- Home page with a category carousel, category tiles, recommendations and brands
- Product list with category and price filters, sorting and pagination
- Product details with gallery, expandable description and an estimated delivery date
- Cart stored in the database, with quantity changes and item removal
- Checkout with saved addresses and an order summary
- User profile with transaction history

## Tech stack

- **Next.js 16** (App Router) and **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **PostgreSQL** with **Prisma ORM**
- **next-auth** for authentication
- **Docker** for the local database

## Getting started

Requirements: **Node.js 20+** and **Docker**.

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file and set NEXTAUTH_SECRET to any random string
cp .env.example .env

# 3. Start the database container
npm run db:up

# 4. Apply migrations (also generates the Prisma client)
npm run prisma:migrate

# 5. Fill the database with sample data
npm run db:seed

# 6. Start the app
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

> The database container listens on port **5433**, not the default 5432, so it does not clash with a locally installed PostgreSQL.

### Test account

The seed script creates a ready-to-use account:

| Email             | Password    |
| ----------------- | ----------- |
| `bartek@test.com` | `bartek123` |

## Scripts

| Script                   | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `npm run dev`            | Starts the database container and the dev server          |
| `npm run build`          | Generates the Prisma client and builds the app            |
| `npm run start`          | Runs the production build                                 |
| `npm run lint`           | Runs ESLint                                               |
| `npm run db:up`          | Starts the database container                             |
| `npm run db:down`        | Stops the database container                              |
| `npm run db:reset`       | Recreates the database container and **deletes all data** |
| `npm run db:seed`        | Clears the database and fills it with sample data         |
| `npm run prisma:migrate` | Applies migrations and generates the Prisma client        |
| `npm run prisma:studio`  | Opens Prisma Studio to browse the database                |

## Project structure

```
src/
├── app/          # Routes: (auth) and (shop) page groups, plus api/ route handlers
├── components/   # UI components, layout, icons and context providers
├── data/         # Server-side data fetchers used by Server Components
├── hooks/        # Client-side React hooks
├── lib/          # Shared logic: auth config, Prisma client, pricing, helpers
├── types/        # Shared TypeScript types for API responses
└── proxy.ts      # Route protection (redirects signed-out users to login)
```
