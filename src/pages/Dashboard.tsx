
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCardsSection } from "@/components/dashboard/StatsCardsSection";
import { SaasApplicationsSection } from "@/components/dashboard/SaasApplicationsSection";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  const dashboardData = useDashboardData();

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
      const savedValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(savedValue === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('sidebarStateChanged', (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarCollapsed(customEvent.detail.isCollapsed);
    });
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('sidebarStateChanged', handleStorageChange as EventListener);
    };
  }, []);

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in overflow-auto">
          <DashboardHeader 
            lastRefreshed={dashboardData.lastRefreshed}
            onRefresh={dashboardData.handleRefresh}
          />

          <StatsCardsSection 
            showUsageFeatures={showUsageFeatures}
            totalSpend={dashboardData.totalSpend}
            overallUtilization={dashboardData.overallUtilization}
            activeUsers={dashboardData.activeUsers}
            totalLicenses={dashboardData.totalLicenses}
            unusedLicenses={dashboardData.unusedLicenses}
            potentialSavings={dashboardData.potentialSavings}
            upcomingRenewals={dashboardData.upcomingRenewals}
            upcomingRenewalAmount={dashboardData.upcomingRenewalAmount}
            paymentsData={dashboardData.paymentsData}
            paymentsAmount={dashboardData.paymentsAmount}
            terminationsData={dashboardData.terminationsData}
          />

          <SaasApplicationsSection 
            data={mockSaaSData}
            showUsage={showUsageFeatures}
            onRowClick={handleRowClick}
          />
        </main>
      </div>

      <SaasDetailModal
        saas={selectedSaas}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
};

export default Dashboard;
