
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Users, AlertTriangle } from "lucide-react";
import { SaaSData } from "@/lib/mockData";

interface UtilizationCategoriesProps {
  highUsageApps: SaaSData[];
  optimalUsageApps: SaaSData[];
  lowUsageApps: SaaSData[];
}

export function UtilizationCategories({ 
  highUsageApps, 
  optimalUsageApps, 
  lowUsageApps 
}: UtilizationCategoriesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            High Utilization
          </CardTitle>
          <CardDescription>Applications with &gt;90% license utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highUsageApps.map(app => {
              const utilization = app.usage.totalLicenses 
                ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                : 0;
              
              return (
                <div key={app.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{app.name}</span>
                    <span className="text-sm">{utilization.toFixed(0)}%</span>
                  </div>
                  <Progress value={utilization} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                  </p>
                </div>
              );
            })}
            
            {highUsageApps.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No applications with high utilization
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600">
            <Users className="h-5 w-5" />
            Optimal Utilization
          </CardTitle>
          <CardDescription>Applications with 50-90% license utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimalUsageApps.map(app => {
              const utilization = app.usage.totalLicenses 
                ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                : 0;
              
              return (
                <div key={app.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{app.name}</span>
                    <span className="text-sm">{utilization.toFixed(0)}%</span>
                  </div>
                  <Progress value={utilization} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                  </p>
                </div>
              );
            })}
            
            {optimalUsageApps.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No applications with optimal utilization
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Low Utilization
          </CardTitle>
          <CardDescription>Applications with &lt;50% license utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowUsageApps.map(app => {
              const utilization = app.usage.totalLicenses 
                ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                : 0;
              
              return (
                <div key={app.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{app.name}</span>
                    <span className="text-sm">{utilization.toFixed(0)}%</span>
                  </div>
                  <Progress value={utilization} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                  </p>
                </div>
              );
            })}
            
            {lowUsageApps.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No applications with low utilization
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
