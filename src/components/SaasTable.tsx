
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { SaaSData } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Tag, 
  CreditCard
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
