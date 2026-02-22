"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

export interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean;
  className?: string;
}

export function AppLayout({
  children,
  title,
  showSidebar = true,
  className,
}: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100/50 to-neutral-50">
      {showSidebar && <Sidebar />}

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          title={title}
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className={cn("flex-1 overflow-y-auto p-6 lg:p-8", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
