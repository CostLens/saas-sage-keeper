
import React from "react";
import { useAppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { AppDiscoveryHeader } from "./AppDiscoveryHeader";
import { AppDiscoveryTable } from "./AppDiscoveryTable";
import { Skeleton } from "@/components/ui/skeleton";

export function AppDiscoveryContent() {
  const { saasData, isLoading } = useAppDiscoveryData();

  return (
    <div className="space-y-6">
      <AppDiscoveryHeader />
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <AppDiscoveryTable data={saasData} />
      )}
    </div>
  );
}
