
import React from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface FeaturesTabProps {
  app: AppDiscoveryData;
}

export function FeaturesTab({ app }: FeaturesTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Feature Utilization</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Dashboard</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Reporting</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Analytics</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Automation</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>API Integration</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Feature Adoption</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">High</Badge>
                <span>Dashboard</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.9)}% of users</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">High</Badge>
                <span>Reporting</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.85)}% of users</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="bg-yellow-500">Medium</Badge>
                <span>Analytics</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.6)}% of users</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Low</Badge>
                <span>Automation</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.4)}% of users</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Low</Badge>
                <span>API Integration</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.25)}% of users</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Unused Premium Features</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Advanced Analytics</h4>
                <p className="text-sm text-muted-foreground">This premium feature is included in your plan but only used by 2 users.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Custom Workflows</h4>
                <p className="text-sm text-muted-foreground">This premium feature is included in your plan but hasn't been configured.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">API Access</h4>
                <p className="text-sm text-muted-foreground">This premium feature is included in your plan but only used by the admin account.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
