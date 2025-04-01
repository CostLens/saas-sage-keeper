
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Calendar } from "lucide-react";
import { getHolidaysForDate } from "@/lib/holidaysData";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

export function RenewalDateColumn({ row }: { row: SaaSData }) {
  // Check if the renewal date falls on a holiday
  const renewalDate = row.renewalDate !== "N/A" ? new Date(row.renewalDate) : null;
  const holidays = renewalDate ? getHolidaysForDate(renewalDate) : [];
  const isHoliday = holidays.length > 0;
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Calendar className={cn(
          "h-4 w-4",
          isHoliday ? "text-purple-500" : "text-muted-foreground"
        )} />
        
        {row.renewalDate === "N/A" ? (
          <span className="text-muted-foreground">N/A</span>
        ) : (
          isHoliday ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-purple-500 font-medium">
                  {new Date(row.renewalDate).toLocaleDateString()}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs space-y-1">
                  <p className="font-medium">Holiday on renewal date:</p>
                  {holidays.map(holiday => (
                    <p key={holiday.id}>{holiday.name}</p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <span className="">
              {new Date(row.renewalDate).toLocaleDateString()}
            </span>
          )
        )}
      </div>
    </TooltipProvider>
  );
}
