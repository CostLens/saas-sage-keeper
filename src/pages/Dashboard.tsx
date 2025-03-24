import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { StatCard } from "@/components/ui/stat-card";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { DollarSign, Users, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RenewalCard } from "@/components/calendar/RenewalCard";
import { PaymentsCard } from "@/components/calendar/PaymentsCard";
import { TerminationsCard } from "@/components/calendar/TerminationsCard";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

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

  const totalSpend = mockSaaSData.reduce((sum, saas) => sum + saas.price, 0);

  const totalLicenses = mockSaaSData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = mockSaaSData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const overallUtilization = totalLicenses > 0 ? Math.round((activeUsers / totalLicenses) * 100) : 0;
  
  const unusedLicenses = totalLicenses - activeUsers;
  const potentialSavings = mockSaaSData.reduce((sum, saas) => {
    if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
      const unusedInApp = saas.usage.totalLicenses - saas.usage.activeUsers;
      const costPerLicense = saas.price / saas.usage.totalLicenses;
      return sum + (unusedInApp * costPerLicense);
    }
    return sum;
  }, 0);

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsDetailModalOpen(true);
  };

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    toast({
      title: "Dashboard data refreshed",
      description: "All data has been updated to the latest values",
    });
  };

  const upcomingRenewals = mockSaaSData
    .filter(saas => 
      saas.renewalDate !== "N/A" && 
      new Date(saas.renewalDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    )
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  const upcomingRenewalAmount = upcomingRenewals.reduce((sum, saas) => sum + saas.price, 0);

  const paymentsData = mockSaaSData
    .filter(saas => saas.lastPayment && new Date(saas.lastPayment.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .slice(0, 3);
  
  const paymentsAmount = paymentsData.reduce((sum, saas) => 
    sum + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  const terminationsData = mockSaaSData
    .filter(saas => 
      saas.contract && 
      saas.contract.cancellationDeadline && 
      new Date(saas.contract.cancellationDeadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    )
    .slice(0, 2);

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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground mr-2">
                Last refreshed: {lastRefreshed.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* First row of cards - changes based on feature flag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {showUsageFeatures ? (
              // When feature flag is ON - 3 cards in first row
              <>
                <StatCard
                  key="total-spend"
                  title="Total Annual SaaS Spend"
                  value={`$${totalSpend.toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: 12, isPositive: false }}
                  description="12% increase from last year"
                  className="h-full col-span-1"
                />
                <StatCard
                  key="license-utilization"
                  title="License Utilization"
                  value={`${overallUtilization}%`}
                  icon={<Users className="h-5 w-5" />}
                  description={`${activeUsers} active of ${totalLicenses} total licenses`}
                  className="h-full col-span-1"
                >
                  <div className="mt-2">
                    <Progress value={overallUtilization} className="h-2" />
                  </div>
                </StatCard>
                <StatCard
                  key="potential-savings"
                  title="Potential Cost Savings"
                  value={`$${Math.round(potentialSavings).toLocaleString()}`}
                  icon={<TrendingDown className="h-5 w-5" />}
                  description={`${unusedLicenses} unused licenses across all apps`}
                  className="h-full col-span-1 lg:col-span-2"
                />
              </>
            ) : (
              // When feature flag is OFF - 4 cards in one row
              <>
                <StatCard
                  key="total-spend"
                  title="Total Annual SaaS Spend"
                  value={`$${totalSpend.toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: 12, isPositive: false }}
                  description="12% increase from last year"
                  className="h-full col-span-1"
                />
                <div className="h-full col-span-1">
                  <RenewalCard 
                    renewals={upcomingRenewals} 
                    upcomingRenewalAmount={upcomingRenewalAmount} 
                  />
                </div>
                <div className="h-full col-span-1">
                  <PaymentsCard 
                    paymentsData={paymentsData} 
                    paymentsAmount={paymentsAmount} 
                  />
                </div>
                <div className="h-full col-span-1">
                  <TerminationsCard 
                    terminationsData={terminationsData} 
                  />
                </div>
              </>
            )}
          </div>

          {/* Second row of cards - only shown when feature flag is ON */}
          {showUsageFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="h-full">
                <RenewalCard 
                  renewals={upcomingRenewals} 
                  upcomingRenewalAmount={upcomingRenewalAmount} 
                />
              </div>
              <div className="h-full">
                <PaymentsCard 
                  paymentsData={paymentsData} 
                  paymentsAmount={paymentsAmount} 
                />
              </div>
              <div className="h-full">
                <TerminationsCard 
                  terminationsData={terminationsData} 
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">SaaS Applications</h2>
            </div>
            <SaasTable 
              data={mockSaaSData} 
              onRowClick={handleRowClick} 
              showUsage={showUsageFeatures}
            />
          </div>
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
