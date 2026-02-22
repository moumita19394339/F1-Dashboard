/**
 * Admin Sidebar Navigation Component
 *
 * Provides left sidebar navigation for the admin portal.
 * Includes navigation links, active route highlighting, and logout functionality.
 */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Trophy, Calendar, Users, Flag, Clock, LogOut, User, LayoutDashboard, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Seasons', href: '/admin/seasons', icon: Calendar },
  { name: 'Teams', href: '/admin/teams', icon: Users },
  { name: 'Drivers', href: '/admin/drivers', icon: Flag },
  { name: 'All Drivers', href: '/admin/all-drivers', icon: UserCircle },
  { name: 'History', href: '/admin/history', icon: Clock },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)

  const handleLogout = async () => {
    setIsLogoutLoading(true)
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLogoutLoading(false)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-f1-dark border-r border-gray-800">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-f1-red" />
          <span className="text-lg font-bold text-white">F1 Admin</span>
        </div>
      </div>

      {/* User Info */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-f1-red">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {user?.full_name || user?.email || 'Admin'}
            </p>
            <p className="truncate text-xs text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-f1-red text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className="
            flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            text-gray-300 transition-colors hover:bg-gray-800 hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <LogOut className="h-5 w-5" />
          <span>{isLogoutLoading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  )
}
