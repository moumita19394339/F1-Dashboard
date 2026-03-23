'use client'

import { useState, useRef } from 'react'
import { Users, Search, Trophy, ArrowUpDown, ArrowUp, ArrowDown, Camera, Check, X, Loader2, Upload } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { useDrivers, useUpdateDriverPhoto, useImportDriverData } from '@/lib/hooks/useF1Data'
import type { DriverStats } from '@/lib/api/types'

export default function AdminDriversPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('wins')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [importOpen, setImportOpen] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importResult, setImportResult] = useState<{ rows_added: number; rows_skipped: number } | null>(null)
  const importMutation = useImportDriverData()

  const { data: driversData, isLoading } = useDrivers({
    sort_by: sortBy,
    sort_order: sortOrder,
    search: search || undefined,
    page_size: 100,
  })

  const drivers = driversData?.drivers || []

  const handleSort = (col: string) => {
    if (col === sortBy) {
      setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortOrder('desc')
    }
  }

  const SortIcon = ({ col }: { col: string }) => {
    if (col !== sortBy) return <ArrowUpDown className="h-3 w-3 ml-1 inline opacity-40" />
    return sortOrder === 'asc'
      ? <ArrowUp className="h-3 w-3 ml-1 inline text-accent" />
      : <ArrowDown className="h-3 w-3 ml-1 inline text-accent" />
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="mb-6">
        <PageHero
          title="Driver Registry"
          subtitle="Statistics and photo management"
          badge="Management"
          imageSrc="/images/f1/f1-cockpit.jpg"
          imageAlt="F1 cockpit"
        />
      </div>

      {/* Search */}
      <div
        className="p-4 rounded-md border animate-reveal-up relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="search"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-md border overflow-hidden animate-reveal-up stagger-1"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
      >
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-2)' }}>
          <Users className="h-3.5 w-3.5 text-accent" />
          <h2 className="hud-label flex-1">
            Driver Statistics // {driversData?.total || 0} pilots
          </h2>
          <button
            onClick={() => { setImportOpen(true); setImportFile(null); setImportResult(null); importMutation.reset() }}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
          >
            <Upload className="h-3.5 w-3.5" /> Import CSV / Excel
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center hud-label">Loading drivers...</div>
        ) : drivers.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="mx-auto h-10 w-10 mb-4" style={{ color: 'var(--color-text-secondary)', opacity: 0.4 }} />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {search ? `No results for "${search}"` : 'No drivers found'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                  <th className="px-4 py-3 text-left hud-label">Driver</th>
                  <th className="px-4 py-3 text-left hud-label">Constructor</th>
                  <th
                    className="px-4 py-3 text-center hud-label cursor-pointer hover:text-accent transition-colors"
                    onClick={() => handleSort('wins')}
                  >
                    Wins <SortIcon col="wins" />
                  </th>
                  <th
                    className="px-4 py-3 text-center hud-label cursor-pointer hover:text-accent transition-colors"
                    onClick={() => handleSort('podiums')}
                  >
                    Podiums <SortIcon col="podiums" />
                  </th>
                  <th
                    className="px-4 py-3 text-center hud-label cursor-pointer hover:text-accent transition-colors"
                    onClick={() => handleSort('points')}
                  >
                    Points <SortIcon col="points" />
                  </th>
                  <th
                    className="px-4 py-3 text-center hud-label cursor-pointer hover:text-accent transition-colors"
                    onClick={() => handleSort('races')}
                  >
                    Races <SortIcon col="races" />
                  </th>
                  <th className="px-4 py-3 text-center hud-label">Seasons</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <DriverRow key={driver.driver_name} driver={driver} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Import Modal */}
      {importOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setImportOpen(false)}>
          <div
            className="relative w-full max-w-md rounded-md border p-6 space-y-4"
            style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent rounded-t-md" />
            <div className="flex items-center justify-between">
              <h3 className="hud-label text-sm">Import Driver Data</h3>
              <button onClick={() => setImportOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Upload a <code className="px-1 py-0.5 rounded text-accent" style={{ backgroundColor: 'var(--color-surface-2)' }}>.csv</code> or <code className="px-1 py-0.5 rounded text-accent" style={{ backgroundColor: 'var(--color-surface-2)' }}>.xlsx</code> file.
              Required columns: <span className="font-mono text-[0.65rem] leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>year, date, race_name, driver_name, driver_nationality, constructor_name, constructor_nationality, grid, position, positionText, points, finished, podium, win</span>
            </p>

            <label
              className="flex items-center gap-3 cursor-pointer rounded border px-4 py-3 text-sm transition-colors hover:border-accent"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-2)', color: importFile ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
            >
              <Upload className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="truncate flex-1">{importFile ? importFile.name : 'Choose file…'}</span>
              {importFile && <Check className="h-4 w-4 text-green-400 flex-shrink-0" />}
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => { setImportFile(e.target.files?.[0] ?? null); setImportResult(null); importMutation.reset() }}
              />
            </label>

            {importMutation.isError && (
              <p className="text-xs text-red-400">
                {(importMutation.error as { message?: string })?.message ?? 'Upload failed'}
              </p>
            )}
            {importResult && (
              <p className="text-xs text-green-400">
                ✓ {importResult.rows_added} rows added, {importResult.rows_skipped} skipped
              </p>
            )}

            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setImportOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
              <button
                disabled={!importFile || importMutation.isPending}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
                onClick={() => {
                  if (!importFile) return
                  importMutation.mutate(importFile, {
                    onSuccess: (data) => {
                      setImportResult(data)
                      setTimeout(() => setImportOpen(false), 2000)
                    },
                  })
                }}
              >
                {importMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DriverRow({ driver }: { driver: DriverStats }) {
  const flag = getNationalityFlag(driver.driver_nationality || '')
  const teams = driver.constructors.join(', ')
  const years =
    driver.first_year && driver.last_year
      ? driver.first_year === driver.last_year
        ? String(driver.first_year)
        : `${driver.first_year}-${driver.last_year}`
      : '-'

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadPhoto, isPending: uploading } = useUpdateDriverPhoto()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    uploadPhoto(
      { driverName: driver.driver_name, file },
      {
        onSuccess: () => {
          setStatus('success')
          setTimeout(() => setStatus('idle'), 2000)
        },
        onError: () => {
          setStatus('error')
          setTimeout(() => setStatus('idle'), 2000)
        },
      }
    )
    e.target.value = ''
  }

  return (
    <tr
      className="hover:bg-surface-3 transition-colors group"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border group/avatar focus:outline-none"
            style={{ borderColor: 'var(--color-border)' }}
            onClick={() => fileInputRef.current?.click()}
            title="Upload photo"
          >
            {driver.photo_filename ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') ?? 'http://localhost:8000'}/static/images/drivers/${driver.photo_filename}`}
                alt={driver.driver_name}
                className="h-full w-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ) : (
              <span className="flex items-center justify-center h-full w-full text-base"
                    style={{ backgroundColor: 'var(--color-surface-2)' }}>
                {flag}
              </span>
            )}
            {/* Overlay */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
              ) : status === 'success' ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : status === 'error' ? (
                <X className="h-3.5 w-3.5 text-red-400" />
              ) : (
                <Camera className="h-3.5 w-3.5 text-white" />
              )}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{driver.driver_name}</p>
            {driver.driver_nationality && (
              <p className="hud-label text-[0.55rem]">{driver.driver_nationality}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 max-w-[180px]">
        <span className="truncate block text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }} title={teams}>{teams || '-'}</span>
      </td>
      <td className="px-4 py-3 text-center">
        {driver.wins > 0 ? (
          <span className="inline-flex items-center gap-1 font-display font-bold text-sm" style={{ color: '#F59E0B' }}>
            <Trophy className="h-3 w-3" />
            {driver.wins}
          </span>
        ) : (
          <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>-</span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        {driver.podiums > 0 ? (
          <span className="font-display font-bold text-sm" style={{ color: '#22C55E' }}>{driver.podiums}</span>
        ) : (
          <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>-</span>
        )}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono" style={{ color: 'var(--color-text-primary)' }}>
        {driver.points.toFixed(0)}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{driver.races}</td>
      <td className="px-4 py-3 text-center text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{years}</td>
    </tr>
  )
}

function getNationalityFlag(nationality: string): string {
  const flagMap: Record<string, string> = {
    British: '🇬🇧', German: '🇩🇪', Finnish: '🇫🇮', Italian: '🇮🇹',
    Spanish: '🇪🇸', French: '🇫🇷', Brazilian: '🇧🇷', Dutch: '🇳🇱',
    Mexican: '🇲🇽', Australian: '🇦🇺', Canadian: '🇨🇦', Japanese: '🇯🇵',
    American: '🇺🇸', Austrian: '🇦🇹', Belgian: '🇧🇪', Danish: '🇩🇰',
    Polish: '🇵🇱', Swedish: '🇸🇪', Swiss: '🇨🇭', Argentine: '🇦🇷',
    Monégasque: '🇲🇨', Russian: '🇷🇺', Portuguese: '🇵🇹', Thai: '🇹🇭',
    Chinese: '🇨🇳',
  }
  return flagMap[nationality] || '🏁'
}
