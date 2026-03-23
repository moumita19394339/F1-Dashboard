"use client";

import { useState, useMemo } from "react";
import { useDrivers } from "@/lib/hooks/useF1Data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  SearchableSelect,
} from "@/components/ui";
import { Users, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import type { DriverStats } from "@/lib/api/types";

export default function DriverComparePage() {
  const [selectedDriverNames, setSelectedDriverNames] = useState<string[]>([]);

  const { data: driversData } = useDrivers({ page_size: 200, sort_by: "wins", sort_order: "desc" });
  const drivers = driversData?.drivers || [];

  const selectedDrivers = useMemo(
    () => drivers.filter(d => selectedDriverNames.includes(d.driver_name)),
    [drivers, selectedDriverNames]
  );

  const availableDrivers = drivers.filter(d => !selectedDriverNames.includes(d.driver_name));

  const addDriver = (name: string) => {
    if (name && selectedDriverNames.length < 4 && !selectedDriverNames.includes(name)) {
      setSelectedDriverNames(prev => [...prev, name]);
    }
  };

  const removeDriver = (name: string) => {
    setSelectedDriverNames(prev => prev.filter(n => n !== name));
  };

  const maxWins = Math.max(...selectedDrivers.map(d => d.wins), 1);
  const maxPodiums = Math.max(...selectedDrivers.map(d => d.podiums), 1);
  const maxPoints = Math.max(...selectedDrivers.map(d => d.points), 1);

  const accentColors = ['#E10600', '#00D4FF', '#22C55E', '#A855F7'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHero
        title="Driver Comparison"
        subtitle="Compare up to four drivers side by side"
        badge="Head to Head"
        imageSrc="/images/f1/f1-race-start.jpg"
        imageAlt="F1 race start"
      />

      {/* Driver selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-accent" />
            Select Drivers
          </CardTitle>
          <CardDescription>Choose drivers to compare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <SearchableSelect
              placeholder="Add a driver..."
              options={availableDrivers.map(d => ({
                value: d.driver_name,
                label: d.driver_name,
                subtitle: `${d.wins} wins · ${d.races} races`,
              }))}
              onSelect={value => addDriver(String(value))}
              disabled={selectedDriverNames.length >= 4}
              className="flex-1"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedDrivers.map((d, i) => (
              <div
                key={d.driver_name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${accentColors[i]}18`, color: accentColors[i], border: `1px solid ${accentColors[i]}40` }}
              >
                <span>{d.driver_name}</span>
                <button onClick={() => removeDriver(d.driver_name)} className="hover:opacity-75">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedDriverNames.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No drivers selected</p>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedDrivers.length > 0 && (
        <div className="space-y-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(selectedDrivers.length, 4)} gap-4`}>
            {selectedDrivers.map((d, i) => (
              <Card key={d.driver_name}>
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accentColors[i]}, transparent)` }} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{d.driver_name}</CardTitle>
                  <CardDescription className="hud-label text-[0.55rem]">{d.driver_nationality} // {d.first_year}-{d.last_year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <StatRow label="Wins" value={d.wins} max={maxWins} color={accentColors[i]} />
                    <StatRow label="Podiums" value={d.podiums} max={maxPodiums} color={accentColors[i]} />
                    <StatRow label="Points" value={Math.round(d.points)} max={maxPoints} color={accentColors[i]} />
                    <div className="flex justify-between text-sm">
                      <span className="hud-label text-[0.55rem]">Races</span>
                      <span className="font-semibold font-mono">{d.races}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="hud-label text-[0.55rem]">Teams</span>
                      <span className="font-semibold text-right max-w-[120px] truncate text-xs" title={d.constructors.join(', ')}>
                        {d.constructors.join(', ')}
                      </span>
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
                    {selectedDrivers.map((d, i) => (
                      <th key={d.driver_name} className="pb-2 text-center">
                        <span
                          className="text-[0.6rem] px-2 py-0.5 rounded-sm font-mono font-bold uppercase tracking-wider"
                          style={{ backgroundColor: `${accentColors[i]}18`, color: accentColors[i] }}
                        >
                          {d.driver_name.split(' ').pop()}
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
                    const vals = selectedDrivers.map(d => d[row.key]);
                    const max = Math.max(...vals.map(v => Number(v)));
                    return (
                      <tr key={row.label} className="hover:bg-surface-3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td className="py-2 hud-label">{row.label}</td>
                        {selectedDrivers.map((d, i) => {
                          const val = d[row.key];
                          const isMax = Number(val) === max;
                          return (
                            <td key={d.driver_name} className="py-2 text-center font-semibold font-display" style={{ color: isMax ? '#E10600' : 'var(--color-text-primary)' }}>
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
