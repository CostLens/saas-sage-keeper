
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaasData } from "@/lib/mockData";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";
import { UsageOverviewCards } from "@/components/usage/UsageOverviewCards";
import { UtilizationCategories } from "@/components/usage/UtilizationCategories";
import { calculateUsageStatistics, categorizeAppsByUsage } from "@/components/usage/UsageAnalyticsHelpers";

const Usage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  // Calculate usage statistics
  const { totalLicenses, activeUsers, unusedLicenses, utilizationRate } = calculateUsageStatistics(mockSaasData);
  
  // Categorize apps by usage level
  const { highUsageApps, optimalUsageApps, lowUsageApps } = categorizeAppsByUsage(mockSaasData);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
          </div>

          {/* Overall usage stats */}
          <UsageOverviewCards 
            utilizationRate={utilizationRate}
            activeUsers={activeUsers}
            totalLicenses={totalLicenses}
            unusedLicenses={unusedLicenses}
            lowUsageAppsCount={lowUsageApps.length}
          />

          {/* License utilization chart */}
          <LicenseUtilizationChart />

          {/* Application utilization categorization */}
          <UtilizationCategories 
            highUsageApps={highUsageApps}
            optimalUsageApps={optimalUsageApps}
            lowUsageApps={lowUsageApps}
          />
        </main>
      </div>
    </div>
  );
};

export default Usage;
