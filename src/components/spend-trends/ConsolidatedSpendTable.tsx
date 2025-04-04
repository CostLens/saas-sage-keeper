
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ConsolidatedSpendTableProps {
  data: SaaSData[];
  onRowClick: (app: SaaSData) => void;
}

export function ConsolidatedSpendTable({ data, onRowClick }: ConsolidatedSpendTableProps) {
  const columns = [
    {
      id: "name",
      header: "Application",
      sortable: true,
      cell: (row: SaaSData) => (
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
      id: "annual_cost",
      header: "Annual Cost",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="font-medium">{formatCurrency(row.price)}</div>
      ),
    },
    {
      id: "growth",
      header: "YoY Growth",
      sortable: true,
      cell: (row: SaaSData) => {
        // Generate random growth between -30% and +50%
        const growth = Math.floor(Math.random() * 80) - 30;
        return (
          <div className={`flex items-center gap-1 ${growth >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-medium">{growth}%</span>
          </div>
        );
      },
    },
    {
      id: "cost_per_user",
      header: "Cost Per User",
      sortable: true,
      cell: (row: SaaSData) => {
        const costPerUser = row.usage?.activeUsers ? row.price / row.usage.activeUsers : 0;
        return (
          <div className="font-medium">{formatCurrency(costPerUser)}</div>
        );
      },
    },
    {
      id: "renewal",
      header: "Next Renewal",
      sortable: true,
      cell: (row: SaaSData) => {
        const today = new Date();
        const renewalDate = row.renewalDate ? new Date(row.renewalDate) : null;
        const daysUntilRenewal = renewalDate ? Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
        
        return (
          <div className="flex items-center gap-2">
            <div>{renewalDate ? renewalDate.toLocaleDateString() : "N/A"}</div>
            {daysUntilRenewal !== null && daysUntilRenewal <= 30 && (
              <Badge variant={daysUntilRenewal <= 7 ? "destructive" : "warning"}>
                {daysUntilRenewal} days
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "details",
      header: "",
      cell: () => (
        <div className="flex justify-end">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={onRowClick}
      searchable
      searchField="name"
    />
  );
}
