
import React from "react";
import { Wallet, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { SaaSData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PaymentsCardProps {
  paymentsData: SaaSData[];
  paymentsAmount: number;
}

export function PaymentsCard({ paymentsData, paymentsAmount }: PaymentsCardProps) {
  const [showAllPayments, setShowAllPayments] = React.useState(false);

  // Helper function to add months to a date
  function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  return (
    <Card className="glass-panel glass-panel-hover h-full">
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
                              {saas.lastPayment ? `Est. ${format(addMonths(new Date(saas.lastPayment.date), 1), 'MMM d, yyyy')}` : 'N/A'}
                            </span>
                          </div>
                          <span className="font-semibold">${saas.lastPayment ? saas.lastPayment.amount.toLocaleString() : '0'}</span>
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
  );
}
