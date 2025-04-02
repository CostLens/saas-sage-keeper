
import React from "react";
import { Flag, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { SaaSData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TerminationsCardProps {
  terminationsData: SaaSData[];
}

export function TerminationsCard({ terminationsData }: TerminationsCardProps) {
  const [showAllTerminations, setShowAllTerminations] = React.useState(false);

  return (
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
                              Deadline: {format(new Date(saas.contract.cancellationDeadline || saas.contract.endDate), 'MMM d, yyyy')}
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
                                    <span>{saas.contract.autoRenew ? "Yes" : "No"}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Days Left:</span>
                                    <span>{getDaysRemaining(new Date(saas.contract.cancellationDeadline || saas.contract.endDate))}</span>
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
  );
}

// Helper function to calculate days remaining until a date
function getDaysRemaining(date: Date): number {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
