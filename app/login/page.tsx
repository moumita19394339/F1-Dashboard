"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100/50 to-neutral-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-neutral-900">
                F1 Data Dashboard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-fade-in">
            {/* Welcome message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Welcome back
              </h1>
              <p className="text-lg text-neutral-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login form */}
            <Card className="shadow-xl">
              <CardHeader className="space-y-1 bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-200">
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription className="text-base">
                  Enter your email and password to access your dashboard
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 z-10 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="pl-11 h-12 text-base"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 z-10 pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-11 h-12 text-base"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                {displayError && (
                  <div className="flex items-start gap-3 rounded-xl bg-error-50 p-4 text-sm text-error-900 border border-error-200 shadow-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-error-600 mt-0.5" />
                    <div>
                      <p className="font-bold">Authentication failed</p>
                      <p className="mt-1 text-error-800">{displayError}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  isLoading={displayLoading}
                  disabled={displayLoading}
                >
                  {displayLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Right side - Info panel */}
        <div className="hidden lg:block lg:w-96 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative h-full flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 mb-6 shadow-xl">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Formula 1 Analytics
              </h2>
              <p className="text-lg text-neutral-300">
                Comprehensive dashboard for analyzing F1 team performance,
                driver statistics, and race data across multiple seasons.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                  <svg
                    className="h-5 w-5 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">
                    Performance Metrics
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Track wins, podiums, and championship points over time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                  <svg
                    className="h-5 w-5 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Team Comparisons</h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Compare driver and team performance side by side
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                  <svg
                    className="h-5 w-5 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Circuit Analysis</h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Analyze speeds and results by circuit and season
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
