'use client'

import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'next-themes'
import type { WinsOverTimeData } from '@/lib/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface WinsOverTimeProps {
  data: WinsOverTimeData[]
}

const teamColors: Record<string, string> = {
  'Red Bull Racing': '#3671C6',
  'Mercedes': '#27F4D2',
  'Ferrari': '#F91536',
  'McLaren': '#F58020',
  'Aston Martin': '#229971',
  'Alpine': '#FF87BC',
  'Williams': '#64C4FF',
  'AlphaTauri': '#5E8FAA',
  'Alfa Romeo': '#C92D4B',
  'Haas F1 Team': '#B6BABD',
  'Racing Point': '#F58020',
}

function useChartTheme() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  return {
    textColor: isDark ? '#71717A' : '#71717A',
    gridColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
    tooltipBg: isDark ? '#0F0F12' : '#FFFFFF',
    tooltipTitle: isDark ? '#EDEDEF' : '#09090B',
    tooltipBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    fontFamily: "'JetBrains Mono', monospace",
    resolvedTheme,
  }
}

export function WinsOverTime({ data }: WinsOverTimeProps) {
  const theme = useChartTheme()

  const { datasets, labels } = useMemo(() => {
    const teamMap = new Map<string, Map<number, number>>()

    data.forEach((item) => {
      if (!teamMap.has(item.team_name)) {
        teamMap.set(item.team_name, new Map())
      }
      teamMap.get(item.team_name)!.set(item.season, item.wins)
    })

    const seasons = new Set<number>()
    data.forEach((item) => seasons.add(item.season))
    const sortedSeasons = Array.from(seasons).sort()

    const chartDatasets = Array.from(teamMap.entries())
      .filter(([_, seasonData]) => {
        const totalWins = Array.from(seasonData.values()).reduce((sum, wins) => sum + wins, 0)
        return totalWins > 0
      })
      .map(([teamName, seasonData]) => {
        const teamData = sortedSeasons.map((season) => seasonData.get(season) || 0)
        return {
          label: teamName,
          data: teamData,
          borderColor: teamColors[teamName] || '#71717A',
          backgroundColor: `${teamColors[teamName] || '#71717A'}15`,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: teamColors[teamName] || '#71717A',
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
          borderWidth: 2,
        }
      })
      .sort((a, b) => {
        const aTotal = a.data.reduce((sum, wins) => sum + wins, 0)
        const bTotal = b.data.reduce((sum, wins) => sum + wins, 0)
        return bTotal - aTotal
      })
      .slice(0, 5)

    return {
      datasets: chartDatasets,
      labels: sortedSeasons.map(String),
    }
  }, [data])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.textColor,
          font: { size: 10, family: theme.fontFamily },
          usePointStyle: true,
          pointStyleWidth: 8,
          padding: 16,
        },
      },
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
      },
    },
    scales: {
      x: {
        ticks: { color: theme.textColor, font: { family: theme.fontFamily, size: 10 } },
        grid: { color: theme.gridColor },
        border: { color: theme.borderColor },
      },
      y: {
        ticks: { color: theme.textColor, stepSize: 2, font: { family: theme.fontFamily, size: 10 } },
        grid: { color: theme.gridColor },
        border: { color: theme.borderColor },
        min: 0,
      },
    },
  }

  return (
    <div className="h-80">
      <Line key={theme.resolvedTheme} data={{ labels, datasets }} options={options} />
    </div>
  )
}
