export interface ProfitEntry {
  id: string
  date: string // ISO date string
  realAccountProfit: number
  paperTradingProfit: number
  realAccountPercentage: number
  paperTradingPercentage: number
  realAccountTotalTraded?: number // Optional: can be calculated from profit/percentage
  paperTradingTotalTraded?: number // Optional: can be calculated from profit/percentage
}

export interface DailyStats {
  date: string
  realAccountProfit: number
  paperTradingProfit: number
  realAccountPercentage: number
  paperTradingPercentage: number
  totalProfit: number
}
