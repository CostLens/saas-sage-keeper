
import React, { useState } from "react";
import { WorkflowHeader } from "./WorkflowHeader";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowList } from "./WorkflowList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function WorkflowContent() {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleCreateNew = () => {
    setShowCanvas(true);
    setActiveWorkflow(null);
  };

  const handleEditWorkflow = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    setShowCanvas(true);
  };

  const handleBackToList = () => {
    setShowCanvas(false);
  };

  return (
    <div className="space-y-6">
      <WorkflowHeader 
        showBackButton={showCanvas} 
        onBackClick={handleBackToList}
      />
      
      {showCanvas ? (
        <WorkflowCanvas workflowId={activeWorkflow} />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Available Workflows</h2>
            <Button onClick={handleCreateNew} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Create New Workflow
            </Button>
          </div>
          <WorkflowList onEditWorkflow={handleEditWorkflow} />
        </div>
      )}
    </div>
  );
}
