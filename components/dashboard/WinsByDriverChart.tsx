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
import type { WinsByDriverData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WinsByDriverProps {
  data: WinsByDriverData[]
  title?: string
}

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

export function WinsByDriverChart({ data, title }: WinsByDriverProps) {
  const theme = useChartTheme()
  const sortedData = [...data].sort((a, b) => b.wins - a.wins)

  const chartData = {
    labels: sortedData.map((item) => item.driver_name),
    datasets: [
      {
        label: 'Wins',
        data: sortedData.map((item) => item.wins),
        backgroundColor: '#E10600CC',
        borderColor: '#E10600',
        borderWidth: 1,
        borderRadius: 2,
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
          afterLabel: (context: any) => {
            const item = sortedData[context.dataIndex]
            return item.team ? `Team: ${item.team}` : ''
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: theme.textColor, stepSize: 1, font: { family: theme.fontFamily, size: 10 } },
        grid: { color: theme.gridColor },
        border: { color: theme.borderColor },
        title: {
          display: true,
          text: 'Number of Wins',
          color: theme.textColor,
          font: { family: theme.fontFamily, size: 9 },
        },
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
    <div className="h-80 w-full">
      <Bar key={theme.resolvedTheme} data={chartData} options={options} />
    </div>
  )
}
