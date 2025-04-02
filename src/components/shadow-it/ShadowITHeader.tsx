
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Search, Download, Mail } from "lucide-react";
import { toast } from "sonner";

interface ShadowITHeaderProps {
  totalRiskyApps: number;
}

export function ShadowITHeader({ totalRiskyApps }: ShadowITHeaderProps) {
  const handleExportReport = () => {
    toast.success("Shadow IT Report generated!", {
      description: "The report has been sent to your email"
    });
  };

  const handleNotifyIT = () => {
    toast.success("IT department has been notified", {
      description: "A summary of Shadow IT risks has been sent to the IT team"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shadow IT</h1>
          <p className="text-muted-foreground">
            Discover and manage unauthorized applications in your organization
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          
          {totalRiskyApps > 0 && (
            <Button 
              variant="destructive" 
              onClick={handleNotifyIT}
            >
              <Mail className="h-4 w-4 mr-2" />
              Notify IT ({totalRiskyApps})
            </Button>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/3 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search applications..." 
          className="pl-10"
        />
      </div>
    </div>
  );
}
