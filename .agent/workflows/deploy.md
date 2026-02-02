---
description: Deploy website updates to Netlify (push changes live)
---

# Deploy to Netlify

Use this workflow after making changes to push them live to your website.

## Prerequisites
- Changes have been made to the website code
- You're in the NovaRey Website directory

## Steps

// turbo
1. Stage all changes:
```powershell
git add .
```

2. Commit with a descriptive message:
```powershell
git commit -m "describe your changes here"
```

// turbo
3. Push to GitHub (triggers automatic Netlify deploy):
```powershell
git push
```

4. Wait 1-2 minutes for Netlify to build and deploy

5. Verify the live site at your domain or https://novarey.netlify.app

## Notes
- Netlify automatically detects pushes to GitHub and rebuilds
- You can view deploy status at https://app.netlify.com
- If deploy fails, check Netlify dashboard for error logs
