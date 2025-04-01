
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="hidden md:flex flex-1 justify-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search"
          placeholder="Search..."
          className="pl-9 h-9 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
    </div>
  );
}
