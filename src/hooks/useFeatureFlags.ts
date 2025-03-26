
import { useState, useEffect } from "react";

export function useFeatureFlags() {
  // Initialize feature flag if it doesn't exist
  useEffect(() => {
    if (localStorage.getItem("show-usage-features") === null) {
      localStorage.setItem("show-usage-features", "true");
    }
    if (localStorage.getItem("show-boarding-features") === null) {
      localStorage.setItem("show-boarding-features", "true");
    }
  }, []);
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue !== "false"; // Default to true if null
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(savedValue !== "false");
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
