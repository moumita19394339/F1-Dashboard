/**
 * Races by Country Horizontal Bar Chart Component
 * Displays number of races hosted by each country
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
import type { CountryRaceCount } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface RacesByCountryProps {
  data: CountryRaceCount[]
}

export function RacesByCountryChart({ data }: RacesByCountryProps) {
  // Sort data by race count (descending) and take top 15
  const sortedData = [...data].sort((a, b) => b.race_count - a.race_count).slice(0, 15)

  const chartData = {
    labels: sortedData.map((item) => item.country),
    datasets: [
      {
        label: 'Races',
        data: sortedData.map((item) => item.race_count),
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
        text: 'Races Hosted by Country',
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
            return `Races: ${context.raw}`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Races',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
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
