"use client";

import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  color = "text-accent",
}: MetricsCardProps) {
  return (
    <div className="metric-card group animate-reveal-up">
      <div className="flex items-start justify-between mb-4">
        <div className="h-9 w-9 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface-3)' }}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </div>
      <div>
        <p className="metric-label mb-1">{title}</p>
        <p className="metric-value">{value}</p>
      </div>
    </div>
  );
}
