"use client";

import { useState, useMemo, useEffect } from "react";
import { useTeams } from "@/lib/hooks/useF1Data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Skeleton,
  Input,
  Select,
} from "@/components/ui";
import { EmptyState } from "@/components/data/EmptyState";
import { Flag, Grid3X3, List, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import type { ConstructorStats } from "@/lib/api/types";

type ViewMode = 'grid' | 'list';

const TEAM_COLORS: Record<string, string> = {
  "Red Bull": "#3671C6",
  "Mercedes": "#27F4D2",
  "Ferrari": "#F91536",
  "McLaren": "#FF8000",
  "Aston Martin": "#358C75",
  "Alpine": "#FF87BC",
  "Williams": "#64C4FF",
  "AlphaTauri": "#5E8FAA",
  "Alpha Tauri": "#5E8FAA",
  "RB": "#5E8FAA",
  "Alfa Romeo": "#C92D4B",
  "Sauber": "#52E252",
  "Haas F1 Team": "#B6BABD",
  "Haas": "#B6BABD",
};

function getTeamColor(name: string): string {
  for (const [key, color] of Object.entries(TEAM_COLORS)) {
    if (key.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(key.toLowerCase())) {
      return color;
    }
  }
  return '#71717A';
}

const PAGE_SIZE = 24;

export default function AllConstructorsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [nationality, setNationality] = useState('');
  const [minWins, setMinWins] = useState('');
  const [sortBy, setSortBy] = useState('wins');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data: teams, isLoading } = useTeams();

  const nationalities = useMemo(() => {
    const all = teams || [];
    const unique = [...new Set(all.map(t => t.constructor_nationality).filter(Boolean))] as string[];
    return unique.sort();
  }, [teams]);

  const filtered = useMemo(() => {
    let list = [...(teams || [])];
    if (search) list = list.filter(t => t.constructor_name.toLowerCase().includes(search.toLowerCase()));
    if (nationality) list = list.filter(t => t.constructor_nationality === nationality);
    if (minWins) list = list.filter(t => t.wins >= parseInt(minWins));
    list.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;
      if (sortBy === 'name') { aVal = a.constructor_name; bVal = b.constructor_name; }
      else if (sortBy === 'wins') { aVal = a.wins; bVal = b.wins; }
      else if (sortBy === 'podiums') { aVal = a.podiums; bVal = b.podiums; }
      else if (sortBy === 'points') { aVal = a.points; bVal = b.points; }
      else if (sortBy === 'races') { aVal = a.races; bVal = b.races; }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return list;
  }, [teams, search, nationality, minWins, sortBy, sortOrder]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const startIndex = filtered.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = Math.min(page * PAGE_SIZE, filtered.length);

  useEffect(() => { setPage(1); }, [search, nationality, minWins, sortBy, sortOrder]);

  const handleReset = () => {
    setSearch(''); setNationality(''); setMinWins('');
    setSortBy('wins'); setSortOrder('desc'); setPage(1);
  };

  const hasFilters = search || nationality || minWins;

  return (
    <div className="space-y-6">
      <PageHero
        title="Constructor Directory"
        subtitle="All teams 2020–2024"
        badge="Directory"
        imageSrc="/images/f1/f1-car-detail.jpg"
        imageAlt="F1 car detail"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-3.5 w-3.5 text-accent" />
                Constructor Directory ({filtered.length})
              </CardTitle>
              <CardDescription>Search, filter, and explore constructor profiles</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                icon={<Grid3X3 className="h-3.5 w-3.5" />}
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                icon={<List className="h-3.5 w-3.5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Input
              placeholder="Search constructors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Select
              value={nationality}
              onChange={e => setNationality(e.target.value)}
            >
              <option value="">All Nationalities</option>
              {nationalities.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </Select>
            <Select value={minWins} onChange={e => setMinWins(e.target.value)}>
              <option value="">All Win Counts</option>
              <option value="1">1+ Wins</option>
              <option value="5">5+ Wins</option>
              <option value="10">10+ Wins</option>
              <option value="20">20+ Wins</option>
            </Select>
            <div className="flex gap-2">
              <Select value={sortBy} onChange={e => setSortBy(e.target.value)} className="flex-1">
                <option value="wins">Wins</option>
                <option value="podiums">Podiums</option>
                <option value="points">Points</option>
                <option value="races">Races</option>
                <option value="name">Name</option>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </Button>
            </div>
          </div>
          {hasFilters && (
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset Filters
              </Button>
            </div>
          )}
          {filtered.length > 0 && (
            <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Showing {startIndex}–{endIndex} of {filtered.length} constructors
            </p>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="No constructors found"
          description={hasFilters ? "Try adjusting your filters" : "No constructor data available"}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((team, i) => (
            <ConstructorCard key={team.constructor_name} team={team} index={i} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {paginated.map(team => (
                <ConstructorRow key={team.constructor_name} team={team} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs hud-label">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ConstructorCard({ team, index }: { team: ConstructorStats; index: number }) {
  const color = getTeamColor(team.constructor_name);
  return (
    <div
      className={`rounded-md border overflow-hidden transition-all duration-300 animate-reveal-up stagger-${Math.min(index + 1, 6)} group hover:translate-y-[-2px]`}
      style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
    >
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div
          className="h-8 w-8 flex-shrink-0 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Flag className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <div>
          <h3 className="text-sm font-bold font-display tracking-wide" style={{ color: 'var(--color-text-primary)' }}>{team.constructor_name}</h3>
          {team.constructor_nationality && (
            <p className="hud-label text-[0.55rem]">{team.constructor_nationality}</p>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Wins', value: team.wins, color: '#F59E0B' },
            { label: 'Pods', value: team.podiums, color: '#22C55E' },
            { label: 'Pts', value: team.points.toFixed(0), color: 'var(--color-text-primary)' },
          ].map(stat => (
            <div key={stat.label} className="py-2 rounded-sm" style={{ backgroundColor: 'var(--color-surface-2)' }}>
              <p className="hud-label text-[0.5rem] mb-1">{stat.label}</p>
              <p className="font-display text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
          <span className="hud-label text-[0.5rem]">Races</span>
          <span className="text-sm font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>{team.races}</span>
        </div>
      </div>
    </div>
  );
}

function ConstructorRow({ team }: { team: ConstructorStats }) {
  const color = getTeamColor(team.constructor_name);
  return (
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-surface-2 transition-colors">
      <div
        className="h-7 w-7 flex-shrink-0 rounded-sm flex items-center justify-center"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
      >
        <Flag className="h-3 w-3" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{team.constructor_name}</p>
        {team.constructor_nationality && (
          <p className="hud-label text-[0.5rem]">{team.constructor_nationality}</p>
        )}
      </div>
      <div className="flex items-center gap-6 text-right">
        <div>
          <p className="hud-label text-[0.5rem]">Wins</p>
          <p className="text-sm font-bold font-display" style={{ color: '#F59E0B' }}>{team.wins}</p>
        </div>
        <div>
          <p className="hud-label text-[0.5rem]">Pods</p>
          <p className="text-sm font-bold font-display" style={{ color: '#22C55E' }}>{team.podiums}</p>
        </div>
        <div>
          <p className="hud-label text-[0.5rem]">Pts</p>
          <p className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{team.points.toFixed(0)}</p>
        </div>
        <div>
          <p className="hud-label text-[0.5rem]">Races</p>
          <p className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{team.races}</p>
        </div>
      </div>
    </div>
  );
}
