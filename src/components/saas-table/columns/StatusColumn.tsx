
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

export function StatusColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      {row.active ? (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      ) : (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Decommissioned
        </Badge>
      )}
    </div>
  );
}
