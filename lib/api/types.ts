/**
 * API Types for F1 Data Dashboard
 * These types correspond to the backend API schemas
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
// TEAM TYPES
// ====================================================================

export interface Team {
  id: number
  team_ref: string
  name: string
  nationality?: string
  color: string
  url?: string
}

export interface CreateTeamRequest {
  team_ref: string
  name: string
  nationality?: string
  color: string
  url?: string
}

export interface UpdateTeamRequest {
  team_ref: string
  name: string
  nationality?: string
  color: string
  url?: string
}

// ====================================================================
// DRIVER TYPES
// ====================================================================

export interface Driver {
  id: number
  driver_ref: string
  code?: string
  number?: number
  first_name: string
  last_name: string
  full_name: string
  abbreviation?: string
  dob?: string
  birth_place?: string
  birth_country?: string
  nationality: string
  height_cm?: number
  weight_kg?: number
  first_entry_year?: number
  first_entry_race?: string
  last_entry_year?: number
  last_entry_race?: string
  years_active?: number
  is_active: boolean
  retired: boolean
  current_team?: string
  car_number?: number
  entries: number
  starts: number
  wins: number
  podiums: number
  championships: number
  championship_years?: string
  career_points: number
  pole_positions: number
  fastest_laps: number
  records?: string[]
  milestones?: Record<string, unknown>
  teams_history?: TeamHistoryEntry[]
  bio?: string
  nickname?: string
  honors?: string[]
  special_achievements?: string
  wikipedia_url?: string
  created_at: string
  updated_at: string
}

export interface TeamHistoryEntry {
  team: string
  years: string
  races: number
  wins: number
  podiums: number
  points: number
}

export interface DriverListResponse {
  drivers: Driver[]
  total: number
  page: number
  page_size: number
}

export type DriverFilter = {
  nationality?: string
  is_active?: boolean
  retired?: boolean
  current_team?: string
  min_wins?: number
  min_championships?: number
  search?: string
  sort_by?: string
  sort_order?: string
  page?: number
  page_size?: number
} & Record<string, unknown>

export interface CreateDriverRequest {
  driver_ref: string
  code?: string
  number?: number
  first_name: string
  last_name: string
  abbreviation?: string
  nationality: string
  dob?: string
  birth_place?: string
  birth_country?: string
  height_cm?: number
  weight_kg?: number
  first_entry_year?: number
  first_entry_race?: string
  last_entry_year?: number
  last_entry_race?: string
  years_active?: number
  is_active?: boolean
  retired?: boolean
  current_team?: string
  car_number?: number
  entries?: number
  starts?: number
  wins?: number
  podiums?: number
  championships?: number
  championship_years?: string
  career_points?: number
  pole_positions?: number
  fastest_laps?: number
  records?: string[]
  milestones?: Record<string, unknown>
  teams_history?: TeamHistoryEntry[]
  bio?: string
  nickname?: string
  honors?: string[]
  special_achievements?: string
  wikipedia_url?: string
}

export interface UpdateDriverRequest extends CreateDriverRequest {}

export interface DriverComparisonData {
  driver_id: number
  driver_name: string
  driver_code?: string
  team?: string
  wins: number
  podiums: number
  championships: number
  career_points: number
  pole_positions: number
  fastest_laps: number
  years_active?: number
}

// ====================================================================
// CIRCUIT TYPES
// ====================================================================

export interface Circuit {
  id: number
  circuit_ref: string
  name: string
  location?: string
  country?: string
  lat?: number
  lng?: number
  altitude?: number
  url?: string
}

export interface CreateCircuitRequest {
  circuit_ref: string
  name: string
  location?: string
  country?: string
  lat?: number
  lng?: number
  altitude?: number
  url?: string
}

export interface UpdateCircuitRequest extends CreateCircuitRequest {}

// ====================================================================
// RACE TYPES
// ====================================================================

export interface Race {
  id: number
  year: number
  round: number
  circuit_id: number
  name: string
  date?: string
  time?: string
  url?: string
  circuit?: Circuit
}

// ====================================================================
// STATISTICS TYPES
// ====================================================================

export interface DashboardSummary {
  total_wins: number
  total_podiums: number
  average_points: number
  average_speed: number
  win_percentage: number
  season?: number
}

export interface Season {
  year: number
  total_races: number
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

export interface TeamSummaryData {
  id: number
  name: string
  color: string
  nationality: string | null
  wins: number
  championships: number
}

export interface SpeedByCircuitData {
  circuit_name: string
  team_name: string
  team_color: string
  average_speed: number
}

export interface TeamPerformanceData {
  season: number
  team_name: string
  wins: number
  podiums: number
  points: number
  pole_positions: number
  team_id: number
}

export interface CountryRaceCount {
  country: string
  race_count: number
}

export interface CountryWinnerCount {
  country: string
  winner_count: number
  winners: string[]
}

export interface WinsByDriverData {
  driver_name: string
  driver_code?: string
  nationality?: string
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
  average_speed: number
  unique_teams: number
  unique_drivers: number
}

// ====================================================================
// NEW DRIVER STATISTICS TYPES
// ====================================================================

export interface EraSummaryData {
  era: string // "1950s", "1960s", etc.
  decade_start: number
  decade_end: number
  driver_count: number
  total_wins: number
  total_championships: number
  total_podiums?: number
  avg_wins_per_driver?: number
  top_drivers?: string[]
}

export interface NationalitySummaryData {
  nationality: string
  driver_count: number
  total_wins?: number
  total_podiums?: number
  total_championships?: number
  avg_wins_per_driver?: number
  active_drivers?: number
  championship_count?: number
}

export interface AgeDistributionData {
  age_bucket: string // "18-20", "21-23", etc.
  driver_count: number
  avg_debut_age?: number
}

export interface DriverSeasonData {
  year: number
  team?: string
  team_name?: string
  team_color?: string
  races: number
  wins: number
  podiums: number
  pole_positions?: number
  fastest_laps?: number
  points: number
  position?: number
}

export interface NationalityTimelineData {
  decade: string
  nationalities: Record<string, number> // {British: 45, German: 23, ...}
}

export interface DriverWinsData {
  driver_name: string
  driver_code?: string
  wins: number
  dominant_team_color: string
}

export interface DriverComparisonData {
  // Identity
  driver_id: number
  driver_name: string
  driver_code?: string
  nationality?: string

  // Career Overview
  entries: number
  starts: number
  years_active?: number
  first_entry_year?: number
  last_entry_year?: number
  current_team?: string
  is_active: boolean
  retired: boolean
  retirement_year?: number

  // Wins & Podiums
  wins: number
  podiums: number
  second_places: number
  third_places: number
  fourth_places: number
  fifth_places: number
  sixth_places: number
  points_finishes: number

  // Qualifying
  pole_positions: number
  front_row_starts: number
  qualifying_appearances: number

  // Championships & Points
  championships: number
  championship_years?: string
  career_points: number
  highest_championship_position?: number
  highest_championship_position_year?: number

  // Speed & Performance
  fastest_laps: number
  grand_slams: number
  hat_tricks: number
  laps_led: number
  distance_led_km?: number
  races_led: number

  // Race Outcomes
  dnf: number
  dns: number
  dsq: number

  // Personal Info
  dob?: string
  birth_place?: string
  birth_country?: string
  height_cm?: number
  weight_kg?: number
  car_number?: number
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
