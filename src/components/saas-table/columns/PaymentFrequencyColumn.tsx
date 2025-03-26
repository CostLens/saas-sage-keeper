
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Repeat } from "lucide-react";
import { getPaymentFrequency } from "../saasTableUtils";

export function PaymentFrequencyColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <Repeat className="h-4 w-4 text-muted-foreground" />
      <span>{getPaymentFrequency(row.contract)}</span>
    </div>
  );
}
