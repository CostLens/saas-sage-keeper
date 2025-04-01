
import React from "react";
import { format } from "date-fns";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarEventItem } from "./CalendarEventItem";

interface EventsListProps {
  date: Date | undefined;
  selectedDateEvents: CalendarEvent[];
}

export function EventsList({ date, selectedDateEvents }: EventsListProps) {
  const hasEvents = selectedDateEvents.length > 0;
  
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
        
        {/* Regular events */}
        {selectedDateEvents
          .sort((a, b) => {
            // Sort by type: renewals first, then payments, then terminations
            const typeOrder = { renewal: 0, payment: 1, termination: 2 };
            return typeOrder[a.type] - typeOrder[b.type];
          })
          .map((event, index) => (
            <CalendarEventItem key={`${event.type}-${index}`} event={event} index={index} />
          ))}
      </div>
    </div>
  );
}
