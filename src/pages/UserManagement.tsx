import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasTable } from "@/components/SaasTable";
import { mockObligations, ObligationData } from "@/lib/mockData";
import { ObligationsTable } from "@/components/ObligationsTable";
import { SaasDetail } from "@/components/SaasDetail";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateSpendByCategory } from "@/lib/mockData";
import { OverviewChart } from "@/components/OverviewChart";
import { useQuery } from "@tanstack/react-query";
import { getSaasApplications } from "@/lib/supabaseService";

const UserManagement = () => {
  const [selectedSaaS, setSelectedSaaS] = useState<SaaSData | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const { toast } = useToast();

  // Fetch SaaS applications from Supabase
  const { data: saasApplications, isLoading } = useQuery({
    queryKey: ['saasApplications'],
    queryFn: getSaasApplications,
  });

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

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaaS(saas);
  };

  const handleCloseDetail = () => {
    setSelectedSaaS(null);
  };

  const spendByCategory = generateSpendByCategory();

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          {selectedSaaS ? (
            <SaasDetail saas={selectedSaaS} onClose={handleCloseDetail} />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">SaaS Management</h1>
              </div>
              <SaasTable data={mockSaaSData} onRowClick={handleRowClick} />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Team spend by category</AccordionTrigger>
                  <AccordionContent>
                    <OverviewChart data={spendByCategory} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Obligations</CardTitle>
                  <CardDescription>
                    Here are the list of obligations that needs to be taken care
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ObligationsTable data={mockObligations} />
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
