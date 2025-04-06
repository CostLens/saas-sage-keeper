
import React from "react";

interface InsightsHeaderProps {
  totalSavings: number;
}

export function InsightsHeader({ totalSavings }: InsightsHeaderProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight">AI-Powered Insights</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          Actionable recommendations to optimize your SaaS spend
        </p>
      </div>
    </div>
  );
}
