"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, Zap, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui";

const F1_PHOTOS = [
  {
    src: "/images/f1/f1-race-start.jpg",
    label: "Race Start",
    sublabel: "Grid Formation",
  },
  {
    src: "/images/f1/f1-cockpit.jpg",
    label: "Cockpit",
    sublabel: "Driver's View",
  },
  {
    src: "/images/f1/f1-car-detail.jpg",
    label: "Car Detail",
    sublabel: "Engineering",
  },
  {
    src: "/images/f1/f1-close-up.jpg",
    label: "Close Up",
    sublabel: "Race Action",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = error || authError;
  const displayLoading = isLoading || authLoading;

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* ── Left — form ────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-8 animate-slide-in-left">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-sm bg-gradient-to-br from-[#E10600] to-[#B30500] text-white shadow-lg shadow-[rgba(225,6,0,0.3)]">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p
                className="font-display font-bold text-xs tracking-[0.2em]"
                style={{ color: "var(--color-text-primary)" }}
              >
                F1 DATA
              </p>
              <p className="hud-label text-[0.55rem] mt-0.5 opacity-60">
                Race Control System
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p
              className="hud-label mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              // Secure Access
            </p>
            <h1
              className="font-display text-3xl font-bold leading-none tracking-wide mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              SIGN IN
            </h1>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Enter your credentials to access race control
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-md border p-6 relative overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-1)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] via-[#E10600] to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 animate-reveal-up stagger-1">
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                    style={{ color: "var(--color-text-secondary)" }}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilot@team.f1"
                    className="input pl-10 h-11"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-reveal-up stagger-2">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                    style={{ color: "var(--color-text-secondary)" }}
                  />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pl-10 h-11"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {displayError && (
                <div
                  className="flex items-start gap-3 p-3 text-xs rounded-sm border animate-reveal-up"
                  style={{
                    backgroundColor: "rgba(225,6,0,0.06)",
                    borderColor: "rgba(225,6,0,0.25)",
                    color: "#E10600",
                  }}
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[0.65rem] uppercase tracking-wider">
                      Authentication Failed
                    </p>
                    <p className="mt-0.5">{displayError}</p>
                  </div>
                </div>
              )}

              <div className="animate-reveal-up stagger-3">
                <Button
                  type="submit"
                  className="w-full h-11"
                  isLoading={displayLoading}
                  disabled={displayLoading}
                >
                  {displayLoading ? (
                    "Authenticating..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Access Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center hud-label text-[0.55rem] opacity-60">
            F1 Data Systems // 2020–2024
          </p>
        </div>
      </div>

      {/* ── Right — F1 image panel ──────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] flex-col relative overflow-hidden animate-slide-in-right">

        {/* Hero background photo */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={F1_PHOTOS[activePhoto].src}
            alt={F1_PHOTOS[activePhoto].label}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/90 via-[#09090B]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/30" />
        </div>

        {/* Left accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#E10600] via-[#E10600] to-transparent z-10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-14">

          {/* Top badge */}
          <div className="mb-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-semibold tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(225,6,0,0.12)",
                borderColor: "rgba(225,6,0,0.3)",
                color: "#E10600",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
              Live Data
            </div>
          </div>

          {/* Main text */}
          <div className="mb-10">
            <p
              className="hud-label mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              // Race Telemetry
            </p>
            <h2
              className="font-display text-5xl font-black leading-tight tracking-wide mb-5"
              style={{ color: "#FFFFFF" }}
            >
              FORMULA 1<br />
              <span style={{ color: "#E10600" }}>ANALYTICS</span>
            </h2>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Championship data from 2020 to 2024. Constructor performance,
              driver statistics, and circuit analysis.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mb-10">
            {[
              { value: "5", label: "Seasons" },
              { value: "10", label: "Teams" },
              { value: "500+", label: "Races" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display text-2xl font-black"
                  style={{ color: "#FFFFFF" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-medium tracking-wider uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Photo selector strip */}
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
              Race Gallery
            </p>
            <div className="flex gap-2">
              {F1_PHOTOS.map((photo, i) => (
                <button
                  key={photo.src}
                  onClick={() => setActivePhoto(i)}
                  className="group relative flex-1 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200"
                  style={{
                    borderColor:
                      activePhoto === i
                        ? "#E10600"
                        : "rgba(255,255,255,0.1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-200"
                    style={{
                      backgroundColor:
                        activePhoto === i
                          ? "rgba(225,6,0,0.2)"
                          : "rgba(0,0,0,0.5)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1">
                    <p className="text-[0.55rem] font-bold uppercase tracking-wider text-white leading-none">
                      {photo.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
