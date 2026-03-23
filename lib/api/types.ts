/**
 * API Types for F1 Data Dashboard
 * Aligned with the actual drivers table (flat race results)
 */

// ====================================================================
// AUTH TYPES
// ====================================================================

export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_at: string
}

export interface User {
  id: number
  email: string
  username?: string
  full_name?: string
  is_active: boolean
  is_superuser: boolean
  last_login?: string
}

// ====================================================================
// RACE RESULT TYPES (raw rows from drivers table)
// ====================================================================

export interface RaceResult {
  id: number
  year: number
  date: string
  race_name: string
  driver_name: string
  driver_nationality?: string
  constructor_name?: string
  constructor_nationality?: string
  grid?: number
  position?: number
  position_text?: string
  points: number
  finished: number
  podium: number
  win: number
}

export interface RaceResultListResponse {
  results: RaceResult[]
  total: number
  page: number
  page_size: number
}

// ====================================================================
// DRIVER STATS TYPES (aggregated per driver_name)
// ====================================================================

export interface DriverStats {
  driver_name: string
  driver_nationality?: string
  races: number
  wins: number
  podiums: number
  points: number
  constructors: string[]
  first_year?: number
  last_year?: number
  photo_filename?: string
}

export interface DriverStatsListResponse {
  drivers: DriverStats[]
  total: number
  page: number
  page_size: number
}

export type DriverFilter = {
  search?: string
  nationality?: string
  min_wins?: number
  sort_by?: string
  sort_order?: string
  page?: number
  page_size?: number
} & Record<string, unknown>

// ====================================================================
// CONSTRUCTOR TYPES
// ====================================================================

export interface ConstructorStats {
  constructor_name: string
  constructor_nationality?: string
  races: number
  wins: number
  podiums: number
  points: number
}

// ====================================================================
// SEASON TYPES
// ====================================================================

export interface Season {
  year: number
  race_count: number
}

// ====================================================================
// STATISTICS TYPES
// ====================================================================

export interface DashboardSummary {
  total_wins: number
  total_podiums: number
  total_races: number
  average_points: number
  season?: number
}

export interface WinsOverTimeData {
  season: number
  team_name: string
  wins: number
}

export interface WinsByTeamData {
  team_name: string
  team_color: string
  wins: number
  team_id: number
}

export interface WinsByDriverData {
  driver_name: string
  driver_nationality?: string
  wins: number
  team?: string
}

export interface SeasonDetailData {
  year: number
  total_races: number
  top_team: string
  top_team_wins: number
  top_driver: string
  top_driver_wins: number
  total_points_scored: number
  unique_teams: number
  unique_drivers: number
}

export interface YearsRange {
  min_year: number
  max_year: number
}

// ====================================================================
// COMMON TYPES
// ====================================================================

export interface MessageResponse {
  message: string
  success: boolean
}

export interface ErrorResponse {
  error: string
  detail?: string
  status_code: number
}

export interface ApiError {
  message: string
  status?: number
}
