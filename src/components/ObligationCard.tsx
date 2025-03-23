
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ObligationData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isAfter } from "date-fns";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ObligationCardProps {
  obligation: ObligationData;
  onClick?: () => void;
}

export function ObligationCard({ obligation, onClick }: ObligationCardProps) {
  // Determine if the obligation is overdue
  const isOverdue = obligation.status !== "Completed" && 
    isAfter(new Date(), new Date(obligation.dueDate));
  
  // Styling based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
      case "Medium":
        return "text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800";
      case "Low":
        return "text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
      default:
        return "";
    }
  };
  
  // Styling based on type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Payment":
        return "text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800";
      case "Review":
        return "text-purple-500 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800";
      case "Cancellation":
        return "text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700";
    }
  };
  
  // Status icon
  const getStatusIcon = () => {
    switch (obligation.status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden backdrop-blur-sm transition-all duration-300 animate-fade-in border-l-4",
      obligation.status === "Completed" ? "border-l-green-500" : 
      obligation.status === "Overdue" || isOverdue ? "border-l-red-500" : "border-l-amber-500",
      onClick && "cursor-pointer hover:shadow-md"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{obligation.saasName}</CardTitle>
          <div className="flex items-center">
            {getStatusIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm">{obligation.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={getPriorityColor(obligation.priority)}>
            {obligation.priority} Priority
          </Badge>
          <Badge variant="outline" className={getTypeColor(obligation.type)}>
            {obligation.type}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due {format(new Date(obligation.dueDate), "MMM d, yyyy")}</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onClick} className="h-8 px-2">
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
