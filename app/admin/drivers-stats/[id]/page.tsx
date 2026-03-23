"use client";

import { useParams, useRouter } from "next/navigation";
import { useDriver, useResults } from "@/lib/hooks/useF1Data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Skeleton,
} from "@/components/ui";
import { ArrowLeft, Trophy, Target, Star, Hash } from "lucide-react";

export default function DriverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const driverName = decodeURIComponent(String(params?.id || ""));

  const { data: driver, isLoading } = useDriver(driverName);
  const { data: results, isLoading: resultsLoading } = useResults(undefined, driverName, undefined, 1, 50);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--color-text-secondary)' }}>Driver not found.</p>
        <Button className="mt-4" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const years =
    driver.first_year && driver.last_year
      ? driver.first_year === driver.last_year
        ? String(driver.first_year)
        : `${driver.first_year}-${driver.last_year}`
      : "-";

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-3.5 w-3.5 mr-2" /> Back
      </Button>

      {/* Header */}
      <div
        className="p-6 rounded-md border relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>{driver.driver_name}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              {driver.driver_nationality} // {years}
            </p>
            <p className="hud-label text-[0.55rem] mt-1">
              {driver.constructors.join(", ")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { icon: Trophy, value: driver.wins, label: 'Wins', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
            { icon: Target, value: driver.podiums, label: 'Podiums', color: '#00D4FF', bg: 'rgba(0,212,255,0.08)' },
            { icon: Star, value: driver.points.toFixed(0), label: 'Points', color: '#A855F7', bg: 'rgba(168,85,247,0.08)' },
            { icon: Hash, value: driver.races, label: 'Races', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-sm p-4 text-center" style={{ backgroundColor: stat.bg }}>
                <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="font-display text-xl font-bold tracking-wider" style={{ color: stat.color }}>{stat.value}</p>
                <p className="hud-label text-[0.5rem] mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-accent" />
            Race Results
          </CardTitle>
          <CardDescription>All race entries for {driver.driver_name}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {resultsLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)' }}>
                  <tr className="hud-label">
                    <th className="px-4 py-2 text-left">Year</th>
                    <th className="px-4 py-2 text-left">Race</th>
                    <th className="px-4 py-2 text-left">Team</th>
                    <th className="px-4 py-2 text-center">Grid</th>
                    <th className="px-4 py-2 text-center">Pos</th>
                    <th className="px-4 py-2 text-center">Pts</th>
                    <th className="px-4 py-2 text-center">Win</th>
                  </tr>
                </thead>
                <tbody>
                  {(results?.results || []).map(r => (
                    <tr
                      key={r.id}
                      className="hover:bg-surface-3 transition-colors"
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        backgroundColor: r.win ? 'rgba(245,158,11,0.04)' : undefined,
                      }}
                    >
                      <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>{r.year}</td>
                      <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.race_name}</td>
                      <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>{r.constructor_name || '-'}</td>
                      <td className="px-4 py-2 text-center font-mono" style={{ color: 'var(--color-text-secondary)' }}>{r.grid ?? '-'}</td>
                      <td className="px-4 py-2 text-center font-semibold font-display" style={{ color: 'var(--color-text-primary)' }}>{r.position_text || r.position || '-'}</td>
                      <td className="px-4 py-2 text-center font-mono" style={{ color: 'var(--color-text-primary)' }}>{r.points}</td>
                      <td className="px-4 py-2 text-center">{r.win ? '🏆' : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!results?.results?.length && (
                <p className="text-center py-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>No race data available.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
