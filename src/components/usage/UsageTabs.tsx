
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, List, LayoutGrid } from "lucide-react";
import { SaaSData } from "@/lib/mockData";
import { UsageOverviewCards } from "./UsageOverviewCards";
import { UtilizationCategories } from "./UtilizationCategories";
import { ApplicationUsageTable } from "./ApplicationUsageTable";
import { FeaturesTab } from "./FeaturesTab";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";

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
  featuresTabVisible: boolean;
  selectedApp: SaaSData;
  handleRowClick: (app: SaaSData) => void;
  setFeaturesTabVisible: (visible: boolean) => void;
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
  featuresTabVisible,
  selectedApp,
  handleRowClick,
  setFeaturesTabVisible,
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
        <TabsTrigger value="features" className="flex items-center gap-1">
          <LayoutGrid className="h-4 w-4" />
          Features
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

      <TabsContent value="features">
        {featuresTabVisible ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{selectedApp.name} Features</CardTitle>
                <Button 
                  variant="outline"
                  onClick={() => setFeaturesTabVisible(false)}
                >
                  Back to Application List
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
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <h3 className="text-lg font-medium mb-2">Select an application to view features</h3>
              <p className="text-muted-foreground mb-4">Go to the Applications tab and click on any app to view its feature details</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("applications")}
              >
                Go to Applications
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
