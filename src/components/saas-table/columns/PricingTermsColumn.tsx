
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Tag, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getLicenseOrStorage } from "../saasTableUtils";

export function PricingTermsColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <Tag className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col">
        <Badge variant="outline">{row.pricingTerms || 'Not specified'}</Badge>
        {getLicenseOrStorage(row) && (
          <span className="text-xs text-muted-foreground mt-1">
            <Database className="h-3 w-3 inline mr-1" />
            {getLicenseOrStorage(row)}
          </span>
        )}
      </div>
    </div>
  );
}
