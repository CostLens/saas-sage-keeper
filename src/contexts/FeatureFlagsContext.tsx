
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEATURE_KEYS } from '@/hooks/useSidebarFeatures';

interface FeatureFlagsContextType {
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
  showBenchmarkingFeatures: boolean;
  showComplianceFeatures: boolean;
  showWorkflowFeatures: boolean;
  showDuplicateAppFeatures: boolean;
  showCopilotFeatures: boolean;
  showProcurementFeatures: boolean;
  showShadowITFeatures: boolean;
  showDiscoveryExtendedFeatures: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  showUsageFeatures: false,
  showBoardingFeatures: false,
  showNegotiationFeatures: false,
  showBenchmarkingFeatures: false,
  showComplianceFeatures: false,
  showWorkflowFeatures: false,
  showDuplicateAppFeatures: false,
  showCopilotFeatures: false,
  showProcurementFeatures: false,
  showShadowITFeatures: false,
  showDiscoveryExtendedFeatures: false
});

export const useFeatureFlags = () => useContext(FeatureFlagsContext);

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUsageFeatures, setShowUsageFeatures] = useState(true); // Set to true by default
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(false);
  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(false);
  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(false);
  const [showComplianceFeatures, setShowComplianceFeatures] = useState(false);
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(false);
  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(false);
  const [showCopilotFeatures, setShowCopilotFeatures] = useState(false);
  const [showProcurementFeatures, setShowProcurementFeatures] = useState(false);
  const [showShadowITFeatures, setShowShadowITFeatures] = useState(false);
  const [showDiscoveryExtendedFeatures, setShowDiscoveryExtendedFeatures] = useState(false);

  useEffect(() => {
    // Initialize feature flags with Usage Analytics set to true by default
    Object.entries(FEATURE_KEYS).forEach(([key, value]) => {
      // If localStorage doesn't have this key, set default value
      if (localStorage.getItem(value) === null) {
        const defaultValue = key === 'USAGE' ? 'true' : 'false';
        localStorage.setItem(value, defaultValue);
      }
    });
    
    // Initialize dark theme setting
    if (localStorage.getItem("dark-theme-enabled") === null) {
      localStorage.setItem("dark-theme-enabled", "false");
    }
    
    // Initialize state from localStorage
    setShowUsageFeatures(localStorage.getItem(FEATURE_KEYS.USAGE) === "true");
    setShowBoardingFeatures(localStorage.getItem(FEATURE_KEYS.BOARDING) === "true");
    setShowNegotiationFeatures(localStorage.getItem(FEATURE_KEYS.NEGOTIATION) === "true");
    setShowBenchmarkingFeatures(localStorage.getItem(FEATURE_KEYS.BENCHMARKING) === "true");
    setShowComplianceFeatures(localStorage.getItem(FEATURE_KEYS.COMPLIANCE) === "true");
    setShowWorkflowFeatures(localStorage.getItem(FEATURE_KEYS.WORKFLOW) === "true");
    setShowDuplicateAppFeatures(localStorage.getItem(FEATURE_KEYS.DUPLICATE_APP) === "true");
    setShowCopilotFeatures(localStorage.getItem(FEATURE_KEYS.COPILOT) === "true");
    setShowProcurementFeatures(localStorage.getItem(FEATURE_KEYS.PROCUREMENT) === "true");
    setShowShadowITFeatures(localStorage.getItem(FEATURE_KEYS.SHADOW_IT) === "true");
    setShowDiscoveryExtendedFeatures(localStorage.getItem(FEATURE_KEYS.DISCOVERY_EXTENDED) === "true");
  }, []);

  // Create a function to update feature flags
  const updateFeatureFlag = (key: string, value: boolean) => {
    switch(key) {
      case FEATURE_KEYS.USAGE:
        setShowUsageFeatures(value);
        break;
      case FEATURE_KEYS.BOARDING:
        setShowBoardingFeatures(value);
        break;
      case FEATURE_KEYS.NEGOTIATION:
        setShowNegotiationFeatures(value);
        break;
      case FEATURE_KEYS.BENCHMARKING:
        setShowBenchmarkingFeatures(value);
        break;
      case FEATURE_KEYS.COMPLIANCE:
        setShowComplianceFeatures(value);
        break;
      case FEATURE_KEYS.WORKFLOW:
        setShowWorkflowFeatures(value);
        break;
      case FEATURE_KEYS.DUPLICATE_APP:
        setShowDuplicateAppFeatures(value);
        break;
      case FEATURE_KEYS.COPILOT:
        setShowCopilotFeatures(value);
        break;
      case FEATURE_KEYS.PROCUREMENT:
        setShowProcurementFeatures(value);
        break;
      case FEATURE_KEYS.SHADOW_IT:
        setShowShadowITFeatures(value);
        break;
      case FEATURE_KEYS.DISCOVERY_EXTENDED:
        setShowDiscoveryExtendedFeatures(value);
        break;
    }
  };

  useEffect(() => {
    // Listen for custom events dispatched when feature flags are toggled
    const handleCustomEvent = (event: CustomEvent) => {
      const { feature, enabled } = event.detail;
      updateFeatureFlag(feature, enabled);
    };

    // Storage event handler for cross-tab synchronization
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('show-') && event.key.endsWith('-features')) {
        // Convert localStorage key to FEATURE_KEYS format
        const featureKey = Object.entries(FEATURE_KEYS).find(
          ([_, value]) => value === event.key
        )?.[1];
        
        if (featureKey) {
          updateFeatureFlag(featureKey, event.newValue === "true");
        }
      }
    };

    // Register event listener for feature flag toggle events
    window.addEventListener('featureFlagToggled', handleCustomEvent as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('featureFlagToggled', handleCustomEvent as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <FeatureFlagsContext.Provider
      value={{
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
        showDiscoveryExtendedFeatures
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};
