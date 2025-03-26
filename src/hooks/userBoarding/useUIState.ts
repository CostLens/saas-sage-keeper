
import { useState, useEffect } from "react";

export const useUIState = () => {
  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Feature visibility state 
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  // Handle sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    const handleStorageChange = () => {
      const boardingValue = localStorage.getItem("show-boarding-features");
      setShowBoardingFeatures(boardingValue === "true");
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
    };
  }, []);

  return {
    isSidebarCollapsed,
    showBoardingFeatures
  };
};
