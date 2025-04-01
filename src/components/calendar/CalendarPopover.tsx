
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Wallet, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format, getDaysInMonth, startOfMonth, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./utils";
import { mockSaaSData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CalendarPopoverProps {
  children: React.ReactNode;
}

interface CalendarEvent {
  type: 'renewal' | 'payment' | 'termination';
  date: Date;
  title: string;
  description?: string;
}

export function CalendarPopover({ children }: CalendarPopoverProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  
  // Get event data
  const { renewals } = getUpcomingRenewals(mockSaaSData);
  const { paymentsData } = getUpcomingPayments(mockSaaSData);
  const { terminationsData } = getUpcomingTerminations(mockSaaSData);
  
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
  
  // Format dates for comparison
  const dateString = date ? format(date, 'yyyy-MM-dd') : '';
  
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
  
  // Navigate months
  const goToPrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setDate(today);
  };

  // Custom calendar navigation
  const CalendarNav = () => (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-base font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={goToToday}>
        Today
      </Button>
    </div>
  );
  
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
              Renewals, payments and deadlines
            </p>
          </div>
          
          <div className="p-0">
            <CalendarNav />
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
                DayContent: (props) => {
                  const dateKey = format(props.date, 'yyyy-MM-dd');
                  const events = eventsByDate.get(dateKey) || [];
                  const isCurrentMonth = isSameMonth(props.date, currentMonth);
                  
                  return (
                    <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                      <div className={cn(
                        "flex h-full w-full items-center justify-center",
                        !isCurrentMonth && "opacity-30"
                      )}>
                        {props.date.getDate()}
                      </div>
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
                  );
                }
              }}
            />
          </div>
          
          <div className="p-3 border-t bg-muted/50">
            <h4 className="font-medium text-sm mb-2">
              {date ? (
                <>Events on {format(date, 'MMM d, yyyy')}</>
              ) : (
                <>Select a date to view events</>
              )}
            </h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {selectedDateEvents.length === 0 && (
                <div className="text-xs text-muted-foreground py-1">
                  No events scheduled for this date
                </div>
              )}
              
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
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
