
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { formatRelativeDate } from "../saasTableUtils";

export function PaymentDetailsColumn({ row }: { row: SaaSData }) {
  return (
    <div className="flex items-center gap-2">
      <CreditCard className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col">
        <span>{row.lastPayment ? formatCurrency(row.lastPayment.amount) : 'N/A'}</span>
        <span className="text-xs text-muted-foreground">
          {row.lastPayment ? formatRelativeDate(row.lastPayment.date) : 'N/A'}
        </span>
      </div>
    </div>
  );
}
