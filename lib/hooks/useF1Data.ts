/**
 * React Query hooks for F1 Data API
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { statisticsApi, dataApi, authApi } from '@/lib/api'
import type {
  DashboardSummary,
  Season,
  WinsOverTimeData,
  WinsByTeamData,
  WinsByDriverData,
  SeasonDetailData,
  YearsRange,
  DriverStats,
  DriverStatsListResponse,
  DriverFilter,
  ConstructorStats,
  RaceResultListResponse,
  User,
  TokenResponse,
} from '@/lib/api'

// Query keys factory
export const queryKeys = {
  // Auth
  currentUser: ['currentUser'] as const,

  // Statistics
  dashboardSummary: (season?: number) => ['dashboardSummary', season] as const,
  seasons: (start?: number, end?: number) => ['seasons', start, end] as const,
  winsOverTime: (start: number, end: number) => ['winsOverTime', start, end] as const,
  winsByTeam: (season?: number, limit?: number) => ['winsByTeam', season, limit] as const,
  winsByDriver: (season?: number, limit?: number) => ['winsByDriver', season, limit] as const,
  seasonDetails: (year: number) => ['seasonDetails', year] as const,
  yearsRange: () => ['yearsRange'] as const,

  // Data
  results: (filters?: Record<string, unknown>) => ['results', filters] as const,
  driverNationalities: () => ['driverNationalities'] as const,
  drivers: (filters?: DriverFilter) => ['drivers', filters] as const,
  driver: (name: string) => ['driver', name] as const,
  teams: () => ['teams'] as const,
  dataSeasons: () => ['dataSeasons'] as const,
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
    staleTime: 5 * 60 * 1000,
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
    staleTime: 2 * 60 * 1000,
  })
}

export function useYearsRange() {
  return useQuery<YearsRange>({
    queryKey: queryKeys.yearsRange(),
    queryFn: () => statisticsApi.getYearsRange(),
    staleTime: Infinity,
  })
}

export function useSeasons(startYear = 1950, endYear = 2030) {
  return useQuery({
    queryKey: queryKeys.seasons(startYear, endYear),
    queryFn: () => statisticsApi.getSeasons(startYear, endYear),
    staleTime: 60 * 60 * 1000,
  })
}

export function useWinsOverTime(startYear = 1950, endYear = 2030) {
  return useQuery({
    queryKey: queryKeys.winsOverTime(startYear, endYear),
    queryFn: () => statisticsApi.getWinsOverTime(startYear, endYear),
    staleTime: 5 * 60 * 1000,
  })
}

export function useWinsByTeam(season?: number, limit = 20) {
  return useQuery({
    queryKey: queryKeys.winsByTeam(season, limit),
    queryFn: () => statisticsApi.getWinsByTeam(season, limit),
    staleTime: 5 * 60 * 1000,
  })
}

export function useWinsByDriver(season?: number, limit = 10) {
  return useQuery({
    queryKey: queryKeys.winsByDriver(season, limit),
    queryFn: () => statisticsApi.getWinsByDriver(season, limit),
    staleTime: 5 * 60 * 1000,
  })
}

export function useSeasonDetails(year: number) {
  return useQuery({
    queryKey: queryKeys.seasonDetails(year),
    queryFn: () => statisticsApi.getSeasonDetails(year),
    enabled: !!year,
    staleTime: 60 * 60 * 1000,
  })
}

// ====================================================================
// DATA HOOKS
// ====================================================================

export function useResults(
  year?: number,
  driver?: string,
  team?: string,
  page = 1,
  pageSize = 50
) {
  return useQuery({
    queryKey: queryKeys.results({ year, driver, team, page, pageSize }),
    queryFn: () => dataApi.listResults(year, driver, team, undefined, page, pageSize),
    staleTime: 5 * 60 * 1000,
  })
}

export function useDriverNationalities() {
  return useQuery({
    queryKey: queryKeys.driverNationalities(),
    queryFn: () => dataApi.listDriverNationalities(),
    staleTime: Infinity,
  })
}

export function useDrivers(filters?: DriverFilter) {
  return useQuery({
    queryKey: queryKeys.drivers(filters),
    queryFn: () => dataApi.listDrivers(filters),
    staleTime: 10 * 60 * 1000,
  })
}

export function useDriver(driverName: string) {
  return useQuery({
    queryKey: queryKeys.driver(driverName),
    queryFn: () => dataApi.getDriver(driverName),
    enabled: !!driverName,
    staleTime: 30 * 60 * 1000,
  })
}

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams(),
    queryFn: () => dataApi.listTeams(),
    staleTime: 30 * 60 * 1000,
  })
}

export function useDataSeasons() {
  return useQuery({
    queryKey: queryKeys.dataSeasons(),
    queryFn: () => dataApi.listSeasons(),
    staleTime: 60 * 60 * 1000,
  })
}

export function useImportDriverData() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => dataApi.uploadDriverData(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers() })
    },
  })
}

export function useUpdateDriverPhoto() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ driverName, file }: { driverName: string; file: File }) =>
      dataApi.updateDriverPhoto(driverName, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    },
  })
}
