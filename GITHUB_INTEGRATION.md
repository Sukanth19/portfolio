# GitHub Integration Guide

This guide explains how to integrate live GitHub data into your portfolio.

## Features

✅ Live Build Log - Latest 10 commits automatically fetched  
✅ Repository Stats - Total commits, stars, forks displayed  
✅ Top Repositories - Your most starred repos showcased  
✅ Automatic Caching - Smart caching to avoid rate limits  
✅ Fallback Support - Uses static data if token missing

## Quick Setup

### 1. Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Website"
4. Select scopes:
   - ✅ `public_repo`
   - ✅ `read:user`
5. Generate and copy token

### 2. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
NEXT_PUBLIC_GITHUB_USERNAME=Sukanth19
```

### 3. Test and Run

```bash
npm install
npm run test:github
npm run dev
```

Open http://localhost:3000 and check:
- BUILD LOG section (live commits)
- TOP REPOSITORIES section (starred repos)

## Customization

### Change commit count (default: 10)
In `components/BuildLogSection.tsx`:
```typescript
fetchRecentCommits(username, token, 15)  // Change to 15
```

### Change repo count (default: 6)
In `components/TopRepositories.tsx`:
```typescript
fetchTopRepositories(username, token, 10)  // Change to 10
```

## Security

⚠️ Never commit `.env.local` - it's in `.gitignore`  
⚠️ Token is read-only, cannot modify repositories  
⚠️ Use environment variables in production deployment

## Troubleshooting

**No token found**: Create `.env.local` and restart server  
**API errors**: Check token scopes and expiration  
**No data showing**: Verify username and check console for errors

For detailed docs, see code comments in `lib/github.ts`
