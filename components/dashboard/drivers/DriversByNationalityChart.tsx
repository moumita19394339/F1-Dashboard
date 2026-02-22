/**
 * Drivers by Nationality Horizontal Bar Chart Component
 * Displays top nationalities with driver counts
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
import type { NationalitySummaryData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DriversByNationalityChartProps {
  data: NationalitySummaryData[]
  title?: string
  limit?: number
}

export function DriversByNationalityChart({
  data,
  title = 'Drivers by Nationality',
  limit = 20
}: DriversByNationalityChartProps) {
  // Limit and sort data
  const limitedData = data.slice(0, limit)

  const chartData = {
    labels: limitedData.map((item) => item.nationality),
    datasets: [
      {
        label: 'Driver Count',
        data: limitedData.map((item) => item.driver_count),
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
            return `Drivers: ${context.raw}`
          },
          afterLabel: (context: any) => {
            const item = limitedData[context.dataIndex]
            return [
              `Wins: ${item.total_wins || 0}`,
              `Podiums: ${item.total_podiums || 0}`,
              `Championships: ${item.total_championships || 0}`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Drivers',
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
      y: {
        ticks: {
          color: '#333333',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="h-[600px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
