
import React from "react";
import { WorkflowHeader } from "./WorkflowHeader";
import { WorkflowCanvas } from "./WorkflowCanvas";

export function WorkflowContent() {
  return (
    <div className="space-y-6">
      <WorkflowHeader />
      <WorkflowCanvas />
    </div>
  );
}
