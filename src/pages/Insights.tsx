
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { InsightsContent } from "@/components/insights/InsightsContent";
import { Navigate } from "react-router-dom";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

const Insights = () => {
  // Check if insights features are enabled
  const { showCopilotFeatures } = useFeatureFlags();
  
  // Redirect to dashboard if insights features are disabled
  if (!showCopilotFeatures) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <InsightsContent />
      </div>
    </DashboardLayout>
  );
};

export default Insights;
