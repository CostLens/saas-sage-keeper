
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcurementTicketsList } from "./ProcurementTicketsList";
import { ProcurementIntakeForm } from "./ProcurementIntakeForm";

export function ProcurementIntakeContent() {
  const [activeTab, setActiveTab] = useState("tickets");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Procurement Intake</h1>
          <p className="text-muted-foreground">
            Manage procurement requests and IT security questionnaires
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="tickets"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="tickets">Tickets List</TabsTrigger>
          <TabsTrigger value="new">New Request</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="mt-0">
          <ProcurementTicketsList />
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <ProcurementIntakeForm onSubmitSuccess={() => setActiveTab("tickets")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
