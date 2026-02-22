/**
 * Wins Over Time Line Chart Component
 * Displays wins by team per season
 */

'use client'

import { useEffect, useMemo } from 'react'
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

// F1 team colors (matching sample dashboard)
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

export function WinsOverTime({ data }: WinsOverTimeProps) {
  // Process data for chart
  const { datasets, labels } = useMemo(() => {
    // Group by team
    const teamMap = new Map<string, Map<number, number>>()

    data.forEach((item) => {
      if (!teamMap.has(item.team_name)) {
        teamMap.set(item.team_name, new Map())
      }
      teamMap.get(item.team_name)!.set(item.season, item.wins)
    })

    // Get all unique seasons
    const seasons = new Set<number>()
    data.forEach((item) => seasons.add(item.season))
    const sortedSeasons = Array.from(seasons).sort()

    // Create datasets for each team
    const chartDatasets = Array.from(teamMap.entries())
      .filter(([_, seasonData]) => {
        // Only include teams with significant wins
        const totalWins = Array.from(seasonData.values()).reduce((sum, wins) => sum + wins, 0)
        return totalWins > 0
      })
      .map(([teamName, seasonData]) => {
        const teamData = sortedSeasons.map((season) => seasonData.get(season) || 0)
        return {
          label: teamName,
          data: teamData,
          borderColor: teamColors[teamName] || '#888888',
          backgroundColor: `${teamColors[teamName] || '#888888'}20`,
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      })
      .sort((a, b) => {
        // Sort by total wins
        const aTotal = a.data.reduce((sum, wins) => sum + wins, 0)
        const bTotal = b.data.reduce((sum, wins) => sum + wins, 0)
        return bTotal - aTotal
      })
      .slice(0, 5) // Top 5 teams

    return {
      datasets: chartDatasets,
      labels: sortedSeasons.map(String),
    }
  }, [data])

  const chartData = {
    labels,
    datasets,
  }

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
          color: '#333333',
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Wins Over Time',
        color: '#333333',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#333333',
        bodyColor: '#333333',
        borderColor: '#E60000',
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Season',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Wins',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
          stepSize: 2,
        },
        grid: {
          color: '#E5E7EB',
        },
        min: 0,
      },
    },
  }

  return (
    <div className="card p-6 h-96">
      <Line data={chartData} options={options} />
    </div>
  )
}
