import { createClient } from '@supabase/supabase-js'
import { ProfitEntry } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using fallback mode.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database row type (matches Supabase table structure)
interface ProfitEntryRow {
  id: string
  date: string
  real_account_profit: number
  paper_trading_profit: number
  real_account_percentage: number
  paper_trading_percentage: number
  created_at?: string
  updated_at?: string
}

// Convert database row to ProfitEntry
function rowToEntry(row: ProfitEntryRow): ProfitEntry {
  return {
    id: row.id,
    date: row.date,
    realAccountProfit: row.real_account_profit,
    paperTradingProfit: row.paper_trading_profit,
    realAccountPercentage: row.real_account_percentage,
    paperTradingPercentage: row.paper_trading_percentage,
  }
}

// Convert ProfitEntry to database row
function entryToRow(entry: Omit<ProfitEntry, 'id'> & { id?: string }): Omit<ProfitEntryRow, 'id' | 'created_at' | 'updated_at'> & { id?: string } {
  return {
    id: entry.id,
    date: entry.date,
    real_account_profit: entry.realAccountProfit,
    paper_trading_profit: entry.paperTradingProfit,
    real_account_percentage: entry.realAccountPercentage,
    paper_trading_percentage: entry.paperTradingPercentage,
  }
}

// Get all entries
export async function getAllEntries(): Promise<ProfitEntry[]> {
  // If Supabase is not configured, return empty array
  if (!supabaseUrl || !supabaseAnonKey) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('profit_entries')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      console.error('Error fetching entries:', error)
      return []
    }

    return (data || []).map(rowToEntry)
  } catch (error) {
    console.error('Error fetching entries:', error)
    return []
  }
}

// Get entry by date
export async function getEntryByDate(date: string): Promise<ProfitEntry | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('profit_entries')
      .select('*')
      .eq('date', date)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null
      }
      console.error('Error fetching entry:', error)
      return null
    }

    return data ? rowToEntry(data) : null
  } catch (error) {
    console.error('Error fetching entry:', error)
    return null
  }
}

// Create or update entry
export async function upsertEntry(entry: Omit<ProfitEntry, 'id'> & { id?: string }): Promise<ProfitEntry> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase not configured')
  }

  try {
    const row = entryToRow(entry)
    
    const { data, error } = await supabase
      .from('profit_entries')
      .upsert(row, {
        onConflict: 'date',
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error upserting entry:', error)
      throw new Error(`Failed to save entry: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned from database')
    }

    return rowToEntry(data)
  } catch (error) {
    console.error('Error upserting entry:', error)
    throw error
  }
}

// Delete entry by ID
export async function deleteEntry(id: string): Promise<void> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase not configured')
  }

  try {
    const { error } = await supabase
      .from('profit_entries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error)
      throw new Error(`Failed to delete entry: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting entry:', error)
    throw error
  }
}
