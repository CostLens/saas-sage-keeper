
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaaSData } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";

interface SaasDetailProps {
  saas: SaaSData;
  onClose: () => void;
}

export function SaasDetail({ saas, onClose }: SaasDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to SaaS List
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{saas.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Vendor</h3>
                <p>{saas.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Annual Cost</h3>
                <p>${saas.price.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Renewal Date</h3>
                <p>{new Date(saas.renewalDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  {saas.description || "No description available."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contracts">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Contract information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Usage data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
