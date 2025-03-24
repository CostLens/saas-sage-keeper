
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { SaaSData } from "@/lib/mockData";

interface UsageOverviewCardsProps {
  utilizationRate: number;
  activeUsers: number;
  totalLicenses: number;
  unusedLicenses: number;
  lowUsageAppsCount: number;
}

export function UsageOverviewCards({ 
  utilizationRate, 
  activeUsers, 
  totalLicenses, 
  unusedLicenses, 
  lowUsageAppsCount 
}: UsageOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{utilizationRate.toFixed(1)}%</CardTitle>
          <CardDescription>Overall Utilization Rate</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={utilizationRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {activeUsers} active users out of {totalLicenses} total licenses
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{unusedLicenses}</CardTitle>
          <CardDescription>Unused Licenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm flex items-center text-amber-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Potential savings opportunity</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{lowUsageAppsCount}</CardTitle>
          <CardDescription>Underutilized Applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm flex items-center text-red-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>Below 50% utilization</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
