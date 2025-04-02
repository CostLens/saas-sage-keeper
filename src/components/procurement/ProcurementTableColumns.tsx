
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProcurementTicketDetails, getStatusColor, getPriorityColor } from "./ProcurementTicketDetails";

interface GetColumnsProps {
  onSelectTicket: (ticket: any) => void;
  onShowQuestionnaire: () => void;
}

export function getProcurementColumns({ onSelectTicket, onShowQuestionnaire }: GetColumnsProps) {
  return [
    {
      id: "ticketId",
      header: "ID",
      cell: (row: any) => <span className="font-mono text-xs">#{row.id}</span>,
    },
    {
      id: "name",
      header: "Application",
      cell: (row: any) => <span className="font-medium">{row.applicationName}</span>,
    },
    {
      id: "requestedBy",
      header: "Requested By",
      cell: (row: any) => <span>{row.requestedBy}</span>,
    },
    {
      id: "requestDate",
      header: "Request Date",
      cell: (row: any) => <span>{new Date(row.requestDate).toLocaleDateString()}</span>,
      sortable: true,
    },
    {
      id: "approver",
      header: "Approved By",
      cell: (row: any) => <span>{row.approver}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: any) => (
        <Badge className={getStatusColor(row.status)} variant="outline">
          {row.status}
        </Badge>
      ),
    },
    {
      id: "priority",
      header: "Priority",
      cell: (row: any) => (
        <Badge className={getPriorityColor(row.priority)} variant="outline">
          {row.priority}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row: any) => (
        <ProcurementTicketDetails 
          ticket={row}
          onViewQuestionnaire={() => {
            onSelectTicket(row);
            onShowQuestionnaire();
          }}
        />
      ),
    },
  ];
}
