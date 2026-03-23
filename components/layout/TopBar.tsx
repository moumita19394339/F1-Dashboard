"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, LogOut, User, Settings, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTheme } from "next-themes";

export interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  className?: string;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-sm border transition-all hover:border-accent hover:text-accent group"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}

export function TopBar({
  title,
  onMenuClick,
  showMenuButton = true,
  className,
}: TopBarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky backdrop-blur-xl border-b",
        "h-14 flex items-center justify-between px-4 lg:px-8",
        className,
      )}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-surface-1) 85%, transparent)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-sm border hover:border-accent hover:text-accent transition-all"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
        {title && (
          <h1 className="font-display text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-primary)' }}>{title}</h1>
        )}

        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-sm" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-glow-pulse" />
          <span className="hud-label text-[0.55rem]">System Active</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden sm:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="search"
            placeholder="Search..."
            className="input pl-9 pr-4 py-1.5 w-52 text-sm"
          />
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-sm border transition-all hover:border-accent hover:text-accent"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
            aria-label="Notifications"
          >
            <Bell className="h-3.5 w-3.5" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-dropdown" onClick={() => setShowNotifications(false)} />
              <div
                className="absolute right-0 top-full mt-2 w-72 rounded-md border z-dropdown animate-fade-in"
                style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
              >
                <div className="p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <h3 className="hud-label">Notifications</h3>
                </div>
                <div className="p-4">
                  <p className="text-xs text-center py-6 font-mono" style={{ color: 'var(--color-text-secondary)' }}>No notifications</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-sm border hover:border-accent transition-all"
            style={{ borderColor: 'var(--color-border)' }}
            aria-label="Profile menu"
          >
            <div
              className="h-6 w-6 rounded-sm flex items-center justify-center text-white text-[0.55rem] font-bold font-mono bg-gradient-to-br from-[#E10600] to-[#B30500]"
            >
              {user?.email?.substring(0, 2).toUpperCase() || "U"}
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-dropdown" onClick={() => setShowProfileMenu(false)} />
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-md border z-dropdown animate-fade-in"
                style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-border)' }}
              >
                <div className="p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {user?.full_name || user?.username || 'User'}
                  </p>
                  <p className="hud-label truncate text-[0.55rem] mt-0.5">
                    {user?.email || 'No email'}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs transition-colors text-left hover:bg-surface-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <User className="h-3.5 w-3.5" />
                    Profile
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs transition-colors text-left hover:bg-surface-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Settings
                  </button>
                  <div className="border-t my-1" style={{ borderColor: 'var(--color-border)' }} />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-accent hover:bg-[rgba(225,6,0,0.08)] transition-colors text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
