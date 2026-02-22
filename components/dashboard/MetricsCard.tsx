/**
 * Metric Card Component
 * Displays a single metric with icon and value
 */

"use client";

import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  color = "text-primary-600",
  bgColor = "bg-primary-50",
}: MetricsCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div>
        <p className="metric-label mb-1">{title}</p>
        <p className="metric-value">{value}</p>
      </div>
    </div>
  );
}
