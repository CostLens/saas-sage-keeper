
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Calendar } from "lucide-react";

export function RenewalDateColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <span className={row.renewalDate === "N/A" ? "text-muted-foreground" : ""}>
        {row.renewalDate === "N/A" 
          ? "N/A" 
          : new Date(row.renewalDate).toLocaleDateString()}
      </span>
    </div>
  );
}
