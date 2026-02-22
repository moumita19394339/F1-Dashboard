/**
 * Speed by Circuit Stacked Bar Chart Component
 * Displays average fastest lap speed by circuit per team
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
import type { SpeedByCircuitData } from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SpeedByCircuitProps {
  data: SpeedByCircuitData[]
}

export function SpeedByCircuit({ data }: SpeedByCircuitProps) {
  // Process data for stacked bar chart
  const { circuits, teams, teamMap } = (() => {
    const circuitSet = new Set<string>()
    const teamSet = new Set<string>()

    data.forEach((item) => {
      circuitSet.add(item.circuit_name)
      teamSet.add(item.team_name)
    })

    const circuits = Array.from(circuitSet)
    const teams = Array.from(teamSet)

    // Create a map for quick lookup
    const teamMap = new Map<string, { color: string; speeds: Record<string, number> }>()

    teams.forEach((team) => {
      teamMap.set(team, {
        color: '',
        speeds: {},
      })
    })

    // Fill in data
    data.forEach((item) => {
      const teamData = teamMap.get(item.team_name)!
      teamData.color = item.team_color
      teamData.speeds[item.circuit_name] = item.average_speed
    })

    return { circuits, teams, teamMap }
  })()

  // Create datasets for each team
  const datasets = teams.map((team) => {
    const teamData = teamMap.get(team)!
    return {
      label: team,
      data: circuits.map((circuit) => teamData.speeds[circuit] || 0),
      backgroundColor: teamData.color,
      borderColor: teamData.color,
      borderWidth: 1,
    }
  })

  const chartData = {
    labels: circuits,
    datasets,
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#333333',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Fastest Lap Speed by Circuit (km/h)',
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
            return `${context.dataset.label}: ${context.raw.toFixed(1)} km/h`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#666666',
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Average Speed (km/h)',
          color: '#666666',
        },
        ticks: {
          color: '#666666',
        },
        grid: {
          color: '#E5E7EB',
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
