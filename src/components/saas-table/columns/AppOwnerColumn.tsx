
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { User } from "lucide-react";

export function AppOwnerColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <User className="h-4 w-4 text-muted-foreground" />
      <span>{row.owner || "Unassigned"}</span>
    </div>
  );
}
