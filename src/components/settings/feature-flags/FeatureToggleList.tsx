
import React from "react";
import { FeatureFlag } from "./FeatureFlag";
import { FEATURE_KEYS } from "@/hooks/useSidebarFeatures";

interface FeatureToggleListProps {
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
  showInsightsFeatures: boolean;
  onFeatureToggle: (feature: string, enabled: boolean) => void;
}

export function FeatureToggleList({
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
  showDiscoveryExtendedFeatures,
  showInsightsFeatures,
  onFeatureToggle,
}: FeatureToggleListProps) {
  const features = [
    {
      id: FEATURE_KEYS.USAGE,
      name: "Usage Analytics",
      enabled: showUsageFeatures,
      description:
        "Enable detailed usage analytics and license utilization tracking",
    },
    {
      id: FEATURE_KEYS.BOARDING,
      name: "User Boarding",
      enabled: showBoardingFeatures,
      description:
        "Enable user onboarding and offboarding workflows",
    },
    {
      id: FEATURE_KEYS.NEGOTIATION,
      name: "Contract Negotiation",
      enabled: showNegotiationFeatures,
      description:
        "Enable contract negotiation and optimization tools",
    },
    {
      id: FEATURE_KEYS.BENCHMARKING,
      name: "Benchmarking",
      enabled: showBenchmarkingFeatures,
      description:
        "Enable price benchmarking tools and market comparisons",
    },
    {
      id: FEATURE_KEYS.COMPLIANCE,
      name: "Compliance",
      enabled: showComplianceFeatures,
      description:
        "Enable compliance monitoring and certification tracking",
    },
    {
      id: FEATURE_KEYS.WORKFLOW,
      name: "Workflow Builder",
      enabled: showWorkflowFeatures,
      description:
        "Enable creating and managing custom workflows",
    },
    {
      id: FEATURE_KEYS.DUPLICATE_APP,
      name: "Duplicate App Detection",
      enabled: showDuplicateAppFeatures,
      description:
        "Enable detection and comparison of duplicate applications",
    },
    {
      id: FEATURE_KEYS.COPILOT,
      name: "AI Copilot",
      enabled: showCopilotFeatures,
      description:
        "Enable AI-driven suggestions and automations",
    },
    {
      id: FEATURE_KEYS.PROCUREMENT,
      name: "Procurement",
      enabled: showProcurementFeatures,
      description:
        "Enable procurement request flows and approval processes",
    },
    {
      id: FEATURE_KEYS.SHADOW_IT,
      name: "Shadow IT Detection",
      enabled: showShadowITFeatures,
      description:
        "Enable detection and management of unauthorized applications",
    },
    {
      id: FEATURE_KEYS.DISCOVERY_EXTENDED,
      name: "Extended App Discovery",
      enabled: showDiscoveryExtendedFeatures,
      description:
        "Enable advanced application discovery features and integrations",
    },
    {
      id: FEATURE_KEYS.INSIGHTS,
      name: "AI-Powered Insights",
      enabled: showInsightsFeatures,
      description:
        "Enable AI-generated insights and recommendations for your SaaS portfolio",
    },
  ];

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <FeatureFlag
          key={feature.id}
          name={feature.name}
          id={feature.id}
          checked={feature.enabled}
          onChange={(checked) => onFeatureToggle(feature.id, checked)}
          description={feature.description}
        />
      ))}
    </div>
  );
}
