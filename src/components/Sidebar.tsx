
import React, { useState, useEffect } from "react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useSidebarFeatures } from "@/hooks/useSidebarFeatures";
import { cn } from "@/lib/utils";

export function Sidebar() {
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
    showShadowITFeatures,
    showInsightsFeatures
  } = useSidebarFeatures();
  
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    // Dispatch an event that the sidebar state has changed
    const event = new CustomEvent('sidebarStateChanged', {
      detail: { isCollapsed }
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  const handleToggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} />
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
        showShadowITFeatures={showShadowITFeatures}
        showInsightsFeatures={showInsightsFeatures}
      />
      <SidebarFooter 
        isCollapsed={isCollapsed} 
        onToggle={handleToggleCollapsed} 
      />
    </div>
  );
}
