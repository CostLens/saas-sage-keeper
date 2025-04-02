
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { cn } from "@/lib/utils";
import { MobileBackdrop } from "./sidebar/MobileBackdrop";
import { MobileMenuButton } from "./sidebar/MobileMenuButton";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useSidebarFeatures } from "@/hooks/useSidebarFeatures";

interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { isCollapsed, toggleCollapse, isMobileOpen, setIsMobileOpen } = useSidebarCollapsed();
  const { sidebarCollapsed } = useSidebarState();
  
  const { 
    showUsageFeatures, 
    showBoardingFeatures,
    showNegotiationFeatures,
    showBenchmarkingFeatures,
    showComplianceFeatures,
    showWorkflowFeatures,
    showDuplicateAppFeatures,
    showCopilotFeatures,
    showProcurementFeatures,
    showShadowITFeatures  // Feature flag from the hook
  } = useSidebarFeatures();

  const closeMobileMenu = () => setIsMobileOpen(false);

  // Close mobile menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileOpen]);

  return (
    <>
      {/* Mobile menu backdrop */}
      <MobileBackdrop isMobileOpen={isMobileOpen} onClose={closeMobileMenu} />

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 p-4">
        <MobileMenuButton
          isMobileOpen={isMobileOpen}
          toggleCollapse={toggleCollapse}
        />
      </div>

      {/* Logo for mobile view */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-center p-3 bg-background z-10 border-b">
        <Link to="/dashboard" className="text-xl font-bold" onClick={closeMobileMenu}>
          SaaS App
        </Link>
      </div>

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]",
          isMobileOpen ? "left-0" : "-left-full lg:left-0"
        )}
      >
        <SidebarHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        
        <SidebarNavigation 
          isCollapsed={isCollapsed}
          showUsageFeatures={showUsageFeatures}
          showBoardingFeatures={showBoardingFeatures}
          showNegotiationFeatures={showNegotiationFeatures}
          showBenchmarkingFeatures={showBenchmarkingFeatures}
          showComplianceFeatures={showComplianceFeatures}
          showWorkflowFeatures={showWorkflowFeatures}
          showDuplicateAppFeatures={showDuplicateAppFeatures}
          showCopilotFeatures={showCopilotFeatures}
          showProcurementFeatures={showProcurementFeatures}
          showShadowITFeatures={showShadowITFeatures} // Pass the feature flag
        />
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 bg-gray-50 dark:bg-gray-900",
          isCollapsed ? "lg:pl-[70px]" : "lg:pl-[240px]",
          "pt-14 lg:pt-0"
        )}
      >
        {children}
      </main>
    </>
  );
};
