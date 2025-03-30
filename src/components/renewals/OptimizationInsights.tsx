
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingDown, CheckCircle, Clock, AlertCircle } from "lucide-react";

export function OptimizationInsights() {
  // Recent optimization activities
  const recentActivities = [
    { action: "License optimization identified", vendor: "Adobe", savings: "$12,500", time: "2 days ago", icon: <TrendingDown className="h-4 w-4 text-green-500" /> },
    { action: "Renewal strategy prepared", vendor: "Microsoft", savings: "$8,200", time: "Yesterday", icon: <CheckCircle className="h-4 w-4 text-blue-500" /> },
    { action: "Critical renewal approaching", vendor: "Salesforce", savings: "$15,000", time: "Due in 10 days", icon: <Clock className="h-4 w-4 text-amber-500" /> },
    { action: "Utilization alert", vendor: "Slack", savings: "$4,750", time: "30% utilized", icon: <AlertCircle className="h-4 w-4 text-red-500" /> },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Insights</CardTitle>
        <CardDescription>
          Recent cost-saving opportunities identified
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((item, index) => (
            <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">
                  {item.vendor} • Potential savings: <span className="text-green-600 font-medium">{item.savings}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
