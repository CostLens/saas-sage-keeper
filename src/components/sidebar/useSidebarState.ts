
import { useState, useEffect } from "react";

export const useSidebarState = (isMobile: boolean) => {
  // Use localStorage to persist the collapsed state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // On mobile, default to collapsed
    if (typeof window !== 'undefined') {
      return isMobile ? true : localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
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

  return { 
    isCollapsed, 
    setIsCollapsed, 
    isMobileOpen, 
    setIsMobileOpen, 
    toggleCollapse 
  };
};
