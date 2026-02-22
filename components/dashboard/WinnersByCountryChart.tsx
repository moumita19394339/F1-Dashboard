/**
 * Winners by Country Bar Chart Component
 * Displays countries with most unique race winners
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
import type { CountryWinnerCount } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WinnersByCountryProps {
  data: CountryWinnerCount[]
}

// F1 national colors for countries
const countryColors: Record<string, string> = {
  'United Kingdom': '#C92D4B',
  Germany: '#DDDDDD',
  Finland: '#003580',
  Netherlands: '#FF6200',
  Brazil: '#FFD700',
  Austria: '#ED1C24',
  France: '#0055A4',
  Argentina: '#74ACDF',
  Australia: '#00008B',
  'New Zealand': '#000000',
  Spain: '#C60C30',
  Italy: '#008C45',
  Mexico: '#006847',
  Colombia: '#FCD116',
  Poland: '#DC143C',
}

export function WinnersByCountryChart({ data }: WinnersByCountryProps) {
  const sortedData = [...data].sort((a, b) => b.winner_count - a.winner_count)

  const chartData = {
    labels: sortedData.map((item) => item.country),
    datasets: [
      {
        label: 'Unique Winners',
        data: sortedData.map((item) => item.winner_count),
        backgroundColor: sortedData.map((item) => countryColors[item.country] || '#3671C6'),
        borderColor: sortedData.map((item) => countryColors[item.country] || '#3671C6'),
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
        text: 'Countries with Most Race Winners',
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
            return `Unique Winners: ${context.raw}`
          },
          afterLabel: (context: any) => {
            const item = sortedData[context.dataIndex]
            const winnersList = item.winners.slice(0, 5)
            const remaining = item.winners.length - 5
            let result = winnersList.map((w: string) => `  • ${w}`).join('\n')
            if (remaining > 0) {
              result += `\n  ... and ${remaining} more`
            }
            return result
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Unique Winners',
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
