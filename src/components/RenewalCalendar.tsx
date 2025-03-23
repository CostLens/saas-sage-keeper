import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
import { CalendarClock, ChevronRight, Wallet, Flag } from "lucide-react";
import { format, addDays, isBefore, parseISO, isAfter } from "date-fns";
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
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [showAllTerminations, setShowAllTerminations] = useState(false);
  
  // Get current date and future date ranges
  const today = new Date();
  const ninetyDaysFromNow = addDays(today, 90);
  const thirtyDaysFromNow = addDays(today, 30);
  
  // Filter renewals due in the next 90 days
  const renewals = saasData
    .filter(saas => saas.renewalDate !== "N/A")
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  const upcomingRenewals = renewals.filter(saas => 
    isBefore(saas.renewalDateObj, ninetyDaysFromNow) && 
    saas.renewalDateObj >= today
  ).sort((a, b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime());
  
  // Calculate upcoming renewal amounts
  const upcomingRenewalAmount = upcomingRenewals.reduce((total, saas) => total + saas.price, 0);

  // Filter payments due in the next 30 days
  const paymentsData = saasData.filter(saas => {
    if (saas.lastPayment && saas.lastPayment.date) {
      // Assuming monthly payments based on last payment date
      const lastPaymentDate = new Date(saas.lastPayment.date);
      const nextPaymentDate = new Date(lastPaymentDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      
      return isAfter(nextPaymentDate, today) && isBefore(nextPaymentDate, thirtyDaysFromNow);
    }
    return false;
  });

  const paymentsAmount = paymentsData.reduce((total, saas) => 
    total + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  // Filter terminations with deadlines in the next 30 days
  const terminationsData = saasData.filter(saas => {
    if (saas.contract && saas.contract.cancellationDeadline) {
      const deadlineDate = new Date(saas.contract.cancellationDeadline);
      return isAfter(deadlineDate, today) && isBefore(deadlineDate, thirtyDaysFromNow);
    }
    return false;
  });

  return (
    <div className="flex gap-4 w-full">
      {/* Renewals Card */}
      <Card className="glass-panel glass-panel-hover flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <span>Upcoming Renewals</span>
            </div>
            <Popover open={showAllRenewals} onOpenChange={setShowAllRenewals}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 h-6 px-2"
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
        <CardContent className="pb-4">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Next 90 Days</span>
              <span className="text-sm font-bold">${upcomingRenewalAmount.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {upcomingRenewals.length} {upcomingRenewals.length === 1 ? 'subscription' : 'subscriptions'} to renew
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Due Card */}
      <Card className="glass-panel glass-panel-hover flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-500" />
              <span>Payments Due</span>
            </div>
            <Popover open={showAllPayments} onOpenChange={setShowAllPayments}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 h-6 px-2"
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
                  <h3 className="text-sm font-medium">All Upcoming Payments</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Payments due in the next 30 days
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {paymentsData.length > 0 ? (
                    <div className="divide-y">
                      {paymentsData.map(saas => (
                        <div key={saas.id} className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{saas.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Est. {format(addMonths(new Date(saas.lastPayment.date), 1), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <span className="font-semibold">${saas.lastPayment.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No upcoming payments found
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="bg-emerald-500/5 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Next 30 Days</span>
              <span className="text-sm font-bold">${paymentsAmount.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {paymentsData.length} {paymentsData.length === 1 ? 'payment' : 'payments'} due
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Termination Deadlines Card */}
      <Card className="glass-panel glass-panel-hover flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-amber-500" />
              <span>Termination Deadlines</span>
            </div>
            <Popover open={showAllTerminations} onOpenChange={setShowAllTerminations}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 h-6 px-2"
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
                  <h3 className="text-sm font-medium">All Termination Deadlines</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cancellation deadlines in the next 30 days
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {terminationsData.length > 0 ? (
                    <div className="divide-y">
                      {terminationsData.map(saas => (
                        <div key={saas.id} className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{saas.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Deadline: {format(new Date(saas.contract.cancellationDeadline), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  Details
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-semibold">{saas.name}</h4>
                                  <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Contract Term:</span>
                                      <span>{saas.contract.term}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Annual Cost:</span>
                                      <span>${saas.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Auto Renewal:</span>
                                      <span>{saas.contract.autoRenewal ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Days Left:</span>
                                      <span>{getDaysRemaining(new Date(saas.contract.cancellationDeadline))}</span>
                                    </div>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No upcoming termination deadlines
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="bg-amber-500/5 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Next 30 Days</span>
              <span className="text-sm font-bold">{terminationsData.length}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {terminationsData.length} {terminationsData.length === 1 ? 'deadline' : 'deadlines'} approaching
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to calculate days remaining until a date
function getDaysRemaining(date: Date): number {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper function to add months to a date
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
