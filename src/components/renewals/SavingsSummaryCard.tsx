
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SavingsSummaryCardProps {
  totalSavings: number;
}

export function SavingsSummaryCard({ totalSavings }: SavingsSummaryCardProps) {
  return (
    <Card className="w-full md:w-auto">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Potential Savings</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(totalSavings)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
