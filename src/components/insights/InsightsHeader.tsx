
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { TrendingDown, Activity } from "lucide-react";

interface InsightsHeaderProps {
  totalSavings: number;
  utilizationRate: number;
}

export function InsightsHeader({ totalSavings, utilizationRate }: InsightsHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Insights</h1>
        <p className="text-muted-foreground">
          Actionable recommendations to optimize your SaaS spend
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Potential Savings"
          value={formatCurrency(totalSavings)}
          description="Total potential savings from all insights"
          icon={<TrendingDown className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Overall Utilization"
          value={`${utilizationRate}%`}
          description="Average license utilization across all applications"
          icon={<Activity className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
