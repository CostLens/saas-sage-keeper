
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRenewalContracts } from "@/hooks/useRenewalContracts";
import { SavingsSummaryCard } from "@/components/contract-negotiation/SavingsSummaryCard";
import { RenewalContractsTable } from "@/components/contract-negotiation/RenewalContractsTable";
import { calculateTotalPotentialSavings } from "@/components/contract-negotiation/LicenseRecommendation";

const ContractNegotiation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  
  const renewalContracts = useRenewalContracts();
  const totalPotentialSavings = calculateTotalPotentialSavings(renewalContracts);
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Contract Negotiation</h1>
                <p className="text-muted-foreground">
                  Review contracts due for renewal and identify cost-saving opportunities
                </p>
              </div>
              <SavingsSummaryCard totalSavings={totalPotentialSavings} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contracts Due for Renewal (Next 90 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <RenewalContractsTable contracts={renewalContracts} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContractNegotiation;
