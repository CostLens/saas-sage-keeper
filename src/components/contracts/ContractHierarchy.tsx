
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractDocument } from "@/lib/mockData";
import { Building, Calendar, FileText, File, ChevronDown, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ContractHierarchyProps {
  saasId: string;
  saasName: string;
  documents: ContractDocument[];
  onDocumentClick: (document: ContractDocument) => void;
}

export function ContractHierarchy({ saasId, saasName, documents, onDocumentClick }: ContractHierarchyProps) {
  const [expandedContracts, setExpandedContracts] = useState<string[]>([]);

  const toggleContract = (contractId: string) => {
    setExpandedContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId) 
        : [...prev, contractId]
    );
  };

  // Sort contracts by date and identify original vs renewal contracts
  const processContracts = () => {
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
  };

  const { contractsByYear, allContracts } = processContracts();

  // Function to get related documents for a contract
  const getRelatedDocuments = (contractId: string) => {
    return documents.filter(doc => 
      doc.type !== "Contract" && doc.relatedContractId === contractId
    );
  };

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
              <div key={`${saasId}-${year}`} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium text-lg">{year}</h3>
                </div>
                
                <div className="space-y-3 pl-4">
                  {contractsByYear[year].map((contract, index) => {
                    const relatedDocs = getRelatedDocuments(contract.id);
                    const isOriginal = index === 0 && year === Object.keys(contractsByYear)[0];
                    
                    return (
                      <Collapsible 
                        key={contract.id}
                        open={expandedContracts.includes(contract.id)}
                        onOpenChange={() => toggleContract(contract.id)}
                        className="border rounded-lg overflow-hidden"
                      >
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-background rounded">
                                <FileText className={`h-5 w-5 ${contract.isRenewal ? 'text-blue-500' : 'text-emerald-500'}`} />
                              </div>
                              <div>
                                <p className="font-medium">{contract.title}</p>
                                <div className="flex items-center gap-2">
                                  {contract.contractPeriod && (
                                    <p className="text-xs text-muted-foreground">
                                      {format(new Date(contract.contractPeriod.start), "MMM d, yyyy")} - {format(new Date(contract.contractPeriod.end), "MMM d, yyyy")}
                                    </p>
                                  )}
                                  {isOriginal ? (
                                    <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-200">
                                      Original
                                    </span>
                                  ) : (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                                      Renewal
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDocumentClick(contract);
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {expandedContracts.includes(contract.id) ? (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {relatedDocs.length > 0 ? (
                            <div className="p-3 pl-10 space-y-2 border-t bg-muted/10">
                              <p className="text-sm font-medium mb-2">Associated Invoices & Documents</p>
                              {relatedDocs.map(doc => (
                                <div 
                                  key={doc.id} 
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-background cursor-pointer"
                                  onClick={() => onDocumentClick(doc)}
                                >
                                  <div className="flex items-center gap-3">
                                    <File className={
                                      doc.type === "Invoice" 
                                        ? "h-4 w-4 text-green-500" 
                                        : "h-4 w-4 text-amber-500"
                                    } />
                                    <div>
                                      <p className="text-sm">{doc.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(doc.dateAdded), "MMM d, yyyy")} • {doc.size}
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Download functionality would go here
                                    }}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3 pl-10 border-t bg-muted/10">
                              <p className="text-sm text-muted-foreground">No associated documents found</p>
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
