---
description: Start local development server to preview website changes
---

# Preview Website Locally

Use this workflow to preview your website changes before deploying.

## Steps

// turbo
1. Start the development server:
```powershell
npm run dev
```

2. Open your browser to the URL shown (usually http://localhost:5173)

3. Make changes in Antigravity - the browser will auto-refresh

4. When done previewing, press Ctrl+C in the terminal to stop the server

## Notes
- Changes appear instantly in the browser (hot reload)
- This does NOT affect your live site
- Use /deploy when ready to push changes live
