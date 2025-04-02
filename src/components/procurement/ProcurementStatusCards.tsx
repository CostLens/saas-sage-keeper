
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, Eye, AlertTriangle } from "lucide-react";
import { mockProcurementTickets } from "./procurementMockData";

export function ProcurementStatusCards() {
  // Status summary cards
  const statusSummary = [
    { 
      title: "Pending", 
      count: mockProcurementTickets.filter(t => t.status === "Pending").length,
      icon: Clock,
      color: "text-yellow-500"
    },
    { 
      title: "Approved", 
      count: mockProcurementTickets.filter(t => t.status === "Approved").length,
      icon: CheckCircle2,
      color: "text-green-500"
    },
    { 
      title: "In Review", 
      count: mockProcurementTickets.filter(t => t.status === "In Review").length,
      icon: Eye,
      color: "text-blue-500"
    },
    { 
      title: "Rejected", 
      count: mockProcurementTickets.filter(t => t.status === "Rejected").length,
      icon: AlertTriangle,
      color: "text-red-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusSummary.map((status, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
              {status.title}
            </CardTitle>
            <CardDescription>Total requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status.count}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
