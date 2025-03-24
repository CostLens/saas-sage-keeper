
import React from "react";
import { ContractDocument } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Download, FileText, ReceiptText, Pencil } from "lucide-react";
import { format } from "date-fns";
import { DocumentTypeBadge } from "./DocumentTypeBadge";

interface DocumentCardProps {
  document: ContractDocument;
  onClick: (document: ContractDocument) => void;
}

export const DocumentCard = ({ document, onClick }: DocumentCardProps) => {
  const { type, title, dateAdded, size } = document;

  const getDocumentIcon = () => {
    switch (type) {
      case "Contract":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "Invoice":
        return <ReceiptText className="h-4 w-4 text-green-500" />;
      case "Amendment":
        return <Pencil className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Determine if this is a renewal contract
  const isRenewal = type === "Contract" && document.isRenewal;

  return (
    <div
      className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border"
      onClick={() => onClick(document)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted/50 rounded">
          {getDocumentIcon()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{title}</p>
            {isRenewal && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                Renewal
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <DocumentTypeBadge type={type} />
            <p className="text-xs text-muted-foreground">
              {format(new Date(dateAdded), "MMM d, yyyy")} • {size}
            </p>
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={(e) => {
          e.stopPropagation();
          // Download functionality would go here
        }}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};
