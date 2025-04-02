
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
  BarChart,
  Layers,
  ShieldCheck,
  Workflow,
  Brain,
  Merge,
  Ticket
} from "lucide-react";
import { NavSection } from "./NavSection";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
  showBenchmarkingFeatures: boolean;
  showComplianceFeatures: boolean;
  showWorkflowFeatures: boolean;
  showDuplicateAppFeatures: boolean;
  showCopilotFeatures: boolean;
  showProcurementFeatures: boolean;
}

export const SidebarNavigation = ({ 
  isCollapsed, 
  showUsageFeatures, 
  showBoardingFeatures, 
  showNegotiationFeatures,
  showBenchmarkingFeatures,
  showComplianceFeatures,
  showWorkflowFeatures,
  showDuplicateAppFeatures,
  showCopilotFeatures,
  showProcurementFeatures
}: SidebarNavigationProps) => {
  
  // Build navigation items based on feature flags
  const getPrimaryNavItems = () => {
    const items = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Spend Analytics", href: "/spend-trends", icon: TrendingUp },
      { name: "App Discovery", href: "/app-discovery", icon: Layers },
    ];
    
    // Only show Duplicate App Comparison when feature flag is enabled
    if (showDuplicateAppFeatures) {
      items.push({ name: "Duplicate App Comparison", href: "/duplicate-app-comparison", icon: Merge });
    }
    
    // Only show AI Assistant when feature flag is enabled
    if (showCopilotFeatures) {
      items.push({ name: "AI Assistant", href: "/ai-assistant", icon: Brain });
    }
    
    // Only show Procurement Intake when feature flag is enabled
    if (showProcurementFeatures) {
      items.push({ name: "Procurement Intake", href: "/procurement-intake", icon: Ticket });
    }
    
    if (showUsageFeatures) {
      items.push({ name: "Usage Analytics", href: "/usage", icon: Gauge });
    }
    
    if (showBoardingFeatures) {
      items.push({ name: "User Boarding", href: "/user-boarding", icon: UserCog });
    }
    
    // Updated renewals and benchmarking navigation
    if (showNegotiationFeatures) {
      items.push({ name: "Renewals", href: "/renewals", icon: CalendarClock });
    }
    
    if (showBenchmarkingFeatures) {
      items.push({ name: "Benchmarking", href: "/benchmarking", icon: BarChart });
    }
    
    if (showComplianceFeatures) {
      items.push({ name: "Compliance", href: "/compliance", icon: ShieldCheck });
    }
    
    if (showWorkflowFeatures) {
      items.push({ name: "Workflow Builder", href: "/workflow-builder", icon: Workflow });
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
