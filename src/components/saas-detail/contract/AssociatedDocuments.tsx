
import React from "react";
import { FileText } from "lucide-react";

interface AssociatedDocumentsProps {
  saasName: string;
}

export function AssociatedDocuments({ saasName }: AssociatedDocumentsProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Associated Documents</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{saasName} Contract</p>
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
  );
}
