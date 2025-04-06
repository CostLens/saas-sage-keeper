
import React from "react";
import { toast } from "sonner";
import { FeatureFlagsCard } from "./FeatureFlagsCard";
import { useFeatureFlagState } from "@/hooks/useFeatureFlagState";
import { FEATURE_KEYS } from "@/hooks/useSidebarFeatures";

export function FeatureFlagsSection() {
  // Feature flags state
  const [showUsageFeatures, setShowUsageFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.USAGE, "usageFeaturesToggled");
  
  const [showBoardingFeatures, setShowBoardingFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.BOARDING, "boardingFeaturesToggled");
  
  const [showNegotiationFeatures, setShowNegotiationFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.NEGOTIATION, "negotiationFeaturesToggled");
  
  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.BENCHMARKING, "benchmarkingFeaturesToggled");
  
  const [showComplianceFeatures, setShowComplianceFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.COMPLIANCE, "complianceFeaturesToggled");
  
  const [showWorkflowFeatures, setShowWorkflowFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.WORKFLOW, "workflowFeaturesToggled");
  
  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.DUPLICATE_APP, "duplicateAppFeaturesToggled");
  
  const [showCopilotFeatures, setShowCopilotFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.COPILOT, "copilotFeaturesToggled");
  
  const [showProcurementFeatures, setShowProcurementFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.PROCUREMENT, "procurementFeaturesToggled");
  
  const [showShadowITFeatures, setShowShadowITFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.SHADOW_IT, "shadowITFeaturesToggled");
  
  const [showDiscoveryExtendedFeatures, setShowDiscoveryExtendedFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.DISCOVERY_EXTENDED, "discoveryExtendedFeaturesToggled");
  
  const [showInsightsFeatures, setShowInsightsFeatures] = 
    useFeatureFlagState(FEATURE_KEYS.INSIGHTS, "insightsFeaturesToggled");

  // Handle feature toggle
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    // Update state based on the feature toggled
    switch (feature) {
      case FEATURE_KEYS.USAGE:
        setShowUsageFeatures(enabled);
        break;
      case FEATURE_KEYS.BOARDING:
        setShowBoardingFeatures(enabled);
        break;
      case FEATURE_KEYS.NEGOTIATION:
        setShowNegotiationFeatures(enabled);
        break;
      case FEATURE_KEYS.BENCHMARKING:
        setShowBenchmarkingFeatures(enabled);
        break;
      case FEATURE_KEYS.COMPLIANCE:
        setShowComplianceFeatures(enabled);
        break;
      case FEATURE_KEYS.WORKFLOW:
        setShowWorkflowFeatures(enabled);
        break;
      case FEATURE_KEYS.DUPLICATE_APP:
        setShowDuplicateAppFeatures(enabled);
        break;
      case FEATURE_KEYS.COPILOT:
        setShowCopilotFeatures(enabled);
        break;
      case FEATURE_KEYS.PROCUREMENT:
        setShowProcurementFeatures(enabled);
        break;
      case FEATURE_KEYS.SHADOW_IT:
        setShowShadowITFeatures(enabled);
        break;
      case FEATURE_KEYS.DISCOVERY_EXTENDED:
        setShowDiscoveryExtendedFeatures(enabled);
        break;
      case FEATURE_KEYS.INSIGHTS:
        setShowInsightsFeatures(enabled);
        break;
    }
    
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} ${feature.replace('show-', '').replace('-features', '')}`);
  };

  return (
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
      showDiscoveryExtendedFeatures={showDiscoveryExtendedFeatures}
      showInsightsFeatures={showInsightsFeatures}
      onFeatureToggle={handleFeatureToggle}
    />
  );
}
