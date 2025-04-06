
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
  Ticket,
  AlertTriangle,
  Lightbulb
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
  showShadowITFeatures: boolean;
  showInsightsFeatures: boolean;
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
  showProcurementFeatures,
  showShadowITFeatures,
  showInsightsFeatures
}: SidebarNavigationProps) => {
  
  // Build navigation items based on feature flags and the requested order
  const getPrimaryNavItems = () => {
    // Define all items in the desired order with their visibility logic
    const orderedItems = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
      { name: "Optimization Insights", href: "/insights", icon: Lightbulb, show: showInsightsFeatures },
      { name: "Spend Analytics", href: "/spend-trends", icon: TrendingUp, show: true },
      { name: "Usage Analytics", href: "/usage", icon: Gauge, show: showUsageFeatures },
      { name: "App Discovery", href: "/app-discovery", icon: Layers, show: true },
      { name: "Duplicate App Comparison", href: "/duplicate-app-comparison", icon: Merge, show: showDuplicateAppFeatures },
      { name: "Shadow IT", href: "/shadow-it", icon: AlertTriangle, show: showShadowITFeatures },
      { name: "Renewals", href: "/renewals", icon: CalendarClock, show: showNegotiationFeatures },
      { name: "Benchmarking", href: "/benchmarking", icon: BarChart, show: showBenchmarkingFeatures },
      { name: "Compliance", href: "/compliance", icon: ShieldCheck, show: showComplianceFeatures },
      { name: "User Boarding", href: "/user-boarding", icon: UserCog, show: showBoardingFeatures },
      { name: "Workflow Builder", href: "/workflow-builder", icon: Workflow, show: showWorkflowFeatures },
      { name: "Repository", href: "/contracts", icon: FileText, show: true },
      { name: "AI Assistant", href: "/ai-assistant", icon: Brain, show: showCopilotFeatures },
      { name: "Procurement Intake", href: "/procurement-intake", icon: Ticket, show: showProcurementFeatures },
    ];
    
    // Filter out items that shouldn't be shown based on feature flags
    return orderedItems.filter(item => item.show);
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
