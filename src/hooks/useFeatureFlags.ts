
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
    if (localStorage.getItem("show-discovery-extended-features") === null) {
      localStorage.setItem("show-discovery-extended-features", "false");
    }
    if (localStorage.getItem("show-insights-features") === null) {
      localStorage.setItem("show-insights-features", "false");
    }
  }, []);
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true"; // Default to false if null
  });

  const [showDiscoveryExtendedFeatures, setShowDiscoveryExtendedFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-discovery-extended-features");
    return savedValue === "true"; // Default to false if null
  });

  const [showInsightsFeatures, setShowInsightsFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-insights-features");
    return savedValue === "true"; // Default to false if null
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(savedValue === "true");
      
      const discoveryValue = localStorage.getItem("show-discovery-extended-features");
      setShowDiscoveryExtendedFeatures(discoveryValue === "true");
      
      const insightsValue = localStorage.getItem("show-insights-features");
      setShowInsightsFeatures(insightsValue === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('discoveryExtendedFeaturesToggled', handleStorageChange);
    window.addEventListener('insightsFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('discoveryExtendedFeaturesToggled', handleStorageChange);
      window.removeEventListener('insightsFeaturesToggled', handleStorageChange);
    };
  }, []);

  return { showUsageFeatures, showDiscoveryExtendedFeatures, showInsightsFeatures };
}
