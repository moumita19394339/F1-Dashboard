/**
 * Driver Age Distribution Bar Chart Component
 * Displays distribution of driver debut ages
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
import type { AgeDistributionData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DriverAgeDistributionChartProps {
  data: AgeDistributionData[]
  title?: string
}

export function DriverAgeDistributionChart({
  data,
  title = 'Driver Debut Age Distribution'
}: DriverAgeDistributionChartProps) {
  const chartData = {
    labels: data.map((item) => item.age_bucket),
    datasets: [
      {
        label: 'Number of Drivers',
        data: data.map((item) => item.driver_count),
        backgroundColor: '#3671C6',
        borderColor: '#3671C6',
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
        borderColor: '#3671C6',
        borderWidth: 2,
        callbacks: {
          label: (context: any) => {
            return `Drivers: ${context.raw}`
          },
          afterLabel: (context: any) => {
            const item = data[context.dataIndex]
            if (item.avg_debut_age) {
              return `Avg Debut Age: ${item.avg_debut_age.toFixed(1)} years`
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
          text: 'Age Bracket',
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
    },
  }

  return (
    <div className="h-80 w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
