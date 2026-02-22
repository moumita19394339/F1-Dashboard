"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useDrivers,
  useDriversByEra,
  useDriversByNationality,
  useDriverAgeDistribution,
  useWinsByDriver,
} from "@/lib/hooks/useF1Data";
import {
  DriversMetricsSummary,
  DriversByEraChart,
  DriversByNationalityChart,
  DriverAgeDistributionChart,
} from "@/components/dashboard/drivers";
import { WinsByDriverChart } from "@/components/dashboard/WinsByDriverChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Skeleton,
  Select,
} from "@/components/ui";
import { Trophy, BarChart3, Globe, Calendar } from "lucide-react";

export default function DriversStatsPage() {
  const [selectedSeason, setSelectedSeason] = useState<number | "All">("All");

  const seasonParam = selectedSeason === "All" ? undefined : selectedSeason;

  // Fetch data
  const { data: driversData, isLoading: driversLoading } = useDrivers();
  const { data: eraData, isLoading: eraLoading } = useDriversByEra();
  const { data: nationalityData, isLoading: nationalityLoading } = useDriversByNationality(20);
  const { data: ageData, isLoading: ageLoading } = useDriverAgeDistribution();
  const { data: winsData, isLoading: winsLoading } = useWinsByDriver(seasonParam, 10);

  // Calculate metrics
  const metrics = useMemo(() => {
    const drivers = driversData?.drivers || [];
    return {
      totalDrivers: driversData?.total || 0,
      activeDrivers: drivers.filter(d => d.is_active).length,
      totalWins: drivers.reduce((sum, d) => sum + (d.wins || 0), 0),
      totalChampionships: drivers.reduce((sum, d) => sum + (d.championships || 0), 0),
    };
  }, [driversData]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white rounded-xl border border-neutral-200 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Drivers Statistics
          </h1>
          <p className="text-lg text-neutral-600 mt-1">
            Comprehensive driver analytics and comparisons
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-bold text-neutral-800">Season:</label>
          <Select
            value={String(selectedSeason)}
            onChange={(e) =>
              setSelectedSeason(
                e.target.value === "All" ? "All" : parseInt(e.target.value),
              )
            }
            className="w-40"
          >
            <option value="All">All Seasons</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </Select>
        </div>
      </div>

      {/* Metrics Summary */}
      <DriversMetricsSummary
        totalDrivers={metrics.totalDrivers}
        activeDrivers={metrics.activeDrivers}
        totalWins={metrics.totalWins}
        totalChampionships={metrics.totalChampionships}
        isLoading={driversLoading}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary-600" />
              Top Drivers by Wins
            </CardTitle>
            <CardDescription>All-time leading race winners</CardDescription>
          </CardHeader>
          <CardContent>
            {winsLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsByDriverChart data={winsData || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-info-600" />
              Drivers by Era
            </CardTitle>
            <CardDescription>Distribution across decades</CardDescription>
          </CardHeader>
          <CardContent>
            {eraLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <DriversByEraChart data={eraData || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-success-600" />
              Drivers by Nationality
            </CardTitle>
            <CardDescription>Top 20 countries by driver count</CardDescription>
          </CardHeader>
          <CardContent>
            {nationalityLoading ? (
              <Skeleton className="h-[600px] w-full" />
            ) : (
              <DriversByNationalityChart data={nationalityData || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Debut Age Distribution
            </CardTitle>
            <CardDescription>Age when drivers first raced</CardDescription>
          </CardHeader>
          <CardContent>
            {ageLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <DriverAgeDistributionChart data={ageData || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
