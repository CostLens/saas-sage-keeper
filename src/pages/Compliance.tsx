
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ComplianceContent } from "@/components/compliance/ComplianceContent";

const Compliance = () => {
  return (
    <DashboardLayout>
      <ComplianceContent />
    </DashboardLayout>
  );
};

export default Compliance;
