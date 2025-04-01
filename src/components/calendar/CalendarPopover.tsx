
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Wallet, Flag } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./utils";
import { mockSaaSData } from "@/lib/mockData";

interface CalendarPopoverProps {
  children: React.ReactNode;
}

export function CalendarPopover({ children }: CalendarPopoverProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Get event data
  const { renewals } = getUpcomingRenewals(mockSaaSData);
  const { paymentsData } = getUpcomingPayments(mockSaaSData);
  const { terminationsData } = getUpcomingTerminations(mockSaaSData);
  
  // Format dates for comparison
  const dateString = date ? format(date, 'yyyy-MM-dd') : '';
  
  // Check if selected date has events
  const hasRenewal = renewals.some(item => 
    format(item.renewalDateObj, 'yyyy-MM-dd') === dateString
  );
  
  const hasPayment = paymentsData.some(item => {
    if (item.lastPayment && item.lastPayment.date) {
      const nextPaymentDate = new Date(item.lastPayment.date);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      return format(nextPaymentDate, 'yyyy-MM-dd') === dateString;
    }
    return false;
  });
  
  const hasTermination = terminationsData.some(item => 
    format(new Date(item.contract.cancellationDeadline), 'yyyy-MM-dd') === dateString
  );
  
  // Create array of dates with events for the calendar
  const getEventDays = () => {
    const eventDays: Record<string, string[]> = {};
    
    renewals.forEach(item => {
      const day = format(item.renewalDateObj, 'yyyy-MM-dd');
      eventDays[day] = [...(eventDays[day] || []), 'renewal'];
    });
    
    paymentsData.forEach(item => {
      if (item.lastPayment && item.lastPayment.date) {
        const nextPaymentDate = new Date(item.lastPayment.date);
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        const day = format(nextPaymentDate, 'yyyy-MM-dd');
        eventDays[day] = [...(eventDays[day] || []), 'payment'];
      }
    });
    
    terminationsData.forEach(item => {
      const day = format(new Date(item.contract.cancellationDeadline), 'yyyy-MM-dd');
      eventDays[day] = [...(eventDays[day] || []), 'termination'];
    });
    
    return eventDays;
  };
  
  // Format events for display
  const eventDays = getEventDays();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border rounded-lg shadow-lg" align="end">
        <div className="p-3 border-b">
          <h4 className="font-medium text-sm">Calendar View</h4>
          <p className="text-xs text-muted-foreground">
            Renewals, payments and deadlines
          </p>
        </div>
        <div className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            components={{
              DayContent: (props) => {
                const dateKey = format(props.date, 'yyyy-MM-dd');
                const hasEvents = eventDays[dateKey];
                
                return (
                  <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                    <div className="flex h-full w-full items-center justify-center">
                      {props.date.getDate()} {/* Fix: Getting day of month from date object instead of accessing day property */}
                    </div>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
                        {hasEvents.includes('renewal') && (
                          <div className="h-1 w-1 rounded-full bg-primary"></div>
                        )}
                        {hasEvents.includes('payment') && (
                          <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                        )}
                        {hasEvents.includes('termination') && (
                          <div className="h-1 w-1 rounded-full bg-amber-500"></div>
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
          <h4 className="font-medium text-sm mb-2">Events on {dateString}</h4>
          <div className="space-y-2">
            {!hasRenewal && !hasPayment && !hasTermination && (
              <div className="text-xs text-muted-foreground py-1">
                No events scheduled for this date
              </div>
            )}
            
            {hasRenewal && (
              <div className={cn(
                "flex items-center justify-between rounded-md p-2",
                "bg-primary/10 dark:bg-primary/20",
                "text-xs"
              )}>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-3.5 w-3.5 text-primary" />
                  <span>Renewals</span>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 bg-primary/5">
                  {renewals.filter(item => 
                    format(item.renewalDateObj, 'yyyy-MM-dd') === dateString
                  ).length}
                </Badge>
              </div>
            )}
            
            {hasPayment && (
              <div className={cn(
                "flex items-center justify-between rounded-md p-2",
                "bg-emerald-500/10 dark:bg-emerald-500/20",
                "text-xs"
              )}>
                <div className="flex items-center gap-2">
                  <Wallet className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Payments</span>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 bg-emerald-500/5">
                  {paymentsData.filter(item => {
                    if (item.lastPayment && item.lastPayment.date) {
                      const nextPaymentDate = new Date(item.lastPayment.date);
                      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                      return format(nextPaymentDate, 'yyyy-MM-dd') === dateString;
                    }
                    return false;
                  }).length}
                </Badge>
              </div>
            )}
            
            {hasTermination && (
              <div className={cn(
                "flex items-center justify-between rounded-md p-2",
                "bg-amber-500/10 dark:bg-amber-500/20",
                "text-xs"
              )}>
                <div className="flex items-center gap-2">
                  <Flag className="h-3.5 w-3.5 text-amber-500" />
                  <span>Termination Deadlines</span>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 bg-amber-500/5">
                  {terminationsData.filter(item => 
                    format(new Date(item.contract.cancellationDeadline), 'yyyy-MM-dd') === dateString
                  ).length}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
