"use client";

import { useState, useMemo } from "react";
import { useTeams } from "@/lib/hooks/useF1Data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  SearchableSelect,
} from "@/components/ui";
import { Flag, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function ConstructorComparePage() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const { data: teams } = useTeams();
  const allTeams = teams || [];

  const selectedTeams = useMemo(
    () => allTeams.filter(t => selectedNames.includes(t.constructor_name)),
    [allTeams, selectedNames]
  );

  const availableTeams = allTeams.filter(t => !selectedNames.includes(t.constructor_name));

  const addTeam = (name: string) => {
    if (name && selectedNames.length < 4 && !selectedNames.includes(name)) {
      setSelectedNames(prev => [...prev, name]);
    }
  };

  const removeTeam = (name: string) => {
    setSelectedNames(prev => prev.filter(n => n !== name));
  };

  const maxWins = Math.max(...selectedTeams.map(t => t.wins), 1);
  const maxPodiums = Math.max(...selectedTeams.map(t => t.podiums), 1);
  const maxPoints = Math.max(...selectedTeams.map(t => t.points), 1);

  const accentColors = ['#E10600', '#00D4FF', '#22C55E', '#A855F7'];

  return (
    <div className="space-y-6">
      <PageHero
        title="Constructor Comparison"
        subtitle="Compare up to four constructors side by side"
        badge="Head to Head"
        imageSrc="/images/f1/f1-car-detail.jpg"
        imageAlt="F1 car detail"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-3.5 w-3.5 text-accent" />
            Select Constructors
          </CardTitle>
          <CardDescription>Choose constructors to compare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <SearchableSelect
              placeholder="Add a constructor..."
              options={availableTeams.map(t => ({
                value: t.constructor_name,
                label: t.constructor_name,
                subtitle: `${t.wins} wins · ${t.races} races`,
              }))}
              onSelect={value => addTeam(String(value))}
              disabled={selectedNames.length >= 4}
              className="flex-1"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTeams.map((t, i) => (
              <div
                key={t.constructor_name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${accentColors[i]}18`, color: accentColors[i], border: `1px solid ${accentColors[i]}40` }}
              >
                <span>{t.constructor_name}</span>
                <button onClick={() => removeTeam(t.constructor_name)} className="hover:opacity-75">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedNames.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No constructors selected</p>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedTeams.length > 0 && (
        <div className="space-y-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(selectedTeams.length, 4)} gap-4`}>
            {selectedTeams.map((t, i) => (
              <Card key={t.constructor_name}>
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accentColors[i]}, transparent)` }} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t.constructor_name}</CardTitle>
                  {t.constructor_nationality && (
                    <CardDescription className="hud-label text-[0.55rem]">{t.constructor_nationality}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <StatRow label="Wins" value={t.wins} max={maxWins} color={accentColors[i]} />
                    <StatRow label="Podiums" value={t.podiums} max={maxPodiums} color={accentColors[i]} />
                    <StatRow label="Points" value={Math.round(t.points)} max={maxPoints} color={accentColors[i]} />
                    <div className="flex justify-between text-sm">
                      <span className="hud-label text-[0.55rem]">Races</span>
                      <span className="font-semibold font-mono">{t.races}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Head to Head</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <tr>
                    <th className="pb-2 text-left hud-label">Metric</th>
                    {selectedTeams.map((t, i) => (
                      <th key={t.constructor_name} className="pb-2 text-center">
                        <span
                          className="text-[0.6rem] px-2 py-0.5 rounded-sm font-mono font-bold uppercase tracking-wider"
                          style={{ backgroundColor: `${accentColors[i]}18`, color: accentColors[i] }}
                        >
                          {t.constructor_name.split(' ')[0]}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Wins', key: 'wins' as const },
                    { label: 'Podiums', key: 'podiums' as const },
                    { label: 'Points', key: 'points' as const },
                    { label: 'Races', key: 'races' as const },
                  ].map(row => {
                    const vals = selectedTeams.map(t => t[row.key]);
                    const max = Math.max(...vals.map(v => Number(v)));
                    return (
                      <tr key={row.label} className="hover:bg-surface-3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td className="py-2 hud-label">{row.label}</td>
                        {selectedTeams.map((t, i) => {
                          const val = t[row.key];
                          const isMax = Number(val) === max;
                          return (
                            <td key={t.constructor_name} className="py-2 text-center font-semibold font-display" style={{ color: isMax ? '#E10600' : 'var(--color-text-primary)' }}>
                              {row.key === 'points' ? Number(val).toFixed(0) : val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="hud-label text-[0.55rem]">{label}</span>
        <span className="font-bold font-display" style={{ color }}>{value}</span>
      </div>
      <div className="w-full rounded-sm h-1.5" style={{ backgroundColor: 'var(--color-surface-3)' }}>
        <div className="h-1.5 rounded-sm transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
