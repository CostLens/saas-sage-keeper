
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InsightData } from "@/hooks/useInsightsData";

interface InsightsOptimizationsProps {
  insights: InsightData[];
  onDismiss: (id: string) => void;
  onResolve: (id: string) => void;
}

export function InsightsOptimizations({ 
  insights, 
  onDismiss, 
  onResolve 
}: InsightsOptimizationsProps) {
  if (insights.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No recommended optimizations found.
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {insights.map((insight) => (
        <Card key={insight.id} className="overflow-hidden flex flex-col">
          <div className="bg-amber-50 px-6 py-3 border-b flex justify-between items-center">
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
              Medium Priority
            </Badge>
            <div className="text-green-600 font-semibold">
              $ {insight.potentialSavings.toFixed(2)}/mo
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
            <p className="text-muted-foreground mb-5 flex-grow">
              {insight.description}
            </p>
            
            <div className="flex items-center space-x-3 mb-5">
              <div className="flex justify-center items-center rounded-md w-10 h-10 bg-slate-100 text-slate-700">
                <span className="font-medium">{insight.appInitials}</span>
              </div>
              <span className="font-medium">{insight.appName}</span>
            </div>
            
            <div className="flex space-x-3 mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDismiss(insight.id)}
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" /> Dismiss
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onResolve(insight.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Resolve
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
