
import React from "react";

interface InsightsHeaderProps {
  totalSavings: number;
  utilizationRate: number;
  unusedLicenses: number;
}

export function InsightsHeader({ totalSavings, utilizationRate, unusedLicenses }: InsightsHeaderProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight">Optimization Insights</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          AI-powered recommendations to optimize your SaaS spend
        </p>
      </div>
      
      {/* KPI Cards for Potential Savings and License Utilization */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Potential Savings</h3>
          <p className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground">License Utilization</h3>
          <p className="text-2xl font-bold">{utilizationRate}%</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Unused Licenses</h3>
          <p className="text-2xl font-bold">{unusedLicenses} licenses</p>
        </div>
      </div>
    </div>
  );
}
