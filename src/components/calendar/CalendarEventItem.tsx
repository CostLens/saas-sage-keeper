
import React from "react";
import { CalendarEvent } from "./CalendarEvent";
import { cn } from "@/lib/utils";
import { CalendarClock, Wallet, Flag } from "lucide-react";

interface CalendarEventItemProps {
  event: CalendarEvent;
  index: number;
}

export function CalendarEventItem({ event, index }: CalendarEventItemProps) {
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
}
