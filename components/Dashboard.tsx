'use client'

import { useState } from 'react'
import { ProfitEntry } from '@/types'
import ProfitChart from './ProfitChart'
import StatsCards from './StatsCards'
import AddHistoricalData from './AddHistoricalData'
import EditEntryModal from './EditEntryModal'
import { format, parseISO } from 'date-fns'

interface DashboardProps {
  entries: ProfitEntry[]
  onRefresh: () => void
  onManualEntry: () => void
}

export default function Dashboard({ entries, onRefresh, onManualEntry }: DashboardProps) {
  const [editingEntry, setEditingEntry] = useState<ProfitEntry | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalRealProfit = entries.reduce((sum, e) => sum + e.realAccountProfit, 0)
  const totalPaperProfit = entries.reduce((sum, e) => sum + e.paperTradingProfit, 0)
  const totalProfit = totalRealProfit + totalPaperProfit

  const avgRealPercentage = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.realAccountPercentage, 0) / entries.length
    : 0

  const avgPaperPercentage = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.paperTradingPercentage, 0) / entries.length
    : 0

  const handleEdit = (entry: ProfitEntry) => {
    setEditingEntry(entry)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete entry')
      }

      onRefresh()
    } catch (error) {
      alert('Failed to delete entry. Please try again.')
      console.error('Error deleting entry:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleSaveEdit = (updatedEntry: ProfitEntry) => {
    onRefresh()
    setEditingEntry(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {editingEntry && (
        <EditEntryModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleSaveEdit}
        />
      )}
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
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
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
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            title="Edit entry"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            disabled={deletingId === entry.id}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                            title="Delete entry"
                          >
                            {deletingId === entry.id ? (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 12 5.373 12 12H4z"></path>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
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
