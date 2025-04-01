
import React from "react";
import { CalendarClock, Wallet, Flag, Star } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarEvent } from "./types";
import { getHolidaysForDate } from "@/lib/holidaysData";

interface EventsListProps {
  date: Date | undefined;
  selectedDateEvents: CalendarEvent[];
}

export function EventsList({ date, selectedDateEvents }: EventsListProps) {
  // Get holidays for the selected date
  const holidays = date ? getHolidaysForDate(date) : [];
  const hasEvents = selectedDateEvents.length > 0 || holidays.length > 0;
  
  return (
    <div className="p-3 border-t bg-muted/50">
      <h4 className="font-medium text-sm mb-2">
        {date ? (
          <>Events on {format(date, 'MMM d, yyyy')}</>
        ) : (
          <>Select a date to view events</>
        )}
      </h4>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {!hasEvents && (
          <div className="text-xs text-muted-foreground py-1">
            No events scheduled for this date
          </div>
        )}
        
        {/* Holidays */}
        {holidays.length > 0 && (
          <>
            {holidays.map((holiday) => (
              <div 
                key={holiday.id}
                className="flex flex-col gap-1 rounded-md p-2 bg-purple-100/50 dark:bg-purple-900/20 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-purple-500" />
                  <span className="font-medium">{holiday.name}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-5">
                  {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)} holiday
                </p>
              </div>
            ))}
          </>
        )}
        
        {/* Regular events */}
        {selectedDateEvents
          .sort((a, b) => {
            // Sort by type: renewals first, then payments, then terminations
            const typeOrder = { renewal: 0, payment: 1, termination: 2 };
            return typeOrder[a.type] - typeOrder[b.type];
          })
          .map((event, index) => {
            let bgColor = "";
            let icon = null;
            
            switch (event.type) {
              case 'renewal':
                bgColor = "bg-primary/10 dark:bg-primary/20";
                icon = <CalendarClock className="h-3.5 w-3.5 text-primary" />;
                break;
              case 'payment':
                bgColor = "bg-emerald-500/10 dark:bg-emerald-500/20";
                icon = <Wallet className="h-3.5 w-3.5 text-emerald-500" />;
                break;
              case 'termination':
                bgColor = "bg-amber-500/10 dark:bg-amber-500/20";
                icon = <Flag className="h-3.5 w-3.5 text-amber-500" />;
                break;
            }
            
            return (
              <div 
                key={`${event.type}-${index}`} 
                className={cn(
                  "flex flex-col gap-1 rounded-md p-2",
                  bgColor,
                  "text-xs"
                )}
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-medium">{event.title}</span>
                </div>
                {event.description && (
                  <p className="text-xs text-muted-foreground pl-5">
                    {event.description}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
