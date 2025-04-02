
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FeatureToggleList } from "./FeatureToggleList";

interface FeatureFlagsCardProps {
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
  showBenchmarkingFeatures: boolean;
  showComplianceFeatures: boolean;
  showWorkflowFeatures: boolean;
  showDuplicateAppFeatures: boolean;
  showCopilotFeatures: boolean;
  showProcurementFeatures: boolean;
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
  onFeatureToggle
}: FeatureFlagsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Toggles</CardTitle>
        <CardDescription>
          Enable or disable specific features of the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FeatureToggleList
          showUsageFeatures={showUsageFeatures}
          showBoardingFeatures={showBoardingFeatures}
          showNegotiationFeatures={showNegotiationFeatures}
          showBenchmarkingFeatures={showBenchmarkingFeatures}
          showComplianceFeatures={showComplianceFeatures}
          showWorkflowFeatures={showWorkflowFeatures}
          showDuplicateAppFeatures={showDuplicateAppFeatures}
          showCopilotFeatures={showCopilotFeatures}
          showProcurementFeatures={showProcurementFeatures}
          onFeatureToggle={onFeatureToggle}
        />
      </CardContent>
    </Card>
  );
}
