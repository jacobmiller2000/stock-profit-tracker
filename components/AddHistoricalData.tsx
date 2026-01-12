'use client'

import { useState } from 'react'
import { ProfitEntry } from '@/types'
import { format } from 'date-fns'

interface AddHistoricalDataProps {
  onEntryAdded: (entry: ProfitEntry) => void
}

export default function AddHistoricalData({ onEntryAdded }: AddHistoricalDataProps) {
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
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
          date,
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
      
      // Reset form
      setRealProfit('')
      setPaperProfit('')
      setRealPercentage('')
      setPaperPercentage('')
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        Add Historical Data
      </button>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Historical Entry
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              Real Account Percentage (%)
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
              Paper Trading Percentage (%)
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
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
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
  )
}
