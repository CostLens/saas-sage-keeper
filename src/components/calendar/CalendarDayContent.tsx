
import React from "react";
import { format, isSameMonth, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DayContentProps } from "react-day-picker";
import { CalendarEvent } from "./types";
import { Holiday, getHolidaysForDate } from "@/lib/holidaysData";
import { Star } from "lucide-react";

interface CalendarDayContentProps extends DayContentProps {
  date: Date;
  eventsByDate: Map<string, CalendarEvent[]>;
  currentMonth: Date;
}

export function CalendarDayContent({ date, eventsByDate, currentMonth }: CalendarDayContentProps) {
  const dateKey = format(date, 'yyyy-MM-dd');
  const events = eventsByDate.get(dateKey) || [];
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const holidays = getHolidaysForDate(date);
  
  // April 1 gets highlighted with a special background color
  const isAprilFirst = date.getDate() === 1 && date.getMonth() === 3;
  
  return (
    <div className="relative">
      <div className={cn(
        "relative h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        isAprilFirst && "bg-red-500 text-white rounded-full"
      )}>
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
      
      {/* Holiday display */}
      {holidays.length > 0 && isCurrentMonth && (
        <div className="absolute -bottom-7 left-0 right-0 flex flex-col py-0.5">
          {holidays.map((holiday) => (
            <Tooltip key={holiday.id}>
              <TooltipTrigger asChild>
                <div className={cn(
                  "text-[8px] truncate flex items-center gap-0.5 px-1 rounded-sm",
                  holiday.color || "bg-purple-100 dark:bg-purple-900/30"
                )}>
                  <Star className="h-2 w-2" />
                  <span className="truncate">{holiday.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{holiday.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
