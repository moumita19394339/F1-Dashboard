"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, LogOut, User, Settings } from "lucide-react";
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";

export interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  className?: string;
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
        "sticky top-0 z-sticky bg-white/95 backdrop-blur-lg border-b border-neutral-200 shadow-sm",
        "h-16 flex items-center justify-between px-4 lg:px-8",
        className,
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-lg hover:bg-neutral-100 transition-all hover:shadow-sm"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-neutral-700" />
          </button>
        )}
        {title && (
          <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2.5 w-72 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all shadow-sm"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-lg hover:bg-neutral-100 transition-all hover:shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-neutral-700" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-dropdown"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-3 w-80 rounded-xl bg-white shadow-xl border border-neutral-200 z-dropdown animate-fade-in">
                <div className="p-4 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
                  <h3 className="font-bold text-neutral-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <p className="text-sm text-neutral-500 text-center py-8">
                      No new notifications
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-100 transition-all hover:shadow-sm"
            aria-label="Profile menu"
          >
            <Avatar
              size="sm"
              src=""
              alt={user?.full_name || user?.email || "User"}
              fallback={user?.email?.substring(0, 2).toUpperCase() || "U"}
            />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-dropdown"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white shadow-lg border border-neutral-200 z-dropdown animate-fade-in">
                <div className="p-4 border-b border-neutral-200">
                  <p className="text-sm font-medium text-neutral-900">
                    {user?.full_name || user?.username || 'User'}
                  </p>
                  <p className="text-xs text-neutral-500">{user?.email || 'No email'}</p>
                </div>
                <div className="py-2">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <div className="border-t border-neutral-200 my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
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
