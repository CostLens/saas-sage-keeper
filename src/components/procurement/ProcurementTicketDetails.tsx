
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Send, FileCheck } from "lucide-react";
import { ITSecurityQuestionnaire } from "./ITSecurityQuestionnaire";

// Helper functions for styling
export const getStatusColor = (status: string) => {
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

export const getPriorityColor = (priority: string) => {
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

interface ProcurementTicketDetailsProps {
  ticket: any;
  onViewQuestionnaire: () => void;
}

export function ProcurementTicketDetails({ ticket, onViewQuestionnaire }: ProcurementTicketDetailsProps) {
  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
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
              <p>{ticket?.applicationName}</p>
            </div>
            <div>
              <h3 className="font-medium">Vendor</h3>
              <p>{ticket?.vendor}</p>
            </div>
            <div>
              <h3 className="font-medium">Requested By</h3>
              <p>{ticket?.requestedBy}</p>
            </div>
            <div>
              <h3 className="font-medium">Department</h3>
              <p>{ticket?.department}</p>
            </div>
            <div>
              <h3 className="font-medium">Approved By</h3>
              <p>{ticket?.approver}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <Badge className={getStatusColor(ticket?.status || "")} variant="outline">
                {ticket?.status}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium">Priority</h3>
              <Badge className={getPriorityColor(ticket?.priority || "")} variant="outline">
                {ticket?.priority}
              </Badge>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium">Business Justification</h3>
              <p className="text-sm text-muted-foreground">{ticket?.businessJustification}</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            {ticket?.status === "Approved" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
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
                  <ITSecurityQuestionnaire vendorName={ticket?.vendor} />
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
      
      {ticket.status === "Approved" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onViewQuestionnaire}
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
  );
}
