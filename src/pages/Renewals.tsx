
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useRenewalContracts } from "@/hooks/useRenewalContracts";
import { calculateTotalPotentialSavings } from "@/components/renewals/LicenseRecommendation";

// Import refactored components
import { PageHeader } from "@/components/renewals/PageHeader";
import { RenewalStatusCards } from "@/components/renewals/RenewalStatusCards";
import { RenewalQuickActions } from "@/components/renewals/RenewalQuickActions";
import { RenewalContractsSection } from "@/components/renewals/RenewalContractsSection";
import { OptimizationInsights } from "@/components/renewals/OptimizationInsights";

const Renewals = () => {
  const renewalContracts = useRenewalContracts();
  const totalPotentialSavings = calculateTotalPotentialSavings(renewalContracts);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader totalPotentialSavings={totalPotentialSavings} />
        
        {/* Status Cards */}
        <RenewalStatusCards renewalContracts={renewalContracts} />
        
        {/* Actions Section */}
        <RenewalQuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contracts Table */}
          <div className="lg:col-span-2">
            <RenewalContractsSection renewalContracts={renewalContracts} />
          </div>

          {/* Recent Activity */}
          <div>
            <OptimizationInsights />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Renewals;
