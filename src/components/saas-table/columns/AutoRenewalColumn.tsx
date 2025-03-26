
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AutoRenewalColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <RefreshCw className="h-4 w-4 text-muted-foreground" />
      <Badge 
        variant={row.contract?.autoRenewal ? "default" : "outline"}
        className={row.contract?.autoRenewal ? "bg-blue-500" : ""}
      >
        {row.contract?.autoRenewal ? "Yes" : "No"}
      </Badge>
    </div>
  );
}
