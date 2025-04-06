
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureToggleList } from "./FeatureToggleList";

export interface FeatureFlagsCardProps {
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
  showDiscoveryExtendedFeatures?: boolean;
  showInsightsFeatures: boolean;
  onFeatureToggle: (feature: string, enabled: boolean) => void;
}

export function FeatureFlagsCard({
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
  showDiscoveryExtendedFeatures = false,
  showInsightsFeatures,
  onFeatureToggle
}: FeatureFlagsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Flags</CardTitle>
        <CardDescription>
          Enable or disable features in the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FeatureToggleList
          features={[
            { id: "show-usage-features", name: "Usage Analytics", enabled: showUsageFeatures },
            { id: "show-boarding-features", name: "User Boarding", enabled: showBoardingFeatures },
            { id: "show-negotiation-features", name: "Renewals", enabled: showNegotiationFeatures },
            { id: "show-benchmarking-features", name: "Benchmarking", enabled: showBenchmarkingFeatures },
            { id: "show-compliance-features", name: "Compliance", enabled: showComplianceFeatures },
            { id: "show-workflow-features", name: "Workflow Builder", enabled: showWorkflowFeatures },
            { id: "show-duplicate-app-features", name: "Duplicate App Comparison", enabled: showDuplicateAppFeatures },
            { id: "show-copilot-features", name: "AI Assistant", enabled: showCopilotFeatures },
            { id: "show-procurement-features", name: "Procurement Intake", enabled: showProcurementFeatures },
            { id: "show-shadow-it-features", name: "Shadow IT", enabled: showShadowITFeatures },
            { id: "show-discovery-extended-features", name: "Extended Discovery", enabled: showDiscoveryExtendedFeatures },
            { id: "show-insights-features", name: "Insights", enabled: showInsightsFeatures }
          ]}
          onToggle={onFeatureToggle}
        />
      </CardContent>
    </Card>
  );
}
