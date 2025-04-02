
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle } from "lucide-react";
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
        <Card key={insight.id} className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
              Medium Priority
            </Badge>
            <div className="text-green-600 font-semibold">
              $ {insight.potentialSavings.toFixed(2)}/mo
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
          <p className="text-muted-foreground mb-4">
            {insight.description}
          </p>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex justify-center items-center rounded-md w-10 h-10 bg-slate-700 text-white">
              <span className="font-medium">{insight.appInitials}</span>
            </div>
            <span className="font-medium">{insight.appName}</span>
          </div>
          
          <div className="flex space-x-3 mt-auto">
            <Button
              variant="outline"
              onClick={() => onDismiss(insight.id)}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" /> Dismiss
            </Button>
            <Button
              variant="default"
              onClick={() => onResolve(insight.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
