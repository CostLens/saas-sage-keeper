
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SaasDetail } from "@/components/SaasDetail";
import { Button } from "@/components/ui/button";
import { mockSaaSData } from "@/lib/mockData";

const UserManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  
  const [selectedSaas, setSelectedSaas] = useState<string | null>(null);
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };

    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  const selectedSaasData = selectedSaas
    ? mockSaaSData.find(saas => saas.id === selectedSaas)
    : null;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            
            {selectedSaasData ? (
              <SaasDetail 
                saas={selectedSaasData} 
                onClose={() => setSelectedSaas(null)} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSaaSData.map(saas => (
                  <Button
                    key={saas.id}
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-start"
                    onClick={() => setSelectedSaas(saas.id)}
                  >
                    <h3 className="text-lg font-semibold">{saas.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {saas.users.active} active users
                    </p>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
