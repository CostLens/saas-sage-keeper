
import React, { useState } from "react";
import { ContractDocument } from "@/lib/mockData";
import { ContractHierarchy } from "@/components/contracts/ContractHierarchy";

interface ContractsContentProps {
  contractsBySaas: Record<string, { saasName: string; documents: ContractDocument[] }>;
  onDocumentClick: (document: ContractDocument) => void;
}

export const ContractsContent = ({ contractsBySaas, onDocumentClick }: ContractsContentProps) => {
  return (
    <div className="space-y-6">
      {Object.entries(contractsBySaas).map(([saasId, { saasName, documents }]) => (
        <ContractHierarchy 
          key={saasId}
          saasId={saasId}
          saasName={saasName}
          documents={documents}
          onDocumentClick={onDocumentClick}
        />
      ))}
    </div>
  );
};
