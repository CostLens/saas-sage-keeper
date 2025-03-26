
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavSection } from "./sidebar/NavSection";
import { SidebarMobileOverlay } from "./sidebar/SidebarMobileOverlay";
import { SidebarMobileButton } from "./sidebar/SidebarMobileButton";
import { useSidebarFeatures } from "./sidebar/useSidebarFeatures";
import { useSidebarState } from "./sidebar/useSidebarState";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const isMobile = useIsMobile();
  const { 
    isCollapsed, 
    isMobileOpen, 
    setIsMobileOpen, 
    toggleCollapse 
  } = useSidebarState(isMobile);
  
  const { 
    showUsageFeatures, 
    showBoardingFeatures, 
    showNegotiationFeatures,
    getPrimaryNavItems,
    secondaryNavigation
  } = useSidebarFeatures();

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
        <SidebarMobileButton 
          isOpen={isMobileOpen} 
          onClick={toggleCollapse} 
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
        <SidebarMobileOverlay onClose={() => setIsMobileOpen(false)} />
      )}
    </>
  );
};

export { Sidebar };
