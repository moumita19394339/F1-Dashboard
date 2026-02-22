/**
 * F1 History Page (Admin)
 */

"use client";

import { History, Trophy, Users, Flag } from "lucide-react";

export default function AdminHistoryPage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary-50 rounded-xl shadow-md">
          <History className="w-8 h-8 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Formula 1 History
          </h1>
          <p className="text-neutral-600 font-medium">
            Explore the rich heritage of Formula 1 racing
          </p>
        </div>
      </div>

      {/* Main Frame */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl p-10 space-y-10">

        {/* Introduction */}
        <div>
          <p className="text-neutral-700 font-medium leading-relaxed">
            Formula 1 is the highest class of international single-seater
            auto racing, sanctioned by the FIA. Since 1950, it has evolved
            into the pinnacle of motorsport, combining cutting-edge
            technology, elite drivers, and legendary teams.
          </p>
        </div>

        {/* Key Milestones */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-neutral-900">
              Key Milestones
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700 font-medium">
            <li>• 1950: First World Championship race</li>
            <li>• 1958: Constructor’s Championship introduced</li>
            <li>• 1976: Legendary Hunt vs Lauda rivalry</li>
            <li>• 1994: Ayrton Senna’s tragic loss</li>
            <li>• 2000s: Schumacher & Ferrari dominance</li>
            <li>• 2014–2021: Mercedes hybrid era dominance</li>
            <li>• 2020s: New regulations & Verstappen era</li>
          </ul>
        </div>

        {/* Legendary Drivers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-neutral-900">
              Legendary Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-neutral-50 rounded-xl border">
              <h4 className="font-bold">Ayrton Senna</h4>
              <p className="text-sm text-neutral-600 mt-2">
                3× World Champion and one of the most iconic drivers.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border">
              <h4 className="font-bold">Michael Schumacher</h4>
              <p className="text-sm text-neutral-600 mt-2">
                7× World Champion who dominated the early 2000s.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border">
              <h4 className="font-bold">Lewis Hamilton</h4>
              <p className="text-sm text-neutral-600 mt-2">
                7× World Champion with numerous records.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border">
              <h4 className="font-bold">Max Verstappen</h4>
              <p className="text-sm text-neutral-600 mt-2">
                Dominant force of the modern F1 era.
              </p>
            </div>
          </div>
        </div>

        {/* Legendary Constructors */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flag className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-neutral-900">
              Legendary Constructors
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700 font-medium">
            <li>• Ferrari – Most historic and successful team</li>
            <li>• Mercedes – Hybrid era dominance</li>
            <li>• Red Bull – Aerodynamic powerhouse</li>
            <li>• McLaren – Iconic British racing team</li>
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-primary-50 rounded-xl border">
            <h4 className="text-3xl font-bold text-primary-700">1950</h4>
            <p className="text-neutral-600 mt-2">First Championship Year</p>
          </div>

          <div className="p-6 bg-primary-50 rounded-xl border">
            <h4 className="text-3xl font-bold text-primary-700">1100+</h4>
            <p className="text-neutral-600 mt-2">Grand Prix Races</p>
          </div>

          <div className="p-6 bg-primary-50 rounded-xl border">
            <h4 className="text-3xl font-bold text-primary-700">20+</h4>
            <p className="text-neutral-600 mt-2">Races Per Season</p>
          </div>
        </div>

      </div>
    </div>
  );
}