
import React from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, PlayCircle, PauseCircle, Copy, Trash2 } from "lucide-react";

// Sample workflow data
const mockWorkflows = [
  {
    id: "workflow-1",
    name: "User Onboarding",
    description: "Automate the user onboarding process across multiple SaaS tools",
    active: true,
    lastRun: "2 hours ago",
    createdBy: "Admin",
    nodeCount: 8
  },
  {
    id: "workflow-2",
    name: "License Management",
    description: "Automatically assign and revoke licenses based on department",
    active: true,
    lastRun: "1 day ago",
    createdBy: "Admin",
    nodeCount: 5
  },
  {
    id: "workflow-3",
    name: "Offboarding Automation",
    description: "Remove access and reassign licenses when employees leave",
    active: false,
    lastRun: "5 days ago",
    createdBy: "Admin",
    nodeCount: 12
  },
  {
    id: "workflow-4",
    name: "Budget Alerts",
    description: "Send notifications when spending thresholds are exceeded",
    active: true,
    lastRun: "3 days ago",
    createdBy: "Finance",
    nodeCount: 6
  }
];

interface WorkflowListProps {
  onEditWorkflow: (workflowId: string) => void;
}

export function WorkflowList({ onEditWorkflow }: WorkflowListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockWorkflows.map(workflow => (
        <Card key={workflow.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{workflow.name}</CardTitle>
              {workflow.active ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>
              )}
            </div>
            <CardDescription>{workflow.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Last run:</span>
                <span>{workflow.lastRun}</span>
              </div>
              <div className="flex justify-between">
                <span>Nodes:</span>
                <span>{workflow.nodeCount}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => onEditWorkflow(workflow.id)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <div className="flex gap-1">
              {workflow.active ? (
                <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-800 hover:bg-amber-50">
                  <PauseCircle className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
                  <PlayCircle className="h-4 w-4" />
                </Button>
              )}
              
              <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-800 hover:bg-sky-50">
                <Copy className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
