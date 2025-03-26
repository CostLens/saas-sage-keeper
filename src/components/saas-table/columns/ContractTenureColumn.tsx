
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Clock } from "lucide-react";

export function ContractTenureColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span>{row.contract?.term || "N/A"}</span>
    </div>
  );
}
