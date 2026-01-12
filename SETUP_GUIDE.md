# Setup Guide - Step by Step

## Step 1: Install Node.js

You need Node.js (version 18 or higher) to run this application.

### Option A: Install via Homebrew (Recommended for macOS)
```bash
brew install node
```

### Option B: Download from Official Website
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the installation instructions

### Option C: Install via nvm (Node Version Manager)
```bash
# Install nvm first
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Then install Node.js
nvm install --lts
nvm use --lts
```

## Step 2: Verify Installation

After installing Node.js, verify it's working:
```bash
node --version
npm --version
```

You should see version numbers (e.g., `v18.17.0` and `9.6.7`).

## Step 3: Install Project Dependencies

Navigate to the project folder and install dependencies:
```bash
cd /Users/jacobmiller/Desktop/Cursor
npm install
```

This will install all the required packages (Next.js, React, charting libraries, etc.).

## Step 4: Start the Development Server

Once dependencies are installed, start the server:
```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

## Step 5: Open in Browser

Open your web browser and go to:
**http://localhost:3000**

You should see your Stock Profit Tracker dashboard!

## Troubleshooting

### "command not found: npm"
- Make sure Node.js is installed (see Step 1)
- You may need to restart your terminal after installing Node.js
- On macOS, you might need to add Node.js to your PATH

### "EACCES" or permission errors
- Try using `sudo npm install` (not recommended for security)
- Better: Fix npm permissions: `mkdir ~/.npm-global && npm config set prefix '~/.npm-global'`

### Port 3000 already in use
- Stop any other applications using port 3000
- Or run on a different port: `PORT=3001 npm run dev`

## What's Next?

Once the app is running:
1. The dashboard will be empty initially (no data yet)
2. At 4:30pm CST, you'll see a daily prompt to enter your profits
3. You can manually add entries using the "Add Daily Entry" button
4. Use "Add Historical Data" to add past entries

## Need Help?

- Check the `README.md` for more details
- Check `QUICK_START.md` for quick reference
- The app stores data in `data/entries.json` - you can manually edit this file if needed
