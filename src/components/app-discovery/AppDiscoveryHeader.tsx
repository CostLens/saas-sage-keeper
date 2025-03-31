
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppDiscoveryHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">App Discovery</h1>
        <p className="text-muted-foreground">
          Explore and analyze all SaaS applications across your organization
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search apps..."
            className="w-full pl-9 md:w-[250px]"
          />
        </div>
        <Button>
          Export
        </Button>
      </div>
    </div>
  );
}
