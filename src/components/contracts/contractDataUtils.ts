
import { ContractDocument } from "@/lib/mockData";

export interface ContractsByYearResult {
  contractsByYear: Record<string, ContractDocument[]>;
  allContracts: ContractDocument[];
}

export function processContracts(documents: ContractDocument[]): ContractsByYearResult {
  // First, separate contracts from other document types
  const contracts = documents.filter(doc => doc.type === "Contract");
  
  // Sort contracts by start date (oldest first to establish timeline)
  const sortedContracts = [...contracts].sort((a, b) => {
    if (!a.contractPeriod || !b.contractPeriod) return 0;
    return new Date(a.contractPeriod.start).getTime() - new Date(b.contractPeriod.start).getTime();
  });
  
  // Mark the first contract as original and the rest as renewals
  if (sortedContracts.length > 0) {
    sortedContracts[0].isRenewal = false; // First contract is original
    
    // Mark subsequent contracts as renewals
    for (let i = 1; i < sortedContracts.length; i++) {
      sortedContracts[i].isRenewal = true;
    }
  }
  
  // Group contracts by year
  const contractsByYear: Record<string, ContractDocument[]> = {};
  
  sortedContracts.forEach(contract => {
    if (contract.contractPeriod) {
      const year = new Date(contract.contractPeriod.start).getFullYear().toString();
      
      if (!contractsByYear[year]) {
        contractsByYear[year] = [];
      }
      
      contractsByYear[year].push(contract);
    }
  });
  
  return { contractsByYear, allContracts: sortedContracts };
}

export function getRelatedDocuments(documentId: string, allDocuments: ContractDocument[]): ContractDocument[] {
  return allDocuments.filter(doc => 
    doc.type !== "Contract" && doc.relatedContractId === documentId
  );
}
