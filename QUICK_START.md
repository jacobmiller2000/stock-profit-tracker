# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

### Daily Prompt
- Automatically appears at **4:30pm CST** every day
- Prompts you to enter:
  - Real Account Profit ($)
  - Real Account Percentage Gain (%)
  - Paper Trading Profit ($)
  - Paper Trading Percentage Gain (%)

### Manual Entry
- Click the **"Add Daily Entry"** button in the top right to manually add today's entry
- Use **"Add Historical Data"** button to add past entries

### Dashboard
- **Stats Cards**: View total profits, averages, and days tracked
- **Cumulative Profit Chart**: See how your total profits grow over time
- **Daily Profit Chart**: Track daily profit fluctuations
- **Percentage Gains Chart**: Monitor percentage performance
- **Recent Entries Table**: Review all your entries

## Sharing with Others

Since this is a shared dashboard:
1. Deploy the app to a hosting service (Vercel, Netlify, etc.)
2. Share the URL with your coworker and investor
3. Only you need to input data - they can view everything

## Adding Historical Data

1. Click the **"Add Historical Data"** button on the dashboard
2. Select the date
3. Enter the profit and percentage data
4. Click **"Save Entry"**

## Data Storage

- Data is stored in `data/entries.json`
- **Important**: Back up this file regularly!
- For production, consider migrating to a database (PostgreSQL, MongoDB, etc.)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

### Other Options
- Netlify
- Railway
- Render
- Any Node.js hosting service

## Troubleshooting

### Daily prompt not showing?
- Make sure your browser's timezone is set correctly
- The prompt only shows once per day after 4:30pm CST
- You can manually trigger it with the "Add Daily Entry" button

### Data not saving?
- Check that the `data` directory exists and is writable
- Check browser console for errors
- Verify the API route is working: `/api/entries`
