/**
 * Drivers by Era Grouped Bar Chart Component
 * Displays driver count and total wins per decade
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
import type { EraSummaryData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DriversByEraChartProps {
  data: EraSummaryData[]
  title?: string
}

export function DriversByEraChart({ data, title = 'Drivers by Era' }: DriversByEraChartProps) {
  const chartData = {
    labels: data.map((item) => item.era),
    datasets: [
      {
        label: 'Driver Count',
        data: data.map((item) => item.driver_count),
        backgroundColor: '#3671C6',
        borderColor: '#3671C6',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Total Wins',
        data: data.map((item) => item.total_wins),
        backgroundColor: '#E10600',
        borderColor: '#E10600',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#333333',
          font: {
            size: 12,
          },
          padding: 15,
        },
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
          afterBody: (context: any) => {
            const index = context[0].dataIndex
            const item = data[index]
            return [
              `Avg Wins/Driver: ${item.avg_wins_per_driver?.toFixed(1) || 'N/A'}`,
              `Podiums: ${item.total_podiums || 'N/A'}`,
              `Championships: ${item.total_championships || 'N/A'}`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Era',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
          stepSize: 1,
        },
        grid: {
          color: '#E5E7EB',
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="h-80 w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
