
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
  Users,
  Clock,
  RefreshCw,
  FileTerminal
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SaasTableProps {
  data: SaaSData[];
  onRowClick: (saas: SaaSData) => void;
  showUsage?: boolean;
}

export function SaasTable({ data, onRowClick, showUsage = true }: SaasTableProps) {
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
  const getColumns = () => {
    const baseColumns = [
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
        id: "contractTenure",
        header: "Contract Tenure",
        sortable: true,
        cell: (row: SaaSData) => (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{row.contract?.term || "N/A"}</span>
          </div>
        ),
      },
      {
        id: "autoRenewal",
        header: "Auto Renewal",
        sortable: true,
        cell: (row: SaaSData) => (
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant={row.contract?.autoRenewal ? "default" : "outline"}
              className={row.contract?.autoRenewal ? "bg-blue-500" : ""}
            >
              {row.contract?.autoRenewal ? "Yes" : "No"}
            </Badge>
          </div>
        ),
      },
      {
        id: "terminationClause",
        header: "Termination Clause",
        sortable: true,
        cell: (row: SaaSData) => (
          <div className="flex items-center gap-2">
            <FileTerminal className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant={row.contract?.hasTerminationClause ? "default" : "outline"}
              className={row.contract?.hasTerminationClause ? "bg-green-500" : ""}
            >
              {row.contract?.hasTerminationClause ? "Yes" : "No"}
            </Badge>
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
        id: "pricingTerms",
        header: "Pricing Terms",
        sortable: true,
        cell: (row: SaaSData) => (
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <Badge variant="outline">{row.pricingTerms || 'Not specified'}</Badge>
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
              <span>{row.lastPayment ? formatCurrency(row.lastPayment.amount) : 'N/A'}</span>
              <span className="text-xs text-muted-foreground">
                {row.lastPayment ? formatRelativeDate(row.lastPayment.date) : 'N/A'}
              </span>
            </div>
          </div>
        ),
      },
    ];

    // Only add usage column if showUsage is true
    if (showUsage) {
      baseColumns.splice(7, 0, {
        id: "usage",
        header: "Usage",
        sortable: true,
        cell: (row: SaaSData) => (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span>{row.usage.activeUsers} / {row.usage.totalLicenses || 'Unlimited'}</span>
              <Badge 
                variant={
                  row.usage.utilizationRate > 80 
                    ? "outline" 
                    : row.usage.utilizationRate > 60 
                      ? "outline" 
                      : "destructive"
                } 
                className={
                  row.usage.utilizationRate > 80 
                    ? "mt-1 text-green-500 border-green-200 bg-green-50" 
                    : row.usage.utilizationRate > 60 
                      ? "mt-1 text-yellow-500 border-yellow-200 bg-yellow-50" 
                      : "mt-1"
                }
              >
                {row.usage.utilizationRate}% Utilized
              </Badge>
            </div>
          </div>
        ),
      });
    }

    return baseColumns;
  };

  return (
    <DataTable
      data={data}
      columns={getColumns()}
      onRowClick={onRowClick}
      searchable
      searchField="name"
    />
  );
}
