
import React from "react";
import { format, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { DayContentProps } from "react-day-picker";
import { CalendarEvent } from "./CalendarEvent";
import { EventIndicator } from "./EventIndicator";

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
              <EventIndicator type="renewal" />
            )}
            {events.some(e => e.type === 'payment') && (
              <EventIndicator type="payment" />
            )}
            {events.some(e => e.type === 'termination') && (
              <EventIndicator type="termination" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
