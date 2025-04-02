
import React from "react";
import { FeatureFlag } from "./FeatureFlag";

interface FeatureToggleListProps {
  // Feature flags
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
  showBenchmarkingFeatures: boolean;
  showComplianceFeatures: boolean;
  showWorkflowFeatures: boolean;
  showDuplicateAppFeatures: boolean;
  showCopilotFeatures: boolean;
  // Toggle handlers
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
  onFeatureToggle
}: FeatureToggleListProps) {
  
  const features = [
    {
      id: "usage-features-toggle",
      key: "show-usage-features",
      title: "Usage Analytics",
      description: "Enables usage analytics features",
      checked: showUsageFeatures
    },
    {
      id: "boarding-features-toggle",
      key: "show-boarding-features",
      title: "User Boarding",
      description: "Enables user boarding features",
      checked: showBoardingFeatures
    },
    {
      id: "negotiation-features-toggle",
      key: "show-negotiation-features",
      title: "Renewals & Negotiation",
      description: "Enables contract negotiation features",
      checked: showNegotiationFeatures
    },
    {
      id: "benchmarking-features-toggle",
      key: "show-benchmarking-features",
      title: "Benchmarking",
      description: "Enables benchmarking features",
      checked: showBenchmarkingFeatures
    },
    {
      id: "compliance-features-toggle",
      key: "show-compliance-features",
      title: "Compliance",
      description: "Enables compliance certifications tracking",
      checked: showComplianceFeatures
    },
    {
      id: "duplicate-app-features-toggle",
      key: "show-duplicate-app-features",
      title: "Duplicate Application",
      description: "Enables duplicate app detection and comparison features",
      checked: showDuplicateAppFeatures
    },
    {
      id: "copilot-features-toggle",
      key: "show-copilot-features",
      title: "Co-Pilot",
      description: "Enables AI-powered assistant for procurement optimization",
      checked: showCopilotFeatures
    }
  ];

  return (
    <div className="space-y-4">
      {features.map(feature => (
        <FeatureFlag
          key={feature.id}
          id={feature.id}
          title={feature.title}
          description={feature.description}
          checked={feature.checked}
          onCheckedChange={(checked) => {
            onFeatureToggle(feature.key, checked);
          }}
        />
      ))}
    </div>
  );
}
