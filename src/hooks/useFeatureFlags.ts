
import { useState, useEffect } from "react";

export function useFeatureFlags() {
  // Initialize feature flags to false if they don't exist
  useEffect(() => {
    if (localStorage.getItem("show-usage-features") === null) {
      localStorage.setItem("show-usage-features", "false");
    }
    if (localStorage.getItem("show-boarding-features") === null) {
      localStorage.setItem("show-boarding-features", "false");
    }
  }, []);
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true"; // Default to false if null
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(savedValue === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
    };
  }, []);

  return { showUsageFeatures };
}
