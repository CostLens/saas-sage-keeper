
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TerminationClauseColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <FileCheck className="h-4 w-4 text-muted-foreground" />
      <Badge 
        variant={row.contract?.hasTerminationClause ? "default" : "outline"}
        className={row.contract?.hasTerminationClause ? "bg-amber-500 text-white" : "bg-green-500 text-white"}
      >
        {row.contract?.hasTerminationClause ? "Yes" : "No"}
      </Badge>
    </div>
  );
}
