/**
 * Driver Career Timeline Multi-Line Chart Component
 * Displays a driver's wins, podiums, and points progression over their career
 */

'use client'

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
import type { DriverSeasonData } from '@/lib/api'

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

interface DriverCareerTimelineChartProps {
  data: DriverSeasonData[]
  title?: string
}

export function DriverCareerTimelineChart({
  data,
  title = 'Career Timeline'
}: DriverCareerTimelineChartProps) {
  // Sort by year
  const sortedData = [...data].sort((a, b) => a.year - b.year)

  const chartData = {
    labels: sortedData.map((item) => item.year.toString()),
    datasets: [
      {
        label: 'Wins',
        data: sortedData.map((item) => item.wins),
        borderColor: '#E10600',
        backgroundColor: 'rgba(225, 6, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Podiums',
        data: sortedData.map((item) => item.podiums),
        borderColor: '#3671C6',
        backgroundColor: 'rgba(54, 113, 198, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Points',
        data: sortedData.map((item) => item.points),
        borderColor: '#27F4D2',
        backgroundColor: 'rgba(39, 244, 210, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
        yAxisID: 'y1',
      },
    ],
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
        display: true,
        position: 'top' as const,
        labels: {
          color: '#333333',
          font: {
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
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
            const item = sortedData[index]
            return [
              `Team: ${item.team || 'N/A'}`,
              `Races: ${item.races || 0}`,
              `Championship Position: ${item.position || 'N/A'}`,
            ]
          },
        },
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Wins / Podiums',
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
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Points',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
        },
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="h-96 w-full">
      <Line data={chartData} options={options} />
    </div>
  )
}
