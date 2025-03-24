
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractDocument } from "@/lib/mockData";
import { File, FileText, ReceiptText, Pencil } from "lucide-react";
import { DocumentsTable } from "./DocumentsTable";

interface DocumentGroupByTypeProps {
  documents: ContractDocument[];
  onDocumentClick: (document: ContractDocument) => void;
}

export const DocumentGroupByType = ({ documents, onDocumentClick }: DocumentGroupByTypeProps) => {
  // Filter documents based on type
  const contracts = documents.filter(doc => doc.type === "Contract");
  const invoices = documents.filter(doc => doc.type === "Invoice");
  const amendments = documents.filter(doc => doc.type === "Amendment");

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-1">
        <CardTitle>Document Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="gap-2">
              <File className="h-4 w-4" />
              All ({documents.length})
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <FileText className="h-4 w-4" />
              Contracts ({contracts.length})
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2">
              <ReceiptText className="h-4 w-4" />
              Invoices ({invoices.length})
            </TabsTrigger>
            <TabsTrigger value="amendments" className="gap-2">
              <Pencil className="h-4 w-4" />
              Amendments ({amendments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <DocumentsTable documents={documents} onRowClick={onDocumentClick} />
          </TabsContent>
          
          <TabsContent value="contracts">
            <DocumentsTable documents={contracts} onRowClick={onDocumentClick} />
          </TabsContent>
          
          <TabsContent value="invoices">
            <DocumentsTable documents={invoices} onRowClick={onDocumentClick} />
          </TabsContent>
          
          <TabsContent value="amendments">
            <DocumentsTable documents={amendments} onRowClick={onDocumentClick} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
