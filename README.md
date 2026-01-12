# Stock Profit Tracker

A beautiful web application to track your stock market profits from real and paper trading accounts, with daily prompts and comprehensive visualizations.

## Features

- 📊 **Daily Profit Tracking**: Automatic prompt at 4:30pm CST to enter daily profits
- 💰 **Dual Account Support**: Track both real account and paper trading profits separately
- 📈 **Beautiful Visualizations**: Multiple charts showing cumulative profits, daily profits, and percentage gains
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- 🌙 **Dark Mode**: Automatic dark mode support
- 📋 **Data Table**: View all entries in a sortable table
- 🔄 **Shareable**: Share the dashboard with your coworker and investor

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## Usage

### Daily Entry

The application will automatically prompt you at 4:30pm CST to enter:
- Real Account Profit ($)
- Real Account Percentage Gain (%)
- Paper Trading Profit ($)
- Paper Trading Percentage Gain (%)

You can also manually add entries by clicking the prompt or adding entries through the API.

### Viewing Data

The dashboard displays:
- **Stats Cards**: Total profits, average percentages, and days tracked
- **Cumulative Profit Chart**: Shows how your total profits grow over time
- **Daily Profit Chart**: Shows daily profit fluctuations
- **Percentage Gains Chart**: Tracks percentage performance over time
- **Recent Entries Table**: View and review all your entries

### Adding Historical Data

You can add historical data by:
1. Using the API endpoint `POST /api/entries` with a date in the past
2. Manually editing the `data/entries.json` file (make sure to follow the correct format)

## Data Storage

Data is stored in `data/entries.json`. Make sure to back up this file regularly.

## Deployment

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting service**

Make sure to set up proper file storage or migrate to a database for production use.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **date-fns** - Date handling

## License

MIT
