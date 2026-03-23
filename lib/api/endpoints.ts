/**
 * API Endpoint definitions
 * Provides typed functions for all API calls
 */

import { apiClient } from './client'
import type {
  // Auth types
  LoginRequest,
  TokenResponse,
  User,
  // Race result types
  RaceResult,
  RaceResultListResponse,
  // Driver types
  DriverStats,
  DriverStatsListResponse,
  DriverFilter,
  // Constructor types
  ConstructorStats,
  // Season types
  Season,
  // Statistics types
  DashboardSummary,
  WinsOverTimeData,
  WinsByTeamData,
  WinsByDriverData,
  SeasonDetailData,
  YearsRange,
  // Common types
  MessageResponse,
} from './types'

// ====================================================================
// AUTH ENDPOINTS
// ====================================================================

export const authApi = {
  login: async (email: string, password: string): Promise<TokenResponse> => {
    const response = await apiClient.postForm<TokenResponse>('/auth/login', {
      username: email,
      password: password,
    })
    apiClient.setToken(response.access_token)
    return response
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me')
  },

  logout: async (): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/logout', {})
    apiClient.clearToken()
    return response
  },
}

// ====================================================================
// STATISTICS ENDPOINTS
// ====================================================================

export const statisticsApi = {
  getDashboardSummary: async (season?: number): Promise<DashboardSummary> => {
    const params = season ? { season } : undefined
    return apiClient.get<DashboardSummary>('/statistics/dashboard/summary', params)
  },

  getSeasons: async (startYear = 2020, endYear = 2024): Promise<Season[]> => {
    return apiClient.get<Season[]>('/statistics/seasons/list', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  getWinsOverTime: async (startYear = 2020, endYear = 2024): Promise<WinsOverTimeData[]> => {
    return apiClient.get<WinsOverTimeData[]>('/statistics/teams/wins-over-time', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  getWinsByTeam: async (season?: number, limit = 20): Promise<WinsByTeamData[]> => {
    const params: Record<string, number> = { limit }
    if (season) params.season = season
    return apiClient.get<WinsByTeamData[]>('/statistics/teams/wins-by-team', params)
  },

  getWinsByDriver: async (season?: number, limit = 10): Promise<WinsByDriverData[]> => {
    const params: Record<string, number> = { limit }
    if (season) params.season = season
    return apiClient.get<WinsByDriverData[]>('/statistics/drivers/wins-by-driver', params)
  },

  getSeasonDetails: async (year: number): Promise<SeasonDetailData> => {
    return apiClient.get<SeasonDetailData>(`/statistics/seasons/${year}`)
  },

  getYearsRange: async (): Promise<YearsRange> => {
    return apiClient.get<YearsRange>('/statistics/years-range')
  },
}

// ====================================================================
// DATA ENDPOINTS
// ====================================================================

export const dataApi = {
  /**
   * List raw race results with filters
   */
  listResults: async (
    year?: number,
    driver?: string,
    team?: string,
    race?: string,
    page = 1,
    pageSize = 50
  ): Promise<RaceResultListResponse> => {
    const params: Record<string, string | number> = { page, page_size: pageSize }
    if (year) params.year = year
    if (driver) params.driver = driver
    if (team) params.team = team
    if (race) params.race = race
    return apiClient.get<RaceResultListResponse>('/data/results', params)
  },

  /**
   * List all distinct driver nationalities
   */
  listDriverNationalities: async (): Promise<string[]> => {
    return apiClient.get<string[]>('/data/driver-nationalities')
  },

  /**
   * List drivers with aggregated stats
   */
  listDrivers: async (filters?: DriverFilter): Promise<DriverStatsListResponse> => {
    return apiClient.get<DriverStatsListResponse>('/data/drivers', filters)
  },

  /**
   * Get a single driver's aggregated stats by name
   */
  getDriver: async (driverName: string): Promise<DriverStats> => {
    return apiClient.get<DriverStats>(`/data/drivers/${encodeURIComponent(driverName)}`)
  },

  /**
   * List constructors with aggregated stats
   */
  listTeams: async (): Promise<ConstructorStats[]> => {
    return apiClient.get<ConstructorStats[]>('/data/teams')
  },

  /**
   * List seasons
   */
  listSeasons: async (): Promise<Season[]> => {
    return apiClient.get<Season[]>('/data/seasons')
  },

  /**
   * Bulk-import driver race results from a CSV or Excel file
   */
  uploadDriverData: async (file: File): Promise<{ rows_added: number; rows_skipped: number; total_rows: number }> => {
    const form = new FormData()
    form.append('file', file)
    return apiClient.post<{ rows_added: number; rows_skipped: number; total_rows: number }>(
      '/data/drivers/upload',
      form
    )
  },

  /**
   * Upload or replace a driver photo
   */
  updateDriverPhoto: async (driverName: string, file: File): Promise<{ photo_filename: string }> => {
    const form = new FormData()
    form.append('file', file)
    return apiClient.put<{ photo_filename: string }>(`/data/drivers/${encodeURIComponent(driverName)}/photo`, form)
  },
}
