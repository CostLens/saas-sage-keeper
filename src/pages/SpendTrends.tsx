
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import SpendAnalyticsChart from "@/components/charts/SpendAnalyticsChart";
import { mockSaaSData } from "@/lib/mockData";
import { KeyStats } from "@/components/spend-trends/KeyStats";
import { MonthlySpendChart } from "@/components/spend-trends/MonthlySpendChart";
import { SpendDistributionCharts } from "@/components/spend-trends/SpendDistributionCharts";
import { SpendHeader } from "@/components/spend-trends/SpendHeader";

const SpendTrends = () => {
  // Track sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <SpendHeader />

          {/* Key Stats */}
          <KeyStats saasData={mockSaaSData} />

          {/* Cost vs Spend Chart */}
          <SpendAnalyticsChart />

          {/* Monthly Spend Chart */}
          <MonthlySpendChart saasData={mockSaaSData} />

          {/* Spend Distribution Charts */}
          <SpendDistributionCharts saasData={mockSaaSData} />
        </main>
      </div>
    </div>
  );
};

export default SpendTrends;
