
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppDiscoveryData } from '@/hooks/useAppDiscoveryData';

interface FeatureUsageTabProps {
  app: AppDiscoveryData;
}

// Mock feature usage data
const mockFeatureUsage = [
  { name: "Reporting Dashboard", usage: 87 },
  { name: "User Management", usage: 92 },
  { name: "Data Visualization", usage: 78 },
  { name: "API Integration", usage: 65 },
  { name: "Document Collaboration", usage: 83 },
  { name: "Analytics Engine", usage: 54 },
  { name: "Custom Workflows", usage: 71 },
  { name: "Security Features", usage: 95 },
];

export function FeatureUsageTab({ app }: FeatureUsageTabProps) {
  // Get usage color based on percentage
  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-green-500";
    if (usage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeatureUsage.map((feature) => (
              <div key={feature.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{feature.name}</span>
                  <span className="font-medium">{feature.usage}%</span>
                </div>
                <Progress
                  value={feature.usage}
                  className="h-2"
                  indicatorClassName={getUsageColor(feature.usage)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
