
import { useState, useEffect } from "react";
import { mockSaaSData } from "@/lib/mockData";
import { toast } from "sonner";

export interface InsightData {
  id: string;
  type: "renewal" | "spend" | "licenses" | "duplicate";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  appName: string;
  appInitials: string;
  potentialSavings: number;
}

export function useInsightsData() {
  const [criticalInsights, setCriticalInsights] = useState<InsightData[]>([]);
  const [recommendedInsights, setRecommendedInsights] = useState<InsightData[]>([]);

  useEffect(() => {
    // Generate insights based on mock data
    const critical: InsightData[] = [];
    const recommended: InsightData[] = [];

    // Add upcoming renewal insights
    mockSaaSData.slice(0, 2).forEach((saas, index) => {
      if (saas.renewalDate !== "N/A") {
        critical.push({
          id: `renewal-${index}`,
          type: "renewal",
          priority: "high",
          title: "Upcoming Renewal",
          description: "Review usage before renewing to optimize spend.",
          appName: saas.name,
          appInitials: saas.name.substring(0, 2).toUpperCase(),
          potentialSavings: saas.price * 0.3 // Assume 30% potential savings
        });
      }
    });

    // Add high spend alerts
    mockSaaSData.slice(2, 4).forEach((saas, index) => {
      if (saas.price > 500) {
        critical.push({
          id: `spend-${index}`,
          type: "spend",
          priority: "high",
          title: "High Spend Alert",
          description: "Consider negotiating a better rate or finding alternatives.",
          appName: saas.name,
          appInitials: saas.name.substring(0, 2).toUpperCase(),
          potentialSavings: saas.price * 0.2 // Assume 20% potential savings
        });
      }
    });
    
    // Add license optimization insights
    mockSaaSData.slice(1, 3).forEach((saas, index) => {
      if (
        saas.usage && 
        saas.usage.utilizationRate < 70 && 
        saas.usage.totalLicenses && 
        saas.usage.totalLicenses > 10
      ) {
        recommended.push({
          id: `licenses-${index}`,
          type: "licenses",
          priority: "medium",
          title: "License Optimization",
          description: `${saas.usage.utilizationRate}% utilization rate. Consider reducing licenses to match actual usage.`,
          appName: saas.name,
          appInitials: saas.name.substring(0, 2).toUpperCase(),
          potentialSavings: (saas.price / saas.usage.totalLicenses) * (saas.usage.totalLicenses - saas.usage.activeUsers) * 0.8
        });
      }
    });
    
    // Add duplicate app recommendations
    mockSaaSData.slice(3, 5).forEach((saas, index) => {
      if (index % 2 === 0) {
        recommended.push({
          id: `duplicate-${index}`,
          type: "duplicate",
          priority: "medium",
          title: "Duplicate Functionality",
          description: "Multiple apps with similar functionality found. Consider consolidation.",
          appName: saas.name,
          appInitials: saas.name.substring(0, 2).toUpperCase(),
          potentialSavings: saas.price * 0.8 // Assume 80% potential savings
        });
      }
    });
    
    setCriticalInsights(critical);
    setRecommendedInsights(recommended);
  }, []);

  const dismissInsight = (id: string) => {
    setCriticalInsights(prev => prev.filter(insight => insight.id !== id));
    setRecommendedInsights(prev => prev.filter(insight => insight.id !== id));
    toast.success("Insight dismissed");
  };

  const resolveInsight = (id: string) => {
    setCriticalInsights(prev => prev.filter(insight => insight.id !== id));
    setRecommendedInsights(prev => prev.filter(insight => insight.id !== id));
    toast.success("Insight marked as resolved");
  };

  return {
    criticalInsights,
    recommendedInsights,
    dismissInsight,
    resolveInsight
  };
}
