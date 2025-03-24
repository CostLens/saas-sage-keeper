
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Upload } from "lucide-react";
import { DocumentSearch } from "@/components/contracts/DocumentSearch";

interface ContractsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onUploadClick: () => void;
}

export const ContractsFilter = ({ 
  searchTerm, 
  setSearchTerm,
  onUploadClick
}: ContractsFilterProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents Repository</h1>
        <div className="flex gap-4">
          <Button onClick={onUploadClick} variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search */}
      <DocumentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  );
};
