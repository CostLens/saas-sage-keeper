
import React, { useState } from "react";
import { InsightsHeader } from "./InsightsHeader";
import { useInsightsData } from "@/hooks/useInsightsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, LineChart, BadgeDollarSign } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function InsightsContent() {
  const { 
    criticalInsights, 
    recommendedInsights,
    dismissInsight,
    resolveInsight 
  } = useInsightsData();

  const totalSavings = [...criticalInsights, ...recommendedInsights].reduce(
    (sum, insight) => sum + insight.potentialSavings, 
    0
  );

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

  return (
    <div className="space-y-6">
      <InsightsHeader totalSavings={totalSavings} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground">Critical Issues</p>
          <p className="text-2xl font-bold">{criticalInsights.length}</p>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="bg-amber-100 p-3 rounded-full mb-2">
            <LineChart className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-sm text-muted-foreground">Recommendations</p>
          <p className="text-2xl font-bold">{recommendedInsights.length}</p>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-2">
            <BadgeDollarSign className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Potential Savings</p>
          <p className="text-2xl font-bold">${totalSavings.toFixed(2)}/mo</p>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground">ROI Impact</p>
          <p className="text-2xl font-bold">High</p>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="critical">Critical ({criticalInsights.length})</TabsTrigger>
          <TabsTrigger value="recommended">Recommended ({recommendedInsights.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-6">
          {criticalInsights.length > 0 && (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  High Priority
                </div>
                <h2 className="text-2xl font-bold">Critical Savings Opportunities</h2>
              </div>
              
              <DataTable
                data={criticalInsights}
                columns={insightsColumns}
              />
            </div>
          )}
          
          {recommendedInsights.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Medium Priority
                </div>
                <h2 className="text-2xl font-bold">Recommended Optimizations</h2>
              </div>
              
              <DataTable
                data={recommendedInsights}
                columns={insightsColumns}
              />
            </div>
          )}
          
          {criticalInsights.length === 0 && recommendedInsights.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No insights available at this time. Check back later.</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="critical" className="space-y-6 mt-6">
          {criticalInsights.length > 0 ? (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  High Priority
                </div>
                <h2 className="text-2xl font-bold">Critical Savings Opportunities</h2>
              </div>
              
              <DataTable
                data={criticalInsights}
                columns={insightsColumns}
              />
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No critical insights available at this time.</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recommended" className="space-y-6 mt-6">
          {recommendedInsights.length > 0 ? (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Medium Priority
                </div>
                <h2 className="text-2xl font-bold">Recommended Optimizations</h2>
              </div>
              
              <DataTable
                data={recommendedInsights}
                columns={insightsColumns}
              />
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No recommended insights available at this time.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
