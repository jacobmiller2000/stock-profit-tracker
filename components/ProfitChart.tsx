'use client'

import { ProfitEntry } from '@/types'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'

interface ProfitChartProps {
  entries: ProfitEntry[]
}

export default function ProfitChart({ entries }: ProfitChartProps) {
  if (entries.length === 0) {
    return null
  }

  // Calculate cumulative profits
  let cumulativeReal = 0
  let cumulativePaper = 0
  const chartData = entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => {
      cumulativeReal += entry.realAccountProfit
      cumulativePaper += entry.paperTradingProfit
      return {
        date: format(parseISO(entry.date), 'MMM d'),
        fullDate: entry.date,
        realProfit: entry.realAccountProfit,
        paperProfit: entry.paperTradingProfit,
        cumulativeReal,
        cumulativePaper,
        totalCumulative: cumulativeReal + cumulativePaper,
        realPercentage: entry.realAccountPercentage,
        paperPercentage: entry.paperTradingPercentage,
      }
    })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              })}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Cumulative Profit Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Cumulative Profit Over Time
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPaper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="cumulativeReal"
              name="Real Account (Cumulative)"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorReal)"
            />
            <Area
              type="monotone"
              dataKey="cumulativePaper"
              name="Paper Trading (Cumulative)"
              stroke="#eab308"
              fillOpacity={1}
              fill="url(#colorPaper)"
            />
            <Area
              type="monotone"
              dataKey="totalCumulative"
              name="Total (Cumulative)"
              stroke="#10b981"
              fillOpacity={0.3}
              fill="#10b981"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Profit Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Daily Profit
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="realProfit"
              name="Real Account"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="paperProfit"
              name="Paper Trading"
              stroke="#eab308"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage Gains Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Percentage Gains
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-slate-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
                      {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                          {entry.name}: {entry.value.toFixed(2)}%
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="realPercentage"
              name="Real Account %"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="paperPercentage"
              name="Paper Trading %"
              stroke="#eab308"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
