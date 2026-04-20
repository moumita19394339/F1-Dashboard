/**
 * Admin Dashboard Page
 *
 * The main landing page for the /admin route. Displays a high-level overview
 * of F1 Constructor Championship data including:
 *   - Key performance metrics (total wins, podiums, avg points, total races)
 *   - Wins Over Time chart (constructor performance trends by season)
 *   - Wins by Team chart (total race wins per constructor)
 *   - Season Summary panel with breakdown stats
 *
 * Users can filter all data by selecting a specific season or viewing "All Seasons".
 */
"use client";

import { useState } from "react";
import {
  useDashboardStats,
  useWinsOverTime,
  useWinsByTeam,
  useSeasons,
  useYearsRange,
} from "@/lib/hooks/useF1Data";
import { WinsOverTime } from "@/components/dashboard/WinsOverTime";
import { WinsByTeam } from "@/components/dashboard/WinsByTeam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Select,
  Skeleton,
} from "@/components/ui";
import { Trophy, TrendingUp, Award, Hash } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function AdminDashboardPage() {
  const [selectedSeason, setSelectedSeason] = useState<number | "All">("All");
  const seasonParam = selectedSeason === "All" ? undefined : selectedSeason;

  const { data: yearsRange } = useYearsRange();
  const minYear = yearsRange?.min_year ?? 1950;
  const maxYear = yearsRange?.max_year ?? 2030;

  const { data: seasons } = useSeasons(minYear, maxYear);
  const { data: summary, isLoading: summaryLoading } = useDashboardStats(seasonParam);
  const { data: winsOverTime, isLoading: winsOverTimeLoading } = useWinsOverTime(minYear, maxYear);
  const { data: winsByTeam, isLoading: winsByTeamLoading } = useWinsByTeam(seasonParam);

  const metrics = [
    { title: "Total Wins", value: summary?.total_wins ?? 0, icon: Trophy, accentColor: '#E10600', glowColor: 'rgba(225,6,0,0.08)' },
    { title: "Total Podiums", value: summary?.total_podiums ?? 0, icon: Award, accentColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.08)' },
    {
      title: "Avg Points",
      value: summary?.average_points != null ? summary.average_points.toFixed(1) : "0.0",
      icon: TrendingUp,
      accentColor: '#00D4FF',
      glowColor: 'rgba(0,212,255,0.08)',
    },
    { title: "Total Races", value: summary?.total_races ?? 0, icon: Hash, accentColor: '#22C55E', glowColor: 'rgba(34,197,94,0.08)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHero
        title="Championship Data"
        subtitle={`F1 Constructor Championship ${minYear}–${maxYear}`}
        badge="Analytics"
        imageSrc="/images/f1/f1-race-start.jpg"
        imageAlt="F1 race start"
      >
        <label className="hud-label text-white/70">Season:</label>
        <Select
          value={String(selectedSeason)}
          onChange={(e) =>
            setSelectedSeason(e.target.value === "All" ? "All" : parseInt(e.target.value))
          }
          className="w-36"
        >
          <option value="All">All Seasons</option>
          {seasons
            ? [...seasons].reverse().map((s) => (
                <option key={s.year} value={s.year}>{s.year}</option>
              ))
            : null}
        </Select>
      </PageHero>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`metric-card group animate-reveal-up stagger-${index + 1}`}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="metric-label">{metric.title}</p>
                <div
                  className="p-1.5 rounded-sm transition-colors"
                  style={{ backgroundColor: metric.glowColor }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: metric.accentColor }} />
                </div>
              </div>
              <p className="metric-value" style={{ color: metric.accentColor }}>{metric.value}</p>
              <div className="mt-4 h-[2px]" style={{ background: `linear-gradient(to right, ${metric.accentColor}, transparent 60%)` }} />
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:col-span-2 animate-reveal-up stagger-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              Wins Over Time
            </CardTitle>
            <CardDescription>Constructor performance trends by season</CardDescription>
          </CardHeader>
          <CardContent>
            {winsOverTimeLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsOverTime data={winsOverTime || []} />
            )}
          </CardContent>
        </Card>

        <Card className="animate-reveal-up stagger-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5" style={{ color: '#F59E0B' }} />
              Wins by Team
            </CardTitle>
            <CardDescription>Total race wins by constructor</CardDescription>
          </CardHeader>
          <CardContent>
            {winsByTeamLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsByTeam data={winsByTeam || []} />
            )}
          </CardContent>
        </Card>

        <Card className="animate-reveal-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5" style={{ color: '#00D4FF' }} />
              Season Summary
            </CardTitle>
            <CardDescription>
              {selectedSeason === "All"
                ? "Select a season for detailed stats"
                : `${selectedSeason} season highlights`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <div className="grid grid-cols-2 gap-3 py-2">
                {[
                  { label: 'Wins', value: summary?.total_wins ?? 0, color: '#E10600' },
                  { label: 'Podiums', value: summary?.total_podiums ?? 0, color: '#F59E0B' },
                  { label: 'Races', value: summary?.total_races ?? 0, color: '#22C55E' },
                  { label: 'Avg Pts', value: summary?.average_points != null ? summary.average_points.toFixed(1) : '0.0', color: '#00D4FF' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-sm relative overflow-hidden"
                    style={{ backgroundColor: 'var(--color-surface-2)' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: item.color }} />
                    <p className="hud-label mb-2">{item.label}</p>
                    <p className="font-display text-xl font-bold tracking-wider" style={{ color: item.color }}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
