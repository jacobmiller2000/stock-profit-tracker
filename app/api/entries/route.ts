import { NextRequest, NextResponse } from 'next/server'
import { ProfitEntry } from '@/types'
import { getAllEntries, upsertEntry } from '@/lib/supabase'
import { randomUUID } from 'crypto'

export async function GET() {
  try {
    const entries = await getAllEntries()
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

    // Check if entry for this date already exists
    const existingEntries = await getAllEntries()
    const existingEntry = existingEntries.find((e) => e.date === date)

    const newEntry: ProfitEntry = {
      id: existingEntry?.id || randomUUID(),
      date,
      realAccountProfit: parseFloat(realAccountProfit),
      paperTradingProfit: parseFloat(paperTradingProfit),
      realAccountPercentage: parseFloat(realAccountPercentage),
      paperTradingPercentage: parseFloat(paperTradingPercentage),
    }

    const savedEntry = await upsertEntry(newEntry)

    return NextResponse.json(savedEntry, { status: existingEntry ? 200 : 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create entry', details: errorMessage },
      { status: 500 }
    )
  }
}
