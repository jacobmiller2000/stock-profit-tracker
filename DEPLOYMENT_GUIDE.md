# Deployment Guide - Making Your App Shareable

## Option 1: Vercel (Recommended - Easiest for Next.js)

Vercel is made by the creators of Next.js, so it's the simplest option.

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com)
2. Sign up for a free account

### Step 2: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd /Users/jacobmiller/Desktop/Cursor
   git init
   git add .
   git commit -m "Initial commit - Stock Profit Tracker"
   ```

2. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Name it something like `stock-profit-tracker`
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stock-profit-tracker.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 3: Deploy to Vercel

1. **Sign up for Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and use your GitHub account

2. **Import your project:**
   - Click "Add New Project"
   - Select your `stock-profit-tracker` repository
   - Click "Import"

3. **Configure (usually auto-detected):**
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment

5. **Get your shareable URL:**
   - Once deployed, you'll get a URL like: `https://stock-profit-tracker.vercel.app`
   - **This is your shareable link!** Send this to your coworker and investor

### Step 4: Share the Link

- Your app will be live at: `https://your-project-name.vercel.app`
- Anyone with the link can view it
- Only you can add/edit data (since there's no login system)

---

## Option 2: Netlify (Alternative)

1. **Push to GitHub** (same as Step 2 above)

2. **Sign up for Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Deploy:**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

4. **Get your URL:**
   - You'll get a URL like: `https://your-project-name.netlify.app`

---

## Option 3: Railway (Good for persistent data)

1. **Sign up:** [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub repo
3. **Add Environment Variables** (if needed)
4. **Deploy** - Get your URL

---

## Important Notes

### Data Storage
- Currently, data is stored in `data/entries.json` on the server
- **For production**, consider:
  - Using a database (PostgreSQL, MongoDB)
  - Or use Vercel's serverless functions with a database
  - Or use a service like Supabase (free tier available)

### Making it More Secure (Optional)
- Add authentication so only you can add data
- Add password protection
- Use environment variables for sensitive data

### Custom Domain (Optional)
- Vercel/Netlify allow custom domains
- You can use your own domain name if you have one

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel/Netlify account created
- [ ] Project imported and deployed
- [ ] URL obtained and tested
- [ ] Share URL with coworker and investor

---

## Troubleshooting

### Build fails?
- Check that all dependencies are in `package.json`
- Make sure `data` directory exists (it should be created automatically)

### Data not persisting?
- File-based storage works on Vercel, but consider a database for production
- Check that the `data` directory is writable

### Need help?
- Vercel has great docs: [vercel.com/docs](https://vercel.com/docs)
- Check the deployment logs in Vercel dashboard
