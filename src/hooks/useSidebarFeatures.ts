
import { useState, useEffect } from "react";

// Define feature keys for better maintainability
export const FEATURE_KEYS = {
  USAGE: "show-usage-features",
  BOARDING: "show-boarding-features",
  NEGOTIATION: "show-negotiation-features",
  BENCHMARKING: "show-benchmarking-features",
  COMPLIANCE: "show-compliance-features",
  WORKFLOW: "show-workflow-features",
  DUPLICATE_APP: "show-duplicate-app-features",
  COPILOT: "show-copilot-features",
};

// Helper function to get initial state from localStorage
const getInitialFeatureState = (key: string): boolean => {
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);
    return savedValue !== "false"; // Default to true if null
  }
  return true;
};

export function useSidebarFeatures() {
  // Set up feature flag states
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.USAGE));
  
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.BOARDING));
  
  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.NEGOTIATION));
  
  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.BENCHMARKING));
  
  const [showComplianceFeatures, setShowComplianceFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.COMPLIANCE));
  
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.WORKFLOW));

  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.DUPLICATE_APP));

  const [showCopilotFeatures, setShowCopilotFeatures] = useState(() => 
    getInitialFeatureState(FEATURE_KEYS.COPILOT));

  // Listen for storage changes to update UI accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      setShowUsageFeatures(getInitialFeatureState(FEATURE_KEYS.USAGE));
      setShowBoardingFeatures(getInitialFeatureState(FEATURE_KEYS.BOARDING));
      setShowNegotiationFeatures(getInitialFeatureState(FEATURE_KEYS.NEGOTIATION));
      setShowBenchmarkingFeatures(getInitialFeatureState(FEATURE_KEYS.BENCHMARKING));
      setShowComplianceFeatures(getInitialFeatureState(FEATURE_KEYS.COMPLIANCE));
      setShowWorkflowFeatures(getInitialFeatureState(FEATURE_KEYS.WORKFLOW));
      setShowDuplicateAppFeatures(getInitialFeatureState(FEATURE_KEYS.DUPLICATE_APP));
      setShowCopilotFeatures(getInitialFeatureState(FEATURE_KEYS.COPILOT));
    };

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
      'copilotFeaturesToggled'
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

  return {
    showUsageFeatures,
    showBoardingFeatures,
    showNegotiationFeatures,
    showBenchmarkingFeatures,
    showComplianceFeatures,
    showWorkflowFeatures,
    showDuplicateAppFeatures,
    showCopilotFeatures
  };
}
