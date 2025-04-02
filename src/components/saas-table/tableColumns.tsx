
import { SaaSData } from "@/lib/mockData";
import { NameColumn } from "./columns/NameColumn";
import { StatusColumn } from "./columns/StatusColumn";
import { RenewalDateColumn } from "./columns/RenewalDateColumn";
import { PriceColumn } from "./columns/PriceColumn";
import { PricingTermsColumn } from "./columns/PricingTermsColumn";
import { PaymentFrequencyColumn } from "./columns/PaymentFrequencyColumn";
import { ContractTenureColumn } from "./columns/ContractTenureColumn";
import { UsageColumn } from "./columns/UsageColumn";
import { PaymentDetailsColumn } from "./columns/PaymentDetailsColumn";
import { AutoRenewalColumn } from "./columns/AutoRenewalColumn";
import { TerminationClauseColumn } from "./columns/TerminationClauseColumn";
import { AppOwnerColumn } from "./columns/AppOwnerColumn"; // Import the new column

export function getTableColumns(showUsage: boolean = true) {
  const baseColumns = [
    {
      id: "name",
      header: "Application",
      cell: (row: SaaSData) => <NameColumn row={row} />,
      sortable: true,
    },
    {
      id: "owner", // Add new App Owner column
      header: "App Owner",
      cell: (row: SaaSData) => <AppOwnerColumn row={row} />,
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: SaaSData) => <StatusColumn row={row} />,
      sortable: true,
    },
    {
      id: "renewal",
      header: "Renewal Date",
      cell: (row: SaaSData) => <RenewalDateColumn row={row} />,
      sortable: true,
    },
    {
      id: "price",
      header: "Price",
      cell: (row: SaaSData) => <PriceColumn row={row} />,
      sortable: true,
    },
    {
      id: "pricingTerms",
      header: "Pricing Terms",
      cell: (row: SaaSData) => <PricingTermsColumn row={row} />,
      sortable: true,
    },
    {
      id: "paymentFrequency",
      header: "Payment Frequency",
      cell: (row: SaaSData) => <PaymentFrequencyColumn row={row} />,
      sortable: true,
    },
    {
      id: "contractTenure",
      header: "Contract Tenure",
      cell: (row: SaaSData) => <ContractTenureColumn row={row} />,
      sortable: true,
    },
  ];

  if (showUsage) {
    baseColumns.push({
      id: "usage",
      header: "Usage",
      cell: (row: SaaSData) => <UsageColumn row={row} />,
      sortable: true,
    });
  }

  baseColumns.push({
    id: "paymentDetails",
    header: "Payment Details",
    cell: (row: SaaSData) => <PaymentDetailsColumn row={row} />,
    sortable: true,
  });

  baseColumns.push({
    id: "autoRenewal",
    header: "Auto Renewal",
    cell: (row: SaaSData) => <AutoRenewalColumn row={row} />,
    sortable: true,
  });

  baseColumns.push({
    id: "terminationClause",
    header: "Termination Clause",
    cell: (row: SaaSData) => <TerminationClauseColumn row={row} />,
    sortable: true,
  });

  return baseColumns;
}
