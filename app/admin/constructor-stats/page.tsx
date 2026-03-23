"use client";

import { useState, useMemo } from "react";
import { useTeams, useWinsByTeam } from "@/lib/hooks/useF1Data";
import { WinsByTeam } from "@/components/dashboard/WinsByTeam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Skeleton,
  Select,
} from "@/components/ui";
import { Trophy, Flag, Target, Hash } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { MetricsCard } from "@/components/dashboard/MetricsCard";

export default function ConstructorStatsPage() {
  const [selectedSeason, setSelectedSeason] = useState<number | "All">("All");
  const seasonParam = selectedSeason === "All" ? undefined : selectedSeason;

  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: winsData, isLoading: winsLoading } = useWinsByTeam(seasonParam, 15);

  const metrics = useMemo(() => {
    const all = teams || [];
    return {
      totalConstructors: all.length,
      totalWins: all.reduce((sum, t) => sum + (t.wins || 0), 0),
      totalPodiums: all.reduce((sum, t) => sum + (t.podiums || 0), 0),
      totalRaces: all.reduce((sum, t) => sum + (t.races || 0), 0),
    };
  }, [teams]);

  const maxPodiums = useMemo(() => {
    const all = teams || [];
    return Math.max(...all.map(t => t.podiums), 1);
  }, [teams]);

  const topByWins = useMemo(() => (teams || []).slice(0, 10), [teams]);
  const topByPodiums = useMemo(
    () => [...(teams || [])].sort((a, b) => b.podiums - a.podiums).slice(0, 10),
    [teams]
  );

  return (
    <div className="space-y-6">
      <PageHero
        title="Constructor Statistics"
        subtitle="Team performance across all seasons"
        badge="Constructors"
        imageSrc="/images/f1/f1-car-detail.jpg"
        imageAlt="F1 car detail"
      >
        <label className="hud-label text-white/70">Season:</label>
        <Select
          value={String(selectedSeason)}
          onChange={e =>
            setSelectedSeason(e.target.value === "All" ? "All" : parseInt(e.target.value))
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
      </PageHero>

      {/* Metrics */}
      {teamsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard title="Total Constructors" value={metrics.totalConstructors} icon={Flag} color="text-[#00D4FF]" />
          <MetricsCard title="Total Wins" value={metrics.totalWins} icon={Trophy} color="text-accent" />
          <MetricsCard title="Total Podiums" value={metrics.totalPodiums} icon={Target} color="text-[#F59E0B]" />
          <MetricsCard title="Total Race Entries" value={metrics.totalRaces} icon={Hash} color="text-[#22C55E]" />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-accent" />
              Top Constructors by Wins
            </CardTitle>
            <CardDescription>
              {selectedSeason === "All" ? "All-time leading constructors" : `${selectedSeason} season constructors`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {winsLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsByTeam data={winsData || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" style={{ color: '#00D4FF' }} />
              Constructor Stats Table
            </CardTitle>
            <CardDescription>Top constructors by wins with race and points totals</CardDescription>
          </CardHeader>
          <CardContent>
            {teamsLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <tr className="hud-label">
                      <th className="pb-2 text-left">Constructor</th>
                      <th className="pb-2 text-center">W</th>
                      <th className="pb-2 text-center">P</th>
                      <th className="pb-2 text-center">Pts</th>
                      <th className="pb-2 text-center">Races</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topByWins.map(t => (
                      <tr key={t.constructor_name} className="hover:bg-surface-3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td className="py-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>{t.constructor_name}</td>
                        <td className="py-2 text-center font-semibold font-display" style={{ color: '#F59E0B' }}>{t.wins}</td>
                        <td className="py-2 text-center font-display" style={{ color: '#00D4FF' }}>{t.podiums}</td>
                        <td className="py-2 text-center font-mono" style={{ color: 'var(--color-text-secondary)' }}>{t.points.toFixed(0)}</td>
                        <td className="py-2 text-center font-mono" style={{ color: 'var(--color-text-secondary)' }}>{t.races}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5" style={{ color: '#F59E0B' }} />
              Podium Leaders
            </CardTitle>
            <CardDescription>Constructors with most podium finishes</CardDescription>
          </CardHeader>
          <CardContent>
            {teamsLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <div className="space-y-3">
                {topByPodiums.map((t, i) => (
                  <div key={t.constructor_name} className="flex items-center gap-3">
                    <span className="w-6 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{t.constructor_name}</span>
                        <span className="text-sm font-bold font-display text-accent">{t.podiums}</span>
                      </div>
                      <div className="w-full rounded-sm h-1.5" style={{ backgroundColor: 'var(--color-surface-3)' }}>
                        <div
                          className="bg-accent h-1.5 rounded-sm transition-all"
                          style={{ width: `${Math.round((t.podiums / maxPodiums) * 100)}%` }}
                        />
                      </div>
                    </div>
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
