import { NextRequest, NextResponse } from 'next/server'
import { ProfitEntry } from '@/types'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'entries.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read entries from file
function readEntries(): ProfitEntry[] {
  ensureDataDirectory()
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading entries:', error)
    return []
  }
}

// Write entries to file
function writeEntries(entries: ProfitEntry[]) {
  ensureDataDirectory()
  fs.writeFileSync(dataFilePath, JSON.stringify(entries, null, 2))
}

export async function GET() {
  try {
    const entries = readEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      date,
      realAccountProfit,
      paperTradingProfit,
      realAccountPercentage,
      paperTradingPercentage,
    } = body

    // Validate required fields
    if (
      !date ||
      realAccountProfit === undefined ||
      paperTradingProfit === undefined ||
      realAccountPercentage === undefined ||
      paperTradingPercentage === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entries = readEntries()

    // Check if entry for this date already exists
    const existingIndex = entries.findIndex((e) => e.date === date)
    const newEntry: ProfitEntry = {
      id: existingIndex >= 0 ? entries[existingIndex].id : crypto.randomUUID(),
      date,
      realAccountProfit: parseFloat(realAccountProfit),
      paperTradingProfit: parseFloat(paperTradingProfit),
      realAccountPercentage: parseFloat(realAccountPercentage),
      paperTradingPercentage: parseFloat(paperTradingPercentage),
    }

    if (existingIndex >= 0) {
      // Update existing entry
      entries[existingIndex] = newEntry
    } else {
      // Add new entry
      entries.push(newEntry)
    }

    // Sort by date
    entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    writeEntries(entries)

    return NextResponse.json(newEntry, { status: existingIndex >= 0 ? 200 : 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
