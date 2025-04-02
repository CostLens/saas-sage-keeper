
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Send, CheckCircle2, Clock, AlertTriangle, FileCheck } from "lucide-react";
import { ITSecurityQuestionnaire } from "./ITSecurityQuestionnaire";
import { mockProcurementTickets } from "@/components/procurement/procurementMockData";

export function ProcurementTicketsList() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'rejected':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'in review':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Priority level badge colors
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'low':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Column definitions for the data table
  const columns = [
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
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setSelectedTicket(row)} 
                size="icon" 
                variant="ghost"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Procurement Request Details</DialogTitle>
                <DialogDescription>
                  View the details of this procurement request
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div>
                  <h3 className="font-medium">Application</h3>
                  <p>{selectedTicket?.applicationName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Vendor</h3>
                  <p>{selectedTicket?.vendor}</p>
                </div>
                <div>
                  <h3 className="font-medium">Requested By</h3>
                  <p>{selectedTicket?.requestedBy}</p>
                </div>
                <div>
                  <h3 className="font-medium">Department</h3>
                  <p>{selectedTicket?.department}</p>
                </div>
                <div>
                  <h3 className="font-medium">Approved By</h3>
                  <p>{selectedTicket?.approver}</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <Badge className={getStatusColor(selectedTicket?.status || "")} variant="outline">
                    {selectedTicket?.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium">Priority</h3>
                  <Badge className={getPriorityColor(selectedTicket?.priority || "")} variant="outline">
                    {selectedTicket?.priority}
                  </Badge>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium">Business Justification</h3>
                  <p className="text-sm text-muted-foreground">{selectedTicket?.businessJustification}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                {selectedTicket?.status === "Approved" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowQuestionnaire(true)}>
                        <FileCheck className="mr-2 h-4 w-4" />
                        IT Security Questionnaire
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>IT & Security Questionnaire</DialogTitle>
                        <DialogDescription>
                          Send this questionnaire to the vendor
                        </DialogDescription>
                      </DialogHeader>
                      <ITSecurityQuestionnaire vendorName={selectedTicket?.vendor} />
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => alert("Questionnaire sent to vendor")}>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Vendor
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          {row.status === "Approved" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedTicket(row);
                    setShowQuestionnaire(true);
                  }}
                >
                  <FileCheck className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>IT Security Questionnaire</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

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
    <div className="space-y-6">
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
