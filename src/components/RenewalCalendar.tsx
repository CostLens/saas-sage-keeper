
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SaaSData } from "@/lib/mockData";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarIcon, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RenewalCalendarProps {
  saasData: SaaSData[];
}

export function RenewalCalendar({ saasData }: RenewalCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter SaaS with valid renewal dates
  const renewals = saasData
    .filter(saas => saas.renewalDate !== "N/A")
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  // Get renewals for the selected date
  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const renewalsOnSelectedDate = renewals.filter(
    saas => format(saas.renewalDateObj, 'yyyy-MM-dd') === selectedDateString
  );

  // Create a list of dates that have renewals for highlighting in the calendar
  const renewalDates = renewals.map(saas => 
    new Date(saas.renewalDateObj)
  );

  // Function to check if a date has renewals
  const hasRenewals = (date: Date) => {
    return renewalDates.some(renewalDate => 
      format(renewalDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          <span>Renewal Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="border rounded-md"
            modifiers={{
              hasRenewal: renewalDates,
            }}
            modifiersStyles={{
              hasRenewal: { 
                backgroundColor: "rgba(220, 38, 38, 0.1)", 
                fontWeight: "bold",
                borderRadius: "0" 
              }
            }}
            components={{
              DayContent: ({ date }) => (
                <div className={cn(
                  "flex items-center justify-center w-full h-full",
                  hasRenewals(date) && "relative"
                )}>
                  {date.getDate()}
                  {hasRenewals(date) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
                  )}
                </div>
              )
            }}
          />

          {renewalsOnSelectedDate.length > 0 ? (
            <div className="space-y-3 mt-2">
              <h3 className="text-sm font-medium">
                Renewals on {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <div className="space-y-2">
                {renewalsOnSelectedDate.map(saas => (
                  <div key={saas.id} className="flex items-center justify-between p-2 border rounded-md bg-background">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{saas.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">${saas.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-2 text-sm text-muted-foreground">
              {selectedDate ? "No renewals on this date" : "Select a date to see renewals"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
