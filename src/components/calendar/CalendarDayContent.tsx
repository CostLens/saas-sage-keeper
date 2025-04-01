
import React from "react";
import { format, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DayContentProps } from "react-day-picker";
import { CalendarEvent } from "./types";

interface CalendarDayContentProps extends DayContentProps {
  date: Date;
  eventsByDate: Map<string, CalendarEvent[]>;
  currentMonth: Date;
}

export function CalendarDayContent({ date, eventsByDate, currentMonth }: CalendarDayContentProps) {
  const dateKey = format(date, 'yyyy-MM-dd');
  const events = eventsByDate.get(dateKey) || [];
  const isCurrentMonth = isSameMonth(date, currentMonth);
  
  return (
    <div className="relative">
      <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
        <div className={cn(
          "flex h-full w-full items-center justify-center",
          !isCurrentMonth && "opacity-30"
        )}>
          {date.getDate()}
        </div>
        
        {/* Event indicators */}
        {events.length > 0 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
            {events.some(e => e.type === 'renewal') && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Renewal</p>
                </TooltipContent>
              </Tooltip>
            )}
            {events.some(e => e.type === 'payment') && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Payment</p>
                </TooltipContent>
              </Tooltip>
            )}
            {events.some(e => e.type === 'termination') && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Termination Deadline</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
