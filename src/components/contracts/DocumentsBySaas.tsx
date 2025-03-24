
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContractDocument } from "@/lib/mockData";
import { Building, FileText, ReceiptText, Pencil } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { SaasApplication } from "@/types/supabase";

interface DocumentsBySaasProps {
  saasApplications: SaasApplication[] | undefined;
  isLoading: boolean;
  documentsBySaas: Record<string, { saasName: string; documents: ContractDocument[] }>;
  onDocumentClick: (document: ContractDocument) => void;
}

export const DocumentsBySaas = ({ 
  saasApplications, 
  isLoading, 
  documentsBySaas, 
  onDocumentClick 
}: DocumentsBySaasProps) => {
  if (isLoading) {
    return (
      <Card className="glass-panel">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Loading SaaS applications...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {Object.entries(documentsBySaas).map(([saasId, { saasName, documents }]) => (
        <Card key={saasId} className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary" />
              {saasName}
            </CardTitle>
            <CardDescription>
              {documents.length} document{documents.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Group by document type */}
              {["Contract", "Invoice", "Amendment"].map(docType => {
                const docsOfType = documents.filter(d => d.type === docType);
                if (docsOfType.length === 0) return null;
                
                return (
                  <div key={docType} className="space-y-2">
                    <div className="flex items-center">
                      {docType === "Contract" && <FileText className="h-4 w-4 mr-2 text-blue-500" />}
                      {docType === "Invoice" && <ReceiptText className="h-4 w-4 mr-2 text-green-500" />}
                      {docType === "Amendment" && <Pencil className="h-4 w-4 mr-2 text-amber-500" />}
                      <h3 className="font-medium">{docType}s</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                      {docsOfType.map((doc, idx) => (
                        <DocumentCard key={idx} document={doc} onClick={onDocumentClick} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
