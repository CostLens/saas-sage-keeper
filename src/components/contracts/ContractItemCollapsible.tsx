
import React from "react";
import { ChevronDown, ChevronRight, Download, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { ContractDocument } from "@/lib/mockData";

interface ContractItemCollapsibleProps {
  contract: ContractDocument;
  isExpanded: boolean;
  toggleContract: (contractId: string) => void;
  relatedDocs: ContractDocument[];
  onDocumentClick: (document: ContractDocument) => void;
  isOriginal: boolean;
}

export function ContractItemCollapsible({
  contract,
  isExpanded,
  toggleContract,
  relatedDocs,
  onDocumentClick,
  isOriginal,
}: ContractItemCollapsibleProps) {
  return (
    <Collapsible
      key={contract.id}
      open={isExpanded}
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
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {relatedDocs.length > 0 ? (
          <RelatedDocumentsList relatedDocs={relatedDocs} onDocumentClick={onDocumentClick} />
        ) : (
          <div className="p-3 pl-10 border-t bg-muted/10">
            <p className="text-sm text-muted-foreground">No associated documents found</p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function RelatedDocumentsList({ 
  relatedDocs, 
  onDocumentClick 
}: { 
  relatedDocs: ContractDocument[]; 
  onDocumentClick: (document: ContractDocument) => void;
}) {
  return (
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
  );
}
