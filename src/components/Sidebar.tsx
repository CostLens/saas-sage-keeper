
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Gauge,
  UserCog
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavSection } from "./sidebar/NavSection";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  // Use localStorage to persist the collapsed state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true";
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true";
  });

  // Listen for storage changes to update UI accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      const boardingValue = localStorage.getItem("show-boarding-features");
      setShowUsageFeatures(usageValue === "true");
      setShowBoardingFeatures(boardingValue === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
    };
  }, []);
  
  // Update localStorage when isCollapsed changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    // Dispatch a custom event to notify pages about sidebar state change
    window.dispatchEvent(new CustomEvent('sidebarStateChanged', { detail: { isCollapsed } }));
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  // Build navigation items based on feature flags
  const getPrimaryNavItems = () => {
    const items = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Spend Analytics", href: "/spend-trends", icon: TrendingUp },
    ];
    
    if (showUsageFeatures) {
      items.push({ name: "Usage Analytics", href: "/usage", icon: Gauge });
    }
    
    if (showBoardingFeatures) {
      items.push({ name: "User Boarding", href: "/user-boarding", icon: UserCog });
    }
    
    items.push({ name: "Contracts", href: "/contracts", icon: FileText });
    
    return items;
  };

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background/80 backdrop-blur-sm transition-all duration-300",
        isCollapsed ? "w-16" : isMobile ? "w-full" : "w-64",
        isMobile && !isCollapsed ? "translate-x-0" : isMobile && isCollapsed ? "-translate-x-full" : "",
        className
      )}
    >
      <SidebarHeader 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse} 
      />

      <div className="flex-1 overflow-auto py-4 bg-background">
        <NavSection 
          items={getPrimaryNavItems()} 
          isCollapsed={isCollapsed} 
        />
        
        <NavSection 
          title="SUPPORT & SETTINGS"
          items={secondaryNavigation} 
          isCollapsed={isCollapsed} 
        />
      </div>
    </aside>
  );
};

export { Sidebar };
