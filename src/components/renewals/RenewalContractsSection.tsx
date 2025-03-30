
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { RenewalContractsTable } from "@/components/renewals/RenewalContractsTable";
import { SaaSData } from "@/lib/mockData";

interface RenewalContractsSectionProps {
  renewalContracts: SaaSData[];
}

export function RenewalContractsSection({ renewalContracts }: RenewalContractsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter contracts based on search
  const filteredContracts = renewalContracts.filter(contract => 
    contract.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Tabs defaultValue="upcoming">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="upcoming">Due in 90 Days</TabsTrigger>
          <TabsTrigger value="optimized">Optimization Opportunities</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <div className="relative w-[180px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search" 
              className="pl-8 h-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <TabsContent value="upcoming" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>Contracts Due for Renewal</CardTitle>
            <CardDescription>
              Review optimization strategies for upcoming renewals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RenewalContractsTable contracts={filteredContracts} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="optimized" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>License Optimization Opportunities</CardTitle>
            <CardDescription>
              Contracts with low utilization that can be optimized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RenewalContractsTable 
              contracts={filteredContracts.filter(saas => 
                saas.usage.utilizationRate < 80 && saas.pricingTerms === 'User-based'
              )} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
