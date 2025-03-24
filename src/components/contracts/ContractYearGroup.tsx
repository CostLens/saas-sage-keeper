
import React from "react";
import { Calendar } from "lucide-react";

interface ContractYearGroupProps {
  year: string;
  children: React.ReactNode;
}

export function ContractYearGroup({ year, children }: ContractYearGroupProps) {
  return (
    <div key={`year-${year}`} className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium text-lg">{year}</h3>
      </div>
      <div className="space-y-3 pl-4">
        {children}
      </div>
    </div>
  );
}
