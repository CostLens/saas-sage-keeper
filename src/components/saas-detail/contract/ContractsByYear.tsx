
import React from "react";
import { ContractItem } from "./ContractItem";

interface ContractsByYearProps {
  contractsByYear: Record<number, any[]>;
  openContracts: string[];
  toggleContract: (contractId: string) => void;
  formatCurrency: (amount: number) => string;
}

export function ContractsByYear({
  contractsByYear,
  openContracts,
  toggleContract,
  formatCurrency
}: ContractsByYearProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Contract History</h3>
      <div className="space-y-6">
        {Object.keys(contractsByYear)
          .sort((a, b) => parseInt(a) - parseInt(b)) // Sort years in ascending order
          .map(year => (
            <div key={year} className="space-y-4">
              <h4 className="font-medium text-lg">{year}</h4>
              {contractsByYear[parseInt(year)].map(contract => (
                <ContractItem
                  key={contract.id}
                  id={contract.id}
                  title={contract.title}
                  dateRange={contract.dateRange}
                  signedDate={contract.signedDate}
                  term={contract.term}
                  isRenewal={contract.isRenewal}
                  isOriginal={contract.isOriginal}
                  invoices={contract.invoices}
                  isOpen={openContracts.includes(contract.id)}
                  onToggle={toggleContract}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
