
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContractDocument } from "@/lib/mockData";
import { Building, FileText, ReceiptText } from "lucide-react";
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

  // Group documents by contract ID or series
  const groupDocumentsByContract = (documents: ContractDocument[]) => {
    const contracts = documents.filter(doc => doc.type === "Contract");
    const invoices = documents.filter(doc => doc.type === "Invoice");
    const amendments = documents.filter(doc => doc.type === "Amendment");
    
    // Sort contracts by date (newest first)
    const sortedContracts = [...contracts].sort(
      (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    
    // Create contract groups
    const contractGroups: ContractDocument[][] = [];
    
    // For now, we'll consider each contract as a separate group
    // In a real app, you might want to group by contract ID or series
    sortedContracts.forEach(contract => {
      // Find related amendments and invoices
      const relatedAmendments = amendments.filter(
        amendment => amendment.relatedContractId === contract.id
      );
      const relatedInvoices = invoices.filter(
        invoice => invoice.relatedContractId === contract.id
      );
      
      // Group contract with its related documents
      const group = [
        contract,
        ...relatedAmendments,
        ...relatedInvoices.sort(
          (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        )
      ];
      
      contractGroups.push(group);
    });
    
    return contractGroups;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {Object.entries(documentsBySaas).map(([saasId, { saasName, documents }]) => {
        const contractGroups = groupDocumentsByContract(documents);
        
        return (
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
              <div className="space-y-6">
                {contractGroups.map((documentGroup, groupIndex) => {
                  if (documentGroup.length === 0) return null;
                  
                  // The first document in the group should be a contract
                  const mainContract = documentGroup[0];
                  
                  return (
                    <div key={groupIndex} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <h3 className="font-medium">{mainContract.title}</h3>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(mainContract.dateAdded).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="pl-6 border-l-2 border-muted space-y-3">
                        {/* Main contract */}
                        <DocumentCard document={mainContract} onClick={onDocumentClick} />
                        
                        {/* Related documents (amendments, invoices) */}
                        {documentGroup.slice(1).map((doc, idx) => (
                          <div key={idx} className="pl-3">
                            <DocumentCard document={doc} onClick={onDocumentClick} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Show orphaned invoices (not linked to any contract) */}
                {(() => {
                  const orphanedInvoices = documents.filter(
                    doc => doc.type === "Invoice" && !doc.relatedContractId
                  );
                  
                  if (orphanedInvoices.length === 0) return null;
                  
                  return (
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center">
                        <ReceiptText className="h-4 w-4 mr-2 text-green-500" />
                        <h3 className="font-medium">Other Invoices</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                        {orphanedInvoices.map((doc, idx) => (
                          <DocumentCard key={idx} document={doc} onClick={onDocumentClick} />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
