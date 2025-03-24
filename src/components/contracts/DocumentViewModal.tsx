
import React from "react";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContractDocument, mockContracts } from "@/lib/mockData";
import { FileText, Download } from "lucide-react";
import { DocumentCard } from "./DocumentCard";

interface DocumentViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  document: ContractDocument | null;
  onDocumentClick: (document: ContractDocument) => void;
}

export const DocumentViewModal = ({ 
  isOpen, 
  onOpenChange, 
  document, 
  onDocumentClick 
}: DocumentViewModalProps) => {
  if (!document) return null;

  // Find related documents (same SaaS but not the current document)
  const relatedDocuments = mockContracts.filter(
    doc => doc.saasId === document.saasId && doc.id !== document.id
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-panel animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">{document.title}</DialogTitle>
          <DialogDescription>
            View document details and content
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">SaaS Application</div>
              <div className="font-medium">{document.saasName}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Document Type</div>
              <div className="font-medium">{document.type}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Date Added</div>
              <div className="font-medium">
                {format(new Date(document.dateAdded), "MMMM d, yyyy")}
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">File Size</div>
              <div className="font-medium">{document.size}</div>
            </div>
          </div>
          
          <div className="rounded-lg border border-dashed p-12 flex flex-col items-center justify-center bg-muted/30">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">Document preview not available</p>
            <Button className="mt-4 gap-2">
              <Download className="h-4 w-4" />
              Download Document
            </Button>
          </div>
          
          {document.type === "Contract" && relatedDocuments.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-3">Related Documents</div>
              <div className="space-y-2">
                {relatedDocuments.map((doc, index) => (
                  <DocumentCard 
                    key={index} 
                    document={doc} 
                    onClick={onDocumentClick} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
