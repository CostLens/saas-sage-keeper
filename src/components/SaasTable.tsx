
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
  Repeat,
  Database,
  CheckCircle,
  AlertCircle,
  Activity,
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

  // Get payment frequency from contract term
  const getPaymentFrequency = (contract: SaaSData['contract']) => {
    if (contract.term.toLowerCase().includes('monthly')) {
      return 'Monthly';
    } else if (contract.term.toLowerCase().includes('annual')) {
      return 'Annual';
    } else if (contract.term.toLowerCase().includes('quarterly')) {
      return 'Quarterly';
    } else {
      return contract.term;
    }
  };

  // Get license or storage info
  const getLicenseOrStorage = (saas: SaaSData) => {
    if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
      return `${saas.usage.totalLicenses} licenses`;
    } else if (saas.pricingTerms === 'Usage-based') {
      return 'Pay-as-you-go';
    } else {
      return '';
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
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          {row.active ? (
            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Decommissioned
            </Badge>
          )}
        </div>
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
      id: "paymentFrequency",
      header: "Payment Frequency",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <Repeat className="h-4 w-4 text-muted-foreground" />
          <span>{getPaymentFrequency(row.contract)}</span>
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
      id: "usage",
      header: "Usage",
      sortable: true,
      cell: (row: SaaSData) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span>{row.usage.activeUsers} / {row.usage.totalLicenses || 'Unlimited'}</span>
            <Badge variant={row.usage.utilization > 80 ? "success" : row.usage.utilization > 60 ? "warning" : "destructive"} className="mt-1">
              {row.usage.utilization}% Utilized
            </Badge>
          </div>
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
          <div className="flex flex-col">
            <Badge variant="outline">{row.pricingTerms}</Badge>
            {getLicenseOrStorage(row) && (
              <span className="text-xs text-muted-foreground mt-1">
                <Database className="h-3 w-3 inline mr-1" />
                {getLicenseOrStorage(row)}
              </span>
            )}
          </div>
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
