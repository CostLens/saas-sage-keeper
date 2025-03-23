
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { StatCard } from "@/components/ui/stat-card";
import { mockSaasData, mockObligations, SaaSData } from "@/lib/mockData";
import { 
  DollarSign, 
  Calendar
} from "lucide-react";

const Dashboard = () => {
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Calculate total spending
  const totalSpend = mockSaasData.reduce((sum, saas) => sum + saas.price, 0);
  
  // Find next renewal
  const today = new Date();
  const upcomingRenewals = mockSaasData
    .filter(saas => saas.renewalDate !== "N/A")
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime());
  const nextRenewal = upcomingRenewals.find(saas => new Date(saas.renewalDate) > today);

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Total Annual SaaS Spend"
              value={`$${(totalSpend).toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 12, isPositive: false }}
              description="12% increase from last year"
            />
            <StatCard
              title="Next Renewal"
              value={nextRenewal ? nextRenewal.name : "N/A"}
              description={nextRenewal ? `Due on ${new Date(nextRenewal.renewalDate).toLocaleDateString()}` : "No upcoming renewals"}
              icon={<Calendar className="h-5 w-5" />}
            />
          </div>

          {/* SaaS Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">SaaS Applications</h2>
            </div>
            <SaasTable data={mockSaasData} onRowClick={handleRowClick} />
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      <SaasDetailModal
        saas={selectedSaas}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
};

export default Dashboard;
