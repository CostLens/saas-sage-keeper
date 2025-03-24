
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.isCollapsed);
    };

    // Listen for sidebar state changes
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-0 md:ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between mt-16">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
            </div>
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
