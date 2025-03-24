
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Gauge,
  UserCog,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavSection } from "./sidebar/NavSection";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  // Use localStorage to persist the collapsed state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // On mobile, default to collapsed
    if (typeof window !== 'undefined') {
      return isMobile ? true : localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-usage-features");
      return savedValue === "true";
    }
    return false;
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-boarding-features");
      return savedValue === "true";
    }
    return false;
  });

  // Close mobile sidebar when navigating away
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isMobile, isMobileOpen]);

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
    if (!isMobile) {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    }
    // Dispatch a custom event to notify pages about sidebar state change
    window.dispatchEvent(new CustomEvent('sidebarStateChanged', { detail: { isCollapsed } }));
  }, [isCollapsed, isMobile]);

  const toggleCollapse = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(prev => !prev);
    }
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

  // Determine sidebar visibility class based on mobile and open state
  const sidebarVisibilityClass = isMobile 
    ? isMobileOpen 
      ? "translate-x-0" 
      : "-translate-x-full" 
    : "";

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background/80 backdrop-blur-sm transition-all duration-300",
          isMobile
            ? `w-64 ${sidebarVisibilityClass}`
            : isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarHeader 
          isCollapsed={isMobile ? false : isCollapsed} 
          toggleCollapse={toggleCollapse} 
          isMobile={isMobile}
        />

        <div className="flex-1 overflow-auto py-4 bg-background">
          <NavSection 
            items={getPrimaryNavItems()} 
            isCollapsed={isMobile ? false : isCollapsed} 
          />
          
          <NavSection 
            title="SUPPORT & SETTINGS"
            items={secondaryNavigation} 
            isCollapsed={isMobile ? false : isCollapsed} 
          />
        </div>
      </aside>
      
      {/* Mobile backdrop overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export { Sidebar };
