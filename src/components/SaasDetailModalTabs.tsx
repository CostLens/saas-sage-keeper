
import { SaaSData } from "@/lib/mockData";
import { UserActivityTab } from "./UserActivityTab";
import { useState, useEffect } from "react";

interface SaasDetailModalTabsProps {
  saas: SaaSData;
  activeTab: string;
}

export function SaasDetailModalTabs({ saas, activeTab }: SaasDetailModalTabsProps) {
  const [showUserManagementFeatures, setShowUserManagementFeatures] = useState(false);
  
  useEffect(() => {
    const savedValue = localStorage.getItem("show-user-management-features");
    setShowUserManagementFeatures(savedValue === "true");
    
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem("show-user-management-features");
      setShowUserManagementFeatures(savedValue === "true");
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userManagementFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userManagementFeaturesToggled', handleStorageChange);
    };
  }, []);

  switch(activeTab) {
    case "users":
      return showUserManagementFeatures ? <UserActivityTab saas={saas} /> : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">User management features are disabled</p>
        </div>
      );
    default:
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Select a tab to view details</p>
        </div>
      );
  }
}
