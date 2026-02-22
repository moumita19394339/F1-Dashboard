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

  // Don't show submenu on individual driver pages
  const isDriverDetailPage = pathname?.match(/\/admin\/drivers-stats\/\d+/)

  return (
    <div className="space-y-6">
      {/* Submenu Navigation */}
      {!isDriverDetailPage && (
        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-neutral-200">
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
                      ? 'border-f1-red bg-red-50 text-f1-red font-semibold'
                      : 'border-transparent hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-neutral-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Page Content */}
      {children}
    </div>
  )
}
