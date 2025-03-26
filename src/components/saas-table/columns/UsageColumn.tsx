
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UsageColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <Users className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col">
        <span>{row.usage.activeUsers} / {row.usage.totalLicenses || 'Unlimited'}</span>
        <Badge 
          variant={
            row.usage.utilizationRate > 80 
              ? "outline" 
              : row.usage.utilizationRate > 60 
                ? "outline" 
                : "destructive"
          } 
          className={
            row.usage.utilizationRate > 80 
              ? "mt-1 text-green-500 border-green-200 bg-green-50" 
              : row.usage.utilizationRate > 60 
                ? "mt-1 text-yellow-500 border-yellow-200 bg-yellow-50" 
                : "mt-1"
          }
        >
          {row.usage.utilizationRate}% Utilized
        </Badge>
      </div>
    </div>
  );
}
