"use client";

import Link from "next/link";
import {
  useDriver,
  useDriverCareerTimeline,
} from "@/lib/hooks/useF1Data";
import {
  DriverProfileHeader,
  DriverCareerTimelineChart,
  DriverSeasonTable,
} from "@/components/dashboard/drivers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Skeleton,
  Badge,
} from "@/components/ui";
import { EmptyState } from "@/components/data/EmptyState";
import { ArrowLeft, TrendingUp, Calendar, Users, BookOpen } from "lucide-react";

interface DriverDetailPageProps {
  params: { id: string };
}

export default function DriverDetailPage({ params }: DriverDetailPageProps) {
  const { id } = params;
  const driverId = parseInt(id);

  const { data: driver, isLoading: driverLoading, error: driverError } = useDriver(driverId);
  const {
    data: careerData,
    isLoading: careerLoading,
  } = useDriverCareerTimeline(driverId);

  // Error state
  if (driverError) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/drivers-stats">
            <Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Drivers
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-16">
            <EmptyState
              icon={Users}
              title="Driver not found"
              description="The requested driver could not be found"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (driverLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/drivers-stats">
            <Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Drivers
            </Button>
          </Link>
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!driver) {
    return null;
  }

  const hasCareerData = careerData && careerData.length > 0;

  return (
    <div className="space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/admin/drivers-stats">
          <Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Drivers
          </Button>
        </Link>
      </div>

      {/* Driver Profile Header */}
      <DriverProfileHeader driver={driver} />

      {/* Career Timeline Chart */}
      {hasCareerData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              Career Timeline
            </CardTitle>
            <CardDescription>
              Season-by-season progression of wins, podiums, and points
            </CardDescription>
          </CardHeader>
          <CardContent>
            {careerLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <DriverCareerTimelineChart data={careerData} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Season-by-Season Performance */}
      {hasCareerData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-info-600" />
              Season-by-Season Performance
            </CardTitle>
            <CardDescription>
              Detailed breakdown of performance across all seasons
            </CardDescription>
          </CardHeader>
          <CardContent>
            {careerLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <DriverSeasonTable data={careerData} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Biography & Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biography */}
        {driver.bio && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Biography
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {driver.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Career Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success-600" />
              Career Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driver.championships > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="warning">Championships</Badge>
                  </div>
                  <p className="text-2xl font-bold text-yellow-800">
                    {driver.championships} {driver.championships === 1 ? 'Title' : 'Titles'}
                  </p>
                </div>
              )}

              {driver.wins > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="danger">Race Wins</Badge>
                  </div>
                  <p className="text-2xl font-bold text-red-800">
                    {driver.wins} {driver.wins === 1 ? 'Win' : 'Wins'}
                  </p>
                </div>
              )}

              {driver.pole_positions > 0 && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Pole Positions</Badge>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">
                    {driver.pole_positions} {driver.pole_positions === 1 ? 'Pole' : 'Poles'}
                  </p>
                </div>
              )}

              {driver.fastest_laps > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="success">Fastest Laps</Badge>
                  </div>
                  <p className="text-2xl font-bold text-green-800">
                    {driver.fastest_laps} {driver.fastest_laps === 1 ? 'Lap' : 'Laps'}
                  </p>
                </div>
              )}

              {!driver.championships && !driver.wins && !driver.pole_positions && !driver.fastest_laps && (
                <div className="text-center py-8 text-neutral-500">
                  <p>No major achievements recorded</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State for No Career Data */}
      {!hasCareerData && !careerLoading && (
        <Card>
          <CardContent className="py-16">
            <EmptyState
              icon={Calendar}
              title="No career data available"
              description="Season-by-season performance data is not available for this driver"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
