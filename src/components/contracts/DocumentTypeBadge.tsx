
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, ReceiptText, Pencil, File } from "lucide-react";

interface DocumentTypeBadgeProps {
  type: string;
}

export const DocumentTypeBadge = ({ type }: DocumentTypeBadgeProps) => {
  switch (type) {
    case "Contract":
      return (
        <Badge variant="outline" className="text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <FileText className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      );
    case "Invoice":
      return (
        <Badge variant="outline" className="text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <ReceiptText className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      );
    case "Amendment":
      return (
        <Badge variant="outline" className="text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
          <Pencil className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <File className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      );
  }
};
