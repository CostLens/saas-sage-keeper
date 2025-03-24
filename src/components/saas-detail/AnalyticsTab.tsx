
import React from "react";
import { TrendChart } from "@/components/ui/trend-chart";
import { SaaSData, generatePaymentTrendData } from "@/lib/mockData";

interface AnalyticsTabProps {
  saas: SaaSData;
}

export function AnalyticsTab({ saas }: AnalyticsTabProps) {
  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);

  return (
    <div className="space-y-6">
      {/* Spend Trend Chart */}
      <TrendChart
        title="Spend Trend"
        description="Monthly spend for this application"
        data={paymentData}
        dataKey="name"
        categories={["amount"]}
        colors={["hsl(var(--primary))"]}
        valueFormatter={(value) => `$${value.toFixed(2)}`}
        height={300}
      />
    </div>
  );
}
