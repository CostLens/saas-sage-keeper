
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { format } from "date-fns";
import { FileText } from "lucide-react";

interface ContractTabProps {
  saas: SaaSData;
}

export function ContractTab({ saas }: ContractTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Contract Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
            <p className="font-medium">{format(new Date(saas.contract.signedDate), "MMMM d, yyyy")}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
            <p className="font-medium">{saas.contract.term}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Auto-Renewal</h4>
            <p className="font-medium">{saas.contract.autoRenewal ? "Yes" : "No"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Cancellation Deadline</h4>
            <p className="font-medium">
              {saas.contract.cancellationDeadline 
                ? format(new Date(saas.contract.cancellationDeadline), "MMMM d, yyyy")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Associated Documents</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{saas.name} Contract</p>
                <p className="text-xs text-muted-foreground">PDF • 1.2MB</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Latest Invoice</p>
                <p className="text-xs text-muted-foreground">PDF • 450KB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
