
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Server } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";

interface ShadowITComplianceProps {
  app: ShadowITData;
}

export function ShadowITCompliance({ app }: ShadowITComplianceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Compliance Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <span className="text-sm">Company Approved</span>
            {app.isCompliant ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <span className="text-sm">GDPR Compliant</span>
            {app.gdprCompliant ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <span className="text-sm">HIPAA Compliant</span>
            {app.hipaaCompliant ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <span className="text-sm">Data Processing Agreement</span>
            {app.hasDPA ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Security Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {app.certifications.map((cert, index) => (
            <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {cert}
            </Badge>
          ))}
          {app.certifications.length === 0 && (
            <p className="text-sm text-muted-foreground">No certifications found</p>
          )}
        </div>
        
        <h4 className="text-sm font-medium mt-4 mb-2">Data Location</h4>
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span>{app.dataLocation}</span>
        </div>
      </div>
    </div>
  );
}
