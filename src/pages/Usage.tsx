
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaasData } from "@/lib/mockData";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";
import { UsageOverviewCards } from "@/components/usage/UsageOverviewCards";
import { UtilizationCategories } from "@/components/usage/UtilizationCategories";
import { UsageControls } from "@/components/usage/UsageControls";
import { calculateUsageStatistics, categorizeAppsByUsage } from "@/components/usage/UsageAnalyticsHelpers";
import { subDays } from "date-fns";

const Usage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Time range state
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  // Update date range when timeRange changes
  useEffect(() => {
    const now = new Date();
    switch (timeRange) {
      case "7d":
        setStartDate(subDays(now, 7));
        setEndDate(now);
        break;
      case "30d":
        setStartDate(subDays(now, 30));
        setEndDate(now);
        break;
      case "90d":
        setStartDate(subDays(now, 90));
        setEndDate(now);
        break;
      case "1y":
        setStartDate(subDays(now, 365));
        setEndDate(now);
        break;
      case "custom":
        // Don't change date values for custom
        break;
      default:
        setStartDate(subDays(now, 30));
        setEndDate(now);
    }
  }, [timeRange]);

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
            <UsageControls 
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
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
