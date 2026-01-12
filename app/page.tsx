'use client'

import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import DailyPrompt from '@/components/DailyPrompt'
import { ProfitEntry } from '@/types'

export default function Home() {
  const [entries, setEntries] = useState<ProfitEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if it's 4:30pm CST and if we've already shown the prompt today
    const checkDailyPrompt = () => {
      const now = new Date()
      const cstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }))
      const hour = cstTime.getHours()
      const minute = cstTime.getMinutes()
      
      // Check if it's 4:30pm CST (16:30) or later (but before midnight)
      if (hour === 16 && minute >= 30) {
        const lastPromptDate = localStorage.getItem('lastPromptDate')
        const today = cstTime.toDateString()
        
        if (lastPromptDate !== today) {
          setShowPrompt(true)
        }
      }
    }

    // Check immediately
    checkDailyPrompt()
    
    // Check every minute
    const interval = setInterval(checkDailyPrompt, 60000)

    // Load data
    loadData()

    return () => clearInterval(interval)
  }, [])

  const handleManualPrompt = () => {
    setShowPrompt(true)
  }

  const loadData = async () => {
    try {
      const response = await fetch('/api/entries')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePromptClose = () => {
    const today = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    localStorage.setItem('lastPromptDate', new Date(today).toDateString())
    setShowPrompt(false)
  }

  const handleEntryAdded = (newEntry: ProfitEntry) => {
    setEntries([...entries, newEntry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ))
    handlePromptClose()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {showPrompt && (
        <DailyPrompt 
          onClose={handlePromptClose}
          onEntryAdded={handleEntryAdded}
        />
      )}
      <Dashboard 
        entries={entries} 
        onRefresh={loadData}
        onManualEntry={handleManualPrompt}
      />
    </main>
  )
}
