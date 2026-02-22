"use client";

import { useState } from "react";
import {
  useDashboardStats,
  useWinsOverTime,
  useWinsByTeam,
  useSpeedByCircuit,
} from "@/lib/hooks/useF1Data";
import { WinsOverTime } from "@/components/dashboard/WinsOverTime";
import { WinsByTeam } from "@/components/dashboard/WinsByTeam";
import { SpeedByCircuit } from "@/components/dashboard/SpeedByCircuit";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Select,
  Skeleton,
} from "@/components/ui";
import { Trophy, TrendingUp, Award, Zap, Percent } from "lucide-react";

export default function AdminDashboardPage() {
  const [selectedSeason, setSelectedSeason] = useState<number | "All">("All");
  const seasonParam = selectedSeason === "All" ? undefined : selectedSeason;

  const { data: summary, isLoading: summaryLoading } =
    useDashboardStats(seasonParam);
  const { data: winsOverTime, isLoading: winsOverTimeLoading } =
    useWinsOverTime(2020, 2024, seasonParam);
  const { data: winsByTeam, isLoading: winsByTeamLoading } =
    useWinsByTeam(seasonParam);
  const { data: speedByCircuit, isLoading: speedByCircuitLoading } =
    useSpeedByCircuit(seasonParam);

  const metrics = [
    {
      title: "Total Wins",
      value: summary?.total_wins || 0,
      icon: Trophy,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Podiums",
      value: summary?.total_podiums || 0,
      icon: Award,
      color: "text-warning-600",
      bgColor: "bg-warning-50",
    },
    {
      title: "Avg Points",
      value: summary?.average_points.toFixed(1) || "0.0",
      icon: TrendingUp,
      color: "text-info-600",
      bgColor: "bg-info-50",
    },
    {
      title: "Avg Speed",
      value: `${summary?.average_speed.toFixed(1) || "0.0"} km/h`,
      icon: Zap,
      color: "text-success-600",
      bgColor: "bg-success-50",
    },
    {
      title: "Win Rate",
      value: `${summary?.win_percentage.toFixed(1) || "0.0"}%`,
      icon: Percent,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white rounded-xl border border-neutral-200 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Dashboard Overview
          </h1>
          <p className="text-lg text-neutral-600 mt-1">
            F1 Team Championship (2020-2024)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-bold text-neutral-800">Season:</label>
          <Select
            value={String(selectedSeason)}
            onChange={(e) =>
              setSelectedSeason(
                e.target.value === "All" ? "All" : parseInt(e.target.value),
              )
            }
            className="w-40"
          >
            <option value="All">All Seasons</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </Select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-xl hover:border-primary-200 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl ${metric.bgColor} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                  >
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-neutral-900">
                    {metric.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              Wins Over Time
            </CardTitle>
            <CardDescription>
              Team performance trends across seasons
            </CardDescription>
          </CardHeader>
          <CardContent>
            {winsOverTimeLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsOverTime data={winsOverTime || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning-600" />
              Wins by Team
            </CardTitle>
            <CardDescription>Total race wins by constructor</CardDescription>
          </CardHeader>
          <CardContent>
            {winsByTeamLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <WinsByTeam data={winsByTeam || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-success-600" />
              Speed by Circuit
            </CardTitle>
            <CardDescription>Fastest lap speeds by track</CardDescription>
          </CardHeader>
          <CardContent>
            {speedByCircuitLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <SpeedByCircuit data={speedByCircuit || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
