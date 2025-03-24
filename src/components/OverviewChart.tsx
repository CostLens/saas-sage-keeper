
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface OverviewChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const formatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatter} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
              labelFormatter={(label) => `Category: ${label}`}
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
