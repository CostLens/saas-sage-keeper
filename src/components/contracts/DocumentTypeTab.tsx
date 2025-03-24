
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { DocumentsTable } from "./DocumentsTable";
import { ContractDocument } from "@/lib/mockData";

interface DocumentTypeTabProps {
  value: string;
  documents: ContractDocument[];
  onRowClick: (document: ContractDocument) => void;
}

export const DocumentTypeTab = ({ value, documents, onRowClick }: DocumentTypeTabProps) => {
  return (
    <TabsContent value={value}>
      <DocumentsTable documents={documents} onRowClick={onRowClick} />
    </TabsContent>
  );
};
