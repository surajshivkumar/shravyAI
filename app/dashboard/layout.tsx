"use client";

import type React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="polka-dots"></div>
        </div>
        <AppSidebar />
        <main className="flex-1 relative z-10">{children}</main>
        <style jsx>{`
          .polka-dots {
            background-image: radial-gradient(
                circle at 25% 25%,
                rgba(249, 115, 22, 0.05) 2px,
                transparent 2px
              ),
              radial-gradient(
                circle at 75% 75%,
                rgba(249, 115, 22, 0.08) 1px,
                transparent 1px
              ),
              radial-gradient(
                circle at 50% 50%,
                rgba(249, 115, 22, 0.03) 3px,
                transparent 3px
              );
            background-size: 120px 120px, 80px 80px, 160px 160px;
            background-position: 0 0, 40px 40px, 80px 80px;
          }
        `}</style>
      </div>
    </SidebarProvider>
  );
}
