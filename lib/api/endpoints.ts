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
  // Team types
  Team,
  CreateTeamRequest,
  UpdateTeamRequest,
  // Driver types
  Driver,
  DriverListResponse,
  DriverFilter,
  CreateDriverRequest,
  UpdateDriverRequest,
  // Circuit types
  Circuit,
  CreateCircuitRequest,
  UpdateCircuitRequest,
  // Race types
  Race,
  // Statistics types
  DashboardSummary,
  Season,
  WinsOverTimeData,
  WinsByTeamData,
  TeamSummaryData,
  SpeedByCircuitData,
  TeamPerformanceData,
  CountryRaceCount,
  CountryWinnerCount,
  WinsByDriverData,
  SeasonDetailData,
  // Driver types
  DriverComparisonData,
  // New driver statistics types
  EraSummaryData,
  NationalitySummaryData,
  AgeDistributionData,
  DriverSeasonData,
  NationalityTimelineData,
  DriverWinsData,
  // Common types
  MessageResponse,
} from './types'

// ====================================================================
// AUTH ENDPOINTS
// ====================================================================

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<TokenResponse> => {
    const response = await apiClient.postForm<TokenResponse>('/auth/login', {
      username: email,
      password: password,
    })

    // Store token in cookie
    apiClient.setToken(response.access_token)

    return response
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me')
  },

  /**
   * Logout user
   */
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
  /**
   * Get dashboard summary metrics
   */
  getDashboardSummary: async (season?: number): Promise<DashboardSummary> => {
    const params = season ? { season } : undefined
    return apiClient.get<DashboardSummary>('/statistics/dashboard/summary', params)
  },

  /**
   * List available seasons
   */
  getSeasons: async (startYear = 2020, endYear = 2024): Promise<Season[]> => {
    return apiClient.get<Season[]>('/statistics/seasons/list', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  /**
   * Get wins over time by team
   */
  getWinsOverTime: async (
    startYear = 2020,
    endYear = 2024,
    season?: number
  ): Promise<WinsOverTimeData[]> => {
    const params: Record<string, number> = {
      start_year: startYear,
      end_year: endYear,
    }
    if (season) {
      params.season = season
    }
    return apiClient.get<WinsOverTimeData[]>('/statistics/teams/wins-over-time', params)
  },

  /**
   * Get wins by team
   */
  getWinsByTeam: async (season?: number, limit = 20): Promise<WinsByTeamData[]> => {
    const params: Record<string, number> = { limit }
    if (season) {
      params.season = season
    }
    return apiClient.get<WinsByTeamData[]>('/statistics/teams/wins-by-team', params)
  },

  /**
   * Get speed by circuit
   */
  getSpeedByCircuit: async (season?: number, limit = 10): Promise<SpeedByCircuitData[]> => {
    const params: Record<string, number> = { limit }
    if (season) {
      params.season = season
    }
    return apiClient.get<SpeedByCircuitData[]>('/statistics/circuits/speed-by-circuit', params)
  },

  /**
   * Get team performance by season
   */
  getTeamPerformance: async (
    teamId: number,
    startYear = 2020,
    endYear = 2024
  ): Promise<TeamPerformanceData[]> => {
    return apiClient.get<TeamPerformanceData[]>(`/statistics/teams/${teamId}/performance`, {
      start_year: startYear,
      end_year: endYear,
    })
  },

  /**
   * Get teams with statistics (wins and championships)
   */
  getTeamsSummary: async (startYear = 2020, endYear = 2024): Promise<TeamSummaryData[]> => {
    return apiClient.get<TeamSummaryData[]>('/statistics/teams/summary', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  /**
   * Get race count by country
   */
  getRaceCountByCountry: async (
    startYear = 1950,
    endYear = 2024
  ): Promise<CountryRaceCount[]> => {
    return apiClient.get<CountryRaceCount[]>('/statistics/countries/race-count', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  /**
   * Get winner count by country
   */
  getWinnerCountByCountry: async (
    startYear = 1950,
    endYear = 2024,
    limit = 10
  ): Promise<CountryWinnerCount[]> => {
    return apiClient.get<CountryWinnerCount[]>('/statistics/countries/winner-count', {
      start_year: startYear,
      end_year: endYear,
      limit,
    })
  },

  /**
   * Get drivers comparison
   */
  getDriversComparison: async (
    driverIds?: number[],
    season?: number,
    limit = 20
  ): Promise<DriverComparisonData[]> => {
    const params: Record<string, number | number[]> = { limit }
    if (driverIds && driverIds.length > 0) {
      params.driver_ids = driverIds
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('[API] Fetching comparison for driver IDs:', driverIds)
      }
    }
    if (season) {
      params.season = season
    }
    const result = await apiClient.get<DriverComparisonData[]>('/statistics/drivers/comparison', params)
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[API] Comparison returned', result.length, 'drivers')
    }
    return result
  },

  /**
   * Get wins by driver
   */
  getWinsByDriver: async (
    season?: number,
    limit = 10
  ): Promise<WinsByDriverData[]> => {
    const params: Record<string, number> = { limit }
    if (season) {
      params.season = season
    }
    return apiClient.get<WinsByDriverData[]>('/statistics/drivers/wins-by-driver', params)
  },

  /**
   * Get season details
   */
  getSeasonDetails: async (
    year: number
  ): Promise<SeasonDetailData> => {
    return apiClient.get<SeasonDetailData>(`/statistics/seasons/${year}/details`)
  },

  // ====================================================================
  // NEW DRIVER STATISTICS ENDPOINTS
  // ====================================================================

  /**
   * Get driver statistics grouped by era/decade
   */
  getDriversByEra: async (): Promise<EraSummaryData[]> => {
    return apiClient.get<EraSummaryData[]>('/statistics/drivers/era-summary')
  },

  /**
   * Get driver statistics grouped by nationality
   */
  getDriversByNationality: async (limit = 20): Promise<NationalitySummaryData[]> => {
    return apiClient.get<NationalitySummaryData[]>('/statistics/drivers/nationality-summary', {
      limit,
    })
  },

  /**
   * Get driver age distribution (debut ages)
   */
  getDriverAgeDistribution: async (era?: string): Promise<AgeDistributionData[]> => {
    const params = era ? { era } : undefined
    return apiClient.get<AgeDistributionData[]>('/statistics/drivers/age-distribution', params)
  },

  /**
   * Get driver career timeline (year-by-year stats)
   */
  getDriverCareerTimeline: async (driverId: number): Promise<DriverSeasonData[]> => {
    return apiClient.get<DriverSeasonData[]>(`/statistics/drivers/${driverId}/career-timeline`)
  },

  /**
   * Get nationality timeline evolution over decades
   */
  getNationalityTimeline: async (
    startYear = 1950,
    endYear = 2024
  ): Promise<NationalityTimelineData[]> => {
    return apiClient.get<NationalityTimelineData[]>('/statistics/drivers/nationality-timeline', {
      start_year: startYear,
      end_year: endYear,
    })
  },

  /**
   * Get top drivers by wins with team colors
   */
  getDriverWins: async (season?: number, limit = 10): Promise<DriverWinsData[]> => {
    const params: Record<string, number> = { limit }
    if (season) {
      params.season = season
    }
    return apiClient.get<DriverWinsData[]>('/statistics/drivers/wins-by-driver', params)
  },
}

// ====================================================================
// DATA ENDPOINTS
// ====================================================================

export const dataApi = {
  /**
   * List teams
   */
  listTeams: async (): Promise<Team[]> => {
    return apiClient.get<Team[]>('/data/teams')
  },

  /**
   * Get specific team
   */
  getTeam: async (teamId: number): Promise<Team> => {
    return apiClient.get<Team>(`/data/teams/${teamId}`)
  },

  /**
   * Create a new team
   */
  createTeam: async (teamData: CreateTeamRequest): Promise<Team> => {
    return apiClient.post<Team>('/data/teams', teamData)
  },

  /**
   * Update an existing team
   */
  updateTeam: async (teamId: number, teamData: UpdateTeamRequest): Promise<Team> => {
    return apiClient.put<Team>(`/data/teams/${teamId}`, teamData)
  },

  /**
   * Delete a team
   */
  deleteTeam: async (teamId: number): Promise<MessageResponse> => {
    return apiClient.delete<MessageResponse>(`/data/teams/${teamId}`)
  },

  /**
   * List drivers with filters
   */
  listDrivers: async (filters?: DriverFilter): Promise<DriverListResponse> => {
    return apiClient.get<DriverListResponse>('/data/drivers', filters)
  },

  /**
   * Get specific driver by ID
   */
  getDriver: async (driverId: number): Promise<Driver> => {
    return apiClient.get<Driver>(`/data/drivers/${driverId}`)
  },

  /**
   * Get driver by reference (slug)
   */
  getDriverByRef: async (driverRef: string): Promise<Driver> => {
    return apiClient.get<Driver>(`/data/drivers/by-ref/${driverRef}`)
  },

  /**
   * Create a new driver
   */
  createDriver: async (driverData: CreateDriverRequest): Promise<Driver> => {
    return apiClient.post<Driver>('/data/drivers', driverData)
  },

  /**
   * Update an existing driver
   */
  updateDriver: async (driverId: number, driverData: UpdateDriverRequest): Promise<Driver> => {
    return apiClient.put<Driver>(`/data/drivers/${driverId}`, driverData)
  },

  /**
   * Delete a driver
   */
  deleteDriver: async (driverId: number): Promise<MessageResponse> => {
    return apiClient.delete<MessageResponse>(`/data/drivers/${driverId}`)
  },

  /**
   * List circuits
   */
  listCircuits: async (country?: string): Promise<Circuit[]> => {
    const params = country ? { country } : undefined
    return apiClient.get<Circuit[]>('/data/circuits', params)
  },

  /**
   * Get specific circuit
   */
  getCircuit: async (circuitId: number): Promise<Circuit> => {
    return apiClient.get<Circuit>(`/data/circuits/${circuitId}`)
  },

  /**
   * Create a new circuit
   */
  createCircuit: async (circuitData: CreateCircuitRequest): Promise<Circuit> => {
    return apiClient.post<Circuit>('/data/circuits', circuitData)
  },

  /**
   * Update an existing circuit
   */
  updateCircuit: async (circuitId: number, circuitData: UpdateCircuitRequest): Promise<Circuit> => {
    return apiClient.put<Circuit>(`/data/circuits/${circuitId}`, circuitData)
  },

  /**
   * Delete a circuit
   */
  deleteCircuit: async (circuitId: number): Promise<MessageResponse> => {
    return apiClient.delete<MessageResponse>(`/data/circuits/${circuitId}`)
  },

  /**
   * List races with filters
   */
  listRaces: async (
    year?: number,
    circuitId?: number,
    page = 1,
    pageSize = 50
  ): Promise<Race[]> => {
    const params: Record<string, number> = {
      page,
      page_size: pageSize,
    }
    if (year) params.year = year
    if (circuitId) params.circuit_id = circuitId

    return apiClient.get<Race[]>('/data/races', params)
  },

  /**
   * Get specific race
   */
  getRace: async (raceId: number): Promise<Race> => {
    return apiClient.get<Race>(`/data/races/${raceId}`)
  },
}
