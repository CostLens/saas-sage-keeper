
import React from "react";
import { Calendar } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";

interface ShadowITOverviewProps {
  app: ShadowITData;
}

export function ShadowITOverview({ app }: ShadowITOverviewProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Category</p>
          <p>{app.category}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">URL</p>
          <p className="text-blue-600 dark:text-blue-400">{app.url}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">First Detected</p>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {app.firstDetected}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Data Sensitivity</p>
          <p>{app.dataSensitivity}</p>
        </div>
      </div>
      
      <div className="pt-4">
        <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
        <ul className="list-disc list-inside space-y-1">
          {app.riskFactors.map((factor, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {factor}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-4">
        <h4 className="text-sm font-medium mb-2">Business Impact</h4>
        <p className="text-sm text-muted-foreground">{app.businessImpact}</p>
      </div>
    </div>
  );
}
