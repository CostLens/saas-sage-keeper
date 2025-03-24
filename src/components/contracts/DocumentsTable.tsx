
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ContractDocument } from "@/lib/mockData";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { DocumentTypeBadge } from "./DocumentTypeBadge";

interface DocumentsTableProps {
  documents: ContractDocument[];
  onRowClick: (document: ContractDocument) => void;
}

export const DocumentsTable = ({ documents, onRowClick }: DocumentsTableProps) => {
  const documentColumns = [
    {
      id: "title",
      header: "Document",
      sortable: true,
      cell: (row: ContractDocument) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-muted/50 rounded">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{row.title}</div>
            <div className="text-xs text-muted-foreground">{row.size}</div>
          </div>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      sortable: true,
      cell: (row: ContractDocument) => <DocumentTypeBadge type={row.type} />,
    },
    {
      id: "saasName",
      header: "SaaS",
      sortable: true,
      cell: (row: ContractDocument) => row.saasName,
    },
    {
      id: "dateAdded",
      header: "Date Added",
      sortable: true,
      cell: (row: ContractDocument) => format(new Date(row.dateAdded), "MMM d, yyyy"),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      data={documents}
      columns={documentColumns}
      onRowClick={onRowClick}
      searchable={false}
    />
  );
};
