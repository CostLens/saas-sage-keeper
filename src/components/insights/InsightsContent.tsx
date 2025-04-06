
import React, { useState } from "react";
import { InsightsHeader } from "./InsightsHeader";
import { useInsightsData } from "@/hooks/useInsightsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InsightsContent() {
  const { 
    criticalInsights, 
    recommendedInsights,
    dismissedInsights,
    resolvedInsights,
    dismissInsight,
    resolveInsight 
  } = useInsightsData();

  // Combine critical and recommended insights for "All Insights" tab
  const allInsights = [...criticalInsights, ...recommendedInsights];
  
  const renderBadge = (priority: string) => {
    if (priority === "high") {
      return (
        <Badge variant="destructive" className="font-medium">
          High Priority
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
          Medium Priority
        </Badge>
      );
    }
  };

  // Prepare columns for the DataTable
  const insightsColumns = [
    {
      id: "priority",
      header: "Priority",
      cell: (insight: any) => renderBadge(insight.priority)
    },
    {
      id: "app",
      header: "Application",
      cell: (insight: any) => (
        <div className="flex items-center space-x-3">
          <div className="flex justify-center items-center rounded-md w-8 h-8 bg-blue-100 text-blue-700">
            <span className="font-medium">{insight.appInitials}</span>
          </div>
          <span className="font-medium">{insight.appName}</span>
        </div>
      )
    },
    {
      id: "insight",
      header: "Insight",
      cell: (insight: any) => (
        <div>
          <p className="font-medium">{insight.title}</p>
          <p className="text-sm text-muted-foreground">{insight.description}</p>
        </div>
      )
    },
    {
      id: "savings",
      header: "Potential Savings",
      cell: (insight: any) => (
        <div className="text-green-600 font-semibold">
          ${insight.potentialSavings.toFixed(2)}/mo
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (insight: any) => (
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

  // Columns for dismissed insights with resolve action
  const dismissedColumns = [
    ...insightsColumns.filter(col => col.id !== "actions"),
    {
      id: "actions",
      header: "Actions",
      cell: (insight: any) => (
        <div className="flex space-x-2">
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

  // Columns for resolved insights (no actions needed)
  const resolvedColumns = insightsColumns.filter(col => col.id !== "actions");

  return (
    <div className="space-y-6">
      <InsightsHeader totalSavings={0} />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Insights ({allInsights.length})</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed ({dismissedInsights.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedInsights.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-6">
          {allInsights.length > 0 ? (
            <DataTable
              data={allInsights}
              columns={insightsColumns}
            />
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No insights available at this time. Check back later.</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="dismissed" className="space-y-6 mt-6">
          {dismissedInsights.length > 0 ? (
            <DataTable
              data={dismissedInsights}
              columns={dismissedColumns}
            />
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No dismissed insights.</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-6 mt-6">
          {resolvedInsights.length > 0 ? (
            <DataTable
              data={resolvedInsights}
              columns={resolvedColumns}
            />
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No resolved insights.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
