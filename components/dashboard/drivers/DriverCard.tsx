/**
 * Driver Card Component
 * Displays driver information in grid, list, or table view
 */

"use client";

import { Driver } from "@/lib/api";
import Link from "next/link";
import { Trophy, Award, Target } from "lucide-react";

export type DriverCardVariant = "grid" | "list" | "table";

interface DriverCardProps {
  driver: Driver;
  variant?: DriverCardVariant;
  onClick?: () => void;
}

// Helper function to get era badge
function getEraBadge(firstYear?: number): { label: string; color: string } {
  if (!firstYear) return { label: "Unknown", color: "bg-gray-500" };

  if (firstYear >= 2020) return { label: "Current Era", color: "bg-green-500" };
  if (firstYear >= 2010) return { label: "Modern Era", color: "bg-blue-500" };
  if (firstYear >= 1980) return { label: "Golden Era", color: "bg-yellow-500" };
  if (firstYear >= 1960) return { label: "Classic Era", color: "bg-purple-500" };
  return { label: "Pioneer Era", color: "bg-red-500" };
}

// Helper function to get flag emoji from nationality
function getNationalityFlag(nationality: string): string {
  const flagMap: Record<string, string> = {
    British: "🇬🇧", German: "🇩🇪", Finnish: "🇫🇮", Italian: "🇮🇹",
    Spanish: "🇪🇸", French: "🇫🇷", Brazilian: "🇧🇷", Dutch: "🇳🇱",
    Mexican: "🇲🇽", Australian: "🇦🇺", Canadian: "🇨🇦", Japanese: "🇯🇵",
    American: "🇺🇸", Austrian: "🇦🇹", Belgian: "🇧🇪", Danish: "🇩🇰",
    Polish: "🇵🇱", Swedish: "🇸🇪", Swiss: "🇨🇭", Argentine: "🇦🇷",
    Colombian: "🇨🇴", Venezuelan: "🇻🇪", "New Zealander": "🇳🇿",
    "South African": "🇿🇦", Thai: "🇹🇭", Chinese: "🇨🇳", Indian: "🇮🇳",
    Monégasque: "🇲🇨", Russian: "🇷🇺", Portuguese: "🇵🇹", Irish: "🇮🇪",
  };
  return flagMap[nationality] || "🏁";
}

export function DriverCard({ driver, variant = "grid", onClick }: DriverCardProps) {
  const eraBadge = getEraBadge(driver.first_entry_year);
  const flag = getNationalityFlag(driver.nationality);
  const driverUrl = `/admin/drivers-stats/${driver.id}`;

  const activeYears = driver.first_entry_year && driver.last_entry_year
    ? `${driver.first_entry_year}-${driver.is_active ? "Present" : driver.last_entry_year}`
    : "Unknown";

  // Grid View
  if (variant === "grid") {
    return (
      <Link href={driverUrl} onClick={onClick}>
        <div className="metric-card group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
          {/* Header with era badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{flag}</span>
              {driver.code && (
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {driver.code}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full text-white ${eraBadge.color}`}>
              {eraBadge.label}
            </span>
          </div>

          {/* Driver name */}
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {driver.full_name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{activeYears}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-gray-500">Wins</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{driver.wins}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-gray-500">Podiums</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{driver.podiums}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-3 w-3 text-purple-500" />
                <span className="text-xs text-gray-500">Titles</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{driver.championships}</p>
            </div>
          </div>

          {/* Current team or status */}
          {driver.current_team && driver.is_active && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Current Team</p>
              <p className="text-sm font-semibold text-gray-900">{driver.current_team}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // List View
  if (variant === "list") {
    return (
      <Link href={driverUrl} onClick={onClick}>
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-pointer">
          {/* Left: Name and info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{flag}</span>
              <h3 className="text-base font-bold text-gray-900 truncate">
                {driver.full_name}
              </h3>
              {driver.code && (
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {driver.code}
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${eraBadge.color} ml-auto`}>
                {eraBadge.label}
              </span>
            </div>
            <p className="text-sm text-gray-600">{activeYears}</p>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Wins</p>
              <p className="text-lg font-bold text-gray-900">{driver.wins}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Podiums</p>
              <p className="text-lg font-bold text-gray-900">{driver.podiums}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Championships</p>
              <p className="text-lg font-bold text-gray-900">{driver.championships}</p>
            </div>
            <div className="text-center min-w-[60px]">
              <p className="text-xs text-gray-500 mb-1">Points</p>
              <p className="text-lg font-bold text-gray-900">{driver.career_points.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Table View (simplified for use in table rows)
  return (
    <Link href={driverUrl} onClick={onClick}>
      <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{flag}</span>
            <div>
              <p className="font-semibold text-gray-900">{driver.full_name}</p>
              {driver.code && (
                <p className="text-xs text-gray-500">{driver.code}</p>
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{driver.nationality}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{activeYears}</td>
        <td className="px-4 py-3 text-center font-semibold">{driver.wins}</td>
        <td className="px-4 py-3 text-center font-semibold">{driver.podiums}</td>
        <td className="px-4 py-3 text-center font-semibold">{driver.championships}</td>
        <td className="px-4 py-3 text-center text-gray-600">{driver.career_points.toFixed(0)}</td>
      </tr>
    </Link>
  );
}
