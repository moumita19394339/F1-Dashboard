/**
 * F1 Car Image Component
 * Displays an F1 car image
 */

'use client'

import Image from 'next/image'
import { useState } from 'react'

export function F1CarImage() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="card p-6 flex flex-col items-center justify-center min-h-[300px]">
      {!imageError ? (
        <Image
          src="/images/f1-car-placeholder.png"
          alt="F1 Car"
          width={400}
          height={250}
          className="object-contain"
          onError={() => setImageError(true)}
          priority
        />
      ) : (
        <div className="text-center">
          <svg
            className="w-64 h-40 mx-auto text-f1-red"
            viewBox="0 0 400 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* F1 Car silhouette */}
            <rect x="50" y="100" width="300" height="50" rx="10" fill="currentColor" opacity="0.3" />
            <rect x="80" y="80" width="100" height="20" rx="5" fill="currentColor" opacity="0.5" />
            <rect x="200" y="80" width="120" height="20" rx="5" fill="currentColor" opacity="0.5" />
            <circle cx="80" cy="180" r="30" fill="currentColor" opacity="0.4" />
            <circle cx="320" cy="180" r="30" fill="currentColor" opacity="0.4" />
            <text x="200" y="145" textAnchor="middle" fill="#E60000" fontSize="24" fontWeight="bold">
              F1
            </text>
          </svg>
          <p className="text-gray-600 mt-4 font-medium">F1 Car Image</p>
        </div>
      )}
      <p className="text-gray-600 text-sm mt-4 text-center font-medium">
        Formula 1 Racing Car
      </p>
    </div>
  )
}
