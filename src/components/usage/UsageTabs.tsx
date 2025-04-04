
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlidersHorizontal, List } from "lucide-react";
import { SaaSData } from "@/lib/mockData";
import { UsageOverviewCards } from "./UsageOverviewCards";
import { UtilizationCategories } from "./UtilizationCategories";
import { ApplicationUsageTable } from "./ApplicationUsageTable";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";

interface UsageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  utilizationRate: number;
  activeUsers: number;
  totalLicenses: number;
  unusedLicenses: number;
  lowUsageAppsCount: number;
  highUsageApps: SaaSData[];
  optimalUsageApps: SaaSData[];
  lowUsageApps: SaaSData[];
  filteredData: SaaSData[];
  handleRowClick: (app: SaaSData) => void;
}

export function UsageTabs({
  activeTab,
  setActiveTab,
  utilizationRate,
  activeUsers,
  totalLicenses,
  unusedLicenses,
  lowUsageAppsCount,
  highUsageApps,
  optimalUsageApps,
  lowUsageApps,
  filteredData,
  handleRowClick,
}: UsageTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="applications" className="flex items-center gap-1"> 
          <List className="h-4 w-4" />
          Applications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="space-y-8">
          <UsageOverviewCards 
            utilizationRate={utilizationRate}
            activeUsers={activeUsers}
            totalLicenses={totalLicenses}
            unusedLicenses={unusedLicenses}
            lowUsageAppsCount={lowUsageAppsCount}
          />

          <LicenseUtilizationChart />

          <UtilizationCategories 
            highUsageApps={highUsageApps}
            optimalUsageApps={optimalUsageApps}
            lowUsageApps={lowUsageApps}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="applications">
        <ApplicationUsageTable 
          data={filteredData}
          onRowClick={handleRowClick}
        />
      </TabsContent>
    </Tabs>
  );
}
