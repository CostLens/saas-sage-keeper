
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DocumentSearch } from "@/components/contracts/DocumentSearch";

interface ContractsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ContractsFilter = ({ searchTerm, setSearchTerm }: ContractsFilterProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contracts & Documents Repository</h1>
        <div className="flex gap-4">
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
