# MERN Boilerplate

A clean starting point for **MongoDB · Express · React · Node** apps.

- **client/** — React 19 + Vite frontend with a working CRUD demo
- **server/** — Express 5 API with Mongoose, structured into routes / controllers / models

The two apps are managed as [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces), so a single `npm install` at the root installs both and there is one shared `package-lock.json`.

## Structure

```
mern-boilerplate/
├── client/                 # React + Vite
│   ├── src/
│   │   ├── api.js          # fetch wrapper for the API
│   │   ├── App.jsx         # CRUD demo UI
│   │   └── main.jsx
│   ├── vite.config.js      # dev proxy: /api -> http://localhost:4000
│   └── .env.example
├── server/                 # Express + MongoDB
│   ├── config/db.js        # Mongoose connection
│   ├── models/Item.js      # sample Mongoose model
│   ├── controllers/        # request handlers
│   ├── routes/             # route definitions
│   ├── middleware/         # error handler
│   ├── index.js            # app entry
│   └── .env.example
├── package.json            # workspaces + scripts to run both apps
├── package-lock.json       # single shared lockfile
└── .gitignore
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A MongoDB database — local ([MongoDB Community](https://www.mongodb.com/try/download/community)) or hosted ([MongoDB Atlas](https://www.mongodb.com/atlas))

## Getting started

**1. Install dependencies for both workspaces (one command, from the repo root):**

```bash
npm install
```

**2. Configure environment variables:**

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` and set `MONGO_URI` to your database connection string.

**3. Run both apps together (from the repo root):**

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:4000

Or run them separately with `npm run dev:server` and `npm run dev:client`.

## API

Base path: `/api`

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/health`     | Health check       |
| GET    | `/api/items`      | List all items     |
| GET    | `/api/items/:id`  | Get one item       |
| POST   | `/api/items`      | Create an item     |
| PATCH  | `/api/items/:id`  | Update an item     |
| DELETE | `/api/items/:id`  | Delete an item     |

Item body: `{ "name": "string (required)", "description": "string (optional)" }`

## Scripts (root)

| Script                 | Action                                        |
| ---------------------- | --------------------------------------------- |
| `npm install`          | Install deps for both workspaces              |
| `npm run dev`          | Run server and client together                |
| `npm run dev:server`   | Run the Express server only (nodemon)         |
| `npm run dev:client`   | Run the Vite dev server only                  |
| `npm run build`        | Build the client for production               |
| `npm run start`        | Start the server in production mode           |

You can also target a workspace directly, e.g. `npm run dev -w server` or install a
package into one: `npm install axios -w client`.

## Notes

- `node_modules` and `.env` files are git-ignored. Only `.env.example` files are committed.
- The Vite dev server proxies `/api` to the Express server, so no CORS config or hardcoded backend URL is needed in development. For production, set `VITE_API_URL` in `client/.env`.
