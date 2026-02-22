/**
 * Wins by Team Horizontal Bar Chart Component
 * Displays total wins by team sorted descending
 */

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
import type { WinsByTeamData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WinsByTeamProps {
  data: WinsByTeamData[]
}

export function WinsByTeam({ data }: WinsByTeamProps) {
  // Sort data by wins (descending)
  const sortedData = [...data].sort((a, b) => b.wins - a.wins)

  const chartData = {
    labels: sortedData.map((item) => item.team_name),
    datasets: [
      {
        label: 'Wins',
        data: sortedData.map((item) => item.wins),
        backgroundColor: sortedData.map((item) => item.team_color),
        borderColor: sortedData.map((item) => item.team_color),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total Wins by Team',
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
        callbacks: {
          label: (context: any) => {
            return `Wins: ${context.raw}`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Wins',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
          stepSize: 5,
        },
        grid: {
          color: '#E5E7EB',
        },
        min: 0,
      },
      y: {
        ticks: {
          color: '#333333',
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="card p-6 h-96">
      <Bar data={chartData} options={options} />
    </div>
  )
}
