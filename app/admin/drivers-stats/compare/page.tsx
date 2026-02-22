"use client";

import { useState, useEffect } from "react";
import {
  useDrivers,
  useDriversComparison,
} from "@/lib/hooks/useF1Data";
import {
  DriverSelector,
  MultiDriverComparison,
  DriverComparisonTable,
} from "@/components/dashboard/drivers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Select,
  Skeleton,
} from "@/components/ui";
import { EmptyState } from "@/components/data/EmptyState";
import { Users, BarChart3, Grid3x3, Info } from "lucide-react";

export default function DriverComparePage() {
  const [selectedSeason, setSelectedSeason] = useState<number | "All">("All");
  const [selectedDriverIds, setSelectedDriverIds] = useState<number[]>([]);
  const [comparisonMode, setComparisonMode] = useState<'cards' | 'table'>('cards');

  const seasonParam = selectedSeason === "All" ? undefined : selectedSeason;

  // Fetch all drivers for selection
  const { data: driversData, isLoading: driversLoading } = useDrivers();

  // Fetch comparison data when drivers are selected
  const {
    data: comparisonData,
    isLoading: comparisonLoading,
    refetch: refetchComparison,
  } = useDriversComparison(
    selectedDriverIds.length >= 2 ? selectedDriverIds : undefined,
    seasonParam
  );

  // Refetch when season or drivers change
  useEffect(() => {
    if (selectedDriverIds.length >= 2) {
      refetchComparison();
    }
  }, [selectedSeason, selectedDriverIds, refetchComparison]);

  const drivers = driversData?.drivers || [];
  const hasValidSelection = selectedDriverIds.length >= 2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white rounded-xl border border-neutral-200 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Compare Drivers
          </h1>
          <p className="text-lg text-neutral-600 mt-1">
            Select drivers below to view detailed comparison
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

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            How to Compare
          </h3>
          <p className="text-sm text-blue-700">
            Select 2-4 drivers from the dropdown below. The comparison will display
            <strong className="font-semibold"> only your selected drivers</strong> in a detailed grid
            showing 50+ comprehensive metrics organized by category.
          </p>
        </div>
      </div>

      {/* Driver Selection */}
      <Card className="border-2 border-primary-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-600" />
            Select Drivers to Compare
          </CardTitle>
          <CardDescription>
            Choose 2-4 drivers • Currently selected: <strong>{selectedDriverIds.length}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {driversLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <DriverSelector
              drivers={drivers}
              selectedDriverIds={selectedDriverIds}
              onSelectionChange={setSelectedDriverIds}
              maxDrivers={4}
              minDrivers={2}
            />
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {hasValidSelection && (
        <>
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5 text-neutral-500" />
              <h2 className="text-lg font-bold text-neutral-900">
                Comparison Results ({comparisonData?.length || 0} drivers)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">View:</span>
              <Button
                variant={comparisonMode === 'cards' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setComparisonMode('cards')}
              >
                Cards
              </Button>
              <Button
                variant={comparisonMode === 'table' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setComparisonMode('table')}
                icon={<BarChart3 className="h-4 w-4" />}
              >
                Table
              </Button>
            </div>
          </div>

          {/* Comparison Display */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>
                {seasonParam
                  ? `Statistics for ${seasonParam} season`
                  : 'Career statistics across all seasons'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {comparisonLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDriverIds.map((id) => (
                    <Skeleton key={id} className="h-96" />
                  ))}
                </div>
              ) : comparisonData && comparisonData.length > 0 ? (
                comparisonMode === 'cards' ? (
                  <MultiDriverComparison driversData={comparisonData} />
                ) : (
                  <DriverComparisonTable driversData={comparisonData} />
                )
              ) : (
                <EmptyState
                  icon={Users}
                  title="No comparison data available"
                  description="Unable to load comparison data for the selected drivers"
                />
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!hasValidSelection && !driversLoading && (
        <Card>
          <CardContent className="py-16">
            <EmptyState
              icon={Users}
              title="Select drivers to compare"
              description="Choose at least 2 drivers from the selector above to view their comparison"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
