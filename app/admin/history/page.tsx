"use client";

import { PageHero } from "@/components/layout/PageHero";

// ─── Data Constants ──────────────────────────────────────────────────────────

interface Record {
  label: string;
  value: string;
  holder: string;
}

interface Era {
  range: string;
  name: string;
  accentColor: string;
  accentBg: string;
  champions: string[];
  narrative: string;
  keyFacts: string[];
  image?: string;
}

interface Champion {
  name: string;
  titles: number;
  years: string;
  nationality: string;
  accentColor: string;
}

interface Constructor {
  name: string;
  wins: number;
  color: string;
}

interface Milestone {
  year: string;
  label: string;
  description: string;
}

const RECORDS: Record[] = [
  { label: "Most Race Wins",       value: "105", holder: "Lewis Hamilton" },
  { label: "Most Pole Positions",  value: "104", holder: "Lewis Hamilton" },
  { label: "Driver Championships", value: "7",   holder: "Hamilton & Schumacher" },
  { label: "Constructor Titles",   value: "16",  holder: "Scuderia Ferrari" },
  { label: "Total Seasons",        value: "75",  holder: "1950 – 2024" },
];

const ERAS: Era[] = [
  {
    range: "1950–1959",
    name: "Birth Era",
    accentColor: "#C8A951",
    accentBg: "rgba(200,169,81,0.08)",
    champions: ["Farina", "Fangio ×5", "Hawthorn"],
    narrative:
      "Formula 1 was born at Silverstone on 13 May 1950 with just seven championship rounds. Juan Manuel Fangio dominated the decade, claiming five titles in a career defined by artistry and courage. The cars were raw, the circuits unguarded, and the death toll sobering.",
    keyFacts: ["First race: Silverstone 1950", "Fangio wins 5 titles", "No safety barriers"],
    image: "/images/f1/f1-cockpit.jpg",
  },
  {
    range: "1960–1969",
    name: "British Invasion",
    accentColor: "#6BA3BE",
    accentBg: "rgba(107,163,190,0.08)",
    champions: ["Brabham", "Hill", "Clark ×2", "Surtees", "Hulme"],
    narrative:
      "British constructors — Cooper, Lotus, Brabham — rewrote the rulebook by moving the engine behind the driver. Jim Clark became the benchmark of mechanical sympathy and speed, winning the 1963 title with seven victories from ten races.",
    keyFacts: ["Mid-engine revolution", "Lotus dominance", "Jim Clark's 25 wins"],
    image: undefined,
  },
  {
    range: "1970–1979",
    name: "Safety & Speed",
    accentColor: "#E87722",
    accentBg: "rgba(232,119,34,0.08)",
    champions: ["Rindt", "Stewart ×3", "Fittipaldi ×2", "Lauda", "Hunt", "Andretti", "Scheckter"],
    narrative:
      "Jackie Stewart's crusade for safety reshaped circuits and equipment forever. Then came the 1976 season — Niki Lauda's near-fatal Nürburgring crash and miraculous return, and James Hunt's cinematic title by a single point in the Fuji rain.",
    keyFacts: ["1976 Hunt vs Lauda", "Lauda's Nürburgring crash", "Ground-effect aerodynamics"],
    image: "/images/f1/f1-car-detail.jpg",
  },
  {
    range: "1980–1989",
    name: "Turbo Warfare",
    accentColor: "#C41E3A",
    accentBg: "rgba(196,30,58,0.08)",
    champions: ["Jones", "Piquet ×3", "Rosberg", "Prost ×2", "Senna"],
    narrative:
      "Turbocharged engines producing over 1,400 hp in qualifying trim made the 1980s the most viscerally powerful era in F1 history. The decade ended with the birth of a rivalry for the ages: Alain Prost versus Ayrton Senna, professional perfection against supernatural commitment.",
    keyFacts: ["1,400 hp turbo engines", "Prost vs Senna begins", "Turbo ban 1989"],
    image: undefined,
  },
  {
    range: "1990–1999",
    name: "Tragedy & Triumph",
    accentColor: "#9B59B6",
    accentBg: "rgba(155,89,182,0.08)",
    champions: ["Senna", "Prost", "Hill", "Villeneuve", "Häkkinen ×2", "Schumacher ×2"],
    narrative:
      "Imola 1994 changed motorsport forever. The deaths of Roland Ratzenberger and Ayrton Senna on the same weekend triggered a safety revolution that ultimately made modern F1 survivable. Michael Schumacher began his ascent while Mika Häkkinen closed the decade with back-to-back titles.",
    keyFacts: ["Senna lost at Imola 1994", "Safety revolution begins", "Grooved tyres era"],
    image: "/images/f1/f1-close-up.jpg",
  },
  {
    range: "2000–2009",
    name: "Schumacher's Empire",
    accentColor: "#E10600",
    accentBg: "rgba(225,6,0,0.08)",
    champions: ["Schumacher ×5", "Räikkönen", "Alonso ×2", "Hamilton", "Button"],
    narrative:
      "Michael Schumacher and Ferrari achieved something unprecedented: five consecutive Drivers' Championships from 2000 to 2004, redefining what total dominance looks like in a team sport. Lewis Hamilton's maiden title in 2008 — decided on the final corner of the final lap — hinted at the next era.",
    keyFacts: ["Schumacher 5× in a row", "Ferrari 6 constructors' titles", "Hamilton's debut 2007"],
    image: undefined,
  },
  {
    range: "2010–2019",
    name: "Silver Arrows Era",
    accentColor: "#27F4D2",
    accentBg: "rgba(39,244,210,0.08)",
    champions: ["Vettel ×4", "Hamilton ×5", "Rosberg"],
    narrative:
      "Red Bull and Sebastian Vettel opened the decade with four straight titles before the hybrid power-unit era of 2014 handed control to Mercedes. Lewis Hamilton and Nico Rosberg's intense intra-team rivalry in 2016 produced one of the sport's great narrative arcs — team-mate warfare at 300 km/h.",
    keyFacts: ["Hybrid V6 era 2014", "Mercedes 6 titles in a row", "Hamilton breaks records"],
    image: "/images/f1/f1-night-race.jpg",
  },
  {
    range: "2020–2024",
    name: "Verstappen Era",
    accentColor: "#3671C6",
    accentBg: "rgba(54,113,198,0.08)",
    champions: ["Hamilton", "Verstappen ×4"],
    narrative:
      "The 2022 ground-effect regulations reset the grid, but Max Verstappen and Red Bull Racing turned the new era into a dynasty even faster than Mercedes had. In 2023 Verstappen broke nearly every seasonal record, winning 19 of 22 races.",
    keyFacts: ["2022 ground-effect reset", "Verstappen 19 wins in 2023", "Sprint races introduced"],
    image: undefined,
  },
];

