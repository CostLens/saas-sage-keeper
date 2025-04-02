
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { NameColumn } from "./columns/NameColumn";
import { StatusColumn } from "./columns/StatusColumn";
import { RenewalDateColumn } from "./columns/RenewalDateColumn";
import { ContractTenureColumn } from "./columns/ContractTenureColumn";
import { AutoRenewalColumn } from "./columns/AutoRenewalColumn";
import { TerminationClauseColumn } from "./columns/TerminationClauseColumn";
import { PaymentFrequencyColumn } from "./columns/PaymentFrequencyColumn";
import { UsageColumn } from "./columns/UsageColumn";
import { PriceColumn } from "./columns/PriceColumn";
import { PricingTermsColumn } from "./columns/PricingTermsColumn";
import { PaymentDetailsColumn } from "./columns/PaymentDetailsColumn";
import { AppOwnerColumn } from "./columns/AppOwnerColumn";

export const getBaseColumns = () => {
  return [
    {
      id: "name",
      header: "SaaS Name",
      sortable: true,
      cell: (row: SaaSData) => <NameColumn row={row} />,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row: SaaSData) => <StatusColumn row={row} />,
    },
    {
      id: "owner",
      header: "App Owner",
      sortable: true,
      cell: (row: SaaSData) => <AppOwnerColumn row={row} />,
    },
    {
      id: "renewalDate",
      header: "Renewal Date",
      sortable: true,
      cell: (row: SaaSData) => <RenewalDateColumn row={row} />,
    },
    {
      id: "contractTenure",
      header: "Contract Tenure",
      sortable: true,
      cell: (row: SaaSData) => <ContractTenureColumn row={row} />,
    },
    {
      id: "autoRenewal",
      header: "Auto Renewal",
      sortable: true,
      cell: (row: SaaSData) => <AutoRenewalColumn row={row} />,
    },
    {
      id: "terminationClause",
      header: "Termination Clause",
      sortable: true,
      cell: (row: SaaSData) => <TerminationClauseColumn row={row} />,
    },
    {
      id: "paymentFrequency",
      header: "Payment Frequency",
      sortable: true,
      cell: (row: SaaSData) => <PaymentFrequencyColumn row={row} />,
    },
    {
      id: "price",
      header: "Price",
      sortable: true,
      cell: (row: SaaSData) => <PriceColumn row={row} />,
    },
    {
      id: "pricingTerms",
      header: "Pricing Terms",
      sortable: true,
      cell: (row: SaaSData) => <PricingTermsColumn row={row} />,
    },
    {
      id: "lastPayment",
      header: "Payment Details",
      sortable: true,
      cell: (row: SaaSData) => <PaymentDetailsColumn row={row} />,
    },
  ];
};

export const getTableColumns = (showUsage: boolean) => {
  const baseColumns = getBaseColumns();
  
  // Only add usage column if showUsage is true
  if (showUsage) {
    baseColumns.splice(8, 0, {
      id: "usage",
      header: "Usage",
      sortable: true,
      cell: (row: SaaSData) => <UsageColumn row={row} />,
    });
  }
  
  return baseColumns;
};
