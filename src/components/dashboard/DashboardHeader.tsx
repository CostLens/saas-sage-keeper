
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  lastRefreshed: Date;
  onRefresh: () => void;
}

export function DashboardHeader({ lastRefreshed, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex items-center gap-2">
        <div className="text-xs text-muted-foreground mr-2">
          Last refreshed: {lastRefreshed.toLocaleTimeString()}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
