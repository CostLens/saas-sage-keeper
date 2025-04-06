
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import SpendAnalyticsChart from "@/components/charts/SpendAnalyticsChart";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { KeyStats } from "@/components/spend-trends/KeyStats";
import { MonthlySpendChart } from "@/components/spend-trends/MonthlySpendChart";
import { SpendDistributionCharts } from "@/components/spend-trends/SpendDistributionCharts";
import { SpendHeader } from "@/components/spend-trends/SpendHeader";
import { ConsolidatedSpendTable } from "@/components/spend-trends/ConsolidatedSpendTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SpendTrends = () => {
  // Track sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Track app details
  const [selectedApp, setSelectedApp] = useState<SaaSData | null>(null);
  const [showAppDetails, setShowAppDetails] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Track active tab
  const [activeTab, setActiveTab] = useState<"overview" | "table">("overview");
  
  // Track selected year
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  
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

  const handleRowClick = (app: SaaSData) => {
    setSelectedApp(app);
    setIsDetailModalOpen(true);
  };

  const handleBackToOverview = () => {
    setShowAppDetails(false);
  };
  
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    // In a real app, this would trigger data fetching for the selected year
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <SpendHeader selectedYear={selectedYear} onYearChange={handleYearChange} />

          {!showAppDetails ? (
            <>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "overview" | "table")} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="table">Consolidated View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  {/* Key Stats */}
                  <KeyStats saasData={mockSaaSData} />

                  {/* Cost vs Spend Chart */}
                  <SpendAnalyticsChart />

                  {/* Monthly Spend Chart */}
                  <MonthlySpendChart saasData={mockSaaSData} />

                  {/* Spend Distribution Charts */}
                  <SpendDistributionCharts saasData={mockSaaSData} />
                </TabsContent>
                
                <TabsContent value="table">
                  <Card className="mb-8">
                    <CardContent className="pt-6">
                      <ConsolidatedSpendTable 
                        data={mockSaaSData} 
                        onRowClick={handleRowClick} 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedApp?.name} Spend Analysis</CardTitle>
                  <Button 
                    variant="outline"
                    onClick={handleBackToOverview}
                  >
                    Back to Spend Overview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Placeholder for detailed spend analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Historical Spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Chart would go here */}
                      <div className="h-60 bg-slate-100 rounded-lg flex items-center justify-center">
                        Spending trend chart
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Chart would go here */}
                      <div className="h-60 bg-slate-100 rounded-lg flex items-center justify-center">
                        Cost breakdown chart
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment history */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for payment history table */}
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-muted border-b">
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Amount</th>
                            <th className="px-4 py-3 text-left">Method</th>
                            <th className="px-4 py-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array(5).fill(0).map((_, i) => (
                            <tr key={i} className="border-b last:border-b-0">
                              <td className="px-4 py-3">
                                {new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                {formatCurrency(selectedApp ? selectedApp.price / 12 : 0)}
                              </td>
                              <td className="px-4 py-3">Credit Card</td>
                              <td className="px-4 py-3">
                                <Badge variant="success">Paid</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <SaasDetailModal
        saas={selectedApp}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
};

// Add this import at the top of the file
import { Badge } from "@/components/ui/badge";

// Add this function at the top level (outside of the component)
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export default SpendTrends;
