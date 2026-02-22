/**
 * Wins by Driver Horizontal Bar Chart Component
 * Displays top drivers by total wins
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
import type { WinsByDriverData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WinsByDriverProps {
  data: WinsByDriverData[]
  title?: string
}

export function WinsByDriverChart({ data, title = 'Top Drivers by Wins' }: WinsByDriverProps) {
  // Sort data by wins (descending)
  const sortedData = [...data].sort((a, b) => b.wins - a.wins)

  const chartData = {
    labels: sortedData.map((item) => {
      if (item.driver_code) {
        return `${item.driver_name} (${item.driver_code})`
      }
      return item.driver_name
    }),
    datasets: [
      {
        label: 'Wins',
        data: sortedData.map((item) => item.wins),
        backgroundColor: '#E10600',
        borderColor: '#E10600',
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
        text: title,
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
        borderColor: '#E10600',
        borderWidth: 2,
        callbacks: {
          label: (context: any) => {
            return `Wins: ${context.raw}`
          },
          afterLabel: (context: any) => {
            const item = sortedData[context.dataIndex]
            if (item.team) {
              return `Team: ${item.team}`
            }
            return ''
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
          stepSize: 1,
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
    <div className="h-80 w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
