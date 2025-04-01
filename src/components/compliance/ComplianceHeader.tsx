
import React from "react";
import { Shield } from "lucide-react";

export function ComplianceHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Compliance Management</h1>
      </div>
      <p className="text-muted-foreground">
        Track and manage compliance certifications across your SaaS portfolio
      </p>
    </div>
  );
}
