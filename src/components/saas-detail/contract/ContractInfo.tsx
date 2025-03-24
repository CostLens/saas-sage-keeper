
import React from "react";
import { format } from "date-fns";

interface ContractInfoProps {
  signedDate: string;
  term: string;
  autoRenewal: boolean;
  cancellationDeadline?: string;
}

export function ContractInfo({ 
  signedDate, 
  term, 
  autoRenewal, 
  cancellationDeadline 
}: ContractInfoProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Current Contract Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
          <p className="font-medium">{format(new Date(signedDate), "MMMM d, yyyy")}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
          <p className="font-medium">{term}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Auto-Renewal</h4>
          <p className="font-medium">{autoRenewal ? "Yes" : "No"}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Cancellation Deadline</h4>
          <p className="font-medium">
            {cancellationDeadline 
              ? format(new Date(cancellationDeadline), "MMMM d, yyyy")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
