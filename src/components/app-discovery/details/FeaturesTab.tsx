
import React from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Laptop, Smartphone, Mail, Calendar, FileText } from "lucide-react";

interface FeaturesTabProps {
  app: AppDiscoveryData;
}

export function FeaturesTab({ app }: FeaturesTabProps) {
  // Generate mock feature data based on app data
  const featureData = [
    {
      name: "Dashboard",
      icon: <Laptop className="h-5 w-5 text-blue-500" />,
      usage: Math.min(98, Math.round(app.averageUsage * 1.1))
    },
    {
      name: "Mobile App",
      icon: <Smartphone className="h-5 w-5 text-green-500" />,
      usage: Math.min(87, Math.round(app.averageUsage * 0.95))
    },
    {
      name: "Email Integration",
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      usage: Math.min(76, Math.round(app.averageUsage * 0.85))
    },
    {
      name: "Calendar",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      usage: Math.min(55, Math.round(app.averageUsage * 0.65))
    },
    {
      name: "Reports",
      icon: <FileText className="h-5 w-5 text-red-500" />,
      usage: Math.min(42, Math.round(app.averageUsage * 0.5))
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Feature Usage</h3>
          <div className="space-y-6">
            {featureData.map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <span>{feature.name}</span>
                  </div>
                  <span className="font-medium">{feature.usage}%</span>
                </div>
                <Progress value={feature.usage} className="h-2" />
                <div className="text-xs text-muted-foreground pt-1">
                  {feature.usage > 70 ? (
                    "High engagement"
                  ) : feature.usage > 40 ? (
                    "Moderate engagement"
                  ) : (
                    "Low engagement - opportunity for training"
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Feature Adoption</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Most Used Feature</h4>
              <div className="flex items-center gap-2">
                {featureData[0].icon}
                <span className="font-medium">{featureData[0].name}</span>
              </div>
              <p className="text-sm mt-2">
                {featureData[0].usage}% of users regularly use this feature
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Least Used Feature</h4>
              <div className="flex items-center gap-2">
                {featureData[4].icon}
                <span className="font-medium">{featureData[4].name}</span>
              </div>
              <p className="text-sm mt-2">
                {featureData[4].usage}% of users regularly use this feature
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
