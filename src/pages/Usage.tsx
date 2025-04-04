
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaaSData } from "@/lib/mockData";
import { UsageHeader } from "@/components/usage/UsageHeader";
import { UsageFilters } from "@/components/usage/UsageFilters";
import { UsageTabs } from "@/components/usage/UsageTabs";
import { exportUsageReport } from "@/components/usage/UsageAnalyticsService";
import { calculateUsageStatistics, categorizeAppsByUsage } from "@/components/usage/UsageAnalyticsHelpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeaturesTab } from "@/components/usage/FeaturesTab";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";

const Usage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [timeRange, setTimeRange] = useState<"30days" | "90days" | "6months" | "1year" | "custom">("30days");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "high" | "optimal" | "low">("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApp, setSelectedApp] = useState(mockSaaSData[0]);
  const [showAppDetails, setShowAppDetails] = useState(false);
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

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
    setSelectedApp(app);
    setShowAppDetails(true);
  };

  const handleBackToList = () => {
    setShowAppDetails(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <UsageHeader onExport={handleExport} />

          {!showAppDetails ? (
            <>
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
            </>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedApp.name} Usage Analysis</CardTitle>
                  <Button 
                    variant="outline"
                    onClick={handleBackToList}
                  >
                    Back to Usage Overview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FeaturesTab app={{
                  id: parseInt(selectedApp.id),
                  name: selectedApp.name,
                  description: selectedApp.description,
                  category: selectedApp.category || "Software",
                  publisher: selectedApp.name,
                  averageUsage: selectedApp.usage.utilizationRate || 0,
                  activeUsers: selectedApp.usage.activeUsers,
                  totalLicenses: selectedApp.usage.totalLicenses || 0,
                  costPerYear: selectedApp.price,
                  status: "Approved",
                  lastUsed: "Today",
                  purchaseDate: selectedApp.contract?.signedDate || new Date().toISOString(),
                  departments: ["All Departments"],
                  website: "",
                  totalPayments: selectedApp.price * 2,
                  costToDate: selectedApp.price * 1.5,
                  firstPurchased: selectedApp.contract?.signedDate || new Date().toISOString(),
                }} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Usage;
