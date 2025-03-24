
import React, { ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

interface ContractsLayoutProps {
  children: ReactNode;
}

export const ContractsLayout = ({ children }: ContractsLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
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

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
