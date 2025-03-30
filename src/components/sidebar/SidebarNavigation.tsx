
import React from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Gauge,
  UserCog,
  CalendarClock,
  BarChart
} from "lucide-react";
import { NavSection } from "./NavSection";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
}

export const SidebarNavigation = ({ 
  isCollapsed, 
  showUsageFeatures, 
  showBoardingFeatures, 
  showNegotiationFeatures 
}: SidebarNavigationProps) => {
  
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
    
    // Updated renewals and benchmarking navigation
    if (showNegotiationFeatures) {
      items.push({ name: "Renewals", href: "/renewals", icon: CalendarClock });
      items.push({ name: "Benchmarking", href: "/benchmarking", icon: BarChart });
    }
    
    items.push({ name: "Repository", href: "/contracts", icon: FileText });
    
    return items;
  };

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return (
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
  );
};
