'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BarChart3, Users } from 'lucide-react'

const submenuItems = [
  {
    title: 'Overview',
    href: '/admin/drivers-stats',
    icon: BarChart3,
    description: 'Driver statistics and analytics',
  },
  {
    title: 'Compare Drivers',
    href: '/admin/drivers-stats/compare',
    icon: Users,
    description: 'Side-by-side driver comparison',
  },
]

export default function DriversStatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isDriverDetailPage = pathname?.match(/\/admin\/drivers-stats\/\d+/)

  return (
    <div className="space-y-6">
      {!isDriverDetailPage && (
        <div
          className="rounded-md border overflow-hidden relative"
          style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />
          <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
            {submenuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-6 py-4 border-b-2 transition-all',
                    isActive
                      ? 'border-accent bg-[rgba(225,6,0,0.06)] text-accent font-semibold'
                      : 'border-transparent hover:bg-surface-3'
                  )}
                  style={!isActive ? { color: 'var(--color-text-secondary)' } : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider">{item.title}</div>
                    <div className="hud-label text-[0.5rem] mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
