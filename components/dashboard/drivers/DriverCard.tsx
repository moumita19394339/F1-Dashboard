/**
 * Driver Card Component
 * Displays driver information in grid, list, or table view
 */

"use client";

import type { DriverStats } from "@/lib/api";
import { Trophy, Target, Star } from "lucide-react";

export type DriverCardVariant = "grid" | "list" | "table";

interface DriverCardProps {
  driver: DriverStats;
  variant?: DriverCardVariant;
  onClick?: () => void;
}

function getEraBadge(firstYear?: number): { label: string; color: string } {
  if (!firstYear) return { label: "Unknown", color: "bg-gray-500" };
  if (firstYear >= 2020) return { label: "Current Era", color: "bg-green-500" };
  if (firstYear >= 2010) return { label: "Modern Era", color: "bg-blue-500" };
  if (firstYear >= 1980) return { label: "Golden Era", color: "bg-yellow-500" };
  return { label: "Classic Era", color: "bg-purple-500" };
}

function getNationalityFlag(nationality?: string): string {
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
  return nationality ? (flagMap[nationality] || "🏁") : "🏁";
}

export function DriverCard({ driver, variant = "grid", onClick }: DriverCardProps) {
  const eraBadge = getEraBadge(driver.first_year);
  const flag = getNationalityFlag(driver.driver_nationality);
  const currentTeam = driver.constructors[driver.constructors.length - 1] || "—";
  const isActive = driver.last_year != null && driver.last_year >= 2024;

  const activeYears =
    driver.first_year && driver.last_year
      ? `${driver.first_year}–${isActive ? "Present" : driver.last_year}`
      : "—";

  // Grid View
  if (variant === "grid") {
    return (
      <div
        className="metric-card group hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{flag}</span>
          <span className={`text-xs px-2 py-1 rounded-full text-white ${eraBadge.color}`}>
            {eraBadge.label}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
          {driver.driver_name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{activeYears}</p>

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
              <span className="text-xs text-gray-500">Pods</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{driver.podiums}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-3 w-3 text-purple-500" />
              <span className="text-xs text-gray-500">Pts</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{driver.points.toFixed(0)}</p>
          </div>
        </div>

        {isActive && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Current Team</p>
            <p className="text-sm font-semibold text-gray-900">{currentTeam}</p>
          </div>
        )}
      </div>
    );
  }

  // List View
  if (variant === "list") {
    return (
      <div
        className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{flag}</span>
            <h3 className="text-base font-bold text-gray-900 truncate">{driver.driver_name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${eraBadge.color} ml-auto`}>
              {eraBadge.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">{activeYears}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Wins</p>
            <p className="text-lg font-bold text-gray-900">{driver.wins}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Podiums</p>
            <p className="text-lg font-bold text-gray-900">{driver.podiums}</p>
          </div>
          <div className="text-center min-w-[60px]">
            <p className="text-xs text-gray-500 mb-1">Points</p>
            <p className="text-lg font-bold text-gray-900">{driver.points.toFixed(0)}</p>
          </div>
        </div>
      </div>
    );
  }

  // Table View
  return (
    <tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flag}</span>
          <p className="font-semibold text-gray-900">{driver.driver_name}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{driver.driver_nationality}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{activeYears}</td>
      <td className="px-4 py-3 text-center font-semibold">{driver.wins}</td>
      <td className="px-4 py-3 text-center font-semibold">{driver.podiums}</td>
      <td className="px-4 py-3 text-center text-gray-600">{driver.points.toFixed(0)}</td>
    </tr>
  );
}
