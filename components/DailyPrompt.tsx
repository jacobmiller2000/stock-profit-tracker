'use client'

import { useState } from 'react'
import { ProfitEntry } from '@/types'
import { format } from 'date-fns'

interface DailyPromptProps {
  onClose: () => void
  onEntryAdded: (entry: ProfitEntry) => void
}

export default function DailyPrompt({ onClose, onEntryAdded }: DailyPromptProps) {
  const [realProfit, setRealProfit] = useState('')
  const [paperProfit, setPaperProfit] = useState('')
  const [realPercentage, setRealPercentage] = useState('')
  const [paperPercentage, setPaperPercentage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const realProfitNum = parseFloat(realProfit)
      const paperProfitNum = parseFloat(paperProfit)
      const realPercentageNum = parseFloat(realPercentage)
      const paperPercentageNum = parseFloat(paperPercentage)

      if (isNaN(realProfitNum) || isNaN(paperProfitNum) || 
          isNaN(realPercentageNum) || isNaN(paperPercentageNum)) {
        setError('Please enter valid numbers for all fields')
        setSubmitting(false)
        return
      }

      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          realAccountProfit: realProfitNum,
          paperTradingProfit: paperProfitNum,
          realAccountPercentage: realPercentageNum,
          paperTradingPercentage: paperPercentageNum,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || errorData.details || `Failed to save entry (${response.status})`
        throw new Error(errorMessage)
      }

      const newEntry = await response.json()
      onEntryAdded(newEntry)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Daily Profit Entry
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Real Account Profit ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={realProfit}
              onChange={(e) => setRealProfit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Real Account Percentage Gain (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={realPercentage}
              onChange={(e) => setRealPercentage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paper Trading Profit ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={paperProfit}
              onChange={(e) => setPaperProfit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paper Trading Percentage Gain (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={paperPercentage}
              onChange={(e) => setPaperPercentage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Skip Today
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {submitting ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
