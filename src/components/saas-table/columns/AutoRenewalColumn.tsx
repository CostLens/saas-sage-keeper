
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
        className={row.contract?.autoRenewal ? "bg-amber-400 text-amber-950" : "bg-green-500 text-white"}
      >
        {row.contract?.autoRenewal ? "Yes" : "No"}
      </Badge>
    </div>
  );
}
