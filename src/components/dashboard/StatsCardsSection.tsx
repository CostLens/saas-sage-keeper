
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { DollarSign, Users, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RenewalCard } from "@/components/calendar/RenewalCard";
import { PaymentsCard } from "@/components/calendar/PaymentsCard";
import { TerminationsCard } from "@/components/calendar/TerminationsCard";
import { SaaSData } from "@/lib/mockData";

interface StatsCardsSectionProps {
  showUsageFeatures: boolean;
  totalSpend: number;
  overallUtilization: number;
  activeUsers: number;
  totalLicenses: number;
  unusedLicenses: number;
  potentialSavings: number;
  upcomingRenewals: Array<SaaSData & { renewalDateObj: Date }>;
  upcomingRenewalAmount: number;
  paymentsData: SaaSData[];
  paymentsAmount: number;
  terminationsData: SaaSData[];
}

export function StatsCardsSection({
  showUsageFeatures,
  totalSpend,
  overallUtilization,
  activeUsers,
  totalLicenses,
  unusedLicenses,
  potentialSavings,
  upcomingRenewals,
  upcomingRenewalAmount,
  paymentsData,
  paymentsAmount,
  terminationsData,
}: StatsCardsSectionProps) {
  if (showUsageFeatures) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            key="total-spend"
            title="Total Annual SaaS Spend"
            value={`$${totalSpend.toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: false }}
            description="12% increase from last year"
            className="h-full"
          />
          <StatCard
            key="license-utilization"
            title="License Utilization"
            value={`${overallUtilization}%`}
            icon={<Users className="h-5 w-5" />}
            description={`${activeUsers} active of ${totalLicenses} total licenses`}
            className="h-full"
          >
            <div className="mt-2">
              <Progress value={overallUtilization} className="h-2" />
            </div>
          </StatCard>
          <StatCard
            key="potential-savings"
            title="Potential Cost Savings"
            value={`$${Math.round(potentialSavings).toLocaleString()}`}
            icon={<TrendingDown className="h-5 w-5" />}
            description={`${unusedLicenses} unused licenses across all apps`}
            className="h-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="h-full">
            <RenewalCard 
              renewals={upcomingRenewals} 
              upcomingRenewalAmount={upcomingRenewalAmount} 
            />
          </div>
          <div className="h-full">
            <PaymentsCard 
              paymentsData={paymentsData} 
              paymentsAmount={paymentsAmount} 
            />
          </div>
          <div className="h-full">
            <TerminationsCard 
              terminationsData={terminationsData} 
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        key="total-spend"
        title="Total Annual SaaS Spend"
        value={`$${totalSpend.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: 12, isPositive: false }}
        description="12% increase from last year"
        className="h-full"
      />
      <div className="h-full">
        <RenewalCard 
          renewals={upcomingRenewals} 
          upcomingRenewalAmount={upcomingRenewalAmount} 
        />
      </div>
      <div className="h-full">
        <PaymentsCard 
          paymentsData={paymentsData} 
          paymentsAmount={paymentsAmount} 
        />
      </div>
      <div className="h-full">
        <TerminationsCard 
          terminationsData={terminationsData} 
        />
      </div>
    </div>
  );
}
