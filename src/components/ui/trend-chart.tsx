
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  dataKey: string;
  categories?: string[];
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
  height?: number;
}

export function TrendChart({
  title,
  description,
  data,
  dataKey,
  categories = ["value"],
  colors = ["hsl(var(--primary))"],
  className,
  valueFormatter = (value: number) => value.toString(),
  height = 300,
}: TrendChartProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                {colors.map((color, index) => (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis
                dataKey={dataKey}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={8}
                minTickGap={8}
                tickFormatter={(value) => value.toString()}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={8}
                tickFormatter={(value) => valueFormatter(value)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="text-sm font-medium">{label}</div>
                        {payload.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center text-xs"
                          >
                            <div
                              className="mr-1 h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="font-medium text-muted-foreground">
                              {categories[index]}:
                            </span>
                            <span className="ml-1 font-medium">
                              {valueFormatter(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {categories.map((category, index) => (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey={category}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  fill={`url(#gradient-${index})`}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
