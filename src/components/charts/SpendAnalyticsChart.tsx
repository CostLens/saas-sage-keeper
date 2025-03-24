
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data for cost vs spend
const data = [
  { month: "Jan", cost: 35000, spend: 32000 },
  { month: "Feb", cost: 35500, spend: 33500 },
  { month: "Mar", cost: 36000, spend: 34000 },
  { month: "Apr", cost: 37000, spend: 35000 },
  { month: "May", cost: 38000, spend: 36500 },
  { month: "Jun", cost: 39000, spend: 38000 },
  { month: "Jul", cost: 40000, spend: 39000 },
  { month: "Aug", cost: 41000, spend: 40000 },
  { month: "Sep", cost: 42000, spend: 41000 },
  { month: "Oct", cost: 43000, spend: 42000 },
  { month: "Nov", cost: 44000, spend: 43000 },
  { month: "Dec", cost: 45000, spend: 44000 },
];

const SpendAnalyticsChart = () => {
  // Format currency values for the tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>Cost vs. Spend Analysis</CardTitle>
        <CardDescription>Comparing budgeted costs against actual spend over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#8884d8"
                strokeWidth={2}
                name="Budgeted Cost"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Actual Spend"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendAnalyticsChart;
