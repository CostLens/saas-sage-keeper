
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EventType } from "./EventType";

interface EventIndicatorProps {
  type: EventType;
}

export function EventIndicator({ type }: EventIndicatorProps) {
  let bgColorClass = "";
  let tooltipText = "";
  
  switch (type) {
    case 'renewal':
      bgColorClass = "bg-primary";
      tooltipText = "Renewal";
      break;
    case 'payment':
      bgColorClass = "bg-emerald-500";
      tooltipText = "Payment";
      break;
    case 'termination':
      bgColorClass = "bg-amber-500";
      tooltipText = "Termination Deadline";
      break;
  }
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`h-1.5 w-1.5 rounded-full ${bgColorClass}`}></div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
