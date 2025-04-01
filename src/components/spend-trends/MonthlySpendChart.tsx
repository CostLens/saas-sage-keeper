
import React from "react";
import { TrendChart } from "@/components/ui/trend-chart";
import { formatCurrency } from "@/lib/utils";
import { SaaSData } from "@/lib/mockData";

interface MonthlySpendChartProps {
  saasData: SaaSData[];
}

export const MonthlySpendChart = ({ saasData }: MonthlySpendChartProps) => {
  // Calculate total annual spend
  const totalSpend = saasData.reduce((acc, curr) => acc + curr.price, 0);
  
  // Generate monthly spend data
  const generateMonthlySpendData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map(month => {
      // Base value with some randomness to simulate monthly fluctuations
      const baseValue = totalSpend / 12;
      const variance = baseValue * 0.2; // 20% variance
      const value = baseValue + (Math.random() * variance * 2 - variance);
      
      return {
        name: month,
        amount: Math.round(value)
      };
    });
  };
  
  const monthlySpendData = generateMonthlySpendData();

  return (
    <div className="grid grid-cols-1 gap-6">
      <TrendChart
        title="Monthly SaaS Spend"
        description="Total spend on SaaS tools by month"
        data={monthlySpendData}
        dataKey="name"
        categories={["amount"]}
        colors={["hsl(var(--primary))"]}
        valueFormatter={(value) => formatCurrency(value)}
        height={300}
      />
    </div>
  );
};
