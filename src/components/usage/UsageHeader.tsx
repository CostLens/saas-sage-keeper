
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface UsageHeaderProps {
  onExport: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function UsageHeader({ onExport, showBackButton = false, onBackClick }: UsageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBackButton && onBackClick && (
          <Button variant="outline" onClick={onBackClick}>
            Back to Usage Overview
          </Button>
        )}
        <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
      </div>
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
