
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  showShadowITFeatures: boolean;
  showDiscoveryExtendedFeatures: boolean;
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
  showDiscoveryExtendedFeatures,
  showInsightsFeatures,
  onFeatureToggle,
}: FeatureFlagsCardProps) {
  const features = [
    {
      id: "show-usage-features",
      name: "Usage Analytics",
      description: "Enables license utilization tracking and user activity monitoring",
      value: showUsageFeatures,
    },
    {
      id: "show-insights-features",
      name: "Insights",
      description: "AI-powered recommendations and optimization insights",
      value: showInsightsFeatures,
    },
    {
      id: "show-boarding-features",
      name: "User Boarding",
      description: "Streamlined onboarding and offboarding workflows",
      value: showBoardingFeatures,
    },
    {
      id: "show-negotiation-features",
      name: "Renewal Management",
      description: "Contract renewal tracking and negotiation tools",
      value: showNegotiationFeatures,
    },
    {
      id: "show-benchmarking-features",
      name: "Benchmarking",
      description: "Compare your SaaS spend with industry benchmarks",
      value: showBenchmarkingFeatures,
    },
    {
      id: "show-compliance-features",
      name: "Compliance",
      description: "Security and compliance assessment tools",
      value: showComplianceFeatures,
    },
    {
      id: "show-workflow-features",
      name: "Workflow Builder",
      description: "Create custom approval workflows",
      value: showWorkflowFeatures,
    },
    {
      id: "show-duplicate-app-features",
      name: "Duplicate App Detection",
      description: "Identify overlapping application functionality",
      value: showDuplicateAppFeatures,
    },
    {
      id: "show-copilot-features",
      name: "AI Assistant",
      description: "AI-powered recommendations and assistance",
      value: showCopilotFeatures,
    },
    {
      id: "show-procurement-features",
      name: "Procurement Request",
      description: "Streamlined software request and approval process",
      value: showProcurementFeatures,
    },
    {
      id: "show-shadow-it-features",
      name: "Shadow IT Detection",
      description: "Identify unauthorized applications in your network",
      value: showShadowITFeatures,
    },
    {
      id: "show-discovery-extended-features",
      name: "App Discovery Extended Features",
      description: "Enhanced application discovery capabilities",
      value: showDiscoveryExtendedFeatures,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Flags</CardTitle>
        <CardDescription>
          Enable or disable features in the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between space-x-2"
            >
              <div className="flex-1">
                <Label
                  htmlFor={feature.id}
                  className="text-base font-medium cursor-pointer"
                >
                  {feature.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <Switch
                id={feature.id}
                checked={feature.value}
                onCheckedChange={(checked) =>
                  onFeatureToggle(feature.id, checked)
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
