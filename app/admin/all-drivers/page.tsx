"use client";

import { useState, useMemo, useEffect } from "react";
import { useDrivers, useDriverNationalities } from "@/lib/hooks/useF1Data";
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
import { Users, Grid3X3, List, ChevronLeft, ChevronRight, Trophy, Target, Star } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import type { DriverStats } from "@/lib/api/types";

type ViewMode = 'grid' | 'list';

export default function AllDriversPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [nationality, setNationality] = useState('');
  const [minWins, setMinWins] = useState('');
  const [sortBy, setSortBy] = useState('wins');
  const [sortOrder, setSortOrder] = useState('desc');

  const apiFilters = useMemo(() => ({
    page,
    page_size: 24,
    ...(search && { search }),
    ...(nationality && { nationality }),
    ...(minWins && { min_wins: parseInt(minWins) }),
    sort_by: sortBy,
    sort_order: sortOrder,
  }), [page, search, nationality, minWins, sortBy, sortOrder]);

  const { data: driversData, isLoading } = useDrivers(apiFilters);
  const { data: nationalities = [] } = useDriverNationalities();

  const filteredDrivers = driversData?.drivers || [];
  const totalPages = driversData ? Math.ceil(driversData.total / (driversData.page_size || 24)) : 0;
  const startIndex = driversData ? ((driversData.page - 1) * driversData.page_size) + 1 : 0;
  const endIndex = driversData ? Math.min(driversData.page * driversData.page_size, driversData.total) : 0;

  useEffect(() => { setPage(1); }, [search, nationality, minWins, sortBy, sortOrder]);

  const handleReset = () => {
    setSearch(''); setNationality(''); setMinWins('');
    setSortBy('wins'); setSortOrder('desc'); setPage(1);
  };

  const hasFilters = search || nationality || minWins;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHero
        title="Driver Directory"
        subtitle="Complete grid 2020–2024"
        badge="Directory"
        imageSrc="/images/f1/f1-podium.jpg"
        imageAlt="F1 podium"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-accent" />
                Driver Directory ({driversData?.total || 0})
              </CardTitle>
              <CardDescription>Search, filter, and explore driver profiles</CardDescription>
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
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Input
                placeholder="Search drivers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Select value={nationality} onChange={e => setNationality(e.target.value)}>
                <option value="">All Nationalities</option>
                {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
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
                  <option value="driver_name">Name</option>
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
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Driver Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-48" />)}
              </div>
            ) : filteredDrivers.length > 0 ? (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
              }>
                {filteredDrivers.map(driver => (
                  <DriverCard key={driver.driver_name} driver={driver} variant={viewMode} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No drivers found"
                description="Try adjusting your filters to see more results"
              />
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Page <strong className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{page}</strong> of <strong className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{totalPages}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline" size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    icon={<ChevronLeft className="h-3.5 w-3.5" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline" size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DriverPhoto({ photoFilename, driverName, flagFallback, size = 'md' }: {
  photoFilename?: string; driverName: string; flagFallback: string; size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-20 w-20' }[size]
  if (!photoFilename) return <span className={size === 'sm' ? 'text-lg' : 'text-2xl'}>{flagFallback}</span>
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 border`}
         style={{ borderColor: 'var(--color-border)' }}>
      <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') ?? 'http://localhost:8000'}/static/images/drivers/${photoFilename}`} alt={driverName}
           className="h-full w-full object-cover object-top"
           onError={(e) => {
             e.currentTarget.style.display = 'none';
             e.currentTarget.parentElement!.textContent = flagFallback;
           }} />
    </div>
  )
}

function getNationalityFlag(nationality?: string): string {
  const flagMap: Record<string, string> = {
    British: '🇬🇧', German: '🇩🇪', Finnish: '🇫🇮', Italian: '🇮🇹',
    Spanish: '🇪🇸', French: '🇫🇷', Brazilian: '🇧🇷', Dutch: '🇳🇱',
    Mexican: '🇲🇽', Australian: '🇦🇺', Canadian: '🇨🇦', Japanese: '🇯🇵',
    American: '🇺🇸', Austrian: '🇦🇹', Belgian: '🇧🇪', Danish: '🇩🇰',
    Polish: '🇵🇱', Swedish: '🇸🇪', Swiss: '🇨🇭', Monégasque: '🇲🇨',
    Monegasque: '🇲🇨', Russian: '🇷🇺', Portuguese: '🇵🇹', Thai: '🇹🇭',
    Chinese: '🇨🇳', Argentine: '🇦🇷', 'New Zealander': '🇳🇿',
    'South African': '🇿🇦', Colombian: '🇨🇴', Venezuelan: '🇻🇪',
    Irish: '🇮🇪', Indian: '🇮🇳', Chilean: '🇨🇱', Hungarian: '🇭🇺',
    Malaysian: '🇲🇾', Indonesian: '🇮🇩', Uruguayan: '🇺🇾', Czech: '🇨🇿',
    Liechtensteiner: '🇱🇮', Rhodesian: '🏁', 'East German': '🏁',
    'American-Italian': '🇺🇸', 'Argentine-Italian': '🇦🇷',
  }
  return nationality ? (flagMap[nationality] || '🏁') : '🏁'
}

function getEraBadge(firstYear?: number): { label: string; color: string; bg: string } {
  if (!firstYear) return { label: 'Unknown', color: '#71717A', bg: 'rgba(113,113,122,0.12)' }
  if (firstYear >= 2020) return { label: 'Current', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' }
  if (firstYear >= 2010) return { label: 'Modern', color: '#00D4FF', bg: 'rgba(0,212,255,0.12)' }
  return { label: 'Classic', color: '#A855F7', bg: 'rgba(168,85,247,0.12)' }
}

function DriverCard({ driver, variant }: { driver: DriverStats; variant: ViewMode }) {
  const flag = getNationalityFlag(driver.driver_nationality)
  const era = getEraBadge(driver.first_year)
  const currentTeam = driver.constructors[driver.constructors.length - 1] || '-'
  const years = driver.first_year && driver.last_year
    ? driver.first_year === driver.last_year
      ? String(driver.first_year)
      : `${driver.first_year}-${driver.last_year}`
    : '-'

  if (variant === 'list') {
    return (
      <div
        className="flex items-center gap-4 p-4 rounded-md border transition-all hover:border-[rgba(225,6,0,0.15)]"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
      >
        <DriverPhoto photoFilename={driver.photo_filename} driverName={driver.driver_name} flagFallback={flag} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{driver.driver_name}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{driver.driver_nationality || '-'}</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{currentTeam} // {years}</p>
        </div>
        <div className="flex items-center gap-6 text-center">
          <div><p className="hud-label text-[0.5rem] mb-0.5">Wins</p><p className="font-bold font-display text-base" style={{ color: 'var(--color-text-primary)' }}>{driver.wins}</p></div>
          <div><p className="hud-label text-[0.5rem] mb-0.5">Pods</p><p className="font-bold font-display text-base" style={{ color: 'var(--color-text-primary)' }}>{driver.podiums}</p></div>
          <div><p className="hud-label text-[0.5rem] mb-0.5">Pts</p><p className="font-bold font-display text-base" style={{ color: 'var(--color-text-primary)' }}>{driver.points.toFixed(0)}</p></div>
          <div><p className="hud-label text-[0.5rem] mb-0.5">Races</p><p className="font-bold font-display text-base" style={{ color: 'var(--color-text-primary)' }}>{driver.races}</p></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-md border p-4 transition-all hover:border-[rgba(225,6,0,0.15)] hover:translate-y-[-2px] relative overflow-hidden group"
      style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
    >
      {/* Accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between mb-3">
        <DriverPhoto photoFilename={driver.photo_filename} driverName={driver.driver_name} flagFallback={flag} size="lg" />
        <span
          className="text-[0.6rem] px-2 py-0.5 rounded-sm font-mono font-bold uppercase tracking-wider"
          style={{ backgroundColor: era.bg, color: era.color }}
        >
          {era.label}
        </span>
      </div>
      <h3 className="text-base font-bold font-display tracking-wide mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{driver.driver_name}</h3>
      <p className="hud-label text-[0.55rem] mb-1">{driver.driver_nationality || '-'}</p>
      <p className="text-sm mb-3 font-mono" style={{ color: 'var(--color-text-secondary)' }}>{years}</p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center rounded-sm py-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <p className="hud-label text-[0.5rem] mb-1 flex items-center justify-center gap-1">
            <Trophy className="h-2.5 w-2.5" style={{ color: '#F59E0B' }} /> Wins
          </p>
          <p className="font-display text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{driver.wins}</p>
        </div>
        <div className="text-center rounded-sm py-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <p className="hud-label text-[0.5rem] mb-1 flex items-center justify-center gap-1">
            <Target className="h-2.5 w-2.5" style={{ color: '#00D4FF' }} /> Pods
          </p>
          <p className="font-display text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{driver.podiums}</p>
        </div>
        <div className="text-center rounded-sm py-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <p className="hud-label text-[0.5rem] mb-1 flex items-center justify-center gap-1">
            <Star className="h-2.5 w-2.5" style={{ color: '#A855F7' }} /> Pts
          </p>
          <p className="font-display text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{driver.points.toFixed(0)}</p>
        </div>
      </div>
      <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="hud-label text-[0.5rem] mb-1">
          {driver.constructors.length > 1 ? 'Teams' : 'Team'}
        </p>
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }} title={driver.constructors.join(', ')}>
          {driver.constructors.join(', ') || '-'}
        </p>
      </div>
    </div>
  )
}
