
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DocumentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const DocumentSearch = ({ searchTerm, setSearchTerm }: DocumentSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search contracts, invoices and amendments..."
        className="pl-10 bg-background/50 backdrop-blur-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
