"use client";

import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export default function AdminSeasonsPage() {
  const seasons = [2024, 2023, 2022, 2021, 2020];

  return (
    <>
      <div className="mb-6">
        <PageHero
          title="Seasonal Performance"
          subtitle="Five seasons of Formula 1 data"
          badge="Seasons"
          imageSrc="/images/f1/f1-night-race.jpg"
          imageAlt="F1 night race"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seasons.map((year, i) => (
          <Link key={year} href={`/admin?season=${year}`}>
            <div
              className={`rounded-md border transition-all duration-300 cursor-pointer group p-6 relative overflow-hidden hover:translate-y-[-2px] animate-reveal-up stagger-${Math.min(i + 1, 5)}`}
              style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
            >
              {/* Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-sm transition-all"
                    style={{ backgroundColor: 'rgba(225,6,0,0.08)' }}
                  >
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                      {year}
                    </h2>
                    <p className="hud-label text-[0.55rem] mt-0.5">View detailed performance</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent" />
              </div>

              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-display text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>-</p>
                    <p className="hud-label text-[0.5rem]">Races</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>-</p>
                    <p className="hud-label text-[0.5rem]">Winner</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>-</p>
                    <p className="hud-label text-[0.5rem]">Teams</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-8 rounded-md border p-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />
        <h3 className="font-display text-sm font-bold tracking-wide mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Season Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { year: '2024', note: "Verstappen's continued dominance with Red Bull" },
            { year: '2023', note: 'Record-breaking season for Verstappen and Red Bull' },
            { year: '2022', note: 'New regulations, intense Ferrari vs Red Bull battle' },
            { year: '2021', note: 'Hamilton vs Verstappen: Title decided on final lap' },
            { year: '2020', note: 'Pandemic-affected season, Hamilton equals record' },
          ].map(item => (
            <div
              key={item.year}
              className="p-4 rounded-sm border transition-all hover:border-[rgba(225,6,0,0.2)]"
              style={{ backgroundColor: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
            >
              <h4 className="font-display font-bold text-sm tracking-wider text-accent">{item.year}</h4>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
