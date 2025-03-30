
import React from "react";
import { SavingsSummaryCard } from "@/components/renewals/SavingsSummaryCard";

interface PageHeaderProps {
  totalPotentialSavings: number;
}

export function PageHeader({ totalPotentialSavings }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Renewals & Optimization</h1>
        <p className="text-muted-foreground">
          Optimize license costs for upcoming renewals based on usage analysis
        </p>
      </div>
      <SavingsSummaryCard totalSavings={totalPotentialSavings} />
    </div>
  );
}
