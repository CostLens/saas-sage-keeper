
import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
import { ContractInfo } from "./contract/ContractInfo";
import { ContractsByYear } from "./contract/ContractsByYear";
import { AssociatedDocuments } from "./contract/AssociatedDocuments";

interface ContractTabProps {
  saas: SaaSData;
}

export function ContractTab({ saas }: ContractTabProps) {
  // Mock data for contract history with clearer hierarchy
  const contractHistory = [
    {
      id: "contract-1",
      title: `${saas.name} Original Contract`,
      dateRange: "Jan 2021 - Dec 2021",
      signedDate: "2020-12-15",
      term: "Annual",
      isRenewal: false,
      isOriginal: true,
      year: 2021,
      invoices: [
        { id: "inv-1", title: "Invoice Q1 2021", date: "2021-01-15", amount: saas.price / 4 },
        { id: "inv-2", title: "Invoice Q2 2021", date: "2021-04-15", amount: saas.price / 4 },
        { id: "inv-3", title: "Invoice Q3 2021", date: "2021-07-15", amount: saas.price / 4 },
        { id: "inv-4", title: "Invoice Q4 2021", date: "2021-10-15", amount: saas.price / 4 },
      ]
    },
    {
      id: "contract-2",
      title: `${saas.name} Renewal Contract`,
      dateRange: "Jan 2022 - Dec 2022",
      signedDate: "2021-12-10",
      term: "Annual",
      isRenewal: true,
      isOriginal: false,
      year: 2022,
      invoices: [
        { id: "inv-5", title: "Invoice Q1 2022", date: "2022-01-15", amount: saas.price / 4 },
        { id: "inv-6", title: "Invoice Q2 2022", date: "2022-04-15", amount: saas.price / 4 },
        { id: "inv-7", title: "Invoice Q3 2022", date: "2022-07-15", amount: saas.price / 4 },
        { id: "inv-8", title: "Invoice Q4 2022", date: "2022-10-15", amount: saas.price / 4 },
      ]
    },
    {
      id: "contract-3",
      title: `${saas.name} Current Contract`,
      dateRange: "Jan 2023 - Dec 2023",
      signedDate: saas.contract.signedDate,
      term: saas.contract.term,
      isRenewal: true,
      isOriginal: false,
      year: 2023,
      invoices: [
        { id: "inv-9", title: "Invoice Q1 2023", date: "2023-01-15", amount: saas.price / 4 },
        { id: "inv-10", title: "Invoice Q2 2023", date: "2023-04-15", amount: saas.price / 4 },
        { id: "inv-11", title: "Invoice Q3 2023", date: "2023-07-15", amount: saas.price / 4 },
      ]
    },
  ];

  // Group contracts by year for better display
  const contractsByYear = contractHistory.reduce((acc, contract) => {
    if (!acc[contract.year]) {
      acc[contract.year] = [];
    }
    acc[contract.year].push(contract);
    return acc;
  }, {} as Record<number, typeof contractHistory>);

  const [openContracts, setOpenContracts] = useState<string[]>([contractHistory[contractHistory.length - 1].id]);

  const toggleContract = (contractId: string) => {
    setOpenContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId) 
        : [...prev, contractId]
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Current Contract Information */}
      <ContractInfo 
        signedDate={saas.contract.signedDate}
        term={saas.contract.term}
        autoRenewal={saas.contract.autoRenewal}
        cancellationDeadline={saas.contract.cancellationDeadline}
      />
      
      {/* Contract History */}
      <ContractsByYear 
        contractsByYear={contractsByYear}
        openContracts={openContracts}
        toggleContract={toggleContract}
        formatCurrency={formatCurrency}
      />
      
      {/* Associated Documents */}
      <AssociatedDocuments saasName={saas.name} />
    </div>
  );
}
