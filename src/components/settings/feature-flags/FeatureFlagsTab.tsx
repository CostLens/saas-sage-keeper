
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { ThemeCard } from "./feature-flags/ThemeCard";
import { FeatureFlagsCard } from "./feature-flags/FeatureFlagsCard";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { FEATURE_KEYS } from "@/hooks/useSidebarFeatures";

export function FeatureFlagsTab() {
  // Get feature flags from context
  const featureFlags = useFeatureFlags();
  
  // Initialize the state using the context values
  const [showUsageFeatures, setShowUsageFeatures] = useState(featureFlags.showUsageFeatures);
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(featureFlags.showBoardingFeatures);
  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(featureFlags.showNegotiationFeatures);
  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(featureFlags.showBenchmarkingFeatures);
  const [showComplianceFeatures, setShowComplianceFeatures] = useState(featureFlags.showComplianceFeatures);
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(featureFlags.showWorkflowFeatures);
  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(featureFlags.showDuplicateAppFeatures);
  const [showCopilotFeatures, setShowCopilotFeatures] = useState(featureFlags.showCopilotFeatures);
  const [showProcurementFeatures, setShowProcurementFeatures] = useState(featureFlags.showProcurementFeatures);
  const [showShadowITFeatures, setShowShadowITFeatures] = useState(featureFlags.showShadowITFeatures);

  // Update local state when context values change
  useEffect(() => {
    setShowUsageFeatures(featureFlags.showUsageFeatures);
    setShowBoardingFeatures(featureFlags.showBoardingFeatures);
    setShowNegotiationFeatures(featureFlags.showNegotiationFeatures);
    setShowBenchmarkingFeatures(featureFlags.showBenchmarkingFeatures);
    setShowComplianceFeatures(featureFlags.showComplianceFeatures);
    setShowWorkflowFeatures(featureFlags.showWorkflowFeatures);
    setShowDuplicateAppFeatures(featureFlags.showDuplicateAppFeatures);
    setShowCopilotFeatures(featureFlags.showCopilotFeatures);
    setShowProcurementFeatures(featureFlags.showProcurementFeatures);
    setShowShadowITFeatures(featureFlags.showShadowITFeatures);
  }, [featureFlags]);

  // Dark theme state
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("dark-theme-enabled");
      return savedValue === "true";
    }
    return false;
  });

  // Set dark theme class on document when theme preference changes
  useEffect(() => {
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkThemeEnabled]);

  // Helper function to get feature key from localStorage key
  const getFeatureKeyFromLocalStorageKey = (localStorageKey: string) => {
    return Object.entries(FEATURE_KEYS).find(
      ([_, value]) => value === localStorageKey
    )?.[1];
  };

  // Handle feature flag toggle
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    // Update localStorage
    localStorage.setItem(feature, enabled.toString());
    
    // Update state based on the feature toggled
    switch (feature) {
      case "show-usage-features":
        setShowUsageFeatures(enabled);
        break;
      case "show-boarding-features":
        setShowBoardingFeatures(enabled);
        break;
      case "show-negotiation-features":
        setShowNegotiationFeatures(enabled);
        break;
      case "show-benchmarking-features":
        setShowBenchmarkingFeatures(enabled);
        break;
      case "show-compliance-features":
        setShowComplianceFeatures(enabled);
        break;
      case "show-workflow-features":
        setShowWorkflowFeatures(enabled);
        break;
      case "show-duplicate-app-features":
        setShowDuplicateAppFeatures(enabled);
        break;
      case "show-copilot-features":
        setShowCopilotFeatures(enabled);
        break;
      case "show-procurement-features":
        setShowProcurementFeatures(enabled);
        break;
      case "show-shadow-it-features":
        setShowShadowITFeatures(enabled);
        break;
    }
    
    // Dispatch custom event for the context provider to listen to
    const featureKey = getFeatureKeyFromLocalStorageKey(feature);
    if (featureKey) {
      const event = new CustomEvent('featureFlagToggled', {
        detail: { feature: featureKey, enabled }
      });
      window.dispatchEvent(event);
    }
    
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} ${feature.replace('show-', '').replace('-features', '')}`);
  };

  // Handle dark theme toggle
  const handleDarkThemeToggle = (enabled: boolean) => {
    localStorage.setItem("dark-theme-enabled", enabled.toString());
    setDarkThemeEnabled(enabled);
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} dark theme`);
  };

  return (
    <div className="space-y-6">
      <ThemeCard 
        darkThemeEnabled={darkThemeEnabled}
        onThemeToggle={handleDarkThemeToggle}
      />
      
      <FeatureFlagsCard 
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
        onFeatureToggle={handleFeatureToggle}
      />
    </div>
  );
}
