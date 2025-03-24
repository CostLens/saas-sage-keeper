
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, FileText, ReceiptText, Pencil } from "lucide-react";

interface DocumentTypeTabsProps {
  tabCounts: {
    all: number;
    contracts: number;
    invoices: number;
    amendments: number;
  };
}

export const DocumentTypeTabs = ({ tabCounts }: DocumentTypeTabsProps) => {
  return (
    <TabsList className="mb-4">
      <TabsTrigger value="all" className="gap-2">
        <File className="h-4 w-4" />
        All ({tabCounts.all})
      </TabsTrigger>
      <TabsTrigger value="contracts" className="gap-2">
        <FileText className="h-4 w-4" />
        Contracts ({tabCounts.contracts})
      </TabsTrigger>
      <TabsTrigger value="invoices" className="gap-2">
        <ReceiptText className="h-4 w-4" />
        Invoices ({tabCounts.invoices})
      </TabsTrigger>
      <TabsTrigger value="amendments" className="gap-2">
        <Pencil className="h-4 w-4" />
        Amendments ({tabCounts.amendments})
      </TabsTrigger>
    </TabsList>
  );
};
