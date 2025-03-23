
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 glass-panel glass-panel-hover animate-scale-in",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/5 blur-xl"></div>
    </div>
  );
}
