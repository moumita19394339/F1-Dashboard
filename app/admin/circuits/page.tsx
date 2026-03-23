'use client'

import { useDataSeasons } from '@/lib/hooks/useF1Data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Skeleton } from '@/components/ui'
import { Hash, MapPin } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'

export default function AdminCircuitsPage() {
  const { data: seasons, isLoading } = useDataSeasons()

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHero
        title="Race Circuits"
        subtitle="Track-by-track race calendar"
        badge="Circuits"
        imageSrc="/images/f1/f1-pit-crew.jpg"
        imageAlt="F1 pit crew"
      />

      {/* Seasons grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(seasons || []).map((season, i) => (
            <div
              key={season.year}
              className={`rounded-md border p-6 text-center relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] animate-reveal-up stagger-${Math.min(i + 1, 5)} group`}
              style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="font-display text-2xl font-bold mb-1 tracking-wider" style={{ color: 'var(--color-text-primary)' }}>{season.year}</p>
              <div className="flex items-center justify-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                <Hash className="h-3.5 w-3.5" />
                <span className="font-display text-xl font-bold text-accent">{season.race_count}</span>
              </div>
              <p className="hud-label text-[0.5rem] mt-1">races</p>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            About Circuits
          </CardTitle>
          <CardDescription>
            The current data model stores race results in a flat table format. Circuit details
            are embedded in race names within race results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Unique race names and venues can be explored through the race results in the driver pages.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
