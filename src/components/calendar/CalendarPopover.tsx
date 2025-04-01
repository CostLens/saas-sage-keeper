
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format, isSameDay } from "date-fns";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./utils";
import { mockSaaSData } from "@/lib/mockData";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalendarNav } from "./CalendarNav";
import { CalendarDayContent } from "./CalendarDayContent";
import { EventsList } from "./EventsList";
import { CalendarEvent } from "./types";
import { getHolidaysForMonth } from "@/lib/holidaysData";

interface CalendarPopoverProps {
  children: React.ReactNode;
}

export function CalendarPopover({ children }: CalendarPopoverProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  
  // Get event data
  const { renewals } = getUpcomingRenewals(mockSaaSData);
  const { paymentsData } = getUpcomingPayments(mockSaaSData);
  const { terminationsData } = getUpcomingTerminations(mockSaaSData);
  
  // Get holidays for the current month
  const holidays = getHolidaysForMonth(currentMonth);
  
  // Construct calendar events from all data sources
  const allEvents: CalendarEvent[] = [
    ...renewals.map(item => ({
      type: 'renewal' as const,
      date: item.renewalDateObj,
      title: `${item.name} renewal`,
      description: `Subscription renewal for ${item.name}`
    })),
    ...paymentsData.map(item => {
      if (!item.lastPayment?.date) return null;
      const nextPaymentDate = new Date(item.lastPayment.date);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      return {
        type: 'payment' as const,
        date: nextPaymentDate,
        title: `${item.name} payment`,
        description: `$${item.price} payment due for ${item.name}`
      };
    }).filter(Boolean) as CalendarEvent[],
    ...terminationsData.map(item => ({
      type: 'termination' as const,
      date: new Date(item.contract.cancellationDeadline),
      title: `${item.name} termination deadline`,
      description: `Cancellation deadline for ${item.name}`
    }))
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = allEvents.filter(event => 
    date && isSameDay(event.date, date)
  );
  
  // Create map of dates with events for the calendar
  const eventsByDate = React.useMemo(() => {
    const eventMap = new Map<string, CalendarEvent[]>();
    
    allEvents.forEach(event => {
      const key = format(event.date, 'yyyy-MM-dd');
      if (!eventMap.has(key)) {
        eventMap.set(key, []);
      }
      eventMap.get(key)!.push(event);
    });
    
    return eventMap;
  }, [allEvents]);
  
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
              Renewals, payments, and holidays
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
