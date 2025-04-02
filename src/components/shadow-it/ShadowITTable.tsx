
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { SaasTable } from "@/components/SaasTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ShadowITTableProps {
  data: SaaSData[];
  isLoading: boolean;
  onRowClick: (saas: SaaSData) => void;
}

export function ShadowITTable({ data, isLoading, onRowClick }: ShadowITTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shadow IT Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shadow IT Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <SaasTable 
          data={data} 
          onRowClick={onRowClick} 
          showUsage={true}
        />
      </CardContent>
    </Card>
  );
}
