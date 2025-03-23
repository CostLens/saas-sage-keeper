
import React from "react";
import { CalendarClock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { SaaSData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RenewalCardProps {
  renewals: Array<SaaSData & { renewalDateObj: Date }>;
  upcomingRenewalAmount: number;
}

export function RenewalCard({ renewals, upcomingRenewalAmount }: RenewalCardProps) {
  const [showAllRenewals, setShowAllRenewals] = React.useState(false);
  const upcomingRenewals = renewals.filter(saas => 
    saas.renewalDateObj >= new Date() && 
    saas.renewalDateObj < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  ).sort((a, b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime());

  return (
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
  );
}
