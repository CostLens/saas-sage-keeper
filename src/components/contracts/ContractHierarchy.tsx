
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractDocument } from "@/lib/mockData";
import { Building } from "lucide-react";
import { ContractYearGroup } from "./ContractYearGroup";
import { ContractItemCollapsible } from "./ContractItemCollapsible";
import { processContracts, getRelatedDocuments } from "./contractDataUtils";

interface ContractHierarchyProps {
  saasId: string;
  saasName: string;
  documents: ContractDocument[];
  onDocumentClick: (document: ContractDocument) => void;
}

export function ContractHierarchy({ 
  saasId, 
  saasName, 
  documents, 
  onDocumentClick 
}: ContractHierarchyProps) {
  const [expandedContracts, setExpandedContracts] = useState<string[]>([]);

  const toggleContract = (contractId: string) => {
    setExpandedContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId) 
        : [...prev, contractId]
    );
  };

  const { contractsByYear } = processContracts(documents);

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2 text-primary" />
          {saasName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.keys(contractsByYear)
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort years in ascending order
            .map(year => (
              <ContractYearGroup key={`${saasId}-${year}`} year={year}>
                {contractsByYear[year].map((contract, index) => {
                  const relatedDocs = getRelatedDocuments(contract.id, documents);
                  const isOriginal = index === 0 && year === Object.keys(contractsByYear)[0];
                  
                  return (
                    <ContractItemCollapsible
                      key={contract.id}
                      contract={contract}
                      isExpanded={expandedContracts.includes(contract.id)}
                      toggleContract={toggleContract}
                      relatedDocs={relatedDocs}
                      onDocumentClick={onDocumentClick}
                      isOriginal={isOriginal}
                    />
                  );
                })}
              </ContractYearGroup>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
