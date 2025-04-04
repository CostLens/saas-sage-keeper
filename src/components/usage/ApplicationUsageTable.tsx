
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/ui/data-table";
import { SaaSData } from "@/lib/mockData";

interface ApplicationUsageTableProps {
  data: SaaSData[];
}

export function ApplicationUsageTable({ data }: ApplicationUsageTableProps) {
  const columns = [
    {
      id: "name",
      header: "Application",
      sortable: true,
      cell: (item: SaaSData) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-xs text-primary">
            {item.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{item.name}</span>
            <span className="text-xs text-muted-foreground">{item.category}</span>
          </div>
        </div>
      ),
    },
    {
      id: "usage.activeUsers",
      header: "Active Users",
      sortable: true,
      cell: (item: SaaSData) => item.usage.activeUsers,
    },
    {
      id: "licenses",
      header: "Total Licenses",
      sortable: true,
      cell: (item: SaaSData) => item.usage.totalLicenses || "N/A",
    },
    {
      id: "utilization",
      header: "Utilization",
      sortable: true,
      cell: (item: SaaSData) => {
        const utilization = item.usage.totalLicenses 
          ? Math.round((item.usage.activeUsers / item.usage.totalLicenses) * 100) 
          : 0;
        
        let badgeVariant = "default";
        if (utilization > 90) badgeVariant = "success";
        else if (utilization >= 50 && utilization <= 90) badgeVariant = "secondary";
        else if (utilization < 50) badgeVariant = "destructive";
        
        return (
          <div className="flex flex-col gap-1 w-full max-w-[200px]">
            <div className="flex justify-between items-center">
              <Badge variant={badgeVariant}>{utilization}%</Badge>
              <span className="text-xs text-muted-foreground">
                {item.usage.activeUsers}/{item.usage.totalLicenses || "N/A"}
              </span>
            </div>
            <Progress value={utilization} className="h-2" />
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (item: SaaSData) => {
        const utilization = item.usage.totalLicenses 
          ? Math.round((item.usage.activeUsers / item.usage.totalLicenses) * 100) 
          : 0;
        
        let status = "Optimal";
        let badgeVariant = "secondary";
        
        if (utilization > 90) {
          status = "High";
          badgeVariant = "success";
        } else if (utilization < 50) {
          status = "Low";
          badgeVariant = "destructive";
        }
        
        return (
          <Badge variant={badgeVariant}>{status}</Badge>
        );
      },
    },
    {
      id: "price",
      header: "Annual Cost",
      sortable: true,
      cell: (item: SaaSData) => `$${item.price.toLocaleString()}`,
    },
    {
      id: "potential",
      header: "Potential Savings",
      sortable: true,
      cell: (item: SaaSData) => {
        if (item.pricingTerms !== "User-based" || !item.usage.totalLicenses) return "-";
        
        const unusedLicenses = item.usage.totalLicenses - item.usage.activeUsers;
        if (unusedLicenses <= 0) return "-";
        
        const costPerLicense = item.price / item.usage.totalLicenses;
        const potentialSavings = unusedLicenses * costPerLicense;
        
        return `$${Math.round(potentialSavings).toLocaleString()}`;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Usage Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable 
          data={data} 
          columns={columns} 
          searchable={true}
          searchField="name"
        />
      </CardContent>
    </Card>
  );
}
