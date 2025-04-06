
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserActivityTab } from "@/components/UserActivityTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useInsightsData, InsightData } from "@/hooks/useInsightsData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X } from "lucide-react";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { DataTable } from "@/components/ui/data-table";
import { Progress } from "@/components/ui/progress";

export interface AppDetailsDialogProps {
  app: AppDiscoveryData;
  isOpen: boolean;
  onClose: () => void;
  source: "discovery" | "usage";
}

export function AppDetailsDialog({ app, isOpen, onClose, source }: AppDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { 
    criticalInsights, 
    recommendedInsights, 
    dismissInsight, 
    resolveInsight 
  } = useInsightsData();
  const { showUsageFeatures, showCopilotFeatures } = useFeatureFlags();

  // Find insights related to this app
  const appInsights = [...criticalInsights, ...recommendedInsights].filter(
    insight => insight.appName === app.name
  );

  // Columns for insights table
  const insightsColumns = [
    {
      id: "insight",
      header: "Insight",
      cell: (insight: InsightData) => (
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant={insight.priority === "high" ? "destructive" : "outline"}>
              {insight.priority === "high" ? "High Priority" : "Medium Priority"}
            </Badge>
          </div>
          <p className="font-medium mt-2">{insight.title}</p>
          <p className="text-sm text-muted-foreground">{insight.description}</p>
        </div>
      )
    },
    {
      id: "savings",
      header: "Potential Savings",
      cell: (insight: InsightData) => (
        <div className="text-green-600 font-semibold">
          ${insight.potentialSavings.toFixed(2)}/mo
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (insight: InsightData) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dismissInsight(insight.id)}
          >
            <X className="mr-2 h-4 w-4" /> Dismiss
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => resolveInsight(insight.id)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Resolve
          </Button>
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
              <span className="font-medium text-blue-700">
                {app.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            {app.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="overview">Usage Overview</TabsTrigger>
              {showUsageFeatures && <TabsTrigger value="features">Feature-Level Usage</TabsTrigger>}
              {showUsageFeatures && <TabsTrigger value="users">Users</TabsTrigger>}
              {showUsageFeatures && <TabsTrigger value="teams">Team Usage</TabsTrigger>}
              {showCopilotFeatures && <TabsTrigger value="insights">Insights</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Average Usage</span>
                          <span className="text-sm font-medium">{app.averageUsage}%</span>
                        </div>
                        <Progress value={app.averageUsage} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Users</p>
                          <p className="text-lg font-medium">{app.activeUsers}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Licenses</p>
                          <p className="text-lg font-medium">{app.totalLicenses}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cost Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Cost</p>
                        <p className="text-lg font-medium">{formatCurrency(app.costPerYear)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost per User</p>
                        <p className="text-lg font-medium">
                          {formatCurrency(app.activeUsers ? app.costPerYear / app.activeUsers : 0)}/year
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost to Date</p>
                        <p className="text-lg font-medium">{formatCurrency(app.costToDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Payments</p>
                        <p className="text-lg font-medium">{formatCurrency(app.totalPayments)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Application Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">First Purchased</p>
                      <p className="text-sm font-medium">
                        {new Date(app.firstPurchased).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Used</p>
                      <p className="text-sm font-medium">{app.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Renewal Date</p>
                      <p className="text-sm font-medium">
                        {app.renewalDate ? new Date(app.renewalDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium">{app.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p className="text-sm font-medium">{app.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-sm font-medium">{app.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Publisher</p>
                      <p className="text-sm font-medium">{app.publisher || app.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Departments</p>
                      <p className="text-sm font-medium">
                        {app.departments?.join(", ") || "All Departments"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {showUsageFeatures && (
              <TabsContent value="features" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature-Level Usage Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center p-4">
                        <p className="text-muted-foreground">Feature-level usage data is not available for this application.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {showUsageFeatures && (
              <TabsContent value="users" className="py-4">
                <UserActivityTab 
                  appName={app.name}
                  showTimeFilters={true}
                />
              </TabsContent>
            )}

            {showUsageFeatures && (
              <TabsContent value="teams" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center p-4">
                        <p className="text-muted-foreground">Team usage data is not available for this application.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {showCopilotFeatures && (
              <TabsContent value="insights" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appInsights.length > 0 ? (
                      <DataTable 
                        data={appInsights}
                        columns={insightsColumns}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-muted-foreground">No insights available for this application.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
