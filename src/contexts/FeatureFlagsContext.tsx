
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
  showShadowITFeatures: false
});

export const useFeatureFlags = () => useContext(FeatureFlagsContext);

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUsageFeatures, setShowUsageFeatures] = useState(false);
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(false);
  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(false);
  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(false);
  const [showComplianceFeatures, setShowComplianceFeatures] = useState(false);
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(false);
  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(false);
  const [showCopilotFeatures, setShowCopilotFeatures] = useState(false);
  const [showProcurementFeatures, setShowProcurementFeatures] = useState(false);
  const [showShadowITFeatures, setShowShadowITFeatures] = useState(false);

  useEffect(() => {
    // Initialize all feature flags to false by default
    Object.values(FEATURE_KEYS).forEach(key => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, "false");
      }
    });
    
    // Initialize dark theme setting
    if (localStorage.getItem("dark-theme-enabled") === null) {
      localStorage.setItem("dark-theme-enabled", "false");
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setShowUsageFeatures(localStorage.getItem(FEATURE_KEYS.USAGE) !== "false");
      setShowBoardingFeatures(localStorage.getItem(FEATURE_KEYS.BOARDING) !== "false");
      setShowNegotiationFeatures(localStorage.getItem(FEATURE_KEYS.NEGOTIATION) !== "false");
      setShowBenchmarkingFeatures(localStorage.getItem(FEATURE_KEYS.BENCHMARKING) !== "false");
      setShowComplianceFeatures(localStorage.getItem(FEATURE_KEYS.COMPLIANCE) !== "false");
      setShowWorkflowFeatures(localStorage.getItem(FEATURE_KEYS.WORKFLOW) !== "false");
      setShowDuplicateAppFeatures(localStorage.getItem(FEATURE_KEYS.DUPLICATE_APP) !== "false");
      setShowCopilotFeatures(localStorage.getItem(FEATURE_KEYS.COPILOT) !== "false");
      setShowProcurementFeatures(localStorage.getItem(FEATURE_KEYS.PROCUREMENT) !== "false");
      setShowShadowITFeatures(localStorage.getItem(FEATURE_KEYS.SHADOW_IT) !== "false");
    };

    // Initial load from localStorage
    handleStorageChange();

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    
    // Feature-specific event listeners
    const eventNames = [
      'usageFeaturesToggled',
      'boardingFeaturesToggled',
      'negotiationFeaturesToggled',
      'benchmarkingFeaturesToggled',
      'complianceFeaturesToggled',
      'workflowFeaturesToggled',
      'duplicateAppFeaturesToggled',
      'copilotFeaturesToggled',
      'procurementFeaturesToggled',
      'shadowITFeaturesToggled'
    ];
    
    eventNames.forEach(event => {
      window.addEventListener(event, handleStorageChange);
    });
    
    return () => {
      // Remove event listeners
      window.removeEventListener('storage', handleStorageChange);
      
      eventNames.forEach(event => {
        window.removeEventListener(event, handleStorageChange);
      });
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
        showShadowITFeatures
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};
