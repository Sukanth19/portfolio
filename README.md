# Sukanth - Portfolio

Personal portfolio: a loud acid-green and black poster layout with a live GitHub feed.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS
- Fonts: Archivo Black (display) and JetBrains Mono
- GitHub GraphQL and REST APIs for the live commit log and top repos

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub integration

Commits and repos are fetched server-side through `app/api/github/*`, so the token never reaches the browser. Without a token it falls back to the public REST API.

```env
GITHUB_TOKEN=your_github_token_here   # scopes: public_repo, read:user
GITHUB_USERNAME=Sukanth19
```

`npm run test:github` checks that the token works.

## Project structure

```
app/
  page.tsx              # the whole homepage
  globals.css           # colours, keyframes, crosshair cursor
  api/github/           # build-log and repos endpoints
components/poster/      # GitHubActivity (client-side live feed)
data/                   # projects, experience, lab, tech, socials
lib/github.ts           # GitHub API helpers
public/                 # resume.pdf, favicon
```

To update content, edit the files in `data/`.

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve the build
npm run lint         # eslint
npm run test:github  # test the GitHub token
```

## Deploy

Deployed on Vercel. Add `GITHUB_TOKEN` and `GITHUB_USERNAME` under Project Settings → Environment Variables.
