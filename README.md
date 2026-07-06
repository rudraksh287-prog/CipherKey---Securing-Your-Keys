# 🔐 CipherKey

CipherKey is a full stack MERN application built for securely storing, organizing, and managing your digital keys. Instead of scattering credentials across notes apps, browsers, and sticky notes, CipherKey gives you a single, centralized vault with a clean interface to add, view, edit, and remove your keys whenever you need them.

**Live App:** [cipher-key-securing-your-keys.vercel.app](https://cipher-key-securing-your-keys.vercel.app)

---

## Overview

Built on the MERN stack (MongoDB, Express, React, Node.js), CipherKey demonstrates a complete end to end architecture: a React frontend deployed on Vercel communicating with an Express REST API deployed on Render, backed by a MongoDB Atlas cluster for persistent, cloud hosted storage. It's designed to be lightweight, fast, and simple enough to extend into a full production grade credential manager.

---

## Features

- **Add new keys** with associated site, username, and secret value
- **Secure by default view** every key is masked on load and only revealed with a single click
- **One click copy** for site URLs, usernames, and key values straight to your clipboard
- **Edit in place** load any existing key back into the form to update it instantly
- **Delete with confirmation** prevents accidental removal of stored keys
- **Real time toast feedback** for actions like delete and copy, powered by react-toastify
- **Fully responsive layout** built with Tailwind CSS, usable across desktop and mobile
- **Persistent cloud storage** every key is synced to MongoDB Atlas, not just local state

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- react-toastify for notifications
- uuid for unique key identifiers

**Backend**
- Node.js
- Express.js REST API
- MongoDB with the native MongoDB Node.js driver
- CORS, dotenv, body-parser

**Deployment**
- Frontend hosted on [Vercel](https://vercel.com)
- Backend hosted on [Render](https://render.com)
- Database hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Project Structure

```
CipherKey---Securing-Your-Keys/
├── frontend/       React + Vite client
└── backend/        Express API and MongoDB connection layer
```

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas cluster (or a local MongoDB instance)

### 1. Clone the repo
```bash
git clone https://github.com/rudraksh287-prog/CipherKey---Securing-Your-Keys.git
cd CipherKey---Securing-Your-Keys
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the server:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

> Update the API base URL in the frontend if you want to point it at a local backend instead of the deployed Render URL.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/` | Fetch all stored keys |
| `POST`   | `/` | Add a new key entry |
| `DELETE` | `/` | Remove a key entry by its `id` |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string used to authenticate and connect to your cluster |
| `PORT` | Port the backend server listens on |

For production, these same variables need to be set inside your Render service's Environment tab, and your MongoDB Atlas project's Network Access list needs to allow connections from `0.0.0.0/0` so Render's dynamic IPs can reach your cluster.

---

## Roadmap

Some ideas for where CipherKey could go next:

- User authentication so each person has their own private vault
- Client side encryption before keys ever reach the database
- Password strength indicator when adding a new key
- Search and filter across stored keys
- Export/import functionality for backups

---

## Author

**Rudraksh Gupta**
GitHub: [@rudraksh287-prog](https://github.com/rudraksh287-prog)

