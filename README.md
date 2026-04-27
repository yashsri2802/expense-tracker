# Fenmo Expense Tracker

A production-quality full-stack expense tracker built designed for speed, idempotency validation, and dynamic responsive interactions. 

## Tech Stack
- **Backend**: Node.js, Express, SQLite (`better-sqlite3`), Zod (Input Validation), UUID
- **Frontend**: Vite, React 18, TypeScript, TailwindCSS/Vanilla CSS, TanStack/React Query, Axios

## Powerful Features
1. **Idempotent POST Mutations**: Generates a random `x-idempotency-key` via `UUID` on the frontend before saving. If you experience network drops or spam the Add button, the backend intelligently blocks duplicate entries.
2. **React Query Intelligent Caching**: All lists and filtering logic run entirely dynamically. When adding an expense, the `['expenses']` cache invalidates, automatically triggering the fresh data to load.
3. **Float Precision Guarantee**: Amounts are stored deeply as integer values (paise/cents) to prevent trailing float errors during calculations, while dynamically rendering nicely in the UI.
4. **Vibrant Glassmorphism GUI**: CSS variables integrated with a `dark/light mode` override provide a sleek Apple-like transparency pane effect with hover scale micro-animations.

## Running Locally

### 1. Terminal Window 1 (Backend API)
```bash
cd backend
npm install
npm run seed  # Generates database.sqlite and inserts dummy data
npm run dev   # Starts backend on http://localhost:3001
```

### 2. Terminal Window 2 (Frontend App)
```bash
cd frontend
npm install
npm run dev   # Starts frontend on http://localhost:5173
```
