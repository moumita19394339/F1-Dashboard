"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flag,
  UserCircle,
  BarChart3,
  Zap,
  BookOpen,
  Trophy,
  Building2,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: number | string;
  section?: string;
}

const navItems: NavItem[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard, section: "Analytics" },
  { title: "Driver Stats", href: "/admin/drivers-stats", icon: BarChart3, section: "Analytics" },
  { title: "All Drivers", href: "/admin/all-drivers", icon: UserCircle, section: "Analytics" },
  { title: "Constructor Stats", href: "/admin/constructor-stats", icon: Trophy, section: "Analytics" },
  { title: "All Constructors", href: "/admin/all-constructors", icon: Building2, section: "Analytics" },
  { title: "History", href: "/admin/history", icon: BookOpen, section: "Analytics" },
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
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-fixed bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "sidebar fixed lg:sticky top-0 z-modal h-screen transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        {/* Header */}
        <div className="sidebar-header">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-[#E10600] to-[#B30500] text-white flex-shrink-0 shadow-lg shadow-[rgba(225,6,0,0.3)]">
              <Zap className="h-4 w-4" />
              <div className="absolute inset-0 rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-display font-bold text-xs tracking-widest block" style={{ color: 'var(--color-text-primary)' }}>
                  F1 DATA
                </span>
                <span className="hud-label text-[0.55rem] block mt-0.5 opacity-60">Race Control</span>
              </div>
            )}
          </Link>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-sm border transition-all z-10 hover:border-accent hover:text-accent"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-1)', color: 'var(--color-text-secondary)' }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>

        {/* Navigation */}
        <nav className="sidebar-content">
          <div className="space-y-4">
            {["Analytics", "Management"].map((section) => {
              const sectionItems = navItems.filter((item) => item.section === section);
              if (sectionItems.length === 0) return null;

              return (
                <div key={section}>
                  {!isCollapsed && (
                    <p className="nav-section-label">{section}</p>
                  )}
                  <div className="space-y-0.5">
                    {sectionItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "nav-item",
                            isActive && "nav-item-active",
                            isCollapsed && "justify-center px-3",
                          )}
                          title={isCollapsed ? item.title : undefined}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              {item.badge && (
                                <span className="ml-auto flex h-5 min-w-5 px-1 items-center justify-center rounded-sm bg-[rgba(225,6,0,0.12)] text-[0.6rem] font-bold text-accent font-mono">
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
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-sm text-white text-[0.6rem] font-bold font-mono flex-shrink-0 bg-gradient-to-br from-[#E10600] to-[#B30500]"
            >
              {user?.email?.substring(0, 2).toUpperCase() || "U"}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {user?.full_name || user?.username || 'User'}
                </p>
                <p className="hud-label truncate text-[0.55rem]">
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
