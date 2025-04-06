
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { InsightsContent } from "@/components/insights/InsightsContent";

const Insights = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <InsightsContent />
      </div>
    </DashboardLayout>
  );
};

export default Insights;
