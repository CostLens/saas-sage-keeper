
import React from "react";
import { ContractDocument } from "@/lib/mockData";
import { DocumentsBySaas } from "./DocumentsBySaas";
import { useQuery } from "@tanstack/react-query";
import { getSaasApplications } from "@/lib/supabaseService";

interface ContractsContentProps {
  contractsBySaas: Record<string, { saasName: string; documents: ContractDocument[] }>;
  onDocumentClick: (document: ContractDocument) => void;
}

export const ContractsContent = ({ contractsBySaas, onDocumentClick }: ContractsContentProps) => {
  // Fetch SaaS applications
  const { data: saasApplications, isLoading } = useQuery({
    queryKey: ['saasApplications'],
    queryFn: getSaasApplications,
  });

  return (
    <DocumentsBySaas
      saasApplications={saasApplications}
      isLoading={isLoading}
      documentsBySaas={contractsBySaas}
      onDocumentClick={onDocumentClick}
    />
  );
};
