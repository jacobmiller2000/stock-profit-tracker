'use client'

import { ProfitEntry } from '@/types'
import ProfitChart from './ProfitChart'
import StatsCards from './StatsCards'
import AddHistoricalData from './AddHistoricalData'
import { format, parseISO } from 'date-fns'

interface DashboardProps {
  entries: ProfitEntry[]
  onRefresh: () => void
  onManualEntry: () => void
}

export default function Dashboard({ entries, onRefresh, onManualEntry }: DashboardProps) {
  const totalRealProfit = entries.reduce((sum, e) => sum + e.realAccountProfit, 0)
  const totalPaperProfit = entries.reduce((sum, e) => sum + e.paperTradingProfit, 0)
  const totalProfit = totalRealProfit + totalPaperProfit

  const avgRealPercentage = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.realAccountPercentage, 0) / entries.length
    : 0

  const avgPaperPercentage = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.paperTradingPercentage, 0) / entries.length
    : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Stock Profit Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your trading performance across real and paper trading accounts
          </p>
        </div>
        <button
          onClick={onManualEntry}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Daily Entry
        </button>
      </div>

      <AddHistoricalData onEntryAdded={(entry) => {
        onRefresh()
      }} />

      <StatsCards
        totalRealProfit={totalRealProfit}
        totalPaperProfit={totalPaperProfit}
        totalProfit={totalProfit}
        avgRealPercentage={avgRealPercentage}
        avgPaperPercentage={avgPaperPercentage}
        totalDays={entries.length}
      />

      <div className="mt-8">
        <ProfitChart entries={entries} />
      </div>

      {entries.length > 0 && (
        <div className="mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Entries
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Real Profit
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Real %
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Paper Profit
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Paper %
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Total Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.slice().reverse().slice(0, 10).map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        {format(parseISO(entry.date), 'MMM d, yyyy')}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                        ${entry.realAccountProfit.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-green-600 dark:text-green-400">
                        {entry.realAccountPercentage.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                        ${entry.paperTradingProfit.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-green-600 dark:text-green-400">
                        {entry.paperTradingPercentage.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 dark:text-white">
                        ${(entry.realAccountProfit + entry.paperTradingProfit).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No entries yet. The daily prompt will appear at 4:30pm CST.
          </p>
        </div>
      )}
    </div>
  )
}
