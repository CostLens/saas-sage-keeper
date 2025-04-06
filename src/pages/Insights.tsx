
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { InsightsContent } from "@/components/insights/InsightsContent";
import { Navigate } from "react-router-dom";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

const OptimizationInsights = () => {
  const { showInsightsFeatures } = useFeatureFlags();

  // Redirect to dashboard if the feature is disabled
  if (!showInsightsFeatures) {
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

export default OptimizationInsights;
