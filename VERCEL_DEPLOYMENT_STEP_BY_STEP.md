# Step-by-Step: Deploying to Vercel (Beginner-Friendly)

This guide will walk you through every single step to get your app online and shareable.

---

## Part 1: Setting Up GitHub (Where Your Code Lives)

### Step 1: Create a GitHub Account

1. **Go to GitHub:**
   - Open your web browser
   - Go to: [https://github.com](https://github.com)

2. **Sign Up:**
   - Click the green "Sign up" button in the top right
   - Enter your email address
   - Create a username (like `jacobmiller` or `jacob-stocks`)
   - Create a password
   - Click "Create account"

3. **Verify Your Email:**
   - Check your email inbox
   - Click the verification link GitHub sent you

4. **Complete Setup:**
   - GitHub might ask a few questions (you can skip most)
   - Choose the free plan (it's free forever)

✅ **You now have a GitHub account!**

---

### Step 2: Install Git (If You Don't Have It)

Git is a tool that helps you upload code to GitHub.

1. **Check if you have Git:**
   - Open Terminal (the app you used to run `npm install`)
   - Type: `git --version`
   - Press Enter

2. **If you see a version number (like `git version 2.39.0`):**
   - ✅ You already have Git! Skip to Step 3.

3. **If you see "command not found":**
   - Install Git by running: `brew install git`
   - Wait for it to finish
   - Then check again: `git --version`

✅ **Git is now installed!**

---

### Step 3: Prepare Your Code for GitHub

1. **Open Terminal:**
   - Make sure you're in your project folder
   - Type: `cd /Users/jacobmiller/Desktop/Cursor`
   - Press Enter

2. **Initialize Git (Tell Git to Track This Folder):**
   ```bash
   git init
   ```
   - Press Enter
   - You should see: "Initialized empty Git repository"

3. **Add All Your Files:**
   ```bash
   git add .
   ```
   - Press Enter
   - (The period `.` means "all files in this folder")

4. **Create Your First "Save Point" (Commit):**
   ```bash
   git commit -m "First version of stock profit tracker"
   ```
   - Press Enter
   - You might see a message about setting your name/email first
   - If so, run these two commands:
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```
   - Then run the commit command again

✅ **Your code is ready to upload!**

---

### Step 4: Create a Repository on GitHub

1. **Go to GitHub:**
   - Open [https://github.com](https://github.com) in your browser
   - Make sure you're logged in

2. **Create a New Repository:**
   - Click the green "New" button (or the "+" icon in the top right, then "New repository")
   - You'll see a form to fill out

3. **Fill Out the Form:**
   - **Repository name:** `stock-profit-tracker` (or any name you like)
   - **Description (optional):** "Track stock market profits"
   - **Visibility:** Choose "Public" (free and easier) or "Private" (only you can see it)
   - **IMPORTANT:** Do NOT check "Add a README file" (you already have one)
   - **Do NOT** add a .gitignore or license (you already have these)

4. **Click the Green "Create repository" Button**

5. **You'll See Instructions - Copy the URL:**
   - You'll see a page with setup instructions
   - Look for a section that says "…or push an existing repository from the command line"
   - You'll see a URL like: `https://github.com/YOUR_USERNAME/stock-profit-tracker.git`
   - **Copy this URL** - you'll need it in the next step

✅ **Your GitHub repository is created!**

---

### Step 5: Upload Your Code to GitHub

1. **Back in Terminal, Run These Commands:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stock-profit-tracker.git
   ```
   - Replace `YOUR_USERNAME` with your actual GitHub username
   - Replace `stock-profit-tracker` with your repository name if different
   - Press Enter

2. **Rename Your Branch:**
   ```bash
   git branch -M main
   ```
   - Press Enter

3. **Upload Your Code:**
   ```bash
   git push -u origin main
   ```
   - Press Enter
   - **You'll be asked for your GitHub username and password:**
     - Username: Your GitHub username
     - Password: You might need to use a "Personal Access Token" instead of your password
     - If it asks for a token, see "GitHub Authentication" section below

4. **Wait for Upload:**
   - You'll see progress messages
   - When you see "Branch 'main' set up to track remote branch 'main'", you're done!

✅ **Your code is now on GitHub!**

---

### GitHub Authentication (If Password Doesn't Work)

GitHub no longer accepts passwords for Git operations. You need a Personal Access Token:

1. **Go to GitHub Settings:**
   - Click your profile picture (top right)
   - Click "Settings"
   - Scroll down and click "Developer settings" (left sidebar)
   - Click "Personal access tokens"
   - Click "Tokens (classic)"
   - Click "Generate new token" → "Generate new token (classic)"

2. **Create the Token:**
   - **Note:** "Stock Profit Tracker" (or any name)
   - **Expiration:** Choose how long (90 days is good)
   - **Scopes:** Check "repo" (this gives access to repositories)
   - Click "Generate token" at the bottom

3. **Copy the Token:**
   - **IMPORTANT:** Copy this token immediately - you won't see it again!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

4. **Use the Token:**
   - When Git asks for your password, paste the token instead
   - Username: Your GitHub username
   - Password: Paste the token

---

## Part 2: Deploying to Vercel (Making It Live on the Internet)

### Step 1: Sign Up for Vercel

1. **Go to Vercel:**
   - Open [https://vercel.com](https://vercel.com) in your browser

2. **Sign Up:**
   - Click "Sign Up" in the top right
   - Click "Continue with GitHub" (this is the easiest way)
   - You'll be asked to authorize Vercel
   - Click "Authorize Vercel" (this lets Vercel access your GitHub)

3. **Complete Setup:**
   - Vercel might ask for your name and company (you can skip company)
   - Click "Continue" or "Skip"

✅ **You're signed up for Vercel!**

---

### Step 2: Import Your Project

1. **On Vercel Dashboard:**
   - You should see a page that says "Create a New Project"
   - If not, click "Add New..." → "Project" in the top right

2. **Find Your Repository:**
   - You'll see a list of your GitHub repositories
   - Look for `stock-profit-tracker` (or whatever you named it)
   - Click "Import" next to it

3. **Configure Your Project:**
   - **Project Name:** Leave it as is (or change if you want)
   - **Framework Preset:** Should say "Next.js" (if not, select it)
   - **Root Directory:** Leave as `./` (default)
   - **Build Command:** Should say `npm run build` (default)
   - **Output Directory:** Leave as `.next` (default)
   - **Install Command:** Should say `npm install` (default)

4. **Environment Variables:**
   - You don't need any for now, so skip this

5. **Click "Deploy":**
   - The big blue button at the bottom

✅ **Deployment started!**

---

### Step 3: Wait for Deployment

1. **Watch the Progress:**
   - You'll see a progress screen
   - It shows steps like:
     - "Installing dependencies..."
     - "Building..."
     - "Deploying..."

2. **This Takes 1-3 Minutes:**
   - Be patient! Vercel is:
     - Downloading your code
     - Installing all the packages
     - Building your app
     - Putting it online

3. **When It's Done:**
   - You'll see "Congratulations! Your project has been deployed"
   - You'll see a URL like: `https://stock-profit-tracker.vercel.app`

✅ **Your app is live!**

---

### Step 4: Test Your App

1. **Click the URL:**
   - Click on the URL Vercel gave you
   - Or copy it and paste it in a new browser tab

2. **You Should See:**
   - Your Stock Profit Tracker dashboard
   - The same thing you saw on localhost:3000
   - But now it's on the internet!

3. **Try Adding Data:**
   - Click "Add Daily Entry"
   - Add some test data
   - Make sure it saves correctly

✅ **Everything works!**

---

### Step 5: Share Your App

1. **Get Your URL:**
   - Your app URL is: `https://stock-profit-tracker.vercel.app` (or similar)
   - This is your shareable link!

2. **Share It:**
   - Send this URL to your coworker
   - Send it to your investor
   - They can open it in any web browser
   - They can see all your data and charts!

3. **Bookmark It:**
   - Bookmark the URL so you can easily access it
   - You can also bookmark the Vercel dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)

✅ **Your app is shareable!**

---

## Part 3: Updating Your App (When You Make Changes)

When you make changes to your code and want to update the live app:

1. **Make Your Changes:**
   - Edit files in your project
   - Test locally with `npm run dev`

2. **Save Changes to GitHub:**
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```

3. **Vercel Auto-Deploys:**
   - Vercel automatically detects the changes
   - It rebuilds and redeploys your app
   - Your live app updates in 1-2 minutes
   - No extra steps needed!

---

## Troubleshooting

### "Repository not found"
- Make sure you're logged into the correct GitHub account
- Make sure the repository name matches exactly

### "Build failed"
- Check the build logs in Vercel (click on your project → "Deployments" → click the failed deployment)
- Common issues:
  - Missing dependencies (check package.json)
  - TypeScript errors (fix them locally first)

### "Can't push to GitHub"
- Make sure you're using a Personal Access Token (not password)
- Check that you have the correct repository URL

### "App shows error page"
- Check the Vercel logs
- Make sure `data` directory exists (it should be created automatically)
- Try redeploying

---

## Need More Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Docs:** [docs.github.com](https://docs.github.com)
- **Vercel Support:** Very responsive on Twitter/X: @vercel

---

## Summary Checklist

- [ ] Created GitHub account
- [ ] Installed Git
- [ ] Initialized Git in project folder
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Created Vercel account
- [ ] Imported project to Vercel
- [ ] Deployed successfully
- [ ] Tested the live app
- [ ] Shared URL with coworker and investor

**You're all set! 🎉**
