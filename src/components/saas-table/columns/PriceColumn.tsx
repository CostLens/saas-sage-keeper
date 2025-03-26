
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function PriceColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <DollarSign className="h-4 w-4 text-muted-foreground" />
      <span>{formatCurrency(row.price)}</span>
    </div>
  );
}
