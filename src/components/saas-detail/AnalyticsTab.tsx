
import React from "react";
import { TrendChart } from "@/components/ui/trend-chart";
import { SaaSData, generatePaymentTrendData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AnalyticsTabProps {
  saas: SaaSData;
}

export function AnalyticsTab({ saas }: AnalyticsTabProps) {
  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);

  // Sample spend by category data
  const spendByCategoryData = [
    { name: "User Licenses", value: saas.price * 0.65, color: "#0088FE" },
    { name: "Services", value: saas.price * 0.15, color: "#00C49F" },
    { name: "Support", value: saas.price * 0.12, color: "#FFBB28" },
    { name: "Training", value: saas.price * 0.08, color: "#FF8042" }
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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
      
      {/* Spend by Category Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Spend by Category</CardTitle>
            <CardDescription>
              SaaS spend distribution across categories
            </CardDescription>
          </div>
          <Select defaultValue="value">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Show by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value">By Value</SelectItem>
              <SelectItem value="percentage">By Percentage</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendByCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {spendByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ 
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    border: '1px solid var(--border)'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
