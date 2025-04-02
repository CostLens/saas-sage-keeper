
import React from "react";
import { InsightsHeader } from "./InsightsHeader";
import { InsightsSavingsOpportunities } from "./InsightsSavingsOpportunities";
import { InsightsOptimizations } from "./InsightsOptimizations";
import { useInsightsData } from "@/hooks/useInsightsData";

export function InsightsContent() {
  const { 
    criticalInsights, 
    recommendedInsights,
    dismissInsight,
    resolveInsight 
  } = useInsightsData();

  return (
    <div className="space-y-8">
      <InsightsHeader />
      
      {/* Critical Savings Opportunities Section */}
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
      
      {/* Recommended Optimizations Section */}
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
    </div>
  );
}
