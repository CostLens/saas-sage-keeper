
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";

export const SpendHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Spend Analytics</h1>
      <div className="flex gap-4">
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          2023-2024
        </Button>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};
