
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpendHeaderProps {
  selectedYear?: string;
  onYearChange?: (year: string) => void;
}

export const SpendHeader = ({ selectedYear = "2023-2024", onYearChange }: SpendHeaderProps) => {
  const years = ["2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const [selected, setSelected] = useState(selectedYear);

  const handleYearChange = (value: string) => {
    setSelected(value);
    if (onYearChange) {
      onYearChange(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Spend Analytics</h1>
      <div className="flex gap-4">
        <Select value={selected} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[150px]">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{selected}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};
