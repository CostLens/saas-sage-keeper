
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { ContractDocument } from "@/lib/mockData";
import { DocumentTypeTabs } from "./DocumentTypeTabs";
import { DocumentTypeTab } from "./DocumentTypeTab";

interface DocumentGroupByTypeProps {
  documents: ContractDocument[];
  onDocumentClick: (document: ContractDocument) => void;
}

export const DocumentGroupByType = ({ documents, onDocumentClick }: DocumentGroupByTypeProps) => {
  // Filter documents based on type
  const contracts = documents.filter(doc => doc.type === "Contract");
  const invoices = documents.filter(doc => doc.type === "Invoice");
  const amendments = documents.filter(doc => doc.type === "Amendment");

  const tabCounts = {
    all: documents.length,
    contracts: contracts.length,
    invoices: invoices.length,
    amendments: amendments.length
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-1">
        <CardTitle>Document Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <DocumentTypeTabs tabCounts={tabCounts} />
          
          <DocumentTypeTab value="all" documents={documents} onRowClick={onDocumentClick} />
          <DocumentTypeTab value="contracts" documents={contracts} onRowClick={onDocumentClick} />
          <DocumentTypeTab value="invoices" documents={invoices} onRowClick={onDocumentClick} />
          <DocumentTypeTab value="amendments" documents={amendments} onRowClick={onDocumentClick} />
        </Tabs>
      </CardContent>
    </Card>
  );
};
