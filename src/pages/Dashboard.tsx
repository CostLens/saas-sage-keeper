
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

const Dashboard = () => {
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    return localStorage.getItem("show-usage-features") !== "false"; // Default to true if not set
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
      setShowUsageFeatures(localStorage.getItem("show-usage-features") !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
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

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>

          {showUsageFeatures ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Annual SaaS Spend"
                  value={`$${(totalSpend).toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: 12, isPositive: false }}
                  description="12% increase from last year"
                  className="h-auto py-4"
                />
                
                <StatCard
                  title="License Utilization"
                  value={`${overallUtilization}%`}
                  icon={<Users className="h-5 w-5" />}
                  description={`${activeUsers} active of ${totalLicenses} total licenses`}
                  className="relative"
                >
                  <div className="mt-2">
                    <Progress value={overallUtilization} className="h-2" />
                  </div>
                </StatCard>
                
                <StatCard
                  title="Potential Cost Savings"
                  value={`$${Math.round(potentialSavings).toLocaleString()}`}
                  icon={<TrendingDown className="h-5 w-5" />}
                  description={`${unusedLicenses} unused licenses across all apps`}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Annual SaaS Spend"
                  value={`$${(totalSpend).toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: 12, isPositive: false }}
                  description="12% increase from last year"
                  className="h-auto py-4"
                />
                
                <StatCard
                  title="Upcoming Renewals"
                  value={upcomingRenewals}
                  icon={<Calendar className="h-5 w-5" />}
                  description="Due in next 90 days"
                />

                <StatCard
                  title="Due Payments"
                  value={paymentsCount}
                  icon={<AlertTriangle className="h-5 w-5" />}
                  description="Payments due this month"
                />

                <StatCard
                  title="Termination Deadlines"
                  value={terminationDeadlines}
                  icon={<FileTerminal className="h-5 w-5" />}
                  description="Contracts with approaching deadlines"
                />
              </div>
            </div>
          )}
            
          <div className="md:col-span-3">
            <RenewalCalendar saasData={mockSaasData} />
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
