
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Activity, CheckCircle, AlertCircle } from "lucide-react";

interface KeyInfoCardsProps {
  saas: SaaSData;
}

export function KeyInfoCards({ saas }: KeyInfoCardsProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Decommissioned
        </Badge>
      );
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
        <div className="text-xs text-muted-foreground mb-1 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          Renewal Date
        </div>
        <div className="font-medium">
          {saas.renewalDate === "N/A" 
            ? "N/A" 
            : format(new Date(saas.renewalDate), "MMMM d, yyyy")}
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
        <div className="text-xs text-muted-foreground mb-1 flex items-center">
          <DollarSign className="h-3 w-3 mr-1" />
          Annual Cost
        </div>
        <div className="font-medium">{formatCurrency(saas.price)}</div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
        <div className="text-xs text-muted-foreground mb-1 flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          Status
        </div>
        <div className="font-medium">
          {getStatusBadge(saas.active !== undefined ? saas.active : true)}
        </div>
      </div>
    </div>
  );
}
