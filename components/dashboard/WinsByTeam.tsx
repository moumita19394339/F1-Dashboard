'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from 'next-themes'
import type { WinsByTeamData } from '@/lib/api'

function useChartTheme() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  return {
    textColor: isDark ? '#71717A' : '#71717A',
    textColorPrimary: isDark ? '#EDEDEF' : '#09090B',
    gridColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
    tooltipBg: isDark ? '#0F0F12' : '#FFFFFF',
    tooltipTitle: isDark ? '#EDEDEF' : '#09090B',
    tooltipBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    fontFamily: "'JetBrains Mono', monospace",
    resolvedTheme,
  }
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WinsByTeamProps {
  data: WinsByTeamData[]
}

export function WinsByTeam({ data }: WinsByTeamProps) {
  const theme = useChartTheme()
  const sortedData = [...data].sort((a, b) => b.wins - a.wins)

  const chartData = {
    labels: sortedData.map((item) => item.team_name),
    datasets: [
      {
        label: 'Wins',
        data: sortedData.map((item) => item.wins),
        backgroundColor: sortedData.map((item) => `${item.team_color}CC`),
        borderColor: sortedData.map((item) => item.team_color),
        borderWidth: 1,
        borderRadius: 2,
        hoverBackgroundColor: sortedData.map((item) => item.team_color),
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: theme.tooltipBg,
        titleColor: theme.tooltipTitle,
        bodyColor: theme.textColor,
        borderColor: theme.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        titleFont: { family: theme.fontFamily, size: 10 },
        bodyFont: { family: theme.fontFamily, size: 10 },
        cornerRadius: 3,
        callbacks: {
          label: (context: any) => `Wins: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: theme.textColor, stepSize: 5, font: { family: theme.fontFamily, size: 10 } },
        grid: { color: theme.gridColor },
        border: { color: theme.borderColor },
        min: 0,
      },
      y: {
        ticks: { color: theme.textColorPrimary, font: { family: theme.fontFamily, size: 9 } },
        grid: { display: false },
        border: { color: theme.borderColor },
      },
    },
  }

  return (
    <div className="h-80">
      <Bar key={theme.resolvedTheme} data={chartData} options={options} />
    </div>
  )
}
