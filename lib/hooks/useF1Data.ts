/**
 * React Query hooks for F1 Data API
 * Provides typed hooks for all data fetching operations
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { statisticsApi, dataApi, authApi } from '@/lib/api'
import type {
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
  Team,
  CreateTeamRequest,
  UpdateTeamRequest,
  Driver,
  DriverListResponse,
  DriverFilter,
  CreateDriverRequest,
  UpdateDriverRequest,
  Circuit,
  CreateCircuitRequest,
  UpdateCircuitRequest,
  Race,
  User,
  TokenResponse,
  DriverComparisonData,
  // New driver statistics types
  EraSummaryData,
  NationalitySummaryData,
  AgeDistributionData,
  DriverSeasonData,
  NationalityTimelineData,
  DriverWinsData,
} from '@/lib/api'

// Query keys factory
export const queryKeys = {
  // Auth
  currentUser: ['currentUser'] as const,

  // Statistics
  dashboardSummary: (season?: number) => ['dashboardSummary', season] as const,
  seasons: (start?: number, end?: number) => ['seasons', start, end] as const,
  winsOverTime: (start: number, end: number, season?: number) =>
    ['winsOverTime', start, end, season] as const,
  winsByTeam: (season?: number, limit?: number) =>
    ['winsByTeam', season, limit] as const,
  speedByCircuit: (season?: number, limit?: number) =>
    ['speedByCircuit', season, limit] as const,
  teamPerformance: (teamId: number) =>
    ['teamPerformance', teamId] as const,
  teamsSummary: (startYear?: number, endYear?: number) =>
    ['teams', 'summary', startYear, endYear] as const,
  raceCountByCountry: (startYear?: number, endYear?: number) =>
    ['raceCountByCountry', startYear, endYear] as const,
  winnerCountByCountry: (startYear?: number, endYear?: number, limit?: number) =>
    ['winnerCountByCountry', startYear, endYear, limit] as const,
  driversComparison: (driverIds?: number[], season?: number) =>
    ['driversComparison', driverIds, season] as const,
  winsByDriver: (season?: number, limit?: number) =>
    ['winsByDriver', season, limit] as const,
  seasonDetails: (year: number) =>
    ['seasonDetails', year] as const,

  // New driver statistics query keys
  driversByEra: () => ['driversByEra'] as const,
  driversByNationality: (limit?: number) =>
    ['driversByNationality', limit] as const,
  driverAgeDistribution: (era?: string) =>
    ['driverAgeDistribution', era] as const,
  driverCareerTimeline: (driverId: number) =>
    ['driverCareerTimeline', driverId] as const,
  nationalityTimeline: (startYear?: number, endYear?: number) =>
    ['nationalityTimeline', startYear, endYear] as const,
  driverWins: (season?: number, limit?: number) =>
    ['driverWins', season, limit] as const,

  // Data
  teams: () => ['teams'] as const,
  team: (id: number) => ['team', id] as const,
  drivers: (filters?: DriverFilter) => ['drivers', filters] as const,
  driver: (id: number) => ['driver', id] as const,
  driverByRef: (ref: string) => ['driverByRef', ref] as const,
  circuits: (country?: string) => ['circuits', country] as const,
  circuit: (id: number) => ['circuit', id] as const,
  races: (filters?: Record<string, unknown>) => ['races', filters] as const,
  race: (id: number) => ['race', id] as const,
} as const

// ====================================================================
// AUTH HOOKS
// ====================================================================

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data: TokenResponse) => {
      queryClient.setQueryData(queryKeys.currentUser, data)
    },
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

// ====================================================================
// STATISTICS HOOKS
// ====================================================================

export function useDashboardStats(season?: number) {
  return useQuery({
    queryKey: queryKeys.dashboardSummary(season),
    queryFn: () => statisticsApi.getDashboardSummary(season),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useSeasons(startYear = 2020, endYear = 2024) {
  return useQuery({
    queryKey: queryKeys.seasons(startYear, endYear),
    queryFn: () => statisticsApi.getSeasons(startYear, endYear),
    staleTime: 60 * 60 * 1000, // 1 hour - seasons don't change
  })
}

export function useWinsOverTime(
  startYear = 2020,
  endYear = 2024,
  season?: number
) {
  return useQuery({
    queryKey: queryKeys.winsOverTime(startYear, endYear, season),
    queryFn: () => statisticsApi.getWinsOverTime(startYear, endYear, season),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useWinsByTeam(season?: number, limit = 20) {
  return useQuery({
    queryKey: queryKeys.winsByTeam(season, limit),
    queryFn: () => statisticsApi.getWinsByTeam(season, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSpeedByCircuit(season?: number, limit = 10) {
  return useQuery({
    queryKey: queryKeys.speedByCircuit(season, limit),
    queryFn: () => statisticsApi.getSpeedByCircuit(season, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useTeamPerformance(teamId: number, startYear = 2020, endYear = 2024) {
  return useQuery({
    queryKey: queryKeys.teamPerformance(teamId),
    queryFn: () => statisticsApi.getTeamPerformance(teamId, startYear, endYear),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useTeamsSummary(startYear = 2020, endYear = 2024) {
  return useQuery({
    queryKey: queryKeys.teamsSummary(startYear, endYear),
    queryFn: () => statisticsApi.getTeamsSummary(startYear, endYear),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useRaceCountByCountry(startYear = 1950, endYear = 2024) {
  return useQuery({
    queryKey: queryKeys.raceCountByCountry(startYear, endYear),
    queryFn: () => statisticsApi.getRaceCountByCountry(startYear, endYear),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useWinnerCountByCountry(
  startYear = 1950,
  endYear = 2024,
  limit = 10
) {
  return useQuery({
    queryKey: queryKeys.winnerCountByCountry(startYear, endYear, limit),
    queryFn: () => statisticsApi.getWinnerCountByCountry(startYear, endYear, limit),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useDriversComparison(
  driverIds?: number[],
  season?: number
) {
  return useQuery({
    queryKey: queryKeys.driversComparison(driverIds, season),
    queryFn: () => statisticsApi.getDriversComparison(driverIds, season),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useWinsByDriver(season?: number, limit = 10) {
  return useQuery({
    queryKey: queryKeys.winsByDriver(season, limit),
    queryFn: () => statisticsApi.getWinsByDriver(season, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSeasonDetails(year: number) {
  return useQuery({
    queryKey: queryKeys.seasonDetails(year),
    queryFn: () => statisticsApi.getSeasonDetails(year),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

// ====================================================================
// NEW DRIVER STATISTICS HOOKS
// ====================================================================

export function useDriversByEra() {
  return useQuery({
    queryKey: queryKeys.driversByEra(),
    queryFn: () => statisticsApi.getDriversByEra(),
    staleTime: 60 * 60 * 1000, // 1 hour - historical data rarely changes
  })
}

export function useDriversByNationality(limit = 20) {
  return useQuery({
    queryKey: queryKeys.driversByNationality(limit),
    queryFn: () => statisticsApi.getDriversByNationality(limit),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useDriverAgeDistribution(era?: string) {
  return useQuery({
    queryKey: queryKeys.driverAgeDistribution(era),
    queryFn: () => statisticsApi.getDriverAgeDistribution(era),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useDriverCareerTimeline(driverId: number) {
  return useQuery({
    queryKey: queryKeys.driverCareerTimeline(driverId),
    queryFn: () => statisticsApi.getDriverCareerTimeline(driverId),
    enabled: !!driverId && driverId > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useNationalityTimeline(startYear = 1950, endYear = 2024) {
  return useQuery({
    queryKey: queryKeys.nationalityTimeline(startYear, endYear),
    queryFn: () => statisticsApi.getNationalityTimeline(startYear, endYear),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useDriverWins(season?: number, limit = 10) {
  return useQuery({
    queryKey: queryKeys.driverWins(season, limit),
    queryFn: () => statisticsApi.getDriverWins(season, limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// ====================================================================
// DATA HOOKS
// ====================================================================

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams(),
    queryFn: () => dataApi.listTeams(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useTeam(teamId: number) {
  return useQuery({
    queryKey: queryKeys.team(teamId),
    queryFn: () => dataApi.getTeam(teamId),
    enabled: !!teamId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useDrivers(filters?: DriverFilter) {
  return useQuery({
    queryKey: queryKeys.drivers(filters),
    queryFn: () => dataApi.listDrivers(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDriver(driverId: number) {
  return useQuery({
    queryKey: queryKeys.driver(driverId),
    queryFn: () => dataApi.getDriver(driverId),
    enabled: !!driverId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useDriverByRef(driverRef: string) {
  return useQuery({
    queryKey: queryKeys.driverByRef(driverRef),
    queryFn: () => dataApi.getDriverByRef(driverRef),
    enabled: !!driverRef,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useCircuits(country?: string) {
  return useQuery({
    queryKey: queryKeys.circuits(country),
    queryFn: () => dataApi.listCircuits(country),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useCircuit(circuitId: number) {
  return useQuery({
    queryKey: queryKeys.circuit(circuitId),
    queryFn: () => dataApi.getCircuit(circuitId),
    enabled: !!circuitId,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useRaces(
  year?: number,
  circuitId?: number,
  page = 1,
  pageSize = 50
) {
  return useQuery({
    queryKey: queryKeys.races({ year, circuitId, page, pageSize }),
    queryFn: () => dataApi.listRaces(year, circuitId, page, pageSize),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useRace(raceId: number) {
  return useQuery({
    queryKey: queryKeys.race(raceId),
    queryFn: () => dataApi.getRace(raceId),
    enabled: !!raceId,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

// ====================================================================
// CRUD MUTATION HOOKS
// ====================================================================

// Team Mutations
export function useCreateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (teamData: CreateTeamRequest) => dataApi.createTeam(teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams() })
    },
  })
}

export function useUpdateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ teamId, teamData }: { teamId: number; teamData: UpdateTeamRequest }) =>
      dataApi.updateTeam(teamId, teamData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams() })
      queryClient.invalidateQueries({ queryKey: queryKeys.team(variables.teamId) })
    },
  })
}

export function useDeleteTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (teamId: number) => dataApi.deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams() })
    },
  })
}

// Driver Mutations
export function useCreateDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (driverData: CreateDriverRequest) => dataApi.createDriver(driverData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers() })
    },
  })
}

export function useUpdateDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ driverId, driverData }: { driverId: number; driverData: UpdateDriverRequest }) =>
      dataApi.updateDriver(driverId, driverData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers() })
      queryClient.invalidateQueries({ queryKey: queryKeys.driver(variables.driverId) })
    },
  })
}

export function useDeleteDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (driverId: number) => dataApi.deleteDriver(driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers() })
    },
  })
}

// Circuit Mutations
export function useCreateCircuit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (circuitData: CreateCircuitRequest) => dataApi.createCircuit(circuitData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.circuits() })
    },
  })
}

export function useUpdateCircuit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ circuitId, circuitData }: { circuitId: number; circuitData: UpdateCircuitRequest }) =>
      dataApi.updateCircuit(circuitId, circuitData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.circuits() })
      queryClient.invalidateQueries({ queryKey: queryKeys.circuit(variables.circuitId) })
    },
  })
}

export function useDeleteCircuit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (circuitId: number) => dataApi.deleteCircuit(circuitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.circuits() })
    },
  })
}
