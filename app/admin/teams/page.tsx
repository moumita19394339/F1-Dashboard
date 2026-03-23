'use client'

import { useState } from 'react'
import { Flag, Search, Trophy } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { useTeams } from '@/lib/hooks/useF1Data'
import type { ConstructorStats } from '@/lib/api/types'

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
}

function getTeamColor(name: string): string {
  for (const [key, color] of Object.entries(TEAM_COLORS)) {
    if (key.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(key.toLowerCase())) {
      return color
    }
  }
  return '#71717A'
}

export default function AdminTeamsPage() {
  const [search, setSearch] = useState('')
  const { data: teams, isLoading } = useTeams()

  const filtered = (teams || []).filter(t =>
    !search || t.constructor_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="mb-6">
        <PageHero
          title="Constructor Analysis"
          subtitle="Team performance across all seasons"
          badge="Constructors"
          imageSrc="/images/f1/f1-car-detail.jpg"
          imageAlt="F1 car detail"
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
            placeholder="Search teams..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Team Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-44 rounded-md animate-pulse" style={{ backgroundColor: 'var(--color-surface-2)' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {search ? `No teams matching "${search}"` : 'No teams found'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((team, i) => (
            <TeamCard key={team.constructor_name} team={team} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function TeamCard({ team, index }: { team: ConstructorStats; index: number }) {
  const color = getTeamColor(team.constructor_name)

  return (
    <div
      className={`rounded-md border overflow-hidden transition-all duration-300 animate-reveal-up stagger-${Math.min(index + 1, 6)} group hover:translate-y-[-2px]`}
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Team color top accent */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      {/* Header */}
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
            { label: 'Wins', value: team.wins, color: '#F59E0B', icon: Trophy },
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
  )
}
