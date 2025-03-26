
import { useState, useEffect } from "react";

export function useSidebarState() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sidebarStateChanged', (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarCollapsed(customEvent.detail.isCollapsed);
    });
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebarStateChanged', handleStorageChange as EventListener);
    };
  }, []);

  return { sidebarCollapsed };
}
