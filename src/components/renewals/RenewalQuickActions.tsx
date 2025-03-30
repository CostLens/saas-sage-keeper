
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, Calculator, MessageSquare, BarChart4, History } from "lucide-react";
import { toast } from "sonner";

export function RenewalQuickActions() {
  // Available actions users can take on renewals
  const availableActions = [
    { 
      name: "Generate Renewal Report", 
      icon: <FileText className="h-4 w-4" />,
      onClick: () => {
        toast.success("Renewal report generated! Check your email for the report.");
      }
    },
    { 
      name: "Export License Data", 
      icon: <Download className="h-4 w-4" />,
      onClick: () => {
        toast.success("License data exported successfully!");
      }
    },
    { 
      name: "Upload Vendor Quote", 
      icon: <Upload className="h-4 w-4" />,
      onClick: () => {
        toast.success("Quote upload form opened. Please select your file.");
      }
    },
    { 
      name: "Calculate TCO", 
      icon: <Calculator className="h-4 w-4" />,
      onClick: () => {
        toast.success("Total Cost of Ownership calculator opened.");
      }
    },
    { 
      name: "Request Negotiation Support", 
      icon: <MessageSquare className="h-4 w-4" />,
      onClick: () => {
        toast.success("Negotiation support request sent to your procurement team.");
      }
    },
    { 
      name: "Compare Vendor Options", 
      icon: <BarChart4 className="h-4 w-4" />,
      onClick: () => {
        toast.success("Vendor comparison tool opened.");
      }
    },
    { 
      name: "View Negotiation History", 
      icon: <History className="h-4 w-4" />,
      onClick: () => {
        toast.success("Showing negotiation history for selected vendors.");
      }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Take action on your upcoming renewals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {availableActions.map((action, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={action.onClick}
            >
              {action.icon}
              {action.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
