
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { StatCard } from "@/components/ui/stat-card";
import { RenewalCalendar } from "@/components/RenewalCalendar";
import { mockSaasData, mockObligations, SaaSData } from "@/lib/mockData";
import { DollarSign, Users, TrendingDown, Calendar, AlertTriangle, FileTerminal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const upcomingRenewals = mockSaasData.filter(saas => 
    saas.renewalDate !== "N/A" && 
    new Date(saas.renewalDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  ).length;

  const paymentsCount = 3;
  const terminationDeadlines = 2;

  // Generate all dashboard cards in a unified array
  const allCards = [];
  
  // Total Annual SaaS Spend card is always shown
  allCards.push(
    <StatCard
      key="total-spend"
      title="Total Annual SaaS Spend"
      value={`$${(totalSpend).toLocaleString()}`}
      icon={<DollarSign className="h-4 w-4" />}
      trend={{ value: 12, isPositive: false }}
      description="12% increase from last year"
      className="h-full"
    />
  );
  
  // Add additional cards if usage features are enabled
  if (showUsageFeatures) {
    allCards.push(
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
    );
    
    allCards.push(
      <StatCard
        key="potential-savings"
        title="Potential Cost Savings"
        value={`$${Math.round(potentialSavings).toLocaleString()}`}
        icon={<TrendingDown className="h-5 w-5" />}
        description={`${unusedLicenses} unused licenses across all apps`}
        className="h-full"
      />
    );
  }

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
          </div>

          {/* Unified grid layout for ALL dashboard cards */}
          <div className="grid gap-4 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* First row: Stat cards */}
              {allCards.map((card, index) => (
                <div key={index} className={`${index === 0 && allCards.length === 1 ? 'col-span-full md:col-span-1' : ''}`}>
                  {card}
                </div>
              ))}
              
              {/* The calendar should take the remaining space */}
              <div className={`${allCards.length === 1 ? 'col-span-full md:col-span-2' : 'col-span-full md:col-span-1'}`}>
                <RenewalCalendar saasData={mockSaasData} />
              </div>
            </div>
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
