
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, AlertCircle } from "lucide-react";

interface ShadowITRiskBadgeProps {
  riskLevel: string;
}

export function ShadowITRiskBadge({ riskLevel }: ShadowITRiskBadgeProps) {
  switch (riskLevel) {
    case "High":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk
        </Badge>
      );
    case "Medium":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Medium Risk
        </Badge>
      );
    case "Low":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Low Risk
        </Badge>
      );
    default:
      return null;
  }
}
