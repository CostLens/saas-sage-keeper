
import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCardsSection } from "@/components/dashboard/StatsCardsSection";
import { SaasApplicationsSection } from "@/components/dashboard/SaasApplicationsSection";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

export function DashboardContent() {
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { showUsageFeatures } = useFeatureFlags();
  const dashboardData = useDashboardData();

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsDetailModalOpen(true);
  };

  return (
    <>
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
        data={dashboardData.saasData}
        showUsage={showUsageFeatures}
        onRowClick={handleRowClick}
      />

      <SaasDetailModal
        saas={selectedSaas}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </>
  );
}
