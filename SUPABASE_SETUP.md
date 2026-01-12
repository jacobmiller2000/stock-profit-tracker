# Setting Up Supabase Database (Free & Easy)

Since Vercel doesn't allow file writes, we need a database. Supabase is free and perfect for this!

## Step 1: Create Supabase Account (2 minutes)

1. **Go to Supabase:**
   - Open [https://supabase.com](https://supabase.com) in your browser

2. **Sign Up:**
   - Click "Start your project" or "Sign Up"
   - Sign up with GitHub (easiest) or email
   - Verify your email if needed

3. **Create a New Project:**
   - Click "New Project"
   - **Name:** `stock-profit-tracker` (or any name)
   - **Database Password:** Create a strong password (SAVE THIS - you'll need it!)
   - **Region:** Choose closest to you (e.g., "US East")
   - Click "Create new project"
   - Wait 1-2 minutes for setup

✅ **Your Supabase project is being created!**

---

## Step 2: Get Your Database Credentials

1. **Go to Project Settings:**
   - In your Supabase dashboard, click the gear icon (⚙️) in the left sidebar
   - Click "API" or "Project Settings" → "API"

2. **Copy These Values:**
   - **Project URL:** Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key:** Long string starting with `eyJ...` (this is safe to use in frontend)
   - **service_role key:** Another long string (KEEP THIS SECRET - only for backend)

3. **Save These Somewhere Safe:**
   - You'll need them in the next step

✅ **You have your credentials!**

---

## Step 3: Create the Database Table

1. **Go to SQL Editor:**
   - In Supabase dashboard, click "SQL Editor" in the left sidebar
   - Click "New query"

2. **Run This SQL:**
   - Copy and paste this into the SQL editor:

```sql
-- Create the profit_entries table
CREATE TABLE IF NOT EXISTS profit_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  real_account_profit DECIMAL(10, 2) NOT NULL,
  paper_trading_profit DECIMAL(10, 2) NOT NULL,
  real_account_percentage DECIMAL(5, 2) NOT NULL,
  paper_trading_percentage DECIMAL(5, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_profit_entries_date ON profit_entries(date);

-- Enable Row Level Security (optional, but good practice)
ALTER TABLE profit_entries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (since it's a shared dashboard)
CREATE POLICY "Allow all operations" ON profit_entries
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

3. **Click "Run" or press Cmd+Enter:**
   - You should see "Success. No rows returned"

✅ **Your database table is created!**

---

## Step 4: Add Credentials to Vercel

1. **Go to Vercel Dashboard:**
   - Open [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your `stock-profit-tracker` project

2. **Go to Settings:**
   - Click "Settings" in the top menu
   - Click "Environment Variables" in the left sidebar

3. **Add These Variables:**
   - Click "Add New"
   
   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase Project URL (from Step 2)
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"
   
   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon/public key (from Step 2)
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"
   - Or push new code to trigger a redeploy

✅ **Your app is configured!**

---

## Step 5: Update Your Code

The code has been updated to use Supabase. Just make sure you:

1. **Pull the latest code** (if you're working locally)
2. **Install the Supabase package:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Supabase database support"
   git push
   ```

4. **Vercel will auto-deploy** with the new code

---

## That's It!

Your app will now:
- ✅ Save data to Supabase database
- ✅ Work on Vercel
- ✅ Persist data permanently
- ✅ Be shareable with your team

---

## Troubleshooting

### "Invalid API key"
- Double-check you copied the full key (they're very long)
- Make sure you used `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not service_role)

### "Table doesn't exist"
- Go back to Step 3 and make sure the SQL ran successfully
- Check the "Table Editor" in Supabase to see if the table exists

### "Still not saving"
- Check Vercel logs (Deployments → Click deployment → Logs tab)
- Check Supabase logs (Project → Logs → API Logs)

---

## Need Help?

- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: Very helpful community
