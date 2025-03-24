
import React, { useState } from "react";
import { mockContracts, ContractDocument } from "@/lib/mockData";
import { getSaasApplications } from "@/lib/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { DocumentViewModal } from "@/components/contracts/DocumentViewModal";
import { ContractsLayout } from "@/components/contracts/ContractsLayout";
import { ContractsFilter } from "@/components/contracts/ContractsFilter";
import { ContractsContent } from "@/components/contracts/ContractsContent";

const ContractsRepository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<ContractDocument | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSaas, setSelectedSaas] = useState<string | null>(null);
  
  // Fetch SaaS applications from Supabase
  const { data: saasApplications, isLoading: saasLoading } = useQuery({
    queryKey: ['saasApplications'],
    queryFn: getSaasApplications,
  });

  // Filter documents based on search term
  const filteredDocuments = mockContracts.filter(
    (doc) =>
      (doc.saasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doc.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSaas === null || doc.saasId === selectedSaas)
  );

  const handleDocumentClick = (document: ContractDocument) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };

  // Group contracts by SaaS for hierarchical display
  const getContractsBySaas = () => {
    const result: Record<string, { 
      saasName: string, 
      documents: ContractDocument[] 
    }> = {};
    
    mockContracts.forEach(doc => {
      if (!result[doc.saasId]) {
        result[doc.saasId] = {
          saasName: doc.saasName,
          documents: []
        };
      }
      
      result[doc.saasId].documents.push(doc);
    });
    
    return result;
  };

  const contractsBySaas = getContractsBySaas();

  return (
    <ContractsLayout>
      <ContractsFilter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <ContractsContent 
        contractsBySaas={contractsBySaas} 
        onDocumentClick={handleDocumentClick} 
      />

      {/* Document View Modal */}
      <DocumentViewModal 
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        document={selectedDocument}
        onDocumentClick={handleDocumentClick}
      />
    </ContractsLayout>
  );
};

export default ContractsRepository;
