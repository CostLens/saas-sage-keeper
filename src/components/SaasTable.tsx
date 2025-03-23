
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { SaaSData } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Tag, 
  CreditCard, 
  Users
} from "lucide-react";

interface SaasTableProps {
  data: SaaSData[];
  onRowClick: (saas: SaaSData) => void;
}

export function SaasTable({ data, onRowClick }: SaasTableProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date to relative time
  const formatRelativeDate = (dateString: string) => {
    if (dateString === "N/A") return "N/A";
    
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  // Define columns for the data table
  const columns = [
    {
      id: "name",
      header: "SaaS Name",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="font-medium">{row.name}</div>
      ),
    },
    {
      id: "renewalDate",
      header: "Renewal Date",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className={row.renewalDate === "N/A" ? "text-muted-foreground" : ""}>
            {row.renewalDate === "N/A" 
              ? "N/A" 
              : new Date(row.renewalDate).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      id: "price",
      header: "Price",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span>{formatCurrency(row.price)}</span>
        </div>
      ),
    },
    {
      id: "pricingTerms",
      header: "Pricing Terms",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline">{row.pricingTerms}</Badge>
        </div>
      ),
    },
    {
      id: "lastPayment",
      header: "Payment Details",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span>{formatCurrency(row.lastPayment.amount)}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeDate(row.lastPayment.date)}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "usage",
      header: "Usage",
      sortable: true,
      cell: (row: SaaSData) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "Underutilized":
              return "text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800";
            case "Optimal":
              return "text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
            case "Overutilized":
              return "text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
            default:
              return "";
          }
        };

        return (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span>
                  {row.usage.activeUsers}
                  {row.usage.totalLicenses ? `/${row.usage.totalLicenses}` : ""} users
                </span>
              </div>
              <Badge className={`text-xs ${getStatusColor(row.usage.status)}`}>
                {row.usage.status} ({row.usage.utilizationRate}%)
              </Badge>
            </div>
          </div>
        );
      },
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
