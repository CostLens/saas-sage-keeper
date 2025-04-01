
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalendarNav } from "./CalendarNav";
import { CalendarDayContent } from "./CalendarDayContent";
import { EventsList } from "./EventsList";
import { useCalendarEvents } from "./useCalendarEvents";

interface CalendarPopoverProps {
  children: React.ReactNode;
}

export function CalendarPopover({ children }: CalendarPopoverProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  
  const { selectedDateEvents, eventsByDate } = useCalendarEvents(date);
  
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setDate(today);
  };

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border rounded-lg shadow-lg" 
          align="end"
          sideOffset={4}
        >
          <div className="p-3 border-b">
            <h4 className="font-medium text-sm">Calendar View</h4>
            <p className="text-xs text-muted-foreground">
              Renewals, payments, and termination deadlines
            </p>
          </div>
          
          <div className="p-0">
            <CalendarNav 
              currentMonth={currentMonth} 
              setCurrentMonth={setCurrentMonth} 
              goToToday={goToToday} 
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border-0"
              classNames={{
                month: "space-y-4 p-0",
                caption: "hidden", // We use our custom nav
                day_today: "bg-primary/10 text-primary-foreground font-medium",
                day_selected: "bg-primary text-primary-foreground font-medium"
              }}
              components={{
                DayContent: (props) => (
                  <CalendarDayContent 
                    {...props} 
                    eventsByDate={eventsByDate} 
                    currentMonth={currentMonth}
                  />
                )
              }}
            />
          </div>
          
          <EventsList date={date} selectedDateEvents={selectedDateEvents} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
