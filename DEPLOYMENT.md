# Deploying to Vercel

## Prerequisites

- A [Vercel](https://vercel.com) account
- This repo pushed to GitHub, GitLab, or Bitbucket (or use Vercel CLI)

## Steps

### 1. Connect the repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Vercel will detect the Vite app and use the settings from `vercel.json`:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Framework:** Vite

### 2. Set environment variables

In the Vercel project: **Settings → Environment Variables**, add:

| Name             | Value              | Environments   |
|------------------|--------------------|----------------|
| `GEMINI_API_KEY` | Your Gemini API key| Production, Preview |

Get an API key from [Google AI Studio](https://aistudio.google.com/apikey).  
Do not commit this key; it is only used by the serverless function `api/chat.js`.

### 3. Deploy

- **From Git:** Push to your main branch; Vercel will build and deploy automatically.
- **From CLI:** Run `npx vercel` in the project root (install with `npm i -g vercel` if needed).

## What gets deployed

- **Static frontend:** Built with Vite from `src/` and served from `dist/`.
- **API route:** `api/chat.js` is deployed as a serverless function at `/api/chat` (chat uses this for Gemini).
- **Routing:** Non-API routes are rewritten to `index.html` so React Router handles `/`, `/projects`, `/projects/:id`, etc.

## Local preview with Vercel

To run the app locally with the same config and serverless functions:

```bash
npm i -g vercel
vercel dev
```

This runs the Vite app and the `/api/chat` function; set `GEMINI_API_KEY` in a `.env` file or in the Vercel project env for local use.
