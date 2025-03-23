
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { StatCard } from "@/components/ui/stat-card";
import { ObligationCard } from "@/components/ObligationCard";
import { Button } from "@/components/ui/button";
import { mockSaasData, mockObligations, SaaSData } from "@/lib/mockData";
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  ArrowUpRight, 
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

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
  
  // Calculate average utilization
  const avgUtilization = mockSaasData.reduce((sum, saas) => sum + saas.usage.utilizationRate, 0) / mockSaasData.length;
  
  // Get upcoming obligations
  const upcomingObligations = mockObligations
    .filter(obligation => obligation.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Last updated 2 minutes ago
              </Button>
              <Button>Sync data</Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <StatCard
              title="Average Utilization"
              value={`${Math.round(avgUtilization)}%`}
              description="Across all SaaS applications"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          {/* SaaS Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">SaaS Applications</h2>
            </div>
            <SaasTable data={mockSaasData} onRowClick={handleRowClick} />
          </div>

          {/* Upcoming Obligations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Obligations</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/obligations" className="flex items-center gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingObligations.map((obligation) => (
                <ObligationCard key={obligation.id} obligation={obligation} />
              ))}
            </div>
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