const CHAMPIONS: Champion[] = [
  { name: "Juan Fangio",    titles: 5, years: "1951, 1954–57",    nationality: "Argentina",  accentColor: "#C8A951" },
  { name: "Alain Prost",    titles: 4, years: "1985–86, 1989, 1993", nationality: "France",  accentColor: "#6BA3BE" },
  { name: "Sebastian Vettel", titles: 4, years: "2010–2013",      nationality: "Germany",    accentColor: "#27F4D2" },
  { name: "Max Verstappen", titles: 4, years: "2021–2024",        nationality: "Netherlands",accentColor: "#3671C6" },
  { name: "Michael Schumacher", titles: 7, years: "1994–95, 2000–04", nationality: "Germany", accentColor: "#E10600" },
  { name: "Lewis Hamilton", titles: 7, years: "2008, 2014–15, 2017–20", nationality: "United Kingdom", accentColor: "#27F4D2" },
];

const CONSTRUCTORS: Constructor[] = [
  { name: "Ferrari",   wins: 248, color: "#F91536" },
  { name: "McLaren",   wins: 203, color: "#FF8000" },
  { name: "Mercedes",  wins: 132, color: "#27F4D2" },
  { name: "Red Bull",  wins: 130, color: "#3671C6" },
  { name: "Williams",  wins: 114, color: "#64C4FF" },
];
const MAX_WINS = 248;

