
import React from "react";
import { SaasTable } from "@/components/SaasTable";
import { SaaSData } from "@/lib/mockData";

interface SaasApplicationsSectionProps {
  data: SaaSData[];
  showUsage: boolean;
  onRowClick: (saas: SaaSData) => void;
}

export function SaasApplicationsSection({ 
  data, 
  showUsage, 
  onRowClick 
}: SaasApplicationsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">SaaS Applications</h2>
      </div>
      <SaasTable 
        data={data} 
        onRowClick={onRowClick} 
        showUsage={showUsage}
      />
    </div>
  );
}
