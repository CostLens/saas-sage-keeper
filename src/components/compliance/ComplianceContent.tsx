
import React from "react";
import { ComplianceHeader } from "./ComplianceHeader";
import { ComplianceCertificationsTable } from "./ComplianceCertificationsTable";
import { useComplianceData } from "@/hooks/useComplianceData";
import { Skeleton } from "@/components/ui/skeleton";

export function ComplianceContent() {
  const { complianceData, isLoading } = useComplianceData();

  return (
    <div className="space-y-6">
      <ComplianceHeader />
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <ComplianceCertificationsTable data={complianceData} />
      )}
    </div>
  );
}
