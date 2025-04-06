
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
  const [dismissedInsights, setDismissedInsights] = useState<InsightData[]>([]);
  const [resolvedInsights, setResolvedInsights] = useState<InsightData[]>([]);
  const [averageUtilizationRate, setAverageUtilizationRate] = useState<number>(0);

  useEffect(() => {
    // Generate insights based on mock data
    const critical: InsightData[] = [];
    const recommended: InsightData[] = [];

    // Calculate average utilization rate
    const totalUtilization = mockSaaSData.reduce((sum, app) => {
      return sum + app.usage.utilizationRate;
    }, 0);
    
    setAverageUtilizationRate(Math.round(totalUtilization / mockSaaSData.length));

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

  // Calculate total potential savings from all active insights
  const calculateTotalSavings = () => {
    const allActiveInsights = [...criticalInsights, ...recommendedInsights];
    return allActiveInsights.reduce((sum, insight) => sum + insight.potentialSavings, 0);
  };

  // Dismiss an insight - moves it from critical/recommended to dismissed
  const dismissInsight = (id: string) => {
    // Find the insight in either critical or recommended
    const criticalMatch = criticalInsights.find(insight => insight.id === id);
    const recommendedMatch = recommendedInsights.find(insight => insight.id === id);
    
    // Add to dismissed insights
    if (criticalMatch) {
      setDismissedInsights(prev => [...prev, criticalMatch]);
      setCriticalInsights(prev => prev.filter(insight => insight.id !== id));
    } else if (recommendedMatch) {
      setDismissedInsights(prev => [...prev, recommendedMatch]);
      setRecommendedInsights(prev => prev.filter(insight => insight.id !== id));
    }
    
    toast.success("Insight dismissed");
  };

  // Resolve an insight - moves it from critical/recommended to resolved
  const resolveInsight = (id: string) => {
    // Find the insight in either critical or recommended
    const criticalMatch = criticalInsights.find(insight => insight.id === id);
    const recommendedMatch = recommendedInsights.find(insight => insight.id === id);
    const dismissedMatch = dismissedInsights.find(insight => insight.id === id);
    
    // Add to resolved insights
    if (criticalMatch) {
      setResolvedInsights(prev => [...prev, criticalMatch]);
      setCriticalInsights(prev => prev.filter(insight => insight.id !== id));
    } else if (recommendedMatch) {
      setResolvedInsights(prev => [...prev, recommendedMatch]);
      setRecommendedInsights(prev => prev.filter(insight => insight.id !== id));
    } else if (dismissedMatch) {
      setResolvedInsights(prev => [...prev, dismissedMatch]);
      setDismissedInsights(prev => prev.filter(insight => insight.id !== id));
    }
    
    toast.success("Insight marked as resolved");
  };

  // Dismiss a resolved insight - moves it from resolved to dismissed
  const dismissResolvedInsight = (id: string) => {
    const resolvedMatch = resolvedInsights.find(insight => insight.id === id);
    
    if (resolvedMatch) {
      setDismissedInsights(prev => [...prev, resolvedMatch]);
      setResolvedInsights(prev => prev.filter(insight => insight.id !== id));
    }
    
    toast.success("Resolved insight dismissed");
  };

  // Restore a dismissed insight - moves it back to active (resolved)
  const restoreDismissedInsight = (id: string) => {
    const dismissedMatch = dismissedInsights.find(insight => insight.id === id);
    
    if (dismissedMatch) {
      setResolvedInsights(prev => [...prev, dismissedMatch]);
      setDismissedInsights(prev => prev.filter(insight => insight.id !== id));
    }
    
    toast.success("Insight resolved");
  };

  return {
    criticalInsights,
    recommendedInsights,
    dismissedInsights,
    resolvedInsights,
    dismissInsight,
    resolveInsight,
    dismissResolvedInsight,
    restoreDismissedInsight,
    calculateTotalSavings,
    averageUtilizationRate
  };
}
