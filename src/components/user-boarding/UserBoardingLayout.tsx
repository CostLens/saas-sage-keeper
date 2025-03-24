
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface UserBoardingLayoutProps {
  isSidebarCollapsed: boolean;
  showBoardingFeatures: boolean;
  children: React.ReactNode;
}

export function UserBoardingLayout({
  isSidebarCollapsed,
  showBoardingFeatures,
  children
}: UserBoardingLayoutProps) {
  if (!showBoardingFeatures) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Header />
          <main className="flex-1 p-6 space-y-8 animate-fade-in flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">User Boarding Feature is Disabled</h1>
              <p className="text-muted-foreground">Enable the "Boarding Features" flag in Settings to access this page.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