const MILESTONES: Milestone[] = [
  { year: "1950", label: "Championship Begins",    description: "First F1 World Championship at Silverstone" },
  { year: "1958", label: "Constructors' Cup",      description: "Teams can compete for their own title" },
  { year: "1983", label: "Ground Effect Banned",   description: "Sliding skirts and venturi tunnels outlawed" },
  { year: "1994", label: "Safety Revolution",      description: "Senna's death triggers circuit & car reforms" },
  { year: "2011", label: "DRS Introduced",         description: "Drag Reduction System aids overtaking" },
  { year: "2014", label: "Hybrid Era",             description: "1.6L V6 turbo-hybrid power units debut" },
  { year: "2022", label: "Ground Effect Returns",  description: "Porpoising era begins with new aero regulations" },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function EraCard({ era, index }: { era: Era; index: number }) {
  const hasImage = !!era.image && index % 2 === 0;
  const isLatest = index === ERAS.length - 1;

  return (
    <div
      className="rounded-md border relative overflow-hidden animate-reveal-up"
      style={{
        borderColor: isLatest ? era.accentColor + "40" : "var(--color-border)",
        backgroundColor: "var(--color-surface-1)",
        animationDelay: index * 60 + "ms",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${era.accentColor}, transparent)`,
          opacity: isLatest ? 1 : 0.4,
        }}
      />

      <div className={`flex ${hasImage ? "flex-col md:flex-row" : ""}`}>
        {/* Main content */}
        <div className="flex-1 p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            {/* Year block */}
            <div className="w-full md:w-32 flex-shrink-0">
              <div
                className="text-xl font-black font-mono leading-none"
                style={{ color: era.accentColor }}
              >
                {era.range}
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-wider mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {era.name}
              </div>
              {isLatest && (
                <span
                  className="inline-block mt-2 px-2 py-0.5 rounded-sm text-[0.6rem] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: era.accentColor + "20", color: era.accentColor }}
                >
                  Current
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px self-stretch"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {/* Right content */}
            <div className="flex-1 space-y-3">
              {/* Champions pills */}
              <div className="flex flex-wrap gap-1.5">
                {era.champions.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-sm text-[0.65rem] font-semibold"
                    style={{
                      backgroundColor: era.accentColor + "15",
                      color: era.accentColor,
                      border: `1px solid ${era.accentColor}30`,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Narrative */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {era.narrative}
              </p>

              {/* Fact chips */}
              <div className="flex flex-wrap gap-2">
                {era.keyFacts.map((fact) => (
                  <span
                    key={fact}
                    className="px-2 py-1 rounded-sm text-[0.65rem] font-mono"
                    style={{
                      backgroundColor: "var(--color-surface-2)",
                      color: "var(--color-text-tertiary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Optional image panel */}
        {hasImage && (
          <div className="md:w-48 relative overflow-hidden h-40 md:h-auto flex-shrink-0">
            <img
              src={era.image}
              alt={era.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0F0F12]/80" />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2
        className="text-xs font-bold uppercase tracking-widest flex-shrink-0"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminHistoryPage() {
  return (
    <div className="space-y-8">
      {/* 1. Hero */}
      <PageHero
        title="Formula 1 History"
        subtitle="75 years of the world's greatest motorsport"
        badge="Since 1950"
        imageSrc="/images/f1/f1-race-start.jpg"
        imageAlt="F1 race start"
      />

      {/* 2. Records Strip */}
      <section>
        <SectionLabel>All-Time Records</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {RECORDS.map((rec, i) => (
            <div
              key={rec.label}
              className={`metric-card animate-reveal-up stagger-${i + 1}`}
            >
              <div className="metric-label">{rec.label}</div>
              <div className="metric-value" style={{ color: "#E10600" }}>{rec.value}</div>
              <div
                className="text-[0.65rem] mt-1"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {rec.holder}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Era Timeline */}
      <section>
        <SectionLabel>Era Timeline</SectionLabel>
        <div className="space-y-3">
          {ERAS.map((era, i) => (
            <EraCard key={era.range} era={era} index={i} />
          ))}
        </div>
      </section>

      {/* 4. All-Time Champions */}
      <section>
        <SectionLabel>All-Time Champions</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CHAMPIONS.map((champ) => (
            <div
              key={champ.name}
              className="rounded-md border p-4 relative overflow-hidden group transition-all duration-200 hover:border-current animate-reveal-up"
              style={{
                backgroundColor: "var(--color-surface-1)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Hover top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${champ.accentColor}, transparent)` }}
              />

              {/* Title count */}
              <div
                className="text-5xl font-black leading-none mb-2"
                style={{ color: champ.accentColor }}
              >
                {champ.titles}
              </div>

              {/* Dot row */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: champ.titles }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: champ.accentColor }}
                  />
                ))}
              </div>

              {/* Name */}
              <div
                className="text-xs font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {champ.name}
              </div>

              {/* Nationality */}
              <div
                className="text-[0.6rem] mt-0.5"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {champ.nationality}
              </div>

              {/* Years */}
              <div
                className="text-[0.6rem] font-mono mt-1"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {champ.years}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Constructor Legends */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>Constructor Legends</SectionLabel>
          <span
            className="text-[0.65rem] font-mono flex-shrink-0 mb-4"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Race wins all-time
          </span>
        </div>

        <div
          className="rounded-md border overflow-hidden relative"
          style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
        >
          {/* Racing stripes texture at low opacity */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 16px)",
              opacity: 0.3,
            }}
          />

          <div className="relative p-5 space-y-4">
            {CONSTRUCTORS.map((team) => (
              <div key={team.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: team.color }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {team.name}
                    </span>
                  </div>
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color: team.color }}
                  >
                    {team.wins}
                  </span>
                </div>
                <div
                  className="h-2 rounded-sm overflow-hidden"
                  style={{ backgroundColor: "var(--color-surface-2)" }}
                >
                  <div
                    className="h-full rounded-sm transition-all duration-700"
                    style={{
                      width: `${(team.wins / MAX_WINS) * 100}%`,
                      background: `linear-gradient(90deg, ${team.color}, ${team.color}99)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Milestones */}
      <section>
        <SectionLabel>Technical Milestones</SectionLabel>

        <div
          className="rounded-md border overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
        >
          <div className="overflow-x-auto p-5">
            <div className="flex items-stretch min-w-max gap-0">
              {MILESTONES.map((ms, i) => {
                const isLast = i === MILESTONES.length - 1;
                return (
                  <div key={ms.year} className="flex items-stretch">
                    {/* Node */}
                    <div className="flex flex-col items-center w-36">
                      {/* Top: label */}
                      <div className="h-14 flex flex-col items-center justify-end pb-2 text-center px-2">
                        <div
                          className="text-[0.65rem] font-semibold leading-tight"
                          style={{ color: isLast ? "#E10600" : "var(--color-text-primary)" }}
                        >
                          {ms.label}
                        </div>
                      </div>

                      {/* Middle: dot on line */}
                      <div className="flex items-center w-full relative">
                        <div
                          className="flex-1 h-px"
                          style={{
                            backgroundColor: i === 0 ? "transparent" : "var(--color-border)",
                          }}
                        />
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0 border-2"
                          style={{
                            backgroundColor: isLast ? "#E10600" : "var(--color-surface-2)",
                            borderColor: isLast ? "#E10600" : "var(--color-border)",
                          }}
                        />
                        <div
                          className="flex-1 h-px"
                          style={{
                            backgroundColor: isLast ? "transparent" : "var(--color-border)",
                          }}
                        />
                      </div>

                      {/* Bottom: year + description */}
                      <div className="h-14 flex flex-col items-center justify-start pt-2 text-center px-2">
                        <div
                          className="text-xs font-black font-mono"
                          style={{
                            color: isLast ? "#E10600" : "var(--color-text-secondary)",
                          }}
                        >
                          {ms.year}
                        </div>
                        <div
                          className="text-[0.6rem] mt-0.5 leading-tight"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {ms.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. What is Formula 1 */}
      <section>
        <SectionLabel>What is Formula 1</SectionLabel>
        <div
          className="rounded-md border p-6 space-y-4"
          style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Formula 1 is the highest class of international single-seater auto racing sanctioned by the
            Fédération Internationale de l'Automobile (FIA). The "formula" in the name refers to a set
            of rules that all participants' cars must comply with. Each season consists of a series of
            races — known as Grands Prix — held across the world on purpose-built circuits and, in some
            cases, closed public roads.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            A Grand Prix weekend typically spans three days. Friday is dedicated to two free practice
            sessions where engineers gather data and drivers learn the circuit. Saturday features a
            third practice and then qualifying — a knockout session that sets the grid order for the
            race. On Sunday the race itself runs between 190 and 310 kilometres, usually lasting
            around 90 minutes, with pit stops for tyre changes adding tactical complexity.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Points are awarded to the top ten finishers on a 25-18-15-12-10-8-6-4-2-1 scale, with a
            bonus point for the fastest lap set by a driver finishing inside the top ten. At the end of
            the season the driver with the most points claims the Drivers' Championship, while the
            combined points of each team's two cars determine the Constructors' Championship.
          </p>
        </div>
      </section>

      {/* 8. The Cars */}
      <section>
        <SectionLabel>The Cars</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-md border p-6 space-y-3"
            style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E10600" }}>
              Power Unit
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Since 2014, every F1 car has been powered by a 1.6-litre V6 turbocharged internal
              combustion engine paired with two energy recovery systems — the MGU-K (kinetic) and
              MGU-H (heat). Together they produce over 1,000 bhp, roughly double what a typical
              sports car achieves from three times the displacement.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              The 2026 regulations will introduce an even more electrically biased power unit, with the
              MGU-H removed and electrical power contribution raised to approximately 350 kW —
              about one-third of total output.
            </p>
          </div>
          <div
            className="rounded-md border p-6 space-y-3"
            style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E10600" }}>
              Aerodynamics & Chassis
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Modern F1 cars generate more downforce than their own weight, allowing them to corner
              at forces exceeding 6 g. The 2022 regulations reintroduced ground-effect aerodynamics,
              moving downforce generation from the wings back to the underbody floor — a concept
              last seen in the early 1980s before it was banned for safety reasons.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              A current car weighs a minimum of 798 kg including the driver, uses an eight-speed
              semi-automatic gearbox, and can accelerate from 0 to 100 km/h in under 2.5 seconds —
              faster than almost any road-legal vehicle on the planet.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Iconic Races */}
      <section>
        <SectionLabel>Iconic Races</SectionLabel>
        <div className="space-y-3">
          {[
            {
              year: "1976",
              gp: "Japanese Grand Prix — Fuji",
              summary:
                "The title decider of the most dramatic season in F1 history. Niki Lauda, having survived a near-fatal fire at the Nürburgring just six weeks earlier, voluntarily retired from the rain-drenched race citing conditions too dangerous to continue. James Hunt needed third place or better to steal the title; he finished fifth, and that was enough by a single point. Cinema has rarely bettered reality.",
            },
            {
              year: "1979",
              gp: "French Grand Prix — Dijon",
              summary:
                "The 'Race of the Century' in miniature. René Arnoux and Gilles Villeneuve duelled wheel-to-wheel through the final two laps, exchanging paint and blocking each other's way in a display of raw, pre-steward racing that would be impossible in the modern era. Villeneuve ultimately finished second and the sport had its defining clip of the analogue age.",
            },
            {
              year: "2008",
              gp: "Brazilian Grand Prix — Interlagos",
              summary:
                "Lewis Hamilton needed fifth place to take his maiden championship from Felipe Massa. Hamilton ran in sixth with five laps to go and the title appeared gone. Then, on the penultimate corner of the final lap, Timo Glock's dry-tyre gamble unravelled on a damp track and Hamilton swept past to fifth. He had won the world championship by a single point in the final seconds of the season.",
            },
            {
              year: "2021",
              gp: "Abu Dhabi Grand Prix — Yas Marina",
              summary:
                "The most controversial finale in the championship's history. Max Verstappen trailed Lewis Hamilton by eight points heading into the last race. After a late safety car, a disputed decision to allow only some lapped cars to un-lap themselves left Verstappen on fresh soft tyres directly behind Hamilton on worn mediums. He overtook on the final lap. The race director's decision remains contested to this day.",
            },
          ].map((race) => (
            <div
              key={race.year + race.gp}
              className="rounded-md border p-5 group relative overflow-hidden"
              style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
            >
              <div
                className="absolute top-0 left-0 h-full w-[3px] opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "#E10600" }}
              />
              <div className="pl-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-xs font-black font-mono"
                    style={{ color: "#E10600" }}
                  >
                    {race.year}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {race.gp}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {race.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. The Circuits */}
      <section>
        <SectionLabel>The Circuits</SectionLabel>
        <div
          className="rounded-md border p-6 space-y-4"
          style={{ backgroundColor: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            A Formula 1 calendar typically includes between 20 and 24 races spread across five
            continents. Circuits range from classic permanent racetracks to temporary street layouts
            that transform city centres for a single weekend every year.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              {
                name: "Monza — Temple of Speed",
                detail:
                  "The Italian Grand Prix at Monza is the fastest race on the calendar, averaging speeds above 260 km/h over its long straights and gentle banking. It has hosted F1 every year since 1950, making it the sport's most continuous venue. The tifosi — Ferrari's passionate Italian fans — pack the grandstands regardless of the Scuderia's fortunes.",
              },
              {
                name: "Monaco — The Crown Jewel",
                detail:
                  "The Monaco Grand Prix winds through the narrow streets of the Principality at speeds that seem incomprehensible for a public road. The barriers are so close that drivers brush them at over 200 km/h through the tunnel. Qualifying matters more here than anywhere else because overtaking is nearly impossible — Ayrton Senna won here six times.",
              },
              {
                name: "Spa-Francorchamps — The Cathedral",
                detail:
                  "Nestled in the Ardennes forest of Belgium, Spa is universally regarded by drivers as the greatest circuit in the world. Eau Rouge and Raidillon form a sequence where a car travels uphill at full throttle, cresting a blind rise at 300 km/h. Weather can differ between corners; it is not unusual for rain on one side of the circuit and dry conditions on the other.",
              },
            ].map((circuit) => (
              <div
                key={circuit.name}
                className="space-y-2"
              >
                <h4
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {circuit.name}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {circuit.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
