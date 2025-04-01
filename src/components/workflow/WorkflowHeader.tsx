
import React from "react";
import { Button } from "@/components/ui/button";
import { Workflow, Plus, Save, Undo, Redo, Download } from "lucide-react";

export function WorkflowHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Workflow className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Workflow Builder</h1>
      </div>
      
      <p className="text-muted-foreground">
        Create and manage automation workflows for your SaaS applications
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="default" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Workflow
        </Button>
        
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Save
        </Button>
        
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Undo className="h-4 w-4" />
          Undo
        </Button>
        
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Redo className="h-4 w-4" />
          Redo
        </Button>
        
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
