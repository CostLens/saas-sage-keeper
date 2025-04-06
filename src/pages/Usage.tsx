
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { mockSaaSData } from "@/lib/mockData";
import { UsageHeader } from "@/components/usage/UsageHeader";
import { UsageFilters } from "@/components/usage/UsageFilters";
import { UsageTabs } from "@/components/usage/UsageTabs";
import { exportUsageReport } from "@/components/usage/UsageAnalyticsService";
import { calculateUsageStatistics, categorizeAppsByUsage } from "@/components/usage/UsageAnalyticsHelpers";
import { AppDetailsDialog } from "@/components/app-discovery/AppDetailsDialog";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";

const Usage = () => {
  const [timeRange, setTimeRange] = useState<"30days" | "90days" | "6months" | "1year" | "custom">("30days");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "high" | "optimal" | "low">("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApp, setSelectedApp] = useState<AppDiscoveryData | null>(null);
  const [showAppDetails, setShowAppDetails] = useState(false);
  
  useEffect(() => {
    const today = new Date();
    let fromDate = new Date();
    
    switch (timeRange) {
      case "30days":
        fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        break;
      case "90days":
        fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);
        break;
      case "6months":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        break;
      case "1year":
        fromDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      case "custom":
        return;
    }
    
    setDateRange({
      from: fromDate,
      to: new Date()
    });
  }, [timeRange]);

  const filteredData = mockSaaSData.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === "all") return matchesSearch;
    
    const utilizationRate = app.usage.totalLicenses ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 : 0;
    
    if (filterCategory === "high") return matchesSearch && utilizationRate > 90;
    if (filterCategory === "optimal") return matchesSearch && utilizationRate >= 50 && utilizationRate <= 90;
    if (filterCategory === "low") return matchesSearch && utilizationRate < 50;
    
    return matchesSearch;
  });

  const { totalLicenses, activeUsers, unusedLicenses, utilizationRate } = calculateUsageStatistics(filteredData);
  const { highUsageApps, optimalUsageApps, lowUsageApps } = categorizeAppsByUsage(filteredData);

  const handleExport = () => {
    exportUsageReport(filteredData);
  };

  const handleRowClick = (app: any) => {
    // Convert SaaSData to AppDiscoveryData format
    const appDiscoveryData: AppDiscoveryData = {
      id: parseInt(app.id),
      name: app.name,
      description: app.description || '',
      category: app.category || 'Software',
      publisher: app.name,
      averageUsage: app.usage.utilizationRate || 0,
      activeUsers: app.usage.activeUsers,
      totalLicenses: app.usage.totalLicenses || 0,
      costPerYear: app.price,
      totalPayments: app.price * 2,
      costToDate: app.price * 1.5,
      status: "Approved",
      firstPurchased: app.contract?.signedDate || new Date().toISOString(),
      lastUsed: "Today",
      renewalDate: app.renewalDate,
      owner: app.owner || "Unassigned",
      departments: ["All Departments"],
      website: "",
      purchaseDate: app.contract?.signedDate || new Date().toISOString(),
    };
    
    setSelectedApp(appDiscoveryData);
    setShowAppDetails(true);
  };

  const handleCloseDialog = () => {
    setShowAppDetails(false);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6 space-y-8 animate-fade-in">
        <UsageHeader 
          onExport={handleExport} 
          showBackButton={false}
          onBackClick={() => setShowAppDetails(false)} 
        />

        <UsageFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          dateRange={dateRange}
          setDateRange={setDateRange}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        <UsageTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          utilizationRate={utilizationRate}
          activeUsers={activeUsers}
          totalLicenses={totalLicenses}
          unusedLicenses={unusedLicenses}
          lowUsageAppsCount={lowUsageApps.length}
          highUsageApps={highUsageApps}
          optimalUsageApps={optimalUsageApps}
          lowUsageApps={lowUsageApps}
          filteredData={filteredData}
          handleRowClick={handleRowClick}
        />
        
        {selectedApp && (
          <AppDetailsDialog 
            app={selectedApp} 
            isOpen={showAppDetails} 
            onClose={handleCloseDialog}
            source="usage"
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Usage;
