
import { useContext } from "react";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

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
  PROCUREMENT: "show-procurement-features",
  SHADOW_IT: "show-shadow-it-features",
};

// Helper function to get initial state from localStorage (kept for backward compatibility)
export const getInitialFeatureState = (key: string): boolean => {
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);
    // Default to false if null or not set
    return savedValue === "true";
  }
  return false;
};

export function useSidebarFeatures() {
  // Use the feature flags context instead of directly managing state here
  return useFeatureFlags();
}
