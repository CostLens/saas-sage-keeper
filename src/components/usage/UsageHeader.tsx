
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface UsageHeaderProps {
  onExport: () => void;
}

export function UsageHeader({ onExport }: UsageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
