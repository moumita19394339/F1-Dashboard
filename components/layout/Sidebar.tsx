"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  LayoutDashboard,
  History,
  Trophy,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flag,
  UserCircle,
  BarChart3,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: number | string;
  section?: string;
}

const navItems: NavItem[] = [
  // Analytics Section
  { title: "Overview", href: "/admin", icon: LayoutDashboard, section: "Analytics" },
  { title: "History", href: "/admin/history", icon: History, section: "Analytics" },
  // { title: "Driver Stats", href: "/admin/drivers-stats", icon: BarChart3, section: "Analytics" },
  // { title: "All Drivers", href: "/admin/all-drivers", icon: UserCircle, section: "Analytics" },

  // Data Management Section
  { title: "Manage Seasons", href: "/admin/seasons", icon: Trophy, section: "Management" },
  { title: "Manage Teams", href: "/admin/teams", icon: Flag, section: "Management" },
  { title: "Manage Drivers", href: "/admin/drivers", icon: Users, section: "Management" },
  { title: "Manage Circuits", href: "/admin/circuits", icon: Calendar, section: "Management" },
];

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    // Close mobile sidebar on route change
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-fixed bg-neutral-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "sidebar fixed lg:sticky top-0 z-modal h-screen transition-all duration-300",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        {/* Header */}
        <div className="sidebar-header">
          <Link
            href="/admin"
            className="flex items-center gap-3 font-bold text-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
              <span className="font-bold text-lg">F1</span>
            </div>
            {!isCollapsed && (
              <span className="text-neutral-900">Dashboard</span>
            )}
          </Link>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 hover:border-primary-300 transition-all shadow-md z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="sidebar-content px-3">
          <div className="space-y-6">
            {/* Group items by section */}
            {["Analytics"].map((section) => {
              const sectionItems = navItems.filter((item) => item.section === section);
              if (sectionItems.length === 0) return null;

              return (
                <div key={section}>
                  {!isCollapsed && (
                    <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      {section}
                    </p>
                  )}
                  <div className="space-y-1">
                    {sectionItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "nav-item flex items-center gap-3",
                            isActive && "nav-item-active",
                            isCollapsed && "justify-center px-3",
                          )}
                          title={isCollapsed ? item.title : undefined}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              {item.badge && (
                                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 border border-primary-200">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed && "justify-center",
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-700 text-sm font-bold shadow-sm">
              {user?.email?.substring(0, 2).toUpperCase() || "U"}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {user?.full_name || user?.username || 'User'}
                </p>
                <p className="text-xs text-neutral-600 truncate">
                  {user?.email || 'No email'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
