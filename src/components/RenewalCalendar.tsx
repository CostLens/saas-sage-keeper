
import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
import { CalendarClock, ChevronRight } from "lucide-react";
import { format, addDays, isBefore, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RenewalCalendarProps {
  saasData: SaaSData[];
}

export function RenewalCalendar({ saasData }: RenewalCalendarProps) {
  const [showAllRenewals, setShowAllRenewals] = useState(false);
  
  // Filter SaaS with valid renewal dates
  const renewals = saasData
    .filter(saas => saas.renewalDate !== "N/A")
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  // Get current date and date 90 days from now
  const today = new Date();
  const ninetyDaysFromNow = addDays(today, 90);
  
  // Filter renewals due in the next 90 days
  const upcomingRenewals = renewals.filter(saas => 
    isBefore(saas.renewalDateObj, ninetyDaysFromNow) && 
    saas.renewalDateObj >= today
  ).sort((a, b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime());
  
  // Calculate upcoming renewal amounts
  const upcomingRenewalAmount = upcomingRenewals.reduce((total, saas) => total + saas.price, 0);

  return (
    <Card className="glass-panel glass-panel-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <span>Upcoming Renewals</span>
          </div>
          <Popover open={showAllRenewals} onOpenChange={setShowAllRenewals}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center gap-1"
              >
                View All
                <ChevronRight className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-0" 
              align="end"
              side="bottom"
            >
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium">All Upcoming Renewals</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Subscriptions due for renewal
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {renewals.length > 0 ? (
                  <div className="divide-y">
                    {renewals
                      .sort((a, b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime())
                      .map(saas => (
                        <div key={saas.id} className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{saas.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(saas.renewalDateObj, 'MMM d, yyyy')}
                              </span>
                            </div>
                            <span className="font-semibold">${saas.price.toLocaleString()}</span>
                          </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No upcoming renewals found
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Next 90 Days</span>
              <span className="text-lg font-bold">${upcomingRenewalAmount.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {upcomingRenewals.length} {upcomingRenewals.length === 1 ? 'subscription' : 'subscriptions'} to renew
            </div>
          </div>
          
          {upcomingRenewals.length > 0 ? (
            <div className="space-y-2">
              {upcomingRenewals.slice(0, 3).map(saas => (
                <HoverCard key={saas.id}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          getDaysRemaining(saas.renewalDateObj) <= 30 ? "bg-red-500" :
                          getDaysRemaining(saas.renewalDateObj) <= 60 ? "bg-amber-500" : "bg-green-500"
                        )} />
                        <span className="font-medium">{saas.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(saas.renewalDateObj, 'MMM d')}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{saas.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Renewal Date</div>
                        <div>{format(saas.renewalDateObj, 'MMM d, yyyy')}</div>
                        <div className="text-muted-foreground">Amount</div>
                        <div>${saas.price.toLocaleString()}</div>
                        <div className="text-muted-foreground">Status</div>
                        <div>{saas.active ? "Active" : "Decommissioned"}</div>
                        <div className="text-muted-foreground">Days Left</div>
                        <div>
                          {getDaysRemaining(saas.renewalDateObj)} days
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
              
              {upcomingRenewals.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => setShowAllRenewals(true)}
                >
                  View {upcomingRenewals.length - 3} more renewals
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-sm text-muted-foreground">
              No renewals due in the next 90 days
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to calculate days remaining until a date
function getDaysRemaining(date: Date): number {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
