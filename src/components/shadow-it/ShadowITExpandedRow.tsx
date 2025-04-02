
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";

interface ShadowITExpandedRowProps {
  app: ShadowITData;
}

export function ShadowITExpandedRow({ app }: ShadowITExpandedRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={7} className="bg-muted/30">
        <div className="p-4">
          <h4 className="font-medium mb-2">Certifications and Compliance</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium">Security Certifications</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {app.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {cert}
                  </Badge>
                ))}
                {app.certifications.length === 0 && (
                  <span className="text-sm text-muted-foreground">None</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Data Processing</p>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center gap-1">
                  {app.gdprCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  {app.hipaaCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Risk Factors</p>
              <ul className="list-disc list-inside mt-1">
                {app.riskFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <h4 className="font-medium mb-2">Key Users</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {app.keyUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
