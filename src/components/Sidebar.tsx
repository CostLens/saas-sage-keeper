
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { MobileMenuButton } from "./sidebar/MobileMenuButton";
import { MobileBackdrop } from "./sidebar/MobileBackdrop";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { useSidebarFeatures } from "@/hooks/useSidebarFeatures";
import { TooltipProvider } from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const { 
    isCollapsed, 
    isMobileOpen, 
    setIsMobileOpen, 
    toggleCollapse, 
    isMobile 
  } = useSidebarCollapsed();
  
  const { 
    showUsageFeatures, 
    showBoardingFeatures, 
    showNegotiationFeatures,
    showBenchmarkingFeatures,
    showComplianceFeatures,
    showWorkflowFeatures
  } = useSidebarFeatures();

  // Determine sidebar visibility class based on mobile and open state
  const sidebarVisibilityClass = isMobile 
    ? isMobileOpen 
      ? "translate-x-0" 
      : "-translate-x-full" 
    : "";

  return (
    <TooltipProvider>
      {/* Mobile menu button */}
      {isMobile && (
        <MobileMenuButton 
          isMobileOpen={isMobileOpen} 
          toggleCollapse={toggleCollapse} 
        />
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

        <SidebarNavigation 
          isCollapsed={isMobile ? false : isCollapsed}
          showUsageFeatures={showUsageFeatures}
          showBoardingFeatures={showBoardingFeatures}
          showNegotiationFeatures={showNegotiationFeatures}
          showBenchmarkingFeatures={showBenchmarkingFeatures}
          showComplianceFeatures={showComplianceFeatures}
          showWorkflowFeatures={showWorkflowFeatures}
        />
      </aside>
      
      {/* Mobile backdrop overlay */}
      <MobileBackdrop 
        isMobileOpen={isMobile && isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />
    </TooltipProvider>
  );
};

export { Sidebar };
