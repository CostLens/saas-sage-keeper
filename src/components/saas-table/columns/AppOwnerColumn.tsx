
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { User } from "lucide-react";

export function AppOwnerColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center">
      {row.owner ? (
        <span>{row.owner}</span>
      ) : (
        <span className="text-muted-foreground flex items-center">
          <User className="h-3 w-3 mr-1" />
          Unassigned
        </span>
      )}
    </div>
  );
}
