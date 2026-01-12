# Quick Fix: Make Your Vercel App Work with Database

## The Problem
Vercel doesn't allow file writes, so your app can't save data. We're fixing this with Supabase (free database).

## Quick Steps (10 minutes)

### 1. Set Up Supabase (5 min)
Follow the detailed guide: `SUPABASE_SETUP.md`

**Quick version:**
1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project → Wait 2 minutes
3. Go to SQL Editor → Run the SQL from Step 3 of SUPABASE_SETUP.md
4. Copy your Project URL and anon key from Settings → API

### 2. Add to Vercel (2 min)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project → Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key
4. Save both

### 3. Push Updated Code (3 min)
```bash
# In your terminal
cd /Users/jacobmiller/Desktop/Cursor
git add .
git commit -m "Add Supabase database support"
git push
```

Vercel will auto-deploy. Wait 2 minutes, then test!

---

## Testing

1. Go to your Vercel URL
2. Click "Add Historical Data"
3. Fill in the form and save
4. ✅ Should work now!

---

## If It Still Doesn't Work

**Check Vercel Logs:**
1. Vercel Dashboard → Your Project → Deployments
2. Click latest deployment → "Logs" tab
3. Look for errors (they'll be red)

**Check Supabase:**
1. Supabase Dashboard → Table Editor
2. You should see `profit_entries` table
3. Data should appear when you save

**Common Issues:**
- "Invalid API key" → Double-check you copied the full key
- "Table doesn't exist" → Run the SQL from SUPABASE_SETUP.md Step 3
- "Still not saving" → Check Vercel logs for the actual error

---

## Need the Full Guide?
See `SUPABASE_SETUP.md` for step-by-step instructions with screenshots.
