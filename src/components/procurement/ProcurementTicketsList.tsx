
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { mockProcurementTickets } from "./procurementMockData";
import { ProcurementStatusCards } from "./ProcurementStatusCards";
import { getProcurementColumns } from "./ProcurementTableColumns";

export function ProcurementTicketsList() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  // Get table columns configuration
  const columns = getProcurementColumns({
    onSelectTicket: setSelectedTicket,
    onShowQuestionnaire: () => setShowQuestionnaire(true)
  });

  return (
    <div className="space-y-6">
      <ProcurementStatusCards />

      <Card>
        <CardHeader>
          <CardTitle>All Procurement Requests</CardTitle>
          <CardDescription>
            View and manage all procurement intake tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockProcurementTickets}
            columns={columns}
            searchable={true}
            searchField="applicationName"
          />
        </CardContent>
      </Card>
    </div>
  );
}
