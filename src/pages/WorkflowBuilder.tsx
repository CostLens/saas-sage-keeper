
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WorkflowContent } from "@/components/workflow/WorkflowContent";

const WorkflowBuilder = () => {
  return (
    <DashboardLayout>
      <WorkflowContent />
    </DashboardLayout>
  );
};

export default WorkflowBuilder;
