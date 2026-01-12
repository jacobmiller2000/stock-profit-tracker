# Push Your Code to Fix Vercel (2 minutes)

Your code is ready but not pushed to GitHub yet. Vercel is still using the old code!

## Quick Fix - Run These Commands:

Open Terminal and run:

```bash
cd /Users/jacobmiller/Desktop/Cursor
git add .
git commit -m "Add Supabase database support"
git push
```

Wait 2 minutes for Vercel to auto-deploy, then test again!

---

## Step-by-Step:

1. **Open Terminal** (the app where you ran `npm install`)

2. **Navigate to your project:**
   ```bash
   cd /Users/jacobmiller/Desktop/Cursor
   ```

3. **Add all files:**
   ```bash
   git add .
   ```

4. **Commit (save) the changes:**
   ```bash
   git commit -m "Add Supabase database support"
   ```

5. **Push to GitHub:**
   ```bash
   git push
   ```
   - If it asks for credentials, use your GitHub username and Personal Access Token

6. **Wait for Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click your project
   - You'll see a new deployment starting
   - Wait 1-2 minutes for it to finish

7. **Test:**
   - Go to your Vercel URL
   - Try adding historical data again
   - Should work now! ✅

---

## Verify Environment Variables

While waiting, double-check your Vercel environment variables:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure you have:
   - `NEXT_PUBLIC_SUPABASE_URL` (should start with `https://`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (long string starting with `eyJ`)
3. Both should be set for "Production", "Preview", and "Development"

---

## If Push Fails

If `git push` fails, you might need to enter credentials:
- **Username:** Your GitHub username
- **Password:** Your Personal Access Token (not your password!)

See `GITHUB_TOKEN_GUIDE.md` if you need to create a new token.
