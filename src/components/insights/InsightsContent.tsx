
import React from "react";
import { InsightsHeader } from "./InsightsHeader";
import { InsightsSavingsOpportunities } from "./InsightsSavingsOpportunities";
import { InsightsOptimizations } from "./InsightsOptimizations";
import { useInsightsData } from "@/hooks/useInsightsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, LineChart, BadgeDollarSign } from "lucide-react";

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
              
              <InsightsSavingsOpportunities 
                insights={criticalInsights} 
                onDismiss={dismissInsight}
                onResolve={resolveInsight}
              />
            </div>
          )}
          
          {recommendedInsights.length > 0 && (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Medium Priority
                </div>
                <h2 className="text-2xl font-bold">Recommended Optimizations</h2>
              </div>
              
              <InsightsOptimizations 
                insights={recommendedInsights}
                onDismiss={dismissInsight}
                onResolve={resolveInsight}
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
              
              <InsightsSavingsOpportunities 
                insights={criticalInsights} 
                onDismiss={dismissInsight}
                onResolve={resolveInsight}
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
              
              <InsightsOptimizations 
                insights={recommendedInsights}
                onDismiss={dismissInsight}
                onResolve={resolveInsight}
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
