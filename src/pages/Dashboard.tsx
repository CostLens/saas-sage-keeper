import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { StatCard } from "@/components/ui/stat-card";
import { mockSaasData, mockObligations, SaaSData } from "@/lib/mockData";
import { DollarSign, Users, TrendingDown, Calendar, AlertTriangle, FileTerminal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CalendarClock, Wallet, Flag, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  const totalSpend = mockSaasData.reduce((sum, saas) => sum + saas.price, 0);

  const totalLicenses = mockSaasData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = mockSaasData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const overallUtilization = totalLicenses > 0 ? Math.round((activeUsers / totalLicenses) * 100) : 0;
  
  const unusedLicenses = totalLicenses - activeUsers;
  const potentialSavings = mockSaasData.reduce((sum, saas) => {
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
    toast.success("Dashboard data refreshed");
  };

  // Get upcoming renewals
  const upcomingRenewals = mockSaasData
    .filter(saas => 
      saas.renewalDate !== "N/A" && 
      new Date(saas.renewalDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    )
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  const upcomingRenewalAmount = upcomingRenewals.reduce((sum, saas) => sum + saas.price, 0);

  // Get upcoming payments
  const paymentsData = mockSaasData
    .filter(saas => saas.lastPayment && new Date(saas.lastPayment.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .slice(0, 3);
  
  const paymentsAmount = paymentsData.reduce((sum, saas) => 
    sum + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  // Get upcoming termination deadlines
  const terminationsData = mockSaasData
    .filter(saas => 
      saas.contract && 
      saas.contract.cancellationDeadline && 
      new Date(saas.contract.cancellationDeadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    )
    .slice(0, 2);

  // Days remaining helper function
  const getDaysRemaining = (date: Date): number => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

          {/* First Row: Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Total Annual SaaS Spend card is always shown */}
            <StatCard
              key="total-spend"
              title="Total Annual SaaS Spend"
              value={`$${totalSpend.toLocaleString()}`}
              icon={<DollarSign className="h-4 w-4" />}
              trend={{ value: 12, isPositive: false }}
              description="12% increase from last year"
              className="h-full"
            />
            
            {/* Additional cards if usage features are enabled */}
            {showUsageFeatures && (
              <>
                <StatCard
                  key="license-utilization"
                  title="License Utilization"
                  value={`${overallUtilization}%`}
                  icon={<Users className="h-5 w-5" />}
                  description={`${activeUsers} active of ${totalLicenses} total licenses`}
                  className="h-full"
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
                  className="h-full"
                />
              </>
            )}
          </div>

          {/* Second Row: Calendar Cards - Now in a unique layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Upcoming Renewals Card */}
            <Card className="glass-panel glass-panel-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-primary" />
                    <span>Upcoming Renewals</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 h-6 px-2"
                  >
                    View All
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Next 90 Days</span>
                    <span className="text-sm font-bold">${upcomingRenewalAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {upcomingRenewals.length} {upcomingRenewals.length === 1 ? 'subscription' : 'subscriptions'} to renew
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments Due Card */}
            <Card className="glass-panel glass-panel-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-emerald-500" />
                    <span>Payments Due</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 h-6 px-2"
                  >
                    View All
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="bg-emerald-500/5 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Next 30 Days</span>
                    <span className="text-sm font-bold">${paymentsAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {paymentsData.length} {paymentsData.length === 1 ? 'payment' : 'payments'} due
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row: Termination Deadlines Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="glass-panel glass-panel-hover md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-amber-500" />
                    <span>Termination Deadlines</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 h-6 px-2"
                  >
                    View All
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="bg-amber-500/5 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Next 30 Days</span>
                    <span className="text-sm font-bold">{terminationsData.length}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {terminationsData.length} {terminationsData.length === 1 ? 'deadline' : 'deadlines'} approaching
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">SaaS Applications</h2>
            </div>
            <SaasTable 
              data={mockSaasData} 
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
