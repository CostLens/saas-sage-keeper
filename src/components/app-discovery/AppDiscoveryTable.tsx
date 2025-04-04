
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AppOwnerColumn } from "@/components/saas-table/columns/AppOwnerColumn";
import { SaaSData } from "@/lib/mockData";
import { AppDetailsDialog } from "./AppDetailsDialog";

interface AppDiscoveryTableProps {
  data: AppDiscoveryData[];
}

export function AppDiscoveryTable({ data }: AppDiscoveryTableProps) {
  const [selectedApp, setSelectedApp] = useState<AppDiscoveryData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (app: AppDiscoveryData) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const columns = [
    {
      id: "name",
      header: "Application",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
            <span className="font-medium text-xs">{row.name.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      id: "owner",
      header: "App Owner",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <AppOwnerColumn row={{
          id: String(row.id), 
          name: row.name,
          owner: row.owner || "Unassigned",
          description: row.description,
          price: row.costPerYear,
          renewalDate: row.renewalDate || "",
          contract: { signedDate: "", term: "", autoRenewal: false, cancellationDeadline: null },
          usage: { activeUsers: row.activeUsers, totalLicenses: row.totalLicenses, utilizationRate: Math.round((row.activeUsers / row.totalLicenses) * 100) },
          paymentHistory: [],
          usageHistory: [],
          tasks: [],
          alerts: []
        } as SaaSData} />
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <Badge 
          variant={
            row.status === 'Approved' ? 'success' : 
            row.status === 'Restricted' ? 'destructive' : 'outline'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      id: "totalPayments",
      header: "Total Payments",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <div className="font-medium">{formatCurrency(row.totalPayments)}</div>
      ),
    },
    {
      id: "costToDate",
      header: "Cost To Date",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <div className="font-medium">{formatCurrency(row.costToDate)}</div>
      ),
    },
    {
      id: "averageUsage",
      header: "Avg. Usage",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full max-w-[150px]">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{row.averageUsage}%</span>
                </div>
                <Progress value={row.averageUsage} className="h-2" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average usage across all licenses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "firstPurchased",
      header: "First Purchased",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <div>{new Date(row.firstPurchased).toLocaleDateString()}</div>
      ),
    },
    {
      id: "renewalDate",
      header: "Next Renewal",
      sortable: true,
      cell: (row: AppDiscoveryData) => (
        <div>{row.renewalDate ? new Date(row.renewalDate).toLocaleDateString() : "N/A"}</div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        searchable
        searchField="name"
        onRowClick={handleRowClick}
      />
      <AppDetailsDialog 
        app={selectedApp} 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
      />
    </>
  );
}
